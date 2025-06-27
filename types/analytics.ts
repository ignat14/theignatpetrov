// Analytics data types
export interface AnalyticsDataPoint {
  path: string
  title: string
  views: number
}

export type AnalyticsData = AnalyticsDataPoint[]

// API response types
export interface BlogStatsResponse {
  analytics: AnalyticsData
  commentCounts: Record<string, number>
}

// Error handling types
export interface ApiError {
  message: string
  code?: string
  statusCode?: number
}

export interface ApiResponse<T> {
  data: T | null
  error: ApiError | null
}