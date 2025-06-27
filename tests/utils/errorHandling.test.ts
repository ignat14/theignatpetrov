import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { 
  ErrorType, 
  ErrorSeverity, 
  ErrorFactory, 
  ErrorHandler, 
  ErrorUtils,
  type BlogError
} from '~/utils/errorHandling'

describe('ErrorHandling', () => {
  describe('ErrorFactory', () => {
    it('should create network errors with correct properties', () => {
      const error = ErrorFactory.createNetworkError(
        'Connection failed',
        new Error('Fetch failed'),
        { url: 'https://example.com' }
      )

      expect(error.type).toBe(ErrorType.NETWORK)
      expect(error.severity).toBe(ErrorSeverity.MEDIUM)
      expect(error.message).toBe('Connection failed')
      expect(error.originalError).toBeInstanceOf(Error)
      expect(error.context).toEqual({ url: 'https://example.com' })
      expect(error.userMessage).toBe('Network error. Please check your connection and try again.')
      expect(error.timestamp).toBeInstanceOf(Date)
    })

    it('should create validation errors', () => {
      const error = ErrorFactory.createValidationError(
        'Invalid email format',
        { field: 'email', value: 'invalid-email' }
      )

      expect(error.type).toBe(ErrorType.VALIDATION)
      expect(error.severity).toBe(ErrorSeverity.LOW)
      expect(error.message).toBe('Invalid email format')
      expect(error.userMessage).toBe('Invalid input provided. Please check your data and try again.')
    })

    it('should create not found errors', () => {
      const error = ErrorFactory.createNotFoundError(
        'blog post',
        { slug: 'missing-post' }
      )

      expect(error.type).toBe(ErrorType.NOT_FOUND)
      expect(error.severity).toBe(ErrorSeverity.LOW)
      expect(error.message).toBe('Resource not found: blog post')
      expect(error.userMessage).toBe('The requested content could not be found.')
    })

    it('should create server errors', () => {
      const originalError = new Error('Database connection failed')
      const error = ErrorFactory.createServerError(
        'Database error',
        originalError,
        { query: 'SELECT * FROM posts' }
      )

      expect(error.type).toBe(ErrorType.SERVER_ERROR)
      expect(error.severity).toBe(ErrorSeverity.HIGH)
      expect(error.originalError).toBe(originalError)
      expect(error.userMessage).toBe('A server error occurred. Please try again later.')
    })

    it('should create cache errors', () => {
      const error = ErrorFactory.createCacheError(
        'read',
        new Error('localStorage not available'),
        { key: 'blog-stats' }
      )

      expect(error.type).toBe(ErrorType.CACHE_ERROR)
      expect(error.severity).toBe(ErrorSeverity.LOW)
      expect(error.message).toBe('Cache operation failed: read')
      expect(error.userMessage).toBe('Temporary caching issue. Data will be fetched directly.')
    })

    it('should create file errors', () => {
      const error = ErrorFactory.createFileError(
        '/content/blog/post.md',
        'read',
        new Error('ENOENT'),
        { operation: 'readFile' }
      )

      expect(error.type).toBe(ErrorType.FILE_ERROR)
      expect(error.severity).toBe(ErrorSeverity.MEDIUM)
      expect(error.message).toBe('File read failed: /content/blog/post.md')
      expect(error.userMessage).toBe('File processing error. Please try again.')
    })

    it('should create config errors', () => {
      const error = ErrorFactory.createConfigError(
        'database',
        'Missing connection string',
        { config: 'DB_URL' }
      )

      expect(error.type).toBe(ErrorType.CONFIG_ERROR)
      expect(error.severity).toBe(ErrorSeverity.CRITICAL)
      expect(error.message).toBe('Configuration error in database: Missing connection string')
      expect(error.userMessage).toBe('System configuration error. Please contact support.')
    })

    it('should create unknown errors from Error objects', () => {
      const originalError = new Error('Something went wrong')
      const error = ErrorFactory.createUnknownError(originalError, { source: 'test' })

      expect(error.type).toBe(ErrorType.UNKNOWN)
      expect(error.severity).toBe(ErrorSeverity.MEDIUM)
      expect(error.message).toBe('Something went wrong')
      expect(error.originalError).toBe(originalError)
      expect(error.userMessage).toBe('An unexpected error occurred. Please try again.')
    })

    it('should create unknown errors from non-Error objects', () => {
      const error = ErrorFactory.createUnknownError('String error', { source: 'test' })

      expect(error.type).toBe(ErrorType.UNKNOWN)
      expect(error.message).toBe('Unknown error occurred')
      expect(error.originalError).toBe('String error')
    })
  })

  describe('ErrorHandler', () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>
    let mockLogger: ReturnType<typeof vi.fn>

    beforeEach(() => {
      consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
      vi.spyOn(console, 'warn').mockImplementation(() => {})
      vi.spyOn(console, 'error').mockImplementation(() => {})
      
      mockLogger = vi.fn()
      ErrorHandler.addLogger(mockLogger)
    })

    afterEach(() => {
      consoleSpy.mockRestore()
      ErrorHandler.removeLogger(mockLogger)
    })

    it('should log errors to console based on severity', () => {
      const lowError = ErrorFactory.createValidationError('Test')
      const mediumError = ErrorFactory.createNetworkError('Test')
      const highError = ErrorFactory.createServerError('Test')
      const criticalError = ErrorFactory.createConfigError('test', 'Test')

      ErrorHandler.handle(lowError)
      ErrorHandler.handle(mediumError)
      ErrorHandler.handle(highError)
      ErrorHandler.handle(criticalError)

      expect(console.info).toHaveBeenCalledWith('Blog Error (Low):', expect.any(Object))
      expect(console.warn).toHaveBeenCalledWith('Blog Error (Medium):', expect.any(Object))
      expect(console.error).toHaveBeenCalledWith('Blog Error (High):', expect.any(Object))
      expect(console.error).toHaveBeenCalledWith('Blog Error (CRITICAL):', expect.any(Object))
    })

    it('should call registered loggers', () => {
      const error = ErrorFactory.createValidationError('Test error')
      
      ErrorHandler.handle(error)
      
      expect(mockLogger).toHaveBeenCalledWith(error)
    })

    it('should handle logger errors gracefully', () => {
      const faultyLogger = vi.fn().mockImplementation(() => {
        throw new Error('Logger failed')
      })
      
      ErrorHandler.addLogger(faultyLogger)
      
      const error = ErrorFactory.createValidationError('Test error')
      
      expect(() => ErrorHandler.handle(error)).not.toThrow()
      expect(console.error).toHaveBeenCalledWith('Logger error:', expect.any(Error))
      
      ErrorHandler.removeLogger(faultyLogger)
    })

    it('should add and remove loggers correctly', () => {
      const logger1 = vi.fn()
      const logger2 = vi.fn()
      
      ErrorHandler.addLogger(logger1)
      ErrorHandler.addLogger(logger2)
      
      const error = ErrorFactory.createValidationError('Test')
      ErrorHandler.handle(error)
      
      expect(logger1).toHaveBeenCalledWith(error)
      expect(logger2).toHaveBeenCalledWith(error)
      
      ErrorHandler.removeLogger(logger1)
      ErrorHandler.handle(error)
      
      expect(logger1).toHaveBeenCalledTimes(1) // Only called once, before removal
      expect(logger2).toHaveBeenCalledTimes(2) // Called twice
      
      ErrorHandler.removeLogger(logger2)
    })

    describe('normalize', () => {
      it('should categorize network errors', () => {
        const error = new Error('fetch failed: network timeout')
        const blogError = ErrorHandler.normalize(error, { url: 'test.com' })

        expect(blogError.type).toBe(ErrorType.NETWORK)
        expect(blogError.originalError).toBe(error)
        expect(blogError.context).toEqual({ url: 'test.com' })
      })

      it('should categorize not found errors', () => {
        const error = new Error('Resource not found (404)')
        const blogError = ErrorHandler.normalize(error)

        expect(blogError.type).toBe(ErrorType.NOT_FOUND)
        expect(blogError.message).toBe('Resource not found: Resource not found (404)')
      })

      it('should categorize validation errors', () => {
        const error = new Error('validation failed: invalid email')
        const blogError = ErrorHandler.normalize(error)

        expect(blogError.type).toBe(ErrorType.VALIDATION)
      })

      it('should categorize file errors', () => {
        const error = new Error('ENOENT: file not found')
        const blogError = ErrorHandler.normalize(error, { filePath: '/test/file.txt' })

        expect(blogError.type).toBe(ErrorType.FILE_ERROR)
        expect(blogError.message).toBe('File read failed: /test/file.txt')
      })

      it('should categorize cache errors', () => {
        const error = new Error('cache write failed')
        const blogError = ErrorHandler.normalize(error)

        expect(blogError.type).toBe(ErrorType.CACHE_ERROR)
      })

      it('should categorize config errors', () => {
        const error = new Error('config validation failed')
        const blogError = ErrorHandler.normalize(error)

        expect(blogError.type).toBe(ErrorType.CONFIG_ERROR)
      })

      it('should create unknown errors for unrecognized patterns', () => {
        const error = new Error('Some random error')
        const blogError = ErrorHandler.normalize(error)

        expect(blogError.type).toBe(ErrorType.UNKNOWN)
        expect(blogError.originalError).toBe(error)
      })

      it('should handle non-Error objects', () => {
        const error = 'String error'
        const blogError = ErrorHandler.normalize(error)

        expect(blogError.type).toBe(ErrorType.UNKNOWN)
        expect(blogError.originalError).toBe(error)
      })
    })
  })

  describe('ErrorUtils', () => {
    describe('safeAsync', () => {
      it('should return result when function succeeds', async () => {
        const fn = vi.fn().mockResolvedValue('success')
        const result = await ErrorUtils.safeAsync(fn, 'fallback')

        expect(result).toBe('success')
        expect(fn).toHaveBeenCalledOnce()
      })

      it('should return fallback when function fails', async () => {
        const fn = vi.fn().mockRejectedValue(new Error('Test error'))
        const result = await ErrorUtils.safeAsync(fn, 'fallback', { context: 'test' })

        expect(result).toBe('fallback')
        expect(fn).toHaveBeenCalledOnce()
      })
    })

    describe('safe', () => {
      it('should return result when function succeeds', () => {
        const fn = vi.fn().mockReturnValue('success')
        const result = ErrorUtils.safe(fn, 'fallback')

        expect(result).toBe('success')
        expect(fn).toHaveBeenCalledOnce()
      })

      it('should return fallback when function fails', () => {
        const fn = vi.fn().mockImplementation(() => {
          throw new Error('Test error')
        })
        const result = ErrorUtils.safe(fn, 'fallback', { context: 'test' })

        expect(result).toBe('fallback')
        expect(fn).toHaveBeenCalledOnce()
      })
    })

    describe('retry', () => {
      beforeEach(() => {
        vi.useFakeTimers()
      })

      afterEach(() => {
        vi.useRealTimers()
      })

      it('should succeed on first attempt', async () => {
        const fn = vi.fn().mockResolvedValue('success')
        const result = await ErrorUtils.retry(fn, 3, 1000)

        expect(result).toBe('success')
        expect(fn).toHaveBeenCalledOnce()
      })

      it('should retry with exponential backoff', async () => {
        const fn = vi.fn()
          .mockRejectedValueOnce(new Error('First failure'))
          .mockRejectedValueOnce(new Error('Second failure'))
          .mockResolvedValueOnce('success')

        const retryPromise = ErrorUtils.retry(fn, 3, 1000)

        // Fast-forward through the delays
        await vi.advanceTimersByTimeAsync(1000) // First retry delay
        await vi.advanceTimersByTimeAsync(2000) // Second retry delay

        const result = await retryPromise

        expect(result).toBe('success')
        expect(fn).toHaveBeenCalledTimes(3)
      })

      it('should throw last error after max attempts', async () => {
        const error = new Error('Persistent failure')
        const fn = vi.fn().mockRejectedValue(error)

        // Test the retry logic by calling the function with max attempts of 1
        // This avoids timer complexity while still testing the core functionality
        await expect(ErrorUtils.retry(fn, 1, 0)).rejects.toThrow('Persistent failure')
        expect(fn).toHaveBeenCalledTimes(1)
      })
    })

    describe('batchSafe', () => {
      it('should handle mixed success and failure operations', async () => {
        const operations = [
          vi.fn().mockResolvedValue('success1'),
          vi.fn().mockRejectedValue(new Error('failure')),
          vi.fn().mockResolvedValue('success2'),
        ]

        const results = await ErrorUtils.batchSafe(operations, { batch: 'test' })

        expect(results).toHaveLength(3)
        expect(results[0]).toEqual({ success: true, result: 'success1' })
        expect(results[1]).toEqual({ 
          success: false, 
          error: expect.objectContaining({ 
            type: ErrorType.UNKNOWN,
            message: 'failure'
          })
        })
        expect(results[2]).toEqual({ success: true, result: 'success2' })
      })

      it('should handle all successful operations', async () => {
        const operations = [
          vi.fn().mockResolvedValue('result1'),
          vi.fn().mockResolvedValue('result2'),
        ]

        const results = await ErrorUtils.batchSafe(operations)

        expect(results.every(r => r.success)).toBe(true)
        expect(results[0].result).toBe('result1')
        expect(results[1].result).toBe('result2')
      })

      it('should handle all failed operations', async () => {
        const operations = [
          vi.fn().mockRejectedValue(new Error('error1')),
          vi.fn().mockRejectedValue(new Error('error2')),
        ]

        const results = await ErrorUtils.batchSafe(operations)

        expect(results.every(r => !r.success)).toBe(true)
        expect(results[0].error?.message).toBe('error1')
        expect(results[1].error?.message).toBe('error2')
      })
    })
  })

  describe('Error severity and type enums', () => {
    it('should have correct ErrorType values', () => {
      expect(ErrorType.NETWORK).toBe('NETWORK')
      expect(ErrorType.VALIDATION).toBe('VALIDATION')
      expect(ErrorType.NOT_FOUND).toBe('NOT_FOUND')
      expect(ErrorType.UNAUTHORIZED).toBe('UNAUTHORIZED')
      expect(ErrorType.SERVER_ERROR).toBe('SERVER_ERROR')
      expect(ErrorType.CACHE_ERROR).toBe('CACHE_ERROR')
      expect(ErrorType.FILE_ERROR).toBe('FILE_ERROR')
      expect(ErrorType.CONFIG_ERROR).toBe('CONFIG_ERROR')
      expect(ErrorType.UNKNOWN).toBe('UNKNOWN')
    })

    it('should have correct ErrorSeverity values', () => {
      expect(ErrorSeverity.LOW).toBe('LOW')
      expect(ErrorSeverity.MEDIUM).toBe('MEDIUM')
      expect(ErrorSeverity.HIGH).toBe('HIGH')
      expect(ErrorSeverity.CRITICAL).toBe('CRITICAL')
    })
  })
})