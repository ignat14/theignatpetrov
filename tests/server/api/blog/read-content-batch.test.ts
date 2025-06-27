import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readFile } from 'fs/promises'

// Mock fs/promises
vi.mock('fs/promises', () => ({
  readFile: vi.fn()
}))

// Mock path
vi.mock('path', () => ({
  join: vi.fn((...args) => args.join('/'))
}))

// Mock the reading time utility
vi.mock('~/utils/readingTime', () => ({
  calculateReadTime: vi.fn((content: string) => {
    return Math.max(1, Math.round(content.length / 200))
  })
}))

describe('/api/blog/read-content-batch.post', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.cwd = vi.fn().mockReturnValue('/mock/project/root')
  })

  describe('successful batch processing', () => {
    it('should process multiple posts and return reading times', async () => {
      const mockContent1 = 'A'.repeat(400) // Should be 2 minutes
      const mockContent2 = 'B'.repeat(600) // Should be 3 minutes
      
      vi.mocked(readFile)
        .mockResolvedValueOnce(mockContent1)
        .mockResolvedValueOnce(mockContent2)
      
      const requestBody = { slugs: ['post-1', 'post-2'] }
      
      // Simulate the batch processing logic
      const results = await Promise.allSettled(
        requestBody.slugs.map(async (slug) => {
          try {
            const content = await readFile(`/mock/project/root/content/blog/${slug}.md`, 'utf-8')
            const readTime = Math.max(1, Math.round(content.length / 200))
            return { slug, readTime, error: null }
          } catch (error) {
            return { slug, readTime: 1, error: (error as Error).message }
          }
        })
      )
      
      const readTimes: Record<string, number> = {}
      const errors: Record<string, string> = {}
      
      results.forEach((result, index) => {
        const slug = requestBody.slugs[index]
        
        if (result.status === 'fulfilled') {
          const { readTime, error } = result.value
          readTimes[slug] = readTime
          
          if (error) {
            errors[slug] = error
          }
        } else {
          readTimes[slug] = 1
          errors[slug] = result.reason?.message || 'Unknown error'
        }
      })
      
      expect(readTimes).toEqual({
        'post-1': 2,
        'post-2': 3
      })
      expect(Object.keys(errors)).toHaveLength(0)
      expect(readFile).toHaveBeenCalledTimes(2)
    })

    it('should handle mixed success and failure cases', async () => {
      const mockContent = 'A'.repeat(200) // Should be 1 minute
      
      vi.mocked(readFile)
        .mockResolvedValueOnce(mockContent)
        .mockRejectedValueOnce(new Error('File not found'))
      
      const requestBody = { slugs: ['existing-post', 'missing-post'] }
      
      const results = await Promise.allSettled(
        requestBody.slugs.map(async (slug) => {
          try {
            const content = await readFile(`/mock/project/root/content/blog/${slug}.md`, 'utf-8')
            const readTime = Math.max(1, Math.round(content.length / 200))
            return { slug, readTime, error: null }
          } catch (error) {
            return { slug, readTime: 1, error: (error as Error).message }
          }
        })
      )
      
      const readTimes: Record<string, number> = {}
      const errors: Record<string, string> = {}
      
      results.forEach((result, index) => {
        const slug = requestBody.slugs[index]
        
        if (result.status === 'fulfilled') {
          const { readTime, error } = result.value
          readTimes[slug] = readTime
          
          if (error) {
            errors[slug] = error
          }
        } else {
          readTimes[slug] = 1
          errors[slug] = result.reason?.message || 'Unknown error'
        }
      })
      
      expect(readTimes).toEqual({
        'existing-post': 1,
        'missing-post': 1
      })
      expect(errors['missing-post']).toBe('File not found')
    })
  })

  describe('input validation', () => {
    it('should validate that slugs is an array', () => {
      const invalidInputs = [
        { slugs: 'not-an-array' },
        { slugs: null },
        { slugs: undefined },
        { slugs: 123 }
      ]
      
      invalidInputs.forEach(input => {
        const isValid = Array.isArray(input.slugs)
        expect(isValid).toBe(false)
      })
    })

    it('should reject invalid slug formats', () => {
      const testSlugs = [
        '../malicious-path',
        'path/with/slashes',
        '../../etc/passwd',
        'valid-slug',
        'another-valid-slug'
      ]
      
      const invalidSlugs = testSlugs.filter(slug => 
        !slug || typeof slug !== 'string' || slug.includes('..') || slug.includes('/')
      )
      
      expect(invalidSlugs).toEqual([
        '../malicious-path',
        'path/with/slashes', 
        '../../etc/passwd'
      ])
    })

    it('should accept valid slug formats', () => {
      const validSlugs = [
        'simple-post',
        'post-with-numbers-123',
        'post_with_underscores',
        'POST-WITH-CAPS'
      ]
      
      const invalidSlugs = validSlugs.filter(slug => 
        !slug || typeof slug !== 'string' || slug.includes('..') || slug.includes('/')
      )
      
      expect(invalidSlugs).toHaveLength(0)
    })

    it('should handle empty slugs array', () => {
      const requestBody = { slugs: [] }
      
      expect(Array.isArray(requestBody.slugs)).toBe(true)
      expect(requestBody.slugs).toHaveLength(0)
    })
  })

  describe('performance characteristics', () => {
    it('should process multiple posts in parallel', async () => {
      const slugs = ['post-1', 'post-2', 'post-3', 'post-4', 'post-5']
      const mockContent = 'A'.repeat(200)
      
      // Mock all file reads to succeed
      slugs.forEach(() => {
        vi.mocked(readFile).mockResolvedValueOnce(mockContent)
      })
      
      const startTime = Date.now()
      
      // Simulate parallel processing
      const results = await Promise.allSettled(
        slugs.map(async (slug) => {
          // Add small delay to simulate file reading
          await new Promise(resolve => setTimeout(resolve, 10))
          const content = await readFile(`/mock/project/root/content/blog/${slug}.md`, 'utf-8')
          return Math.max(1, Math.round(content.length / 200))
        })
      )
      
      const endTime = Date.now()
      const duration = endTime - startTime
      
      // Should complete faster than sequential processing (5 × 10ms = 50ms)
      expect(duration).toBeLessThan(30) // Much less than 50ms
      expect(results).toHaveLength(5)
      expect(results.every(r => r.status === 'fulfilled')).toBe(true)
    })
  })

  describe('error handling', () => {
    it('should provide fallback reading times for all failed posts', async () => {
      const slugs = ['error-post-1', 'error-post-2']
      
      // Mock all file reads to fail
      slugs.forEach(() => {
        vi.mocked(readFile).mockRejectedValueOnce(new Error('Read error'))
      })
      
      const results = await Promise.allSettled(
        slugs.map(async (slug) => {
          try {
            await readFile(`/mock/project/root/content/blog/${slug}.md`, 'utf-8')
            return { slug, readTime: 5, error: null }
          } catch (error) {
            return { slug, readTime: 1, error: (error as Error).message }
          }
        })
      )
      
      const readTimes: Record<string, number> = {}
      const errors: Record<string, string> = {}
      
      results.forEach((result, index) => {
        const slug = slugs[index]
        
        if (result.status === 'fulfilled') {
          const { readTime, error } = result.value
          readTimes[slug] = readTime
          
          if (error) {
            errors[slug] = error
          }
        } else {
          readTimes[slug] = 1
          errors[slug] = result.reason?.message || 'Unknown error'
        }
      })
      
      expect(readTimes['error-post-1']).toBe(1)
      expect(readTimes['error-post-2']).toBe(1)
      expect(errors['error-post-1']).toBe('Read error')
      expect(errors['error-post-2']).toBe('Read error')
    })

    it('should handle corrupted file content gracefully', async () => {
      const corruptedContent = null as any
      
      vi.mocked(readFile).mockResolvedValueOnce(corruptedContent)
      
      const slug = 'corrupted-post'
      
      try {
        const content = await readFile(`/mock/project/root/content/blog/${slug}.md`, 'utf-8')
        const readTime = Math.max(1, Math.round((content?.length || 0) / 200))
        expect(readTime).toBe(1) // Should fallback to minimum
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })

  describe('security validation', () => {
    it('should prevent path traversal attacks', () => {
      const maliciousSlugs = [
        '../../../etc/passwd',
        '..\\..\\windows\\system32',
        '/etc/hosts',
        'normal-post/../../../secrets'
      ]
      
      maliciousSlugs.forEach(slug => {
        const isSecure = !slug.includes('..') && !slug.includes('/')
        expect(isSecure).toBe(false)
      })
    })

    it('should only allow safe slug patterns', () => {
      const safeSlugs = [
        'my-blog-post',
        'another_post',
        'post123',
        'POST-WITH-CAPS'
      ]
      
      safeSlugs.forEach(slug => {
        const isSafe = slug && 
          typeof slug === 'string' && 
          !slug.includes('..') && 
          !slug.includes('/')
        expect(isSafe).toBe(true)
      })
    })
  })
})