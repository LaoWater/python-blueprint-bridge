const express = require('express');
const WebSocket = require('ws');
const k8s = require('@kubernetes/client-node');
const { v4: uuidv4 } = require('uuid');
const { PassThrough } = require('stream');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Handle large file uploads

// Kubernetes client setup with better error handling
const kc = new k8s.KubeConfig();
let k8sApi = null;
let exec = null;

try {
  // Try to load from default kubeconfig
  kc.loadFromDefault();
  k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  exec = new k8s.Exec(kc);
  console.log('✅ Kubernetes client initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Kubernetes client:', error.message);
  console.log('🔧 Make sure kubectl is configured and you have access to the cluster');
}

// Configuration
const NAMESPACE = process.env.K8S_NAMESPACE || 'user-sessions';
const IMAGE = process.env.K8S_IMAGE || 'us-west3-docker.pkg.dev/blue-pigeon-460611/terminal-images/python-terminal:v2';
const SESSION_TIMEOUT = parseInt(process.env.SESSION_TIMEOUT) || 1800; // 30 minutes

// Store active sessions
const activeSessions = new Map();
const activeConnections = new Map(); // WebSocket connections

// Session cleanup interval
setInterval(() => {
    const now = Date.now();
    for (const [sessionId, session] of activeSessions.entries()) {
        if (now - session.lastActivity > SESSION_TIMEOUT * 1000) {
            console.log(`Cleaning up inactive session: ${sessionId}`);
            cleanupSession(sessionId);
        }
    }
}, 60000); // Check every minute

// Cleanup function
async function cleanupSession(sessionId) {
    const session = activeSessions.get(sessionId);
    if (session) {
        try {
            if (k8sApi) {
                console.log(`🧹 Deleting pod ${session.podName} for session ${sessionId}`);
                await k8sApi.deleteNamespacedPod(session.podName, NAMESPACE);
                console.log(`✅ Pod ${session.podName} deleted`);
            } else {
                console.log(`⚠️ Cannot delete pod - Kubernetes client unavailable`);
            }
        } catch (error) {
            console.error(`❌ Error deleting pod: ${error.message}`);
        }
        
        // Close WebSocket if exists
        const ws = activeConnections.get(sessionId);
        if (ws) {
            ws.close();
            activeConnections.delete(sessionId);
        }
        
        activeSessions.delete(sessionId);
        console.log(`🗑️ Session ${sessionId} cleaned up`);
    }
}

// Create pod manifest
function createPodManifest(sessionId) {
    return {
        metadata: {
            generateName: 'python-session-',
            namespace: NAMESPACE,
            labels: {
                app: 'python-terminal',
                session: sessionId
            }
        },
        spec: {
            restartPolicy: 'Never',
            serviceAccountName: 'terminal-controller',
            containers: [{
                name: 'python-terminal',
                image: IMAGE,
                resources: {
                    requests: {
                        cpu: '50m',
                        memory: '128Mi'
                    },
                    limits: {
                        cpu: '200m',
                        memory: '256Mi'
                    }
                },
                stdin: true,
                stdinOnce: false,
                tty: true,
                command: ['/bin/sh'],
                workingDir: '/workspace'
            }],
            // Auto-cleanup after session timeout
            activeDeadlineSeconds: SESSION_TIMEOUT
        }
    };
}

// API Routes

