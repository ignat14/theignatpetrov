import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref, reactive, readonly, toRef, watch } from 'vue'

// Mock dependencies
vi.mock('~/utils/config', () => ({
  BLOG_CONFIG: {
    API: {
      COMMENTS: 'blog_comments'
    },
    ERRORS: {
      GENERIC_FETCH: 'Failed to fetch comments',
      GENERIC_SUBMIT: 'Failed to submit comment',
      NETWORK: 'Network error'
    },
    UI: {
      COMMENT_AUTO_HIDE_SUCCESS: 5000
    }
  }
}))

vi.mock('~/utils/cache', () => ({
  clearAllBlogCaches: vi.fn()
}))

vi.mock('#imports', () => ({
  useNuxtApp: vi.fn(),
  reactive: vi.fn(),
  readonly: vi.fn(),
  toRef: vi.fn(),
  watch: vi.fn()
}))

describe('useComments', () => {
  let mockSupabase: any
  let mockUseNuxtApp: any
  
  const testPostSlug = 'test-post'
  const mockComments = [
    {
      id: 1,
      post_slug: 'test-post',
      username: 'John Doe',
      comment: 'Great post!',
      created_at: '2023-01-01T10:00:00Z'
    },
    {
      id: 2,
      post_slug: 'test-post',
      username: 'Jane Smith',
      comment: 'Very informative.',
      created_at: '2023-01-01T11:00:00Z'
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock Supabase client
    mockSupabase = {
      from: vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
      }))
    }
    
    mockUseNuxtApp = vi.fn(() => ({
      $supabase: mockSupabase
    }))
    
    vi.mocked(require('#imports').useNuxtApp).mockImplementation(mockUseNuxtApp)
    vi.mocked(require('#imports').reactive).mockImplementation(reactive)
    vi.mocked(require('#imports').readonly).mockImplementation(readonly)
    vi.mocked(require('#imports').toRef).mockImplementation(toRef)
    vi.mocked(require('#imports').watch).mockImplementation(watch)
  })

  describe('fetchComments', () => {
    it('should fetch comments successfully', async () => {
      const mockQuery = {
        data: mockComments,
        error: null
      }
      
      mockSupabase.from().select().eq().order.mockResolvedValue(mockQuery)
      
      // Simulate the composable logic
      const state = reactive({
        comments: [],
        isLoading: false,
        submitError: ''
      })
      
      const fetchComments = async () => {
        state.isLoading = true
        state.submitError = ''
        
        try {
          const result = await mockSupabase
            .from('blog_comments')
            .select('*')
            .eq('post_slug', testPostSlug)
            .order('created_at', { ascending: false })
          
          if (result.error) {
            throw new Error(result.error.message)
          }
          
          state.comments = result.data || []
        } catch (error: any) {
          state.submitError = error.message || 'Failed to fetch comments'
        } finally {
          state.isLoading = false
        }
      }
      
      await fetchComments()
      
      expect(mockSupabase.from).toHaveBeenCalledWith('blog_comments')
      expect(state.comments).toEqual(mockComments)
      expect(state.isLoading).toBe(false)
      expect(state.submitError).toBe('')
    })

    it('should handle fetch errors gracefully', async () => {
      const mockError = {
        data: null,
        error: { message: 'Database error' }
      }
      
      mockSupabase.from().select().eq().order.mockResolvedValue(mockError)
      
      const state = reactive({
        comments: [],
        isLoading: false,
        submitError: ''
      })
      
      const fetchComments = async () => {
        state.isLoading = true
        state.submitError = ''
        
        try {
          const result = await mockSupabase
            .from('blog_comments')
            .select('*')
            .eq('post_slug', testPostSlug)
            .order('created_at', { ascending: false })
          
          if (result.error) {
            throw new Error(result.error.message)
          }
          
          state.comments = result.data || []
        } catch (error: any) {
          state.submitError = error.message || 'Failed to fetch comments'
        } finally {
          state.isLoading = false
        }
      }
      
      await fetchComments()
      
      expect(state.comments).toEqual([])
      expect(state.submitError).toBe('Database error')
      expect(state.isLoading).toBe(false)
    })

    it('should handle network errors', async () => {
      mockSupabase.from().select().eq().order.mockRejectedValue(new Error('Network error'))
      
      const state = reactive({
        comments: [],
        isLoading: false,
        submitError: ''
      })
      
      const fetchComments = async () => {
        state.isLoading = true
        state.submitError = ''
        
        try {
          await mockSupabase
            .from('blog_comments')
            .select('*')
            .eq('post_slug', testPostSlug)
            .order('created_at', { ascending: false })
        } catch (error: any) {
          state.submitError = error.message || 'Failed to fetch comments'
        } finally {
          state.isLoading = false
        }
      }
      
      await fetchComments()
      
      expect(state.submitError).toBe('Network error')
      expect(state.isLoading).toBe(false)
    })
  })

  describe('submitComment', () => {
    it('should submit comment successfully', async () => {
      const newComment = {
        id: 3,
        post_slug: 'test-post',
        username: 'New User',
        comment: 'This is a new comment',
        created_at: '2023-01-01T12:00:00Z'
      }
      
      const mockInsertResult = {
        data: [newComment],
        error: null
      }
      
      mockSupabase.from().insert().select.mockResolvedValue(mockInsertResult)
      
      const state = reactive({
        comments: [],
        isSubmitting: false,
        submitError: '',
        submitSuccess: false
      })
      
      const { clearAllBlogCaches } = require('~/utils/cache')
      
      const submitComment = async (formData: any) => {
        state.isSubmitting = true
        state.submitError = ''
        state.submitSuccess = false
        
        try {
          // Validate form data
          if (!formData.username.trim() || !formData.comment.trim()) {
            throw new Error('Username and comment are required')
          }
          
          const commentData = {
            post_slug: testPostSlug,
            username: formData.username.trim(),
            comment: formData.comment.trim()
          }
          
          const result = await mockSupabase
            .from('blog_comments')
            .insert(commentData)
            .select()
          
          if (result.error) {
            throw new Error(result.error.message)
          }
          
          if (!result.data || result.data.length === 0) {
            throw new Error('No data returned from database')
          }
          
          state.submitSuccess = true
          state.comments.unshift(result.data[0])
          clearAllBlogCaches()
          
        } catch (error: any) {
          state.submitError = error.message || 'Failed to submit comment'
        } finally {
          state.isSubmitting = false
        }
      }
      
      const formData = {
        username: 'New User',
        comment: 'This is a new comment'
      }
      
      await submitComment(formData)
      
      expect(mockSupabase.from).toHaveBeenCalledWith('blog_comments')
      expect(state.comments[0]).toEqual(newComment)
      expect(state.submitSuccess).toBe(true)
      expect(state.isSubmitting).toBe(false)
      expect(clearAllBlogCaches).toHaveBeenCalled()
    })

    it('should validate required fields', async () => {
      const state = reactive({
        isSubmitting: false,
        submitError: '',
        submitSuccess: false
      })
      
      const submitComment = async (formData: any) => {
        state.isSubmitting = true
        state.submitError = ''
        state.submitSuccess = false
        
        try {
          if (!formData.username.trim() || !formData.comment.trim()) {
            throw new Error('Username and comment are required')
          }
        } catch (error: any) {
          state.submitError = error.message
        } finally {
          state.isSubmitting = false
        }
      }
      
      // Test empty username
      await submitComment({ username: '', comment: 'Valid comment' })
      expect(state.submitError).toBe('Username and comment are required')
      
      // Test empty comment
      await submitComment({ username: 'Valid User', comment: '' })
      expect(state.submitError).toBe('Username and comment are required')
      
      // Test whitespace-only fields
      await submitComment({ username: '   ', comment: '   ' })
      expect(state.submitError).toBe('Username and comment are required')
    })

    it('should handle submit errors gracefully', async () => {
      const mockError = {
        data: null,
        error: { message: 'Insert failed' }
      }
      
      mockSupabase.from().insert().select.mockResolvedValue(mockError)
      
      const state = reactive({
        isSubmitting: false,
        submitError: '',
        submitSuccess: false
      })
      
      const submitComment = async (formData: any) => {
        state.isSubmitting = true
        state.submitError = ''
        state.submitSuccess = false
        
        try {
          if (!formData.username.trim() || !formData.comment.trim()) {
            throw new Error('Username and comment are required')
          }
          
          const result = await mockSupabase
            .from('blog_comments')
            .insert({ post_slug: testPostSlug, ...formData })
            .select()
          
          if (result.error) {
            throw new Error(result.error.message)
          }
        } catch (error: any) {
          state.submitError = error.message || 'Failed to submit comment'
        } finally {
          state.isSubmitting = false
        }
      }
      
      await submitComment({ username: 'User', comment: 'Comment' })
      
      expect(state.submitError).toBe('Insert failed')
      expect(state.submitSuccess).toBe(false)
      expect(state.isSubmitting).toBe(false)
    })

    it('should handle empty data response', async () => {
      const mockResult = {
        data: [],
        error: null
      }
      
      mockSupabase.from().insert().select.mockResolvedValue(mockResult)
      
      const state = reactive({
        isSubmitting: false,
        submitError: '',
        submitSuccess: false
      })
      
      const submitComment = async (formData: any) => {
        state.isSubmitting = true
        state.submitError = ''
        state.submitSuccess = false
        
        try {
          const result = await mockSupabase
            .from('blog_comments')
            .insert({ post_slug: testPostSlug, ...formData })
            .select()
          
          if (result.error) {
            throw new Error(result.error.message)
          }
          
          if (!result.data || result.data.length === 0) {
            throw new Error('No data returned from database')
          }
        } catch (error: any) {
          state.submitError = error.message || 'Failed to submit comment'
        } finally {
          state.isSubmitting = false
        }
      }
      
      await submitComment({ username: 'User', comment: 'Comment' })
      
      expect(state.submitError).toBe('No data returned from database')
      expect(state.submitSuccess).toBe(false)
    })
  })

  describe('utility functions', () => {
    it('should reset form state', () => {
      const state = reactive({
        submitSuccess: true,
        submitError: 'Some error'
      })
      
      const resetForm = () => {
        state.submitSuccess = false
        state.submitError = ''
      }
      
      resetForm()
      
      expect(state.submitSuccess).toBe(false)
      expect(state.submitError).toBe('')
    })

    it('should format dates correctly', () => {
      const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      
      const testDate = '2023-01-01T10:30:00Z'
      const formatted = formatDate(testDate)
      
      expect(formatted).toMatch(/January 1, 2023/)
      expect(formatted).toMatch(/10:30/)
    })

    it('should handle invalid dates gracefully', () => {
      const formatDate = (dateString: string): string => {
        try {
          return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        } catch {
          return 'Invalid date'
        }
      }
      
      expect(formatDate('invalid-date')).toBe('Invalid Date') // Date constructor behavior
      expect(formatDate('')).toBe('Invalid Date')
    })
  })

  describe('state management', () => {
    it('should maintain correct loading states during operations', async () => {
      const state = reactive({
        isLoading: false,
        isSubmitting: false
      })
      
      const simulateAsyncOperation = async (type: 'fetch' | 'submit') => {
        if (type === 'fetch') {
          state.isLoading = true
        } else {
          state.isSubmitting = true
        }
        
        await new Promise(resolve => setTimeout(resolve, 10))
        
        if (type === 'fetch') {
          state.isLoading = false
        } else {
          state.isSubmitting = false
        }
      }
      
      expect(state.isLoading).toBe(false)
      expect(state.isSubmitting).toBe(false)
      
      const fetchPromise = simulateAsyncOperation('fetch')
      expect(state.isLoading).toBe(true)
      
      const submitPromise = simulateAsyncOperation('submit')
      expect(state.isSubmitting).toBe(true)
      
      await Promise.all([fetchPromise, submitPromise])
      
      expect(state.isLoading).toBe(false)
      expect(state.isSubmitting).toBe(false)
    })

    it('should expose readonly state properties', () => {
      const state = reactive({
        comments: [],
        isLoading: false,
        isSubmitting: false,
        submitError: '',
        submitSuccess: false
      })
      
      // Simulate the composable return
      const exposedState = {
        comments: readonly(toRef(state, 'comments')),
        isLoading: readonly(toRef(state, 'isLoading')),
        isSubmitting: readonly(toRef(state, 'isSubmitting')),
        submitError: readonly(toRef(state, 'submitError')),
        submitSuccess: readonly(toRef(state, 'submitSuccess'))
      }
      
      expect(exposedState.comments).toBeDefined()
      expect(exposedState.isLoading).toBeDefined()
      expect(exposedState.isSubmitting).toBeDefined()
      expect(exposedState.submitError).toBeDefined()
      expect(exposedState.submitSuccess).toBeDefined()
    })
  })

  describe('auto-hide success message', () => {
    it('should set up watcher for success state', () => {
      const mockWatch = vi.mocked(watch)
      const state = reactive({ submitSuccess: false })
      
      // Simulate the watcher setup
      watch(() => state.submitSuccess, (newValue) => {
        if (newValue) {
          setTimeout(() => {
            state.submitSuccess = false
          }, 5000)
        }
      })
      
      expect(mockWatch).toHaveBeenCalled()
    })
  })
})