# Ignat Petrov - Personal Portfolio & Blog

A modern, responsive portfolio website built with Nuxt.js featuring a Matrix-style animated hero section, project showcase, and blog functionality.

## Features

- **Matrix-Style Hero Animation**: Dynamic title morphing with green terminal effects
- **Responsive Design**: Optimized for all devices with mobile-first approach
- **Dark Theme**: Professional dark color scheme throughout
- **Portfolio Showcase**: Filterable project gallery with live demos and GitHub links
- **Blog System**: Markdown-based blog with search and tag filtering
- **Contact Form**: Interactive contact form with validation
- **SEO Optimized**: Meta tags and structured data for better search visibility

## Tech Stack

- **Frontend**: Nuxt.js 3, Vue.js 3, TypeScript
- **Styling**: Tailwind CSS
- **Content Management**: Nuxt Content (Markdown)
- **Deployment**: Vercel/Netlify ready
- **Development**: Vite, ESLint, Auto-imports

## Pages

- **Home**: Matrix-animated hero with skills and recent work preview
- **About**: Professional bio, technical skills, and experience timeline
- **Portfolio**: Filterable project showcase with categories
- **Blog**: Article listing with search, filtering, and individual post pages
- **Contact**: Contact form with availability status and social links

## Project Structure

```
├── components/          # Reusable Vue components
├── content/            # Markdown content (blog posts)
├── layouts/            # Page layouts
├── pages/              # Application pages
├── assets/             # Static assets and styles
├── public/             # Public files
└── nuxt.config.ts      # Nuxt configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd theignatpetrov
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## Deployment

### Vercel

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Framework Preset: Nuxt.js
   - Build Command: `npm run build`
   - Output Directory: `.output/public`

### Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build Command: `npm run generate`
   - Publish Directory: `.output/public`

## Customization

### Adding Blog Posts

Create new markdown files in `/content/blog/`:

```markdown
---
title: 'Your Post Title'
description: 'Post description'
date: '2024-03-15'
tags: ['Vue.js', 'JavaScript']
readTime: 5
---

# Your Content Here

Write your blog post content in markdown...
```

### Updating Projects

Edit the projects array in `/pages/portfolio.vue` to showcase your work:

```javascript
const projects = [
  {
    id: 1,
    name: 'Project Name',
    description: 'Project description...',
    category: 'Web Apps',
    technologies: ['Vue.js', 'Node.js'],
    status: 'Live',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/repo'
  }
]
```

### Customizing Content

- Update personal information in all pages
- Replace placeholder images and links
- Modify the color scheme in Tailwind classes
- Adjust the Matrix animation parameters

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- Email: ignat@example.com
- LinkedIn: [linkedin.com/in/ignatpetrov](https://linkedin.com/in/ignatpetrov)
- GitHub: [github.com/ignatpetrov](https://github.com/ignatpetrov)
- Twitter: [@ignatpetrov](https://twitter.com/ignatpetrov)