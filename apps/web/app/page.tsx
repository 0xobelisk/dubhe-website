"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CosmicLoader from '../components/cosmic-loader'
import NewHomePage from '../components/NewHomePage'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    console.log('Loading completed!')
    setIsLoading(false)
  }, [])

  // 备用定时器
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      console.log('Fallback timer triggered - skipping loader')
      setIsLoading(false)
    }, 6000)

    return () => clearTimeout(fallbackTimer)
  }, [])

  console.log('Page rendered, isLoading:', isLoading)

  return (
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
  )
}
