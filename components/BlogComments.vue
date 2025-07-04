<template>
  <section>
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-white mb-2">Comments</h2>
      <p class="text-gray-400">
        Share your thoughts and join the discussion
      </p>
    </div>

    <!-- Comment Form -->
    <div class="bg-gray-900 rounded-lg p-6 border border-gray-700 mb-8">
      <h3 class="text-lg font-semibold text-white mb-4">Leave a Comment</h3>
      
      <!-- Success Message -->
      <div
        v-if="submitSuccess"
        class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center justify-between"
      >
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <span>Comment submitted successfully! Thank you for your feedback.</span>
        </div>
        <button @click="resetForm" class="text-green-700 hover:text-green-900">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <!-- Error Message -->
      <div
        v-if="submitError"
        class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <span>{{ submitError }}</span>
          </div>
          <div class="flex space-x-2">
            <button @click="handleSubmit" class="text-red-700 hover:text-red-900 underline">
              Retry
            </button>
            <button @click="resetForm" class="text-red-700 hover:text-red-900">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-300 mb-2">
            Your Name
          </label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
            :disabled="isSubmitting"
          />
        </div>

        <div>
          <label for="comment" class="block text-sm font-medium text-gray-300 mb-2">
            Comment
          </label>
          <textarea
            id="comment"
            v-model="form.comment"
            required
            rows="4"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="Share your thoughts..."
            :disabled="isSubmitting"
          ></textarea>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting || !form.username.trim() || !form.comment.trim()"
          class="px-6 py-2 bg-cyan-800 text-white rounded-lg hover:bg-cyan-900 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <span v-if="isSubmitting">Posting...</span>
          <span v-else>Post Comment</span>
        </button>
      </form>
    </div>

    <!-- Comments List -->
    <div class="space-y-6">
      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div class="flex items-start space-x-4">
            <!-- Avatar skeleton -->
            <div class="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
            <div class="flex-1 space-y-2">
              <div class="flex items-center space-x-2">
                <!-- Name skeleton -->
                <div class="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
                <!-- Date skeleton -->
                <div class="w-20 h-3 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <!-- Comment skeleton -->
              <div class="w-full h-16 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Comments -->
      <div v-else-if="comments.length === 0" class="text-center py-8">
        <svg class="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.657-.402l-5.464 1.876c-.368.127-.776-.094-.776-.507V18.12c-1.747-1.739-2.768-4.054-2.768-6.528 0-5.523 4.477-10 10-10s10 4.477 10 10z"></path>
        </svg>
        <p class="text-gray-400">No comments yet. Be the first to share your thoughts!</p>
      </div>

      <!-- Comments -->
      <article 
        v-for="comment in comments" 
        :key="comment.id"
        class="bg-gray-900 rounded-lg p-6 border border-gray-700"
      >
        <div class="flex items-start space-x-4">
          <!-- Avatar -->
          <div class="w-10 h-10 bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 rounded-full flex-shrink-0 flex items-center justify-center">
            <span class="text-white font-semibold text-sm">
              {{ comment.username.charAt(0).toUpperCase() }}
            </span>
          </div>

          <!-- Comment Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2 mb-2">
              <h4 class="text-white font-semibold">{{ comment.username }}</h4>
              <span class="text-gray-400 text-sm">{{ formatDate(comment.created_at) }}</span>
            </div>
            <p class="text-gray-300 leading-relaxed whitespace-pre-wrap">{{ comment.comment }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CommentForm } from '~/types/comment'

interface Props {
  postSlug: string
}

const props = defineProps<Props>()

const {
  comments,
  isLoading,
  isSubmitting,
  submitError,
  submitSuccess,
  fetchComments,
  submitComment,
  resetForm,
  formatDate
} = useComments(props.postSlug)

const form = ref<CommentForm>({
  username: '',
  comment: ''
})

const handleSubmit = async () => {
  await submitComment(form.value)
  if (submitSuccess.value) {
    form.value = {
      username: '',
      comment: ''
    }
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      resetForm()
    }, 5000)
  }
}

// Fetch comments when component mounts
onMounted(() => {
  fetchComments()
})
</script>