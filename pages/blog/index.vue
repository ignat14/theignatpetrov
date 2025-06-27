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
                    <span v-if="isLoadingStats" class="inline-block w-8 h-4 bg-gray-600 rounded animate-pulse"></span>
                    <span v-else>{{ post.views }} views</span>
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <span v-if="isLoadingStats" class="inline-block w-12 h-4 bg-gray-600 rounded animate-pulse"></span>
                    <span v-else>{{ post.comments }} comments</span>
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
import { ref, computed, onMounted } from 'vue'
import type { BlogPost } from '~/types/blog'
import { BLOG_CONFIG } from '~/utils/config'

const searchQuery = ref<string>('')
const selectedTags = ref<string[]>([])
const displayedPostsCount = ref<number>(BLOG_CONFIG.UI.POSTS_PER_PAGE)

const { blogPosts } = useBlogPosts()
const { isLoading: isLoadingStats, fetchBlogStats, updateBlogPosts } = useBlogStats()

// Fetch blog stats (analytics + comment counts) in single API call
onMounted(async () => {
  await fetchBlogStats()
  updateBlogPosts(blogPosts.value)
})

const allTags = computed<string[]>(() => {
  const tags = new Set<string>()
  blogPosts.value.forEach((post: BlogPost) => {
    post.tags.forEach((tag: string) => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredPosts = computed<BlogPost[]>(() => {
  let posts: BlogPost[] = blogPosts.value

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
  return filteredPosts.value.length < blogPosts.value.length
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
  displayedPostsCount.value += BLOG_CONFIG.UI.POSTS_PER_LOAD
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>