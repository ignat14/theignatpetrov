import type { BlogStatsResponse, AnalyticsData } from '~/types/analytics'
import type { BlogPost } from '~/types/blog'
import { BLOG_CONFIG } from '~/utils/config'
import { blogStatsCache } from '~/utils/cache'

interface BlogStatsState {
  analytics: AnalyticsData
  isLoading: boolean
  error: string | null
}

export const useBlogStats = () => {
  const state = reactive<BlogStatsState>({
    analytics: [],
    isLoading: false,
    error: null
  })

  const fetchBlogStats = async (useCache: boolean = true): Promise<BlogStatsResponse> => {
    if (useCache) {
      const cachedData = blogStatsCache.get()
      if (cachedData) {
        state.analytics = cachedData.analytics
        state.isLoading = false
        state.error = null
        return cachedData
      }
    }

    state.isLoading = true
    state.error = null

    try {
      const data = await $fetch(BLOG_CONFIG.API.BLOG_STATS) as BlogStatsResponse

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format')
      }

      const validatedData: BlogStatsResponse = {
        analytics: Array.isArray(data.analytics) ? data.analytics : []
      }

      state.analytics = validatedData.analytics
      blogStatsCache.set(validatedData)

      return validatedData
    } catch (error: unknown) {
      console.error('Failed to fetch blog stats:', error)

      const message = error instanceof Error ? error.message : ''
      state.error = message.includes('fetch')
        ? BLOG_CONFIG.ERRORS.NETWORK
        : BLOG_CONFIG.ERRORS.GENERIC_FETCH

      const emptyData: BlogStatsResponse = { analytics: [] }

      if (!state.analytics.length) {
        state.analytics = emptyData.analytics
      }

      return emptyData
    } finally {
      state.isLoading = false
    }
  }

  const getViewCount = (slug: string): number => {
    const analyticsMatch = state.analytics.find(item =>
      item.path && item.path.includes(slug)
    )
    return analyticsMatch ? analyticsMatch.views : 0
  }

  const updateBlogPosts = (posts: BlogPost[]): void => {
    posts.forEach(post => {
      const analyticsMatch = state.analytics.find(item =>
        item.path && item.path.includes(post.slug)
      )
      if (analyticsMatch) {
        post.views = analyticsMatch.views
      }
    })
  }

  const clearCache = (): void => {
    blogStatsCache.clear()
  }

  const refreshStats = async (): Promise<BlogStatsResponse> => {
    return await fetchBlogStats(false)
  }

  return {
    isLoading: readonly(toRef(state, 'isLoading')),
    error: readonly(toRef(state, 'error')),
    analytics: readonly(toRef(state, 'analytics')),

    fetchBlogStats,
    refreshStats,
    getViewCount,
    updateBlogPosts,
    clearCache
  }
}
