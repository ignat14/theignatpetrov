<template>
  <div class="min-h-screen bg-surface-0 pt-16">
    <!-- Article -->
    <article class="pb-16">
      <div class="max-w-3xl mx-auto px-6 lg:px-8 pt-12">
        <!-- Back Navigation -->
        <div class="mb-10">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-400 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Blog
          </NuxtLink>
        </div>

        <!-- Article Header -->
        <header class="mb-12">
          <div class="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mb-6 font-mono">
            <time>{{ formatDate(data?.date) }}</time>
            <span class="text-neutral-700">/</span>
            <span>{{ data?.readTime }} min read</span>
            <span class="text-neutral-700">/</span>
            <div class="flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <span v-if="isLoadingStats" class="inline-block w-8 h-3 bg-neutral-800 rounded animate-pulse"></span>
              <span v-else>{{ viewCount }}</span>
            </div>
          </div>

          <h1 class="font-display text-3xl md:text-5xl font-bold text-neutral-100 mb-8 leading-tight text-balance">
            {{ data?.title }}
          </h1>

          <!-- Featured Image -->
          <div class="mb-8 -mx-2">
            <img
              :src="data?.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80'"
              :alt="data?.title || 'Blog post image'"
              width="1200"
              height="600"
              class="w-full h-64 md:h-80 object-cover rounded-xl border border-neutral-700/40"
            />
          </div>

          <p class="text-lg text-neutral-400 leading-relaxed text-pretty">
            {{ data?.description }}
          </p>
        </header>

        <!-- Article Content -->
        <div class="prose prose-lg prose-invert max-w-none">
          <ContentRenderer :value="data" class="blog-content" />
        </div>

        <!-- Article Footer -->
        <footer class="mt-16 pt-8 border-t border-neutral-800/30">
          <!-- Share Buttons -->
          <div class="flex items-center gap-6 mb-10">
            <span class="text-sm text-neutral-500">Share:</span>
            <button
              @click="shareOnTwitter"
              class="flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 border border-neutral-700/40 rounded-lg hover:text-neutral-100 hover:border-neutral-600 transition-colors"
              aria-label="Share on Twitter"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>Twitter</span>
            </button>
            <button
              @click="shareOnLinkedIn"
              class="flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 border border-neutral-700/40 rounded-lg hover:text-neutral-100 hover:border-neutral-600 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </button>
          </div>

          <!-- Author Bio -->
          <div class="p-6 rounded-xl border border-neutral-700/40 bg-surface-1">
            <div class="flex items-start gap-4">
              <img
                src="/images/profile_pic.jpeg"
                alt="Ignat Petrov"
                width="56"
                height="56"
                class="w-14 h-14 rounded-full object-cover flex-shrink-0 border border-neutral-800/50"
              />
              <div>
                <h3 class="font-display text-base font-semibold text-neutral-100 mb-1">Ignat Petrov</h3>
                <p class="text-sm text-neutral-400 mb-3">
                  Software Engineer, Solopreneur, and Python Lecturer. Passionate about building
                  scalable web applications and sharing knowledge with the developer community.
                </p>
                <div class="flex gap-4">
                  <NuxtLink to="/about" class="text-sm text-amber-400/80 hover:text-amber-400 transition-colors">
                    About me
                  </NuxtLink>
                  <a href="https://x.com/theignatpetrov" target="_blank" rel="noopener noreferrer" class="text-sm text-amber-400/80 hover:text-amber-400 transition-colors">
                    Follow on X
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </article>

    <!-- Related Posts -->
    <section v-if="relatedPosts.length > 0" class="border-t border-neutral-800/30 py-16">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 class="font-display text-xl font-semibold text-neutral-100 mb-8">Related Posts</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <article
            v-for="post in relatedPosts"
            :key="post.slug"
            class="group p-5 rounded-lg border border-neutral-700/40 hover:border-amber-400/30 transition-colors"
          >
            <div class="flex items-center gap-3 text-xs text-neutral-500 mb-2 font-mono">
              <time>{{ formatDate(post.date) }}</time>
              <span class="text-neutral-700">/</span>
              <span>{{ post.readTime }} min</span>
            </div>
            <h3 class="font-display text-base font-semibold text-neutral-100 mb-2 group-hover:text-amber-400 transition-colors">
              <NuxtLink :to="`/blog/${post.slug}`">
                {{ post.title }}
              </NuxtLink>
            </h3>
            <p class="text-sm text-neutral-400 line-clamp-2">{{ post.excerpt }}</p>
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
const { posts, getAllPosts } = useBlogPosts()

const relatedPosts = computed(() => {
  const currentSlug = route.params.slug as string
  return posts.value
    .filter(post => post.slug !== currentSlug)
    .slice(0, BLOG_CONFIG.UI.RELATED_POSTS_COUNT)
})

