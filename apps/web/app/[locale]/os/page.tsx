"use client"

import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'
import { motion } from "framer-motion"
import { 
  Coins, 
  Vote, 
  Link as LinkIcon,
  ArrowRight,
  CheckCircle,
  Network,
  Shield,
  Sparkles
} from "lucide-react"
import Link from "next/link"

const customStyles = `
  @keyframes orbit {
    0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
  }
  
  @keyframes token-float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  @keyframes chain-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(244, 63, 94, 0.3); }
    50% { box-shadow: 0 0 40px rgba(244, 63, 94, 0.6); }
  }
  
  .os-gradient {
    background: linear-gradient(135deg, 
      #f43f5e 0%, 
      #8b5cf6 50%, 
      #3b82f6 100%);
  }
  
  .ecosystem-card {
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`

export default function OSPage() {
  const t = useTranslations('os')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const features = [
    {
      icon: <Coins className="w-6 h-6" />,
      title: t('features.items.token.title'),
      description: t('features.items.token.description'),
      details: [
        t('features.items.token.details.0'),
        t('features.items.token.details.1'),
        t('features.items.token.details.2'),
        t('features.items.token.details.3')
      ]
    },
    {
      icon: <LinkIcon className="w-6 h-6" />,
      title: t('features.items.bridging.title'),
      description: t('features.items.bridging.description'),
      details: [
        t('features.items.bridging.details.0'),
        t('features.items.bridging.details.1'),
        t('features.items.bridging.details.2'),
        t('features.items.bridging.details.3')
      ]
    },
    {
      icon: <Vote className="w-6 h-6" />,
      title: t('features.items.governance.title'),
      description: t('features.items.governance.description'),
      details: [
        t('features.items.governance.details.0'),
        t('features.items.governance.details.1'),
        t('features.items.governance.details.2'),
        t('features.items.governance.details.3')
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
    }
  ]

  const chains = [
    {
      name: t('chains.items.sui.name'),
      status: t('chains.items.sui.status'),
      logo: "🌊",
      features: [t('chains.items.sui.features.0'), t('chains.items.sui.features.1'), t('chains.items.sui.features.2')]
    },
    {
      name: t('chains.items.aptos.name'),
      status: t('chains.items.aptos.status'), 
      logo: "🚀",
      features: [t('chains.items.aptos.features.0'), t('chains.items.aptos.features.1'), t('chains.items.aptos.features.2')]
    },
    {
      name: t('chains.items.movement.name'),
      status: t('chains.items.movement.status'),
      logo: "⚡",
      features: [t('chains.items.movement.features.0'), t('chains.items.movement.features.1'), t('chains.items.movement.features.2')]
    },
    {
      name: t('chains.items.future.name'),
      status: t('chains.items.future.status'),
      logo: "🔮",
      features: [t('chains.items.future.features.0'), t('chains.items.future.features.1'), t('chains.items.future.features.2')]
    }
  ]


  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-purple-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-rose-500/30 to-purple-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-600/30 to-blue-600/40 rounded-full blur-3xl"></div>
          
          {/* Orbiting elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`orbit-${i}`}
                  className="absolute w-4 h-4 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full"
                  style={{
                    animation: `orbit ${8 + i * 2}s linear infinite`,
                    animationDelay: `${i * 1.3}s`
                  }}
                />
              ))}
            </div>
            
            {/* Floating tokens */}
            {isClient && Array.from({ length: 15 }).map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const topPositions = [12, 28, 44, 68, 84, 16, 32, 56, 72, 88, 8, 24, 48, 64, 92];
              const leftPositions = [18, 38, 58, 78, 98, 14, 34, 54, 74, 94, 22, 42, 62, 82, 6];
              const durations = [4, 5, 6, 4.5, 5.5, 6.5, 4.2, 5.2, 6.2, 4.8, 5.8, 4.3, 5.3, 6.3, 4.7];
              const delays = [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 0.2, 0.5, 0.8, 1.1, 1.4, 1.7, 0.1, 0.4];
              
              return (
                <div
                  key={`token-${i}`}
                  className="absolute text-rose-300/30 text-2xl"
                  style={{
                    top: `${topPositions[i] || 50}%`,
                    left: `${leftPositions[i] || 50}%`,
                    animation: `token-float ${durations[i] || 4}s ease-in-out infinite ${delays[i] || 0}s`
                  }}
                >
                  ◉
                </div>
              );
            })}
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
                className="inline-block bg-rose-500/10 text-rose-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-rose-500/20"
              >
                <Network className="w-4 h-4 inline mr-2" />
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
                  <span className="os-gradient bg-clip-text text-transparent">
                    {t('hero.titleHighlight')}
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-rose-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {t('hero.subtitle')}
                </motion.p>
              </div>

              {/* Ecosystem Stats */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-400 mb-2">{t('hero.stats.multiChain.value')}</div>
                  <div className="text-gray-300">{t('hero.stats.multiChain.label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{t('hero.stats.universal.value')}</div>
                  <div className="text-gray-300">{t('hero.stats.universal.label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{t('hero.stats.unified.value')}</div>
                  <div className="text-gray-300">{t('hero.stats.unified.label')}</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href="https://dubhe-docs.obelisk.build/dubhe" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
                  {t('hero.cta.primary')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                
                <Link href="https://dubhe-docs.obelisk.build/dubhe" target="_blank" rel="noopener noreferrer" className="border-2 border-rose-400/50 hover:border-rose-300 bg-rose-900/20 backdrop-blur-sm text-rose-100 hover:text-white hover:bg-rose-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center">
                  {t('hero.cta.secondary')}
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
              className="inline-block bg-gradient-to-r from-rose-100 to-purple-100 text-rose-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-rose-200"
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
                className="ecosystem-card bg-slate-800/50 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-rose-500 to-purple-500 text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                <div className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Supported Chains Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-rose-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-rose-500/10 text-rose-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-rose-500/20"
            >
              {t('chains.badge')}
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('chains.title')}
            </motion.h2>
          </div>

          {/* Chains Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chains.map((chain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-rose-500/20 hover:border-rose-400/50 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{chain.logo}</div>
                <h3 className="text-xl font-bold text-white mb-2">{chain.name}</h3>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  chain.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                  chain.status === 'Integration' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {chain.status}
                </div>
                <div className="space-y-2">
                  {chain.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="text-gray-300 text-sm">
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


      {/* CTA Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-rose-900 to-purple-900">
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
            <Link href="https://dubhe-docs.obelisk.build/dubhe" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
              {t('cta.primary')}
              <Sparkles className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/contact" className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center">
              {t('cta.secondary')}
            </Link>
          </motion.div>
        </div>
      </div>

    </>
  )
}