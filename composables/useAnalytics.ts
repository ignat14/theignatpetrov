import { ref } from 'vue'

export const useAnalytics = () => {
  const isLoadingAnalytics = ref<boolean>(true)
  const analyticsData = ref<any[]>([])

  const fetchAnalytics = async () => {
    try {
      const data = await $fetch('/api/analytics/pageviews') as any[]
      analyticsData.value = Array.isArray(data) ? data : []
      return analyticsData.value
    } catch (error) {
      console.warn('Could not fetch analytics data:', error)
      return []
    } finally {
      isLoadingAnalytics.value = false
    }
  }

  const getViewCount = (slug: string): number => {
    const analyticsMatch = analyticsData.value.find(item => 
      item.path.includes(slug)
    )
    return analyticsMatch ? analyticsMatch.views : 0
  }

  const updateBlogPosts = (posts: any[]) => {
    posts.forEach(post => {
      const analyticsMatch = analyticsData.value.find(item => 
        item.path.includes(post.slug)
      )
      if (analyticsMatch) {
        post.views = analyticsMatch.views
      }
    })
  }

  return {
    isLoadingAnalytics,
    analyticsData,
    fetchAnalytics,
    getViewCount,
    updateBlogPosts
  }
}