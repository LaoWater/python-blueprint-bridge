// src/hooks/usePythonTerminal.ts
// TypeScript React hook for managing Python terminal sessions

import { useState, useCallback, useRef, useEffect } from 'react';
import pythonTerminalAPI, { SessionData, SessionStatus, SyncItem, SyncResponse, ExecuteResponse } from '../services/pythonTerminalAPI';

export type SessionStatusType = 'idle' | 'creating' | 'ready' | 'error';

export interface UsePythonTerminalReturn {
  // Session state
  sessionId: string | null;
  podName: string | null;
  status: SessionStatusType;
  isReady: boolean;
  currentFile: string | null;
  error: string | null;
  isLoading: boolean;
  
  // WebSocket state
  isConnected: boolean;
  terminalOutput: string;
  
  // Actions
  createSession: () => Promise<SessionData | undefined>;
  saveAndRunFile: (filename: string, content: string) => Promise<{ success: boolean }>;
  sendCommand: (command: string) => Promise<{ success: boolean }>;
  sendInput: (input: string) => void;
  deleteSession: () => Promise<void>;
  refreshStatus: () => Promise<SessionStatus | undefined>;
  connectWebSocket: () => void;
  syncFileSystem: (fileStructure: SyncItem[]) => Promise<SyncResponse>;
  executeFile: (filePath: string) => Promise<ExecuteResponse>;
  
  // Terminal management
  clearOutput: () => void;
  appendOutput: (data: string) => void;
  
  // Computed properties
  canRun: boolean;
  canSendCommands: boolean;
}

