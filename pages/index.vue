<template>
  <div class="parallax-container">
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
    <section class="py-20 bg-gray-800 parallax-section" data-speed="0.2">
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

    <!-- Recent Projects Preview
    <section class="py-20 bg-gray-900 parallax-section" data-speed="0.1">
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
    </section> -->

    <!-- Recent Blog Posts -->
    <section class="py-20 bg-gray-900 parallax-section" data-speed="0.1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-4">Latest Blog Posts</h2>
          <p class="text-lg text-gray-300">Thoughts on development, technology, and life</p>
        </div>
        <div 
          class="grid gap-8"
          :class="{
            'md:grid-cols-1 lg:grid-cols-1 max-w-md mx-auto': latestPosts.length === 1,
            'md:grid-cols-2 lg:grid-cols-2 max-w-2xl mx-auto': latestPosts.length === 2,
            'md:grid-cols-2 lg:grid-cols-3': latestPosts.length >= 3
          }"
        >
          <article 
            v-for="post in latestPosts" 
            :key="post.slug"
            class="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700"
          >
            <div class="p-6">
              <div class="flex items-center justify-between text-sm text-gray-400 mb-2">
                <time>{{ formatDate(post.date) }}</time>
                <div class="flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <span v-if="isLoadingAnalytics" class="inline-block w-6 h-3 bg-gray-600 rounded animate-pulse"></span>
                  <span v-else>{{ post.views }}</span>
                </div>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-white hover:text-blue-400 transition-colors">
                <NuxtLink :to="`/blog/${post.slug}`">
                  {{ post.title }}
                </NuxtLink>
              </h3>
              <p class="text-gray-300 mb-4">{{ post.excerpt }}</p>
              <div class="flex items-center justify-between">
                <NuxtLink :to="`/blog/${post.slug}`" class="text-blue-400 hover:text-blue-300 font-medium">
                  Read More →
                </NuxtLink>
                <span class="text-xs text-gray-500">{{ post.readTime }} min read</span>
              </div>
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
import { ref, onMounted, onUnmounted } from 'vue'
import type { BlogPost } from '~/types/blog'

const currentTitle = ref<string>('')
const { isLoadingAnalytics, fetchAnalytics, updateBlogPosts } = useAnalytics()
const { getLatestPosts } = useBlogPosts()

const latestPosts = ref<BlogPost[]>([])

// Animation configuration
const ANIMATION_CONFIG = {
  matrixChars: '!@#$%{}[]\\/?><;',    // Characters used for matrix effect
  matrixSpinTime: 1000,               // Time to spin matrix chars before revealing (ms)
  charRevealInterval: 150,            // Time between each character reveal (ms)
  matrixSpinSpeed: 100,               // Speed of matrix character changes (ms)
  betweenWordsTime: 2000,             // Time between first and second word (ms)
  secondWordSpinTime: 1000,           // Time to spin second word before revealing (ms)
  finalSpinChars: '!@#$%^&{}][041',   // Characters for final spinning animation
  finalLandingChars: '#*?',         // Characters to land on after spinning
  finalSpinInterval: 3000,            // Time between each final spin cycle (ms)
  finalSpinDuration: 1000             // Duration of each spinning animation (ms)
}

const getRandomMatrixChar = (): string => {
  const chars = ANIMATION_CONFIG.matrixChars
  return chars[Math.floor(Math.random() * chars.length)]
}

const animateWordReveal = async (targetText: string): Promise<void> => {
  // Initialize display with matrix chars, but keep spaces fixed
  let displayChars = Array.from({ length: targetText.length }, (_, index) => 
    targetText[index] === ' ' ? ' ' : getRandomMatrixChar()
  )
  let revealedPositions = new Set<number>()
  
  // Mark space positions as already revealed
  for (let i = 0; i < targetText.length; i++) {
    if (targetText[i] === ' ') {
      revealedPositions.add(i)
    }
  }
  
  // Matrix spinning phase
  const spinInterval = setInterval(() => {
    displayChars = displayChars.map((char, index) => 
      revealedPositions.has(index) ? char : getRandomMatrixChar()
    )
    currentTitle.value = displayChars.join('')
  }, ANIMATION_CONFIG.matrixSpinSpeed)
  
  // Wait for spin time
  await new Promise<void>(resolve => setTimeout(resolve, ANIMATION_CONFIG.matrixSpinTime))
  
  // Random character reveal (exclude spaces)
  const positions = Array.from({ length: targetText.length }, (_, i) => i)
    .filter(i => targetText[i] !== ' ')
  const shuffledPositions = positions.sort(() => Math.random() - 0.5)
  
  for (const position of shuffledPositions) {
    revealedPositions.add(position)
    displayChars[position] = targetText[position]
    currentTitle.value = displayChars.join('')
    
    await new Promise<void>(resolve => setTimeout(resolve, ANIMATION_CONFIG.charRevealInterval))
  }
  
  clearInterval(spinInterval)
}

