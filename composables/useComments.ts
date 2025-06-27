import type { BlogComment, CommentForm, CommentState } from '~/types/comment'
import type { Database } from '~/types/database'
import { BLOG_CONFIG } from '~/utils/config'
import { clearAllBlogCaches } from '~/utils/cache'

type BlogCommentInsert = Database['public']['Tables']['blog_comments']['Insert']

export const useComments = (postSlug: string) => {
  const { $supabase } = useNuxtApp()
  
  // State management with better typing
  const state = reactive<CommentState>({
    comments: [],
    isLoading: false,
    isSubmitting: false,
    submitError: '',
    submitSuccess: false
  })

  const fetchComments = async (): Promise<void> => {
    state.isLoading = true
    state.submitError = ''
    
    try {
      const { data, error } = await $supabase
        .from(BLOG_CONFIG.API.COMMENTS)
        .select('*')
        .eq('post_slug', postSlug)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching comments:', error)
        throw new Error(error.message || BLOG_CONFIG.ERRORS.GENERIC_FETCH)
      }

      state.comments = data || []
    } catch (error: any) {
      console.error('Comments fetch error:', error)
      state.submitError = error.message || BLOG_CONFIG.ERRORS.GENERIC_FETCH
    } finally {
      state.isLoading = false
    }
  }

  const submitComment = async (formData: CommentForm): Promise<void> => {
    state.isSubmitting = true
    state.submitError = ''
    state.submitSuccess = false

    try {
      // Validate form data
      if (!formData.username.trim() || !formData.comment.trim()) {
        throw new Error('Username and comment are required')
      }

      const commentData: BlogCommentInsert = {
        post_slug: postSlug,
        username: formData.username.trim(),
        comment: formData.comment.trim()
      }

      const { data, error } = await $supabase
        .from(BLOG_CONFIG.API.COMMENTS)
        .insert(commentData)
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message || BLOG_CONFIG.ERRORS.GENERIC_SUBMIT)
      }

      if (!data || data.length === 0) {
        throw new Error('No data returned from database')
      }

      state.submitSuccess = true
      
      // Add the new comment to the list
      state.comments.unshift(data[0] as BlogComment)
      
      // Clear blog stats cache so comment counts refresh
      clearAllBlogCaches()
      
      console.log('Comment submitted successfully:', data[0])

    } catch (error: any) {
      console.error('Comment submission error:', error)
      
      if (error.message?.includes('network')) {
        state.submitError = BLOG_CONFIG.ERRORS.NETWORK
      } else {
        state.submitError = error.message || BLOG_CONFIG.ERRORS.GENERIC_SUBMIT
      }
    } finally {
      state.isSubmitting = false
    }
  }

  const resetForm = () => {
    state.submitSuccess = false
    state.submitError = ''
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Auto-hide success message after a delay
  watch(() => state.submitSuccess, (newValue) => {
    if (newValue) {
      setTimeout(() => {
        resetForm()
      }, BLOG_CONFIG.UI.COMMENT_AUTO_HIDE_SUCCESS)
    }
  })

  return {
    // Expose readonly state
    comments: readonly(toRef(state, 'comments')),
    isLoading: readonly(toRef(state, 'isLoading')),
    isSubmitting: readonly(toRef(state, 'isSubmitting')),
    submitError: readonly(toRef(state, 'submitError')),
    submitSuccess: readonly(toRef(state, 'submitSuccess')),
    
    // Actions
    fetchComments,
    submitComment,
    resetForm,
    formatDate
  }
}