export const usePythonTerminal = (): UsePythonTerminalReturn => {
  // Session state
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [podName, setPodName] = useState<string | null>(null);
  const [status, setStatus] = useState<SessionStatusType>('idle');
  const [isReady, setIsReady] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // WebSocket state
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<string>('');
  const wsRef = useRef<WebSocket | null>(null);

  // Terminal output management
  const appendOutput = useCallback((data: string): void => {
    setTerminalOutput(prev => prev + data);
  }, []);

  const clearOutput = useCallback((): void => {
    setTerminalOutput('');
  }, []);

  // Create new session
  const createSession = useCallback(async (): Promise<SessionData | undefined> => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    setStatus('creating');
    
    try {
      console.log('Creating new Python session...');
      const sessionData = await pythonTerminalAPI.createSession();
      
      setSessionId(sessionData.sessionId);
      setPodName(sessionData.podName);
      setStatus(sessionData.status as SessionStatusType);
      
      console.log('Waiting for session to be ready...');
      appendOutput('🚀 Creating Python environment...\n');
      
      // Wait for session to be ready
      const readyStatus = await pythonTerminalAPI.waitForSessionReady(sessionData.sessionId);
      
      setStatus(readyStatus.status as SessionStatusType);
      setIsReady(readyStatus.ready);
      setCurrentFile(readyStatus.currentFile);
      
      appendOutput('✅ Python environment ready!\n');
      appendOutput('📁 Workspace: /workspace\n');
      appendOutput('🐍 Python 3.11 with pre-installed packages\n\n');
      
      return sessionData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to create session:', err);
      setError(errorMessage);
      setStatus('error');
      appendOutput(`❌ Error: ${errorMessage}\n`);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, appendOutput]);

  // Connect WebSocket
  const connectWebSocket = useCallback((): void => {
    if (!sessionId || !isReady || wsRef.current) {
      return;
    }

    try {
      console.log('Connecting WebSocket for session:', sessionId);
      appendOutput('🔌 Connecting to terminal...\n');
      
      const ws = pythonTerminalAPI.createWebSocket(sessionId);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        
        // Trigger callback to auto-switch to terminal
        if (window.autoSwitchToTerminal) {
          window.autoSwitchToTerminal();
        }
      };

      ws.onmessage = (event: MessageEvent) => {
        // Handle both string and binary data
        let data = typeof event.data === 'string' ? event.data : new TextDecoder().decode(event.data);
        
        // Strip ANSI escape sequences and control characters
        data = data
          // Remove ANSI escape sequences (ESC[...m, ESC[...H, etc.)
          .replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '')
          // Remove bracketed paste mode sequences
          .replace(/\x1b\[\?2004[lh]/g, '')
          // Remove other control sequences
          .replace(/\x1b\][0-9;]*[a-zA-Z]/g, '')
          // Remove carriage returns that cause overwrites
          .replace(/\r(?!\n)/g, '')
          // Clean up multiple consecutive newlines
          .replace(/\n{3,}/g, '\n\n');
        
        if (data.trim()) {
          appendOutput(data);
        }
      };

      ws.onclose = (event: CloseEvent) => {
        console.log('WebSocket closed:', event.code, event.reason);
        setIsConnected(false);
        wsRef.current = null;
        
        if (event.code !== 1000) { // Not a normal closure
          appendOutput(`\n❌ Terminal connection lost (${event.reason || 'Unknown reason'})\n`);
        }
      };

      ws.onerror = (error: Event) => {
        console.error('WebSocket error:', error);
        appendOutput('\n❌ Terminal connection error\n');
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to connect WebSocket:', err);
      appendOutput(`❌ Connection error: ${errorMessage}\n`);
    }
  }, [sessionId, isReady, appendOutput]);

  // Save and run file
  const saveAndRunFile = useCallback(async (filename: string, content: string): Promise<{ success: boolean }> => {
    if (!sessionId || !isReady) {
      throw new Error('Session not ready');
    }

    setIsLoading(true);
    setError(null);

    try {
      appendOutput(`📝 Saving ${filename}...\n`);
      
      // Save file
      await pythonTerminalAPI.saveFile(sessionId, filename, content);
      setCurrentFile(filename);
      
      appendOutput(`✅ File saved successfully\n`);
      appendOutput(`🏃 Running: python3 ${filename}\n`);
      appendOutput('─'.repeat(50) + '\n');
      
      // Run file
      await pythonTerminalAPI.runFile(sessionId, filename);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to save/run file:', err);
      setError(errorMessage);
      appendOutput(`❌ Error: ${errorMessage}\n`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, isReady, appendOutput]);

  // Send terminal command directly via WebSocket
  const sendCommand = useCallback(async (command: string): Promise<{ success: boolean }> => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      throw new Error('Terminal not connected');
    }

    try {
      // Send command directly via WebSocket
      wsRef.current.send(JSON.stringify({
        type: 'terminal_input',
        command: command
      }));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to send command:', err);
      appendOutput(`❌ Command failed: ${errorMessage}\n`);
      throw err;
    }
  }, [appendOutput]);

  // Send raw input to WebSocket (for interactive commands)
  const sendInput = useCallback((input: string): void => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(input);
    }
  }, []);

  // Delete session
  const deleteSession = useCallback(async (): Promise<void> => {
    if (!sessionId) return;

    setIsLoading(true);

    try {
      // Close WebSocket first
      if (wsRef.current) {
        wsRef.current.close(1000, 'Session ended');
        wsRef.current = null;
      }

      await pythonTerminalAPI.deleteSession(sessionId);
      
      // Reset state
      setSessionId(null);
      setPodName(null);
      setStatus('idle');
      setIsReady(false);
      setCurrentFile(null);
      setIsConnected(false);
      setError(null);
      
      appendOutput('\n🛑 Session ended\n');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to delete session:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, appendOutput]);

  // Auto-connect WebSocket when session is ready
  useEffect(() => {
    if (isReady && !isConnected && !wsRef.current) {
      connectWebSocket();
    }
  }, [isReady, isConnected, connectWebSocket]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close(1000, 'Component unmounted');
      }
    };
  }, []);

  // Get session status
  const refreshStatus = useCallback(async (): Promise<SessionStatus | undefined> => {
    if (!sessionId) return;

    try {
      const statusData = await pythonTerminalAPI.getSessionStatus(sessionId);
      setStatus(statusData.status as SessionStatusType);
      setIsReady(statusData.ready);
      setCurrentFile(statusData.currentFile);
      setPodName(statusData.podName);
      return statusData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to refresh status:', err);
      setError(errorMessage);
    }
  }, [sessionId]);

  // Sync filesystem structure
  const syncFileSystem = useCallback(async (fileStructure: SyncItem[]): Promise<SyncResponse> => {
    if (!sessionId || !isReady) {
      throw new Error('Session not ready');
    }

    try {
      const response = await pythonTerminalAPI.syncFileSystem(sessionId, fileStructure);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to sync filesystem:', err);
      throw err;
    }
  }, [sessionId, isReady]);

  // Execute file cleanly
  const executeFile = useCallback(async (filePath: string): Promise<ExecuteResponse> => {
    if (!sessionId || !isReady) {
      throw new Error('Session not ready');
    }

    try {
      const response = await pythonTerminalAPI.executeFile(sessionId, filePath);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to execute file:', err);
      throw err;
    }
  }, [sessionId, isReady]);

  return {
    // Session state
    sessionId,
    podName,
    status,
    isReady,
    currentFile,
    error,
    isLoading,
    
    // WebSocket state
    isConnected,
    terminalOutput,
    
    // Actions
    createSession,
    saveAndRunFile,
    sendCommand,
    sendInput,
    deleteSession,
    refreshStatus,
    connectWebSocket,
    syncFileSystem,
    executeFile,
    
    // Terminal management
    clearOutput,
    appendOutput,
    
    // Computed properties
    canRun: isReady && !isLoading,
    canSendCommands: isConnected && !isLoading,
  };
};

export default usePythonTerminal;