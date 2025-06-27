export interface BlogComment {
  id: string
  post_slug: string
  username: string
  comment: string
  created_at: string
  updated_at: string
}

export interface CommentForm {
  username: string
  comment: string
}

export interface CommentSubmission {
  post_slug: string
  username: string
  comment: string
}

// Validation types
export interface CommentFormValidation {
  username: string[]
  comment: string[]
}

// State management types
export interface CommentState {
  comments: BlogComment[]
  isLoading: boolean
  isSubmitting: boolean
  submitError: string
  submitSuccess: boolean
}

// API response types
export interface CommentSubmissionResponse {
  data: BlogComment | null
  error: string | null
}