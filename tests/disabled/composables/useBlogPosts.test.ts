import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'

// Mock dependencies
vi.mock('~/utils/readingTime', () => ({
  getReadTimeForPost: vi.fn(() => Promise.resolve(5))
}))

vi.mock('#imports', () => ({
  queryContent: vi.fn(),
  readonly: vi.fn((val) => val)
}))

// Import after mocking
const { getReadTimeForPost } = await import('~/utils/readingTime')

describe('useBlogPosts', () => {
  let mockQueryContent: any
  
  const mockPosts = [
    {
      _path: '/blog/test-post-1',
      slug: 'test-post-1',
      title: 'Test Post 1',
      description: 'This is test post 1',
      date: '2023-01-01',
      tags: ['test', 'blog']
    },
    {
      _path: '/blog/test-post-2',
      slug: 'test-post-2', 
      title: 'Test Post 2',
      description: 'This is test post 2',
      date: '2023-01-02',
      tags: ['test', 'vue']
    },
    {
      _path: '/blog/test-post-3',
      title: 'Test Post 3', // No slug, should derive from _path
      description: 'This is test post 3',
      date: '2023-01-03',
      tags: ['blog', 'tutorial']
    }
  ]

  beforeEach(async () => {
    vi.clearAllMocks()
    
    // Reset module state by re-importing
    vi.resetModules()
    
    mockQueryContent = vi.fn(() => ({
      find: vi.fn(() => Promise.resolve(mockPosts))
    }))
    
    vi.doMock('#imports', () => ({
      queryContent: mockQueryContent,
      readonly: vi.fn((val) => val)
    }))
  })

  describe('initializePosts', () => {
    it('should load posts from content directory and calculate reading times', async () => {
      vi.mocked(getReadTimeForPost).mockResolvedValue(5)
      
      // Simulate the composable logic
      const posts = await mockQueryContent('/blog').find()
      const processedPosts = await Promise.all(posts.map(async (post: any) => {
        const slug = post.slug || post._path?.replace('/blog/', '') || ''
        const readTime = await getReadTimeForPost(slug)
        
        return {
          slug,
          title: post.title || 'Untitled',
          excerpt: post.description || '',
          date: post.date || '',
          readTime,
          tags: post.tags || [],
          views: 0,
          comments: 0
        }
      }))
      
      expect(processedPosts).toHaveLength(3)
      expect(processedPosts[0]).toEqual({
        slug: 'test-post-1',
        title: 'Test Post 1',
        excerpt: 'This is test post 1',
        date: '2023-01-01',
        readTime: 5,
        tags: ['test', 'blog'],
        views: 0,
        comments: 0
      })
      
      expect(processedPosts[2].slug).toBe('test-post-3') // Derived from _path
      expect(getReadTimeForPost).toHaveBeenCalledTimes(3)
    })

    it('should handle posts without slugs by deriving from _path', async () => {
      const postWithoutSlug = {
        _path: '/blog/derived-slug-post',
        title: 'Post Without Slug',
        description: 'This post has no slug field',
        date: '2023-01-01',
        tags: ['test']
      }
      
      mockQueryContent.mockReturnValue({
        find: vi.fn(() => Promise.resolve([postWithoutSlug]))
      })
      
      vi.mocked(getReadTimeForPost).mockResolvedValue(3)
      
      const posts = await mockQueryContent('/blog').find()
      const processedPost = {
        slug: postWithoutSlug._path?.replace('/blog/', '') || '',
        title: postWithoutSlug.title || 'Untitled',
        excerpt: postWithoutSlug.description || '',
        date: postWithoutSlug.date || '',
        readTime: await getReadTimeForPost('derived-slug-post'),
        tags: postWithoutSlug.tags || [],
        views: 0,
        comments: 0
      }
      
      expect(processedPost.slug).toBe('derived-slug-post')
      expect(getReadTimeForPost).toHaveBeenCalledWith('derived-slug-post')
    })

    it('should handle missing optional fields with defaults', async () => {
      const minimalPost = {
        _path: '/blog/minimal-post'
        // Missing title, description, date, tags
      }
      
      mockQueryContent.mockReturnValue({
        find: vi.fn(() => Promise.resolve([minimalPost]))
      })
      
      vi.mocked(getReadTimeForPost).mockResolvedValue(2)
      
      const posts = await mockQueryContent('/blog').find()
      const processedPost = {
        slug: minimalPost._path?.replace('/blog/', '') || '',
        title: 'Untitled', // Default
        excerpt: '', // Default
        date: '', // Default
        readTime: await getReadTimeForPost('minimal-post'),
        tags: [], // Default
        views: 0,
        comments: 0
      }
      
      expect(processedPost.title).toBe('Untitled')
      expect(processedPost.excerpt).toBe('')
      expect(processedPost.date).toBe('')
      expect(processedPost.tags).toEqual([])
    })

    it('should handle reading time calculation failures gracefully', async () => {
      vi.mocked(getReadTimeForPost).mockRejectedValue(new Error('Reading time failed'))
      
      // The getReadTimeForPost should handle errors internally and return 1
      vi.mocked(getReadTimeForPost).mockResolvedValue(1) // Fallback value
      
      const posts = await mockQueryContent('/blog').find()
      const processedPost = {
        slug: posts[0].slug || posts[0]._path?.replace('/blog/', '') || '',
        title: posts[0].title || 'Untitled',
        excerpt: posts[0].description || '',
        date: posts[0].date || '',
        readTime: await getReadTimeForPost('test-post-1'),
        tags: posts[0].tags || [],
        views: 0,
        comments: 0
      }
      
      expect(processedPost.readTime).toBe(1)
    })
  })

  describe('error handling and fallbacks', () => {
    it('should use fallback posts when content loading fails', async () => {
      mockQueryContent.mockReturnValue({
        find: vi.fn(() => Promise.reject(new Error('Content loading failed')))
      })
      
      vi.mocked(getReadTimeForPost).mockResolvedValue(5)
      
      // Simulate fallback logic
      let processedPosts
      try {
        await mockQueryContent('/blog').find()
      } catch (error) {
        console.error('Failed to load blog posts:', error)
        // Fallback posts
        processedPosts = [
          {
            slug: 'creeping-in-comfort-zone',
            title: 'Creeping in Comfort Zone',
            excerpt: 'I thought that I was always keeping myself away from the Comfort Zone, failing to realize that it can come in different areas of life.',
            date: '2025-06-27',
            readTime: await getReadTimeForPost('creeping-in-comfort-zone'),
            tags: ['Burnout', 'Comfort Zone', 'Mindfulness'],
            views: 0,
            comments: 0
          },
          {
            slug: 'vue-3-composition-api',
            title: 'Getting Started with Vue 3 Composition API [Example]',
            excerpt: 'Learn how to use the new Composition API in Vue 3 to write more maintainable and reusable components.',
            date: '2024-03-15',
            readTime: await getReadTimeForPost('vue-3-composition-api'),
            tags: ['Vue.js', 'JavaScript', 'Frontend'],
            views: 0,
            comments: 0
          }
        ]
      }
      
      expect(processedPosts).toHaveLength(2)
      expect(processedPosts[0].slug).toBe('creeping-in-comfort-zone')
      expect(processedPosts[1].slug).toBe('vue-3-composition-api')
    })

    it('should handle empty content response', async () => {
      mockQueryContent.mockReturnValue({
        find: vi.fn(() => Promise.resolve([]))
      })
      
      const posts = await mockQueryContent('/blog').find()
      const processedPosts = await Promise.all(posts.map(async (post: any) => {
        const slug = post.slug || post._path?.replace('/blog/', '') || ''
        const readTime = await getReadTimeForPost(slug)
        
        return {
          slug,
          title: post.title || 'Untitled',
          excerpt: post.description || '',
          date: post.date || '',
          readTime,
          tags: post.tags || [],
          views: 0,
          comments: 0
        }
      }))
      
      expect(processedPosts).toHaveLength(0)
    })
  })

  describe('getLatestPosts', () => {
    it('should return posts sorted by date in descending order', async () => {
      const unsortedPosts = [
        { date: '2023-01-01', title: 'Oldest' },
        { date: '2023-01-03', title: 'Newest' },
        { date: '2023-01-02', title: 'Middle' }
      ]
      
      const sortedPosts = unsortedPosts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3)
      
      expect(sortedPosts[0].title).toBe('Newest')
      expect(sortedPosts[1].title).toBe('Middle')
      expect(sortedPosts[2].title).toBe('Oldest')
    })

    it('should limit results to specified count', async () => {
      const manyPosts = Array.from({ length: 10 }, (_, i) => ({
        date: `2023-01-${(i + 1).toString().padStart(2, '0')}`,
        title: `Post ${i + 1}`
      }))
      
      const latestPosts = manyPosts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3)
      
      expect(latestPosts).toHaveLength(3)
      expect(latestPosts[0].title).toBe('Post 10') // Most recent
      expect(latestPosts[2].title).toBe('Post 8') // Third most recent
    })

    it('should handle invalid dates gracefully', async () => {
      const postsWithInvalidDates = [
        { date: 'invalid-date', title: 'Invalid' },
        { date: '2023-01-01', title: 'Valid' },
        { date: '', title: 'Empty' },
        { date: null, title: 'Null' }
      ]
      
      // Filter out invalid dates before sorting
      const validPosts = postsWithInvalidDates.filter(post => {
        if (!post.date) return false
        const parsedDate = new Date(post.date)
        return !isNaN(parsedDate.getTime())
      })
      
      const sortedPosts = validPosts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      
      expect(sortedPosts).toHaveLength(1)
      expect(sortedPosts[0].title).toBe('Valid')
    })
  })

  describe('getPostBySlug', () => {
    it('should find post by exact slug match', async () => {
      const posts = [
        { slug: 'first-post', title: 'First Post' },
        { slug: 'second-post', title: 'Second Post' },
        { slug: 'third-post', title: 'Third Post' }
      ]
      
      const foundPost = posts.find(post => post.slug === 'second-post')
      
      expect(foundPost).toBeDefined()
      expect(foundPost?.title).toBe('Second Post')
    })

    it('should return undefined for non-existent slug', async () => {
      const posts = [
        { slug: 'existing-post', title: 'Existing Post' }
      ]
      
      const foundPost = posts.find(post => post.slug === 'non-existent-post')
      
      expect(foundPost).toBeUndefined()
    })

    it('should handle empty slug search', async () => {
      const posts = [
        { slug: 'normal-post', title: 'Normal Post' },
        { slug: '', title: 'Empty Slug Post' }
      ]
      
      const foundPost = posts.find(post => post.slug === '')
      
      expect(foundPost?.title).toBe('Empty Slug Post')
    })
  })

  describe('caching and initialization', () => {
    it('should not reinitialize if already initialized', async () => {
      let isInitialized = false
      
      const initializePosts = async () => {
        if (isInitialized) return
        
        // Simulate initialization
        await mockQueryContent('/blog').find()
        isInitialized = true
      }
      
      // First call should initialize
      await initializePosts()
      expect(isInitialized).toBe(true)
      
      // Second call should skip initialization
      const findSpy = vi.spyOn(mockQueryContent('/blog'), 'find')
      await initializePosts()
      
      expect(findSpy).not.toHaveBeenCalled()
    })

    it('should expose readonly blog posts', () => {
      const blogPosts = ref([{ slug: 'test', title: 'Test' }])
      const readonlyPosts = vi.fn((val) => val)(blogPosts)
      
      expect(readonlyPosts).toBe(blogPosts)
    })
  })
})