# Security Remediation Plan

This plan maps the critical findings from `SECURITY_REVIEW.md` to concrete remediation work. Each item references the affected code in `backend/server.js` and outlines the required mitigation steps.

## Priority 1 – Eliminate Command Injection

- **Sync endpoint (`/api/session/:sessionId/sync`)** – `python-blueprint-bridge-fork/backend/server.js:350-365`  
  Replace the shell-based directory and file creation logic with safe filesystem operations (e.g., Node `fs` APIs). Validate and normalize `item.path` before use, rejecting values with traversal (`..`), absolute paths, or shell metacharacters.

- **File save endpoint (`/api/session/:sessionId/file`)** – `python-blueprint-bridge-fork/backend/server.js:401-409`  
  Stop piping raw content through `/bin/sh`. Use server-side utilities (temporary files + `kubectl cp`, Kubernetes API streams, or dedicated file-service RPC) that validate `filename`, enforce a workspace root, and prevent traversal outside `/workspace`.

- **Execute endpoint (`/api/session/:sessionId/execute`)** – `python-blueprint-bridge-fork/backend/server.js:441-447`  
  Avoid passing `filePath` to the shell. Resolve the path using a whitelist of synced files, ensure it stays under `/tmp`, and execute via `python3`'s argument vector (`['python3', resolvedPath]`) through the Kubernetes exec client without going through `/bin/sh -c`.

- **Shared helper (Kubernetes exec)** – `python-blueprint-bridge-fork/backend/server.js:605-612`  
  Update `executeCommand` to invoke `exec.exec` with argument arrays only (`['/usr/bin/python3', resolvedPath]`, etc.) so the shell is never in the path. Reject requests when the command string contains disallowed characters until the helper is refactored.

## Priority 2 – Enforce Authentication and Access Control

- **Administrative surface exposure** – `python-blueprint-bridge-fork/backend/server.js:555-567`, `python-blueprint-bridge-fork/backend/server.js:846-855`  
  Require authenticated callers for `/api/sessions`, `/health`, WebSocket upgrades, and any other administrative routes. Tie sessions to authenticated Supabase users; issue signed, short-lived tokens to authorize REST + WS traffic.

- **Session identifier protection** – `python-blueprint-bridge-fork/backend/server.js:217-220`, `python-blueprint-bridge-fork/backend/server.js:595-640`  
  Never return raw session IDs without authentication. Store them server-side and expose opaque, signed tokens to clients. Validate tokens on every request before looking up `sessionId`.

## Priority 3 – Platform Hardening

- **CORS restrictions** – `python-blueprint-bridge-fork/backend/server.js:11`  
  Replace the blanket `app.use(cors())` with an allowlist of trusted origins and enable CSRF defenses for session-management endpoints.

- **Workspace boundary enforcement** – `python-blueprint-bridge-fork/backend/server.js:350-409`  
  Centralize path normalization: resolve every requested path against an allowed root, reject absolute paths, symbolic links, or traversal sequences before performing filesystem actions.

- **Monitoring and rate limiting**  
  Add metrics, logging, and throttling around session creation, command execution, and WebSocket usage to detect abuse and contain blast radius during incidents.

## Verification Checklist

1. Automated tests cover the sanitized file sync/save/execute flows and reject malicious inputs.
2. Manual pen test validates that shell metacharacters and traversal payloads are blocked.
3. Authenticated requests are required for admin APIs, WebSocket access, and session creation; unauthorized requests fail.
4. Cross-origin requests from untrusted sites are rejected.
5. Incident monitoring alerts on repeated failures or suspicious command patterns.

Completing the Priority 1 items eliminates remote code execution paths. Priorities 2 and 3 reduce exposure of session control and harden the platform against future attacks.
