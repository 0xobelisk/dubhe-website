"use client"

import { motion } from "framer-motion"
import { Code, Zap, Globe } from "lucide-react"
import { useTranslations } from 'next-intl'
import ArchitectureComparisonSection from "./ArchitectureComparisonSection"

export default function ProductSuiteSection() {
  const t = useTranslations('home.productSuite')
  
  const products = [
    {
      id: "engine",
      icon: Code,
      title: t('products.engine.title'),
      subtitle: t('products.engine.subtitle'),
      description: t('products.engine.description'),
      features: t.raw('products.engine.features') as string[],
      highlight: t('products.engine.highlight'),
      gradient: "from-purple-500 to-blue-500",
      hoverBorder: "hover:border-blue-500/50"
    },
    {
      id: "channel",
      icon: Zap,
      title: t('products.channel.title'),
      subtitle: t('products.channel.subtitle'),
      description: t('products.channel.description'),
      features: t.raw('products.channel.features') as string[],
      highlight: t('products.channel.highlight'),
      gradient: "from-purple-500 to-pink-500",
      hoverBorder: "hover:border-purple-500/50"
    },
    {
      id: "os",
      icon: Globe,
      title: t('products.os.title'),
      subtitle: t('products.os.subtitle'),
      description: t('products.os.description'),
      features: t.raw('products.os.features') as string[],
      highlight: t('products.os.highlight'),
      gradient: "from-green-500 to-emerald-500",
      hoverBorder: "hover:border-green-500/50"
    }
  ]
  return (
    <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-purple-500/20">
            {t('badge')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 ${product.hoverBorder} transition-all duration-300 flex flex-col`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${product.gradient} text-white mb-6`}>
                <product.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{product.title}</h3>
              <p className="text-purple-400 font-semibold mb-4">{product.subtitle}</p>
              <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                {product.description}
              </p>
              
              <div className="space-y-2 mb-6">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-500/20 mt-auto">
                <p className="text-white font-semibold">{product.highlight}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture Comparison */}
        <ArchitectureComparisonSection />
      </div>
    </div>
  )
}