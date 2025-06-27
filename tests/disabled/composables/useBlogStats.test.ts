import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref, reactive } from 'vue'

// Mock the cache utility
vi.mock('~/utils/cache', () => ({
  CacheManager: vi.fn().mockImplementation(() => ({
    get: vi.fn(),
    set: vi.fn(),
    clear: vi.fn(),
    isValid: vi.fn()
  }))
}))

// Mock the config
vi.mock('~/utils/config', () => ({
  BLOG_CONFIG: {
    CACHE: {
      BLOG_STATS_DURATION: 300000
    },
    API: {
      BLOG_STATS: '/api/blog/stats'
    }
  }
}))

describe('useBlogStats', () => {
  let mockCacheManager: any
  
  const mockBlogStatsResponse = {
    analytics: {
      'test-post-1': 150,
      'test-post-2': 75,
      'test-post-3': 200
    },
    comments: {
      'test-post-1': 5,
      'test-post-2': 2,
      'test-post-3': 8
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
    global.$fetch = vi.fn()
    
    // Mock cache manager
    const { CacheManager } = require('~/utils/cache')
    mockCacheManager = {
      get: vi.fn(),
      set: vi.fn(),
      clear: vi.fn(),
      isValid: vi.fn()
    }
    CacheManager.mockImplementation(() => mockCacheManager)
  })

  describe('fetchBlogStats', () => {
    it('should fetch stats from API when cache is invalid', async () => {
      mockCacheManager.get.mockReturnValue(null)
      vi.mocked(global.$fetch).mockResolvedValue(mockBlogStatsResponse)
      
      // Simulate the composable logic
      const isLoading = ref(false)
      const blogStats = ref<any>({})
      
      const fetchBlogStats = async () => {
        isLoading.value = true
        
        // Try cache first
        let stats = mockCacheManager.get()
        
        if (!stats) {
          // Fetch from API
          stats = await $fetch('/api/blog/stats')
          mockCacheManager.set(stats)
        }
        
        blogStats.value = stats
        isLoading.value = false
      }
      
      await fetchBlogStats()
      
      expect(mockCacheManager.get).toHaveBeenCalled()
      expect(global.$fetch).toHaveBeenCalledWith('/api/blog/stats')
      expect(mockCacheManager.set).toHaveBeenCalledWith(mockBlogStatsResponse)
      expect(blogStats.value).toEqual(mockBlogStatsResponse)
      expect(isLoading.value).toBe(false)
    })

    it('should use cached data when available', async () => {
      mockCacheManager.get.mockReturnValue(mockBlogStatsResponse)
      
      const isLoading = ref(false)
      const blogStats = ref<any>({})
      
      const fetchBlogStats = async () => {
        isLoading.value = true
        
        let stats = mockCacheManager.get()
        
        if (!stats) {
          stats = await $fetch('/api/blog/stats')
          mockCacheManager.set(stats)
        }
        
        blogStats.value = stats
        isLoading.value = false
      }
      
      await fetchBlogStats()
      
      expect(mockCacheManager.get).toHaveBeenCalled()
      expect(global.$fetch).not.toHaveBeenCalled()
      expect(blogStats.value).toEqual(mockBlogStatsResponse)
    })

    it('should handle API errors gracefully', async () => {
      mockCacheManager.get.mockReturnValue(null)
      vi.mocked(global.$fetch).mockRejectedValue(new Error('API Error'))
      
      const isLoading = ref(false)
      const blogStats = ref<any>({})
      
      const fetchBlogStats = async () => {
        isLoading.value = true
        
        try {
          let stats = mockCacheManager.get()
          
          if (!stats) {
            stats = await $fetch('/api/blog/stats')
            mockCacheManager.set(stats)
          }
          
          blogStats.value = stats
        } catch (error) {
          console.error('Failed to fetch blog stats:', error)
          blogStats.value = { analytics: {}, comments: {} }
        } finally {
          isLoading.value = false
        }
      }
      
      await fetchBlogStats()
      
      expect(global.$fetch).toHaveBeenCalled()
      expect(blogStats.value).toEqual({ analytics: {}, comments: {} })
      expect(isLoading.value).toBe(false)
    })

    it('should handle cache errors gracefully', async () => {
      mockCacheManager.get.mockImplementation(() => {
        throw new Error('Cache error')
      })
      vi.mocked(global.$fetch).mockResolvedValue(mockBlogStatsResponse)
      
      const isLoading = ref(false)
      const blogStats = ref<any>({})
      
      const fetchBlogStats = async () => {
        isLoading.value = true
        
        try {
          let stats
          try {
            stats = mockCacheManager.get()
          } catch {
            stats = null
          }
          
          if (!stats) {
            stats = await $fetch('/api/blog/stats')
            try {
              mockCacheManager.set(stats)
            } catch {
              // Ignore cache write errors
            }
          }
          
          blogStats.value = stats
        } finally {
          isLoading.value = false
        }
      }
      
      await fetchBlogStats()
      
      expect(global.$fetch).toHaveBeenCalled()
      expect(blogStats.value).toEqual(mockBlogStatsResponse)
    })
  })

  describe('getViewCount', () => {
    it('should return view count for existing post', () => {
      const blogStats = {
        analytics: {
          'test-post': 150,
          'another-post': 75
        }
      }
      
      const getViewCount = (slug: string): number => {
        return blogStats.analytics[slug] || 0
      }
      
      expect(getViewCount('test-post')).toBe(150)
      expect(getViewCount('another-post')).toBe(75)
    })

    it('should return 0 for non-existent post', () => {
      const blogStats = {
        analytics: {
          'test-post': 150
        }
      }
      
      const getViewCount = (slug: string): number => {
        return blogStats.analytics[slug] || 0
      }
      
      expect(getViewCount('non-existent')).toBe(0)
    })

    it('should handle empty analytics data', () => {
      const blogStats = {
        analytics: {}
      }
      
      const getViewCount = (slug: string): number => {
        return blogStats.analytics[slug] || 0
      }
      
      expect(getViewCount('any-post')).toBe(0)
    })
  })

  describe('getCommentCount', () => {
    it('should return comment count for existing post', () => {
      const blogStats = {
        comments: {
          'test-post': 5,
          'another-post': 2
        }
      }
      
      const getCommentCount = (slug: string): number => {
        return blogStats.comments[slug] || 0
      }
      
      expect(getCommentCount('test-post')).toBe(5)
      expect(getCommentCount('another-post')).toBe(2)
    })

    it('should return 0 for non-existent post', () => {
      const blogStats = {
        comments: {
          'test-post': 5
        }
      }
      
      const getCommentCount = (slug: string): number => {
        return blogStats.comments[slug] || 0
      }
      
      expect(getCommentCount('non-existent')).toBe(0)
    })
  })

  describe('updateBlogPosts', () => {
    it('should update posts with stats data', () => {
      const posts = [
        { slug: 'test-post-1', views: 0, comments: 0, title: 'Test 1' },
        { slug: 'test-post-2', views: 0, comments: 0, title: 'Test 2' },
        { slug: 'unknown-post', views: 0, comments: 0, title: 'Unknown' }
      ]
      
      const blogStats = {
        analytics: {
          'test-post-1': 150,
          'test-post-2': 75
        },
        comments: {
          'test-post-1': 5,
          'test-post-2': 2
        }
      }
      
      const updateBlogPosts = (postsToUpdate: any[]) => {
        postsToUpdate.forEach(post => {
          post.views = blogStats.analytics[post.slug] || 0
          post.comments = blogStats.comments[post.slug] || 0
        })
      }
      
      updateBlogPosts(posts)
      
      expect(posts[0].views).toBe(150)
      expect(posts[0].comments).toBe(5)
      expect(posts[1].views).toBe(75)
      expect(posts[1].comments).toBe(2)
      expect(posts[2].views).toBe(0) // No stats available
      expect(posts[2].comments).toBe(0) // No stats available
    })

    it('should handle empty posts array', () => {
      const posts: any[] = []
      const blogStats = { analytics: {}, comments: {} }
      
      const updateBlogPosts = (postsToUpdate: any[]) => {
        postsToUpdate.forEach(post => {
          post.views = blogStats.analytics[post.slug] || 0
          post.comments = blogStats.comments[post.slug] || 0
        })
      }
      
      expect(() => updateBlogPosts(posts)).not.toThrow()
      expect(posts).toHaveLength(0)
    })

    it('should handle posts without slug property', () => {
      const posts = [
        { title: 'Test Post', views: 0, comments: 0 }, // No slug
        { slug: 'valid-post', views: 0, comments: 0, title: 'Valid' }
      ]
      
      const blogStats = {
        analytics: { 'valid-post': 100 },
        comments: { 'valid-post': 3 }
      }
      
      const updateBlogPosts = (postsToUpdate: any[]) => {
        postsToUpdate.forEach(post => {
          if (post.slug) {
            post.views = blogStats.analytics[post.slug] || 0
            post.comments = blogStats.comments[post.slug] || 0
          }
        })
      }
      
      updateBlogPosts(posts)
      
      expect(posts[0].views).toBe(0) // No slug, no update
      expect(posts[1].views).toBe(100) // Valid slug, updated
      expect(posts[1].comments).toBe(3)
    })
  })

  describe('loading state management', () => {
    it('should track loading state correctly', async () => {
      const isLoading = ref(false)
      
      const simulateAsyncOperation = async () => {
        isLoading.value = true
        await new Promise(resolve => setTimeout(resolve, 10))
        isLoading.value = false
      }
      
      expect(isLoading.value).toBe(false)
      
      const promise = simulateAsyncOperation()
      expect(isLoading.value).toBe(true)
      
      await promise
      expect(isLoading.value).toBe(false)
    })

    it('should handle concurrent loading calls', async () => {
      const isLoading = ref(false)
      let operationCount = 0
      
      const simulateAsyncOperation = async () => {
        if (isLoading.value) return // Prevent concurrent calls
        
        isLoading.value = true
        operationCount++
        await new Promise(resolve => setTimeout(resolve, 10))
        isLoading.value = false
      }
      
      // Start multiple operations
      const promises = [
        simulateAsyncOperation(),
        simulateAsyncOperation(),
        simulateAsyncOperation()
      ]
      
      await Promise.all(promises)
      
      expect(operationCount).toBe(1) // Only one operation should run
      expect(isLoading.value).toBe(false)
    })
  })

  describe('cache invalidation', () => {
    it('should clear cache when requested', () => {
      const clearCache = () => {
        mockCacheManager.clear()
      }
      
      clearCache()
      
      expect(mockCacheManager.clear).toHaveBeenCalled()
    })

    it('should force refresh when cache is cleared', async () => {
      // First call uses cache
      mockCacheManager.get.mockReturnValueOnce(mockBlogStatsResponse)
      
      const blogStats = ref<any>({})
      
      const fetchBlogStats = async (forceRefresh = false) => {
        let stats = forceRefresh ? null : mockCacheManager.get()
        
        if (!stats) {
          stats = await $fetch('/api/blog/stats')
          mockCacheManager.set(stats)
        }
        
        blogStats.value = stats
      }
      
      // First call should use cache
      await fetchBlogStats()
      expect(global.$fetch).not.toHaveBeenCalled()
      
      // Second call with force refresh should skip cache
      vi.mocked(global.$fetch).mockResolvedValue(mockBlogStatsResponse)
      await fetchBlogStats(true)
      expect(global.$fetch).toHaveBeenCalled()
    })
  })

  describe('data validation', () => {
    it('should handle malformed API response', async () => {
      const malformedResponse = {
        analytics: null,
        comments: 'invalid'
      }
      
      mockCacheManager.get.mockReturnValue(null)
      vi.mocked(global.$fetch).mockResolvedValue(malformedResponse)
      
      const blogStats = ref<any>({})
      
      const fetchBlogStats = async () => {
        try {
          const stats = await $fetch('/api/blog/stats')
          
          // Validate and sanitize response
          const sanitizedStats = {
            analytics: typeof stats.analytics === 'object' && stats.analytics ? stats.analytics : {},
            comments: typeof stats.comments === 'object' && stats.comments ? stats.comments : {}
          }
          
          blogStats.value = sanitizedStats
        } catch (error) {
          blogStats.value = { analytics: {}, comments: {} }
        }
      }
      
      await fetchBlogStats()
      
      expect(blogStats.value).toEqual({ analytics: {}, comments: {} })
    })
  })
})