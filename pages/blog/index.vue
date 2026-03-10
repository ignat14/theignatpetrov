<template>
  <div class="min-h-screen bg-surface-0 pt-16">
    <!-- Header -->
    <section class="pt-16 pb-8">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">
        <p class="text-xs font-mono uppercase tracking-[0.2em] text-amber-400/80 mb-3">Blog</p>
        <h1 class="font-display text-3xl md:text-5xl font-bold text-neutral-100 mb-4 text-balance">Thoughts on development, technology, and life</h1>
      </div>
    </section>

    <!-- Blog Posts Section -->
    <section class="pb-24">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">
        <!-- Search -->
        <div class="mb-12">
          <div class="relative max-w-sm">
            <input
              v-model="searchQuery"
              type="text"
              name="search"
              autocomplete="off"
              placeholder="Search posts..."
              class="w-full px-4 py-2.5 pl-10 bg-surface-2 border border-neutral-700/40 rounded-lg text-neutral-100 placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:border-transparent text-sm transition-colors"
            >
            <svg class="absolute left-3 top-3 h-4 w-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <!-- Blog Posts List -->
        <div class="space-y-2">
          <article
            v-for="post in filteredPosts"
            :key="post.slug"
            class="group -mx-4 px-4 py-5 rounded-lg hover:bg-surface-1 transition-colors"
          >
            <NuxtLink :to="`/blog/${post.slug}`" class="block">
              <div class="flex items-center gap-3 text-xs text-neutral-500 mb-2 font-mono">
                <time>{{ formatDate(post.date) }}</time>
                <span class="text-neutral-700">/</span>
                <span>{{ post.readTime }} min</span>
                <span class="text-neutral-700">/</span>
                <span class="flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <span v-if="isLoadingStats" class="inline-block w-8 h-3 bg-neutral-800 rounded animate-pulse"></span>
                  <span v-else>{{ post.views }}</span>
                </span>
              </div>

              <h2 class="font-display text-xl font-semibold text-neutral-100 mb-2 group-hover:text-amber-400 transition-colors">
                {{ post.title }}
              </h2>

              <p class="text-sm text-neutral-400 leading-relaxed line-clamp-2">
                {{ post.excerpt }}
              </p>
            </NuxtLink>
          </article>
        </div>

        <!-- No posts message -->
        <div v-if="filteredPosts.length === 0" class="text-center py-16">
          <p class="text-neutral-500">No posts found matching your search.</p>
        </div>

        <!-- Load More Button -->
        <div v-if="hasMorePosts" class="text-center mt-12">
          <button
            @click="loadMorePosts"
            class="px-6 py-2.5 rounded-lg text-sm font-medium border border-neutral-700/40 text-neutral-300 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
          >
            Load More
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
const displayedPostsCount = ref<number>(BLOG_CONFIG.UI.POSTS_PER_PAGE)

const { getAllPosts } = useBlogPosts()
const blogPosts = ref<BlogPost[]>([])
const { isLoading: isLoadingStats, fetchBlogStats, updateBlogPosts } = useBlogStats()

// Load blog posts and stats
onMounted(async () => {
  blogPosts.value = await getAllPosts()
  await fetchBlogStats()
  updateBlogPosts(blogPosts.value)
})


const filteredPosts = computed<BlogPost[]>(() => {
  let posts: BlogPost[] = blogPosts.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter((post: BlogPost) =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    )
  }

  return posts.slice(0, displayedPostsCount.value)
})

const hasMorePosts = computed<boolean>(() => {
  return filteredPosts.value.length < blogPosts.value.length
})


const loadMorePosts = (): void => {
  displayedPostsCount.value += BLOG_CONFIG.UI.POSTS_PER_LOAD
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// SEO Meta for Blog Index
const baseUrl = 'https://theignatpetrov.com'
const currentUrl = `${baseUrl}/blog`
const imageUrl = `${baseUrl}/images/profile_pic.jpeg`

useHead({
  title: 'Blog - Ignat Petrov',
  meta: [
    { name: 'description', content: 'Thoughts on development, technology, and life by Ignat Petrov. Software engineer sharing insights on coding, productivity, and building cool projects.' },
    { name: 'keywords', content: 'blog, software development, programming, technology, Vue.js, Python, freelancing' },
    { property: 'og:title', content: 'Blog - Ignat Petrov' },
    { property: 'og:description', content: 'Thoughts on development, technology, and life by Ignat Petrov. Software engineer sharing insights on coding, productivity, and building cool projects.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:image', content: imageUrl },
    { property: 'og:site_name', content: 'Ignat Petrov' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@theignatpetrov' },
    { name: 'twitter:creator', content: '@theignatpetrov' },
    { name: 'twitter:title', content: 'Blog - Ignat Petrov' },
    { name: 'twitter:description', content: 'Thoughts on development, technology, and life by Ignat Petrov. Software engineer sharing insights on coding, productivity, and building cool projects.' },
    { name: 'twitter:image', content: imageUrl }
  ]
})
</script>
