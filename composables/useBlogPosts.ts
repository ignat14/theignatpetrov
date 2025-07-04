import { ref } from 'vue'
import type { BlogPost } from '~/types/blog'

const blogPosts = ref<BlogPost[]>([])
const isInitialized = ref(false)

export const useBlogPosts = () => {
  const initializePosts = async () => {
    if (isInitialized.value) return

    try {
      // Get all blog posts from content directory  
      const posts = await queryContent('/blog').find()
      
      // Map posts with their data from frontmatter
      blogPosts.value = posts.map(post => {
        const slug = post.slug || post._path?.replace('/blog/', '') || ''
        
        return {
          slug,
          title: post.title || 'Untitled',
          excerpt: post.description || '',
          date: post.date || '',
          readTime: post.readTime || 1, // Use readTime from frontmatter, fallback to 1
          tags: post.tags || [],
          views: 0,
          comments: 0
        }
      })
      
      isInitialized.value = true
    } catch (error) {
      console.error('Failed to load blog posts:', error)
      // Fallback to hardcoded posts
      blogPosts.value = [
        {
          slug: 'i-quit-my-job--reflections-on-the-first-month',
          title: 'Quitting My 9–5: Burnout, Procrastination, and Loss of Focus',
          excerpt: 'Leaving a stable job is rarely easy, but sometimes you just know it’s time. I want to share a bit about what led me to quit, what I planned to do next, and how the first month has actually gone.',
          date: '2025-07-03',
          readTime: 2,
          tags: ['Burnout', 'Procrastination', 'Quit', 'Solopreneur'],
          views: 0,
          comments: 0
        }
      ]
      isInitialized.value = true
    }
  }

  const getAllPosts = async () => {
    await initializePosts()
    return blogPosts.value
  }
  
  const getLatestPosts = async (limit: number = 3) => {
    await initializePosts()
    return blogPosts.value
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
  }
  
  const getPostBySlug = async (slug: string) => {
    await initializePosts()
    return blogPosts.value.find(post => post.slug === slug)
  }

  return {
    blogPosts: readonly(blogPosts),
    getAllPosts,
    getLatestPosts,
    getPostBySlug
  }
}