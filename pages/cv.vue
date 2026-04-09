<template>
  <div class="cv-page bg-white text-gray-900 min-h-screen">
    <!-- Print button (hidden in print) -->
    <div class="no-print fixed top-4 right-4 z-50 flex gap-2">
      <button
        @click="printCV"
        class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium shadow-lg"
      >
        Download PDF
      </button>
      <NuxtLink
        to="/about"
        class="px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-lg"
      >
        Back to site
      </NuxtLink>
    </div>

    <!-- CV Content -->
    <div class="cv-container max-w-[800px] mx-auto px-10 py-10">
      <!-- Header -->
      <header class="mb-6 pb-4 border-b-2 border-gray-900">
        <h1 class="text-3xl font-bold tracking-tight">Ignat Petrov</h1>
        <p class="text-lg text-gray-600 mt-1">Senior Software Engineer</p>
        <div class="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-sm text-gray-500">
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            ignat.petrov14@gmail.com
          </span>
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            ignat14
          </span>
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            ignat-petrov
          </span>
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" /></svg>
            theignatpetrov.com
          </span>
        </div>
      </header>

      <!-- Summary -->
      <section class="mb-5">
        <h2 class="cv-section-title">Summary</h2>
        <p class="text-sm leading-relaxed text-gray-700">
          Software engineer with 8+ years of experience building scalable web applications
          and backend systems. Experienced across the full stack with deep expertise in Python, Django,
          FastAPI, Vue.js, React, and cloud infrastructure. Strong track record of owning complex features
          end-to-end, from architecture design through delivery.
        </p>
      </section>

      <!-- Experience -->
      <section class="mb-5">
        <h2 class="cv-section-title">Experience</h2>
        <div class="space-y-4">
          <div v-for="exp in experiences" :key="exp.title" class="cv-entry">
            <div class="flex justify-between items-baseline mb-0.5">
              <h3 class="text-sm font-bold text-gray-900">{{ exp.title }}</h3>
              <span class="text-xs text-gray-500 whitespace-nowrap ml-4">{{ exp.period }}</span>
            </div>

            <p v-if="exp.description" class="text-sm text-gray-700 leading-relaxed">
              {{ exp.description }}
            </p>

            <ul v-if="exp.projects" class="mt-1 space-y-1">
              <li v-for="project in exp.projects" :key="project.name" class="text-sm text-gray-700 leading-relaxed">
                <span class="font-semibold">{{ project.name }}:</span> {{ project.description }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Education -->
      <section>
        <h2 class="cv-section-title">Education</h2>
        <div class="flex justify-between items-baseline">
          <h3 class="text-sm font-bold text-gray-900">BSc Computer Science — Goce Delcev University</h3>
          <span class="text-xs text-gray-500 whitespace-nowrap ml-4">2014 - 2018</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank'
})

const { experiences } = useAboutData()

function printCV(): void {
  window.print()
}
</script>

<style scoped>
.cv-section-title {
  @apply text-xs font-bold uppercase tracking-widest text-gray-900 mb-2 pb-1 border-b border-gray-200;
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }

  .cv-page {
    background: white !important;
    min-height: auto !important;
  }

  .cv-container {
    max-width: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .cv-entry {
    break-inside: avoid;
  }

  @page {
    size: A4;
    margin: 15mm 18mm;
  }
}
</style>