// Create a new Python session or reconnect to existing one
app.post('/api/session/create', async (req, res) => {
    const { userId, reconnect = false } = req.body; // Accept userId and reconnect flag
    let sessionId = uuidv4();
    
    console.log(`${reconnect ? 'Reconnecting to' : 'Creating new'} session for user: ${userId || 'anonymous'}`);
    
    // If reconnecting and userId provided, try to find existing session
    if (reconnect && userId) {
        console.log(`🔍 Looking for existing session for user ${userId}`);
        console.log(`📊 Current active sessions: ${activeSessions.size}`);
        
        for (const [existingSessionId, session] of activeSessions.entries()) {
            console.log(`🔍 Checking session ${existingSessionId} for user ${session.userId}`);
            
            if (session.userId === userId) {
                console.log(`🔄 Found existing backend session for user ${userId}: ${existingSessionId}`);
                
                // Verify pod is still running
                try {
                    if (k8sApi) {
                        console.log(`🔍 Checking pod status for ${session.podName}`);
                        const podStatus = await k8sApi.readNamespacedPodStatus(session.podName, NAMESPACE);
                        
                        if (podStatus.body.status.phase === 'Running') {
                            console.log(`✅ Pod ${session.podName} still running, reconnecting to existing session`);
                            session.lastActivity = Date.now();
                            return res.json({
                                sessionId: existingSessionId,
                                podName: session.podName,
                                status: 'ready',
                                reconnected: true
                            });
                        } else {
                            console.log(`⚠️ Pod ${session.podName} not running (${podStatus.body.status.phase}), cleaning up and creating new session`);
                            activeSessions.delete(existingSessionId);
                        }
                    }
                } catch (error) {
                    console.log(`❌ Error checking pod status: ${error.message}, cleaning up and creating new session`);
                    activeSessions.delete(existingSessionId);
                }
                break;
            }
        }
        
        // If we get here, no valid existing session was found
        console.log(`ℹ️ No valid existing backend session found for user ${userId}, will create new session`);
    }
    
    // Check if Kubernetes client is available
    if (!k8sApi) {
        console.error('❌ Kubernetes client not available');
        return res.status(503).json({ 
            error: 'Kubernetes service unavailable', 
            details: 'Backend cannot connect to Kubernetes cluster. Please check cluster connectivity and authentication.' 
        });
    }
    
    // FIRST: Clean up any existing sessions for this user BEFORE creating new pod
    if (userId) {
        console.log(`🧹 Cleaning up any existing sessions for user ${userId} before creating new one`);
        for (const [existingSessionId, existingSession] of activeSessions.entries()) {
            if (existingSession.userId === userId) {
                console.log(`🗑️ Cleaning up existing session ${existingSessionId} for user ${userId}`);
                await cleanupSession(existingSessionId);
            }
        }
        console.log(`✅ Cleanup completed for user ${userId}`);
    }
    
    // THEN: Create exactly one new pod
    try {
        const podManifest = createPodManifest(sessionId);
        console.log(`📦 Creating single pod for session ${sessionId} (user: ${userId || 'anonymous'})...`);
        
        const response = await k8sApi.createNamespacedPod(NAMESPACE, podManifest);
        const podName = response.body.metadata.name;
        
        console.log(`✅ Pod created successfully: ${podName}`);
        
        const session = {
            sessionId,
            userId: userId || null, // Store userId for session persistence
            podName,
            created: new Date(),
            lastActivity: Date.now(),
            status: 'Creating',
            currentFile: null,
            ready: false
        };
        
        activeSessions.set(sessionId, session);
        
        // Start monitoring pod status
        monitorPodStatus(sessionId);
        
        res.json({
            sessionId,
            podName,
            status: 'Creating'
        });
    } catch (error) {
        console.error('❌ Error creating session:', error);
        
        // Provide more detailed error information
        let errorDetails = error.message;
        if (error.body) {
            errorDetails = `${error.body.message || error.message} (Code: ${error.body.code || error.statusCode || 'unknown'})`;
        }
        
        res.status(500).json({ 
            error: 'Failed to create session', 
            details: errorDetails,
            troubleshooting: 'Check that the Kubernetes cluster is accessible and you have proper permissions.'
        });
    }
});

