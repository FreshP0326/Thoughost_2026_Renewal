# tRPC Route Placeholder

This directory is intentionally kept as a placeholder.

Current status:

- There is no `route.ts` here.
- The rendered site does not expose a live tRPC HTTP endpoint.
- `src/server/api/**` is reserved scaffolding only.

Why this exists:

- It marks the intended future location for an App Router tRPC route handler.
- It prevents this path from looking accidentally omitted or half-deleted.

Before adding a real handler here, update:

1. `README.md`
2. `docs/current-architecture.md`
3. `docs/scaffolding-status.md`
4. tests covering the new runtime boundary
