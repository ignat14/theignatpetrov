<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">About Me</h1>
          <p class="text-xl text-blue-100">Get to know the person behind the code</p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          <div class="order-2 md:order-1">
            <div class="w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-8"></div>
          </div>
          <div class="order-1 md:order-2 text-center md:text-left">
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-6">Hi, I'm Ignat</h2>
            <p class="text-gray-300 text-lg mb-6">
              I'm a passionate software engineer with over 5 years of experience building 
              scalable web applications and leading development teams. My journey in tech 
              started with curiosity about how things work, and has evolved into a career 
              focused on creating meaningful solutions.
            </p>
            <p class="text-gray-300 text-lg mb-6">
              As a solopreneur and freelancer at Toptal, I've had the privilege of working 
              with startups and established companies across various industries. I also 
              share my knowledge as a Python lecturer, helping the next generation of 
              developers master the craft.
            </p>
            <p class="text-gray-300 text-lg">
              When I'm not coding, you'll find me exploring new technologies, contributing 
              to open source projects, or sharing insights through technical writing.
            </p>
          </div>
        </div>

        <!-- Skills Section -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-white mb-12 text-center">Technical Skills</h2>
          <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div 
              v-for="skill in skills" 
              :key="skill.category"
              class="bg-gray-800 p-6 rounded-lg border border-gray-700"
            >
              <div class="flex items-center mb-4">
                <div :class="skill.color" class="w-3 h-3 rounded-full mr-3"></div>
                <h3 class="text-xl font-semibold text-white">{{ skill.category }}</h3>
              </div>
              <ul class="text-gray-300 space-y-2">
                <li v-for="item in skill.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Experience Timeline -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-white mb-12 text-center">Experience</h2>
          <div class="space-y-8">
            <div 
              v-for="exp in experiences" 
              :key="exp.title"
              class="flex"
            >
              <div class="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-1.5 mr-6"></div>
              <div>
                <h3 class="text-xl font-semibold text-white mb-2">{{ exp.title }}</h3>
                <p :class="exp.color" class="mb-3">{{ exp.period }}</p>
                <p class="text-gray-300">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Values -->
        <div>
          <h2 class="text-3xl font-bold text-white mb-12 text-center">What Drives Me</h2>
          <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div 
              v-for="value in values" 
              :key="value.title"
              class="text-center"
            >
              <div :class="`bg-gradient-to-br ${value.gradient}`" class="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="value.icon"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white mb-3">{{ value.title }}</h3>
              <p class="text-gray-300">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Skill, Experience, Value } from '~/types/about'

const skills: Skill[] = [
  {
    category: 'Frontend',
    color: 'bg-blue-500',
    items: [
      'Vue.js / Nuxt.js',
      'React / Next.js',
      'TypeScript / JavaScript',
      'Tailwind CSS',
      'HTML5 / CSS3'
    ]
  },
  {
    category: 'Backend',
    color: 'bg-green-500',
    items: [
      'Python / Django',
      'FastAPI',
      'Node.js / Express',
      'PostgreSQL / MongoDB',
      'Redis'
    ]
  },
  {
    category: 'DevOps & Tools',
    color: 'bg-purple-500',
    items: [
      'Docker / Kubernetes',
      'AWS / GCP',
      'CI/CD Pipelines',
      'Git / GitHub',
      'Linux / Bash'
    ]
  }
]

const experiences: Experience[] = [
  {
    title: 'Freelancer at Toptal',
    period: '2021 - Present',
    color: 'text-blue-400',
    description: 'Working with top-tier clients on challenging projects, delivering high-quality solutions for web applications and API development.'
  },
  {
    title: 'Python Lecturer',
    period: '2020 - Present',
    color: 'text-green-400',
    description: 'Teaching Python programming and web development to students and professionals, creating course materials and mentoring developers.'
  },
  {
    title: 'Solopreneur',
    period: '2019 - Present',
    color: 'text-purple-400',
    description: 'Building and launching digital products, managing end-to-end development processes, and growing sustainable software businesses.'
  }
]

const values: Value[] = [
  {
    title: 'Innovation',
    description: 'Always exploring new technologies and approaches to solve complex problems.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    title: 'Learning',
    description: 'Committed to continuous learning and sharing knowledge with the community.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    gradient: 'from-green-500 to-blue-500'
  },
  {
    title: 'Quality',
    description: 'Passionate about writing clean, maintainable code and delivering exceptional user experiences.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    gradient: 'from-purple-500 to-pink-500'
  }
]
</script>