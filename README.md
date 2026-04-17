## Thoughost

Thoughost is a static-exported `Next.js 16` App Router site.

- The production content source of truth is `src/content/**`.
- The rendered build path is `src/content/** -> src/server/services/** -> src/app/** -> next build -> out/`.
- The current shipped site supports `en`, `zh`, and `ja`.
- `Prisma`, `src/server/db.ts`, `src/server/api/**`, and `src/app/api/trpc/[trpc]` are reserved scaffolding only, not live runtime dependencies.

## Current Architecture

- Runtime model: static export via `next build`
- Rendered content source of truth: `src/content/**`
- View-model layer: `src/server/services/**`
- Frontend routes: `src/app/**`
- Optional deployment knobs:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_BASE_PATH`

### Reserved scaffolding

These areas exist in the repo, but are not part of the current rendered site path:

- `prisma/**`
- `src/server/db.ts`
- `src/server/api/**`
- `src/app/api/trpc/[trpc]`

They should be treated as future-facing scaffolding, not as live runtime boundaries.
The `src/app/api/trpc/[trpc]` directory intentionally has no `route.ts` yet and
contains a local placeholder note instead.

## Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `Vitest`
- local content files for site copy and news
- optional `Prisma` + `SQLite` scaffolding for future DB-backed reads

## Getting Started

1. Install dependencies

```bash
pnpm install
```

2. Create your env file

```bash
copy .env.example .env
```

3. Generate Prisma artifacts only if you need the reserved DB scaffolding

```bash
pnpm db:generate
pnpm db:push
pnpm db:seed
```

4. Start the development server

```bash
pnpm dev
```

Open `http://localhost:3000`. The root route `/` renders the default English home page directly, while localized routes remain available at `/en`, `/zh`, and `/ja`.

## Locales

The current route model is three-language:

- `en`
- `zh`
- `ja`

Japanese routes now use the standard locale key `ja`.

## Routes

Current generated route groups include:

- `/{locale}`
- `/{locale}/about`
- `/{locale}/news`
- `/{locale}/news/[slug]`
- `/{locale}/project`
- `/{locale}/releases`
- `/{locale}/releases/[slug]`
- `/{locale}/special/black-hole`
- `/{locale}/special/thoughts`

For `/{locale}`, the current supported values are `/en`, `/zh`, and `/ja`.

## Environment Variables

Defined or supported by the current app:

- `DATABASE_URL`
  - Used only by Prisma and DB scaffolding.
  - Default local value: `file:./dev.db`
- `NEXT_PUBLIC_SITE_URL`
  - Used for metadata base URLs.
  - Recommended for production builds.
- `NEXT_PUBLIC_BASE_PATH`
  - Optional subpath deployment prefix.
  - Used by static asset helpers and Next `basePath`.

## Deployment Notes

- `next.config.ts` uses `output: "export"`, so deployment target must be able to serve static HTML/CSS/JS from the generated `out/` directory.
- Images are configured with `unoptimized: true`, so no server-side image optimizer is required.
- If deploying under a subpath, set `NEXT_PUBLIC_BASE_PATH` consistently at build time.
- The root route renders the default English home page directly and does not depend on a client-side redirect.
- On GitHub Pages or any subpath deployment, the root page and localized links continue to respect the configured `basePath`.

## Quality Checks

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

`pnpm typecheck` runs `next typegen` first and then uses a dedicated `tsconfig.typecheck.json` so Next-generated validator files stay stable outside a full production build.

## Additional Docs

- Audit report: `docs/engineering-audit-2026-03-27.md`
- Architecture note: `docs/current-architecture.md`
- Scaffolding status: `docs/scaffolding-status.md`
