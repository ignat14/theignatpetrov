import type { ContactForm } from '~/types/contact'
import type { Database } from '~/types/database'

type ContactMessage = Database['public']['Tables']['contact_messages']['Insert']

export const useContactForm = () => {
  const { $supabase } = useNuxtApp()
  const isSubmitting = ref(false)
  const submitSuccess = ref(false)
  const submitError = ref('')

  const submitContactForm = async (formData: ContactForm): Promise<void> => {
    isSubmitting.value = true
    submitError.value = ''
    submitSuccess.value = false

    try {
      // Prepare data for database insertion
      const contactMessage: ContactMessage = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        company: formData.company?.trim() || null,
        subject: formData.subject.trim(),
        message: formData.message.trim()
      }

      // Insert into Supabase
      const { data, error } = await $supabase
        .from('contact_messages')
        .insert(contactMessage)
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message || 'Failed to submit contact form')
      }

      if (!data || data.length === 0) {
        throw new Error('No data returned from database')
      }

      // Send Discord notification
      try {
        await $fetch('/api/contact/discord-notify', {
          method: 'POST',
          body: formData
        })
        console.log('Discord notification sent successfully')
      } catch (discordError) {
        console.error('Discord notification failed:', discordError)
        // Don't fail the whole submission if Discord notification fails
      }

      submitSuccess.value = true
      console.log('Contact form submitted successfully:', data[0])

    } catch (error: any) {
      console.error('Contact form submission error:', error)
      
      // Provide user-friendly error messages
      if (error.message?.includes('duplicate key value')) {
        submitError.value = 'A message with this email was recently submitted. Please wait before sending another.'
      } else if (error.message?.includes('network')) {
        submitError.value = 'Network error. Please check your connection and try again.'
      } else {
        submitError.value = error.message || 'Failed to submit form. Please try again.'
      }
    } finally {
      isSubmitting.value = false
    }
  }

  const resetForm = () => {
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