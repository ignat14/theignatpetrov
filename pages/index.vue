<template>
  <div>
    <!-- Hero Section -->
    <section class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center relative overflow-hidden">
      <!-- Matrix-style background effect -->
      <div class="absolute inset-0 opacity-10">
        <div class="matrix-bg"></div>
      </div>
      
      <div class="text-center z-10 relative">
        <h1 class="font-saira text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 text-white text-center px-4">
          Ignat Petrov
        </h1>
        <div class="h-12 sm:h-16 flex items-center justify-center px-4">
          <div class="font-saira text-lg sm:text-xl md:text-2xl lg:text-4xl font-mono text-green-400 matrix-text text-center">
            {{ currentTitle }}
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Preview -->
    <section class="py-20 bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-4">What I Do</h2>
          <p class="text-lg text-gray-300">I specialize in building full-stack applications with modern technologies</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white">Frontend Development</h3>
            <p class="text-gray-300">Vue.js, React, TypeScript, Tailwind CSS</p>
          </div>
          <div class="text-center">
            <div class="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white">Backend Development</h3>
            <p class="text-gray-300">Python, Django, FastAPI, PostgreSQL</p>
          </div>
          <div class="text-center">
            <div class="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white">DevOps & Tools</h3>
            <p class="text-gray-300">Docker, AWS, CI/CD, Git</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Projects Preview -->
    <section class="py-20 bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-4">Featured Projects</h2>
          <p class="text-lg text-gray-300">Some of my recent work</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
            <div class="h-48 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2 text-white">Project One</h3>
              <p class="text-gray-300 mb-4">Description of your project goes here.</p>
              <div class="flex space-x-2">
                <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Vue.js</span>
                <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Python</span>
              </div>
            </div>
          </div>
          <div class="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
            <div class="h-48 bg-gradient-to-r from-green-500 to-blue-500"></div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2 text-white">Project Two</h3>
              <p class="text-gray-300 mb-4">Description of your project goes here.</p>
              <div class="flex space-x-2">
                <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">React</span>
                <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Node.js</span>
              </div>
            </div>
          </div>
          <div class="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
            <div class="h-48 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2 text-white">Project Three</h3>
              <p class="text-gray-300 mb-4">Description of your project goes here.</p>
              <div class="flex space-x-2">
                <span class="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">TypeScript</span>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Docker</span>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-12">
          <NuxtLink to="/portfolio" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View All Projects
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Recent Blog Posts -->
    <section class="py-20 bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-4">Latest Blog Posts</h2>
          <p class="text-lg text-gray-300">Thoughts on development, technology, and life</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article class="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
            <div class="p-6">
              <div class="text-sm text-gray-400 mb-2">March 15, 2024</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Getting Started with Vue 3 Composition API</h3>
              <p class="text-gray-300 mb-4">Learn how to use the new Composition API in Vue 3 to write more maintainable and reusable components.</p>
              <NuxtLink to="/blog/vue-3-composition-api" class="text-blue-600 hover:text-blue-800 font-medium">
                Read More →
              </NuxtLink>
            </div>
          </article>
          <article class="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
            <div class="p-6">
              <div class="text-sm text-gray-400 mb-2">March 10, 2024</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Building Scalable APIs with FastAPI</h3>
              <p class="text-gray-300 mb-4">Tips and best practices for creating high-performance REST APIs using Python's FastAPI framework.</p>
              <NuxtLink to="/blog/fastapi-scalable-apis" class="text-blue-600 hover:text-blue-800 font-medium">
                Read More →
              </NuxtLink>
            </div>
          </article>
          <article class="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
            <div class="p-6">
              <div class="text-sm text-gray-400 mb-2">March 5, 2024</div>
              <h3 class="text-xl font-semibold mb-3 text-white">Docker Best Practices for Development</h3>
              <p class="text-gray-300 mb-4">Streamline your development workflow with these Docker tips and tricks for better container management.</p>
              <NuxtLink to="/blog/docker-best-practices" class="text-blue-600 hover:text-blue-800 font-medium">
                Read More →
              </NuxtLink>
            </div>
          </article>
        </div>
        <div class="text-center mt-12">
          <NuxtLink to="/blog" class="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            View All Posts
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const titles: string[] = [
  'Software Engineer',
  'Solopreneur', 
  'Freelancer at Toptal',
  'Python Lecturer'
]

const currentTitle = ref<string>('')
const titleIndex = ref<number>(0)

const morphTitle = async (fromTitle: string, toTitle: string): Promise<void> => {
  const maxLength = Math.max(fromTitle.length, toTitle.length)
  
  // Matrix rain transformation effect
  for (let step = 0; step <= 20; step++) {
    let newTitle = ''
    
    for (let i = 0; i < maxLength; i++) {
      const progress = step / 20
      const charProgress = Math.max(0, Math.min(1, (progress * maxLength - i) / 3))
      
      if (charProgress === 0) {
        // Not started transforming yet
        newTitle += fromTitle[i] || ' '
      } else if (charProgress === 1) {
        // Fully transformed
        newTitle += toTitle[i] || ' '
      } else {
        // In transition - show random matrix characters
        const chars = '0123456789@#$%^&*?><|\\;:~{}[]'
        newTitle += chars[Math.floor(Math.random() * chars.length)]
      }
    }
    
    currentTitle.value = newTitle.trim()
    await new Promise<void>(resolve => setTimeout(resolve, 80))
  }
  
  // Hold the final title
  currentTitle.value = toTitle
  await new Promise<void>(resolve => setTimeout(resolve, 3000))
}

const startAnimation = async (): Promise<void> => {
  // Start with first title
  currentTitle.value = titles[0]
  await new Promise<void>(resolve => setTimeout(resolve, 3000))
  
  while (true) {
    const currentIndex = titleIndex.value
    const nextIndex = (currentIndex + 1) % titles.length
    
    await morphTitle(titles[currentIndex], titles[nextIndex])
    titleIndex.value = nextIndex
  }
}

onMounted(() => {
  startAnimation()
})
</script>

<style scoped>
.matrix-bg {
  background-image: 
    linear-gradient(90deg, transparent 98%, #00ff00 100%),
    linear-gradient(transparent 98%, #00ff00 100%);
  background-size: 20px 20px;
  width: 100%;
  height: 100%;
  animation: matrix-rain 20s linear infinite;
}

@keyframes matrix-rain {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
}

.matrix-text {
  text-shadow: 0 0 10px #00ff00, 0 0 2px #00ff00, 0 0 30px #00ff00;
  font-family: 'Saira Condensed', monospace;
  min-height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Matrix glitch effect */
@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-1px, 1px); }
  40% { transform: translate(-1px, -1px); }
  60% { transform: translate(1px, 1px); }
  80% { transform: translate(1px, -1px); }
}
</style>