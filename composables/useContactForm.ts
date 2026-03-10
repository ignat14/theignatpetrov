import type { ContactForm } from '~/types/contact'

export const useContactForm = () => {
  const isSubmitting = ref(false)
  const submitSuccess = ref(false)
  const submitError = ref('')

  const submitContactForm = async (formData: ContactForm): Promise<void> => {
    isSubmitting.value = true
    submitError.value = ''
    submitSuccess.value = false

    try {
      await $fetch('/api/contact/discord-notify', {
        method: 'POST',
        body: formData
      })

      submitSuccess.value = true
    } catch (error: unknown) {
      console.error('Contact form submission error:', error)

      const message = error instanceof Error ? error.message : ''
      if (message.includes('network')) {
        submitError.value = 'Network error. Please check your connection and try again.'
      } else {
        submitError.value = 'Failed to submit form. Please try again.'
      }
    } finally {
      isSubmitting.value = false
    }
  }

  const resetForm = (): void => {
    submitSuccess.value = false
    submitError.value = ''
  }

  return {
    isSubmitting: readonly(isSubmitting),
    submitSuccess: readonly(submitSuccess),
    submitError: readonly(submitError),
    submitContactForm,
    resetForm
  }
}
