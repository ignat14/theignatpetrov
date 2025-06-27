import { readFile } from 'fs/promises'
import { join } from 'path'
import { calculateReadTime } from '~/utils/readingTime'

export default defineEventHandler(async (event) => {
  try {
    const { filePath } = await readBody(event)
    
    // Validate file path for security
    if (!filePath?.startsWith('content/blog/') || !filePath.endsWith('.md')) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file path'
      })
    }
    
    // Read and calculate reading time
    const fullPath = join(process.cwd(), filePath)
    const content = await readFile(fullPath, 'utf-8')
    const readTime = calculateReadTime(content)
    
    return { readTime }
  } catch (error) {
    console.error('Error calculating reading time:', error)
    return { readTime: 1 }
  }
})