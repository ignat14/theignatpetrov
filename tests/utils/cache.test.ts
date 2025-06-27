import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CacheManager } from '~/utils/cache'

describe('CacheManager', () => {
  let cacheManager: CacheManager<any>
  const testKey = 'test-key'
  const testData = { id: 1, name: 'Test Data' }

  beforeEach(() => {
    // Clear localStorage mock
    vi.clearAllMocks()
    cacheManager = new CacheManager(testKey, 5000) // 5 second expiry
  })

  describe('constructor', () => {
    it('should create cache manager with key and expiry time', () => {
      expect(cacheManager).toBeInstanceOf(CacheManager)
    })
  })

  describe('set', () => {
    it('should store data in localStorage with timestamp', () => {
      const mockSetItem = vi.mocked(localStorage.setItem)
      
      cacheManager.set(testData)
      
      expect(mockSetItem).toHaveBeenCalledWith(
        testKey,
        expect.stringContaining(JSON.stringify(testData))
      )
    })

    it('should handle errors when localStorage is not available', () => {
      const mockSetItem = vi.mocked(localStorage.setItem)
      mockSetItem.mockImplementation(() => {
        throw new Error('Storage not available')
      })
      
      // Should not throw
      expect(() => cacheManager.set(testData)).not.toThrow()
    })

    it('should not set data on server side (no window)', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      
      const mockSetItem = vi.mocked(localStorage.setItem)
      cacheManager.set(testData)
      
      expect(mockSetItem).not.toHaveBeenCalled()
      
      global.window = originalWindow
    })
  })

  describe('get', () => {
    it('should return cached data when valid', () => {
      const mockGetItem = vi.mocked(localStorage.getItem)
      const cachedData = {
        data: testData,
        timestamp: Date.now()
      }
      mockGetItem.mockReturnValue(JSON.stringify(cachedData))
      
      const result = cacheManager.get()
      
      expect(result).toEqual(testData)
    })

    it('should return null when cache is expired', () => {
      const mockGetItem = vi.mocked(localStorage.getItem)
      const expiredData = {
        data: testData,
        timestamp: Date.now() - 10000 // 10 seconds ago
      }
      mockGetItem.mockReturnValue(JSON.stringify(expiredData))
      
      const result = cacheManager.get()
      
      expect(result).toBeNull()
    })

    it('should return null when cache is empty', () => {
      const mockGetItem = vi.mocked(localStorage.getItem)
      mockGetItem.mockReturnValue(null)
      
      const result = cacheManager.get()
      
      expect(result).toBeNull()
    })

    it('should return null when cache data is corrupted', () => {
      const mockGetItem = vi.mocked(localStorage.getItem)
      mockGetItem.mockReturnValue('invalid-json')
      
      const result = cacheManager.get()
      
      expect(result).toBeNull()
    })

    it('should return null on server side (no window)', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      
      const result = cacheManager.get()
      
      expect(result).toBeNull()
      
      global.window = originalWindow
    })
  })

  describe('clear', () => {
    it('should remove item from localStorage', () => {
      const mockRemoveItem = vi.mocked(localStorage.removeItem)
      
      cacheManager.clear()
      
      expect(mockRemoveItem).toHaveBeenCalledWith(testKey)
    })

    it('should not throw when localStorage is not available', () => {
      const mockRemoveItem = vi.mocked(localStorage.removeItem)
      mockRemoveItem.mockImplementation(() => {
        throw new Error('Storage not available')
      })
      
      expect(() => cacheManager.clear()).not.toThrow()
    })

    it('should not clear on server side (no window)', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      
      const mockRemoveItem = vi.mocked(localStorage.removeItem)
      cacheManager.clear()
      
      expect(mockRemoveItem).not.toHaveBeenCalled()
      
      global.window = originalWindow
    })
  })

  describe('isValid', () => {
    it('should return true for valid cached data', () => {
      const mockGetItem = vi.mocked(localStorage.getItem)
      const validData = {
        data: testData,
        timestamp: Date.now()
      }
      mockGetItem.mockReturnValue(JSON.stringify(validData))
      
      const result = cacheManager.isValid()
      
      expect(result).toBe(true)
    })

    it('should return false for expired cached data', () => {
      const mockGetItem = vi.mocked(localStorage.getItem)
      const expiredData = {
        data: testData,
        timestamp: Date.now() - 10000 // 10 seconds ago
      }
      mockGetItem.mockReturnValue(JSON.stringify(expiredData))
      
      const result = cacheManager.isValid()
      
      expect(result).toBe(false)
    })

    it('should return false when no cached data exists', () => {
      const mockGetItem = vi.mocked(localStorage.getItem)
      mockGetItem.mockReturnValue(null)
      
      const result = cacheManager.isValid()
      
      expect(result).toBe(false)
    })

    it('should return false on server side', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window
      
      const result = cacheManager.isValid()
      
      expect(result).toBe(false)
      
      global.window = originalWindow
    })
  })

  describe('getOrSet', () => {
    it('should return cached data when valid', async () => {
      const mockGetItem = vi.mocked(localStorage.getItem)
      const validData = {
        data: testData,
        timestamp: Date.now()
      }
      mockGetItem.mockReturnValue(JSON.stringify(validData))
      
      const fetchFn = vi.fn()
      const result = await cacheManager.getOrSet(fetchFn)
      
      expect(result).toEqual(testData)
      expect(fetchFn).not.toHaveBeenCalled()
    })

    it('should fetch and cache new data when cache is invalid', async () => {
      const mockGetItem = vi.mocked(localStorage.getItem)
      const mockSetItem = vi.mocked(localStorage.setItem)
      mockGetItem.mockReturnValue(null)
      
      const newData = { id: 2, name: 'New Data' }
      const fetchFn = vi.fn().mockResolvedValue(newData)
      
      const result = await cacheManager.getOrSet(fetchFn)
      
      expect(result).toEqual(newData)
      expect(fetchFn).toHaveBeenCalledOnce()
      expect(mockSetItem).toHaveBeenCalledWith(
        testKey,
        expect.stringContaining(JSON.stringify(newData))
      )
    })

    it('should handle fetch function errors gracefully', async () => {
      const mockGetItem = vi.mocked(localStorage.getItem)
      mockGetItem.mockReturnValue(null)
      
      const fetchFn = vi.fn().mockRejectedValue(new Error('Fetch failed'))
      
      await expect(cacheManager.getOrSet(fetchFn)).rejects.toThrow('Fetch failed')
    })
  })

  describe('warm', () => {
    it('should pre-populate cache with fetched data', async () => {
      const mockSetItem = vi.mocked(localStorage.setItem)
      const newData = { id: 3, name: 'Warmed Data' }
      const fetchFn = vi.fn().mockResolvedValue(newData)
      
      await cacheManager.warm(fetchFn)
      
      expect(fetchFn).toHaveBeenCalledOnce()
      expect(mockSetItem).toHaveBeenCalledWith(
        testKey,
        expect.stringContaining(JSON.stringify(newData))
      )
    })

    it('should not throw on warming failures', async () => {
      const fetchFn = vi.fn().mockRejectedValue(new Error('Warm failed'))
      
      await expect(cacheManager.warm(fetchFn)).resolves.toBeUndefined()
      expect(fetchFn).toHaveBeenCalledOnce()
    })
  })
})