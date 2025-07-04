import { ref } from 'vue'
import type { BlogPost, BlogContent } from '~/types/blog'

const posts = ref<BlogPost[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
let isInitialized = false

export const useBlogPosts = () => {
  const initializePosts = async () => {
    if (isInitialized) return

    isLoading.value = true
    error.value = null

    try {
      // Get all blog posts from content directory
      const contents = await queryContent<BlogContent>('/blog').find()
      
      // Transform content to BlogPost format
      posts.value = contents.map(content => {
        const slug = content._path?.replace('/blog/', '') || ''
        
        return {
          slug,
          title: content.title || 'Untitled',
          excerpt: content.description || '',
          date: content.date || '',
          readTime: content.readTime || 1,
          tags: content.tags || [],
          views: 0,
          comments: 0
        }
      })
      
      isInitialized = true
    } catch (err) {
      console.error('Failed to load blog posts:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load posts'
      
      // Fallback to hardcoded post
      posts.value = [{
        slug: 'i-quit-my-job--reflections-on-the-first-month',
        title: 'Quitting My 9–5: Burnout, Procrastination, and Loss of Focus',
        excerpt: 'Leaving a stable job is rarely easy, but sometimes you just know it\'s time. I want to share a bit about what led me to quit, what I planned to do next, and how the first month has actually gone.',
        date: '2025-07-03',
        readTime: 2,
        tags: ['Burnout', 'Procrastination', 'Quit', 'Solopreneur'],
        views: 0,
        comments: 0
      }]
      isInitialized = true
    } finally {
      isLoading.value = false
    }
  }

  const getAllPosts = async (): Promise<BlogPost[]> => {
    await initializePosts()
    return posts.value
      .filter(post => post.date) // Filter out posts without dates
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  
  const getLatestPosts = async (limit: number = 3): Promise<BlogPost[]> => {
    const allPosts = await getAllPosts()
    return allPosts.slice(0, limit)
  }
  
  const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
    await initializePosts()
    return posts.value.find(post => post.slug === slug)
  }

  return {
    // Data
    posts: readonly(posts),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Methods
    getAllPosts,
    getLatestPosts,
    getPostBySlug
  }
}