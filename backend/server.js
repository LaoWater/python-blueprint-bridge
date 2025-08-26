const express = require('express');
const WebSocket = require('ws');
const k8s = require('@kubernetes/client-node');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Handle large file uploads

// Kubernetes client setup
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const exec = new k8s.Exec(kc);

// Configuration
const NAMESPACE = 'user-sessions';
const IMAGE = 'us-west3-docker.pkg.dev/blue-pigeon-460611/terminal-images/python-terminal:v1';
const SESSION_TIMEOUT = 1800; // 30 minutes

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
            await k8sApi.deleteNamespacedPod(session.podName, NAMESPACE);
            console.log(`Pod ${session.podName} deleted`);
        } catch (error) {
            console.error(`Error deleting pod: ${error.message}`);
        }
        
        // Close WebSocket if exists
        const ws = activeConnections.get(sessionId);
        if (ws) {
            ws.close();
            activeConnections.delete(sessionId);
        }
        
        activeSessions.delete(sessionId);
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

// Create a new Python session
app.post('/api/session/create', async (req, res) => {
    const sessionId = uuidv4();
    console.log(`Creating new session: ${sessionId}`);
    
    try {
        const podManifest = createPodManifest(sessionId);
        const response = await k8sApi.createNamespacedPod(NAMESPACE, podManifest);
        const podName = response.body.metadata.name;
        
        const session = {
            sessionId,
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
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Failed to create session', details: error.message });
    }
});

// Monitor pod status until ready
async function monitorPodStatus(sessionId) {
    const session = activeSessions.get(sessionId);
    if (!session) return;
    
    try {
        const podResponse = await k8sApi.readNamespacedPod(session.podName, NAMESPACE);
        const pod = podResponse.body;
        const status = pod.status.phase;
        
        session.status = status;
        session.lastActivity = Date.now();
        
        if (status === 'Running' && !session.ready) {
            // Pod is running, set up workspace
            await setupWorkspace(sessionId);
            session.ready = true;
            console.log(`Session ${sessionId} is ready`);
        } else if (status === 'Failed' || status === 'Succeeded') {
            console.log(`Session ${sessionId} ended with status: ${status}`);
            activeSessions.delete(sessionId);
        } else if (status !== 'Running') {
            // Keep monitoring
            setTimeout(() => monitorPodStatus(sessionId), 2000);
        }
    } catch (error) {
        console.error(`Error monitoring pod ${session.podName}:`, error.message);
        // Retry after delay
        setTimeout(() => monitorPodStatus(sessionId), 5000);
    }
}

// Setup workspace in the pod
async function setupWorkspace(sessionId) {
    const session = activeSessions.get(sessionId);
    if (!session) return;
    
    try {
        // Create workspace directory and setup basic environment
        const setupCommands = [
            'mkdir -p /workspace',
            'cd /workspace',
            'apk add --no-cache curl git nano',
            'pip install --no-cache-dir requests pandas numpy matplotlib seaborn jupyter',
            'echo "🐍 Python workspace ready!" > /workspace/README.txt'
        ];
        
        for (const command of setupCommands) {
            await executeCommand(sessionId, command, false);
        }
    } catch (error) {
        console.error(`Error setting up workspace for ${sessionId}:`, error);
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

// Run Python file
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
    if (!session) throw new Error('Session not found');
    
    return new Promise((resolve, reject) => {
        let output = '';
        let error = '';
        
        const ws = {
            send: (data) => {
                if (returnOutput) output += data;
            },
            close: () => {},
            readyState: 1
        };
        
        exec.exec(
            NAMESPACE,
            session.podName,
            'python-terminal',
            ['/bin/sh', '-c', command],
            ws, // stdout
            ws, // stderr
            null, // stdin (no input needed)
            false, // tty
            (status) => {
                if (status.status === 'Success') {
                    resolve(output);
                } else {
                    reject(new Error(error || 'Command failed'));
                }
            }
        );
    });
}

// WebSocket server for terminal streaming
const WS_PORT = process.env.WS_PORT || 8082;
const wss = new WebSocket.Server({ port: WS_PORT });

wss.on('connection', (ws, req) => {
    const url = new URL(req.url, 'http://localhost:8080');
    const sessionId = url.searchParams.get('sessionId');
    
    if (!sessionId) {
        ws.close(1000, 'Session ID required');
        return;
    }
    
    const session = activeSessions.get(sessionId);
    if (!session) {
        ws.close(1000, 'Session not found');
        return;
    }
    
    if (!session.ready) {
        ws.close(1000, 'Session not ready');
        return;
    }
    
    console.log(`WebSocket connected for session ${sessionId}`);
    activeConnections.set(sessionId, ws);
    
    // Update last activity
    session.lastActivity = Date.now();
    
    // Execute into the pod with persistent shell
    exec.exec(
        NAMESPACE,
        session.podName,
        'python-terminal',
        ['/bin/sh'],
        ws, // stdout
        ws, // stderr  
        ws, // stdin
        true, // tty
        (status) => {
            console.log(`Terminal session ${sessionId} exited with status:`, status);
            activeConnections.delete(sessionId);
            ws.close();
        }
    );
    
    // Handle messages from frontend
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            session.lastActivity = Date.now();
            
            if (data.type === 'run_command' || data.type === 'terminal_command') {
                // Command is already sent through the exec stream
                // This handles special commands from the API
            }
        } catch (error) {
            // If it's not JSON, treat as raw terminal input
            // The input goes directly to the shell via the exec stream
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
        activeSessions: activeSessions.size,
        activeConnections: activeConnections.size,
        timestamp: new Date().toISOString()
    });
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