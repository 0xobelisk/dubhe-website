"use client"

import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'

export default function HowItWorksSection() {
  const t = useTranslations('home.howItWorks')
  
  const steps = [
    {
      id: 1,
      title: t('steps.schemaDefinition.title'),
      description: t('steps.schemaDefinition.description'),
      items: t.raw('steps.schemaDefinition.items') as string[],
      visualization: "checklist"
    },
    {
      id: 2,
      title: t('steps.codeGeneration.title'),
      description: t('steps.codeGeneration.description'),
      visualization: "generation"
    },
    {
      id: 3,
      title: t('steps.deploymentChannel.title'),
      description: t('steps.deploymentChannel.description'),
      visualization: "deployment"
    },
    {
      id: 4,
      title: t('steps.multiChainExecution.title'),
      description: t('steps.multiChainExecution.description'),
      visualization: "execution"
    }
  ]
  return (
    <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t('title')}
          </h2>
        </div>

        {/* Steps Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 items-stretch">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Card */}
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed flex-grow">
                  {step.description}
                </p>
                
                {/* Visual Elements */}
                {step.visualization === "checklist" && (
                  <div className="space-y-3 mb-6">
                    {step.items?.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded border-2 border-gray-500"
                          style={{ borderStyle: 'dashed' }}
                        />
                        <span className="text-gray-400 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {step.visualization === "generation" && (
                  <div className="relative">
                    <div className="flex items-center justify-center mb-6">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        {t('labels.dubheEngine')}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded animate-pulse" />
                      <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                )}

                {step.visualization === "deployment" && (
                  <>
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          {t('labels.you')}
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-500" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 text-xs mb-2">{t('labels.blockchain')}</div>
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                    </div>
                  </>
                )}

                {step.visualization === "execution" && (
                  <div className="text-center">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {['Sui', 'Aptos', 'Rooch', 'Move'].map((chain, i) => (
                        <div 
                          key={chain} 
                          className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-white px-3 py-2 rounded text-xs font-medium animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        >
                          {chain}
                        </div>
                      ))}
                    </div>
                    <div className="text-green-400 text-sm">{t('labels.multiChainReady')}</div>
                  </div>
                )}
              </div>
              
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div 
                  className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gray-600" 
                  style={{ 
                    background: 'linear-gradient(90deg, transparent 0%, #4b5563 20%, #4b5563 80%, transparent 100%)',
                    transform: 'translateY(-50%)'
                  }} 
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}