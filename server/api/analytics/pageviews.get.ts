import { BetaAnalyticsDataClient } from '@google-analytics/data'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  
  try {
    // Use Application Default Credentials (more secure)
    const analyticsDataClient = new BetaAnalyticsDataClient()

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${config.gaPropertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
        {
          name: 'pageTitle',
        },
      ],
      metrics: [
        {
          name: 'screenPageViews',
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            matchType: 'CONTAINS',
            value: '/blog/'
          }
        }
      },
      orderBys: [
        {
          metric: {
            metricName: 'screenPageViews'
          },
          desc: true
        }
      ]
    })

    const pageViews = response.rows?.map(row => ({
      path: row.dimensionValues?.[0]?.value || '',
      title: row.dimensionValues?.[1]?.value || '',
      views: parseInt(row.metricValues?.[0]?.value || '0')
    })) || []

    return pageViews
  } catch (error) {
    console.error('Analytics API Error Details:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch analytics data: ${errorMessage}`
    })
  }
})