// Monitor pod status until ready
async function monitorPodStatus(sessionId) {
    const session = activeSessions.get(sessionId);
    if (!session || !k8sApi) return;
    
    try {
        console.log(`🔍 Monitoring pod status for session ${sessionId} (pod: ${session.podName})`);
        
        const podResponse = await k8sApi.readNamespacedPod(session.podName, NAMESPACE);
        const pod = podResponse.body;
        const status = pod.status.phase;
        
        console.log(`📊 Pod ${session.podName} status: ${status}`);
        
        session.status = status;
        session.lastActivity = Date.now();
        
        if (status === 'Running' && !session.ready) {
            // Pod is running, set up workspace
            console.log(`🚀 Pod is running, setting up workspace for ${sessionId}`);
            await setupWorkspace(sessionId);
            session.ready = true;
            console.log(`✅ Session ${sessionId} is ready`);
        } else if (status === 'Failed' || status === 'Succeeded') {
            console.log(`❌ Session ${sessionId} ended with status: ${status}`);
            activeSessions.delete(sessionId);
        } else if (status === 'Pending') {
            console.log(`⏳ Pod still pending, retrying in 2 seconds...`);
            setTimeout(() => monitorPodStatus(sessionId), 2000);
        } else if (status !== 'Running') {
            console.log(`🔄 Pod status: ${status}, retrying in 2 seconds...`);
            setTimeout(() => monitorPodStatus(sessionId), 2000);
        }
    } catch (error) {
        console.error(`❌ Error monitoring pod ${session.podName}:`, error.message);
        
        // If it's a 404, the pod might not exist yet
        if (error.statusCode === 404) {
            console.log(`🔍 Pod not found yet, retrying in 2 seconds...`);
            setTimeout(() => monitorPodStatus(sessionId), 2000);
        } else {
            console.log(`🔄 Retrying pod monitoring in 5 seconds...`);
            setTimeout(() => monitorPodStatus(sessionId), 5000);
        }
    }
}

// Setup workspace in the pod
async function setupWorkspace(sessionId) {
    const session = activeSessions.get(sessionId);
    if (!session) return;
    
    try {
        console.log(`🏗️ Setting up workspace for session ${sessionId}`);
        
        // Simple workspace setup - just verify the pod is ready
        const testCommand = 'echo "🐍 Python workspace ready!"';
        await executeCommand(sessionId, testCommand, false);
        
        console.log(`✅ Workspace setup completed for session ${sessionId}`);
    } catch (error) {
        console.error(`❌ Error setting up workspace for ${sessionId}:`, error.message);
        // Don't fail the whole setup if workspace setup fails
        console.log(`⚠️ Continuing without full workspace setup...`);
    }
}

// Get session status
app.get('/api/session/:sessionId/status', async (req, res) => {
    const { sessionId } = req.params;
    const session = activeSessions.get(sessionId);
    
    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }
    
    session.lastActivity = Date.now();
    
    res.json({
        sessionId,
        podName: session.podName,
        status: session.status,
        ready: session.ready,
        currentFile: session.currentFile,
        uptime: Math.floor((Date.now() - session.created.getTime()) / 1000)
    });
});

// Sync filesystem structure to pod
app.post('/api/session/:sessionId/sync', async (req, res) => {
    const { sessionId } = req.params;
    const { fileStructure } = req.body; // Array of {path, content, type} objects
    
    const session = activeSessions.get(sessionId);
    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }
    
    if (!session.ready) {
        return res.status(400).json({ error: 'Session not ready' });
    }
    
    try {
        session.lastActivity = Date.now();
        let syncResults = [];
        
        console.log(`🔄 Syncing ${fileStructure.length} items to session ${sessionId}`);
        
        for (const item of fileStructure) {
            try {
                if (item.type === 'folder') {
                    // Create directory
                    const createDirCmd = `mkdir -p '/tmp/${item.path}'`;
                    await executeCommand(sessionId, createDirCmd, false);
                    syncResults.push({ path: item.path, type: 'folder', success: true });
                } else if (item.type === 'file') {
                    // Create file with content
                    const filePath = `/tmp/${item.path}`;
                    const content = item.content || '';
                    console.log(`📝 Syncing file ${item.path} with ${content.length} characters`);
                    
                    if (content.length === 0) {
                        console.warn(`⚠️ Warning: File ${item.path} has no content`);
                    }
                    
                    const saveCommand = `cat > '${filePath}' << 'SYNCEOF'\n${content}\nSYNCEOF`;
                    await executeCommand(sessionId, saveCommand, false);
                    syncResults.push({ path: item.path, type: 'file', success: true, contentLength: content.length });
                }
            } catch (error) {
                console.error(`Error syncing ${item.path}:`, error);
                syncResults.push({ path: item.path, type: item.type, success: false, error: error.message });
            }
        }
        
        const successCount = syncResults.filter(r => r.success).length;
        console.log(`✅ Sync completed: ${successCount}/${fileStructure.length} items synced`);
        
        res.json({ 
            success: true, 
            message: `Synchronized ${successCount}/${fileStructure.length} items`,
            results: syncResults
        });
    } catch (error) {
        console.error(`Error syncing session ${sessionId}:`, error);
        res.status(500).json({ error: 'Failed to sync filesystem', details: error.message });
    }
});

