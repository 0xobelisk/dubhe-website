'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import * as Sentry from '@sentry/nextjs'
import { Button } from '@workspace/ui/components/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error)
    
    // Send to Sentry
    Sentry.captureException(error, {
      tags: {
        section: 'global_error_page',
      },
      extra: {
        digest: error.digest,
      },
      level: 'error',
    })
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="max-w-lg w-full mx-4">
          {/* Error Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500/20 rounded-full mb-6">
              <svg 
                className="w-12 h-12 text-red-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" 
                />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-300 text-lg mb-2">
              We&apos;re experiencing some technical difficulties
            </p>
            
            <p className="text-gray-400 text-sm mb-8">
              Our team has been notified and is working on a fix
            </p>
          </div>

          {/* Error Details for Development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Debug Information:</h3>
              <p className="text-xs text-gray-400 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-500 mt-1">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={reset}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Try Again
              </Button>
              
              <Link href="/en" className="flex-1">
                <Button 
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-6 rounded-lg transition-all duration-200"
                >
                  Go to Homepage
                </Button>
              </Link>
            </div>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full text-gray-400 hover:text-gray-300 text-sm py-2 transition-colors duration-200"
            >
              Or reload the page
            </button>
          </div>

          {/* Support Information */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-2">
              Still having issues?
            </p>
            <Link 
              href="/en/contact"
              className="text-purple-400 hover:text-purple-300 text-sm underline transition-colors duration-200"
            >
              Contact our support team
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}