'use client'

import React from 'react'
import * as Sentry from '@sentry/nextjs'
import { Button } from '@workspace/ui/components/button'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Send error to Sentry with additional context
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
        errorBoundary: {
          errorMessage: error.message,
          errorName: error.name,
          timestamp: new Date().toISOString(),
        },
      },
      tags: {
        section: 'error_boundary',
        error_type: error.name || 'UnknownError',
      },
      level: 'error',
      fingerprint: [error.message, errorInfo.componentStack || 'unknown'],
    })

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)
    this.setState({ errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} reset={this.handleReset} />
      }

      return (
        <DefaultErrorFallback 
          error={this.state.error} 
          reset={this.handleReset}
          errorInfo={this.state.errorInfo}
        />
      )
    }

    return this.props.children
  }
}

interface DefaultErrorFallbackProps {
  error: Error
  reset: () => void
  errorInfo?: React.ErrorInfo
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DefaultErrorFallback({ error, reset, errorInfo }: DefaultErrorFallbackProps) {
  const isDev = process.env.NODE_ENV === 'development'

  // Handle specific error types for better user experience
  const getErrorMessage = (error: Error) => {
    if (error.message.includes('ChunkLoadError')) {
      return 'There was a problem loading the page. Please refresh and try again.'
    }
    if (error.message.includes('Network')) {
      return 'Network connection issue. Please check your internet and try again.'
    }
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return 'Unable to connect to our servers. Please try again in a moment.'
    }
    return 'An unexpected error has occurred. We apologize for the inconvenience.'
  }

  const handleReportError = () => {
    // Simple error reporting - could be enhanced with actual reporting service
    const errorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }
    
    console.log('Error report:', errorReport)
    // In a real app, send to error reporting service
    alert('Error report has been logged. Thank you!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <svg 
              className="h-8 w-8 text-red-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Something went wrong
            </h3>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {getErrorMessage(error)}
          </p>
        </div>

        {isDev && (
          <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
            <details>
              <summary className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                Error Details (Development)
              </summary>
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 font-mono">
                <p className="font-semibold">{error.name}: {error.message}</p>
                {error.stack && (
                  <pre className="mt-2 whitespace-pre-wrap overflow-x-auto">
                    {error.stack}
                  </pre>
                )}
              </div>
            </details>
          </div>
        )}

        <div className="flex space-x-2 mb-4">
          <Button
            onClick={reset}
            className="flex-1"
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex-1"
          >
            Reload Page
          </Button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleReportError}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline"
          >
            Report this issue
          </button>
        </div>
      </div>
    </div>
  )
}

// Hook for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo)
    
    // Send error to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo?.componentStack,
        },
      },
      tags: {
        section: 'error_handler_hook',
      },
      level: 'error',
    })
  }
}