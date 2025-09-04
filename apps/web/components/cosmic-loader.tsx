"use client"

import { useState, useEffect, useCallback, memo, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Pre-generated random data to avoid hydration mismatch
const RANDOM_DATA = [
  "9847.23", "3251.89", "7456.12", "1294.67", "8573.45", "2916.78", "6248.91", "4135.56"
]

const SENSOR_DATA = [
  "RA: 847", "DEC: 234", "MAG: 678", "VEL: 123", "AZ: 456", "ALT: 789"
]

// Pre-generated star positions to avoid hydration mismatch
const STAR_POSITIONS = Array.from({ length: 200 }, (_, i) => ({
  top: Math.floor((i * 23 + 17) % 100),
  left: Math.floor((i * 41 + 31) % 100),
  opacity: 0.2 + ((i * 13) % 60) / 100,
  duration: 2 + ((i * 7) % 30) / 10,
  delay: (i * 11) % 20 / 10
}))

// Pre-generated shooting star positions
const SHOOTING_STAR_POSITIONS = Array.from({ length: 5 }, (_, i) => ({
  top: 20 + ((i * 23 + 15) % 60),
  left: -10 + ((i * 17 + 5) % 20)
}))

interface CosmicLoaderProps {
  onComplete?: () => void
  duration?: number
}

const defaultOnComplete = () => {}

const CosmicLoader = memo(function CosmicLoader({ onComplete = defaultOnComplete, duration = 4000 }: CosmicLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'searching' | 'found' | 'complete'>('searching')
  const [loadingText, setLoadingText] = useState('Exploring the cosmos...')
  
  // Memoize static arrays to avoid re-creation on each render
  const randomData = useMemo(() => RANDOM_DATA, [])
  const sensorData = useMemo(() => SENSOR_DATA, [])
  const starPositions = useMemo(() => STAR_POSITIONS, [])
  const shootingStarPositions = useMemo(() => SHOOTING_STAR_POSITIONS, [])

  const stableOnComplete = useCallback(onComplete, [onComplete])

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
      console.log('CosmicLoader completing animation, calling onComplete')
      clearInterval(progressInterval)
      stableOnComplete()
    }, totalDuration)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(completeTimer)
    }
  }, [duration, stableOnComplete, phase])

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
      {/* Spaceship HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* HUD Corner Elements */}
        <div className="absolute top-8 left-8 w-32 h-24 border-l-2 border-t-2 border-cyan-400/80" />
        <div className="absolute top-8 right-8 w-32 h-24 border-r-2 border-t-2 border-cyan-400/80" />
        <div className="absolute bottom-8 left-8 w-32 h-24 border-l-2 border-b-2 border-cyan-400/80" />
        <div className="absolute bottom-8 right-8 w-32 h-24 border-r-2 border-b-2 border-cyan-400/80" />
        
        {/* HUD Grid Overlay */}
        <div className="absolute inset-0 bg-cyan-400/10">
          <div className="w-full h-full relative">
            {/* Horizontal grid lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={`h-grid-${i}`}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                style={{ top: `${(i + 1) * 10}%` }}
              />
            ))}
            {/* Vertical grid lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={`v-grid-${i}`}
                className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
                style={{ left: `${(i + 1) * 8.33}%` }}
              />
            ))}
          </div>
        </div>

        {/* Central Scanner Frame */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-80">
          <div className="relative w-full h-full">
            {/* Scanner border */}
            <div className="absolute inset-0 border-2 border-cyan-400/60 rounded-lg">
              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400" />
            </div>
            
            {/* Scanning line animation */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              animate={{ y: [0, 320, 0] }}
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
          {randomData.map((data, i) => (
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
              {data}
            </motion.div>
          ))}
        </div>

        {/* Right side data stream */}
        <div className="absolute right-4 top-1/3 space-y-1">
          {sensorData.map((data, i) => (
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
              {data}
            </motion.div>
          ))}
        </div>

        {/* Radar sweep animation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-80">
          <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-40 bg-gradient-to-t from-cyan-400/80 to-transparent transform -translate-x-1/2 origin-bottom"
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
        {starPositions.map((star, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
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
        {shootingStarPositions.map((shootingStar, i) => (
          <motion.div
            key={`shooting-star-${i}`}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              top: `${shootingStar.top}%`,
              left: `${shootingStar.left}%`,
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
          <div className="relative w-[32rem] h-80 mx-auto">
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
                      x: [120, 160, 200, 240, 280, 340, 380],
                      y: [120, 140, 160, 180, 220, 200, 140],
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
                      x: [100, 140, 180, 220, 260, 320, 360],
                      y: [100, 120, 140, 160, 200, 180, 120],
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
              { name: 'Dubhe', x: 380, y: 140, size: 'w-6 h-6', primary: true },
              { name: 'Merak', x: 340, y: 200, size: 'w-4 h-4' },
              { name: 'Phecda', x: 280, y: 220, size: 'w-4 h-4' },
              { name: 'Megrez', x: 240, y: 180, size: 'w-3 h-3' },
              { name: 'Alioth', x: 200, y: 160, size: 'w-4 h-4' },
              { name: 'Mizar', x: 160, y: 140, size: 'w-4 h-4' },
              { name: 'Alkaid', x: 120, y: 120, size: 'w-4 h-4' }
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
                  viewBox="0 0 440 320"
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
                  <g stroke="url(#lineGradient)" strokeWidth="3" fill="none" strokeLinecap="round">
                    {/* Bowl of the Big Dipper - 勺子主体 */}
                    {/* Dubhe to Merak */}
                    <motion.line 
                      x1="380" y1="140" x2="340" y2="200"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                    {/* Merak to Phecda */}
                    <motion.line 
                      x1="340" y1="200" x2="280" y2="220"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    />
                    {/* Phecda to Megrez */}
                    <motion.line 
                      x1="280" y1="220" x2="240" y2="180"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    />
                    {/* Megrez back to Dubhe - 完成勺子主体 */}
                    <motion.line 
                      x1="240" y1="180" x2="380" y2="140"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                    />
                    
                    {/* Handle of the Big Dipper - 勺子手柄 */}
                    {/* Megrez to Alioth */}
                    <motion.line 
                      x1="240" y1="180" x2="200" y2="160"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                    />
                    {/* Alioth to Mizar */}
                    <motion.line 
                      x1="200" y1="160" x2="160" y2="140"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                    />
                    {/* Mizar to Alkaid */}
                    <motion.line 
                      x1="160" y1="140" x2="120" y2="120"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 1.7 }}
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
                  style={{ left: 380, top: 140 }}
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
          <div className="w-[32rem] mx-auto space-y-3">
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

        </div>
      </div>

    </div>
  )
})

export default CosmicLoader