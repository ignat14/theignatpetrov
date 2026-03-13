<template>
  <div class="min-h-screen bg-surface-0 pt-16">
    <!-- Header -->
    <section class="pt-16 pb-8">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <p class="text-xs font-mono uppercase tracking-[0.2em] text-amber-400/80 mb-3">Projects</p>
        <h1 class="font-display text-3xl md:text-5xl font-bold text-neutral-100 text-balance">Things I've built</h1>
        <p class="mt-4 text-neutral-400 max-w-2xl leading-relaxed">Personal projects where I explore ideas, solve problems, and ship real products.</p>
      </div>
    </section>

    <!-- Projects -->
    <section class="pb-24 md:pb-32">
      <div class="max-w-5xl mx-auto px-6 lg:px-8 space-y-16">
        <article
          v-for="project in projects"
          :key="project.id"
          class="group rounded-xl border border-neutral-700/40 bg-surface-1 overflow-hidden hover:border-amber-400/30 transition-colors"
        >
          <!-- Project Header with gradient accent -->
          <div class="relative h-48 sm:h-56 bg-surface-2 overflow-hidden flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-amber-400/5"></div>
            <div class="relative z-10 text-center px-6">
              <div class="font-display text-4xl sm:text-5xl font-bold text-neutral-100 tracking-tight">
                {{ project.name }}
              </div>
              <p class="mt-2 text-sm text-neutral-400 font-mono">{{ project.tagline }}</p>
            </div>
          </div>

          <!-- Project Content -->
          <div class="p-6 sm:p-8">
            <div class="flex flex-wrap items-center gap-3 mb-6">
              <span
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                :class="statusClasses(project.status)"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="statusDotClass(project.status)"></span>
                {{ project.status }}
              </span>
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-xs font-mono text-neutral-500 hover:text-amber-400 transition-colors"
              >
                {{ formatUrl(project.url) }}
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>

            <p class="text-neutral-400 leading-relaxed mb-6 whitespace-pre-line">{{ project.description }}</p>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2 mb-8">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-2.5 py-1 bg-surface-2 text-neutral-400 text-xs font-mono rounded-md border border-neutral-700/30"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-4">
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-surface-0 text-sm font-semibold rounded-lg hover:bg-amber-300 transition-colors"
              >
                Visit Project
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-700/50 text-neutral-300 text-sm font-medium rounded-lg hover:border-amber-400/40 hover:text-amber-400 transition-colors"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Source Code
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ProjectStatus } from '~/types/portfolio'
import type { Project } from '~/types/portfolio'

const projects: Project[] = [
  {
    id: 1,
    name: 'Switchbox',
    tagline: 'Feature flags served from a CDN',
    description: 'Open source, CDN-first feature flag service.\nToggle flags, set rollout percentages, and add targeting rules from the dashboard. Configs publish as static JSON to the edge.\nThe zero-dependency Python SDK evaluates rules locally in sub-millisecond time with no server in the read path.',
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'AWS S3'],
    status: ProjectStatus.BETA,
    url: 'https://switchbox.dev',
    githubUrl: 'https://github.com/ignat14/switchbox-sdk-python',
    image: null
  }
]

const statusClasses = (status: ProjectStatus): string => {
  switch (status) {
    case ProjectStatus.LIVE:
      return 'bg-emerald-400/10 text-emerald-400'
    case ProjectStatus.BETA:
      return 'bg-amber-400/10 text-amber-400'
    case ProjectStatus.IN_DEVELOPMENT:
      return 'bg-neutral-400/10 text-neutral-400'
    default:
      return 'bg-neutral-400/10 text-neutral-400'
  }
}

const statusDotClass = (status: ProjectStatus): string => {
  switch (status) {
    case ProjectStatus.LIVE:
      return 'bg-emerald-400'
    case ProjectStatus.BETA:
      return 'bg-amber-400'
    case ProjectStatus.IN_DEVELOPMENT:
      return 'bg-neutral-400'
    default:
      return 'bg-neutral-400'
  }
}

const formatUrl = (url: string): string => {
  return url.replace(/^https?:\/\//, '')
}

// SEO Meta
useHead({
  title: 'Projects - Ignat Petrov',
  meta: [
    { name: 'description', content: 'Personal projects by Ignat Petrov - tools and products built to explore ideas and solve real problems.' },
    { property: 'og:title', content: 'Projects - Ignat Petrov' },
    { property: 'og:description', content: 'Personal projects by Ignat Petrov - tools and products built to explore ideas and solve real problems.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://theignatpetrov.com/projects' }
  ]
})
</script>
