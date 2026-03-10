<template>
  <div>
    <!-- Hero Section -->
    <section
      ref="heroSection"
      class="min-h-screen bg-surface-0 text-white flex items-center justify-center relative overflow-hidden pt-16"
    >
      <!-- Canvas particle background -->
      <canvas ref="particleCanvas" class="absolute inset-0 w-full h-full"></canvas>

      <!-- Text separation gradient background -->
      <div class="absolute inset-0 z-5 hero-gradient pointer-events-none"></div>

      <div class="text-center z-10 relative pointer-events-none">
        <h1 class="font-saira text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 text-neutral-100 text-center px-4 hero-title text-balance">
          Ignat Petrov
        </h1>
        <div class="h-12 sm:h-16 flex items-center justify-center px-4">
          <div class="font-mono text-lg sm:text-xl md:text-2xl lg:text-4xl text-amber-400 matrix-text text-center">
            {{ currentTitle }}
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7"></path>
        </svg>
      </div>
    </section>

    <!-- Skills Preview -->
    <section class="py-24 md:py-32 bg-surface-1">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="mb-16">
          <p class="text-xs font-mono uppercase tracking-[0.2em] text-amber-400/80 mb-3">What I Do</p>
          <h2 class="font-display text-3xl md:text-4xl font-bold text-neutral-100 text-balance">Building full-stack applications<br class="hidden sm:block" /> with modern technologies</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="group p-6 rounded-lg border border-neutral-700/40 bg-surface-2 hover:border-amber-400/30 transition-colors">
            <div class="w-10 h-10 rounded-md bg-amber-400/10 flex items-center justify-center mb-5">
              <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h3 class="font-display text-lg font-semibold mb-2 text-neutral-100">Frontend</h3>
            <p class="text-sm text-neutral-400 leading-relaxed">Vue.js, React, TypeScript, Tailwind CSS</p>
          </div>
          <div class="group p-6 rounded-lg border border-neutral-700/40 bg-surface-2 hover:border-amber-400/30 transition-colors">
            <div class="w-10 h-10 rounded-md bg-amber-400/10 flex items-center justify-center mb-5">
              <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
              </svg>
            </div>
            <h3 class="font-display text-lg font-semibold mb-2 text-neutral-100">Backend</h3>
            <p class="text-sm text-neutral-400 leading-relaxed">Python, Django, FastAPI, PostgreSQL</p>
          </div>
          <div class="group p-6 rounded-lg border border-neutral-700/40 bg-surface-2 hover:border-amber-400/30 transition-colors">
            <div class="w-10 h-10 rounded-md bg-amber-400/10 flex items-center justify-center mb-5">
              <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="font-display text-lg font-semibold mb-2 text-neutral-100">DevOps &amp; Tools</h3>
            <p class="text-sm text-neutral-400 leading-relaxed">Docker, AWS, CI/CD, Git</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Blog Posts -->
    <section class="py-24 md:py-32 bg-surface-0">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <div class="flex items-end justify-between mb-12">
          <div>
            <p class="text-xs font-mono uppercase tracking-[0.2em] text-amber-400/80 mb-3">From the Blog</p>
            <h2 class="font-display text-3xl md:text-4xl font-bold text-neutral-100">Latest Posts</h2>
          </div>
          <NuxtLink
            to="/blog"
            class="hidden sm:inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-amber-400 transition-colors"
          >
            View all
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
        </div>
        <div
          class="grid gap-6"
          :class="{
            'md:grid-cols-1 max-w-xl': latestPosts.length === 1,
            'md:grid-cols-2 max-w-3xl': latestPosts.length === 2,
            'md:grid-cols-2 lg:grid-cols-3': latestPosts.length >= 3
          }"
        >
          <article
            v-for="(post, index) in latestPosts"
            :key="post.slug"
            class="group p-6 rounded-lg border border-neutral-700/40 bg-surface-1 hover:border-amber-400/30 transition-all hover:bg-surface-2"
          >
            <div class="flex items-center gap-3 text-xs text-neutral-500 mb-4 font-mono">
              <time>{{ formatDate(post.date) }}</time>
              <span class="text-neutral-700">/</span>
              <div class="flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <span v-if="isLoadingStats" class="inline-block w-6 h-3 bg-neutral-800 rounded animate-pulse"></span>
                <span v-else>{{ post.views }}</span>
              </div>
            </div>
            <h3 class="font-display text-xl font-semibold mb-3 text-neutral-100 group-hover:text-amber-400 transition-colors">
              <NuxtLink :to="`/blog/${post.slug}`">
                {{ post.title }}
              </NuxtLink>
            </h3>
            <p class="text-sm text-neutral-400 mb-4 leading-relaxed line-clamp-2">{{ post.excerpt }}</p>
            <div class="flex items-center justify-between">
              <NuxtLink :to="`/blog/${post.slug}`" class="text-sm text-amber-400/80 hover:text-amber-400 font-medium transition-colors">
                Read more &rarr;
              </NuxtLink>
              <span class="text-xs text-neutral-600 font-mono">{{ post.readTime }} min</span>
            </div>
          </article>
        </div>
        <div class="text-center mt-10 sm:hidden">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
          >
            View all posts
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
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
const particleCanvas = ref<HTMLCanvasElement>()
const heroSection = ref<HTMLElement>()
const { isLoading: isLoadingStats, fetchBlogStats, updateBlogPosts } = useBlogStats()
const { getLatestPosts } = useBlogPosts()

