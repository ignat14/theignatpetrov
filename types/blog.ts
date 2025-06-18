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
  tags: string[]
  views: number
  comments: number
  body: string
  _path: string
  _id: string
  _type: string
  _source: string
  _file: string
  _extension: string
  _draft?: boolean
  _partial?: boolean
  _locale?: string
  _dir?: string
} 