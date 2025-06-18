export type SubjectType = 'freelance' | 'consulting' | 'collaboration' | 'speaking' | 'other'

export interface ContactForm {
  firstName: string
  lastName: string
  email: string
  company: string
  subject: SubjectType
  budget: string
  message: string
  agreeToTerms: boolean
} 