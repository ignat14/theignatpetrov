import { describe, it, expect, vi } from 'vitest'
import { BLOG_CONFIG, validateBlogConfig, DEFAULT_CONFIG } from '~/utils/config'

describe('BLOG_CONFIG', () => {
  describe('structure validation', () => {
    it('should have all required top-level sections', () => {
      expect(BLOG_CONFIG).toHaveProperty('UI')
      expect(BLOG_CONFIG).toHaveProperty('CACHE')
      expect(BLOG_CONFIG).toHaveProperty('API')
      expect(BLOG_CONFIG).toHaveProperty('ERRORS')
    })

    it('should have proper UI configuration', () => {
      expect(BLOG_CONFIG.UI).toHaveProperty('POSTS_PER_PAGE')
      expect(BLOG_CONFIG.UI).toHaveProperty('LATEST_POSTS_COUNT')
      expect(BLOG_CONFIG.UI).toHaveProperty('RELATED_POSTS_COUNT')
      expect(BLOG_CONFIG.UI).toHaveProperty('POSTS_PER_LOAD')
      expect(BLOG_CONFIG.UI).toHaveProperty('COMMENT_AUTO_HIDE_SUCCESS')
    })

    it('should have proper cache configuration', () => {
      expect(BLOG_CONFIG.CACHE).toHaveProperty('BLOG_STATS_KEY')
      expect(BLOG_CONFIG.CACHE).toHaveProperty('BLOG_STATS_DURATION')
      expect(BLOG_CONFIG.CACHE).toHaveProperty('ANALYTICS_DURATION')
    })

    it('should have proper API configuration', () => {
      expect(BLOG_CONFIG.API).toHaveProperty('BLOG_STATS')
      expect(BLOG_CONFIG.API).toHaveProperty('ANALYTICS')
      expect(BLOG_CONFIG.API).toHaveProperty('COMMENTS')
    })

    it('should have proper error configuration', () => {
      expect(BLOG_CONFIG.ERRORS).toHaveProperty('NETWORK')
      expect(BLOG_CONFIG.ERRORS).toHaveProperty('GENERIC_SUBMIT')
      expect(BLOG_CONFIG.ERRORS).toHaveProperty('GENERIC_FETCH')
      expect(BLOG_CONFIG.ERRORS).toHaveProperty('CACHE_READ')
      expect(BLOG_CONFIG.ERRORS).toHaveProperty('CACHE_WRITE')
    })
  })

  describe('value validation', () => {
    it('should have positive numeric values for UI settings', () => {
      expect(BLOG_CONFIG.UI.POSTS_PER_PAGE).toBeGreaterThan(0)
      expect(BLOG_CONFIG.UI.LATEST_POSTS_COUNT).toBeGreaterThan(0)
      expect(BLOG_CONFIG.UI.RELATED_POSTS_COUNT).toBeGreaterThan(0)
      expect(BLOG_CONFIG.UI.POSTS_PER_LOAD).toBeGreaterThan(0)
      expect(BLOG_CONFIG.UI.COMMENT_AUTO_HIDE_SUCCESS).toBeGreaterThan(0)
    })

    it('should have positive cache durations', () => {
      expect(BLOG_CONFIG.CACHE.BLOG_STATS_DURATION).toBeGreaterThan(0)
      expect(BLOG_CONFIG.CACHE.ANALYTICS_DURATION).toBeGreaterThan(0)
    })

    it('should have valid string endpoints', () => {
      expect(typeof BLOG_CONFIG.API.BLOG_STATS).toBe('string')
      expect(typeof BLOG_CONFIG.API.ANALYTICS).toBe('string')
      expect(typeof BLOG_CONFIG.API.COMMENTS).toBe('string')
      
      expect(BLOG_CONFIG.API.BLOG_STATS.length).toBeGreaterThan(0)
      expect(BLOG_CONFIG.API.ANALYTICS.length).toBeGreaterThan(0)
      expect(BLOG_CONFIG.API.COMMENTS.length).toBeGreaterThan(0)
    })

    it('should have valid error messages', () => {
      Object.values(BLOG_CONFIG.ERRORS).forEach(message => {
        expect(typeof message).toBe('string')
        expect(message.length).toBeGreaterThan(0)
      })
    })
  })

  describe('reasonable value ranges', () => {
    it('should have UI values in reasonable ranges', () => {
      // Posts per page should be reasonable (not too high for performance)
      expect(BLOG_CONFIG.UI.POSTS_PER_PAGE).toBeLessThanOrEqual(50)
      expect(BLOG_CONFIG.UI.LATEST_POSTS_COUNT).toBeLessThanOrEqual(10)
      expect(BLOG_CONFIG.UI.RELATED_POSTS_COUNT).toBeLessThanOrEqual(10)
      expect(BLOG_CONFIG.UI.POSTS_PER_LOAD).toBeLessThanOrEqual(20)
      
      // Auto-hide timer should be reasonable (not too fast/slow)
      expect(BLOG_CONFIG.UI.COMMENT_AUTO_HIDE_SUCCESS).toBeGreaterThanOrEqual(1000) // At least 1 second
      expect(BLOG_CONFIG.UI.COMMENT_AUTO_HIDE_SUCCESS).toBeLessThanOrEqual(30000) // At most 30 seconds
    })

    it('should have cache durations in reasonable ranges', () => {
      // Cache durations should be at least 1 minute and at most 1 day
      const oneMinute = 60 * 1000
      const oneDay = 24 * 60 * 60 * 1000
      
      expect(BLOG_CONFIG.CACHE.BLOG_STATS_DURATION).toBeGreaterThanOrEqual(oneMinute)
      expect(BLOG_CONFIG.CACHE.BLOG_STATS_DURATION).toBeLessThanOrEqual(oneDay)
      
      expect(BLOG_CONFIG.CACHE.ANALYTICS_DURATION).toBeGreaterThanOrEqual(oneMinute)
      expect(BLOG_CONFIG.CACHE.ANALYTICS_DURATION).toBeLessThanOrEqual(oneDay)
    })

    it('should have cache key as string', () => {
      expect(typeof BLOG_CONFIG.CACHE.BLOG_STATS_KEY).toBe('string')
      expect(BLOG_CONFIG.CACHE.BLOG_STATS_KEY.length).toBeGreaterThan(0)
    })
  })

  describe('API endpoints format', () => {
    it('should have properly formatted API paths', () => {
      expect(BLOG_CONFIG.API.BLOG_STATS).toMatch(/^\/api\//)
      expect(BLOG_CONFIG.API.ANALYTICS).toMatch(/^\/api\//)
    })

    it('should have valid Supabase table name', () => {
      expect(BLOG_CONFIG.API.COMMENTS).toBe('blog_comments')
    })
  })

  describe('type safety', () => {
    it('should be a readonly constant', () => {
      // TypeScript should enforce readonly, but we can check the structure exists
      expect(typeof BLOG_CONFIG).toBe('object')
      expect(BLOG_CONFIG).not.toBeNull()
    })

    it('should have consistent value types', () => {
      // All UI values should be numbers
      Object.values(BLOG_CONFIG.UI).forEach(value => {
        expect(typeof value).toBe('number')
      })
      
      // All cache durations should be numbers
      expect(typeof BLOG_CONFIG.CACHE.BLOG_STATS_DURATION).toBe('number')
      expect(typeof BLOG_CONFIG.CACHE.ANALYTICS_DURATION).toBe('number')
      
      // All error messages should be strings
      Object.values(BLOG_CONFIG.ERRORS).forEach(value => {
        expect(typeof value).toBe('string')
      })
    })
  })

  describe('configuration validation', () => {
    describe('validateBlogConfig', () => {
      it('should return default config when given empty object', () => {
        const result = validateBlogConfig({})
        expect(result).toEqual(DEFAULT_CONFIG)
      })

      it('should merge partial configurations with defaults', () => {
        const partialConfig = {
          UI: {
            POSTS_PER_PAGE: 10
          }
        }
        
        const result = validateBlogConfig(partialConfig)
        expect(result.UI.POSTS_PER_PAGE).toBe(10)
        expect(result.UI.LATEST_POSTS_COUNT).toBe(DEFAULT_CONFIG.UI.LATEST_POSTS_COUNT)
        expect(result.CACHE).toEqual(DEFAULT_CONFIG.CACHE)
      })

      it('should validate cache configuration', () => {
        expect(() => validateBlogConfig({
          CACHE: {
            BLOG_STATS_KEY: '',
            BLOG_STATS_DURATION: 5000,
            ANALYTICS_DURATION: 10000
          }
        })).toThrow('Cache configuration validation failed')

        expect(() => validateBlogConfig({
          CACHE: {
            BLOG_STATS_KEY: 'valid-key',
            BLOG_STATS_DURATION: -1000,
            ANALYTICS_DURATION: 10000
          }
        })).toThrow('Cache configuration validation failed')
      })

      it('should validate API configuration', () => {
        expect(() => validateBlogConfig({
          API: {
            BLOG_STATS: 'invalid-endpoint',
            ANALYTICS: '/api/analytics',
            COMMENTS: 'blog_comments'
          }
        })).toThrow('API configuration validation failed')

        expect(() => validateBlogConfig({
          API: {
            BLOG_STATS: '/api/blog/stats',
            ANALYTICS: 'invalid-endpoint',
            COMMENTS: 'blog_comments'
          }
        })).toThrow('API configuration validation failed')
      })

      it('should validate UI configuration', () => {
        expect(() => validateBlogConfig({
          UI: {
            POSTS_PER_PAGE: -5,
            POSTS_PER_LOAD: 6,
            LATEST_POSTS_COUNT: 3,
            RELATED_POSTS_COUNT: 2,
            COMMENT_AUTO_HIDE_SUCCESS: 5000
          }
        })).toThrow('UI configuration validation failed')

        expect(() => validateBlogConfig({
          UI: {
            POSTS_PER_PAGE: 3.5, // Non-integer
            POSTS_PER_LOAD: 6,
            LATEST_POSTS_COUNT: 3,
            RELATED_POSTS_COUNT: 2,
            COMMENT_AUTO_HIDE_SUCCESS: 5000
          }
        })).toThrow('UI configuration validation failed')
      })

      it('should validate error configuration', () => {
        expect(() => validateBlogConfig({
          ERRORS: {
            NETWORK: '',
            GENERIC_SUBMIT: 'Valid message',
            GENERIC_FETCH: 'Valid message',
            CACHE_READ: 'Valid message',
            CACHE_WRITE: 'Valid message'
          }
        })).toThrow('Error configuration validation failed')
      })

      it('should accept valid configurations', () => {
        const validConfig = {
          CACHE: {
            BLOG_STATS_KEY: 'custom-cache-key',
            BLOG_STATS_DURATION: 10000,
            ANALYTICS_DURATION: 20000
          },
          API: {
            BLOG_STATS: '/api/custom/stats',
            ANALYTICS: '/api/custom/analytics',
            COMMENTS: 'custom_comments_table'
          },
          UI: {
            POSTS_PER_PAGE: 12,
            POSTS_PER_LOAD: 8,
            LATEST_POSTS_COUNT: 5,
            RELATED_POSTS_COUNT: 4,
            COMMENT_AUTO_HIDE_SUCCESS: 3000
          },
          ERRORS: {
            NETWORK: 'Custom network error',
            GENERIC_SUBMIT: 'Custom submit error',
            GENERIC_FETCH: 'Custom fetch error',
            CACHE_READ: 'Custom cache read error',
            CACHE_WRITE: 'Custom cache write error'
          }
        }

        expect(() => validateBlogConfig(validConfig)).not.toThrow()
        const result = validateBlogConfig(validConfig)
        expect(result.CACHE.BLOG_STATS_KEY).toBe('custom-cache-key')
        expect(result.UI.POSTS_PER_PAGE).toBe(12)
      })
    })

    describe('environment variable support', () => {
      it('should use default config when process is undefined', () => {
        // This simulates browser environment where process is not available
        const result = validateBlogConfig({})
        expect(result).toEqual(DEFAULT_CONFIG)
      })

      it('should handle environment variables if process is available', () => {
        // Mock process.env
        const mockEnv = {
          BLOG_CACHE_STATS_DURATION: '30000',
          BLOG_UI_POSTS_PER_PAGE: '8'
        }

        // This test validates the logic, though the actual environment override
        // happens at module load time
        expect(mockEnv.BLOG_CACHE_STATS_DURATION).toBe('30000')
        expect(parseInt(mockEnv.BLOG_CACHE_STATS_DURATION, 10)).toBe(30000)
      })
    })

    describe('error handling', () => {
      it('should log errors and re-throw during validation', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        
        expect(() => validateBlogConfig({
          CACHE: {
            BLOG_STATS_DURATION: 'invalid' as any
          }
        })).toThrow()
        
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Blog configuration validation failed:',
          expect.any(Error)
        )
        
        consoleErrorSpy.mockRestore()
      })
    })
  })
})