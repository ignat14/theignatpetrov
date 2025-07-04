<template>
  <div class="min-h-screen bg-gray-950">
    <!-- Article Header -->
    <article class="bg-gray-900 border-b border-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Back Navigation -->
      <div class="mb-8">
        <NuxtLink 
          to="/blog" 
          class="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Blog
        </NuxtLink>
      </div>

      <!-- Article Meta -->
      <header class="mb-12">
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
          <time>{{ formatDate(data?.date) }}</time>
          <span>•</span>
          <span>{{ data?.readTime }} min read</span>
          <span>•</span>
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            <span v-if="isLoadingStats" class="inline-block w-8 h-4 bg-gray-600 rounded animate-pulse"></span>
            <span v-else>{{ viewCount }} views</span>
          </div>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
          {{ data?.title }}
        </h1>

        <!-- Featured Image -->
        <div class="mb-8">
          <img 
            :src="data?.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80'" 
            :alt="data?.title || 'Blog post image'"
            class="w-full h-64 md:h-80 object-cover rounded-lg border border-gray-700"
          />
        </div>

        <p class="text-xl text-gray-300 mb-8 leading-relaxed">
          {{ data?.description }}
        </p>

      </header>

      <!-- Article Content -->
      <div class="prose prose-lg prose-invert max-w-none">
        <ContentRenderer :value="data" class="blog-content" />
      </div>

      <!-- Article Footer -->
      <footer class="mt-16 pt-8 border-t border-gray-700">
        <!-- Share Buttons -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center space-x-4">
            <span class="text-gray-400">Share this article:</span>
            <button 
              @click="shareOnTwitter"
              class="flex items-center space-x-2 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>Twitter</span>
            </button>
            <button 
              @click="shareOnLinkedIn"
              class="flex items-center space-x-2 px-3 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </button>
          </div>
        </div>

        <!-- Author Bio -->
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div class="flex items-start space-x-4">
            <img 
              src="/images/profile_pic.jpeg" 
              alt="Ignat Petrov"
              class="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <h3 class="text-lg font-semibold text-white mb-2">Ignat Petrov</h3>
              <p class="text-gray-300 mb-4">
                Software Engineer, Solopreneur, and Python Lecturer. Passionate about building 
                scalable web applications and sharing knowledge with the developer community.
              </p>
              <div class="flex space-x-4">
                <NuxtLink to="/about" class="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Learn more about me
                </NuxtLink>
                <a href="#" class="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Follow on X
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      </div>
    </article>

    <!-- Comments Section -->
    <section class="bg-gray-800 py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogComments :post-slug="route.params.slug as string" />
      </div>
    </section>

    <!-- Related Posts -->
    <section class="bg-gray-900 py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-white mb-8">Related Posts</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <article 
            v-for="post in relatedPosts" 
            :key="post.slug"
            class="bg-gray-950 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors"
          >
            <div class="flex items-center space-x-3 text-sm text-gray-400 mb-3">
              <time>{{ formatDate(post.date) }}</time>
              <span>•</span>
              <span>{{ post.readTime }} min read</span>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
              <NuxtLink :to="`/blog/${post.slug}`">
                {{ post.title }}
              </NuxtLink>
            </h3>
            <p class="text-gray-300 text-sm mb-4">{{ post.excerpt }}</p>
            <div class="flex items-center space-x-4 text-xs text-gray-500">
              <span class="flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                {{ post.views }} views
              </span>
              <span class="flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                {{ post.comments }} comments
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { BlogContent, BlogPost } from '~/types/blog'
import { BLOG_CONFIG } from '~/utils/config'

const route = useRoute()
const viewCount = ref<number>(0)

const { isLoading: isLoadingStats, fetchBlogStats, getViewCount, updateBlogPosts } = useBlogStats()

// Fetch the blog post content
const { data } = await useAsyncData<BlogContent>(`content-${route.params.slug}`, async () => {
  const content = await queryContent('/blog').where({ _path: `/blog/${route.params.slug}` }).findOne()
  return content as unknown as BlogContent
})

// Get related posts from the blog posts composable
const { blogPosts } = useBlogPosts()

const relatedPosts = computed(() => {
  const currentSlug = route.params.slug as string
  return blogPosts.value
    .filter(post => post.slug !== currentSlug)
    .slice(0, BLOG_CONFIG.UI.RELATED_POSTS_COUNT)
})

// Fetch blog stats (analytics + comment counts) in single API call
onMounted(async () => {
  const currentSlug = route.params.slug as string
  
  await fetchBlogStats()
  viewCount.value = getViewCount(currentSlug)
  updateBlogPosts(blogPosts.value)
})

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const shareOnTwitter = (): void => {
  const url = window.location.href
  const title = data.value?.title || ''
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  window.open(twitterUrl, '_blank', 'width=600,height=400')
}

const shareOnLinkedIn = (): void => {
  const url = window.location.href
  const title = data.value?.title || ''
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  window.open(linkedinUrl, '_blank', 'width=600,height=400')
}

// SEO Meta
useHead({
  title: data.value?.title || 'Blog Post',
  meta: [
    { name: 'description', content: data.value?.description || '' },
    { name: 'keywords', content: data.value?.tags?.join(', ') || '' }
  ]
})
</script>

<style>
.blog-content {
  @apply text-gray-300;
}

.blog-content h1,
.blog-content h2,
.blog-content h3,
.blog-content h4,
.blog-content h5,
.blog-content h6 {
  @apply text-white font-bold;
}

.blog-content h1 a,
.blog-content h2 a,
.blog-content h3 a,
.blog-content h4 a,
.blog-content h5 a,
.blog-content h6 a {
  @apply text-white no-underline;
}

.blog-content h1 a:hover,
.blog-content h2 a:hover,
.blog-content h3 a:hover,
.blog-content h4 a:hover,
.blog-content h5 a:hover,
.blog-content h6 a:hover {
  @apply text-white no-underline;
}

.blog-content h1 {
  @apply text-4xl mb-6 mt-8;
}

.blog-content h2 {
  @apply text-3xl mb-4 mt-8;
}

.blog-content h3 {
  @apply text-2xl mb-4 mt-6;
}

.blog-content p {
  @apply mb-4 leading-relaxed;
  font-family: 'Charter', 'Georgia', 'Times New Roman', serif;
  font-size: 1.125rem;
  line-height: 1.7;
}

.blog-content ul,
.blog-content ol {
  @apply mb-4 pl-6;
}

.blog-content li {
  @apply mb-2;
}

.blog-content a {
  @apply text-blue-400 hover:text-blue-300 underline;
}

.blog-content code {
  @apply bg-gray-800 text-green-400 px-2 py-1 rounded text-sm;
}

.blog-content pre {
  @apply bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4;
}

.blog-content pre code {
  @apply bg-transparent p-0;
}

.blog-content blockquote {
  @apply border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4;
}

.blog-content img {
  @apply rounded-lg my-6;
}

.blog-content table {
  @apply w-full border-collapse mb-4;
}

.blog-content th,
.blog-content td {
  @apply border border-gray-700 px-4 py-2;
}

.blog-content th {
  @apply bg-gray-800 text-white font-semibold;
}
</style>