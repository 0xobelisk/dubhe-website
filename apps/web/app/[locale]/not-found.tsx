import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@workspace/ui/components/button'

export default function NotFound() {
  const t = useTranslations('errors')
  const nav = useTranslations('navigation')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4 text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-purple-500/20 blur-sm">
              404
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('notFound.title', { default: 'Page Not Found' })}
          </h2>
          
          <p className="text-xl text-gray-300 mb-2">
            {t('notFound.description', { 
              default: "The page you're looking for doesn't exist or has been moved." 
            })}
          </p>
          
          <p className="text-gray-400">
            {t('notFound.suggestion', { 
              default: "Don't worry, let's get you back on track." 
            })}
          </p>
        </div>

        {/* Search Suggestions */}
        <div className="mb-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white">
            {t('notFound.suggestions.title', { default: 'Popular Pages' })}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <Link href="/engine" className="text-purple-400 hover:text-purple-300 transition-colors">
              {nav('engine', { default: 'Engine' })}
            </Link>
            <Link href="/os" className="text-purple-400 hover:text-purple-300 transition-colors">
              {nav('os', { default: 'OS' })}
            </Link>
            <Link href="/channel" className="text-purple-400 hover:text-purple-300 transition-colors">
              {nav('channel', { default: 'Channel' })}
            </Link>
            <Link href="/labs" className="text-purple-400 hover:text-purple-300 transition-colors">
              {nav('labs', { default: 'Labs' })}
            </Link>
            <Link href="/grants" className="text-purple-400 hover:text-purple-300 transition-colors">
              {nav('grants', { default: 'Grants' })}
            </Link>
            <Link href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors">
              {nav('contact', { default: 'Contact' })}
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                {t('notFound.actions.home', { default: 'Go to Homepage' })}
              </Button>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-8 rounded-lg transition-all duration-200"
            >
              {t('notFound.actions.back', { default: 'Go Back' })}
            </button>
          </div>
          
          <Link 
            href="/contact"
            className="inline-block text-gray-400 hover:text-gray-300 text-sm underline transition-colors duration-200"
          >
            {t('notFound.actions.report', { 
              default: 'Report a broken link' 
            })}
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
      </div>
    </div>
  )
}