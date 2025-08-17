"use client"

import { motion } from "framer-motion"
import { CheckCircle, Layers, Zap, Globe, Database, Code, Network, Shield } from "lucide-react"
import { useTranslations } from 'next-intl'



export default function NetworkArchitectureSection() {
  const t = useTranslations('home.networkArchitecture')
  
  const keyMetrics = Array.isArray(t.raw('keyMetrics')) ? t.raw('keyMetrics') as string[] : []
  const moveEcosystemFeatures = Array.isArray(t.raw('moveEcosystemFeatures')) ? t.raw('moveEcosystemFeatures') as string[] : []
  
  const architectureLayers = [
    {
      title: t('architectureLayers.moveApplications.title'),
      subtitle: t('architectureLayers.moveApplications.subtitle'),
      description: t('architectureLayers.moveApplications.description'),
      icon: Code,
      features: Array.isArray(t.raw('architectureLayers.moveApplications.features')) ? t.raw('architectureLayers.moveApplications.features') as string[] : [],
      gradient: "from-purple-500 to-blue-600"
    },
    {
      title: t('architectureLayers.dubheEngine.title'),
      subtitle: t('architectureLayers.dubheEngine.subtitle'),
      description: t('architectureLayers.dubheEngine.description'),
      icon: Zap,
      features: Array.isArray(t.raw('architectureLayers.dubheEngine.features')) ? t.raw('architectureLayers.dubheEngine.features') as string[] : [],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: t('architectureLayers.dubheChannel.title'),
      subtitle: t('architectureLayers.dubheChannel.subtitle'),
      description: t('architectureLayers.dubheChannel.description'),
      icon: Network,
      features: Array.isArray(t.raw('architectureLayers.dubheChannel.features')) ? t.raw('architectureLayers.dubheChannel.features') as string[] : [],
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      title: t('architectureLayers.dubheOS.title'),
      subtitle: t('architectureLayers.dubheOS.subtitle'),
      description: t('architectureLayers.dubheOS.description'),
      icon: Globe,
      features: Array.isArray(t.raw('architectureLayers.dubheOS.features')) ? t.raw('architectureLayers.dubheOS.features') as string[] : [],
      gradient: "from-teal-500 to-green-500"
    }
  ]

  const technicalFeatures = [
    {
      icon: Shield,
      title: t('technicalFeatures.securityFirst.title'),
      description: t('technicalFeatures.securityFirst.description')
    },
    {
      icon: Zap,
      title: t('technicalFeatures.highPerformance.title'),
      description: t('technicalFeatures.highPerformance.description')
    },
    {
      icon: Layers,
      title: t('technicalFeatures.composable.title'),
      description: t('technicalFeatures.composable.description')
    },
    {
      icon: Database,
      title: t('technicalFeatures.unifiedState.title'),
      description: t('technicalFeatures.unifiedState.description')
    }
  ]
  return (
    <div className="py-24 px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            {t('badge')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Top Overview Cards */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Key Metrics */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="text-center">
                <h3 className="text-lg font-bold text-amber-900 mb-4">{t('keyMetricsTitle')}</h3>
                <div className="space-y-3">
                  {keyMetrics.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 text-sm text-amber-800"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-amber-600" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Move Ecosystem */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <div className="text-center">
                <h3 className="text-lg font-bold text-emerald-900 mb-4">{t('moveEcosystemTitle')}</h3>
                <div className="space-y-3">
                  {moveEcosystemFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 text-sm text-emerald-800"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Architecture Layers */}
        <div className="space-y-8 mb-16">
          {architectureLayers.map((layer, index) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex items-center gap-8 lg:gap-12`}
            >
              {/* Pipelining Content */}
              <div className="lg:w-1/2 space-y-6">
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r ${layer.gradient} text-white`}>
                  <layer.icon className="w-5 h-5" />
                  <span className="font-semibold">{t('pipelining')} {index + 1}</span>
                </div>
                
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {layer.title}
                  </h3>
                  <div className="text-gray-600 font-medium mb-4">{layer.subtitle}</div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {layer.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {layer.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pipelining Visual */}
              <div className="lg:w-1/2 flex justify-center">
                <div className={`w-64 h-32 rounded-xl bg-gradient-to-r ${layer.gradient} flex items-center justify-center relative overflow-hidden shadow-xl`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <layer.icon className="w-16 h-16 text-white/90 relative z-10" />
                  <div className="absolute top-4 right-4 text-white/70 text-xs font-medium">
                    {t('pipelining')} {index + 1}
                  </div>
                </div>
              </div>

              {/* Connection Line */}
              {index < architectureLayers.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-px h-8 bg-gray-300" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              {t('completeStackSolution.title')}
            </h3>
            <p className="text-lg text-purple-100 max-w-3xl mx-auto">
              {t('completeStackSolution.description')}
            </p>
          </div>
        </motion.div>

        {/* Technical Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {technicalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-gray-700" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}