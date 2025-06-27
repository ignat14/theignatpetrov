<template>
  <div 
    class="p-4 bg-green-900 border border-green-700 rounded-lg flex items-center space-x-2"
    role="status"
  >
    <svg 
      class="w-5 h-5 text-green-300 flex-shrink-0" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M5 13l4 4L19 7"
      />
    </svg>
    
    <div class="flex-1">
      <h3 v-if="title" class="font-medium text-green-300 mb-1">{{ title }}</h3>
      <p class="text-green-300">{{ message }}</p>
    </div>
    
    <button
      v-if="dismissible"
      @click="$emit('dismiss')"
      class="flex-shrink-0 ml-2 text-green-300 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded"
      aria-label="Dismiss success message"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string
  title?: string
  dismissible?: boolean
}

defineEmits<{
  dismiss: []
}>()

defineProps<Props>()
</script>