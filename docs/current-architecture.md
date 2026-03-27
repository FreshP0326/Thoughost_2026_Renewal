# Current Architecture

## Production Path

The current production build path is:

```text
src/content/** -> src/server/services/** -> src/app/** -> next build -> out/
```

Details:

- `src/content/site/**` stores site copy, release data, dictionaries, and member content.
- `src/content/news/**` stores news metadata and localized markdown bodies.
- `src/server/services/site-service.ts` and `src/server/services/news-service.ts` convert that content into view models for pages.
- `src/app/**` consumes those service outputs and is what `next build` turns into static HTML.

## Source Of Truth

For the current shipped site, the source of truth is the file-content layer:

- `src/content/site/**`
- `src/content/news/**`

Prisma is not the current source of truth for rendered pages.

## Reserved Scaffolding

The following code exists but is not wired into the rendered site path:

- `prisma/schema.prisma`
- `prisma/seed.ts`
- `src/server/db.ts`
- `src/generated/prisma/**`
- `src/server/api/**`
- `src/app/api/trpc/[trpc]`

These areas should be treated as reserved scaffolding until one of these happens:

1. DB-backed reads are implemented and consumed by `src/server/services/**`.
2. A real route handler is added for the tRPC surface and a client or page actually calls it.

## Locale Model

Current locale keys:

- `en`
- `zh`
- `ja`

Important:

- Japanese routes now use the standards-aligned locale key `ja`.
- Any future locale contract change will affect routes, types, content dictionaries, metadata, and tests.

## Deployment Model

- Static export is enabled with `output: "export"` in `next.config.ts`.
- `NEXT_PUBLIC_BASE_PATH` is supported for subpath deployments.
- `NEXT_PUBLIC_SITE_URL` is used for metadata base URLs.
- The root entry currently uses a client-side redirect to the default locale and also renders a fallback link.
