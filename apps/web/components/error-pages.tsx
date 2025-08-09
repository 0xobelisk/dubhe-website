import Link from 'next/link'
import { Button } from '@workspace/ui/components/button'

interface ErrorPageProps {
  statusCode: number
  title: string
  description: string
  suggestion?: string
  showRetry?: boolean
  showHome?: boolean
  showContact?: boolean
  onRetry?: () => void
}

export function ErrorPage({
  statusCode,
  title,
  description,
  suggestion,
  showRetry = false,
  showHome = true,
  showContact = false,
  onRetry
}: ErrorPageProps) {
  const getErrorIcon = () => {
    switch (Math.floor(statusCode / 100)) {
      case 4: // 4xx Client Errors
        return (
          <svg className="w-12 h-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="img" aria-label="Client error icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M12 9v3.75m-6.75 1.5h13.5m-13.5 0a.75.75 0 010-1.5m13.5 1.5a.75.75 0 010-1.5M6.75 21h10.5a2.25 2.25 0 002.25-2.25v-8.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v8.25A2.25 2.25 0 006.75 21z" />
          </svg>
        )
      case 5: // 5xx Server Errors
        return (
          <svg className="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="img" aria-label="Server error icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        )
      default:
        return (
          <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="img" aria-label="General error icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        )
    }
  }

  const getStatusMessage = () => {
    switch (statusCode) {
      case 400: return 'Bad Request'
      case 401: return 'Unauthorized'
      case 403: return 'Forbidden'
      case 404: return 'Not Found'
      case 405: return 'Method Not Allowed'
      case 429: return 'Too Many Requests'
      case 500: return 'Internal Server Error'
      case 502: return 'Bad Gateway'
      case 503: return 'Service Unavailable'
      case 504: return 'Gateway Timeout'
      default: return 'Error'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
      <div className="max-w-lg w-full mx-4">
        {/* Error Icon and Status */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-800/50 rounded-full mb-6">
            {getErrorIcon()}
          </div>
          
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-slate-700/50 rounded-full text-sm font-mono text-gray-300 mb-2">
              {statusCode} • {getStatusMessage()}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {title}
          </h1>
          
          <p className="text-gray-300 text-lg mb-2">
            {description}
          </p>
          
          {suggestion && (
            <p className="text-gray-400 text-sm">
              {suggestion}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {showRetry && (
              <Button 
                onClick={onRetry}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Try Again
              </Button>
            )}
            
            {showHome && (
              <Link href="/en" className={showRetry ? "flex-1" : "w-full"}>
                <Button 
                  variant={showRetry ? "outline" : "default"}
                  className={`w-full ${showRetry ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white' : 'bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white'} py-3 px-6 rounded-lg transition-all duration-200`}
                >
                  Go to Homepage
                </Button>
              </Link>
            )}
          </div>
          
          {showContact && (
            <Link 
              href="/en/contact"
              className="block w-full text-center text-gray-400 hover:text-gray-300 text-sm py-2 underline transition-colors duration-200"
            >
              Contact Support
            </Link>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl -z-10"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl -z-10"></div>
      </div>
    </div>
  )
}

// Specific error page components
export function Forbidden403() {
  return (
    <ErrorPage
      statusCode={403}
      title="Access Forbidden"
      description="You don't have permission to access this resource."
      suggestion="Please check your credentials or contact an administrator."
      showHome={true}
      showContact={true}
    />
  )
}

export function RateLimited429() {
  return (
    <ErrorPage
      statusCode={429}
      title="Too Many Requests"
      description="You're making requests too quickly. Please slow down."
      suggestion="Wait a few moments before trying again."
      showRetry={true}
      showHome={true}
      onRetry={() => window.location.reload()}
    />
  )
}

export function ServiceUnavailable503() {
  return (
    <ErrorPage
      statusCode={503}
      title="Service Unavailable"
      description="We're temporarily down for maintenance."
      suggestion="We'll be back online shortly. Thanks for your patience!"
      showRetry={true}
      showHome={true}
      showContact={true}
      onRetry={() => window.location.reload()}
    />
  )
}

export function BadGateway502() {
  return (
    <ErrorPage
      statusCode={502}
      title="Bad Gateway"
      description="There's a problem with our server connection."
      suggestion="This is usually temporary. Please try again in a few moments."
      showRetry={true}
      showHome={true}
      onRetry={() => window.location.reload()}
    />
  )
}

export function Unauthorized401() {
  return (
    <ErrorPage
      statusCode={401}
      title="Authentication Required"
      description="You need to sign in to access this page."
      suggestion="Please log in with your credentials."
      showHome={true}
    />
  )
}