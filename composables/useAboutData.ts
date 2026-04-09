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
    title: 'Senior Software Engineer @Damilah',
    period: 'Sep 2025 - Present',
    color: 'text-amber-400',
    projects: [
      {
        name: 'Multi-Agent Platform',
        description: 'Designed the architecture and led implementation of a multi-agent orchestration platform for AI-driven workflows. Built a scalable system using React, FastAPI, Redis, Postgres, and sandboxed code execution, integrating multiple LLM providers and external services. Implemented fault-tolerant, resumable long-running workflows with persisted execution context for reliable recovery after failures. Drove technical direction through RFCs, PoCs, and architecture planning, reducing ambiguity in a complex, fast-evolving problem space.'
      },
      {
        name: 'Qargo TMS',
        description: 'Delivering multimodal and container transport integrations for an intelligent TMS platform serving carriers, freight forwarders, and 3PLs across Europe.'
      }
    ]
  },
  {
    title: 'Software Engineer @Qogita',
    period: 'May 2022 - June 2025',
    color: 'text-amber-400',
    description: 'Led backend development for core commerce and operational workflows at Qogita, a fast-growing European B2B wholesale marketplace, supporting high-complexity cross-border pricing, ordering, logistics, and post-order workflows. Key projects:',
    projects: [
      {
        name: 'Cart & Order Migration',
        description: 'Led a zero-downtime migration from a shared cart/order model to separate domain entities, reducing system-wide complexity and enabling accurate handling of cases where final orders differed from carts due to country-specific minimum order value (MoV) rules.'
      },
      {
        name: 'Pricing Service',
        description: 'Helped evolve a complex SQL-heavy pricing pipeline into a dedicated pricing service, collaborating with Data Science on a pandas-based solution for pricing and MoV calculations, and integrating it into the platform\'s event-driven architecture (SQS → Kafka). Designed downstream consumers to refresh indexes, update open cart prices, and notify watchlisted users.'
      },
      {
        name: 'DPD Shipping Integration',
        description: 'Led the DPD shipping integration, designing a strategy-based abstraction over fragmented country-specific APIs that reduced shipping costs and expanded support for dangerous goods across more markets.'
      },
      {
        name: 'Claims Platform',
        description: 'Led the initial backend implementation of an automated claims platform, replacing a manual email-based process with a structured workflow for claim submission, evidence collection, partial/full approvals, refunds, and support visibility.'
      }
    ]
  },
  {
    title: 'Software Engineer @Iprova',
    period: 'Aug 2021 - Apr 2022',
    color: 'text-amber-400',
    description: 'Worked on an AI-powered platform that accelerates invention and patent development for enterprises. Optimized indexing services to enable fast search across millions of research paper documents, helping R&D teams quickly discover relevant prior art and insights.'
  },
  {
    title: 'Freelancer @Toptal',
    period: 'Mar 2020 - August 2021',
    color: 'text-amber-400',
    description: 'Built a document management platform from the ground up for Speos Digital, a subsidiary of Belgian postal service bpost. Developed the full stack using Django and Vue.js, with digital signatures as the core feature alongside document management and organization.'
  },
  {
    title: 'Software Engineer @Komuna.dev',
    period: 'Nov 2018 - Aug 2021',
    color: 'text-amber-400',
    description: 'Built communication and collaboration solutions for business continuity, disaster recovery, and crisis management. Developed secure, reliable back-end services with Python and Django, integrating Twilio, Textlocal, and Mailgun APIs. Led the front-end migration from AngularJS to Vue.js.'
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
    description: 'Created and customized numerous modules for the Python ERP framework Odoo regarding accounting, sales, purchase, inventory work and manufacturing for successful businesses across Europe.'
  },
  {
    title: 'Rotomation Supervisor | Python developer @Vertigo Visual',
    period: 'Sep 2015 - Jun 2018',
    color: 'text-amber-400',
    projects: [
      {
        name: 'Rotomation Supervisor',
        description: 'Responsible for delegating and quality control across a team of 7. Together successfully delivered many projects, including numerous Hollywood blockbusters.'
      },
      {
        name: 'Python Developer',
        description: "Created tools to automate the visual effects creation process using Python. Some of the tools helped double the artists' speed and enabled significantly more precise work."
      }
    ]
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

export function useAboutData(): { skills: Skill[]; experiences: Experience[]; values: Value[] } {
  return { skills, experiences, values }
}
