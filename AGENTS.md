# Repository Guidelines

## Project Structure & Module Organization
Frontend code sits in `src/`: shared primitives under `src/components`, route screens in `src/pages`, and helpers in `src/lib`, `src/hooks`, and `src/services`. Static assets live in `public/`. The Node backend stays in `backend/` with its own `package.json` and environment files. Supabase SQL changes belong in `supabase/migrations`, and Vite output lands in `dist/`. Keep tooling-only content (for example, `dependency-manager-mcp/`) separate from app logic.

## Build, Test, and Development Commands
- `npm install` installs frontend dependencies; `npm run backend:install` (run from the repo root) installs backend modules.
- `npm run dev` starts Vite and the Express gateway together for full-stack work.
- `npm run start` serves only the frontend; `npm run backend:dev` runs the backend with Nodemon auto-reload.
- `npm run build` emits the production bundle in `dist/`; `npm run backend:build` transpiles backend TypeScript for deployment.
- `npm run lint` runs the shared ESLint config—use it before PRs to catch alias and Tailwind slip-ups.

## Coding Style & Naming Conventions
Write React function components in TypeScript with two-space indentation. Favor named exports and reuse the `@/` alias for modules under `src/`. Group Tailwind utilities roughly by layout → spacing → color to match existing files. Run `npm run lint` before pushing; when in doubt, mirror nearby code instead of introducing new patterns.

## Testing Guidelines
There is no automated suite yet. When adding coverage, prefer Vitest plus React Testing Library, document new scripts in `package.json`, and keep tests beside the feature directory. Until that lands, smoke-test key flows via `npm run dev`, covering authentication, IDE sessions, and Supabase-driven pages. Include manual steps or cURL examples in PRs for backend fixes.

## Commit & Pull Request Guidelines
Commits trend toward short, descriptive subject lines (see `git log`). Keep using present-tense imperatives that name the area first (`frontend: guard quiz timer`). PRs should summarize the user impact, call out affected routes/APIs, and link Supabase migration IDs when relevant. Attach screenshots or terminal output for UI or API changes and confirm lint/build status in the description.

## Configuration & Security Notes
Duplicate `backend/.env.example` to `backend/.env` and supply Kubernetes, Supabase, and WebSocket values; never commit secrets. Frontend environment keys belong in Vite `.env.local` files ignored by Git. When altering Docker (`Dockerfile.python-terminal`) or Kubernetes manifests (`k8s-config.yaml`), validate them locally and coordinate credential rotations before merge.
