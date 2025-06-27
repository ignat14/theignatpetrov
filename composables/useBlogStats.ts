import { ref } from 'vue'

interface BlogStats {
  analytics: any[]
  commentCounts: Record<string, number>
}

interface CachedBlogStats extends BlogStats {
  timestamp: number
}

export const useBlogStats = () => {
  const isLoading = ref(true)
  const blogStats = ref<BlogStats>({ analytics: [], commentCounts: {} })
  
  // Cache duration: 5 minutes
  const CACHE_DURATION = 5 * 60 * 1000
  const CACHE_KEY = 'blog-stats-cache'

  const getCachedStats = (): BlogStats | null => {
    if (process.client) {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const parsedCache: CachedBlogStats = JSON.parse(cached)
          const isExpired = Date.now() - parsedCache.timestamp > CACHE_DURATION
          
          if (!isExpired) {
            return {
              analytics: parsedCache.analytics,
              commentCounts: parsedCache.commentCounts
            }
          }
        }
      } catch (error) {
        console.warn('Failed to read cache:', error)
      }
    }
    return null
  }

  const setCachedStats = (data: BlogStats): void => {
    if (process.client) {
      try {
        const cacheData: CachedBlogStats = {
          ...data,
          timestamp: Date.now()
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
      } catch (error) {
        console.warn('Failed to set cache:', error)
      }
    }
  }

  const fetchBlogStats = async (useCache: boolean = true): Promise<BlogStats> => {
    // Try to get cached data first
    if (useCache) {
      const cachedData = getCachedStats()
      if (cachedData) {
        blogStats.value = cachedData
        isLoading.value = false
        return cachedData
      }
    }
    
    isLoading.value = true
    
    try {
      const data = await $fetch('/api/blog/stats') as BlogStats
      blogStats.value = data
      
      // Cache the fresh data
      setCachedStats(data)
      
      return data
    } catch (error) {
      console.error('Failed to fetch blog stats:', error)
      // Return empty data on error
      const emptyData = { analytics: [], commentCounts: {} }
      blogStats.value = emptyData
      return emptyData
    } finally {
      isLoading.value = false
    }
  }

  const getViewCount = (slug: string): number => {
    const analyticsMatch = blogStats.value.analytics.find(item => 
      item.path.includes(slug)
    )
    return analyticsMatch ? analyticsMatch.views : 0
  }

  const getCommentCount = (slug: string): number => {
    return blogStats.value.commentCounts[slug] || 0
  }

  const updateBlogPosts = (posts: any[]) => {
    posts.forEach(post => {
      // Update views from analytics
      const analyticsMatch = blogStats.value.analytics.find(item => 
        item.path.includes(post.slug)
      )
      if (analyticsMatch) {
        post.views = analyticsMatch.views
      }
      
      // Update comment counts
      post.comments = blogStats.value.commentCounts[post.slug] || 0
    })
  }

  const clearCache = (): void => {
    if (process.client) {
      try {
        localStorage.removeItem(CACHE_KEY)
      } catch (error) {
        console.warn('Failed to clear cache:', error)
      }
    }
  }

  return {
    isLoading: readonly(isLoading),
    blogStats: readonly(blogStats),
    fetchBlogStats,
    getViewCount,
    getCommentCount,
    updateBlogPosts,
    clearCache
  }
}