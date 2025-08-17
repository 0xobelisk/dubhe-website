"use client"

import { lazy, Suspense } from "react"
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import ProductSuiteSection from './ProductSuiteSection'
import HowItWorksSection from './HowItWorksSection'
import NetworkArchitectureSection from './NetworkArchitectureSection'
import CommunitySection from './CommunitySection'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CompaniesSection from './CompaniesSection'
import './styles.css'

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