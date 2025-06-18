<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">Blog</h1>
          <p class="text-xl text-blue-100">Thoughts on development, technology, and life</p>
        </div>
      </div>
    </section>

    <!-- Blog Posts Section -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Search and Filter -->
        <div class="mb-12">
          <div class="flex flex-col gap-4">
            <div class="relative max-w-md mx-auto md:mx-0">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search posts..."
                class="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <div class="flex flex-wrap justify-center md:justify-start gap-2">
              <button
                v-for="tag in allTags"
                :key="tag"
                @click="toggleTag(tag)"
                :class="[
                  'px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap',
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                ]"
              >
                {{ tag }}
              </button>
            </div>
          </div>
        </div>

        <!-- Blog Posts Grid -->
        <div class="space-y-8">
          <article
            v-for="post in filteredPosts"
            :key="post.slug"
            class="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors border border-gray-700"
          >
            <div class="p-6 sm:p-8">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <div class="flex items-center space-x-4">
                  <time class="text-sm text-gray-400">{{ formatDate(post.date) }}</time>
                  <span class="text-gray-500">•</span>
                  <span class="text-sm text-gray-400">{{ post.readTime }} min read</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              
              <h2 class="text-2xl font-bold text-white mb-4 hover:text-blue-400 transition-colors">
                <NuxtLink :to="`/blog/${post.slug}`">
                  {{ post.title }}
                </NuxtLink>
              </h2>
              
              <p class="text-gray-300 mb-6 leading-relaxed">
                {{ post.excerpt }}
              </p>
              
              <div class="flex items-center justify-between">
                <NuxtLink 
                  :to="`/blog/${post.slug}`"
                  class="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                >
                  Read more
                  <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </NuxtLink>
                
                <div class="flex items-center space-x-4 text-sm text-gray-400">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    {{ post.views }} views
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    {{ post.comments }} comments
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- No posts message -->
        <div v-if="filteredPosts.length === 0" class="text-center py-12">
          <p class="text-gray-400">No posts found matching your criteria.</p>
        </div>

        <!-- Load More Button -->
        <div v-if="hasMorePosts" class="text-center mt-12">
          <button
            @click="loadMorePosts"
            class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Load More Posts
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BlogPost } from '~/types/blog'

const searchQuery = ref<string>('')
const selectedTags = ref<string[]>([])
const displayedPostsCount = ref<number>(6)

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    slug: 'vue-3-composition-api',
    title: 'Getting Started with Vue 3 Composition API',
    excerpt: 'Learn how to use the new Composition API in Vue 3 to write more maintainable and reusable components. We\'ll explore the basics and build a practical example.',
    date: '2024-03-15',
    readTime: 8,
    tags: ['Vue.js', 'JavaScript', 'Frontend'],
    views: 1234,
    comments: 15
  },
  {
    slug: 'fastapi-scalable-apis',
    title: 'Building Scalable APIs with FastAPI',
    excerpt: 'Tips and best practices for creating high-performance REST APIs using Python\'s FastAPI framework. Learn about async programming, dependency injection, and more.',
    date: '2024-03-10',
    readTime: 12,
    tags: ['Python', 'FastAPI', 'Backend'],
    views: 892,
    comments: 8
  },
  {
    slug: 'docker-best-practices',
    title: 'Docker Best Practices for Development',
    excerpt: 'Streamline your development workflow with these Docker tips and tricks for better container management, faster builds, and improved security.',
    date: '2024-03-05',
    readTime: 6,
    tags: ['Docker', 'DevOps', 'Development'],
    views: 567,
    comments: 12
  },
  {
    slug: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns for Better Code',
    excerpt: 'Explore advanced TypeScript patterns and techniques that will help you write more robust and maintainable code. From utility types to conditional types.',
    date: '2024-02-28',
    readTime: 15,
    tags: ['TypeScript', 'JavaScript', 'Development'],
    views: 1456,
    comments: 23
  },
  {
    slug: 'python-async-programming',
    title: 'Mastering Async Programming in Python',
    excerpt: 'Deep dive into Python\'s asyncio library and learn how to write efficient asynchronous code. Perfect for building high-performance web applications.',
    date: '2024-02-20',
    readTime: 10,
    tags: ['Python', 'Async', 'Performance'],
    views: 789,
    comments: 18
  },
  {
    slug: 'web-performance-optimization',
    title: 'Web Performance Optimization Techniques',
    excerpt: 'Comprehensive guide to optimizing web application performance. Learn about lazy loading, code splitting, caching strategies, and more.',
    date: '2024-02-15',
    readTime: 14,
    tags: ['Performance', 'Web', 'Optimization'],
    views: 1123,
    comments: 27
  },
  {
    slug: 'react-vs-vue-comparison',
    title: 'React vs Vue: A Comprehensive Comparison',
    excerpt: 'An in-depth comparison of React and Vue.js, covering syntax, performance, ecosystem, and use cases to help you choose the right framework.',
    date: '2024-02-10',
    readTime: 11,
    tags: ['React', 'Vue.js', 'Frontend'],
    views: 2341,
    comments: 45
  },
  {
    slug: 'microservices-architecture',
    title: 'Introduction to Microservices Architecture',
    excerpt: 'Learn the fundamentals of microservices architecture, its benefits, challenges, and when to use it in your projects.',
    date: '2024-02-05',
    readTime: 13,
    tags: ['Microservices', 'Architecture', 'Backend'],
    views: 987,
    comments: 22
  }
]

const allTags = computed<string[]>(() => {
  const tags = new Set<string>()
  blogPosts.forEach((post: BlogPost) => {
    post.tags.forEach((tag: string) => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredPosts = computed<BlogPost[]>(() => {
  let posts: BlogPost[] = blogPosts

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter((post: BlogPost) => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Filter by selected tags
  if (selectedTags.value.length > 0) {
    posts = posts.filter((post: BlogPost) =>
      selectedTags.value.every(tag => post.tags.includes(tag))
    )
  }

  return posts.slice(0, displayedPostsCount.value)
})

const hasMorePosts = computed<boolean>(() => {
  return filteredPosts.value.length < blogPosts.length
})

const toggleTag = (tag: string): void => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

const loadMorePosts = (): void => {
  displayedPostsCount.value += 6
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>