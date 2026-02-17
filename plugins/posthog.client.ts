import posthog from 'posthog-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  posthog.init(config.public.posthogKey as string, {
    api_host: 'https://eu.i.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
  })

  return {
    provide: { posthog }
  }
})
