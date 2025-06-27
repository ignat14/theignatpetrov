/**
 * Configuration validation and type definitions
 */
interface CacheConfig {
  BLOG_STATS_KEY: string
  BLOG_STATS_DURATION: number
  ANALYTICS_DURATION: number
}

interface ApiConfig {
  BLOG_STATS: string
  ANALYTICS: string
  COMMENTS: string
}

interface UiConfig {
  POSTS_PER_PAGE: number
  POSTS_PER_LOAD: number
  LATEST_POSTS_COUNT: number
  RELATED_POSTS_COUNT: number
  COMMENT_AUTO_HIDE_SUCCESS: number
}

interface ErrorConfig {
  NETWORK: string
  GENERIC_SUBMIT: string
  GENERIC_FETCH: string
  CACHE_READ: string
  CACHE_WRITE: string
}

interface BlogConfig {
  CACHE: CacheConfig
  API: ApiConfig
  UI: UiConfig
  ERRORS: ErrorConfig
}

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: BlogConfig = {
  // Cache configuration
  CACHE: {
    BLOG_STATS_KEY: 'blog-stats-cache',
    BLOG_STATS_DURATION: 5 * 60 * 1000, // 5 minutes
    ANALYTICS_DURATION: 15 * 60 * 1000, // 15 minutes for analytics (less frequent updates)
  },
  
  // API endpoints
  API: {
    BLOG_STATS: '/api/blog/stats',
    ANALYTICS: '/api/analytics/pageviews',
    COMMENTS: 'blog_comments',
  },
  
  // UI configuration
  UI: {
    POSTS_PER_PAGE: 6, // Number of posts to show per page in blog listing
    POSTS_PER_LOAD: 6, // Number of posts to load when "Load More" is clicked
    LATEST_POSTS_COUNT: 3, // Number of latest posts to show on homepage
    RELATED_POSTS_COUNT: 2, // Number of related posts to show on blog post pages
    COMMENT_AUTO_HIDE_SUCCESS: 5000, // Hide success message after 5 seconds
  },
  
  // Error messages
  ERRORS: {
    NETWORK: 'Network error. Please check your connection and try again.',
    GENERIC_SUBMIT: 'Failed to submit. Please try again.',
    GENERIC_FETCH: 'Failed to load data. Please refresh the page.',
    CACHE_READ: 'Failed to read cache',
    CACHE_WRITE: 'Failed to write cache',
  }
} as const

/**
 * Configuration validation functions
 */
function validateCacheConfig(config: Partial<CacheConfig>): CacheConfig {
  const errors: string[] = []
  
  const result: CacheConfig = {
    BLOG_STATS_KEY: config.BLOG_STATS_KEY ?? DEFAULT_CONFIG.CACHE.BLOG_STATS_KEY,
    BLOG_STATS_DURATION: config.BLOG_STATS_DURATION ?? DEFAULT_CONFIG.CACHE.BLOG_STATS_DURATION,
    ANALYTICS_DURATION: config.ANALYTICS_DURATION ?? DEFAULT_CONFIG.CACHE.ANALYTICS_DURATION,
  }
  
  if (typeof result.BLOG_STATS_KEY !== 'string' || result.BLOG_STATS_KEY.length === 0) {
    errors.push('CACHE.BLOG_STATS_KEY must be a non-empty string')
  }
  
  if (typeof result.BLOG_STATS_DURATION !== 'number' || result.BLOG_STATS_DURATION <= 0) {
    errors.push('CACHE.BLOG_STATS_DURATION must be a positive number')
  }
  
  if (typeof result.ANALYTICS_DURATION !== 'number' || result.ANALYTICS_DURATION <= 0) {
    errors.push('CACHE.ANALYTICS_DURATION must be a positive number')
  }
  
  if (errors.length > 0) {
    throw new Error(`Cache configuration validation failed: ${errors.join(', ')}`)
  }
  
  return result
}

function validateApiConfig(config: Partial<ApiConfig>): ApiConfig {
  const errors: string[] = []
  
  const result: ApiConfig = {
    BLOG_STATS: config.BLOG_STATS ?? DEFAULT_CONFIG.API.BLOG_STATS,
    ANALYTICS: config.ANALYTICS ?? DEFAULT_CONFIG.API.ANALYTICS,
    COMMENTS: config.COMMENTS ?? DEFAULT_CONFIG.API.COMMENTS,
  }
  
  if (typeof result.BLOG_STATS !== 'string' || !result.BLOG_STATS.startsWith('/api/')) {
    errors.push('API.BLOG_STATS must be a string starting with "/api/"')
  }
  
  if (typeof result.ANALYTICS !== 'string' || !result.ANALYTICS.startsWith('/api/')) {
    errors.push('API.ANALYTICS must be a string starting with "/api/"')
  }
  
  if (typeof result.COMMENTS !== 'string' || result.COMMENTS.length === 0) {
    errors.push('API.COMMENTS must be a non-empty string')
  }
  
  if (errors.length > 0) {
    throw new Error(`API configuration validation failed: ${errors.join(', ')}`)
  }
  
  return result
}

