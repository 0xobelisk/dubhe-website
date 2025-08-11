import Link from 'next/link'
import { Button } from '@workspace/ui/components/button'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('errors')
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
      case 400: return t('status.400')
      case 401: return t('status.401')
      case 403: return t('status.403')
      case 404: return t('status.404')
      case 405: return t('status.405')
      case 429: return t('status.429')
      case 500: return t('status.500')
      case 502: return t('status.502')
      case 503: return t('status.503')
      case 504: return t('status.504')
      default: return t('status.default')
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
                {t('common.tryAgain')}
              </Button>
            )}
            
            {showHome && (
              <Link href="/en" className={showRetry ? "flex-1" : "w-full"}>
                <Button 
                  variant={showRetry ? "outline" : "default"}
                  className={`w-full ${showRetry ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white' : 'bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white'} py-3 px-6 rounded-lg transition-all duration-200`}
                >
                  {t('common.goHome')}
                </Button>
              </Link>
            )}
          </div>
          
          {showContact && (
            <Link 
              href="/en/contact"
              className="block w-full text-center text-gray-400 hover:text-gray-300 text-sm py-2 underline transition-colors duration-200"
            >
              {t('common.contactSupport')}
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
  const t = useTranslations('errors')
  return (
    <ErrorPage
      statusCode={403}
      title={t('403.title')}
      description={t('403.description')}
      suggestion={t('403.suggestion')}
      showHome={true}
      showContact={true}
    />
  )
}

export function RateLimited429() {
  const t = useTranslations('errors')
  return (
    <ErrorPage
      statusCode={429}
      title={t('429.title')}
      description={t('429.description')}
      suggestion={t('429.suggestion')}
      showRetry={true}
      showHome={true}
      onRetry={() => window.location.reload()}
    />
  )
}

export function ServiceUnavailable503() {
  const t = useTranslations('errors')
  return (
    <ErrorPage
      statusCode={503}
      title={t('503.title')}
      description={t('503.description')}
      suggestion={t('503.suggestion')}
      showRetry={true}
      showHome={true}
      showContact={true}
      onRetry={() => window.location.reload()}
    />
  )
}

export function BadGateway502() {
  const t = useTranslations('errors')
  return (
    <ErrorPage
      statusCode={502}
      title={t('502.title')}
      description={t('502.description')}
      suggestion={t('502.suggestion')}
      showRetry={true}
      showHome={true}
      onRetry={() => window.location.reload()}
    />
  )
}

export function Unauthorized401() {
  const t = useTranslations('errors')
  return (
    <ErrorPage
      statusCode={401}
      title={t('401.title')}
      description={t('401.description')}
      suggestion={t('401.suggestion')}
      showHome={true}
    />
  )
}