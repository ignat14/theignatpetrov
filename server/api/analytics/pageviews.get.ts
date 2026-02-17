import { createError, defineEventHandler } from 'h3'
import { $fetch } from 'ofetch'

export default defineEventHandler(async () => {
  const projectId = process.env.POSTHOG_PROJECT_ID
  const personalApiKey = process.env.POSTHOG_PERSONAL_API_KEY

  try {
    const response = await $fetch<{ results: [string, number][] }>(
      `https://app.posthog.com/api/projects/${projectId}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${personalApiKey}`,
          'Content-Type': 'application/json',
        },
        body: {
          query: {
            kind: 'HogQLQuery',
            query: `
              SELECT properties.$pathname AS path, count() AS views
              FROM events
              WHERE event = '$pageview'
                AND properties.$pathname LIKE '/blog/%'
                AND timestamp > now() - interval 30 day
              GROUP BY path
              ORDER BY views DESC
            `,
          },
        },
      }
    )

    return (response.results ?? []).map((row: [string, number]) => ({
      path: row[0],
      title: '',
      views: row[1],
    }))
  } catch (error) {
    console.error('PostHog Analytics API Error:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch analytics data: ${errorMessage}`,
    })
  }
})
