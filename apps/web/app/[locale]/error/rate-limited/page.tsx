'use client'

import Link from 'next/link'

export default function RateLimitedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
      <div className="max-w-lg w-full mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-800/50 rounded-full mb-6">
            <svg className="w-12 h-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M12 9v3.75m-6.75 1.5h13.5m-13.5 0a.75.75 0 010-1.5m13.5 1.5a.75.75 0 010-1.5M6.75 21h10.5a2.25 2.25 0 002.25-2.25v-8.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v8.25A2.25 2.25 0 006.75 21z" />
            </svg>
          </div>
          
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-slate-700/50 rounded-full text-sm font-mono text-gray-300 mb-2">
              429 • Too Many Requests
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Too Many Requests
          </h1>
          
          <p className="text-gray-300 text-lg mb-2">
            You&apos;re making requests too quickly. Please slow down.
          </p>
          
          <p className="text-gray-400 text-sm">
            Wait a few moments before trying again.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => window.location.reload()}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Try Again
            </button>
            
            <Link href="/" className="flex-1">
              <button className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-6 rounded-lg transition-all duration-200 border">
                Go to Homepage
              </button>
            </Link>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl -z-10"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl -z-10"></div>
      </div>
    </div>
  )
}