function validateUiConfig(config: Partial<UiConfig>): UiConfig {
  const errors: string[] = []
  
  const result: UiConfig = {
    POSTS_PER_PAGE: config.POSTS_PER_PAGE ?? DEFAULT_CONFIG.UI.POSTS_PER_PAGE,
    POSTS_PER_LOAD: config.POSTS_PER_LOAD ?? DEFAULT_CONFIG.UI.POSTS_PER_LOAD,
    LATEST_POSTS_COUNT: config.LATEST_POSTS_COUNT ?? DEFAULT_CONFIG.UI.LATEST_POSTS_COUNT,
    RELATED_POSTS_COUNT: config.RELATED_POSTS_COUNT ?? DEFAULT_CONFIG.UI.RELATED_POSTS_COUNT,
    COMMENT_AUTO_HIDE_SUCCESS: config.COMMENT_AUTO_HIDE_SUCCESS ?? DEFAULT_CONFIG.UI.COMMENT_AUTO_HIDE_SUCCESS,
  }
  
  const positiveNumbers = [
    { key: 'POSTS_PER_PAGE', value: result.POSTS_PER_PAGE },
    { key: 'POSTS_PER_LOAD', value: result.POSTS_PER_LOAD },
    { key: 'LATEST_POSTS_COUNT', value: result.LATEST_POSTS_COUNT },
    { key: 'RELATED_POSTS_COUNT', value: result.RELATED_POSTS_COUNT },
    { key: 'COMMENT_AUTO_HIDE_SUCCESS', value: result.COMMENT_AUTO_HIDE_SUCCESS },
  ]
  
  positiveNumbers.forEach(({ key, value }) => {
    if (typeof value !== 'number' || value <= 0 || !Number.isInteger(value)) {
      errors.push(`UI.${key} must be a positive integer`)
    }
  })
  
  if (errors.length > 0) {
    throw new Error(`UI configuration validation failed: ${errors.join(', ')}`)
  }
  
  return result
}

function validateErrorConfig(config: Partial<ErrorConfig>): ErrorConfig {
  const errors: string[] = []
  
  const result: ErrorConfig = {
    NETWORK: config.NETWORK ?? DEFAULT_CONFIG.ERRORS.NETWORK,
    GENERIC_SUBMIT: config.GENERIC_SUBMIT ?? DEFAULT_CONFIG.ERRORS.GENERIC_SUBMIT,
    GENERIC_FETCH: config.GENERIC_FETCH ?? DEFAULT_CONFIG.ERRORS.GENERIC_FETCH,
    CACHE_READ: config.CACHE_READ ?? DEFAULT_CONFIG.ERRORS.CACHE_READ,
    CACHE_WRITE: config.CACHE_WRITE ?? DEFAULT_CONFIG.ERRORS.CACHE_WRITE,
  }
  
  Object.entries(result).forEach(([key, value]) => {
    if (typeof value !== 'string' || value.length === 0) {
      errors.push(`ERRORS.${key} must be a non-empty string`)
    }
  })
  
  if (errors.length > 0) {
    throw new Error(`Error configuration validation failed: ${errors.join(', ')}`)
  }
  
  return result
}

/**
 * Main validation function
 */
function validateBlogConfig(config: Partial<BlogConfig> = {}): BlogConfig {
  try {
    return {
      CACHE: validateCacheConfig(config.CACHE || {}),
      API: validateApiConfig(config.API || {}),
      UI: validateUiConfig(config.UI || {}),
      ERRORS: validateErrorConfig(config.ERRORS || {}),
    }
  } catch (error) {
    console.error('Blog configuration validation failed:', error)
    throw error
  }
}

/**
 * Environment variable override support
 */
function getConfigFromEnv(): Partial<BlogConfig> {
  // Only available on server side
  if (typeof process === 'undefined') {
    return {}
  }
  
  const env = process.env
  const config: Partial<BlogConfig> = {}
  
  // Cache overrides
  if (env.BLOG_CACHE_STATS_DURATION) {
    config.CACHE = config.CACHE || {}
    config.CACHE.BLOG_STATS_DURATION = parseInt(env.BLOG_CACHE_STATS_DURATION, 10)
  }
  
  if (env.BLOG_CACHE_ANALYTICS_DURATION) {
    config.CACHE = config.CACHE || {}
    config.CACHE.ANALYTICS_DURATION = parseInt(env.BLOG_CACHE_ANALYTICS_DURATION, 10)
  }
  
  // UI overrides
  if (env.BLOG_UI_POSTS_PER_PAGE) {
    config.UI = config.UI || {}
    config.UI.POSTS_PER_PAGE = parseInt(env.BLOG_UI_POSTS_PER_PAGE, 10)
  }
  
  if (env.BLOG_UI_LATEST_POSTS_COUNT) {
    config.UI = config.UI || {}
    config.UI.LATEST_POSTS_COUNT = parseInt(env.BLOG_UI_LATEST_POSTS_COUNT, 10)
  }
  
  return config
}

/**
 * Create and validate the final configuration
 */
function createBlogConfig(): BlogConfig {
  const envConfig = getConfigFromEnv()
  const mergedConfig = {
    CACHE: { ...DEFAULT_CONFIG.CACHE, ...envConfig.CACHE },
    API: { ...DEFAULT_CONFIG.API, ...envConfig.API },
    UI: { ...DEFAULT_CONFIG.UI, ...envConfig.UI },
    ERRORS: { ...DEFAULT_CONFIG.ERRORS, ...envConfig.ERRORS },
  }
  
  return validateBlogConfig(mergedConfig)
}

// Export the validated configuration
export const BLOG_CONFIG = createBlogConfig()

// Export types and utilities for testing
export type { BlogConfig, CacheConfig, ApiConfig, UiConfig, ErrorConfig }
export { validateBlogConfig, DEFAULT_CONFIG }