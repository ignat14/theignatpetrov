<template>
  <div class="parallax-container">
    <!-- Hero Section -->
    <section class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center relative overflow-hidden">
      <!-- Matrix rainfall background effect -->
      <div ref="matrixContainer" class="absolute inset-0 overflow-hidden matrix-fade-in matrix-left">
      </div>
      <!-- Right side Matrix rainfall background effect -->
      <div ref="matrixContainerRight" class="absolute inset-0 overflow-hidden matrix-fade-in matrix-right">
      </div>
      
      <!-- Text separation gradient background -->
      <div class="absolute inset-0 z-5 hero-gradient"></div>
      
      <div class="text-center z-10 relative">
        <h1 class="font-saira text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 text-white text-center px-4 hero-title">
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
                  <span v-if="isLoadingStats" class="inline-block w-6 h-3 bg-gray-600 rounded animate-pulse"></span>
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
          <NuxtLink to="/blog" class="bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-800 transition-colors">
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
import { BLOG_CONFIG } from '~/utils/config'

const currentTitle = ref<string>('')
const matrixContainer = ref<HTMLElement>()
const matrixContainerRight = ref<HTMLElement>()
const { isLoading: isLoadingStats, fetchBlogStats, updateBlogPosts } = useBlogStats()
const { getLatestPosts } = useBlogPosts()

const latestPosts = ref<BlogPost[]>([])

// Character sets for animations
const CHARACTER_SETS = {
  matrix: '!@#$%{}[]\\/?><;01',
  matrixWide: 'アイウエオカキクケコサシスセソタチツテト',
  finalSpin: '01!@#$%^&*(){}[]|\\:;"<>,.?/',
  finalSpinWide: 'アイウエオカキクケコサシスセソタチツテト',
  finalLanding: '#*?'
} as const

// Animation timing configuration (in milliseconds)
const TIMING_CONFIG = {
  matrixSpinTime: 1000,
  charRevealInterval: 150,
  matrixSpinSpeed: 100,
  betweenWordsTime: 2000,
  finalSpinInterval: 3000,
  finalSpinDuration: 1000
} as const

// Types
type CharResult = { char: string; isWide: boolean }

// Utility functions
const getRandomChar = (charSet: string): string => {
  return charSet[Math.floor(Math.random() * charSet.length)]
}

const getRandomMatrixChar = (): string => {
  return getRandomChar(CHARACTER_SETS.matrix)
}

const getRandomMatrixCharSmart = (canUseWide: boolean = true): CharResult => {
  const useWide = canUseWide && Math.random() < 0.3
  
  return useWide
    ? { char: getRandomChar(CHARACTER_SETS.matrixWide), isWide: true }
    : { char: getRandomChar(CHARACTER_SETS.matrix), isWide: false }
}

const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

// Character display initialization and updates
const initializeDisplayChars = (targetText: string): [string[], Set<number>] => {
  const displayChars = Array.from({ length: targetText.length }, () => ' ')
  const revealedPositions = new Set<number>()
  let skipNext = false
  
  for (let i = 0; i < targetText.length; i++) {
    if (targetText[i] === ' ') {
      revealedPositions.add(i)
      displayChars[i] = ' '
    } else if (!skipNext) {
      const canUseWide = i < targetText.length - 1 && targetText[i + 1] !== ' '
      const charResult = getRandomMatrixCharSmart(canUseWide)
      
      if (charResult.isWide) {
        displayChars[i] = charResult.char
        if (i + 1 < targetText.length) {
          displayChars[i + 1] = ''
        }
        skipNext = true
      } else {
        displayChars[i] = charResult.char
        skipNext = false
      }
    } else {
      skipNext = false
    }
  }
  
  return [displayChars, revealedPositions]
}

// Helper function to update spinning characters
const updateSpinningChars = (displayChars: string[], targetText: string, revealedPositions: Set<number>): void => {
  let skipNextSpin = false
  
  for (let i = 0; i < displayChars.length; i++) {
    if (!revealedPositions.has(i) && !skipNextSpin) {
      const canUseWide = i < targetText.length - 1 && 
                        !revealedPositions.has(i + 1) && 
                        targetText[i + 1] !== ' '
      const charResult = getRandomMatrixCharSmart(canUseWide)
      
      if (charResult.isWide) {
        displayChars[i] = charResult.char
        if (i + 1 < displayChars.length) {
          displayChars[i + 1] = ''
        }
        skipNextSpin = true
      } else {
        displayChars[i] = charResult.char
        skipNextSpin = false
      }
    } else if (skipNextSpin) {
      skipNextSpin = false
    }
  }
}

