export default defineNuxtConfig({
  devtools: { enabled: true },
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
        { name: 'twitter:creator', content: '@ignatpetrov' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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