// Save file to pod
app.post('/api/session/:sessionId/file', async (req, res) => {
    const { sessionId } = req.params;
    const { filename, content } = req.body;
    
    const session = activeSessions.get(sessionId);
    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }
    
    if (!session.ready) {
        return res.status(400).json({ error: 'Session not ready' });
    }
    
    try {
        session.lastActivity = Date.now();
        session.currentFile = filename;
        
        // Escape content for shell safety
        const escapedContent = content.replace(/'/g, "'\"'\"'");
        const saveCommand = `cat > '/workspace/${filename}' << 'EOF'\n${content}\nEOF`;
        
        await executeCommand(sessionId, saveCommand, false);
        
        res.json({ 
            success: true, 
            message: `File ${filename} saved successfully`,
            path: `/workspace/${filename}`
        });
    } catch (error) {
        console.error(`Error saving file for session ${sessionId}:`, error);
        res.status(500).json({ error: 'Failed to save file', details: error.message });
    }
});

// Execute Python file cleanly (for Run button)
app.post('/api/session/:sessionId/execute', async (req, res) => {
    const { sessionId } = req.params;
    const { filePath } = req.body; // e.g., "projects/main.py"
    
    const session = activeSessions.get(sessionId);
    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }
    
    if (!session.ready) {
        return res.status(400).json({ error: 'Session not ready' });
    }
    
    try {
        session.lastActivity = Date.now();
        
        console.log(`🏃 Executing ${filePath} in session ${sessionId}`);
        
        // Execute the Python file and capture output (with full path from /tmp)
        const command = `cd /tmp && python3 '${filePath}' 2>&1`;
        
        console.log(`Command: ${command}`);
        
        const output = await executeCommand(sessionId, command, true);
        
        console.log(`✅ Execution completed for ${filePath}`);
        
        res.json({ 
            success: true, 
            output: output || '',
            filePath: filePath,
            command: `python3 ${filePath}`
        });
    } catch (error) {
        console.error(`Error executing ${filePath} in session ${sessionId}:`, error);
        res.json({
            success: false,
            output: `Error executing file: ${error.message}`,
            filePath: filePath,
            error: error.message
        });
    }
});

// Run Python file (legacy)
app.post('/api/session/:sessionId/run', async (req, res) => {
    const { sessionId } = req.params;
    const { filename } = req.body;
    
    const session = activeSessions.get(sessionId);
    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }
    
    if (!session.ready) {
        return res.status(400).json({ error: 'Session not ready' });
    }
    
    try {
        session.lastActivity = Date.now();
        
        const runCommand = `cd /workspace && python3 ${filename}`;
        
        // Send run command through WebSocket if connected
        const ws = activeConnections.get(sessionId);
        if (ws && ws.readyState === WebSocket.OPEN) {
            // Send command through WebSocket for real-time output
            ws.send(JSON.stringify({
                type: 'run_command',
                command: runCommand
            }));
        }
        
        res.json({ 
            success: true, 
            message: `Running ${filename}`,
            command: runCommand
        });
    } catch (error) {
        console.error(`Error running file for session ${sessionId}:`, error);
        res.status(500).json({ error: 'Failed to run file', details: error.message });
    }
});