const animateWordReveal = async (targetText: string): Promise<void> => {
  const [displayChars, revealedPositions] = initializeDisplayChars(targetText)
  
  // Matrix spinning phase
  const spinInterval = setInterval(() => {
    updateSpinningChars(displayChars, targetText, revealedPositions)
    currentTitle.value = displayChars.join('')
  }, TIMING_CONFIG.matrixSpinSpeed)
  
  await delay(TIMING_CONFIG.matrixSpinTime)
  
  // Random character reveal (exclude spaces)
  const positions = Array.from({ length: targetText.length }, (_, i) => i)
    .filter(i => targetText[i] !== ' ')
  const shuffledPositions = positions.sort(() => Math.random() - 0.5)
  
  for (const position of shuffledPositions) {
    revealedPositions.add(position)
    displayChars[position] = targetText[position]
    currentTitle.value = displayChars.join('')
    await delay(TIMING_CONFIG.charRevealInterval)
  }
  
  clearInterval(spinInterval)
}

const transitionToMatrix = async (currentText: string, newLength: number): Promise<void> => {
  let displayChars = currentText.split('')
  const maxLength = Math.max(currentText.length, newLength)
  
  // Adjust array length
  if (maxLength > displayChars.length) {
    displayChars.push(...Array(maxLength - displayChars.length).fill(''))
  } else if (maxLength < displayChars.length) {
    displayChars = displayChars.slice(0, maxLength)
  }
  
  // Gradually convert non-space characters to matrix chars
  const nonSpacePositions = Array.from({ length: currentText.length }, (_, i) => i)
    .filter(i => currentText[i] !== ' ')
    .sort(() => Math.random() - 0.5)
  
  for (const position of nonSpacePositions) {
    displayChars[position] = getRandomMatrixChar()
    currentTitle.value = displayChars.join('')
    await delay(TIMING_CONFIG.charRevealInterval * 0.2)
  }
  
  // Fill remaining positions with matrix chars
  for (let i = currentText.length; i < maxLength; i++) {
    displayChars[i] = getRandomMatrixChar()
  }
  currentTitle.value = displayChars.join('')
}


// Matrix rainfall configuration
const RAINFALL_CONFIG = {
  chars: '01アイウエオカキクケコサシスセソタチツテト!@#$%^&*(){}[]|\\:;"<>,.?/',
  columnSpacing: 25,
  positionVariation: 30,
  driftRange: { min: 20, max: 80 },
  duration: { min: 3, max: 8 },
  delayMax: 2,
  segments: { min: 3, max: 5 },
  segmentLength: { min: 2, max: 35 },
  gapLength: { min: 3, max: 8 },
  changeInterval: { min: 500, max: 1500 }
} as const

const calculateColumnPosition = (index: number, isRightSide: boolean, screenWidth: number) => {
  const basePosition = isRightSide 
    ? screenWidth - (index * RAINFALL_CONFIG.columnSpacing)
    : index * RAINFALL_CONFIG.columnSpacing
  
  const variation = (Math.random() - 0.5) * RAINFALL_CONFIG.positionVariation
  const startX = basePosition + variation
  
  const driftDirection = isRightSide ? -1 : 1
  const driftAmount = Math.random() * (RAINFALL_CONFIG.driftRange.max - RAINFALL_CONFIG.driftRange.min) + RAINFALL_CONFIG.driftRange.min
  const driftX = driftDirection * driftAmount
  
  return { startX, driftX }
}

const generateRandomRange = (min: number, max: number): number => {
  return min + Math.random() * (max - min)
}

const generateRandomInt = (min: number, max: number): number => {
  return min + Math.floor(Math.random() * (max - min + 1))
}

const generateColumnContent = (): string => {
  let content = ''
  const segments = generateRandomInt(RAINFALL_CONFIG.segments.min, RAINFALL_CONFIG.segments.max)
  
  for (let segment = 0; segment < segments; segment++) {
    const segmentLength = generateRandomInt(RAINFALL_CONFIG.segmentLength.min, RAINFALL_CONFIG.segmentLength.max)
    
    // Add characters for this segment
    for (let j = 0; j < segmentLength; j++) {
      content += getRandomChar(RAINFALL_CONFIG.chars) + '\n'
    }
    
    // Add gap between segments (except after last segment)
    if (segment < segments - 1) {
      const gapLength = generateRandomInt(RAINFALL_CONFIG.gapLength.min, RAINFALL_CONFIG.gapLength.max)
      for (let k = 0; k < gapLength; k++) {
        content += ' \n'
      }
    }
  }
  
  return content
}

