"use client"

import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'
import { motion } from "framer-motion"
import { 
  Globe, 
  Zap, 
  Users, 
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Wifi,
  Router,
  Signal,
  Sparkles,
  Shield
} from "lucide-react"
import Link from "next/link"

const customStyles = `
  @keyframes pulse-wave {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }
  
  @keyframes signal-flow {
    0% { transform: translateX(-100%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }
  
  @keyframes network-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
    50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
  }
  
  .channel-gradient {
    background: linear-gradient(135deg, 
      #22c55e 0%, 
      #3b82f6 50%, 
      #8b5cf6 100%);
  }
  
  .network-card {
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`

export default function ChannelPage() {
  const t = useTranslations('channel')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('features.items.latency.title'),
      description: t('features.items.latency.description'),
      details: [
        t('features.items.latency.details.0'),
        t('features.items.latency.details.1'),
        t('features.items.latency.details.2'),
        t('features.items.latency.details.3')
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('features.items.network.title'),
      description: t('features.items.network.description'),
      details: [
        t('features.items.network.details.0'),
        t('features.items.network.details.1'),
        t('features.items.network.details.2'),
        t('features.items.network.details.3')
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('features.items.security.title'),
      description: t('features.items.security.description'),
      details: [
        t('features.items.security.details.0'),
        t('features.items.security.details.1'),
        t('features.items.security.details.2'),
        t('features.items.security.details.3')
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('features.items.experience.title'),
      description: t('features.items.experience.description'),
      details: [
        t('features.items.experience.details.0'),
        t('features.items.experience.details.1'),
        t('features.items.experience.details.2'),
        t('features.items.experience.details.3')
      ]
    }
  ]

  const useCases = [
    {
      title: t('useCases.items.gaming.title'),
      description: t('useCases.items.gaming.description'),
      icon: <Router className="w-8 h-8" />,
      metrics: [t('useCases.items.gaming.metrics.0'), t('useCases.items.gaming.metrics.1'), t('useCases.items.gaming.metrics.2')]
    },
    {
      title: t('useCases.items.social.title'),
      description: t('useCases.items.social.description'),
      icon: <MessageCircle className="w-8 h-8" />,
      metrics: [t('useCases.items.social.metrics.0'), t('useCases.items.social.metrics.1'), t('useCases.items.social.metrics.2')]
    },
    {
      title: t('useCases.items.trading.title'),
      description: t('useCases.items.trading.description'),
      icon: <Signal className="w-8 h-8" />,
      metrics: [t('useCases.items.trading.metrics.0'), t('useCases.items.trading.metrics.1'), t('useCases.items.trading.metrics.2')]
    }
  ]

  const architecture = [
    {
      layer: t('architecture.layers.application.title'),
      description: t('architecture.layers.application.description'),
      color: "from-purple-500 to-pink-500"
    },
    {
      layer: t('architecture.layers.channel.title'), 
      description: t('architecture.layers.channel.description'),
      color: "from-blue-500 to-cyan-500"
    },
    {
      layer: t('architecture.layers.network.title'),
      description: t('architecture.layers.network.description'),
      color: "from-green-500 to-emerald-500"
    },
    {
      layer: t('architecture.layers.blockchain.title'),
      description: t('architecture.layers.blockchain.description'),
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-blue-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-green-500/30 to-blue-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/30 to-purple-600/40 rounded-full blur-3xl"></div>
          
          {/* Network visualization */}
          <div className="absolute inset-0 overflow-hidden">
            {isClient && Array.from({ length: 30 }).map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const topPositions = Array.from({length: 30}, (_, idx) => (idx * 13.7) % 100);
              const leftPositions = Array.from({length: 30}, (_, idx) => (idx * 17.3) % 100);
              const durations = Array.from({length: 30}, (_, idx) => 2 + (idx * 0.1) % 3);
              const delays = Array.from({length: 30}, (_, idx) => (idx * 0.067) % 2);
              
              return (
                <div
                  key={`node-${i}`}
                  className="absolute w-2 h-2 bg-green-400/40 rounded-full"
                  style={{
                    top: `${topPositions[i]}%`,
                    left: `${leftPositions[i]}%`,
                    animation: `pulse-wave ${durations[i]}s ease-out infinite ${delays[i]}s`
                  }}
                />
              );
            })}
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full">
              {isClient && Array.from({ length: 15 }).map((_, i) => {
                // Use deterministic values based on index to avoid hydration mismatch
                const x1Values = Array.from({length: 15}, (_, idx) => (idx * 23.7) % 100);
                const y1Values = Array.from({length: 15}, (_, idx) => (idx * 31.3) % 100);
                const x2Values = Array.from({length: 15}, (_, idx) => (idx * 19.7 + 50) % 100);
                const y2Values = Array.from({length: 15}, (_, idx) => (idx * 27.3 + 50) % 100);
                
                return (
                  <line
                    key={`line-${i}`}
                    x1={`${x1Values[i]}%`}
                    y1={`${y1Values[i]}%`}
                    x2={`${x2Values[i]}%`}
                    y2={`${y2Values[i]}%`}
                    stroke="rgba(34, 197, 94, 0.2)"
                    strokeWidth="1"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="text-center">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-green-500/20"
              >
                <Wifi className="w-4 h-4 inline mr-2" />
                {t('badge')}
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-5xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {t('hero.title')}
                  <br />
                  <span className="channel-gradient bg-clip-text text-transparent">
                    {t('hero.titleHighlight')}
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {t('hero.subtitle')}
                </motion.p>
              </div>

              {/* Performance Metrics */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">&lt;50ms</div>
                  <div className="text-gray-300">{t('hero.metrics.latency')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">1M+</div>
                  <div className="text-gray-300">{t('hero.metrics.users')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                  <div className="text-gray-300">{t('hero.metrics.uptime')}</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href="https://dubhe-docs.obelisk.build/dubhe" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
                  {t('hero.cta1')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                
                <Link href="https://dubhe-docs.obelisk.build/dubhe" target="_blank" rel="noopener noreferrer" className="border-2 border-green-400/50 hover:border-green-300 bg-green-900/20 backdrop-blur-sm text-green-100 hover:text-white hover:bg-green-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center">
                  {t('hero.cta2')}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-green-200"
            >
              {t('features.badge')}
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('features.title')}
              <br />
              {t('features.subtitle')}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('features.description')}
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="network-card bg-slate-800/50 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                <div className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-emerald-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green-500/20"
            >
              {t('useCases.badge')}
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('useCases.title')}
            </motion.h2>
          </div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 hover:border-green-400/50 transition-all duration-300"
              >
                <div className="text-green-400 mb-6">{useCase.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                <p className="text-gray-300 mb-6">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('architecture.title')}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('architecture.description')}
            </motion.p>
          </div>

          {/* Architecture Layers */}
          <div className="space-y-4">
            {architecture.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className={`bg-gradient-to-r ${layer.color} p-0.5 rounded-2xl`}>
                  <div className="bg-slate-800 rounded-2xl p-6 group-hover:bg-slate-700/80 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{layer.layer}</h3>
                        <p className="text-gray-300">{layer.description}</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded opacity-80"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Connection arrow */}
                {index < architecture.length - 1 && (
                  <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-green-400 to-blue-400"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Network Visualization Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-green-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('network.title')}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('network.description')}
            </motion.p>
          </div>

          {/* Network Visualization */}
          <div className="relative w-full max-w-4xl mx-auto h-80 mb-16">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-green-900/50 rounded-2xl border border-green-500/20 backdrop-blur-sm">
              
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-30">
                <div className="w-full h-full relative">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div 
                      key={`h-grid-${i}`}
                      className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
                      style={{ top: `${(i + 1) * 12.5}%` }}
                    />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div 
                      key={`v-grid-${i}`}
                      className="absolute h-full w-px bg-gradient-to-b from-transparent via-green-400/30 to-transparent"
                      style={{ left: `${(i + 1) * 8.33}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Network Nodes with Proper Connections */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                {/* SVG for Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  
                  {/* Connection Lines */}
                  <g stroke="url(#connectionGradient)" strokeWidth="0.3" fill="none">
                    {/* Dubhe (main node) to others */}
                    <motion.line 
                      x1="75" y1="25" x2="65" y2="55"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <motion.line 
                      x1="75" y1="25" x2="45" y2="65"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                    <motion.line 
                      x1="75" y1="25" x2="35" y2="45"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    />
                    
                    {/* Inter-node connections to form Big Dipper shape */}
                    <motion.line 
                      x1="65" y1="55" x2="45" y2="65"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    />
                    <motion.line 
                      x1="45" y1="65" x2="35" y2="45"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.0 }}
                    />
                    <motion.line 
                      x1="35" y1="45" x2="75" y2="25"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    />
                    <motion.line 
                      x1="35" y1="45" x2="25" y2="35"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                    />
                    <motion.line 
                      x1="25" y1="35" x2="15" y2="30"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.6 }}
                    />
                    <motion.line 
                      x1="15" y1="30" x2="10" y2="45"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.8 }}
                    />
                  </g>
                </svg>

                {/* Network Nodes */}
                {[
                  { name: 'Dubhe', x: 75, y: 25, size: 'w-6 h-6', color: 'from-purple-500 to-pink-500', primary: true },
                  { name: 'Merak', x: 65, y: 55, size: 'w-4 h-4', color: 'from-green-500 to-blue-500' },
                  { name: 'Phecda', x: 45, y: 65, size: 'w-4 h-4', color: 'from-green-500 to-blue-500' },
                  { name: 'Megrez', x: 35, y: 45, size: 'w-3 h-3', color: 'from-green-500 to-blue-500' },
                  { name: 'Alioth', x: 25, y: 35, size: 'w-4 h-4', color: 'from-green-500 to-blue-500' },
                  { name: 'Mizar', x: 15, y: 30, size: 'w-4 h-4', color: 'from-green-500 to-blue-500' },
                  { name: 'Alkaid', x: 10, y: 45, size: 'w-4 h-4', color: 'from-green-500 to-blue-500' }
                ].map((node, index) => (
                  <motion.div
                    key={node.name}
                    className={`absolute ${node.size} transform -translate-x-1/2 -translate-y-1/2`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${node.color} shadow-lg relative`}>
                      {/* Pulse effect for primary node */}
                      {node.primary && (
                        <motion.div 
                          className="absolute inset-0 rounded-full bg-purple-400/30"
                          animate={{ 
                            scale: [1, 2, 1],
                            opacity: [0.3, 0.8, 0.3]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      
                      {/* Data pulse rings */}
                      <motion.div 
                        className="absolute inset-0 rounded-full border-2 border-green-400/50"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.8, 0, 0.8]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          delay: index * 0.2,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                    
                    {/* Node labels */}
                    <motion.div 
                      className={`absolute ${node.primary ? 'top-8' : 'top-6'} left-1/2 transform -translate-x-1/2 whitespace-nowrap`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <span className={`text-xs ${node.primary ? 'text-purple-300 font-bold' : 'text-green-200'} drop-shadow-lg`}>
                        {node.name}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Data Flow Animation */}
                <motion.div
                  className="absolute w-2 h-2 bg-green-400 rounded-full"
                  style={{ left: '75%', top: '25%' }}
                  animate={{
                    x: [0, -120, -180, -240, -300, -360, -420],
                    y: [0, 120, 160, 80, 40, 20, 80],
                    scale: [1, 0.8, 0.6, 0.8, 1, 0.8, 0.6],
                    opacity: [1, 0.8, 0.6, 0.8, 1, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                />
              </motion.div>

              {/* Network Stats Overlay */}
              <div className="absolute top-4 right-4 bg-black/30 border border-green-400/30 rounded p-3 backdrop-blur-sm">
                <div className="text-xs text-green-400 font-mono">{t('network.status.title')}</div>
                <div className="text-xs text-green-400 font-mono">● {t('network.status.online')}</div>
                <div className="text-xs text-gray-300 font-mono">{t('network.status.latency')}</div>
              </div>

              <div className="absolute bottom-4 left-4 bg-black/30 border border-green-400/30 rounded p-3 backdrop-blur-sm">
                <div className="text-xs text-green-400 font-mono">{t('network.nodes.title')}</div>
                <div className="text-xs text-white font-mono">{t('network.nodes.connected')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-emerald-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('cta.title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('cta.subtitle')}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="https://dubhe-docs.obelisk.build/dubhe" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
              {t('cta.primary')}
              <Sparkles className="w-5 h-5 ml-2" />
            </Link>
            <Link href="https://dubhe-docs.obelisk.build/dubhe" target="_blank" rel="noopener noreferrer" className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center">
              {t('cta.secondary')}
            </Link>
          </motion.div>
        </div>
      </div>

    </>
  )
}