// Execute terminal command
app.post('/api/session/:sessionId/command', async (req, res) => {
    const { sessionId } = req.params;
    const { command } = req.body;
    
    const session = activeSessions.get(sessionId);
    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }
    
    if (!session.ready) {
        return res.status(400).json({ error: 'Session not ready' });
    }
    
    try {
        session.lastActivity = Date.now();
        
        const ws = activeConnections.get(sessionId);
        if (ws && ws.readyState === WebSocket.OPEN) {
            // Send command through WebSocket for real-time interaction
            ws.send(JSON.stringify({
                type: 'terminal_command',
                command: command
            }));
            res.json({ success: true, message: 'Command sent to terminal' });
        } else {
            res.status(400).json({ error: 'No active terminal connection' });
        }
    } catch (error) {
        console.error(`Error executing command for session ${sessionId}:`, error);
        res.status(500).json({ error: 'Failed to execute command', details: error.message });
    }
});

// Delete session
app.delete('/api/session/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    
    try {
        await cleanupSession(sessionId);
        res.json({ success: true, message: 'Session deleted successfully' });
    } catch (error) {
        console.error(`Error deleting session ${sessionId}:`, error);
        res.status(500).json({ error: 'Failed to delete session', details: error.message });
    }
});

// List all active sessions (admin endpoint)
app.get('/api/sessions', (req, res) => {
    const sessions = Array.from(activeSessions.values()).map(session => ({
        sessionId: session.sessionId,
        podName: session.podName,
        status: session.status,
        ready: session.ready,
        created: session.created,
        currentFile: session.currentFile,
        uptime: Math.floor((Date.now() - session.created.getTime()) / 1000)
    }));
    
    res.json({ sessions, count: sessions.length });
});

// Helper function to execute commands in pod
async function executeCommand(sessionId, command, returnOutput = true) {
    const session = activeSessions.get(sessionId);
    if (!session || !exec) throw new Error('Session not found or exec not available');
    
    return new Promise((resolve, reject) => {
        let output = '';
        let error = '';
        
        // Create proper stream handlers
        const stdout = {
            write: (data) => {
                if (returnOutput) output += data.toString();
                return true;
            },
            end: () => {},
            on: () => {},
            once: () => {},
            emit: () => {},
            removeListener: () => {}
        };
        
        const stderr = {
            write: (data) => {
                error += data.toString();
                return true;
            },
            end: () => {},
            on: () => {},
            once: () => {},
            emit: () => {},
            removeListener: () => {}
        };
        
        const stdin = null; // No stdin needed for simple commands
        
        try {
            exec.exec(
                NAMESPACE,
                session.podName,
                'python-terminal',
                ['/bin/sh', '-c', command],
                stdout,
                stderr,
                stdin,
                false, // tty
                (status) => {
                    if (status && status.status === 'Success') {
                        resolve(output);
                    } else {
                        reject(new Error(error || `Command failed with status: ${status?.status || 'unknown'}`));
                    }
                }
            );
        } catch (err) {
            reject(new Error(`Failed to execute command: ${err.message}`));
        }
    });
}

// WebSocket server for terminal streaming
const WS_PORT = process.env.WS_PORT || 8082;
const wss = new WebSocket.Server({ port: WS_PORT });

