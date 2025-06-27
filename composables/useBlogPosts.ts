import { ref } from 'vue'
import type { BlogPost } from '~/types/blog'
import { getReadTimeForPost } from '~/utils/readingTime'

const blogPosts = ref<BlogPost[]>([])
const isInitialized = ref(false)

export const useBlogPosts = () => {
  const initializePosts = async () => {
    if (isInitialized.value) return

    try {
      // Get all blog posts from content directory  
      const posts = await queryContent('/blog').find()
      
      // Calculate reading time for each post
      blogPosts.value = await Promise.all(posts.map(async post => {
        const slug = post.slug || post._path?.replace('/blog/', '') || ''
        const readTime = await getReadTimeForPost(slug)
        
        return {
          slug,
          title: post.title || 'Untitled',
          excerpt: post.description || '',
          date: post.date || '',
          readTime,
          tags: post.tags || [],
          views: 0,
          comments: 0
        }
      }))
      
      isInitialized.value = true
    } catch (error) {
      console.error('Failed to load blog posts:', error)
      // Fallback to hardcoded posts with calculated reading times
      blogPosts.value = [
        {
          slug: 'creeping-in-comfort-zone',
          title: 'Creeping in Comfort Zone',
          excerpt: 'I thought that I was always keeping myself away from the Comfort Zone, failing to realize that it can come in different areas of life.',
          date: '2025-06-27',
          readTime: await getReadTimeForPost('creeping-in-comfort-zone'),
          tags: ['Burnout', 'Comfort Zone', 'Mindfulness'],
          views: 0,
          comments: 0
        },
        {
          slug: 'vue-3-composition-api',
          title: 'Getting Started with Vue 3 Composition API [Example]',
          excerpt: 'Learn how to use the new Composition API in Vue 3 to write more maintainable and reusable components.',
          date: '2024-03-15',
          readTime: await getReadTimeForPost('vue-3-composition-api'),
          tags: ['Vue.js', 'JavaScript', 'Frontend'],
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