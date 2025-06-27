/**
 * Standardized error handling utilities for the blog system
 */

/**
 * Standard error types for consistent error categorization
 */
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  SERVER_ERROR = 'SERVER_ERROR',
  CACHE_ERROR = 'CACHE_ERROR',
  FILE_ERROR = 'FILE_ERROR',
  CONFIG_ERROR = 'CONFIG_ERROR',
  UNKNOWN = 'UNKNOWN'
}

/**
 * Standard error severity levels
 */
export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

/**
 * Standardized error interface
 */
export interface BlogError {
  type: ErrorType
  severity: ErrorSeverity
  message: string
  originalError?: Error | unknown
  context?: Record<string, any>
  timestamp: Date
  userMessage?: string
}

/**
 * Error factory class for creating standardized errors
 */
export class ErrorFactory {
  static createNetworkError(
    message: string, 
    originalError?: Error | unknown,
    context?: Record<string, any>
  ): BlogError {
    return {
      type: ErrorType.NETWORK,
      severity: ErrorSeverity.MEDIUM,
      message,
      originalError,
      context,
      timestamp: new Date(),
      userMessage: 'Network error. Please check your connection and try again.'
    }
  }

  static createValidationError(
    message: string,
    context?: Record<string, any>
  ): BlogError {
    return {
      type: ErrorType.VALIDATION,
      severity: ErrorSeverity.LOW,
      message,
      context,
      timestamp: new Date(),
      userMessage: 'Invalid input provided. Please check your data and try again.'
    }
  }

  static createNotFoundError(
    resource: string,
    context?: Record<string, any>
  ): BlogError {
    return {
      type: ErrorType.NOT_FOUND,
      severity: ErrorSeverity.LOW,
      message: `Resource not found: ${resource}`,
      context,
      timestamp: new Date(),
      userMessage: 'The requested content could not be found.'
    }
  }

  static createServerError(
    message: string,
    originalError?: Error | unknown,
    context?: Record<string, any>
  ): BlogError {
    return {
      type: ErrorType.SERVER_ERROR,
      severity: ErrorSeverity.HIGH,
      message,
      originalError,
      context,
      timestamp: new Date(),
      userMessage: 'A server error occurred. Please try again later.'
    }
  }

  static createCacheError(
    operation: string,
    originalError?: Error | unknown,
    context?: Record<string, any>
  ): BlogError {
    return {
      type: ErrorType.CACHE_ERROR,
      severity: ErrorSeverity.LOW,
      message: `Cache operation failed: ${operation}`,
      originalError,
      context,
      timestamp: new Date(),
      userMessage: 'Temporary caching issue. Data will be fetched directly.'
    }
  }

  static createFileError(
    filePath: string,
    operation: string,
    originalError?: Error | unknown,
    context?: Record<string, any>
  ): BlogError {
    return {
      type: ErrorType.FILE_ERROR,
      severity: ErrorSeverity.MEDIUM,
      message: `File ${operation} failed: ${filePath}`,
      originalError,
      context,
      timestamp: new Date(),
      userMessage: 'File processing error. Please try again.'
    }
  }

  static createConfigError(
    configSection: string,
    message: string,
    context?: Record<string, any>
  ): BlogError {
    return {
      type: ErrorType.CONFIG_ERROR,
      severity: ErrorSeverity.CRITICAL,
      message: `Configuration error in ${configSection}: ${message}`,
      context,
      timestamp: new Date(),
      userMessage: 'System configuration error. Please contact support.'
    }
  }

  static createUnknownError(
    originalError: Error | unknown,
    context?: Record<string, any>
  ): BlogError {
    const message = originalError instanceof Error 
      ? originalError.message 
      : 'Unknown error occurred'
    
    return {
      type: ErrorType.UNKNOWN,
      severity: ErrorSeverity.MEDIUM,
      message,
      originalError,
      context,
      timestamp: new Date(),
      userMessage: 'An unexpected error occurred. Please try again.'
    }
  }
}

/**
 * Error handler class for processing and logging errors
 */
export class ErrorHandler {
  private static loggers: Array<(error: BlogError) => void> = []

  /**
   * Register a logger function
   */
  static addLogger(logger: (error: BlogError) => void): void {
    this.loggers.push(logger)
  }

  /**
   * Remove a logger function
   */
  static removeLogger(logger: (error: BlogError) => void): void {
    const index = this.loggers.indexOf(logger)
    if (index > -1) {
      this.loggers.splice(index, 1)
    }
  }

  /**
   * Handle and log an error
   */
  static handle(error: BlogError): void {
    // Log to console based on severity
    this.logToConsole(error)

    // Call registered loggers
    this.loggers.forEach(logger => {
      try {
        logger(error)
      } catch (loggerError) {
        console.error('Logger error:', loggerError)
      }
    })
  }

