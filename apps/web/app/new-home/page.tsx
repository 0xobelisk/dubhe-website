"use client"

import { useState } from 'react'
import NewHomePage from '../../components/new-home-page'
import CosmicLoader from '../../components/cosmic-loader'

export default function NewHome() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && (
        <CosmicLoader 
          onComplete={handleLoadingComplete} 
          duration={4000}
        />
      )}
      {!isLoading && <NewHomePage />}
    </>
  )
}