"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function FeaturesSection() {
  return (
    <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-purple-200">
            Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
            The Move Stack with
            <br />
            Limitless Potential
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column */}
          <div className="flex flex-col justify-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <Image 
                  src="/marketing/logos/move-white.svg" 
                  alt="Move Language Logo" 
                  width={128}
                  height={128}
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="text-sm font-medium text-slate-700 mb-2">100% Move-Compatible</div>
              <div className="text-slate-600 text-sm max-w-xs mx-auto">
                Use the existing Move ecosystem to your advantage.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-8xl font-bold text-slate-900 mb-2">0</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">zero gas fees</div>
              <div className="text-slate-600 text-sm max-w-xs mx-auto">
                Allows project cover this expense, supporting flexible expansion and customisation.
              </div>
            </motion.div>
          </div>

          {/* Center Column */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main logo with orbiting dots */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Center diamond */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 transform rotate-45 rounded-lg shadow-lg"></div>
                
                {/* Orbiting dots */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute top-0 left-1/2 w-3 h-3 bg-purple-400 rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute top-1/4 right-0 w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-purple-300 rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute bottom-1/4 left-0 w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="absolute top-1/4 left-0 w-2 h-2 bg-blue-300 rounded-full"></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-8xl font-bold text-purple-600 mb-2">~20ms</div>
              <div className="text-lg font-semibold text-slate-900">Real-time synchronization</div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-slate-900 mb-2">Unlimited</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">Transactions per second</div>
              <div className="text-slate-600 text-sm max-w-xs mx-auto">
                Depends on the number of dubhe channels running in parallel.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded transform rotate-45"></div>
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-900">1s Sync State finality</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}