wss.on('connection', (ws, req) => {
    const url = new URL(req.url, 'http://localhost:8080');
    const sessionId = url.searchParams.get('sessionId');
    
    console.log(`🔌 WebSocket connection attempt for session: ${sessionId}`);
    
    if (!sessionId) {
        console.log(`❌ No session ID provided`);
        ws.close(1000, 'Session ID required');
        return;
    }
    
    const session = activeSessions.get(sessionId);
    if (!session) {
        console.log(`❌ Session ${sessionId} not found`);
        ws.close(1000, 'Session not found');
        return;
    }
    
    if (!session.ready) {
        console.log(`❌ Session ${sessionId} not ready yet (status: ${session.status})`);
        ws.close(1000, 'Session not ready');
        return;
    }
    
    console.log(`✅ WebSocket connected for session ${sessionId}`);
    activeConnections.set(sessionId, ws);
    
    // Update last activity
    session.lastActivity = Date.now();
    
    // Line buffer to ensure complete lines are sent
    let outputBuffer = '';
    
    // Create stream bridges for the Kubernetes exec
    const stdout = {
        write: (data) => {
            if (ws.readyState === 1) { // WebSocket.OPEN
                const output = data.toString();
                
                // DEBUG: Log what we're receiving to understand formatting
                // console.log('🐛 BACKEND DEBUG: Received chunk:');
                // console.log('📝 Raw chunk string:', JSON.stringify(output));
                // console.log('📏 Length:', output.length);
                // console.log('🔍 Contains \\n:', output.includes('\n'));
                // console.log('🔍 Contains \\r:', output.includes('\r'));
                
                // Add to buffer
                outputBuffer += output;
                
                // Process complete lines
                const lines = outputBuffer.split('\n');
                
                // Keep the last incomplete line in buffer
                outputBuffer = lines.pop() || '';
                
                // Send complete lines
                for (const line of lines) {
                    const lineWithNewline = line + '\n';
                    console.log('🐛 BACKEND DEBUG: Sending complete line:', JSON.stringify(lineWithNewline));
                    
                    ws.send(JSON.stringify({
                        type: 'terminal_output',
                        data: lineWithNewline
                    }));
                }
                
                // If there's remaining content without newline, send it after a small delay
                // This handles cases where output doesn't end with newline
                if (outputBuffer && !output.endsWith('\n')) {
                    setTimeout(() => {
                        if (outputBuffer && ws.readyState === 1) {
                            console.log('🐛 BACKEND DEBUG: Sending remaining buffer:', JSON.stringify(outputBuffer));
                            ws.send(JSON.stringify({
                                type: 'terminal_output',
                                data: outputBuffer
                            }));
                            outputBuffer = '';
                        }
                    }, 100); // 100ms delay to collect more data
                }
            }
            return true;
        },
        end: () => {},
        on: () => {},
        once: () => {},
        emit: () => {},
        removeListener: () => {}
    };
    
    const stderr = {
        write: (data) => {
            if (ws.readyState === 1) { // WebSocket.OPEN
                // Preserve error formatting with proper structure
                const errorOutput = data.toString();
                ws.send(JSON.stringify({
                    type: 'terminal_error',
                    data: errorOutput
                }));
            }
            return true;
        },
        end: () => {},
        on: () => {},
        once: () => {},
        emit: () => {},
        removeListener: () => {}
    };
    
    const stdin = {
        write: (data) => {
            // This will be used when we send commands to the pod
            return true;
        },
        end: () => {},
        on: () => {},
        once: () => {},
        emit: () => {},
        removeListener: () => {}
    };
    
    try {
        // Execute into the pod with persistent shell
        console.log(`🚀 Starting shell session in pod ${session.podName}`);
        
        // Create stdin stream that can receive commands
        const stdinStream = new PassThrough();
        
        const execConnection = exec.exec(
            NAMESPACE,
            session.podName,
            'python-terminal',
            ['/bin/bash', '--login', '-c', 'export PYTHONUNBUFFERED=1; exec /bin/bash'], // Unbuffered Python output
            stdout,
            stderr,
            stdinStream, // Use PassThrough stream for stdin
            true, // tty
            (status) => {
                console.log(`🔚 Terminal session ${sessionId} exited with status:`, status);
                activeConnections.delete(sessionId);
                if (ws.readyState === 1) {
                    ws.close();
                }
            }
        );
        
        // Store the stdin stream for sending commands
        session.stdinStream = stdinStream;
        
        // Send welcome message and setup
        setTimeout(() => {
            if (ws.readyState === 1) {
                const welcomeMessage = `\n┌─────────────────────────────────────────────┐\n│        🐍 Blue Pigeon Python Terminal        │\n└─────────────────────────────────────────────┘\n🐍 Python 3.11 | Workspace: /tmp (full access)\nReady! Create files, directories, and run code.\n\n`;
                ws.send(JSON.stringify({
                    type: 'terminal_output',
                    data: welcomeMessage
                }));
            }
            
            // Ensure we're in /tmp directory
            if (stdinStream && !stdinStream.destroyed) {
                stdinStream.write('cd /tmp\n');
            }
        }, 1000);
        
    } catch (error) {
        console.error(`❌ Failed to start exec session: ${error.message}`);
        ws.close(1000, `Exec failed: ${error.message}`);
        return;
    }
    
    // Handle messages from frontend (terminal input)
    ws.on('message', (message) => {
        try {
            session.lastActivity = Date.now();
            
            // Try to parse as JSON first
            let command;
            try {
                const data = JSON.parse(message);
                if (data.type === 'terminal_input' && data.command) {
                    command = data.command;
                } else {
                    command = message.toString();
                }
            } catch {
                // If not JSON, treat as raw terminal input
                command = message.toString();
            }
            
            // Send command directly to the bash session via stdin stream
            if (session.stdinStream && !session.stdinStream.destroyed && command) {
                console.log(`📤 Sending command to ${sessionId}:`, command.trim());
                session.stdinStream.write(command);
            }
        } catch (error) {
            console.error(`❌ Error handling WebSocket message for ${sessionId}:`, error);
        }
    });
    
    ws.on('close', () => {
        console.log(`WebSocket closed for session ${sessionId}`);
        activeConnections.delete(sessionId);
    });
    
    ws.on('error', (error) => {
        console.error(`WebSocket error for session ${sessionId}:`, error);
        activeConnections.delete(sessionId);
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        kubernetes: k8sApi ? 'connected' : 'disconnected',
        activeSessions: activeSessions.size,
        activeConnections: activeConnections.size,
        namespace: NAMESPACE,
        image: IMAGE,
        timestamp: new Date().toISOString()
    });
});