const createMatrixColumn = (index: number, isRightSide: boolean, screenWidth: number): HTMLElement => {
  const column = document.createElement('div')
  column.className = isRightSide ? 'matrix-column-right' : 'matrix-column'
  
  const { startX, driftX } = calculateColumnPosition(index, isRightSide, screenWidth)
  
  column.style.left = `${startX}px`
  column.style.setProperty('--drift-x', `${driftX}px`)
  
  // Set random animation timing
  const duration = generateRandomRange(RAINFALL_CONFIG.duration.min, RAINFALL_CONFIG.duration.max)
  const animationDelay = Math.random() * RAINFALL_CONFIG.delayMax
  
  column.style.animationDuration = `${duration}s`
  column.style.animationDelay = `${animationDelay}s`
  
  column.textContent = generateColumnContent()
  
  // Change characters periodically
  const changeInterval = generateRandomRange(RAINFALL_CONFIG.changeInterval.min, RAINFALL_CONFIG.changeInterval.max)
  
  setInterval(() => {
    if (column.parentNode) {
      column.textContent = generateColumnContent()
    }
  }, changeInterval)
  
  return column
}

const createMatrixRainfall = (container: HTMLElement, isRightSide: boolean = false): void => {
  const screenWidth = window.innerWidth
  const columnCount = Math.floor(screenWidth / RAINFALL_CONFIG.columnSpacing)
  
  for (let i = 0; i < columnCount; i++) {
    const column = createMatrixColumn(i, isRightSide, screenWidth)
    container.appendChild(column)
  }
}

const createMatrixRainfalls = (): void => {
  if (matrixContainer.value) {
    createMatrixRainfall(matrixContainer.value, false) // Left side
  }
  if (matrixContainerRight.value) {
    createMatrixRainfall(matrixContainerRight.value, true) // Right side
  }
}

// Final animation word combinations
const WORD_COMBINATIONS = [
  // 4 single chars
  () => Array.from({ length: 4 }, () => getRandomChar(CHARACTER_SETS.finalSpin)),
  
  // 1 wide + 2 single chars  
  () => [
    getRandomChar(CHARACTER_SETS.finalSpinWide),
    '', 
    getRandomChar(CHARACTER_SETS.finalSpin),
    getRandomChar(CHARACTER_SETS.finalSpin)
  ],
  
  // 2 single + 1 wide chars
  () => [
    getRandomChar(CHARACTER_SETS.finalSpin),
    getRandomChar(CHARACTER_SETS.finalSpin),
    getRandomChar(CHARACTER_SETS.finalSpinWide),
    ''
  ],
  
  // 2 wide chars (each spans 2 positions)
  () => [
    getRandomChar(CHARACTER_SETS.finalSpinWide),
    '',
    getRandomChar(CHARACTER_SETS.finalSpinWide),
    ''
  ]
] as const

const generateRandomWordCombination = (): string[] => {
  const randomCombination = WORD_COMBINATIONS[Math.floor(Math.random() * WORD_COMBINATIONS.length)]
  return randomCombination()
}

// Final animation phases

const animatePhaseHiding = async (wordStart: number, finalSpinSpeed: number): Promise<void> => {
  const hidePositions = [0, 1, 2, 3].sort(() => Math.random() - 0.5)
  
  for (const pos of hidePositions) {
    const currentDisplay = currentTitle.value.split('')
    const randomChar = getRandomChar(CHARACTER_SETS.finalSpin)
    currentDisplay[wordStart + pos] = randomChar
    currentTitle.value = currentDisplay.join('')
    await delay(finalSpinSpeed)
  }
}

const animatePhaseSpinning = async (wordStart: number, finalSpinSpeed: number): Promise<void> => {
  const spinSteps = Math.floor(TIMING_CONFIG.finalSpinDuration / finalSpinSpeed) - 8
  
  for (let i = 0; i < spinSteps; i++) {
    const currentDisplay = currentTitle.value.split('')
    const randomCombination = generateRandomWordCombination()
    
    for (let j = 0; j < 4; j++) {
      if (wordStart + j < currentDisplay.length) {
        currentDisplay[wordStart + j] = randomCombination[j]
      }
    }
    
    currentTitle.value = currentDisplay.join('')
    await delay(finalSpinSpeed)
  }
}

const animatePhaseRevealing = async (wordStart: number, finalSpinSpeed: number): Promise<void> => {
  const finalChar = getRandomChar(CHARACTER_SETS.finalLanding)
  const finalWord = ['s', 'h', finalChar, 't']
  const revealPositions = [0, 1, 2, 3].sort(() => Math.random() - 0.5)
  
  for (const pos of revealPositions) {
    const currentDisplay = currentTitle.value.split('')
    currentDisplay[wordStart + pos] = finalWord[pos]
    currentTitle.value = currentDisplay.join('')
    await delay(finalSpinSpeed)
  }
}

const startFinalSpinAnimation = (): void => {
  const secondWord = 'Building cool sh#t'
  const wordStart = secondWord.indexOf('sh#t')
  
  const executeSpinCycle = async (): Promise<void> => {
    const finalSpinSpeed = TIMING_CONFIG.matrixSpinSpeed * 1.2
    
    await animatePhaseHiding(wordStart, finalSpinSpeed)
    await animatePhaseSpinning(wordStart, finalSpinSpeed)
    await animatePhaseRevealing(wordStart, finalSpinSpeed)
  }
  
  setInterval(executeSpinCycle, TIMING_CONFIG.finalSpinInterval)
}

