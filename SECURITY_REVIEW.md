# Security Review

This document captures the results of a targeted security review of the repository, with a focus on high-risk behaviors in the Python terminal backend service.

## Summary of Critical Findings

1. **Command Injection in File Synchronization** – The `/api/session/:sessionId/sync` endpoint builds shell commands with unsanitized `path` values supplied by the client (e.g., ``mkdir -p '/tmp/${item.path}'`` and `cat > '/tmp/${item.path}'`). An attacker can inject shell metacharacters or traverse directories to execute arbitrary commands within the session container.【F:backend/server.js†L337-L371】
2. **Command Injection in File Save Endpoint** – The `/api/session/:sessionId/file` endpoint uses ``cat > '/workspace/${filename}'`` with the user-controlled `filename` value. Because the filename is not validated or escaped, an attacker can inject shell commands or write outside the intended directory via path traversal.【F:backend/server.js†L377-L414】
3. **Command Injection in Execute Endpoint** – The `/api/session/:sessionId/execute` endpoint forms `const command = `cd /tmp && python3 '${filePath}' 2>&1`;` with a user-controlled `filePath`. This string is later executed through `/bin/sh -c`, enabling attackers to break out of the quoted context and run arbitrary commands in the pod.【F:backend/server.js†L417-L474】【F:backend/server.js†L539-L595】
4. **Unauthenticated Administrative Surface** – The backend exposes `/api/sessions` and `/health` without authentication. Together with the WebSocket server, this allows any origin (CORS is fully open) to enumerate sessions, monitor pod status, or connect directly to interactive shells if a session ID is known or guessed.【F:backend/server.js†L462-L521】【F:backend/server.js†L620-L707】

## Additional Observations

- **Wide-Open CORS Policy** – The backend enables CORS globally without restriction. In combination with the unauthenticated endpoints above, this permits any website to issue cross-origin requests to administrative APIs, expanding the attack surface.【F:backend/server.js†L11-L13】
- **Lack of Session Authentication** – Session IDs are UUIDs returned to the client without further authentication. Any party that learns a valid session ID can control the Kubernetes pod via REST or WebSocket calls. Implementing authentication (e.g., signed tokens tied to user identity) would mitigate this risk.【F:backend/server.js†L120-L223】【F:backend/server.js†L595-L640】
- **Potential Workspace Escape** – File operations allow arbitrary absolute paths (e.g., `../../..`). Without validation, attackers could overwrite sensitive files inside the container image or mounted volumes.【F:backend/server.js†L337-L414】

## Recommended Remediations

1. Replace shell-based file operations with safe filesystem APIs (e.g., Kubernetes `exec` to run a purpose-built helper that validates paths, or expose a dedicated gRPC/REST file service inside the pod).
2. Enforce strict validation and normalization on `path`, `filename`, and `filePath` inputs. Reject any values containing shell metacharacters or directory traversal sequences.
3. Require authentication and authorization for all session management endpoints and WebSocket upgrades. Consider associating sessions with authenticated Supabase users and issuing short-lived access tokens.
4. Restrict CORS to trusted origins and implement CSRF protections for session management APIs.
5. Add server-side monitoring and rate limiting to detect and block abuse (e.g., repeated session creation or command execution).

Addressing the command-injection flaws should be treated as the highest priority because they allow direct remote code execution inside Kubernetes-managed pods.
