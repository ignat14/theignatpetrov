/**
 * Reading time calculation utilities
 */

const WORDS_PER_MINUTE = 200
const MINIMUM_READ_TIME = 1

/**
 * Calculate reading time from raw markdown content
 */
export function calculateReadTime(content: string): number {
  if (!content?.trim()) return MINIMUM_READ_TIME

  // Remove frontmatter, markdown syntax, and HTML tags
  const cleanText = content
    .replace(/^---[\s\S]*?---\n?/, '') // Remove frontmatter
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/[*_]{1,2}([^*_]*)[*_]{1,2}/g, '$1') // Remove bold/italic
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()

  // Count words
  const words = cleanText.split(' ').filter(word => word.length > 0).length
  
  // Calculate minutes
  return Math.max(MINIMUM_READ_TIME, Math.round(words / WORDS_PER_MINUTE))
}

/**
 * Get reading time for a blog post by slug
 */
export async function getReadTimeForPost(slug: string): Promise<number> {
  try {
    const filePath = `content/blog/${slug}.md`
    const response = await $fetch('/api/blog/read-content', {
      method: 'POST',
      body: { filePath }
    })
    return response.readTime || MINIMUM_READ_TIME
  } catch (error) {
    console.warn(`Could not calculate reading time for post: ${slug}`)
    return MINIMUM_READ_TIME
  }
}

/**
 * Get reading times for multiple blog posts in a single batch request
 */
export async function getReadTimesForPosts(slugs: string[]): Promise<Record<string, number>> {
  if (!slugs || slugs.length === 0) {
    return {}
  }

  try {
    const response = await $fetch('/api/blog/read-content-batch', {
      method: 'POST',
      body: { slugs }
    })
    
    // Log any errors for debugging, but don't fail the entire operation
    if (response.errors && Object.keys(response.errors).length > 0) {
      console.warn('Some reading times could not be calculated:', response.errors)
    }
    
    return response.readTimes || {}
  } catch (error) {
    console.warn('Batch reading time calculation failed:', error)
    
    // Fallback: return minimum read time for all slugs
    const fallback: Record<string, number> = {}
    slugs.forEach(slug => {
      fallback[slug] = MINIMUM_READ_TIME
    })
    return fallback
  }
}

/**
 * Cache for reading times to avoid repeated calculations
 */
const readTimeCache = new Map<string, number>()

/**
 * Get reading time with caching support
 */
export async function getCachedReadTimeForPost(slug: string): Promise<number> {
  if (readTimeCache.has(slug)) {
    return readTimeCache.get(slug)!
  }
  
  const readTime = await getReadTimeForPost(slug)
  readTimeCache.set(slug, readTime)
  return readTime
}

/**
 * Clear the reading time cache
 */
export function clearReadTimeCache(): void {
  readTimeCache.clear()
}