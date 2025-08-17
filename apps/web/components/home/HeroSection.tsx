"use client"

import { motion } from "framer-motion"
import Navigation from '../navigation'
import HeroBackground from './HeroBackground'
import HeroContent from './HeroContent'
import Constellation from './Constellation'

export default function HeroSection() {
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Main Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
        {/* Background */}
        <HeroBackground />

        {/* Content Container */}
        <div className="relative z-10 min-h-screen flex items-center pt-20 sm:pt-24 lg:pt-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <HeroContent />

              {/* Right Content - Big Dipper 3D Constellation */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative lg:ml-12"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 to-purple-900 border border-purple-700">
                  <Constellation />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}