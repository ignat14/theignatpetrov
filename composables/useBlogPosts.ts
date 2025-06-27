import { ref } from 'vue'
import type { BlogPost } from '~/types/blog'

const blogPosts = ref<BlogPost[]>([
  {
    slug: 'creeping-in-comfort-zone',
    title: 'Creeping in Comfort Zone',
    excerpt: 'I thought that I was always keeping myself away from the Comfort Zone, failing to realize that it can come in different areas of life.',
    date: '2025-06-27',
    readTime: 8,
    tags: ['Burnout', 'Comfort Zone', 'Mindfulness'],
    views: 0,
    comments: 0
  },
  {
    slug: 'vue-3-composition-api',
    title: 'Getting Started with Vue 3 Composition API [Example]',
    excerpt: 'Learn how to use the new Composition API in Vue 3 to write more maintainable and reusable components. We\'ll explore the basics and build a practical example.',
    date: '2024-03-15',
    readTime: 8,
    tags: ['Vue.js', 'JavaScript', 'Frontend'],
    views: 0,
    comments: 0
  },
])

export const useBlogPosts = () => {
  const getAllPosts = () => blogPosts.value
  
  const getLatestPosts = (limit: number = 3) => {
    return blogPosts.value
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
  }
  
  const getPostBySlug = (slug: string) => {
    return blogPosts.value.find(post => post.slug === slug)
  }

  return {
    blogPosts,
    getAllPosts,
    getLatestPosts,
    getPostBySlug
  }
}