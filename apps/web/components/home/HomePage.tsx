"use client"

import { lazy, Suspense } from "react"
import dynamic from 'next/dynamic'
import './styles.css'

// Critical above-the-fold content - load immediately
import HeroSection from './HeroSection'

// Dynamic imports with prefetch for visible sections
const FeaturesSection = dynamic(() => import('./FeaturesSection').then((mod) => mod.default), {
  loading: () => <div className="min-h-[400px] bg-white" />,
})

const ProductSuiteSection = dynamic(() => import('./ProductSuiteSection').then((mod) => mod.default), {
  loading: () => <div className="min-h-[600px] bg-gradient-to-br from-gray-50 to-white" />,
})

const HowItWorksSection = dynamic(() => import('./HowItWorksSection').then((mod) => mod.default), {
  loading: () => <div className="min-h-[500px] bg-white" />,
})

const NetworkArchitectureSection = dynamic(() => import('./NetworkArchitectureSection').then((mod) => mod.default), {
  loading: () => <div className="min-h-[800px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />,
})

const CommunitySection = dynamic(() => import('./CommunitySection').then((mod) => mod.default), {
  loading: () => <div className="min-h-[400px] bg-gradient-to-br from-indigo-50 via-white to-purple-50" />,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CompaniesSection = dynamic(() => import('./CompaniesSection').then((mod) => mod.default), {
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
      <div className="home-secondary-section">
        <Suspense fallback={
          <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
            <div className="max-w-7xl mx-auto text-center">
              <div className="animate-pulse">Loading statistics...</div>
            </div>
          </div>
        }>
          <NetworkStats />
        </Suspense>
      </div>

      {/* Features Section */}
      <div className="home-secondary-section">
        <FeaturesSection />
      </div>

      {/* Product Suite Section */}
      <div className="home-secondary-section">
        <ProductSuiteSection />
      </div>

      {/* How It Works Section */}
      <div className="home-secondary-section">
        <HowItWorksSection />
      </div>

      {/* Network Architecture Section */}
      <div className="home-secondary-section">
        <NetworkArchitectureSection />
      </div>

      {/* Ecosystem Section */}
      <div className="home-secondary-section">
        <Suspense fallback={
          <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
            <div className="max-w-7xl mx-auto text-center">
              <div className="animate-pulse">Loading ecosystem...</div>
            </div>
          </div>
        }>
          <Ecosystem />
        </Suspense>
      </div>

      {/* Community Section */}
      <div className="home-secondary-section">
        <CommunitySection />
      </div>

      {/* Companies Section - Temporarily disabled */}
      {/* <CompaniesSection /> */}

      {/* Footer */}
      <div className="home-secondary-section">
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
    </div>
  )
}
