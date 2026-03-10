<template>
  <div class="min-h-screen bg-surface-0 pt-16">
    <!-- Header -->
    <section class="pt-16 pb-8">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <p class="text-xs font-mono uppercase tracking-[0.2em] text-amber-400/80 mb-3">About</p>
        <h1 class="font-display text-3xl md:text-5xl font-bold text-neutral-100 text-balance">The person behind the code</h1>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-24">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <!-- Bio -->
        <div class="grid md:grid-cols-5 gap-10 lg:gap-16 items-start mb-24">
          <div class="md:col-span-2 order-2 md:order-1">
            <div class="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto md:mx-0 sticky top-24">
              <img
                src="/images/profile_pic.jpeg"
                alt="Ignat Petrov"
                width="224"
                height="224"
                class="w-full h-full object-cover rounded-2xl border border-neutral-700/50 shadow-2xl shadow-amber-900/10"
              />
              <div class="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-400/10 to-transparent pointer-events-none"></div>
            </div>
          </div>
          <div class="md:col-span-3 order-1 md:order-2">
            <h2 class="font-display text-2xl sm:text-3xl font-bold text-neutral-100 mb-6">Hi, I'm Ignat</h2>
            <div class="space-y-5 text-neutral-400 leading-relaxed">
              <p>
                I'm a passionate software engineer with 10 years of experience building
                scalable web applications. My journey in tech
                actually started working at a VFX studio, and has evolved into a career
                focused on creating meaningful solutions.
              </p>
              <p>
                I'm currently transitioning into solopreneurship, and I'm looking for new challenges.
                My plan is to use my skills and experience to start building some cool stuff.
              </p>
              <p>
                When I'm not coding, I'm usually spending time with my family, reading books, or playing basketball.
              </p>
            </div>
          </div>
        </div>

        <!-- Skills Section -->
        <div class="mb-24">
          <p class="text-xs font-mono uppercase tracking-[0.2em] text-amber-400/80 mb-3">Expertise</p>
          <h2 class="font-display text-2xl md:text-3xl font-bold text-neutral-100 mb-10">Technical Skills</h2>
          <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="skill in skills"
              :key="skill.category"
              class="p-5 rounded-lg border border-neutral-700/40 bg-surface-1 hover:border-neutral-600/50 transition-colors"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="w-2 h-2 rounded-full" :class="skill.color"></div>
                <h3 class="font-display text-base font-semibold text-neutral-100">{{ skill.category }}</h3>
              </div>
              <ul class="space-y-2">
                <li v-for="item in skill.items" :key="item" class="text-sm text-neutral-400">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Experience Timeline -->
        <div class="mb-24">
          <p class="text-xs font-mono uppercase tracking-[0.2em] text-amber-400/80 mb-3">Career</p>
          <h2 class="font-display text-2xl md:text-3xl font-bold text-neutral-100 mb-10">Experience</h2>
          <div class="space-y-0">
            <div
              v-for="(exp, index) in experiences"
              :key="exp.title"
              class="relative pl-8 pb-10 last:pb-0"
            >
              <!-- Timeline line -->
              <div
                v-if="index < experiences.length - 1"
                class="absolute left-[5px] top-3 bottom-0 w-px bg-neutral-700/40"
              ></div>
              <!-- Timeline dot -->
              <div class="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 border-amber-400/60 bg-surface-0"></div>
              <div>
                <h3 class="font-display text-lg font-semibold text-neutral-100 mb-1">{{ exp.title }}</h3>
                <p class="text-sm font-mono text-amber-400/70 mb-3">{{ exp.period }}</p>
                <p v-if="exp.description" class="text-sm text-neutral-400 leading-relaxed">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Values -->
        <div>
          <p class="text-xs font-mono uppercase tracking-[0.2em] text-amber-400/80 mb-3">Philosophy</p>
          <h2 class="font-display text-2xl md:text-3xl font-bold text-neutral-100 mb-10">What Drives Me</h2>
          <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="value in values"
              :key="value.title"
              class="p-6 rounded-lg border border-neutral-700/40 bg-surface-1"
            >
              <div class="w-10 h-10 rounded-md bg-amber-400/10 flex items-center justify-center mb-5">
                <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="value.icon"></path>
                </svg>
              </div>
              <h3 class="font-display text-lg font-semibold text-neutral-100 mb-2">{{ value.title }}</h3>
              <p class="text-sm text-neutral-400 leading-relaxed">{{ value.description }}</p>
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
    color: 'bg-amber-400',
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
    color: 'bg-emerald-400',
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
    color: 'bg-rose-400',
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
    title: 'Software Engineer @Qogita',
    period: 'May 2022 - June 2025',
    color: 'text-amber-400',
    description: 'Helped shape the backend of one of the biggest startups in Europe.'
  },
  {
    title: 'Software Engineer @Iprova',
    period: 'Aug 2022 - Apr 2022',
    color: 'text-amber-400',
    description: ''
  },
  {
    title: 'Freelancer @Toptal',
    period: 'Mar 2020 - August 2021',
    color: 'text-amber-400',
    description: 'Freelancer at Toptal: https://www.toptal.com/resume/ignat-petrov'
  },
  {
    title: 'Software Engineer @Komuna.dev',
    period: 'Nov 2018 - Aug 2021',
    color: 'text-amber-400',
    description: 'Worked on a project for communication and collaboration solutions for business continuity, disaster recovery, crisis communications and operations management. On the back-end always making sure to deliver secure and reliable solutions using Python and Django, communicating with Twilio, Textlocal and MailGun APIs. On the front-end I was responsible for migrating the application from AngularJs to VueJs.'
  },
  {
    title: 'Python Lecturer @Semos',
    period: 'Dec 2018 - Nov 2019',
    color: 'text-amber-400',
    description: 'As the first Python Trainer at the Semos Education Center I developed courses for 2 Python classes (5 weeks each) which I taught to groups of 10 - 13 students in the period of 1 year'
  },
  {
    title: 'Software Engineer @Nebiz',
    period: 'Jul 2018 - Nov 2018',
    color: 'text-amber-400',
    description: 'Created and customized numerous modules for the Python ERP framework Odoo regarding accounting, sales, purchase, inventory work and manufacturing for successful businesses mostly located in Switzerland and Austria'
  },
  {
    title: 'Rotomation Supervisor | Python developer @Vertigo Visual',
    period: 'Sep 2015 - Jun 2018',
    color: 'text-amber-400',
    description: "As a Python developer I have created many tools which help automate the whole visual effects creation process using Python. Some of the tools I made helped double the artists' speed and more importantly helped for a lot more precise work. As a Rotomation Supervisor I was responsible for delegating and quality control of the work that was done by my team which included 7 members. Together we have successfully finished many projects, including numerous successful Hollywood blockbusters."
  },
]

const values: Value[] = [
  {
    title: 'Innovation',
    description: 'Always exploring new technologies and approaches to solve complex problems.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    title: 'Learning',
    description: 'Committed to continuous learning and sharing knowledge with the community.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Quality',
    description: 'Passionate about writing clean, maintainable code and delivering exceptional user experiences.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    gradient: 'from-rose-500 to-pink-500'
  }
]
</script>
