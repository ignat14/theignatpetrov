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
      <SuccessMessage
        v-if="submitSuccess"
        message="Comment submitted successfully! Thank you for your feedback."
        class="mb-4"
        :dismissible="true"
        @dismiss="resetForm"
      />

      <!-- Error Message -->
      <ErrorMessage
        v-if="submitError"
        :message="submitError"
        class="mb-4"
        :show-retry="true"
        :dismissible="true"
        @retry="handleSubmit"
        @dismiss="resetForm"
      />

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
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <LoadingSkeleton variant="avatar" />
            <div class="flex-1 space-y-2">
              <div class="flex items-center space-x-2">
                <LoadingSkeleton width="100px" height="16px" />
                <LoadingSkeleton width="80px" height="14px" />
              </div>
              <LoadingSkeleton width="100%" height="60px" />
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
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex-shrink-0 flex items-center justify-center">
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