// Fetch blog stats (analytics) on mount
onMounted(async () => {
  const currentSlug = route.params.slug as string

  await getAllPosts()

  await fetchBlogStats()
  viewCount.value = getViewCount(currentSlug)
  updateBlogPosts(posts.value)
})

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
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
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  window.open(linkedinUrl, '_blank', 'width=600,height=400')
}

// SEO Meta
const baseUrl = 'https://theignatpetrov.com'
const currentUrl = `${baseUrl}${route.path}`

const blogPostImage = data.value?.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80'

const twitterTitle = `${data.value?.title || 'Blog Post'} | Ignat Petrov`
const twitterDescription = data.value?.description || 'Read this blog post about software development, technology, and building cool projects.'

useHead({
  title: data.value?.title || 'Blog Post',
  meta: [
    { name: 'description', content: data.value?.description || '' },
    { name: 'keywords', content: data.value?.tags?.join(', ') || '' },
    { property: 'og:title', content: twitterTitle },
    { property: 'og:description', content: data.value?.description || '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:image', content: blogPostImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '600' },
    { property: 'og:site_name', content: 'Ignat Petrov Blog' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@theignatpetrov' },
    { name: 'twitter:creator', content: '@theignatpetrov' },
    { name: 'twitter:title', content: twitterTitle },
    { name: 'twitter:description', content: twitterDescription },
    { name: 'twitter:image', content: blogPostImage },
    { name: 'twitter:image:alt', content: `Featured image for blog post: ${data.value?.title || 'Blog Post'}` },
    { property: 'article:author', content: 'Ignat Petrov' },
    { property: 'article:published_time', content: data.value?.date ? new Date(data.value.date).toISOString() : '' },
    { property: 'article:tag', content: data.value?.tags?.join(', ') || '' },
    { property: 'article:section', content: 'Technology' }
  ]
})
</script>

<style>
.blog-content {
  @apply text-neutral-300;
}

.blog-content h1,
.blog-content h2,
.blog-content h3,
.blog-content h4,
.blog-content h5,
.blog-content h6 {
  @apply text-neutral-100 font-bold;
  font-family: 'Syne', sans-serif;
}

.blog-content h1 a,
.blog-content h2 a,
.blog-content h3 a,
.blog-content h4 a,
.blog-content h5 a,
.blog-content h6 a {
  @apply text-neutral-100 no-underline;
}

.blog-content h1 a:hover,
.blog-content h2 a:hover,
.blog-content h3 a:hover,
.blog-content h4 a:hover,
.blog-content h5 a:hover,
.blog-content h6 a:hover {
  @apply text-neutral-100 no-underline;
}

.blog-content h1 {
  @apply text-3xl mb-6 mt-10;
}

.blog-content h2 {
  @apply text-2xl mb-4 mt-10;
  scroll-margin-top: 5rem;
}

.blog-content h3 {
  @apply text-xl mb-4 mt-8;
  scroll-margin-top: 5rem;
}

.blog-content p {
  @apply mb-5 leading-relaxed;
  font-family: 'DM Sans', 'Charter', 'Georgia', serif;
  font-size: 1.0625rem;
  line-height: 1.75;
}

.blog-content ul,
.blog-content ol {
  @apply mb-5 pl-6;
}

.blog-content li {
  @apply mb-2 text-neutral-300;
  font-size: 1.0625rem;
  line-height: 1.75;
}

.blog-content a {
  @apply text-amber-400 hover:text-amber-300 underline underline-offset-2 decoration-amber-400/30 hover:decoration-amber-400/60;
  transition: color 0.15s, text-decoration-color 0.15s;
}

.blog-content code {
  @apply bg-surface-2 text-amber-300 px-1.5 py-0.5 rounded text-sm;
  font-family: 'JetBrains Mono', monospace;
}

.blog-content pre {
  @apply bg-surface-1 p-5 rounded-xl overflow-x-auto mb-5 border border-neutral-700/40;
}

.blog-content pre code {
  @apply bg-transparent p-0 text-neutral-300;
}

.blog-content blockquote {
  @apply border-l-2 border-amber-400/40 pl-5 italic text-neutral-400 my-6;
}

.blog-content img {
  @apply rounded-xl my-8 border border-neutral-700/40;
}

.blog-content table {
  @apply w-full border-collapse mb-5;
}

.blog-content th,
.blog-content td {
  @apply border border-neutral-800/50 px-4 py-2 text-sm;
}

.blog-content th {
  @apply bg-surface-1 text-neutral-100 font-semibold;
}

.blog-content hr {
  @apply border-neutral-800/30 my-10;
}
</style>
