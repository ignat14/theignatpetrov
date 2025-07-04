export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: number
  tags: string[]
  views: number
  comments: number
}

export interface BlogContent {
  title: string
  description: string
  date: string
  readTime: number
  tags?: string[]
  image?: string
  _path?: string
}