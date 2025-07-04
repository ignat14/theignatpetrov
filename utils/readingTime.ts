/**
 * Simple reading time calculation utility for development use
 */

const WORDS_PER_MINUTE = 200
const MINIMUM_READ_TIME = 1

/**
 * Calculate reading time from raw markdown content
 * This is primarily for development/content creation assistance
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