import posthog from 'posthog-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  if (!config.public.posthogKey) {
    console.warn('[PostHog] Missing API key — analytics will be unavailable')
    return
  }

  posthog.init(config.public.posthogKey as string, {
    api_host: 'https://eu.i.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
  })

  return {
    provide: { posthog }
  }
})
