'use client'

import Link from 'next/link'

export default function BadGatewayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
      <div className="max-w-lg w-full mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-800/50 rounded-full mb-6">
            <svg className="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-slate-700/50 rounded-full text-sm font-mono text-gray-300 mb-2">
              502 • Bad Gateway
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Bad Gateway
          </h1>
          
          <p className="text-gray-300 text-lg mb-2">
            There&apos;s a problem with our server connection.
          </p>
          
          <p className="text-gray-400 text-sm">
            This is usually temporary. Please try again in a few moments.
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