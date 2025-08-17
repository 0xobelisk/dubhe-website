"use client"

import { motion } from "framer-motion"

const stars = [
  { name: 'Dubhe', x: 280, y: 60, size: 'w-6 h-6', glow: 'shadow-purple-500/50', primary: true },
  { name: 'Merak', x: 260, y: 130, size: 'w-4 h-4', glow: 'shadow-blue-500/50' },
  { name: 'Phecda', x: 200, y: 150, size: 'w-4 h-4', glow: 'shadow-purple-400/50' },
  { name: 'Megrez', x: 160, y: 100, size: 'w-3 h-3', glow: 'shadow-blue-400/50' },
  { name: 'Alioth', x: 130, y: 80, size: 'w-4 h-4', glow: 'shadow-purple-500/50' },
  { name: 'Mizar', x: 100, y: 60, size: 'w-4 h-4', glow: 'shadow-blue-400/50' },
  { name: 'Alkaid', x: 60, y: 80, size: 'w-4 h-4', glow: 'shadow-purple-400/50' }
]

export default function Constellation() {
  return (
    <div className="relative aspect-video bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
      {/* Star field background */}
      <div className="absolute inset-0">
        {/* Background stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`bg-star-${i}`}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: i % 5 === 0 ? 'rgba(147, 51, 234, 0.8)' : 'rgba(255, 255, 255, 0.6)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              boxShadow: i % 7 === 0 ? '0 0 6px rgba(147, 51, 234, 0.5)' : '0 0 3px rgba(255, 255, 255, 0.3)'
            }}
          />
        ))}
        
        {/* Shooting stars */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`shooting-star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              animation: `shootingStar ${3 + Math.random() * 2}s infinite ${i * 2}s`,
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(59, 130, 246, 0.6)'
            }}
          />
        ))}
      </div>

      {/* Big Dipper constellation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-80 h-48">
          {/* Connection lines between stars */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 192">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Big Dipper constellation lines */}
            <g stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDuration: '3s' }}>
              {/* Bowl: Dubhe -> Merak -> Phecda -> Megrez -> back to Dubhe */}
              <line x1="280" y1="60" x2="260" y2="130" />
              <line x1="260" y1="130" x2="200" y2="150" />
              <line x1="200" y1="150" x2="160" y2="100" />
              <line x1="160" y1="100" x2="280" y2="60" />
              {/* Handle: Megrez -> Alioth -> Mizar -> Alkaid */}
              <line x1="160" y1="100" x2="130" y2="80" />
              <line x1="130" y1="80" x2="100" y2="60" />
              <line x1="100" y1="60" x2="60" y2="80" />
            </g>
          </svg>

          {/* Big Dipper stars */}
          {stars.map((star, index) => (
            <motion.div
              key={star.name}
              className={`absolute ${star.size} rounded-full transform -translate-x-1/2 -translate-y-1/2`}
              style={{ left: star.x, top: star.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                boxShadow: star.primary ? '0 0 20px 5px rgba(147, 51, 234, 0.8)' : undefined
              }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                boxShadow: { duration: 2, repeat: Infinity, repeatType: 'reverse' }
              }}
            >
              <div className={`w-full h-full rounded-full ${
                star.primary 
                  ? 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg' 
                  : 'bg-gradient-to-br from-blue-400 to-purple-500'
              } ${star.glow} shadow-lg`}>
                {/* Extra glow for Dubhe */}
                {star.primary && (
                  <div className="absolute inset-0 rounded-full bg-purple-400/50 animate-ping"></div>
                )}
              </div>
              
              {/* Star name label */}
              <div className={`absolute ${star.primary ? 'top-8' : 'top-6'} left-1/2 transform -translate-x-1/2 whitespace-nowrap`}>
                <span className={`text-xs ${star.primary ? 'text-purple-300 font-bold' : 'text-blue-200'} drop-shadow-lg`}>
                  {star.name}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Dubhe highlight effect */}
          <motion.div
            className="absolute w-8 h-8 rounded-full border-2 border-purple-400/60 transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: 280, top: 60 }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  )
}