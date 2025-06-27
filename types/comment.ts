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