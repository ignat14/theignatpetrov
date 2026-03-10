import type { BlogStatsResponse, AnalyticsData } from '~/types/analytics'

export default defineEventHandler(async (): Promise<BlogStatsResponse> => {
  try {
    const analyticsData = await $fetch<AnalyticsData>('/api/analytics/pageviews').catch((error) => {
      console.warn('Analytics fetch failed, using fallback:', error.message)
      return [] as AnalyticsData
    })

    const response: BlogStatsResponse = {
      analytics: Array.isArray(analyticsData) ? analyticsData : []
    }

    return response
  } catch (error: unknown) {
    console.error('Error fetching blog stats:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error while fetching blog statistics'
    })
  }
})
