<template>
  <div class="min-h-screen bg-gray-900">
    <Navigation />
    
    <main>
      <slot />
    </main>
    
    <footer class="bg-gray-800 border-t border-gray-700">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-gray-400">&copy; 2024 Ignat Petrov. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed as navigation is now handled by the Navigation component
</script>