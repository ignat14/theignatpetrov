# CLAUDE.md — theignatpetrov

Personal portfolio and blog site for Ignat Petrov (Software Engineer).

## Stack

- **Framework**: Nuxt 3 (Vue 3 + TypeScript, strict mode)
- **Styling**: Tailwind CSS v3, custom font `Saira Condensed`, dark theme throughout
- **Content**: `@nuxt/content` for markdown-based blog posts
- **Analytics**: PostHog via `posthog-js` (client) + PostHog Query API / HogQL (server)
- **Notifications**: Discord webhooks on contact form submit
- **Testing**: Vitest (unit), Cypress (E2E)
- **Deploy**: Vercel (primary), Netlify-compatible

## Project Structure

```
app.vue                  # Root component (NuxtLayout + NuxtPage)
nuxt.config.ts           # Nuxt config — modules, runtimeConfig, SEO meta
tailwind.config.js       # Custom font, content scan paths
vercel.json              # Vercel deployment config (build, routes)
assets/css/main.css      # Tailwind directives

layouts/
  default.vue            # Main layout — Navigation + footer wrapper

pages/
  index.vue              # Home: matrix hero, skills, latest blog posts
  about.vue              # Bio, skills, experience timeline
  portfolio.vue          # Project gallery (disabled in nav, route exists)
  contact.vue            # Contact form → Discord webhook
  blog/
    index.vue            # Blog listing with search
    [slug].vue           # Individual post with related posts

components/
  Navigation.vue         # Responsive nav, mobile menu (Portfolio link hidden)
  ui/
    ErrorMessage.vue     # Configurable alert (error/warning/info variants)
    SuccessMessage.vue   # Dismissible green success alert
    LoadingSkeleton.vue  # Loading placeholder

composables/
  useBlogPosts.ts        # Load/query blog posts from @nuxt/content
  useBlogStats.ts        # Fetch + cache view counts from PostHog
  useContactForm.ts      # Contact form submission via Discord webhook

server/api/
  analytics/pageviews.get.ts       # PostHog HogQL Query API — 30-day views for /blog/* paths
  blog/stats.get.ts                # Blog stats (analytics only)
  contact/discord-notify.post.ts   # Discord webhook notification

content/blog/            # Markdown blog posts (slug = filename)

types/
  about.ts               # Skill, Experience, Value
  analytics.ts           # AnalyticsDataPoint, BlogStatsResponse, ApiError, ApiResponse<T>
  blog.ts                # BlogPost, BlogContent
  contact.ts             # ContactForm
  navigation.ts          # NavItem, NavigationState
  portfolio.ts           # ProjectCategory, ProjectStatus, Project

utils/
  cache.ts               # CacheManager class + blogStatsCache instance (localStorage + TTL)
  config.ts              # BLOG_CONFIG constants (UI, API, CACHE, ERRORS sections)
  readingTime.ts         # calculateReadTime() — 200 wpm, strips markdown
  errorHandling.ts       # ErrorFactory, ErrorHandler, ErrorUtils (safeAsync, retry, etc.)

plugins/
  posthog.client.ts      # PostHog analytics (client only — EU region, auto-captures pageviews)

public/
  favicon.svg            # Site favicon
  images/profile_pic.jpeg
  robots.txt
  sitemap.xml

tests/
  setup.ts               # Global test setup + mocks
  utils/                 # Unit tests for cache, config, readingTime, errorHandling
  server/api/            # API endpoint tests for blog stats + content
  disabled/              # Composable tests (need Nuxt module setup)

cypress/
  e2e/smoke.cy.ts        # Smoke tests: home, nav, mobile menu, footer
```

## Blog Post Format

Front matter for `/content/blog/*.md`:
```yaml
---
title: 'Post Title'
description: 'Short description'
date: '2025-07-03'
tags: ['Vue.js', 'TypeScript']
readTime: 5
image: 'https://...'
---
```

Slug = filename (e.g. `my-post.md` → `/blog/my-post`).

## Environment Variables

```env
NUXT_PUBLIC_POSTHOG_KEY=      # phc_xxx — Project Settings → Project API key
POSTHOG_PROJECT_ID=           # numeric ID — Project Settings
POSTHOG_PERSONAL_API_KEY=     # phx_xxx — Personal Settings → Personal API keys
DISCORD_WEBHOOK_URL=
DISCORD_USER_ID=
```

## Dev Commands

```bash
npm run dev           # localhost:3000
npm run build         # production build
npm run preview       # preview production build
npm run generate      # static site generation
npm run test          # Vitest unit tests
npm run test:coverage # coverage report
npm run cypress:open  # interactive E2E tests
npm run test:e2e      # headless E2E (starts dev server)
```

## Key Conventions

- **TypeScript strict mode** — no unused vars/params, explicit return types required
- **Composables** handle all shared reactive logic; pages/components stay lean
- **API routes** follow Nuxt file-based convention: `server/api/[feature]/[action].[method].ts`
- **Caching**: `CacheManager` in `utils/cache.ts` wraps localStorage with TTL
- **Tailwind only** — no component library, styling lives in class attributes and scoped `<style>` blocks for animations
- **Dark theme**: `bg-gray-900` / `bg-gray-800` base, emerald/teal/cyan accents
- **Cypress hooks**: UI components use `data-cy` attributes for E2E selectors

## Testing

- **Vitest**: `npm run test` — uses happy-dom environment, global setup in `tests/setup.ts`
- **Cypress**: `npm run cypress:open` — smoke tests only, uses `data-cy` selectors
- **Disabled tests** in `tests/disabled/` need Nuxt module setup to work (composables)
- **Coverage**: `npm run test:coverage` via `@vitest/coverage-v8`

## Things to Know

- Portfolio page (`/portfolio`) exists but its nav link is **hidden** — intentional
- Home page has a matrix-rain hero animation with character morphing — styles are in scoped `<style>` inside `pages/index.vue`
- Blog view counts come from PostHog (server-side HogQL query via `/api/analytics/pageviews`) — counts will be 0 until PostHog accumulates data
- Contact form submissions trigger a Discord webhook (no database)
- The `useBlogStats` composable caches the stats response client-side to avoid redundant API calls
- PostHog uses **EU region** (`https://eu.i.posthog.com`)
- Plugins gracefully warn (not crash) when env vars are missing — safe for local dev without keys
- No CI/CD workflows — relies on Vercel's built-in CI/CD
- No light mode — dark theme only, no toggle
