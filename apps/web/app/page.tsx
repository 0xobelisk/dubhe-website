"use client"

import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

// 动态导入组件以避免服务端渲染问题
const NewHomePage = dynamic(() => import('../components/new-home-page'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
    <div className="text-white">Loading...</div>
  </div>
})

const CosmicLoader = dynamic(() => import('../components/cosmic-loader'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
    <div className="text-white">Initializing...</div>
  </div>
})

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CosmicLoader 
              onComplete={handleLoadingComplete} 
              duration={4000}
            />
          </motion.div>
        ) : (
          <motion.div
            key="homepage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <NewHomePage />
          </motion.div>
        )}
      </AnimatePresence>
    </Suspense>
  )
}
