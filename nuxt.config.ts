export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
    discordUserId: process.env.DISCORD_USER_ID,
    public: {
      posthogKey: process.env.NUXT_PUBLIC_POSTHOG_KEY
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  content: {
    highlight: {
      theme: 'github-dark'
    }
  },
  css: ['~/assets/css/main.css'],
  
  // SEO and Meta
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Ignat Petrov - Software Engineer & Python Lecturer',
      meta: [
        { name: 'description', content: 'Software Engineer, Solopreneur, and Python Lecturer. Building scalable web applications with Vue.js, Python, and modern technologies.' },
        { name: 'keywords', content: 'Software Engineer, Web Developer, Python, Vue.js, JavaScript, Freelancer, Toptal' },
        { name: 'author', content: 'Ignat Petrov' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Ignat Petrov - Software Engineer & Python Lecturer' },
        { property: 'og:description', content: 'Software Engineer, Solopreneur, and Python Lecturer. Building scalable web applications with Vue.js, Python, and modern technologies.' },
        { property: 'og:url', content: 'https://ignatpetrov.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@ignatpetrov' },
        { name: 'theme-color', content: '#0a0a0a' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&family=Saira+Condensed:wght@400;700&family=Syne:wght@400;500;600;700;800&display=swap' }
      ]
    }
  },

  // Performance optimizations
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  // Build optimizations
  experimental: {
    payloadExtraction: false
  }
})