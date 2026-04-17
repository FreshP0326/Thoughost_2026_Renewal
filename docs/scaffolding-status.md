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

## Exit criteria

Each reserved area must be handled with one of two outcomes within 90 days of the next architecture review:

- keep it and connect it to a real production read path, with handler, consumer, and tests
- remove it, including generated artifacts, if no production consumer is scheduled

### `prisma/**`

- Keep only if DB-backed reads are scheduled for the rendered site within 90 days.
- Before keeping it, define which `src/server/services/**` reads will move to Prisma and add tests for those reads.
- Otherwise delete the schema, seed, and any generated Prisma output tied to that unused path.

### `src/server/db.ts`

- Keep only if an actual runtime consumer imports it from a production read path within 90 days.
- Before keeping it, document which service or route depends on it and add runtime coverage.
- Otherwise remove it so the repo no longer implies a live DB client.

### `src/server/api/**`

- Keep only if a real API contract will be exposed within 90 days.
- Before keeping it, add a connected route handler, at least one runtime consumer, and tests for the boundary.
- Otherwise remove the unused routers and procedures.

### `src/app/api/trpc/[trpc]`

- Keep only if a real App Router handler will be added within 90 days.
- Before keeping it, add `route.ts`, connect it to `src/server/api/**`, and document the supported endpoint.
- Otherwise remove the placeholder directory so the repo stops implying an imminent live endpoint.

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
