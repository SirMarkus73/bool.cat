# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- intent-skills:start -->
# TanStack Intent
Before editing files involving TanStack Devtools, Router, Start, or virtual file routes, use the `tanstack-intent` skill (@.claude/skills/tanstack-intent/SKILL.md) to find and run the matching guidance command first.
<!-- intent-skills:end -->

# Frontend Design
Before editing any UI component visually (styling, layout, appearance changes), use the `frontend-design@claude-plugins-official` skill first.

# Import Paths
Always use absolute imports with the `#/` alias, never relative paths. See @.claude/rules/imports.md.

## Project

bool.cat is a URL shortener web app (TanStack Start + React 19) with a user dashboard, custom/simple slug modes, expiring links, QR-code-ready short URLs, and transactional email. UI strings are localized in Catalan, Spanish, and English.

## Commands

Package manager is **pnpm**.

```bash
pnpm install          # install deps
docker compose up -d  # start local Postgres (5432) + Mailpit (SMTP :1025, UI :8025)
pnpm db:push          # push Drizzle schema to the database (no migration files in dev)
pnpm dev              # dev server on http://localhost:3000
```

- `pnpm build` / `pnpm preview` — production build / preview
- `pnpm test` / `pnpm test:watch` — vitest (runs on every commit via husky pre-commit; commit-msg hook enforces Conventional Commits via commitlint)
- Run a single test file: `pnpm test src/features/shortener/service/createSimpleShortUrl.test.ts`
- `pnpm check` / `pnpm lint` / `pnpm format` — Biome (tabs, double quotes, import organization on)
- `pnpm db:studio` / `pnpm db:pull` — Drizzle Studio / introspect existing DB
- `pnpm machine-translate` — machine-translate `messages/*.json` via inlang
- `pnpm email:dev` — preview React Email templates (port 3001)
- `pnpm generate-routes` — regenerate `src/routeTree.gen.ts` from file routes (usually automatic via the TanStack Start Vite plugin during `dev`/`build`)

Required env vars (see `.env.example`): `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `SMTP_HOST/PORT/USER/PASSWORD`, `JWT_SECRET`, `VITE_SIMPLE_SHORT_URL_EXPIRATION_HOURS`. They're validated with zod in `src/lib/env/server.ts` (server, extends client schema) and `src/lib/env/client.ts` (client-safe subset) — add new env vars to those schemas, not just `.env.example`.

## Architecture

**Stack**: TanStack Start + TanStack Router (file-based routes in `src/routes`) on Vite/Nitro, React 19, Drizzle ORM over PostgreSQL, better-auth for authentication, shadcn/ui (`style: base-nova`) + Tailwind v4, Inlang/Paraglide for i18n, React Email + Nodemailer for mail, Biome for lint/format, Vitest for tests.

**Import aliases**: `#/*` is the convention — always import from `src` with an absolute `#/...` path (e.g. `#/features/shortener/component.tsx`), never a relative path (`./`, `../`). `@/*` also resolves to `./src/*` (both defined in `package.json#imports` and `tsconfig.json#paths`) but exists only for compatibility with older code that hasn't been migrated yet — don't use `@/` in new or edited code.

**Feature-first layout** (`src/features/<feature>/`): each feature owns its own `components/`, `service/` (pure server-side business logic), `serverFn/` (thin TanStack Start `createServerFn` wrappers around `service/`), `lib/`, etc. `serverFn` handlers validate input with zod and delegate to `service` functions — put logic in `service`, not in the server function handler.

**`ApiResponse<T>` convention** (`src/interfaces/api.d.ts`): server-side operations return a discriminated union — `{ success: true, data: T }` or `{ success: false, type: "auth" | "server", message }` — instead of throwing. Route `beforeLoad`/loaders and UI code branch on `response.success`. Follow this pattern for new service/serverFn functions rather than throwing errors across the client/server boundary.

**Auth**: better-auth is configured in `src/features/auth/lib/auth.ts` (Drizzle adapter, email+password with required verification, `tanstackStartCookies()` plugin) and mounted at `src/routes/api/auth/$.ts`. `src/features/auth/server/middleware.ts` exposes `withAuthContext`, a TanStack Start middleware that resolves the session into an `AuthContext` (`ApiResponse<{ user }>`) and injects it into server function `context` — server functions that need the current user compose this middleware rather than reading the session themselves.

**Short URL creation flow**: two modes, both funnel through JWT-signed slug tokens rather than trusting a client-supplied slug directly.
- Simple mode: `getRandomSlugToken` service (`src/features/shortener/service/`) generates a unique slug via `nanoid` + `checkSlugAvailability`, then signs it into a short-lived (5 min) JWT (`JWT_SECRET`). `createSimpleShortUrl` verifies that token server-side before inserting the row, so the slug actually persisted is the one the server generated.
- Custom mode: user-entered text is normalized by `slugify` (`src/features/shortener/lib/slugify.ts`), checked for availability, and (per `getSlugSegments`) diffed against the original input to render a before/after preview in the UI.
- Rows in `short_url` (`src/db/schema/shortUrl.ts`) always have an `expirationDate` and an optional `ownerId` (null for unauthenticated/guest links, cascade-deleted with the owning user).

**Redirect route**: `src/routes/$.tsx` is the catch-all route — its `beforeLoad` looks up the splat slug via `getUrlBySlug` and issues a TanStack Router `redirect`, or throws `notFound()` (custom `NotFoundComponent`) if the slug doesn't exist/has expired.

**i18n**: Paraglide compiles `messages/{en,es,ca}.json` (source of truth, edited manually or via `pnpm machine-translate`) into `src/paraglide/` (generated, Biome-ignored) via the Vite plugin. Locale is resolved by URL prefix (`/en`, `/es`, `/ca`; `en` is the base/unprefixed locale) with cookie/header fallback (see `urlPatterns`/`strategy` in `vite.config.ts`). Use the generated `m["message.key"]()` functions (see `src/features/auth/lib/auth.ts` for a server-side example) rather than hardcoding UI strings.

**Testing**: Vitest (`node` environment) auto-mocks the real I/O boundaries globally in `src/test/setup.ts` — `#/db` is replaced by `mockDb` from `src/test/mocks/db.ts` for every test file. Reset mocks with the exported `resetDbMocks()`/similar helpers in `beforeEach`, don't re-mock `#/db` per-test. `src/test/mocks/authContext.ts` provides ready-made `authenticatedUser`/`unauthenticatedUser` `AuthContext` fixtures for exercising both branches of auth-gated services. `serverEnv` is left real in tests, backed by the fixed test values in `vitest.config.ts#test.env` (so e.g. JWT signing/verification tests use a real, stable `JWT_SECRET`). Tests live alongside the code they cover as `*.test.ts`.
