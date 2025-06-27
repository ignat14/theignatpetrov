import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    
    // Initialize Supabase client
    const supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey
    )

    // Fetch analytics data
    const analyticsPromise = $fetch('/api/analytics/pageviews')

    // Fetch comment counts for all posts
    const commentCountsPromise = supabase
      .from('blog_comments')
      .select('post_slug')

    // Execute both queries in parallel
    const [analyticsData, { data: commentsData, error: commentsError }] = await Promise.all([
      analyticsPromise,
      commentCountsPromise
    ])

    if (commentsError) {
      console.error('Error fetching comments:', commentsError)
    }

    // Process comment counts
    const commentCounts: Record<string, number> = {}
    if (commentsData) {
      commentsData.forEach((comment: { post_slug: string }) => {
        commentCounts[comment.post_slug] = (commentCounts[comment.post_slug] || 0) + 1
      })
    }

    // Return combined data
    return {
      analytics: Array.isArray(analyticsData) ? analyticsData : [],
      commentCounts
    }
  } catch (error) {
    console.error('Error fetching blog stats:', error)
    
    // Return empty data on error
    return {
      analytics: [],
      commentCounts: {}
    }
  }
})