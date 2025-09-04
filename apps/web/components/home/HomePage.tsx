"use client"

import { lazy, Suspense } from "react"
import dynamic from 'next/dynamic'
import './styles.css'

// Critical above-the-fold content - load immediately
import HeroSection from './HeroSection'

// Dynamic imports with prefetch for visible sections
const FeaturesSection = dynamic(() => import('./FeaturesSection'), {
  loading: () => <div className="min-h-[400px] bg-white" />,
})

const ProductSuiteSection = dynamic(() => import('./ProductSuiteSection'), {
  loading: () => <div className="min-h-[600px] bg-gradient-to-br from-gray-50 to-white" />,
})

const HowItWorksSection = dynamic(() => import('./HowItWorksSection'), {
  loading: () => <div className="min-h-[500px] bg-white" />,
})

const NetworkArchitectureSection = dynamic(() => import('./NetworkArchitectureSection'), {
  loading: () => <div className="min-h-[800px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />,
})

const CommunitySection = dynamic(() => import('./CommunitySection'), {
  loading: () => <div className="min-h-[400px] bg-gradient-to-br from-indigo-50 via-white to-purple-50" />,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CompaniesSection = dynamic(() => import('./CompaniesSection'), {
  loading: () => <div className="min-h-[200px] bg-white" />,
})

// Lazy load heavy components
const NetworkStats = lazy(() => import('../network-stats'))
const Ecosystem = lazy(() => import('../ecosystem'))
const Footer = lazy(() => import('../footer'))

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <HeroSection />

      {/* Network Statistics */}
      <Suspense fallback={
        <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-pulse">Loading statistics...</div>
          </div>
        </div>
      }>
        <NetworkStats />
      </Suspense>

      {/* Features Section */}
      <FeaturesSection />

      {/* Product Suite Section */}
      <ProductSuiteSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Network Architecture Section */}
      <NetworkArchitectureSection />

      {/* Ecosystem Section */}
      <Suspense fallback={
        <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-pulse">Loading ecosystem...</div>
          </div>
        </div>
      }>
        <Ecosystem />
      </Suspense>

      {/* Community Section */}
      <CommunitySection />

      {/* Companies Section - Temporarily disabled */}
      {/* <CompaniesSection /> */}

      {/* Footer */}
      <Suspense fallback={
        <div className="py-12 bg-slate-900">
          <div className="max-w-7xl mx-auto text-center text-white">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      }>
        <Footer />
      </Suspense>
    </div>
  )
}