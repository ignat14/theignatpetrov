# CLAUDE.md — theignatpetrov

Personal portfolio and blog site for Ignat Petrov (Software Engineer).

## Stack

- **Framework**: Nuxt 3 (Vue 3 + TypeScript, strict mode)
- **Styling**: Tailwind CSS v3, custom font `Saira Condensed`, dark theme throughout
- **Content**: `@nuxt/content` for markdown-based blog posts
- **Database**: Supabase (PostgreSQL) — contact messages + blog comments
- **Analytics**: PostHog via `posthog-js` (client) + PostHog Query API / HogQL (server)
- **Notifications**: Discord webhooks on contact form submit
- **Testing**: Vitest (unit), Cypress (E2E)
- **Deploy**: Vercel (primary), Netlify-compatible

## Project Structure

```
app.vue                  # Root component
nuxt.config.ts           # Nuxt config — modules, runtimeConfig, SEO meta
tailwind.config.js       # Custom font, content scan paths
assets/css/main.css      # Tailwind directives

pages/
  index.vue              # Home: matrix hero, skills, latest blog posts
  about.vue              # Bio, skills, experience
  portfolio.vue          # Project gallery (disabled in nav, route exists)
  contact.vue            # Contact form → Supabase + Discord webhook
  blog/
    index.vue            # Blog listing with search
    [slug].vue           # Individual post with comments

components/
  Navigation.vue         # Responsive nav, mobile menu (Portfolio link hidden)
  BlogComments.vue       # Supabase-connected comment section
  ui/
    ErrorMessage.vue
    SuccessMessage.vue
    LoadingSkeleton.vue

composables/
  useBlogPosts.ts        # Load/query blog posts from content
  useBlogStats.ts        # Fetch + cache view counts and comment counts
  useComments.ts         # CRUD for blog comments via Supabase
  useContactForm.ts      # Contact form state and submission

server/api/
  analytics/pageviews.get.ts       # PostHog HogQL Query API — 30-day views for /blog/* paths
  blog/stats.get.ts                # Combined stats (views + comment counts)
  contact/discord-notify.post.ts   # Discord webhook notification

content/blog/            # Markdown blog posts (slug = filename)

types/                   # Shared TypeScript interfaces (blog, comment, contact, etc.)
utils/
  cache.ts               # CacheManager — localStorage with TTL (5 min default)
  config.ts              # BLOG_CONFIG constants
  readingTime.ts         # Reading time from markdown
  errorHandling.ts       # Centralized error utilities

plugins/
  posthog.client.ts      # PostHog analytics (client only — auto-captures pageviews)
  supabase.client.ts     # Supabase client init

supabase-schema.sql      # Database schema for reference
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
---
```

Slug = filename (e.g. `my-post.md` → `/blog/my-post`).

## Database Tables (Supabase)

**contact_messages**: `id`, `first_name`, `last_name`, `email`, `company`, `subject`, `message`, `created_at`, `updated_at`

**blog_comments**: `id`, `post_slug`, `username`, `comment`, `created_at`, `updated_at`

## Environment Variables

```env
NUXT_PUBLIC_SUPABASE_URL=
NUXT_PUBLIC_SUPABASE_ANON_KEY=
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

## Things to Know

- Portfolio page (`/portfolio`) exists but its nav link is **hidden** — intentional
- Home page has a matrix-rain hero animation with character morphing — styles are in scoped `<style>` inside `pages/index.vue`
- Blog view counts come from PostHog (server-side HogQL query via `/api/analytics/pageviews`), not stored in Supabase — counts will be 0 until PostHog accumulates data
- Contact form submissions are saved to Supabase **and** trigger a Discord webhook simultaneously
- The `useBlogStats` composable caches the combined stats response client-side to avoid redundant API calls
