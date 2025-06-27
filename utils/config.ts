// Centralized configuration for the blog system
export const BLOG_CONFIG = {
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