// Kubernetes diagnostics endpoint
app.get('/api/k8s/status', async (req, res) => {
    if (!k8sApi) {
        return res.status(503).json({
            status: 'error',
            message: 'Kubernetes client not initialized',
            troubleshooting: [
                'Check if kubectl is configured: `kubectl cluster-info`',
                'Verify kubeconfig file exists: `~/.kube/config`',
                'Test cluster access: `kubectl get namespaces`',
                'Ensure proper permissions for the user-sessions namespace'
            ]
        });
    }

    try {
        // Test namespace access
        const namespace = await k8sApi.readNamespace(NAMESPACE);
        
        // Test pod listing
        const pods = await k8sApi.listNamespacedPod(NAMESPACE);
        
        // Test service account
        const serviceAccount = await k8sApi.readNamespacedServiceAccount('terminal-controller', NAMESPACE);
        
        res.json({
            status: 'success',
            kubernetes: {
                connected: true,
                namespace: {
                    name: NAMESPACE,
                    status: namespace.body.status.phase || 'Active'
                },
                pods: {
                    total: pods.body.items.length,
                    running: pods.body.items.filter(p => p.status.phase === 'Running').length,
                    pending: pods.body.items.filter(p => p.status.phase === 'Pending').length,
                    failed: pods.body.items.filter(p => p.status.phase === 'Failed').length
                },
                serviceAccount: {
                    name: serviceAccount.body.metadata.name,
                    exists: true
                },
                image: IMAGE
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: `Kubernetes access failed: ${error.message}`,
            errorCode: error.statusCode || 'unknown',
            troubleshooting: [
                'Verify cluster connection: `kubectl cluster-info`',
                'Check namespace exists: `kubectl get namespace user-sessions`',
                'Verify RBAC permissions: `kubectl get role,rolebinding -n user-sessions`',
                'Check service account: `kubectl get serviceaccount -n user-sessions`'
            ]
        });
    }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('Shutting down gracefully...');
    
    // Cleanup all active sessions
    for (const sessionId of activeSessions.keys()) {
        await cleanupSession(sessionId);
    }
    
    process.exit(0);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Python Terminal Backend running on port ${PORT}`);
    console.log(`📡 WebSocket server running on port ${WS_PORT}`);
    console.log(`🐍 Using image: ${IMAGE}`);
    console.log(`☸️  Kubernetes namespace: ${NAMESPACE}`);
});

module.exports = app;