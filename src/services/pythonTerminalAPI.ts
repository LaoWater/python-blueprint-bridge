// src/services/pythonTerminalAPI.ts
// TypeScript API service for Python Terminal Backend

export interface SessionData {
    sessionId: string;
    podName: string;
    status: string;
    reconnected?: boolean;
  }
  
  export interface SessionStatus {
    sessionId: string;
    podName: string;
    status: string;
    ready: boolean;
    currentFile: string | null;
    uptime: number;
  }
  
  export interface FileResponse {
    success: boolean;
    message: string;
    path: string;
  }
  
  export interface RunResponse {
    success: boolean;
    message: string;
    command: string;
  }
  
  export interface CommandResponse {
    success: boolean;
    message: string;
  }

  export interface SyncItem {
    path: string;
    content?: string;
    type: 'file' | 'folder';
  }

  export interface SyncResponse {
    success: boolean;
    message: string;
    results: Array<{
      path: string;
      type: 'file' | 'folder';
      success: boolean;
      error?: string;
    }>;
  }

  export interface ExecuteResponse {
    success: boolean;
    output: string;
    filePath: string;
    command?: string;
    error?: string;
  }
  
  export interface DeleteResponse {
    success: boolean;
    message: string;
  }
  
  export interface SessionsResponse {
    sessions: SessionStatus[];
    count: number;
  }
  
  export interface HealthResponse {
    status: string;
    activeSessions: number;
    activeConnections: number;
    timestamp: string;
  }
  
  export interface APIError {
    error: string;
    details?: string;
  }
  
  class PythonTerminalAPI {
    private baseURL: string;
    private wsURL: string;
  
    constructor(baseURL: string = 'http://localhost:3000', wsURL: string = 'ws://localhost:8082') {
      this.baseURL = baseURL;
      this.wsURL = wsURL;
    }
  
    // Create a new Python session or reconnect to existing
    async createSession(userId?: string, reconnect: boolean = false): Promise<SessionData> {
      try {
        const response = await fetch(`${this.baseURL}/api/session/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            reconnect
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data: SessionData = await response.json();
        console.log('Session created:', data);
        return data;
      } catch (error) {
        console.error('Error creating session:', error);
        throw error;
      }
    }
  
    // Check session status
    async getSessionStatus(sessionId: string): Promise<SessionStatus> {
      try {
        const response = await fetch(`${this.baseURL}/api/session/${sessionId}/status`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Session not found');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error getting session status:', error);
        throw error;
      }
    }
  
    // Save file to the pod
    async saveFile(sessionId: string, filename: string, content: string): Promise<FileResponse> {
      try {
        const response = await fetch(`${this.baseURL}/api/session/${sessionId}/file`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filename,
            content,
          }),
        });
  
        if (!response.ok) {
          const errorData: APIError = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
  
        const data: FileResponse = await response.json();
        console.log('File saved:', data);
        return data;
      } catch (error) {
        console.error('Error saving file:', error);
        throw error;
      }
    }
  
    // Run Python file
    async runFile(sessionId: string, filename: string): Promise<RunResponse> {
      try {
        const response = await fetch(`${this.baseURL}/api/session/${sessionId}/run`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filename,
          }),
        });
  
        if (!response.ok) {
          const errorData: APIError = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
  
        const data: RunResponse = await response.json();
        console.log('File execution started:', data);
        return data;
      } catch (error) {
        console.error('Error running file:', error);
        throw error;
      }
    }
  
    // Sync filesystem structure to pod
    async syncFileSystem(sessionId: string, fileStructure: SyncItem[]): Promise<SyncResponse> {
      try {
        const response = await fetch(`${this.baseURL}/api/session/${sessionId}/sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileStructure,
          }),
        });

        if (!response.ok) {
          const errorData: APIError = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data: SyncResponse = await response.json();
        console.log('Filesystem synced:', data);
        return data;
      } catch (error) {
        console.error('Error syncing filesystem:', error);
        throw error;
      }
    }

    // Execute Python file cleanly
    async executeFile(sessionId: string, filePath: string): Promise<ExecuteResponse> {
      try {
        const response = await fetch(`${this.baseURL}/api/session/${sessionId}/execute`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filePath,
          }),
        });

        if (!response.ok) {
          const errorData: APIError = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data: ExecuteResponse = await response.json();
        console.log('File executed:', data);
        return data;
      } catch (error) {
        console.error('Error executing file:', error);
        throw error;
      }
    }

    // Send terminal command
    async sendCommand(sessionId: string, command: string): Promise<CommandResponse> {
      try {
        const response = await fetch(`${this.baseURL}/api/session/${sessionId}/command`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            command,
          }),
        });
  
        if (!response.ok) {
          const errorData: APIError = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
  
        const data: CommandResponse = await response.json();
        console.log('Command sent:', data);
        return data;
      } catch (error) {
        console.error('Error sending command:', error);
        throw error;
      }
    }
  
    // Delete session
    async deleteSession(sessionId: string): Promise<DeleteResponse> {
      try {
        const response = await fetch(`${this.baseURL}/api/session/${sessionId}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          const errorData: APIError = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
  
        const data: DeleteResponse = await response.json();
        console.log('Session deleted:', data);
        return data;
      } catch (error) {
        console.error('Error deleting session:', error);
        throw error;
      }
    }
  
    // Create WebSocket connection
    createWebSocket(sessionId: string): WebSocket {
      const wsUrl = `${this.wsURL}?sessionId=${sessionId}`;
      console.log('Connecting to WebSocket:', wsUrl);
      
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        console.log('WebSocket connected');
      };
      
      ws.onclose = (event: CloseEvent) => {
        console.log('WebSocket closed:', event.code, event.reason);
      };
      
      ws.onerror = (error: Event) => {
        console.error('WebSocket error:', error);
      };
      
      return ws;
    }
  
    // Get all active sessions (admin)
    async getActiveSessions(): Promise<SessionsResponse> {
      try {
        const response = await fetch(`${this.baseURL}/api/sessions`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error getting active sessions:', error);
        throw error;
      }
    }
  
    // Health check
    async healthCheck(): Promise<HealthResponse> {
      try {
        const response = await fetch(`${this.baseURL}/health`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error checking health:', error);
        throw error;
      }
    }
  
    // Wait for session to be ready
    async waitForSessionReady(
      sessionId: string, 
      maxAttempts: number = 30, 
      interval: number = 2000
    ): Promise<SessionStatus> {
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
          const status = await this.getSessionStatus(sessionId);
          
          if (status.ready) {
            console.log(`Session ${sessionId} is ready after ${attempt + 1} attempts`);
            return status;
          }
          
          console.log(`Session ${sessionId} not ready yet (${status.status}), waiting...`);
          
          // Wait before next attempt
          await new Promise(resolve => setTimeout(resolve, interval));
        } catch (error) {
          console.error(`Attempt ${attempt + 1} failed:`, error);
          
          if (attempt === maxAttempts - 1) {
            throw new Error(`Session failed to become ready after ${maxAttempts} attempts`);
          }
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, interval));
        }
      }
      
      throw new Error(`Session timed out after ${maxAttempts * interval / 1000} seconds`);
    }
  }
  
  // Export singleton instance
  const pythonTerminalAPI = new PythonTerminalAPI();
  export default pythonTerminalAPI;
  
  // Also export the class for custom instances
  export { PythonTerminalAPI };