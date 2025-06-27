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

  /**
   * Get data from cache, or fetch and cache if not available
   */
  async getOrSet<R = T>(fetchFn: () => Promise<R>): Promise<R> {
    const cached = this.get()
    if (cached !== null) {
      return cached as unknown as R
    }

    try {
      const fresh = await fetchFn()
      this.set(fresh as unknown as T)
      return fresh
    } catch (error) {
      console.warn(`Failed to fetch data for cache key "${this.key}":`, error)
      throw error
    }
  }

  /**
   * Warm the cache by pre-fetching data
   */
  async warm<R = T>(fetchFn: () => Promise<R>): Promise<void> {
    try {
      const data = await fetchFn()
      this.set(data as unknown as T)
    } catch (error) {
      console.warn(`Failed to warm cache for key "${this.key}":`, error)
      // Don't throw - cache warming is optional
    }
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