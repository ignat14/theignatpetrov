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
            <!-- Frontend -->
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div class="flex items-center mb-4">
                <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <h3 class="text-xl font-semibold text-white">Frontend</h3>
              </div>
              <ul class="text-gray-300 space-y-2">
                <li>Vue.js / Nuxt.js</li>
                <li>React / Next.js</li>
                <li>TypeScript / JavaScript</li>
                <li>Tailwind CSS</li>
                <li>HTML5 / CSS3</li>
              </ul>
            </div>

            <!-- Backend -->
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div class="flex items-center mb-4">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h3 class="text-xl font-semibold text-white">Backend</h3>
              </div>
              <ul class="text-gray-300 space-y-2">
                <li>Python / Django</li>
                <li>FastAPI</li>
                <li>Node.js / Express</li>
                <li>PostgreSQL / MongoDB</li>
                <li>Redis</li>
              </ul>
            </div>

            <!-- DevOps & Tools -->
            <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div class="flex items-center mb-4">
                <div class="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <h3 class="text-xl font-semibold text-white">DevOps & Tools</h3>
              </div>
              <ul class="text-gray-300 space-y-2">
                <li>Docker / Kubernetes</li>
                <li>AWS / GCP</li>
                <li>CI/CD Pipelines</li>
                <li>Git / GitHub</li>
                <li>Linux / Bash</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Experience Timeline -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-white mb-12 text-center">Experience</h2>
          <div class="space-y-8">
            <div class="flex">
              <div class="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-1.5 mr-6"></div>
              <div>
                <h3 class="text-xl font-semibold text-white mb-2">Freelancer at Toptal</h3>
                <p class="text-blue-400 mb-3">2021 - Present</p>
                <p class="text-gray-300">
                  Working with top-tier clients on challenging projects, delivering 
                  high-quality solutions for web applications and API development.
                </p>
              </div>
            </div>

            <div class="flex">
              <div class="flex-shrink-0 w-4 h-4 bg-green-500 rounded-full mt-1.5 mr-6"></div>
              <div>
                <h3 class="text-xl font-semibold text-white mb-2">Python Lecturer</h3>
                <p class="text-green-400 mb-3">2020 - Present</p>
                <p class="text-gray-300">
                  Teaching Python programming and web development to students and 
                  professionals, creating course materials and mentoring developers.
                </p>
              </div>
            </div>

            <div class="flex">
              <div class="flex-shrink-0 w-4 h-4 bg-purple-500 rounded-full mt-1.5 mr-6"></div>
              <div>
                <h3 class="text-xl font-semibold text-white mb-2">Solopreneur</h3>
                <p class="text-purple-400 mb-3">2019 - Present</p>
                <p class="text-gray-300">
                  Building and launching digital products, managing end-to-end 
                  development processes, and growing sustainable software businesses.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Values -->
        <div>
          <h2 class="text-3xl font-bold text-white mb-12 text-center">What Drives Me</h2>
          <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white mb-3">Innovation</h3>
              <p class="text-gray-300">
                Always exploring new technologies and approaches to solve complex problems.
              </p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white mb-3">Learning</h3>
              <p class="text-gray-300">
                Committed to continuous learning and sharing knowledge with the community.
              </p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white mb-3">Quality</h3>
              <p class="text-gray-300">
                Passionate about writing clean, maintainable code and delivering exceptional user experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>