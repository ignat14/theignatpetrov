import type { BlogComment, CommentForm, CommentSubmission } from '~/types/comment'
import type { Database } from '~/types/database'

type BlogCommentInsert = Database['public']['Tables']['blog_comments']['Insert']

export const useComments = (postSlug: string) => {
  const { $supabase } = useNuxtApp()
  const comments = ref<BlogComment[]>([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const submitError = ref('')
  const submitSuccess = ref(false)

  const fetchComments = async (): Promise<void> => {
    isLoading.value = true
    try {
      const { data, error } = await $supabase
        .from('blog_comments')
        .select('*')
        .eq('post_slug', postSlug)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching comments:', error)
        throw new Error(error.message || 'Failed to fetch comments')
      }

      comments.value = data || []
    } catch (error: any) {
      console.error('Comments fetch error:', error)
    } finally {
      isLoading.value = false
    }
  }

  const submitComment = async (formData: CommentForm): Promise<void> => {
    isSubmitting.value = true
    submitError.value = ''
    submitSuccess.value = false

    try {
      const commentData: BlogCommentInsert = {
        post_slug: postSlug,
        username: formData.username.trim(),
        comment: formData.comment.trim()
      }

      const { data, error } = await $supabase
        .from('blog_comments')
        .insert(commentData)
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message || 'Failed to submit comment')
      }

      if (!data || data.length === 0) {
        throw new Error('No data returned from database')
      }

      submitSuccess.value = true
      
      // Add the new comment to the list
      comments.value.unshift(data[0] as BlogComment)
      
      // Clear blog stats cache so comment counts refresh
      if (process.client) {
        try {
          localStorage.removeItem('blog-stats-cache')
        } catch (error) {
          console.warn('Failed to clear stats cache:', error)
        }
      }
      
      console.log('Comment submitted successfully:', data[0])

    } catch (error: any) {
      console.error('Comment submission error:', error)
      
      if (error.message?.includes('network')) {
        submitError.value = 'Network error. Please check your connection and try again.'
      } else {
        submitError.value = error.message || 'Failed to submit comment. Please try again.'
      }
    } finally {
      isSubmitting.value = false
    }
  }

  const resetForm = () => {
    submitSuccess.value = false
    submitError.value = ''
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

  return {
    comments: readonly(comments),
    isLoading: readonly(isLoading),
    isSubmitting: readonly(isSubmitting),
    submitError: readonly(submitError),
    submitSuccess: readonly(submitSuccess),
    fetchComments,
    submitComment,
    resetForm,
    formatDate
  }
}

// Standalone function to get comment counts for all posts
export const useCommentCounts = () => {
  const { $supabase } = useNuxtApp()

  const getCommentCounts = async (postSlugs: string[]): Promise<Record<string, number>> => {
    try {
      // Use Promise.all to fetch counts for all posts in parallel
      const countPromises = postSlugs.map(async (slug) => {
        const { count, error } = await $supabase
          .from('blog_comments')
          .select('*', { count: 'exact', head: true })
          .eq('post_slug', slug)

        if (error) {
          console.error(`Error fetching count for ${slug}:`, error)
          return { slug, count: 0 }
        }

        return { slug, count: count || 0 }
      })

      const results = await Promise.all(countPromises)
      
      // Convert to object format
      const counts: Record<string, number> = {}
      results.forEach(result => {
        counts[result.slug] = result.count
      })

      return counts
    } catch (error) {
      console.error('Comment counts fetch error:', error)
      return {}
    }
  }

  return {
    getCommentCounts
  }
}