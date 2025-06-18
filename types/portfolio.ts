export enum ProjectCategory {
  WEB_APP = 'Web Apps',
  API = 'APIs',
  OPEN_SOURCE = 'Open Source',
  MOBILE = 'Mobile'
}

export enum ProjectStatus {
  LIVE = 'Live',
  ACTIVE = 'Active',
  IN_DEVELOPMENT = 'In Development'
}

export interface Project {
  id: number
  name: string
  description: string
  category: ProjectCategory
  technologies: string[]
  gradient: string
  status: ProjectStatus
  statusColor: string
  liveUrl: string | null
  githubUrl: string
} 