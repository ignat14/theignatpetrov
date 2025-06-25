import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  if (config.public.gtag.id) {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: config.public.gtag.id as string
      }
    })
  }
})