const latestPosts = ref<BlogPost[]>([])
let animationFrameId: number | null = null

// Character sets for title animations
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

// ─── Canvas Particle System ───────────────────────────────────────────

const STREAM_CHARS = '01アイウエオカキクケコサシスセソ{}[]()<>/*\\=+-_;:!@#$%^&|~'
const FLOAT_CHARS = 'function=>const{return}import;export()[]async/await<div>class.prototype:type'

interface StreamDrop {
  x: number
  y: number
  speed: number
  chars: string[]
  length: number
  changeTimer: number
  opacity: number
}

interface FloatingChar {
  x: number
  y: number
  vx: number
  vy: number
  baseVx: number
  baseVy: number
  char: string
  alpha: number
  targetAlpha: number
  size: number
  changeTimer: number
  changeInterval: number
  pulse: number
  pulseSpeed: number
}

const createStreamDrop = (w: number, h: number, startAtTop: boolean = false): StreamDrop => {
  const length = 8 + Math.floor(Math.random() * 25)
  const chars: string[] = []
  for (let i = 0; i < length; i++) {
    chars.push(getRandomChar(STREAM_CHARS))
  }
  return {
    x: Math.random() * w,
    y: startAtTop ? -(Math.random() * h * 0.5) : Math.random() * h,
    speed: 30 + Math.random() * 80,
    chars,
    length,
    changeTimer: 0,
    opacity: 0.15 + Math.random() * 0.35
  }
}

const createFloatingChar = (w: number, h: number): FloatingChar => {
  const bvx = (Math.random() - 0.5) * 0.6
  const bvy = (Math.random() - 0.5) * 0.6
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: bvx,
    vy: bvy,
    baseVx: bvx,
    baseVy: bvy,
    char: getRandomChar(FLOAT_CHARS),
    alpha: 0,
    targetAlpha: 0.15 + Math.random() * 0.35,
    size: 11 + Math.random() * 5,
    changeTimer: 0,
    changeInterval: 1500 + Math.random() * 3000,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.5 + Math.random() * 1.5
  }
}

// Mouse tracking
const mouse = { x: -1000, y: -1000, active: false }
const MOUSE_RADIUS = 150 // influence radius
const MOUSE_FORCE = 80   // repulsion strength