const transitionToMatrix = async (currentText: string, newLength: number): Promise<void> => {
  let displayChars = currentText.split('')
  const maxLength = Math.max(currentText.length, newLength)
  
  // Extend or trim array to match new word length
  if (maxLength > displayChars.length) {
    displayChars = [...displayChars, ...Array(maxLength - displayChars.length).fill('')]
  } else if (maxLength < displayChars.length) {
    displayChars = displayChars.slice(0, maxLength)
  }
  
  // Gradually convert characters to matrix chars (exclude spaces from new word)
  const positions = Array.from({ length: currentText.length }, (_, i) => i)
    .filter(i => currentText[i] !== ' ')
  const shuffledPositions = positions.sort(() => Math.random() - 0.5)
  
  for (const position of shuffledPositions) {
    displayChars[position] = getRandomMatrixChar()
    currentTitle.value = displayChars.join('')
    await new Promise<void>(resolve => setTimeout(resolve, ANIMATION_CONFIG.charRevealInterval * 0.2))
  }
  
  // Fill remaining positions with matrix chars
  for (let i = currentText.length; i < maxLength; i++) {
    displayChars[i] = getRandomMatrixChar()
  }
  currentTitle.value = displayChars.join('')
}

const startFinalSpinAnimation = (): void => {
  const secondWord = 'Building cool sh#t'
  const targetPosition = secondWord.length - 2 // Second to last character ('#')
  
  const spinChar = async () => {
    const spinChars = ANIMATION_CONFIG.finalSpinChars
    const landingChars = ANIMATION_CONFIG.finalLandingChars
    const currentDisplay = currentTitle.value.split('')
    
    // 1 second spinning animation
    const spinSteps = Math.floor(ANIMATION_CONFIG.finalSpinDuration / ANIMATION_CONFIG.matrixSpinSpeed)
    for (let i = 0; i < spinSteps; i++) {
      currentDisplay[targetPosition] = spinChars[Math.floor(Math.random() * spinChars.length)]
      currentTitle.value = currentDisplay.join('')
      await new Promise<void>(resolve => setTimeout(resolve, ANIMATION_CONFIG.matrixSpinSpeed))
    }
    
    // Land on final random character from landing set and stick for 2 seconds
    currentDisplay[targetPosition] = landingChars[Math.floor(Math.random() * landingChars.length)]
    currentTitle.value = currentDisplay.join('')
  }
  
  // Start the recurring spin animation
  setInterval(spinChar, ANIMATION_CONFIG.finalSpinInterval)
}

const startAnimation = async (): Promise<void> => {
  const firstWord = 'Software Engineer'
  const secondWord = 'Building cool sh#t'
  
  // Animate first word
  await animateWordReveal(firstWord)
  
  // Wait between words
  await new Promise<void>(resolve => setTimeout(resolve, ANIMATION_CONFIG.betweenWordsTime))
  
  // Transition first word back to matrix chars
  await transitionToMatrix(firstWord, secondWord.length)
  
  // Animate second word
  await animateWordReveal(secondWord)
  
  // Immediately start final spinning
  startFinalSpinAnimation()
}

const handleParallax = () => {
  const scrollTop = window.scrollY
  const parallaxElements = document.querySelectorAll('.parallax-section')
  
  parallaxElements.forEach((element) => {
    const speed = parseFloat(element.getAttribute('data-speed') || '1')
    const yPos = -(scrollTop * speed)
    ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
  })
}

const loadLatestPosts = () => {
  latestPosts.value = getLatestPosts(3)
}

const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  startAnimation()
  // Add parallax scroll listener
  window.addEventListener('scroll', handleParallax)
  
  // Load latest posts and analytics
  loadLatestPosts()
  await fetchAnalytics()
  updateBlogPosts(latestPosts.value)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleParallax)
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

/* Parallax Effects */
.parallax-container {
  overflow-x: hidden;
}

.parallax-section {
  position: relative;
  will-change: transform;
  transition: transform 0.1s ease-out;
}

/* Add depth effect to lighter sections (bg-gray-800) */
.parallax-section[data-speed="0.2"] {
  position: relative;
}

.parallax-section[data-speed="0.2"]::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%);
  pointer-events: none;
  z-index: 1;
}

.parallax-section[data-speed="0.2"] > * {
  position: relative;
  z-index: 2;
}

/* Darker sections (bg-gray-900) - closer to viewer */
.parallax-section[data-speed="0.1"] {
  position: relative;
}
</style>