<template>
  <div class="min-h-screen bg-gray-900">
    <Navigation />
    
    <main>
      <slot />
    </main>
    
    <footer class="bg-gray-800 border-t border-gray-700" data-cy="footer">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white">
              LinkedIn
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white">
              Twitter
            </a>
          </div>
          <p class="text-gray-400">&copy; 2024 Ignat Petrov. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed as navigation is now handled by the Navigation component
</script>