const initParticleSystem = (): void => {
  const canvas = particleCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1

  const resize = (): void => {
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  resize()
  window.addEventListener('resize', resize)

  // Mouse events on the hero section (above all overlays)
  const section = heroSection.value
  const onMouseMove = (e: MouseEvent): void => {
    const rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
    mouse.active = true
  }
  const onMouseLeave = (): void => {
    mouse.active = false
  }
  if (section) {
    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)
  }

  const w = (): number => canvas.width / dpr
  const h = (): number => canvas.height / dpr

  // Create falling code streams (the chaotic rain)
  const streamCount = Math.round(45 * w() / 1920)
  const streams: StreamDrop[] = Array.from(
    { length: Math.max(25, Math.min(streamCount, 70)) },
    () => createStreamDrop(w(), h())
  )

  // Create floating code particles (network nodes)
  const floatCount = Math.round(50 * (w() * h()) / (1920 * 1080))
  const floaters: FloatingChar[] = Array.from(
    { length: Math.max(25, Math.min(floatCount, 60)) },
    () => createFloatingChar(w(), h())
  )

  let lastTime = performance.now()
  const CONNECTION_DIST = 140

  const draw = (now: number): void => {
    const dt = (now - lastTime) / 1000 // seconds
    lastTime = now

    const cw = w()
    const ch = h()

    // Semi-transparent clear for trail effect on streams
    ctx.fillStyle = 'rgba(12, 12, 12, 0.15)'
    ctx.fillRect(0, 0, cw, ch)

    // ── Mouse glow ──
    if (mouse.active) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS)
      gradient.addColorStop(0, 'rgba(245, 158, 11, 0.03)')
      gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.01)')
      gradient.addColorStop(1, 'rgba(245, 158, 11, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(mouse.x - MOUSE_RADIUS, mouse.y - MOUSE_RADIUS, MOUSE_RADIUS * 2, MOUSE_RADIUS * 2)
    }

    // ── Falling code streams ──
    ctx.font = '13px "JetBrains Mono", "Courier New", monospace'
    ctx.textAlign = 'center'

    for (const s of streams) {
      s.y += s.speed * dt

      // Randomly mutate characters
      s.changeTimer += dt
      if (s.changeTimer > 0.15) {
        const idx = Math.floor(Math.random() * s.length)
        s.chars[idx] = getRandomChar(STREAM_CHARS)
        s.changeTimer = 0
      }

      // Mouse repulsion on stream x position (subtle horizontal push)
      let streamOffsetX = 0
      if (mouse.active) {
        const dx = s.x - mouse.x
        const dy = s.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE * 0.3
          streamOffsetX = (dx / dist) * force
        }
      }

      // Draw each character in the stream
      const charHeight = 16
      for (let i = 0; i < s.length; i++) {
        const cy = s.y - i * charHeight
        if (cy < -charHeight || cy > ch + charHeight) continue

        // Per-character mouse proximity boost
        let proximityBoost = 0
        if (mouse.active) {
          const cdx = (s.x + streamOffsetX) - mouse.x
          const cdy = cy - mouse.y
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
          if (cdist < MOUSE_RADIUS) {
            proximityBoost = (1 - cdist / MOUSE_RADIUS) * 0.4
          }
        }

        // Head is brightest, tail fades out
        const headFade = i === 0 ? 1.0 : Math.max(0, 1 - i / s.length)
        const a = Math.min(1, s.opacity * headFade + proximityBoost)

        if (i === 0) {
          ctx.fillStyle = `rgba(255, 220, 130, ${a})`
          ctx.shadowColor = `rgba(245, 158, 11, ${a * 0.8})`
          ctx.shadowBlur = proximityBoost > 0.1 ? 12 : 8
        } else {
          ctx.fillStyle = `rgba(245, 158, 11, ${a * 0.7})`
          ctx.shadowBlur = 0
        }

        ctx.fillText(s.chars[i], s.x + streamOffsetX * (1 - i / s.length), cy)
      }
      ctx.shadowBlur = 0

      // Reset stream when it goes off screen
      if (s.y - s.length * 16 > ch) {
        Object.assign(s, createStreamDrop(cw, ch, true))
        s.y = -(Math.random() * 200)
      }
    }

    // ── Floating characters with connections ──
    ctx.shadowBlur = 0

    // Update floaters
    for (const f of floaters) {
      // Mouse repulsion — add impulse velocity on top of base drift
      if (mouse.active) {
        const dx = f.x - mouse.x
        const dy = f.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE * dt
          f.vx += (dx / dist) * force
          f.vy += (dy / dist) * force
        }
      }

      // Damp back toward base velocity (not toward zero)
      f.vx += (f.baseVx - f.vx) * 0.02
      f.vy += (f.baseVy - f.vy) * 0.02

      // Clamp max speed so they don't fly off forever
      const speed = Math.sqrt(f.vx * f.vx + f.vy * f.vy)
      if (speed > 4) {
        f.vx = (f.vx / speed) * 4
        f.vy = (f.vy / speed) * 4
      }

      f.x += f.vx
      f.y += f.vy
      f.pulse += f.pulseSpeed * dt

      if (f.x < -30) f.x = cw + 30
      if (f.x > cw + 30) f.x = -30
      if (f.y < -30) f.y = ch + 30
      if (f.y > ch + 30) f.y = -30

      // Fade in
      if (f.alpha < f.targetAlpha) {
        f.alpha = Math.min(f.alpha + dt * 0.3, f.targetAlpha)
      }

      // Character change
      f.changeTimer += dt * 1000
      if (f.changeTimer > f.changeInterval) {
        f.char = getRandomChar(FLOAT_CHARS)
        f.changeTimer = 0
      }
    }

    // Draw connections (including mouse-to-particle connections)
    ctx.lineWidth = 1
    for (let i = 0; i < floaters.length; i++) {
      // Connect particles to each other
      for (let j = i + 1; j < floaters.length; j++) {
        const dx = floaters[i].x - floaters[j].x
        const dy = floaters[i].y - floaters[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < CONNECTION_DIST) {
          const lineAlpha = (1 - dist / CONNECTION_DIST) * 0.12 *
            Math.min(floaters[i].alpha, floaters[j].alpha) / 0.3
          ctx.strokeStyle = `rgba(245, 158, 11, ${lineAlpha})`
          ctx.beginPath()
          ctx.moveTo(floaters[i].x, floaters[i].y)
          ctx.lineTo(floaters[j].x, floaters[j].y)
          ctx.stroke()
        }
      }

      // Connect particles to mouse cursor
      if (mouse.active) {
        const dx = floaters[i].x - mouse.x
        const dy = floaters[i].y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS) {
          const lineAlpha = (1 - dist / MOUSE_RADIUS) * 0.2 * floaters[i].alpha / 0.3
          ctx.strokeStyle = `rgba(245, 158, 11, ${lineAlpha})`
          ctx.beginPath()
          ctx.moveTo(floaters[i].x, floaters[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }
    }

    // Draw floating characters
    ctx.textBaseline = 'middle'
    for (const f of floaters) {
      // Brightness boost near cursor
      let boost = 0
      if (mouse.active) {
        const dx = f.x - mouse.x
        const dy = f.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS) {
          boost = (1 - dist / MOUSE_RADIUS) * 0.4
        }
      }

      const pulseAlpha = Math.min(1, f.alpha * (0.7 + 0.3 * Math.sin(f.pulse)) + boost)
      ctx.font = `${f.size}px "JetBrains Mono", "Courier New", monospace`
      ctx.textAlign = 'center'

      if (boost > 0.15) {
        // Near cursor: brighter with stronger glow
        ctx.fillStyle = `rgba(255, 220, 130, ${pulseAlpha})`
        ctx.shadowColor = `rgba(245, 158, 11, ${pulseAlpha * 0.7})`
        ctx.shadowBlur = 10
      } else {
        ctx.fillStyle = `rgba(245, 158, 11, ${pulseAlpha})`
        ctx.shadowColor = `rgba(245, 158, 11, ${pulseAlpha * 0.5})`
        ctx.shadowBlur = 6
      }

      ctx.fillText(f.char, f.x, f.y)
    }

    ctx.shadowBlur = 0

    animationFrameId = requestAnimationFrame(draw)
  }

  animationFrameId = requestAnimationFrame(draw)
}

