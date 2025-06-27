import { BLOG_CONFIG } from './config'

export interface CachedData<T> {
  data: T
  timestamp: number
}

export class CacheManager<T> {
  private key: string
  private duration: number

  constructor(key: string, duration: number) {
    this.key = key
    this.duration = duration
  }

  /**
   * Get cached data if it exists and hasn't expired
   */
  get(): T | null {
    if (typeof window === 'undefined') return null

    try {
      const cached = localStorage.getItem(this.key)
      if (!cached) return null

      const parsedCache: CachedData<T> = JSON.parse(cached)
      const isExpired = Date.now() - parsedCache.timestamp > this.duration

      if (isExpired) {
        this.clear()
        return null
      }

      return parsedCache.data
    } catch (error) {
      console.warn(BLOG_CONFIG.ERRORS.CACHE_READ, error)
      this.clear() // Clear corrupted cache
      return null
    }
  }

  /**
   * Set data in cache with current timestamp
   */
  set(data: T): void {
    if (typeof window === 'undefined') return

    try {
      const cacheData: CachedData<T> = {
        data,
        timestamp: Date.now()
      }
      localStorage.setItem(this.key, JSON.stringify(cacheData))
    } catch (error) {
      console.warn(BLOG_CONFIG.ERRORS.CACHE_WRITE, error)
    }
  }

  /**
   * Clear cached data
   */
  clear(): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(this.key)
    } catch (error) {
      console.warn('Failed to clear cache:', error)
    }
  }

  /**
   * Check if cache exists and is valid
   */
  isValid(): boolean {
    return this.get() !== null
  }
}

// Pre-configured cache managers for common use cases
export const blogStatsCache = new CacheManager(
  BLOG_CONFIG.CACHE.BLOG_STATS_KEY,
  BLOG_CONFIG.CACHE.BLOG_STATS_DURATION
)

/**
 * Utility function to clear all blog-related caches
 */
export const clearAllBlogCaches = (): void => {
  blogStatsCache.clear()
}