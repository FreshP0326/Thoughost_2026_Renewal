# Thoughost Engineering Audit

Date: 2026-03-29
Scope: engineering quality audit refresh

Supersedes the original 2026-03-27 audit conclusions.

## Summary

Thoughost is currently a stable static-exported `Next.js 16.2.1` App Router site with a clearly defined production path:

```text
src/content/** -> src/server/services/** -> src/app/** -> next build -> out/
```

The most important boundary is now explicit across the repository:

- `src/content/**` is the production content source of truth
- `src/server/services/**` is the production read-model layer
- `src/app/**` is the rendered route layer
- `Prisma`, `src/server/db.ts`, `src/server/api/**`, and `src/app/api/trpc/[trpc]` are reserved scaffolding only

This refresh replaces older conclusions that were based on pre-`ja` locale normalization and a root redirect implementation that no longer exists.

## Current verified baseline

Quality checks verified for the current repository state:

- `pnpm lint`: passes with zero reported issues
- `pnpm test`: passes, 63 tests
- current locale contract: `en`, `zh`, `ja`
- current root route behavior: default English home page rendered directly at `/`

## Findings

### High

#### 1. Documentation drift was the main remaining risk, and this refresh reduces it

Current state:

- `README.md` now states the static export model, source of truth, supported locales, and scaffolding boundaries near the top of the file.
- `docs/current-architecture.md` and `docs/scaffolding-status.md` align with the same runtime boundary.
- This audit file now reflects the current locale contract and current test baseline.

Remaining requirement:

- Future architecture changes must update all four documents together:
  - `README.md`
  - `docs/current-architecture.md`
  - `docs/scaffolding-status.md`
  - latest audit report

#### 2. CI quality gates were missing and should remain separate from deployment

Current state:

- The repository has a dedicated GitHub Pages deployment workflow.
- A separate CI workflow should continue to run `lint`, `test`, and `typecheck` for pull requests and pushes to `main`.

Risk if not maintained:

- Deployment status alone is not a sufficient engineering quality signal.

### Medium

#### 3. Root route behavior is now explicit, but still needs deployment validation whenever hosting assumptions change

Current state:

- The root route no longer relies on client-side redirect behavior.
- `/` now renders the default English home page directly while localized routes remain available under their locale prefixes.

Residual risk:

- Any future host-specific rewrite or path policy still needs validation under the target static host.

#### 4. Reserved scaffolding remains a maintenance cost unless its exit criteria are enforced

Current state:

- Reserved scaffolding is clearly documented.
- `docs/scaffolding-status.md` now defines 90-day exit criteria for `prisma/**`, `src/server/db.ts`, `src/server/api/**`, and `src/app/api/trpc/[trpc]`.

Residual risk:

- If those criteria are ignored, the repository will gradually accumulate misleading dead architecture again.

## Coverage Notes

Repository-level architecture regression coverage now includes:

- locale contract assertions
- static param generation assertions
- root gateway route assertions
- base path asset assertions
- README and architecture document boundary assertions

## Residual Risks

- This audit still does not include browser-based runtime validation across multiple static hosts.
- This audit still does not include dependency vulnerability scanning.
- This audit still does not include visual regression testing for the root home entry.
