## Thoughost

Rebuilt Thoughost site using a T3-style stack on top of `Next.js` App Router, `pnpm`, `Prisma`, and `tRPC-ready` server boundaries.

## Stack

- `Next.js 16`
- `TypeScript`
- `Tailwind CSS v4`
- `Prisma` with `SQLite`
- `Vitest`
- local bilingual content layer with future-ready API boundaries

## Getting Started

1. Install dependencies

```bash
pnpm install
```

2. Create your env file

```bash
copy .env.example .env
```

3. Generate Prisma client and push the local SQLite schema

```bash
pnpm db:generate
pnpm db:push
pnpm db:seed
```

4. Start the development server

```bash
pnpm dev
```

Open `http://localhost:3000`, which redirects to `http://localhost:3000/en`.

## Routes

- `/en`
- `/zh`
- `/en/about`
- `/en/releases`
- `/en/releases/[slug]`
- `/en/project`
- `/en/special/thoughts`

## Quality Checks

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

## Notes

- The current UI reads from local seed content for stability.
- `Prisma` schema and seed data are in place so the content model can move to DB-backed reads later.
- Public assets are stored locally in `public/` rather than fetched at runtime.
# Thoughost_2026_Renewal