  /**
   * Log error to console with appropriate level
   */
  private static logToConsole(error: BlogError): void {
    const logData = {
      type: error.type,
      severity: error.severity,
      message: error.message,
      timestamp: error.timestamp.toISOString(),
      context: error.context,
      originalError: error.originalError
    }

    switch (error.severity) {
      case ErrorSeverity.LOW:
        console.info('Blog Error (Low):', logData)
        break
      case ErrorSeverity.MEDIUM:
        console.warn('Blog Error (Medium):', logData)
        break
      case ErrorSeverity.HIGH:
        console.error('Blog Error (High):', logData)
        break
      case ErrorSeverity.CRITICAL:
        console.error('Blog Error (CRITICAL):', logData)
        break
      default:
        console.warn('Blog Error (Unknown Severity):', logData)
    }
  }

  /**
   * Convert any error to a standardized BlogError
   */
  static normalize(
    error: Error | unknown,
    context?: Record<string, any>
  ): BlogError {
    if (error instanceof Error) {
      const message = error.message.toLowerCase()
      
      // Try to categorize the error based on its properties (order matters!)
      
      // File errors (check before 'not found' since ENOENT contains 'not found')
      if (message.includes('enoent') || (message.includes('file') && (message.includes('read') || message.includes('write')))) {
        const filePath = context?.filePath || 'unknown'
        return ErrorFactory.createFileError(filePath, 'read', error, context)
      }
      
      // Config errors (check before 'validation')
      if (message.includes('config') && (message.includes('validation') || message.includes('error'))) {
        return ErrorFactory.createConfigError('unknown', error.message, context)
      }
      
      // Network errors
      if (message.includes('fetch') || message.includes('network') || message.includes('timeout')) {
        return ErrorFactory.createNetworkError(error.message, error, context)
      }
      
      // Not found errors
      if (message.includes('not found') || message.includes('404')) {
        return ErrorFactory.createNotFoundError(error.message, context)
      }
      
      // Validation errors
      if (message.includes('validation') || message.includes('invalid')) {
        return ErrorFactory.createValidationError(error.message, context)
      }
      
      // Cache errors
      if (message.includes('cache')) {
        return ErrorFactory.createCacheError('operation', error, context)
      }
    }

    return ErrorFactory.createUnknownError(error, context)
  }
}

/**
 * Utility functions for common error handling patterns
 */
export class ErrorUtils {
  /**
   * Safe async wrapper that handles errors gracefully
   */
  static async safeAsync<T>(
    fn: () => Promise<T>,
    fallback: T,
    context?: Record<string, any>
  ): Promise<T> {
    try {
      return await fn()
    } catch (error) {
      const blogError = ErrorHandler.normalize(error, context)
      ErrorHandler.handle(blogError)
      return fallback
    }
  }

  /**
   * Safe sync wrapper that handles errors gracefully
   */
  static safe<T>(
    fn: () => T,
    fallback: T,
    context?: Record<string, any>
  ): T {
    try {
      return fn()
    } catch (error) {
      const blogError = ErrorHandler.normalize(error, context)
      ErrorHandler.handle(blogError)
      return fallback
    }
  }

  /**
   * Retry wrapper with exponential backoff
   */
  static async retry<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    baseDelay: number = 1000,
    context?: Record<string, any>
  ): Promise<T> {
    let lastError: unknown

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error
        
        if (attempt === maxAttempts) {
          break
        }

        const delay = baseDelay * Math.pow(2, attempt - 1)
        const blogError = ErrorHandler.normalize(error, {
          ...context,
          attempt,
          maxAttempts,
          retryDelay: delay
        })
        
        ErrorHandler.handle(blogError)
        
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    throw lastError
  }

  /**
   * Batch error handler for multiple operations
   */
  static async batchSafe<T>(
    operations: Array<() => Promise<T>>,
    context?: Record<string, any>
  ): Promise<Array<{ success: boolean; result?: T; error?: BlogError }>> {
    const results = await Promise.allSettled(operations.map(op => op()))
    
    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return { success: true, result: result.value }
      } else {
        const blogError = ErrorHandler.normalize(result.reason, {
          ...context,
          operationIndex: index
        })
        ErrorHandler.handle(blogError)
        return { success: false, error: blogError }
      }
    })
  }
}

/**
 * Default console logger (automatically registered)
 */
const defaultLogger = (error: BlogError) => {
  // This is handled by ErrorHandler.logToConsole internally
  // Additional logging can be added here for external services
}

// Auto-register the default logger
ErrorHandler.addLogger(defaultLogger)