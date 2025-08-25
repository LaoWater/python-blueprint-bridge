// backend/types/index.ts
// TypeScript type definitions for the backend

export interface SessionConfig {
    sessionId: string;
    podName: string;
    created: Date;
    lastActivity: number;
    status: string;
    currentFile: string | null;
    ready: boolean;
  }
  
  export interface PodManifest {
    metadata: {
      generateName: string;
      namespace: string;
      labels: {
        app: string;
        session: string;
      };
    };
    spec: {
      restartPolicy: string;
      serviceAccountName: string;
      containers: ContainerSpec[];
      activeDeadlineSeconds: number;
    };
  }
  
  export interface ContainerSpec {
    name: string;
    image: string;
    resources: {
      requests: {
        cpu: string;
        memory: string;
      };
      limits: {
        cpu: string;
        memory: string;
      };
    };
    stdin: boolean;
    stdinOnce: boolean;
    tty: boolean;
    command: string[];
    workingDir: string;
  }
  
  export interface CreateSessionRequest {
    // Empty for now, but can add user preferences later
  }
  
  export interface CreateSessionResponse {
    sessionId: string;
    podName: string;
    status: string;
  }
  
  export interface SaveFileRequest {
    filename: string;
    content: string;
  }
  
  export interface SaveFileResponse {
    success: boolean;
    message: string;
    path: string;
  }
  
  export interface RunFileRequest {
    filename: string;
  }
  
  export interface RunFileResponse {
    success: boolean;
    message: string;
    command: string;
  }
  
  export interface SendCommandRequest {
    command: string;
  }
  
  export interface SendCommandResponse {
    success: boolean;
    message: string;
  }
  
  export interface SessionStatusResponse {
    sessionId: string;
    podName: string;
    status: string;
    ready: boolean;
    currentFile: string | null;
    uptime: number;
  }
  
  export interface DeleteSessionResponse {
    success: boolean;
    message: string;
  }
  
  export interface ListSessionsResponse {
    sessions: SessionStatusResponse[];
    count: number;
  }
  
  export interface HealthCheckResponse {
    status: string;
    activeSessions: number;
    activeConnections: number;
    timestamp: string;
  }
  
  export interface APIError {
    error: string;
    details?: string;
  }
  
  export interface WebSocketMessage {
    type: 'run_command' | 'terminal_command' | 'error' | 'status';
    command?: string;
    message?: string;
    data?: any;
  }
  
  // Environment variables interface
  export interface ServerConfig {
    NODE_ENV: string;
    PORT: number;
    WS_PORT: number;
    K8S_NAMESPACE: string;
    K8S_IMAGE: string;
    SESSION_TIMEOUT: number;
  }