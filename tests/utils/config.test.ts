import { describe, it, expect } from 'vitest'
import { BLOG_CONFIG } from '~/utils/config'

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
})