'use client'

import { useState, useCallback } from 'react'
import * as Sentry from '@sentry/nextjs'

export interface ApiError {
  message: string
  status?: number
  code?: string
  details?: unknown
}

export interface ApiErrorState {
  error: ApiError | null
  isError: boolean
  isLoading: boolean
  retryCount: number
}

interface UseApiErrorOptions {
  maxRetries?: number
  retryDelay?: number
  onError?: (error: ApiError) => void
}

export function useApiError(options: UseApiErrorOptions = {}) {
  const { maxRetries = 3, retryDelay = 1000, onError } = options

  const [state, setState] = useState<ApiErrorState>({
    error: null,
    isError: false,
    isLoading: false,
    retryCount: 0
  })

  const setError = useCallback((error: ApiError) => {
    setState(prev => ({
      ...prev,
      error,
      isError: true,
      isLoading: false
    }))
    
    // Send error to Sentry
    Sentry.captureException(new Error(error.message), {
      tags: {
        section: 'api_error',
        status: error.status?.toString(),
      },
      extra: {
        apiError: error,
      },
      level: 'error',
    })
    
    onError?.(error)
  }, [onError])

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
      isError: false,
      retryCount: 0
    }))
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading,
      ...(loading ? { error: null, isError: false } : {})
    }))
  }, [])

  const executeWithRetry = useCallback(async <T>(
    operation: () => Promise<T>
  ): Promise<T> => {
    setLoading(true)
    clearError() // Clear previous errors
    let lastError: ApiError | null = null

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await operation()
        setState(prev => ({
          error: null,
          isError: false,
          isLoading: false,
          retryCount: attempt
        }))
        return result
      } catch (error) {
        lastError = parseApiError(error)
        
        // Check if error is retryable
        const isRetryable = isRetryableError(lastError)
        
        if (attempt < maxRetries && isRetryable) {
          setState(prev => ({
            ...prev,
            retryCount: attempt + 1,
            isLoading: true
          }))
          
          // Exponential backoff with jitter
          const delay = Math.min(retryDelay * Math.pow(2, attempt), 10000) + Math.random() * 1000
          await new Promise(resolve => setTimeout(resolve, delay))
        } else if (!isRetryable) {
          // Don't retry for certain error types
          break
        }
      }
    }

    // All retries failed or error is not retryable
    if (lastError) {
      setError(lastError)
      throw lastError
    }

    throw new Error('Unknown error occurred')
  }, [maxRetries, retryDelay, setError, setLoading, clearError])

  const retry = useCallback(async <T>(
    operation: () => Promise<T>
  ): Promise<T> => {
    if (state.retryCount >= maxRetries) {
      throw new Error('Maximum retries exceeded')
    }
    
    return executeWithRetry(operation)
  }, [state.retryCount, maxRetries, executeWithRetry])

  return {
    ...state,
    setError,
    clearError,
    setLoading,
    executeWithRetry,
    retry,
    canRetry: state.retryCount < maxRetries
  }
}

// Helper function to determine if an error should be retried
function isRetryableError(error: ApiError): boolean {
  // Don't retry client errors (4xx) except for specific cases
  if (error.status && error.status >= 400 && error.status < 500) {
    // Retry these specific client errors
    const retryableClientErrors = [408, 429] // Request timeout, Too many requests
    return retryableClientErrors.includes(error.status)
  }
  
  // Retry server errors (5xx)
  if (error.status && error.status >= 500) {
    return true
  }
  
  // Retry network errors
  if (error.message.toLowerCase().includes('network') ||
      error.message.toLowerCase().includes('fetch') ||
      error.message.toLowerCase().includes('timeout') ||
      error.message.toLowerCase().includes('connection')) {
    return true
  }
  
  // Don't retry unknown errors by default
  return false
}

// Helper function to parse different error types into ApiError
function parseApiError(error: unknown): ApiError {
  if (error instanceof Response) {
    return {
      message: `HTTP ${error.status}: ${error.statusText}`,
      status: error.status,
      code: error.status.toString()
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      details: error.stack
    }
  }

  if (typeof error === 'object' && error !== null) {
    const errorObj = error as Record<string, unknown>
    
    return {
      message: typeof errorObj.message === 'string' ? errorObj.message : 'An error occurred',
      status: typeof errorObj.status === 'number' ? errorObj.status : undefined,
      code: typeof errorObj.code === 'string' ? errorObj.code : undefined,
      details: errorObj.details
    }
  }

  return {
    message: typeof error === 'string' ? error : 'An unknown error occurred'
  }
}

// Specific hook for fetch operations
export function useFetch() {
  const apiError = useApiError()

  const fetchWithRetry = useCallback(async <T = unknown>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> => {
    return apiError.executeWithRetry(async () => {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw {
          message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          code: response.status.toString(),
          details: errorData
        }
      }

      return response.json()
    })
  }, [apiError])

  return {
    ...apiError,
    fetchWithRetry
  }
}