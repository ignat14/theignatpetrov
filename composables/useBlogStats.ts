import type { BlogStatsResponse, AnalyticsData } from '~/types/analytics'
import type { BlogPost } from '~/types/blog'
import { BLOG_CONFIG } from '~/utils/config'
import { blogStatsCache } from '~/utils/cache'

interface BlogStatsState {
  analytics: AnalyticsData
  commentCounts: Record<string, number>
  isLoading: boolean
  error: string | null
}

export const useBlogStats = () => {
  const state = reactive<BlogStatsState>({
    analytics: [],
    commentCounts: {},
    isLoading: false,
    error: null
  })

  const fetchBlogStats = async (useCache: boolean = true): Promise<BlogStatsResponse> => {
    // Try to get cached data first
    if (useCache) {
      const cachedData = blogStatsCache.get()
      if (cachedData) {
        state.analytics = cachedData.analytics
        state.commentCounts = cachedData.commentCounts
        state.isLoading = false
        state.error = null
        return cachedData
      }
    }
    
    state.isLoading = true
    state.error = null
    
    try {
      const data = await $fetch(BLOG_CONFIG.API.BLOG_STATS) as BlogStatsResponse
      
      // Validate response structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format')
      }
      
      const validatedData: BlogStatsResponse = {
        analytics: Array.isArray(data.analytics) ? data.analytics : [],
        commentCounts: data.commentCounts && typeof data.commentCounts === 'object' ? data.commentCounts : {}
      }
      
      // Update state
      state.analytics = validatedData.analytics
      state.commentCounts = validatedData.commentCounts
      
      // Cache the fresh data
      blogStatsCache.set(validatedData)
      
      return validatedData
    } catch (error: any) {
      console.error('Failed to fetch blog stats:', error)
      
      // Set user-friendly error message
      state.error = error.message?.includes('fetch') 
        ? BLOG_CONFIG.ERRORS.NETWORK 
        : BLOG_CONFIG.ERRORS.GENERIC_FETCH
        
      // Return empty data on error
      const emptyData: BlogStatsResponse = { analytics: [], commentCounts: {} }
      
      // Don't override existing data if we have cached data
      if (!state.analytics.length && !Object.keys(state.commentCounts).length) {
        state.analytics = emptyData.analytics
        state.commentCounts = emptyData.commentCounts
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

  const getCommentCount = (slug: string): number => {
    return state.commentCounts[slug] || 0
  }

  const updateBlogPosts = (posts: BlogPost[]): void => {
    posts.forEach(post => {
      // Update views from analytics
      const analyticsMatch = state.analytics.find(item => 
        item.path && item.path.includes(post.slug)
      )
      if (analyticsMatch) {
        post.views = analyticsMatch.views
      }
      
      // Update comment counts
      post.comments = state.commentCounts[post.slug] || 0
    })
  }

  const clearCache = (): void => {
    blogStatsCache.clear()
  }

  // Refresh data (force fetch without cache)
  const refreshStats = async (): Promise<BlogStatsResponse> => {
    return await fetchBlogStats(false)
  }

  return {
    // Readonly state
    isLoading: readonly(toRef(state, 'isLoading')),
    error: readonly(toRef(state, 'error')),
    analytics: readonly(toRef(state, 'analytics')),
    commentCounts: readonly(toRef(state, 'commentCounts')),
    
    // Actions
    fetchBlogStats,
    refreshStats,
    getViewCount,
    getCommentCount,
    updateBlogPosts,
    clearCache
  }
}