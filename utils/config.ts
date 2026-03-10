/**
 * Simple blog configuration
 */

export const BLOG_CONFIG = {
  UI: {
    POSTS_PER_PAGE: 6,
    POSTS_PER_LOAD: 6,
    LATEST_POSTS_COUNT: 3,
    RELATED_POSTS_COUNT: 2,
  },
  API: {
    BLOG_STATS: '/api/blog/stats',
  },
  CACHE: {
    BLOG_STATS_KEY: 'blog-stats-cache',
    DURATION: 5 * 60 * 1000, // 5 minutes
  },
  ERRORS: {
    NETWORK: 'Network error. Please check your connection and try again.',
    GENERIC_FETCH: 'Failed to load data. Please try again later.',
    GENERIC_SUBMIT: 'Failed to submit. Please try again.',
    CACHE_READ: 'Failed to read cached data.',
    CACHE_WRITE: 'Failed to write data to cache.',
  },
} as const