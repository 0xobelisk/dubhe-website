"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CosmicLoaderProps {
  onComplete: () => void
  duration?: number
}

export default function CosmicLoader({ onComplete, duration = 4000 }: CosmicLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'searching' | 'found' | 'complete'>('searching')
  const [loadingText, setLoadingText] = useState('Exploring the cosmos...')

  useEffect(() => {
    const totalDuration = duration

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (totalDuration / 50))
        
        if (newProgress >= 70 && phase === 'searching') {
          setPhase('found')
          setLoadingText('Big Dipper found...')
        } else if (newProgress >= 90 && phase === 'found') {
          setPhase('complete')
          setLoadingText('Dubhe constellation locked!')
        }
        
        return Math.min(newProgress, 100)
      })
    }, 50)

    // Complete animation
    const completeTimer = setTimeout(() => {
      clearInterval(progressInterval)
      setTimeout(onComplete, 500)
    }, totalDuration)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(completeTimer)
    }
  }, [duration, onComplete, phase])

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
      {/* Spaceship HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* HUD Corner Elements */}
        <div className="absolute top-8 left-8 w-32 h-24 border-l-2 border-t-2 border-cyan-400/60" />
        <div className="absolute top-8 right-8 w-32 h-24 border-r-2 border-t-2 border-cyan-400/60" />
        <div className="absolute bottom-8 left-8 w-32 h-24 border-l-2 border-b-2 border-cyan-400/60" />
        <div className="absolute bottom-8 right-8 w-32 h-24 border-r-2 border-b-2 border-cyan-400/60" />
        
        {/* HUD Grid Overlay */}
        <div className="absolute inset-0 bg-cyan-400/5">
          <div className="w-full h-full relative">
            {/* Horizontal grid lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={`h-grid-${i}`}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                style={{ top: `${(i + 1) * 10}%` }}
              />
            ))}
            {/* Vertical grid lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={`v-grid-${i}`}
                className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
                style={{ left: `${(i + 1) * 8.33}%` }}
              />
            ))}
          </div>
        </div>

        {/* Central Scanner Frame */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-64">
          <div className="relative w-full h-full">
            {/* Scanner border */}
            <div className="absolute inset-0 border-2 border-cyan-400/40 rounded-lg">
              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400" />
            </div>
            
            {/* Scanning line animation */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              animate={{ y: [0, 256, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        {/* Data panels */}
        <div className="absolute top-8 left-8 space-y-4">
          <div className="bg-black/30 border border-cyan-400/30 rounded p-3 backdrop-blur-sm">
            <div className="text-xs text-cyan-400 font-mono">STAR CHART</div>
            <div className="text-xs text-green-400 font-mono">ONLINE</div>
          </div>
          <div className="bg-black/30 border border-cyan-400/30 rounded p-3 backdrop-blur-sm">
            <div className="text-xs text-cyan-400 font-mono">SENSORS</div>
            <div className="text-xs text-green-400 font-mono">ACTIVE</div>
          </div>
        </div>

        <div className="absolute top-8 right-8 space-y-4">
          <div className="bg-black/30 border border-cyan-400/30 rounded p-3 backdrop-blur-sm">
            <div className="text-xs text-cyan-400 font-mono">NAV COMP</div>
            <div className={`text-xs font-mono ${
              phase === 'searching' ? 'text-yellow-400' : 
              phase === 'found' ? 'text-blue-400' : 
              'text-green-400'
            }`}>
              {phase === 'searching' ? 'SEARCHING' : 
               phase === 'found' ? 'LOCATED' : 
               'LOCKED'}
            </div>
          </div>
          <div className="bg-black/30 border border-cyan-400/30 rounded p-3 backdrop-blur-sm">
            <div className="text-xs text-cyan-400 font-mono">TARGET</div>
            <div className={`text-xs font-mono ${
              phase === 'complete' ? 'text-green-400' : 'text-red-400'
            }`}>
              DUBHE
            </div>
          </div>
          <div className="bg-black/30 border border-cyan-400/30 rounded p-3 backdrop-blur-sm">
            <div className="text-xs text-cyan-400 font-mono">DISTANCE</div>
            <div className="text-xs text-purple-400 font-mono">123.7 LY</div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/50 border border-cyan-400/30 rounded px-6 py-2 backdrop-blur-sm">
            <div className="text-xs text-cyan-400 font-mono text-center">
              DEEP SPACE SCANNER - SECTOR 7G - URSA MAJOR CONSTELLATION
            </div>
          </div>
        </div>

        {/* Left side data stream */}
        <div className="absolute left-4 top-1/4 space-y-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="text-xs font-mono text-green-400/60"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            >
              {`${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}.${String(Math.floor(Math.random() * 99)).padStart(2, '0')}`}
            </motion.div>
          ))}
        </div>

        {/* Right side data stream */}
        <div className="absolute right-4 top-1/3 space-y-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="text-xs font-mono text-blue-400/60"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            >
              {`${['RA', 'DEC', 'MAG', 'VEL', 'AZ', 'ALT'][i]}: ${Math.floor(Math.random() * 999)}`}
            </motion.div>
          ))}
        </div>

        {/* Radar sweep animation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-64">
          <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-t from-cyan-400/80 to-transparent transform -translate-x-1/2 origin-bottom"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "bottom center" }}
          />
        </div>

        {/* System alerts */}
        <AnimatePresence>
          {phase === 'found' && (
            <motion.div
              className="absolute top-1/4 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="bg-blue-900/50 border border-blue-400 rounded px-4 py-2 backdrop-blur-sm">
                <div className="text-sm text-blue-400 font-mono text-center">
                  ⚠ CONSTELLATION PATTERN DETECTED
                </div>
              </div>
            </motion.div>
          )}
          {phase === 'complete' && (
            <motion.div
              className="absolute top-1/4 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="bg-green-900/50 border border-green-400 rounded px-4 py-2 backdrop-blur-sm">
                <div className="text-sm text-green-400 font-mono text-center">
                  ✓ TARGET ACQUISITION SUCCESSFUL
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 200 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Nebula Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/20 to-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Shooting Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`shooting-star-${i}`}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${-10 + Math.random() * 20}%`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(59, 130, 246, 0.6)'
            }}
            animate={{
              x: [0, 1200],
              y: [0, -100],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.8,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-12">
          
          {/* Big Dipper Constellation with Search Animation */}
          <div className="relative w-80 h-48 mx-auto">
            {/* Search Beam Animation */}
            <AnimatePresence>
              {phase === 'searching' && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                    style={{
                      boxShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.6)'
                    }}
                    animate={{
                      x: [50, 120, 200, 280, 250, 180, 100],
                      y: [150, 130, 150, 60, 80, 100, 60],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Search Light Cone */}
                  <motion.div
                    className="absolute w-20 h-20 rounded-full bg-cyan-400/10 border border-cyan-400/30"
                    animate={{
                      x: [30, 100, 180, 260, 230, 160, 80],
                      y: [130, 110, 130, 40, 60, 80, 40],
                      scale: [1, 1.2, 1, 1.2, 1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Big Dipper Stars */}
            {[
              { name: 'Dubhe', x: 280, y: 60, size: 'w-6 h-6', primary: true },
              { name: 'Merak', x: 260, y: 130, size: 'w-4 h-4' },
              { name: 'Phecda', x: 200, y: 150, size: 'w-4 h-4' },
              { name: 'Megrez', x: 160, y: 100, size: 'w-3 h-3' },
              { name: 'Alioth', x: 130, y: 80, size: 'w-4 h-4' },
              { name: 'Mizar', x: 100, y: 60, size: 'w-4 h-4' },
              { name: 'Alkaid', x: 60, y: 80, size: 'w-4 h-4' }
            ].map((star, index) => (
              <motion.div
                key={star.name}
                className={`absolute ${star.size} rounded-full transform -translate-x-1/2 -translate-y-1/2`}
                style={{ left: star.x, top: star.y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: phase === 'found' || phase === 'complete' ? 1 : 0.3,
                  scale: phase === 'found' || phase === 'complete' ? 1 : 0.8,
                }}
                transition={{ 
                  duration: 0.5,
                  delay: phase === 'found' ? index * 0.1 : 0,
                }}
              >
                <div className={`w-full h-full rounded-full ${
                  star.primary 
                    ? 'bg-gradient-to-br from-purple-400 to-purple-600' 
                    : 'bg-gradient-to-br from-blue-400 to-purple-500'
                } shadow-lg`}>
                  {/* Extra glow for Dubhe when found */}
                  {star.primary && (phase === 'found' || phase === 'complete') && (
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-purple-400/50"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </div>
                
                {/* Star name label - only show when found */}
                <AnimatePresence>
                  {(phase === 'found' || phase === 'complete') && (
                    <motion.div 
                      className={`absolute ${star.primary ? 'top-8' : 'top-6'} left-1/2 transform -translate-x-1/2 whitespace-nowrap`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <span className={`text-xs ${star.primary ? 'text-purple-300 font-bold' : 'text-blue-200'} drop-shadow-lg`}>
                        {star.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Constellation Lines - only show when found */}
            <AnimatePresence>
              {(phase === 'found' || phase === 'complete') && (
                <motion.svg 
                  className="absolute inset-0 w-full h-full" 
                  viewBox="0 0 320 192"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  <g stroke="url(#lineGradient)" strokeWidth="2" fill="none">
                    <motion.line 
                      x1="280" y1="60" x2="260" y2="130"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                    <motion.line 
                      x1="260" y1="130" x2="200" y2="150"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    />
                    <motion.line 
                      x1="200" y1="150" x2="160" y2="100"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    />
                    <motion.line 
                      x1="160" y1="100" x2="280" y2="60"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                    />
                    <motion.line 
                      x1="160" y1="100" x2="130" y2="80"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                    />
                    <motion.line 
                      x1="130" y1="80" x2="100" y2="60"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                    />
                    <motion.line 
                      x1="100" y1="60" x2="60" y2="80"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 1.7 }}
                    />
                  </g>
                </motion.svg>
              )}
            </AnimatePresence>

            {/* Target Lock Effect for Dubhe */}
            <AnimatePresence>
              {phase === 'complete' && (
                <motion.div
                  className="absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: 280, top: 60 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-full h-full">
                    <motion.div
                      className="absolute inset-0 border-2 border-purple-400 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-2 border-2 border-cyan-400 rounded-full"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Corner brackets */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-purple-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-purple-400" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-purple-400" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-purple-400" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Loading Text */}
          <motion.div 
            className="text-center space-y-4"
            key={loadingText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              {loadingText}
            </h2>
            <p className="text-blue-200 text-sm">
              {phase === 'searching' && 'Scanning star fields, searching for Dubhe coordinates...'}
              {phase === 'found' && 'Big Dipper constellation revealed, Dubhe star shining...'}
              {phase === 'complete' && 'Target acquired! Entering Dubhe universe...'}
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-80 mx-auto space-y-3">
            <div className="w-full bg-gray-800/50 rounded-full h-2 backdrop-blur-sm border border-gray-700">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full relative overflow-hidden"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-100, 320] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Phase Indicators */}
          <div className="flex justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <motion.div 
                className={`w-3 h-3 rounded-full ${phase === 'searching' ? 'bg-cyan-400' : 'bg-green-400'}`}
                animate={phase === 'searching' ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className={`text-xs ${phase === 'searching' ? 'text-cyan-400' : 'text-green-400'}`}>
                Scanning
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div 
                className={`w-3 h-3 rounded-full ${phase === 'found' ? 'bg-purple-400' : phase === 'complete' ? 'bg-green-400' : 'bg-gray-600'}`}
                animate={phase === 'found' ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className={`text-xs ${phase === 'found' ? 'text-purple-400' : phase === 'complete' ? 'text-green-400' : 'text-gray-400'}`}>
                Located
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div 
                className={`w-3 h-3 rounded-full ${phase === 'complete' ? 'bg-green-400' : 'bg-gray-600'}`}
                animate={phase === 'complete' ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className={`text-xs ${phase === 'complete' ? 'text-green-400' : 'text-gray-400'}`}>
                Locked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Animation */}
      <AnimatePresence>
        {phase === 'complete' && progress >= 100 && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}