const startAnimation = async (): Promise<void> => {
  const firstWord = 'Software Engineer'
  const secondWord = 'Building cool sh#t'
  
  await animateWordReveal(firstWord)
  await delay(TIMING_CONFIG.betweenWordsTime)
  await transitionToMatrix(firstWord, secondWord.length)
  await animateWordReveal(secondWord)
  
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

const loadLatestPosts = async () => {
  latestPosts.value = await getLatestPosts(BLOG_CONFIG.UI.LATEST_POSTS_COUNT)
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
  createMatrixRainfalls()
  startAnimation()
  // Add parallax scroll listener
  window.addEventListener('scroll', handleParallax)
  
  // Load latest posts and blog stats
  await loadLatestPosts()
  await fetchBlogStats()
  updateBlogPosts(latestPosts.value)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleParallax)
})

// SEO Meta for Homepage
const baseUrl = 'https://theignatpetrov.com' // Update this to your actual domain
const imageUrl = `${baseUrl}/images/profile_pic.jpeg`

useHead({
  title: 'Ignat Petrov - Software Engineer',
  meta: [
    // Basic SEO
    { name: 'description', content: 'Software Engineer specializing in full-stack development with Vue.js, Python, and modern web technologies. Building cool projects and sharing insights on development and technology.' },
    { name: 'keywords', content: 'software engineer, full-stack developer, Vue.js, Python, Django, FastAPI, web development, freelancer' },
    
    // Open Graph (for Facebook, LinkedIn, etc.)
    { property: 'og:title', content: 'Ignat Petrov - Software Engineer' },
    { property: 'og:description', content: 'Software Engineer specializing in full-stack development with Vue.js, Python, and modern web technologies. Building cool projects and sharing insights on development and technology.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: baseUrl },
    { property: 'og:image', content: imageUrl },
    { property: 'og:site_name', content: 'Ignat Petrov' },
    
    // Twitter Cards
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@theignatpetrov' },
    { name: 'twitter:creator', content: '@theignatpetrov' },
    { name: 'twitter:title', content: 'Ignat Petrov - Software Engineer' },
    { name: 'twitter:description', content: 'Software Engineer specializing in full-stack development with Vue.js, Python, and modern web technologies. Building cool projects and sharing insights on development and technology.' },
    { name: 'twitter:image', content: imageUrl }
  ]
})
</script>

<style scoped>
.matrix-column,
.matrix-column-right {
  position: absolute;
  top: -100vh;
  width: 20px;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 14px;
  white-space: pre;
  text-shadow: 0 0 2px #00ff00;
  --drift-x: 0px;
}

.matrix-column {
  animation: matrix-column-fall linear infinite;
}

.matrix-column-right {
  animation: matrix-column-fall-right linear infinite;
}

@keyframes matrix-column-fall {
  0% { 
    transform: translateY(-100vh) translateX(0);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  50% {
    transform: translateY(0) translateX(calc(var(--drift-x) * 0.5));
  }
  95% {
    opacity: 1;
  }
  100% { 
    transform: translateY(100vh) translateX(var(--drift-x));
    opacity: 0;
  }
}

@keyframes matrix-column-fall-right {
  0% { 
    transform: translateY(-100vh) translateX(0);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  50% {
    transform: translateY(0) translateX(calc(var(--drift-x) * 0.5));
  }
  95% {
    opacity: 1;
  }
  100% { 
    transform: translateY(100vh) translateX(var(--drift-x));
    opacity: 0;
  }
}

.matrix-fade-in {
  opacity: 0;
  animation: matrix-appear 5s ease-out forwards;
}

.matrix-left {
  animation: matrix-appear-left 5s ease-out forwards;
}

.matrix-right {
  animation: matrix-appear-right 5s ease-out forwards;
}

@keyframes matrix-appear-left {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.05;
  }
}

@keyframes matrix-appear-right {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.02;
  }
}

.hero-gradient {
  background: radial-gradient(
    ellipse 60% 40% at 50% 50%,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 30%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.1) 70%,
    transparent 100%
  );
}

.hero-title {
  letter-spacing: 0.8em;
  animation: hero-spacing 4s ease-out forwards;
}

@keyframes hero-spacing {
  from {
    letter-spacing: 0.1em;
  }
  to {
    letter-spacing: 0;
  }
}

.matrix-text {
  text-shadow: 0 0 10px #00ff00, 0 0 2px #00ff00, 0 0 30px #00ff00;
  font-family: 'Courier New', monospace;
  min-height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-feature-settings: "tnum";
  letter-spacing: 0.05em;
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