// Final animation word combinations
const WORD_COMBINATIONS = [
  () => Array.from({ length: 4 }, () => getRandomChar(CHARACTER_SETS.finalSpin)),
  () => [
    getRandomChar(CHARACTER_SETS.finalSpinWide),
    '',
    getRandomChar(CHARACTER_SETS.finalSpin),
    getRandomChar(CHARACTER_SETS.finalSpin)
  ],
  () => [
    getRandomChar(CHARACTER_SETS.finalSpin),
    getRandomChar(CHARACTER_SETS.finalSpin),
    getRandomChar(CHARACTER_SETS.finalSpinWide),
    ''
  ],
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

const loadLatestPosts = async () => {
  latestPosts.value = await getLatestPosts(BLOG_CONFIG.UI.LATEST_POSTS_COUNT)
}

const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(async () => {
  initParticleSystem()
  startAnimation()

  await loadLatestPosts()
  await fetchBlogStats()
  updateBlogPosts(latestPosts.value)
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
})

// SEO Meta for Homepage
const baseUrl = 'https://theignatpetrov.com'
const imageUrl = `${baseUrl}/images/profile_pic.jpeg`

useHead({
  title: 'Ignat Petrov - Software Engineer',
  meta: [
    { name: 'description', content: 'Software Engineer specializing in full-stack development with Vue.js, Python, and modern web technologies. Building cool projects and sharing insights on development and technology.' },
    { name: 'keywords', content: 'software engineer, full-stack developer, Vue.js, Python, Django, FastAPI, web development, freelancer' },
    { property: 'og:title', content: 'Ignat Petrov - Software Engineer' },
    { property: 'og:description', content: 'Software Engineer specializing in full-stack development with Vue.js, Python, and modern web technologies. Building cool projects and sharing insights on development and technology.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: baseUrl },
    { property: 'og:image', content: imageUrl },
    { property: 'og:site_name', content: 'Ignat Petrov' },
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
.hero-gradient {
  background: radial-gradient(
    ellipse 60% 40% at 50% 50%,
    rgba(12, 12, 12, 0.85) 0%,
    rgba(12, 12, 12, 0.65) 30%,
    rgba(12, 12, 12, 0.35) 50%,
    rgba(12, 12, 12, 0.15) 70%,
    transparent 100%
  );
}

.hero-title {
  letter-spacing: 0.8em;
  animation: hero-spacing 4s ease-out forwards;
}

@keyframes hero-spacing {
  from { letter-spacing: 0.1em; }
  to { letter-spacing: 0; }
}

.matrix-text {
  text-shadow: 0 0 10px rgba(245, 158, 11, 0.5), 0 0 2px rgba(245, 158, 11, 0.3), 0 0 30px rgba(245, 158, 11, 0.15);
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  min-height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-feature-settings: "tnum";
  letter-spacing: 0.05em;
}

@media (prefers-reduced-motion: reduce) {
  .hero-title {
    animation: none;
    letter-spacing: 0;
  }
}
</style>
