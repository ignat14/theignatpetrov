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
    <div class="cv-container max-w-[850px] mx-auto px-10 py-10">
      <!-- Header -->
      <header class="mb-6">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">Ignat Petrov</h1>
            <p class="text-base text-accent font-medium mt-0.5">Senior Software Engineer</p>
          </div>
          <div class="text-right text-sm text-gray-500 space-y-1">
            <div class="flex items-center justify-end gap-1.5">
              <span>ignat.petrov14@gmail.com</span>
              <svg class="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            </div>
            <div class="flex items-center justify-end gap-1.5">
              <span>github.com/ignat14</span>
              <svg class="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </div>
            <div class="flex items-center justify-end gap-1.5">
              <span>linkedin.com/in/ignat-petrov-98285872</span>
              <svg class="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </div>
            <div class="flex items-center justify-end gap-1.5">
              <span>theignatpetrov.com</span>
              <svg class="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" /></svg>
            </div>
          </div>
        </div>
        <div class="mt-4 h-0.5 bg-gradient-to-r from-accent to-accent/30"></div>
      </header>

      <!-- Summary -->
      <section class="mb-5">
        <p class="text-[13px] leading-relaxed text-gray-600">
          Passionate software engineer with extensive experience building scalable web applications.
          My journey in tech started working at a VFX studio, and has evolved into a career focused on
          designing and building meaningful software products. Currently transitioning into solopreneurship,
          always looking for new challenges — using my skills and experience to build useful, thoughtful,
          and genuinely cool things.
        </p>
      </section>

      <!-- Sidebar — floated right so experience wraps to full width once it ends -->
      <aside class="cv-sidebar float-right w-[220px] ml-8 pb-20 space-y-5">
        <!-- Education -->
        <div>
          <h2 class="cv-section-title">Education</h2>
          <h3 class="text-[12px] font-bold text-gray-900">Faculty of Computer Science and Engineering</h3>
          <p class="text-[11px] text-gray-500">University 'Ss. Cyril and Methodious', Skopje, Macedonia</p>
          <p class="text-[11px] text-gray-400 font-mono">2007 - 2014</p>
        </div>

        <!-- Internships -->
        <div>
          <h2 class="cv-section-title">Internships</h2>
          <div class="space-y-2">
            <div>
              <h3 class="text-[12px] font-bold text-gray-900">Atiode Solar Systems</h3>
              <p class="text-[11px] text-gray-500">Benin City, Nigeria</p>
              <p class="text-[11px] text-gray-400 font-mono">Jul 2011 - Sep 2011</p>
            </div>
            <div>
              <h3 class="text-[12px] font-bold text-gray-900">King Mongkut Institute of Technology</h3>
              <p class="text-[11px] text-gray-500">Bangkok, Thailand</p>
              <p class="text-[11px] text-gray-400 font-mono">Jul 2010 - Sep 2010</p>
            </div>
          </div>
        </div>

        <!-- Volunteer -->
        <div>
          <h2 class="cv-section-title">Volunteer</h2>
          <h3 class="text-[12px] font-bold text-gray-900">IAESTE Macedonia</h3>
          <p class="text-[11px] text-gray-500">International Association for the Exchange of Students for Technical Experience</p>
          <p class="text-[11px] text-gray-400 font-mono">2009 - 2012</p>
        </div>

        <!-- Certificates -->
        <div>
          <h2 class="cv-section-title">Certificates</h2>
          <h3 class="text-[12px] font-bold text-gray-900">Business Innovation & Entrepreneurship</h3>
          <p class="text-[11px] text-gray-500">Southwestern University of Finance and Economics, Chengdu, China</p>
          <p class="text-[11px] text-gray-400 font-mono">Jul 2017</p>
        </div>

        <!-- Languages -->
        <div>
          <h2 class="cv-section-title">Languages</h2>
          <div class="space-y-1.5">
            <div>
              <span class="text-[12px] font-semibold text-gray-800">Macedonian</span>
              <span class="text-[11px] text-gray-400 ml-1">Native</span>
            </div>
            <div>
              <span class="text-[12px] font-semibold text-gray-800">English</span>
              <span class="text-[11px] text-gray-400 ml-1">Full Professional</span>
            </div>
            <div>
              <span class="text-[12px] font-semibold text-gray-800">German</span>
              <span class="text-[11px] text-gray-400 ml-1">Elementary</span>
            </div>
            <div>
              <span class="text-[12px] font-semibold text-gray-800">Greek</span>
              <span class="text-[11px] text-gray-400 ml-1">Elementary</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Experience — wraps around sidebar, goes full-width once sidebar ends -->
      <section>
        <h2 class="cv-section-title">Experience</h2>
        <div class="relative ml-3">
          <!-- Timeline line -->
          <div class="absolute left-0 top-2 bottom-2 w-px bg-gray-200"></div>

          <div v-for="(exp, index) in experiences" :key="exp.title" class="cv-entry relative pl-5 pb-4 last:pb-0">
            <!-- Timeline dot -->
            <div
              class="absolute left-[-3.5px] top-1.5 w-[8px] h-[8px] rounded-full border-2"
              :class="index === 0 ? 'border-accent bg-accent' : 'border-gray-300 bg-white'"
            ></div>

            <div class="flex justify-between items-baseline mb-0.5">
              <h3 class="text-[13px] font-bold text-gray-900">{{ exp.title }}</h3>
              <span class="text-[11px] text-gray-400 whitespace-nowrap ml-3 font-mono">{{ exp.period }}</span>
            </div>

            <p v-if="exp.description" class="text-[12px] text-gray-600 leading-relaxed">
              {{ exp.description }}
            </p>

            <ul v-if="exp.projects" class="mt-1 space-y-1">
              <li v-for="project in exp.projects" :key="project.name" class="text-[12px] text-gray-600 leading-relaxed">
                <span class="font-semibold text-gray-700">{{ project.name }}:</span> {{ project.description }}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Ignat Petrov — CV'
})

definePageMeta({
  layout: 'blank'
})

const { experiences } = useAboutData()

function printCV(): void {
  window.print()
}
</script>

<style scoped>
.text-accent {
  color: #d97706;
}

.bg-accent {
  background-color: #d97706;
}

.border-accent {
  border-color: #d97706;
}

.from-accent {
  --tw-gradient-from: #d97706;
}

.to-accent\/30 {
  --tw-gradient-to: rgb(217 119 6 / 0.3);
}

.cv-section-title {
  @apply text-[11px] font-bold uppercase tracking-widest mb-2 pb-1 border-b border-gray-200;
  color: #d97706;
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

  .cv-entry h3 {
    break-after: avoid;
  }

  .cv-entry li {
    break-inside: avoid;
  }

  @page {
    size: A4;
    margin: 12mm 15mm;
  }
}
</style>
