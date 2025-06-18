<template>
  <nav class="bg-gray-800 shadow-sm border-b border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-xl font-bold text-white">
            Ignat Petrov
          </NuxtLink>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="toggleMobileMenu"
            class="text-gray-300 hover:text-white p-2"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 bg-gray-800 border-t border-gray-700">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="block text-gray-300 hover:text-white px-3 py-2 text-base font-medium transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { NavItem, NavigationState } from '~/types/navigation'

const navItems: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' }
]

const mobileMenuOpen = ref<boolean>(false)

const toggleMobileMenu = (): void => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  mobileMenuOpen.value = false
}

// Close mobile menu when route changes
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script> 