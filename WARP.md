# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Blue Pigeon is a revolutionary cloud-based IDE platform that combines programming education with a professional development environment. It features a React frontend with a Kubernetes-powered Python terminal backend, enabling users to write, execute, and debug Python code entirely in the browser.

## Common Development Commands

### Frontend Development
```bash
# Start development server (includes concurrent frontend + backend)
npm run dev

# Frontend only
npm run start

# Build for production
npm run build

# Build for development
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Backend Development
```bash
# Backend commands (from root)
npm run backend:dev        # Start backend in development mode
npm run backend:start      # Start backend in production mode
npm run backend:build      # Compile TypeScript backend
npm run backend:install    # Install backend dependencies

# Or directly from backend directory
cd backend
npm run dev                # Development with nodemon
npm start                  # Production start
```

### Testing and Development
```bash
# Run specific test files (when test suite is available)
npm test

# Check health of Kubernetes backend
curl http://localhost:3000/health

# Check Kubernetes integration status
curl http://localhost:3000/api/k8s/status
```

## High-Level Architecture

### Frontend Architecture (React + TypeScript)

**Core Structure:**
- **App.tsx**: Main application with routing, providers, and context setup
- **pages/**: Page components including the star feature `IDEPage.tsx`
- **components/**: Reusable UI components with AuthContext and theme providers
- **hooks/**: Custom hooks like `useExplorer` for database operations and `usePythonTerminal` for Kubernetes integration
- **services/**: API services for database operations and sync tracking

**Key Components:**
- **IDEPage**: The centerpiece - a full VS Code-like IDE with file explorer, Monaco editor, and integrated terminal
- **AuthContext**: Supabase authentication integration
- **useExplorer**: Database-driven file system management with PostgreSQL backend
- **usePythonTerminal**: Kubernetes integration for cloud Python execution

### Backend Architecture (Node.js + Kubernetes)

**Core Structure:**
- **server.js**: Express server managing Python execution sessions via Kubernetes
- **WebSocket Integration**: Real-time terminal communication with Alpine Linux containers
- **Session Management**: Auto-scaling pods with 30-minute timeouts and cleanup

**Key Features:**
- Creates isolated Python environments (Alpine Linux containers) for each user
- WebSocket-based terminal streaming for real-time interaction
- Automatic session cleanup and resource management
- File synchronization between database and container filesystem
- Cost-optimized with 50MB containers and resource limits

### Database Schema (Supabase PostgreSQL)

**Core Tables:**
- `projects`: User workspaces with complete isolation
- `file_system_items`: Hierarchical file/folder structure
- `file_history`: Automatic version control for every change
- `recent_files`: Smart access pattern tracking
- `profiles`: Extended user management

## Important Development Patterns

### File System Integration
The IDE uses a sophisticated database-driven file system:
- Files are stored in PostgreSQL with hierarchical relationships
- Real-time sync between database and Kubernetes containers
- Automatic version control and change tracking
- Row Level Security (RLS) ensures user data isolation

### Python Terminal Integration
- Each user gets isolated Kubernetes pods running Alpine Linux + Python
- WebSocket streaming provides real-time terminal interaction
- Smart command history, tab completion, and Linux shortcuts
- Automatic cleanup and resource optimization

### State Management
- React Query for server state and caching
- Local state for UI interactions and editor content
- Context providers for authentication and content management
- Custom hooks for complex operations (file management, terminal control)

### Cloud Infrastructure
- Google Cloud Platform with Kubernetes orchestration
- Auto-scaling containers with resource limits (50m CPU, 128Mi RAM)
- Workload Identity for secure cluster access
- Cost-optimized with scale-to-zero capabilities

## Key Technologies

### Frontend Stack
- **React 18 + TypeScript**: Type-safe component development
- **Vite**: Lightning-fast development and optimized builds
- **Tailwind CSS + shadcn/ui**: Design system with accessible components
- **Monaco Editor**: VS Code editor engine integration
- **React Query**: Intelligent data fetching and caching
- **React Router v6**: Client-side routing
- **Supabase**: PostgreSQL database and authentication

### Backend Stack
- **Node.js + Express**: API server with WebSocket support
- **Kubernetes Client**: Pod management and orchestration
- **WebSocket (ws)**: Real-time terminal communication
- **Docker**: Alpine Linux container images for Python execution
- **Google Cloud Platform**: Container registry and cluster management

### Development Tools
- **ESLint**: Code quality and consistency
- **TypeScript**: Type safety across the entire stack
- **Concurrently**: Run frontend and backend simultaneously
- **Nodemon**: Backend development with hot reload

## Project-Specific Guidelines

### IDE Component Development
When working on the IDE (`src/pages/IDEPage.tsx`):
- File operations should always sync with both database and Kubernetes containers
- Use the `useExplorer` hook for all file system operations
- Terminal integration requires WebSocket connection management
- Handle both online (Kubernetes) and offline (database-only) modes

### Database Operations
- All file operations must respect Row Level Security (RLS)
- Use the `explorerService` for standardized database operations
- Implement proper error handling for network issues
- Track file changes for sync optimization

### Kubernetes Integration
- Container sessions have 30-minute timeouts - handle cleanup gracefully
- Use Alpine Linux commands (busybox) rather than full GNU tools
- Implement proper WebSocket reconnection logic
- Resource limits are enforced - optimize for 50m CPU, 128Mi RAM

### Authentication Flow
- Supabase auth is integrated throughout the application
- User context is required for file system access and Python sessions
- Handle authentication state changes gracefully
- Implement proper session management for Kubernetes pods

## Configuration Files

### Frontend Configuration
- `vite.config.ts`: Development server and build configuration
- `tsconfig.json`: TypeScript compilation settings
- `tailwind.config.ts`: Design system configuration
- `eslint.config.js`: Code quality rules

### Backend Configuration
- `backend/package.json`: Backend dependencies and scripts
- `k8s-config.yaml`: Kubernetes deployment manifests
- `Dockerfile.python-terminal`: Container definition for Python sessions
- `.env.example`: Required environment variables

### Cloud Infrastructure
- `setup-terminal-platform-mac.sh`: Automated GCP setup script
- `app.yaml`: Google App Engine deployment configuration
- Supabase configuration in `supabase/config.toml`

## Development Workflow

1. **Setup**: Run `npm install` for frontend and `npm run backend:install` for backend dependencies
2. **Development**: Use `npm run dev` to start both frontend and backend concurrently
3. **IDE Testing**: Access `/ide` route for full IDE experience
4. **Kubernetes Testing**: Ensure `kubectl` is configured for container testing
5. **Database Changes**: Use Supabase dashboard or migrations for schema changes
6. **Deployment**: Use build scripts and cloud deployment configurations

This architecture enables a seamless development experience where users can write Python code in a browser-based IDE and execute it in isolated cloud containers, all while maintaining persistent file storage and real-time collaboration capabilities.
