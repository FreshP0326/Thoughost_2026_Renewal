# Thoughost Engineering Audit

Date: 2026-03-27
Scope: engineering quality audit

## Summary

This repository is currently a static-exported `Next.js 16.2.1` App Router site with a working build pipeline, but its engineering boundaries are not yet clean. The production path is file-content driven, while Prisma and tRPC remain present as largely unconnected scaffolding. The site is shippable as a static site, but the repository still communicates multiple conflicting architectures to maintainers.

Quality checks executed during this audit:

- `pnpm lint`: passes with 3 warnings in tests
- `pnpm typecheck`: passes
- `pnpm test`: passes, 41 tests
- `pnpm build`: passes, static pages generated for `en`, `zh`, `jp`

## Current Production Architecture

```text
src/content/** -> src/server/services/** -> src/app/** pages -> next build -> static export in out/
                               ^
                               |
                     some view-model transformation

src/server/api/**  (defined but not consumed)
src/app/api/**     (directory present, no route handler)
prisma/**          (schema + seed present, not used by rendered pages)
src/server/db.ts   (DB client present, not used by rendered pages)
```

### Production path code

- `src/app/**`
- `src/server/services/site-service.ts`
- `src/server/services/news-service.ts`
- `src/content/site/**`
- `src/content/news/**`
- `src/lib/locale.ts`
- `src/lib/markdown.ts`
- relevant rendering components in `src/components/site/**`

### Reserved or non-production path code

- `src/server/api/**`
- `src/server/db.ts`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- generated Prisma client under `src/generated/prisma/**`
- empty `src/app/api/trpc/[trpc]` route directory

These files are not harmless placeholders. They currently imply a DB-backed and API-backed runtime that does not exist in the built site.

## Findings

### High

#### 1. Repository communicates multiple conflicting source-of-truth models

Impact:

- Maintainers can easily assume the app is DB-backed when it is actually file-content backed.
- Future work risks updating Prisma schema or seed data without affecting the live site.
- The cost of onboarding and refactoring is materially higher because the real production path is not obvious.

Evidence:

- Pages read from services, not from Prisma-backed queries:
  - `src/app/(site)/[locale]/page.tsx`
  - `src/server/services/site-service.ts`
  - `src/server/services/news-service.ts`
- Site and release content is defined in files:
  - `src/content/site/data.ts`
  - `src/content/site/releases-data.ts`
  - `src/content/news/items/**`
- Prisma exists in parallel:
  - `prisma/schema.prisma`
  - `prisma/seed.ts`
  - `src/server/db.ts`

Conclusion:

- The actual single source of truth today is `src/content/**`, not Prisma.
- Prisma is a future-facing placeholder only.

Recommended remediation:

- Choose one of these and document it explicitly:
  - Remove Prisma and generated client until DB-backed reads are actually implemented.
  - Keep Prisma, but mark it as non-production scaffolding in README and architecture docs.
  - Fully migrate read paths to DB-backed services and deprecate file-content source.

Default recommendation:

- For the current static export architecture, enforce file-content as the only source of truth and remove or clearly quarantine parallel DB scaffolding.

#### 2. Locale implementation and documentation are inconsistent

Impact:

- Route behavior, content shape, and documentation disagree.
- Maintainers may ship incorrect routing assumptions or miss language-specific regressions.
- `jp` as an internal locale code will continue to create friction with external integrations, conventions, and future SEO/i18n work.

Evidence:

- Locale type and routing use `en | zh | jp`:
  - `src/types/site.ts`
  - `src/content/site/data.ts`
  - `src/lib/locale.ts`
  - `src/app/(site)/[locale]/layout.tsx`
- Build output includes `jp` routes.
- README still describes a bilingual site and route list that omits current `jp` coverage:
  - `README.md`

Conclusion:

- The implemented locale model is three-language, not bilingual.
- `jp` is an internal convention, not the standard language code `ja`.

Recommended remediation:

- Make an explicit decision:
  - Keep `jp` and document it everywhere as an intentional internal route code.
  - Migrate to `ja` and update all route, type, dictionary, and content keys.

Default recommendation:

- Treat locale normalization as a first-class architecture decision. Do not leave `jp` as an undocumented convention.

#### 3. API surface suggests runtime capabilities that do not exist

Impact:

- The repository implies an operational tRPC API layer, but there is no connected route handler.
- Future contributors may build clients against a server path that is not actually deployed.
- This creates dead-weight maintenance and false architectural expectations.

Evidence:

- tRPC routers are defined:
  - `src/server/api/root.ts`
  - `src/server/api/routers/home.ts`
  - `src/server/api/routers/site.ts`
  - `src/server/api/routers/release.ts`
  - `src/server/api/routers/project.ts`
  - `src/server/api/routers/page.ts`
- App API directory exists but contains no route file:
  - `src/app/api/trpc/[trpc]`
- Repository search shows no consumer path for the tRPC router from pages or clients.

Conclusion:

- `src/server/api/**` is currently unconnected scaffolding.

Recommended remediation:

- Either:
  - remove the unused API layer for now, or
  - finish wiring and documenting it as an actual supported interface.

Default recommendation:

- Remove or quarantine it until there is a real route handler and a real consumer.

### Medium

#### 4. Root redirect behavior is fragile under static-export deployment assumptions

Impact:

- The site currently relies on a client-side redirect script rather than a documented static hosting rule.
- This may behave differently across static hosts, subpath deployments, or no-JS conditions.

Evidence:

- Root layout injects `window.location.replace('./en/')`:
  - `src/app/(root)/layout.tsx`
