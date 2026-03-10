<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-surface-0/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.04)]' : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <NuxtLink to="/" class="font-display text-lg font-700 tracking-tight text-neutral-100 hover:text-amber-400 transition-colors">
          ignat petrov
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="relative px-4 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-100 transition-colors"
            :class="{ 'text-amber-400 hover:text-amber-300': isActive(item.path) }"
          >
            {{ item.label }}
            <span
              v-if="isActive(item.path)"
              class="absolute bottom-0 left-4 right-4 h-px bg-amber-400"
            ></span>
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <button
          data-cy="mobile-menu-button"
          @click="toggleMobileMenu"
          class="md:hidden text-neutral-400 hover:text-neutral-100 p-2 transition-colors"
          :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
          aria-expanded="false"
        >
          <svg v-if="!mobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="mobileMenuOpen"
        data-cy="mobile-menu"
        class="md:hidden border-t border-neutral-700/30 bg-surface-0/95 backdrop-blur-xl -mx-6 px-6"
      >
        <div class="py-4 space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="block px-3 py-3 text-base font-medium transition-colors"
            :class="isActive(item.path) ? 'text-amber-400' : 'text-neutral-400 hover:text-neutral-100'"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import type { NavItem, NavigationState } from '~/types/navigation'

const navItems: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  // { path: '/portfolio', label: 'Portfolio' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' }
]

const mobileMenuOpen = ref<boolean>(false)
const scrolled = ref<boolean>(false)

const route = useRoute()

const isActive = (path: string): boolean => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const toggleMobileMenu = (): void => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  mobileMenuOpen.value = false
}

const handleScroll = (): void => {
  scrolled.value = window.scrollY > 20
}

// Close mobile menu when route changes
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    window.__openMobileMenu = () => { mobileMenuOpen.value = true }
    // @ts-ignore
    window.__closeMobileMenu = () => { mobileMenuOpen.value = false }
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
