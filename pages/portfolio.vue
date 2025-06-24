<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">Portfolio</h1>
          <p class="text-xl text-blue-100">A showcase of my recent projects and work</p>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filter Tabs -->
        <div class="flex justify-center mb-12 px-4">
          <div class="flex flex-wrap justify-center gap-1 bg-gray-800 p-1 rounded-lg max-w-full">
            <button 
              v-for="category in categories" 
              :key="category"
              @click="activeCategory = category"
              :class="[
                'px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap',
                activeCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-blue-500"
          >
            <!-- Project Image -->
            <div class="h-48 relative overflow-hidden">
              <div :class="project.gradient" class="w-full h-full flex items-center justify-center">
                <div class="text-white text-2xl font-bold opacity-75">{{ project.name }}</div>
              </div>
              <div class="absolute top-4 right-4">
                <span :class="project.statusColor" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ project.status }}
                </span>
              </div>
            </div>

            <!-- Project Content -->
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2">{{ project.name }}</h3>
              <p class="text-gray-300 mb-4 text-sm">{{ project.description }}</p>
              
              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Project Links -->
              <div class="flex space-x-3">
                <a 
                  v-if="project.liveUrl"
                  :href="project.liveUrl" 
                  target="_blank"
                  class="flex items-center text-blue-400 hover:text-blue-300 text-sm"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  Live Demo
                </a>
                <a 
                  v-if="project.githubUrl"
                  :href="project.githubUrl" 
                  target="_blank"
                  class="flex items-center text-gray-400 hover:text-gray-300 text-sm"
                >
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- No projects message -->
        <div v-if="filteredProjects.length === 0" class="text-center py-12">
          <p class="text-gray-400">No projects found in this category.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ProjectCategory, ProjectStatus } from '~/types/portfolio'
import type { Project } from '~/types/portfolio'

const activeCategory = ref<ProjectCategory | 'All'>('All')

const categories: (ProjectCategory | 'All')[] = ['All', ProjectCategory.WEB_APP, ProjectCategory.API, ProjectCategory.OPEN_SOURCE, ProjectCategory.MOBILE]

const projects: Project[] = [
  // {
  //   id: 1,
  //   name: 'E-Commerce Platform',
  //   description: 'Full-stack e-commerce solution with Vue.js frontend and Django backend. Features include user authentication, payment processing, and admin dashboard.',
  //   category: ProjectCategory.WEB_APP,
  //   technologies: ['Vue.js', 'Django', 'PostgreSQL', 'Stripe', 'Docker'],
  //   gradient: 'bg-gradient-to-br from-blue-500 to-purple-600',
  //   status: ProjectStatus.LIVE,
  //   statusColor: 'bg-green-500 text-white',
  //   liveUrl: '#',
  //   githubUrl: '#'
  // },
  // {
  //   id: 2,
  //   name: 'Task Management API',
  //   description: 'RESTful API built with FastAPI for task management. Includes JWT authentication, real-time notifications, and comprehensive documentation.',
  //   category: ProjectCategory.API,
  //   technologies: ['FastAPI', 'PostgreSQL', 'Redis', 'WebSockets', 'JWT'],
  //   gradient: 'bg-gradient-to-br from-green-500 to-blue-500',
  //   status: ProjectStatus.LIVE,
  //   statusColor: 'bg-green-500 text-white',
  //   liveUrl: '#',
  //   githubUrl: '#'
  // },
  // {
  //   id: 3,
  //   name: 'React Component Library',
  //   description: 'Open-source React component library with TypeScript support. Includes 50+ components with comprehensive Storybook documentation.',
  //   category: ProjectCategory.OPEN_SOURCE,
  //   technologies: ['React', 'TypeScript', 'Storybook', 'Jest', 'Rollup'],
  //   gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
  //   status: ProjectStatus.ACTIVE,
  //   statusColor: 'bg-blue-500 text-white',
  //   liveUrl: '#',
  //   githubUrl: '#'
  // },
  // {
  //   id: 4,
  //   name: 'Financial Dashboard',
  //   description: 'Real-time financial dashboard with data visualization. Built with React and D3.js, featuring interactive charts and portfolio tracking.',
  //   category: ProjectCategory.WEB_APP,
  //   technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Socket.io'],
  //   gradient: 'bg-gradient-to-br from-yellow-500 to-red-500',
  //   status: ProjectStatus.IN_DEVELOPMENT,
  //   statusColor: 'bg-yellow-500 text-black',
  //   liveUrl: null,
  //   githubUrl: '#'
  // },
  // {
  //   id: 5,
  //   name: 'Python Data Pipeline',
  //   description: 'Scalable data processing pipeline for ETL operations. Handles large datasets with Apache Airflow orchestration and monitoring.',
  //   category: ProjectCategory.API,
  //   technologies: ['Python', 'Apache Airflow', 'Pandas', 'PostgreSQL', 'Docker'],
  //   gradient: 'bg-gradient-to-br from-indigo-500 to-purple-500',
  //   status: ProjectStatus.LIVE,
  //   statusColor: 'bg-green-500 text-white',
  //   liveUrl: '#',
  //   githubUrl: '#'
  // },
  // {
  //   id: 6,
  //   name: 'Mobile Weather App',
  //   description: 'Cross-platform mobile app built with React Native. Features weather forecasts, location-based alerts, and offline functionality.',
  //   category: ProjectCategory.MOBILE,
  //   technologies: ['React Native', 'Expo', 'Redux', 'AsyncStorage', 'API Integration'],
  //   gradient: 'bg-gradient-to-br from-cyan-500 to-blue-500',
  //   status: ProjectStatus.LIVE,
  //   statusColor: 'bg-green-500 text-white',
  //   liveUrl: '#',
  //   githubUrl: '#'
  // }
]

const filteredProjects = computed<Project[]>(() => {
  if (activeCategory.value === 'All') {
    return projects
  }
  return projects.filter((project: Project) => project.category === activeCategory.value)
})
</script>