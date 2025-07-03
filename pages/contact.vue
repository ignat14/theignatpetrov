<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p class="text-xl text-blue-100">Let's discuss your next project or collaboration</p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Contact Info -->
          <div>
            <h2 class="text-3xl font-bold text-white mb-8">Let's Connect</h2>
            <p class="text-gray-300 text-lg mb-8 leading-relaxed">
              I'm always interested in new opportunities, collaborations, and interesting projects. 
              Whether you're looking for a freelancer, need technical consultation, or just want to 
              say hello, feel free to reach out!
            </p>

            <!-- Contact Methods -->
            <div class="space-y-6 mb-12">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold">Email</h3>
                  <a href="mailto:ignat14@gmail.com" class="text-blue-400 hover:text-blue-300 transition-colors">
                    ignat14@gmail.com
                  </a>
                </div>
              </div>

              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold">LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/ignat-petrov-98285872/" target="_blank" class="text-blue-400 hover:text-blue-300 transition-colors">
                    linkedin.com/in/ignatpetrov
                  </a>
                </div>
              </div>

              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold">GitHub</h3>
                  <a href="https://github.com/ignat14" target="_blank" class="text-blue-400 hover:text-blue-300 transition-colors">
                    github.com/ignat14
                  </a>
                </div>
              </div>

              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold">X</h3>
                  <a href="https://twitter.com/theignatpetrov" target="_blank" class="text-blue-400 hover:text-blue-300 transition-colors">
                    @theignatpetrov
                  </a>
                </div>
              </div>
            </div>

            <!-- Availability Status -->
            <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 class="text-white font-semibold">Currently Available</h3>
              </div>
              <p class="text-gray-300 mb-4">
                I'm currently accepting new freelance projects and consulting opportunities.
              </p>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-400">Response Time:</span>
                  <span class="text-white">Within 24 hours</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">Availability:</span>
                  <span class="text-white">Full-time & Part-time</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">Time Zone:</span>
                  <span class="text-white">UTC+2 (EET)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div>
            <div class="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h2 class="text-2xl font-bold text-white mb-6">Send a Message</h2>
              
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      v-model="form.firstName"
                      type="text"
                      id="firstName"
                      required
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John"
                    >
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      v-model="form.lastName"
                      type="text"
                      id="lastName"
                      required
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Doe"
                    >
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    id="email"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  >
                </div>

                <div>
                  <label for="company" class="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    v-model="form.company"
                    type="text"
                    id="company"
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Company"
                  >
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    v-model="form.subject"
                    type="text"
                    id="subject"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What would you like to discuss?"
                  >
                </div>


                <div>
                  <label for="message" class="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    v-model="form.message"
                    id="message"
                    rows="6"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell me about your project or what you'd like to discuss..."
                  ></textarea>
                </div>


                <button
                  type="submit"
                  :disabled="isSubmitting"
                  :class="[
                    'w-full py-3 px-6 rounded-lg font-semibold transition-colors',
                    isSubmitting
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  ]"
                >
                  <span v-if="isSubmitting" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                  <span v-else>Send Message</span>
                </button>
              </form>

              <!-- Success Message -->
              <div v-if="submitSuccess" class="mt-6 p-4 bg-green-600 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p class="text-white font-medium">Message sent successfully! I'll get back to you soon.</p>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="submitError" class="mt-6 p-4 bg-red-600 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <p class="text-white font-medium">{{ submitError }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ContactForm } from '~/types/contact'

const form = ref<ContactForm>({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  subject: '',
  message: ''
})

const { isSubmitting, submitSuccess, submitError, submitContactForm, resetForm } = useContactForm()

const handleSubmit = async () => {
  try {
    await submitContactForm(form.value)
    
    // Reset form on success
    if (submitSuccess.value) {
      form.value = {
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      }
    }
  } catch (error) {
    // Error handling is done in the composable
    console.error('Form submission failed:', error)
  }
}

// Reset messages when component unmounts
onUnmounted(() => {
  resetForm()
})

// SEO Meta
useHead({
  title: 'Contact - Ignat Petrov',
  meta: [
    { name: 'description', content: 'Get in touch with Ignat Petrov for freelance projects, consulting, or collaboration opportunities.' }
  ]
})
</script>