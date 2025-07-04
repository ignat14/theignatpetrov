/**
 * Simple blog configuration
 */

export const BLOG_CONFIG = {
  UI: {
    POSTS_PER_PAGE: 6,
    POSTS_PER_LOAD: 6,
    LATEST_POSTS_COUNT: 3,
    RELATED_POSTS_COUNT: 2,
    COMMENT_AUTO_HIDE_SUCCESS: 5000,
  },
  API: {
    BLOG_STATS: '/api/blog/stats',
    COMMENTS: 'blog_comments',
  },
  CACHE: {
    BLOG_STATS_KEY: 'blog-stats-cache',
    DURATION: 5 * 60 * 1000, // 5 minutes
  },
} as const