# Scaffolding Status

This repository intentionally keeps Prisma and tRPC scaffolding, but they are not
part of the current rendered site path.

## Current state

- Rendered site path:
  - `src/content/** -> src/server/services/** -> src/app/** -> next build`
- Reserved scaffolding:
  - `prisma/**`
  - `src/generated/prisma/**`
  - `src/server/db.ts`
  - `src/server/api/**`
  - `src/app/api/trpc/[trpc]`

## What "reserved scaffolding" means here

- These files are kept aligned with the current locale contract and core content model.
- They are available for future DB-backed reads or API-backed consumers.
- They do not currently power rendered pages.
- `src/app/api/trpc/[trpc]` intentionally contains no `route.ts` yet; its local
  `README.md` is a placeholder to avoid implying that a live endpoint already exists.

## Rules for future changes

If you add a new locale or change a localized field in `src/content/**`, update:

1. `src/types/**`
2. `src/content/**`
3. `src/server/services/**`
4. `src/server/api/**` locale schemas
5. `prisma/schema.prisma`
6. `prisma/seed.ts`

If you start consuming Prisma or tRPC in production, update:

1. `README.md`
2. `docs/current-architecture.md`
3. this file
4. tests covering the new runtime boundary
