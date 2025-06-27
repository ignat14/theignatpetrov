import { createClient } from '@supabase/supabase-js'
import type { BlogStatsResponse, AnalyticsData } from '~/types/analytics'

interface CommentRow {
  post_slug: string
}

export default defineEventHandler(async (event): Promise<BlogStatsResponse> => {
  const config = useRuntimeConfig()
  
  try {
    // Validate environment configuration
    if (!config.public.supabaseUrl || !config.public.supabaseAnonKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Missing Supabase configuration'
      })
    }
    
    // Initialize Supabase client
    const supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey
    )

    // Execute both queries in parallel with proper error handling
    const [analyticsResult, commentsResult] = await Promise.allSettled([
      $fetch<AnalyticsData>('/api/analytics/pageviews').catch((error) => {
        console.warn('Analytics fetch failed, using fallback:', error.message)
        return []
      }),
      supabase
        .from('blog_comments')
        .select('post_slug')
        .then(result => result)
    ])

    // Process analytics data
    let analyticsData: AnalyticsData = []
    if (analyticsResult.status === 'fulfilled') {
      analyticsData = Array.isArray(analyticsResult.value) ? analyticsResult.value : []
    } else {
      console.error('Analytics fetch failed:', analyticsResult.reason)
    }

    // Process comment counts
    let commentCounts: Record<string, number> = {}
    if (commentsResult.status === 'fulfilled') {
      const { data: commentsData, error: commentsError } = commentsResult.value
      
      if (commentsError) {
        console.error('Error fetching comments:', commentsError)
        throw createError({
          statusCode: 500,
          statusMessage: `Database error: ${commentsError.message}`
        })
      }

      if (commentsData && Array.isArray(commentsData)) {
        commentsData.forEach((comment: CommentRow) => {
          if (comment.post_slug) {
            commentCounts[comment.post_slug] = (commentCounts[comment.post_slug] || 0) + 1
          }
        })
      }
    } else {
      console.error('Comments fetch failed:', commentsResult.reason)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch comment data'
      })
    }

    // Return properly typed response
    const response: BlogStatsResponse = {
      analytics: analyticsData,
      commentCounts
    }

    return response

  } catch (error: any) {
    console.error('Error fetching blog stats:', error)
    
    // If it's already a Nuxt error, re-throw it
    if (error.statusCode) {
      throw error
    }
    
    // Create a generic error response
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error while fetching blog statistics'
    })
  }
})