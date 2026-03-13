export enum ProjectStatus {
  LIVE = 'Live',
  IN_DEVELOPMENT = 'In Development',
  BETA = 'Beta'
}

export interface Project {
  id: number
  name: string
  tagline: string
  description: string
  technologies: string[]
  status: ProjectStatus
  url: string | null
  githubUrl: string | null
  image: string | null
}
