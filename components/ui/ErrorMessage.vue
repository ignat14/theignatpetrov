<template>
  <div 
    :class="[
      'p-4 rounded-lg border',
      variantClasses,
      { 'flex items-center space-x-2': showIcon }
    ]"
    role="alert"
  >
    <svg 
      v-if="showIcon"
      class="w-5 h-5 flex-shrink-0" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        :d="iconPath"
      />
    </svg>
    
    <div class="flex-1">
      <h3 v-if="title" class="font-medium mb-1">{{ title }}</h3>
      <p>{{ message }}</p>
      
      <button 
        v-if="showRetry"
        @click="$emit('retry')"
        class="mt-2 text-sm underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded"
      >
        Try again
      </button>
    </div>
    
    <button
      v-if="dismissible"
      @click="$emit('dismiss')"
      class="flex-shrink-0 ml-2 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded"
      aria-label="Dismiss error"
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
  variant?: 'error' | 'warning' | 'info'
  showIcon?: boolean
  showRetry?: boolean
  dismissible?: boolean
}

defineEmits<{
  retry: []
  dismiss: []
}>()

const props = withDefaults(defineProps<Props>(), {
  variant: 'error',
  showIcon: true,
  showRetry: false,
  dismissible: false
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'error':
      return 'bg-red-900 border-red-700 text-red-300'
    case 'warning':
      return 'bg-yellow-900 border-yellow-700 text-yellow-300'
    case 'info':
      return 'bg-blue-900 border-blue-700 text-blue-300'
    default:
      return 'bg-red-900 border-red-700 text-red-300'
  }
})

const iconPath = computed(() => {
  switch (props.variant) {
    case 'error':
      return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    case 'warning':
      return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z'
    case 'info':
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    default:
      return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
})
</script>