- Root page also renders a fallback link to `/en`:
  - `src/app/(root)/page.tsx`
- `next.config.ts` sets:
  - `output: "export"`
  - `trailingSlash: true`
  - optional `basePath` from `NEXT_PUBLIC_BASE_PATH`

Conclusion:

- The behavior works in a JS-enabled browser, but the deployment contract is implicit rather than explicit.

Recommended remediation:

- Document the root routing expectation for static hosts.
- Add a test or deployment note covering `NEXT_PUBLIC_BASE_PATH`.
- Consider a less fragile default entry strategy if this site must work reliably without client-side redirect assumptions.

#### 5. README is not currently a trustworthy operator document

Impact:

- A new maintainer following README will get an outdated mental model of the product.
- This slows onboarding and increases the odds of breaking production behavior during updates.

Evidence:

- README describes the site as bilingual.
- README route list is outdated relative to generated routes.
- README emphasizes Prisma-backed preparation without explaining that rendered pages are file-content backed.
- `.env.example` only documents `DATABASE_URL`, while runtime also depends on:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_BASE_PATH` in some deployments

Recommended remediation:

- Update README to reflect:
  - three-language site
  - static export deployment model
  - current source-of-truth location
  - exact meaning of database and API scaffolding
  - required and optional env vars

#### 6. Current tests are strong on data mapping, weak on architecture drift

Impact:

- Tests validate many content mapping behaviors but do not guard the highest-risk repository-level regressions.
- The code can remain "green" while architecture drift worsens.

Evidence:

- Existing tests:
  - `src/test/site-service.test.ts`
  - `src/test/news-service.test.ts`
  - `src/test/markdown.test.ts`
  - component tests in `src/components/site/*.test.tsx`
- Missing direct coverage for:
  - locale route generation
  - `generateStaticParams`
  - invalid locale behavior
  - root redirect and basePath behavior
  - duplicate news slug failure path
  - missing markdown body failure path
  - proof that `src/server/api/**` is unconsumed

Recommended remediation:

- Add repository-level regression tests around routing and content loading, not only view-model outputs.

#### 7. Lint baseline is not clean

Impact:

- The project currently tolerates warnings as normal, which weakens signal quality over time.

Evidence:

- `pnpm lint` reports 3 warnings in tests for unused `_fill` arguments.

Recommended remediation:

- Reduce the repo to zero warnings, or explicitly codify why those warnings are accepted.

### Low

#### 8. Markdown pipeline is safe-by-default but under-documented

Impact:

- The sanitization choice is reasonable, but content authors and future maintainers do not have a documented contract for what markdown features are intentionally removed.

Evidence:

- Markdown rendering uses `remark-gfm -> remark-rehype -> rehype-sanitize -> rehype-stringify`:
  - `src/lib/markdown.ts`
- Only a narrow sanitization behavior test exists:
  - `src/test/markdown.test.ts`

Recommended remediation:

- Document supported markdown features and intentionally unsupported HTML.

#### 9. `lang` and locale-code semantics deserve explicit policy

Impact:

- `jp` is used as both route key and `html lang` value in locale layouts, which is a local convention rather than a standards-aligned language tag.

Evidence:

- Locale layout sets `lang={locale}`:
  - `src/app/(site)/[locale]/layout.tsx`

Recommended remediation:

- If `jp` remains as a route key, decide whether rendered `lang` should stay `jp` or be normalized to `ja`.

## Test Coverage Assessment

### Covered well

- localized release mapping
- member/release derivation logic
- localized news preview and article rendering
- markdown sanitization baseline
- several component rendering behaviors

### Not covered but should be

- `generateStaticParams` returns all supported locales
- invalid locale path handling via `assertLocale`
- duplicate news slug throws at build-time
- missing `en.md/zh.md/jp.md` file throws with actionable error
- root redirect behavior under base path
- consistency between supported locale list and README/operator docs
- static-export compatibility of entry routes

## Open Questions

These require an explicit owner decision:

1. Is `jp` an intentional permanent route code, or should the project migrate to `ja`?
2. Is Prisma meant to ship as future scaffolding, or should it be removed until actual DB reads exist?
3. Is tRPC meant to become a supported runtime interface, or should it be removed from the repository now?
4. Must `/` work correctly without client-side JavaScript on static hosts, or is JS redirect acceptable?

## Suggested Remediation Order

1. Clarify the real architecture
   - declare file-content as current source of truth
   - classify Prisma and tRPC as removed, deferred, or production-bound
2. Normalize locale policy
   - decide `jp` vs `ja`
   - update route, docs, and `lang` semantics consistently
3. Repair operator documentation
   - update README and env documentation to match the actual build and deployment model
4. Add anti-drift tests
   - route generation
   - locale validity
   - content file failure paths
   - root redirect/basePath behavior
5. Clean repo baseline
   - resolve lint warnings
   - add a lightweight architecture note for future maintainers

## Minimal Documentation Fix List

- Update `README.md` route list to include current generated routes and three-language behavior.
- Replace "bilingual" wording with the actual language model.
- Add a section stating that rendered site content currently comes from `src/content/**`.
- Explain Prisma and tRPC status explicitly.
- Document `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_PATH`.
- Document static export deployment expectations for `/` and subpath hosting.

## Residual Risks

- This audit did not include browser-based runtime validation across multiple static hosts.
- This audit did not include dependency vulnerability scanning.
- This audit did not verify how search engines or third-party crawlers react to the current root redirect strategy.
- This audit did not include CI pipeline validation because no CI execution path was inspected.
