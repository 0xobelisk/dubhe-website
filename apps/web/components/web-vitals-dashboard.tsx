'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, AlertCircle, CheckCircle, TrendingUp, X } from 'lucide-react'

interface WebVital {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
}

interface VitalThresholds {
  good: number
  poor: number
  unit: string
  description: string
}

const VITAL_THRESHOLDS: Record<string, VitalThresholds> = {
  CLS: {
    good: 0.1,
    poor: 0.25,
    unit: '',
    description: 'Cumulative Layout Shift'
  },
  INP: {
    good: 200,
    poor: 500,
    unit: 'ms',
    description: 'Interaction to Next Paint'
  },
  LCP: {
    good: 2500,
    poor: 4000,
    unit: 'ms',
    description: 'Largest Contentful Paint'
  },
  FCP: {
    good: 1800,
    poor: 3000,
    unit: 'ms',
    description: 'First Contentful Paint'
  },
  TTFB: {
    good: 800,
    poor: 1800,
    unit: 'ms',
    description: 'Time to First Byte'
  }
}

export function WebVitalsDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [vitals, setVitals] = useState<WebVital[]>([])
  const [score, setScore] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Only show in development or if explicitly enabled
    if (process.env.NODE_ENV === 'production' && !localStorage.getItem('showVitalsDashboard')) {
      return
    }

    // Load vitals from session storage
    const loadVitals = () => {
      const stored = sessionStorage.getItem('web-vitals')
      if (stored) {
        const parsedVitals = JSON.parse(stored)
        setVitals(parsedVitals)
        calculateScore(parsedVitals)
      }
    }

    // Initial load
    loadVitals()

    // Listen for updates
    const interval = setInterval(loadVitals, 2000)

    // Listen for keyboard shortcut (Ctrl+Shift+V)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        setIsOpen(prev => !prev)
      }
    }
    
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      clearInterval(interval)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const calculateScore = (vitals: WebVital[]) => {
    if (vitals.length === 0) {
      setScore(0)
      return
    }

    const latestVitals = vitals.reduce((acc, vital) => {
      const existing = acc[vital.name]
      if (!existing || existing.timestamp < vital.timestamp) {
        acc[vital.name] = vital
      }
      return acc
    }, {} as Record<string, WebVital>)

    const scores = Object.values(latestVitals).map(vital => {
      if (vital.rating === 'good') return 100
      if (vital.rating === 'needs-improvement') return 50
      return 0
    })

    const avgScore = scores.reduce((a: number, b: number) => a + b, 0) / scores.length
    setScore(Math.round(avgScore))
  }

  const getLatestVitals = () => {
    const latest: Record<string, WebVital> = {}
    vitals.forEach(vital => {
      const existing = latest[vital.name]
      if (!existing || existing.timestamp < vital.timestamp) {
        latest[vital.name] = vital
      }
    })
    return Object.values(latest)
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'text-green-500'
      case 'needs-improvement':
        return 'text-yellow-500'
      case 'poor':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getRatingBgColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'bg-green-100 dark:bg-green-900/20'
      case 'needs-improvement':
        return 'bg-yellow-100 dark:bg-yellow-900/20'
      case 'poor':
        return 'bg-red-100 dark:bg-red-900/20'
      default:
        return 'bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good':
        return <CheckCircle className="w-4 h-4" />
      case 'needs-improvement':
        return <AlertCircle className="w-4 h-4" />
      case 'poor':
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getScoreColor = () => {
    if (score >= 90) return 'text-green-500'
    if (score >= 50) return 'text-yellow-500'
    return 'text-red-500'
  }

  const formatValue = (name: string, value: number) => {
    const threshold = VITAL_THRESHOLDS[name]
    if (!threshold) return value.toString()
    
    if (name === 'CLS') {
      return value.toFixed(3)
    }
    
    return `${Math.round(value)}${threshold.unit}`
  }

  if (process.env.NODE_ENV === 'production' && !localStorage.getItem('showVitalsDashboard')) {
    return null
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        title="Web Vitals Dashboard (Ctrl+Shift+V)"
      >
        <Activity className="w-5 h-5" />
        {score > 0 && (
          <span className={`absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full ${
            score >= 90 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {score}
          </span>
        )}
      </motion.button>

      {/* Dashboard modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
                <div className="flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-xl font-semibold">Web Vitals Dashboard</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`text-2xl font-bold ${getScoreColor()}`}>
                    Score: {score}
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {getLatestVitals().length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No Web Vitals data yet</p>
                    <p className="text-sm mt-2">Navigate around the site to collect metrics</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(VITAL_THRESHOLDS).map(([name, threshold]) => {
                      const vital = getLatestVitals().find(v => v.name === name)
                      if (!vital) return null

                      const percentage = name === 'CLS' 
                        ? (1 - vital.value / threshold.poor) * 100
                        : (1 - vital.value / threshold.poor) * 100

                      return (
                        <div
                          key={name}
                          className={`p-4 rounded-lg border ${getRatingBgColor(vital.rating)} ${
                            vital.rating === 'good' 
                              ? 'border-green-200 dark:border-green-800'
                              : vital.rating === 'needs-improvement'
                              ? 'border-yellow-200 dark:border-yellow-800'
                              : 'border-red-200 dark:border-red-800'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-lg">{name}</h3>
                                <span className={`flex items-center space-x-1 ${getRatingColor(vital.rating)}`}>
                                  {getRatingIcon(vital.rating)}
                                  <span className="text-sm capitalize">{vital.rating.replace('-', ' ')}</span>
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {threshold.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold">
                                {formatValue(name, vital.value)}
                              </div>
                              <div className="text-xs text-gray-500">
                                Good: &lt;{name === 'CLS' ? threshold.good : `${threshold.good}${threshold.unit}`}
                              </div>
                            </div>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                vital.rating === 'good'
                                  ? 'bg-green-500'
                                  : vital.rating === 'needs-improvement'
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Tips */}
                {showDetails && (
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Performance Tips
                    </h3>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>• Optimize images with lazy loading and WebP format</li>
                      <li>• Minimize JavaScript execution time</li>
                      <li>• Reduce server response times</li>
                      <li>• Eliminate render-blocking resources</li>
                      <li>• Use efficient cache policies</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t dark:border-gray-800 flex justify-between items-center">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  {showDetails ? 'Hide' : 'Show'} Tips
                </button>
                <button
                  onClick={() => {
                    sessionStorage.removeItem('web-vitals')
                    setVitals([])
                    setScore(0)
                  }}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear Data
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}