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
                I'm a passionate software engineer with extensive experience building
                scalable web applications. My journey in tech
                actually started working at a VFX studio, and has evolved into a career
                focused on designing and building meaningful software products.
              </p>
              <p>
                I'm currently transitioning into solopreneurship, and I'm always looking for new challenges.
                My plan is to use my skills and experience to start building useful, thoughtful, and genuinely cool things.
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
              class="relative pl-8 pb-8 last:pb-0"
            >
              <!-- Timeline line -->
              <div
                v-if="index < experiences.length - 1"
                class="absolute left-[5px] top-3 bottom-0 w-px bg-neutral-700/40"
              ></div>
              <!-- Timeline dot: filled + glow for current, hollow for past -->
              <div
                class="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 transition-all"
                :class="index === 0
                  ? 'border-amber-400 bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.4)]'
                  : 'border-neutral-600 bg-transparent'"
              ></div>

              <!-- Card -->
              <div
                class="rounded-lg px-5 py-4 transition-colors"
                :class="index === 0
                  ? 'bg-amber-400/5 border border-amber-400/20'
                  : 'bg-gray-800/40 border border-neutral-700/30'"
              >
                <!-- Title + Present badge -->
                <div class="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 class="font-display text-lg font-semibold text-neutral-100">{{ exp.title }}</h3>
                  <span
                    v-if="index === 0"
                    class="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-400 border border-amber-400/30"
                  >Present</span>
                </div>
                <p class="text-sm font-mono mb-3" :class="index === 0 ? 'text-amber-400/90' : 'text-amber-400/60'">{{ exp.period }}</p>
                <p v-if="exp.description" class="text-sm text-neutral-400 leading-relaxed">{{ exp.description }}</p>
                <!-- Projects as pills + description -->
                <ul v-if="exp.projects" class="mt-3 space-y-3">
                  <li v-for="project in exp.projects" :key="project.name" class="text-sm text-neutral-400 leading-relaxed">
                    <span class="inline-block text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-700/60 text-neutral-300 border border-neutral-600/50 mb-1">{{ project.name }}</span>
                    <p>{{ project.description }}</p>
                  </li>
                </ul>
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
const { skills, experiences, values } = useAboutData()
</script>
