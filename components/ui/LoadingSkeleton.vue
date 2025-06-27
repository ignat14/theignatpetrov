<template>
  <div 
    :class="[
      'bg-gray-600 rounded animate-pulse',
      widthClass,
      heightClass
    ]"
    :style="customStyle"
    role="status"
    :aria-label="ariaLabel"
  />
</template>

<script setup lang="ts">
interface Props {
  width?: string | number
  height?: string | number
  variant?: 'text' | 'avatar' | 'button' | 'card' | 'custom'
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  ariaLabel: 'Loading content'
})

const widthClass = computed(() => {
  if (props.width) return ''
  
  switch (props.variant) {
    case 'text':
      return 'w-24'
    case 'avatar':
      return 'w-10'
    case 'button':
      return 'w-20'
    case 'card':
      return 'w-full'
    default:
      return 'w-full'
  }
})

const heightClass = computed(() => {
  if (props.height) return ''
  
  switch (props.variant) {
    case 'text':
      return 'h-4'
    case 'avatar':
      return 'h-10'
    case 'button':
      return 'h-8'
    case 'card':
      return 'h-32'
    default:
      return 'h-4'
  }
})

const customStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  return style
})
</script>