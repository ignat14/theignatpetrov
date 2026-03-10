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
    })

    it('should have proper cache configuration', () => {
      expect(BLOG_CONFIG.CACHE).toHaveProperty('BLOG_STATS_KEY')
      expect(BLOG_CONFIG.CACHE).toHaveProperty('DURATION')
    })

    it('should have proper API configuration', () => {
      expect(BLOG_CONFIG.API).toHaveProperty('BLOG_STATS')
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
    })

    it('should have positive cache duration', () => {
      expect(BLOG_CONFIG.CACHE.DURATION).toBeGreaterThan(0)
    })

    it('should have valid string endpoint', () => {
      expect(typeof BLOG_CONFIG.API.BLOG_STATS).toBe('string')
      expect(BLOG_CONFIG.API.BLOG_STATS.length).toBeGreaterThan(0)
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
      expect(BLOG_CONFIG.UI.POSTS_PER_PAGE).toBeLessThanOrEqual(50)
      expect(BLOG_CONFIG.UI.LATEST_POSTS_COUNT).toBeLessThanOrEqual(10)
      expect(BLOG_CONFIG.UI.RELATED_POSTS_COUNT).toBeLessThanOrEqual(10)
      expect(BLOG_CONFIG.UI.POSTS_PER_LOAD).toBeLessThanOrEqual(20)
    })

    it('should have cache duration in reasonable range', () => {
      const oneMinute = 60 * 1000
      const oneDay = 24 * 60 * 60 * 1000

      expect(BLOG_CONFIG.CACHE.DURATION).toBeGreaterThanOrEqual(oneMinute)
      expect(BLOG_CONFIG.CACHE.DURATION).toBeLessThanOrEqual(oneDay)
    })

    it('should have cache key as non-empty string', () => {
      expect(typeof BLOG_CONFIG.CACHE.BLOG_STATS_KEY).toBe('string')
      expect(BLOG_CONFIG.CACHE.BLOG_STATS_KEY.length).toBeGreaterThan(0)
    })
  })

  describe('API endpoints format', () => {
    it('should have properly formatted API path', () => {
      expect(BLOG_CONFIG.API.BLOG_STATS).toMatch(/^\/api\//)
    })
  })

  describe('type safety', () => {
    it('should be a readonly constant', () => {
      expect(typeof BLOG_CONFIG).toBe('object')
      expect(BLOG_CONFIG).not.toBeNull()
    })

    it('should have consistent value types', () => {
      Object.values(BLOG_CONFIG.UI).forEach(value => {
        expect(typeof value).toBe('number')
      })

      expect(typeof BLOG_CONFIG.CACHE.DURATION).toBe('number')

      Object.values(BLOG_CONFIG.ERRORS).forEach(value => {
        expect(typeof value).toBe('string')
      })
    })
  })
})
