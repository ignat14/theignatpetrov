import { readFile } from 'fs/promises'
import { join } from 'path'
import { calculateReadTime } from '~/utils/readingTime'

interface BatchRequest {
  slugs: string[]
}

interface BatchResponse {
  readTimes: Record<string, number>
  errors: Record<string, string>
}

export default defineEventHandler(async (event): Promise<BatchResponse> => {
  try {
    const { slugs } = await readBody<BatchRequest>(event)
    
    if (!Array.isArray(slugs)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request: slugs must be an array'
      })
    }

    // Validate all slugs for security
    const invalidSlugs = slugs.filter(slug => 
      !slug || typeof slug !== 'string' || slug.includes('..') || slug.includes('/')
    )
    
    if (invalidSlugs.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid slugs: ${invalidSlugs.join(', ')}`
      })
    }

    const readTimes: Record<string, number> = {}
    const errors: Record<string, string> = {}

    // Process all slugs in parallel for better performance
    const results = await Promise.allSettled(
      slugs.map(async (slug) => {
        const filePath = join(process.cwd(), `content/blog/${slug}.md`)
        
        try {
          const content = await readFile(filePath, 'utf-8')
          const readTime = calculateReadTime(content)
          return { slug, readTime, error: null }
        } catch (error) {
          return { slug, readTime: 1, error: (error as Error).message }
        }
      })
    )

    // Process results
    results.forEach((result, index) => {
      const slug = slugs[index]
      
      if (result.status === 'fulfilled') {
        const { readTime, error } = result.value
        readTimes[slug] = readTime
        
        if (error) {
          errors[slug] = error
        }
      } else {
        readTimes[slug] = 1 // Fallback
        errors[slug] = result.reason?.message || 'Unknown error'
      }
    })

    return {
      readTimes,
      errors
    }
  } catch (error) {
    console.error('Batch reading time calculation error:', error)
    
    return {
      readTimes: {},
      errors: { general: 'Failed to process batch request' }
    }
  }
})