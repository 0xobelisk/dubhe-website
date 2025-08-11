"use client"

import { motion } from "framer-motion"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CheckCircle, XCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ArchitectureComparisonSection() {
  const t = useTranslations('home.competitiveAdvantage')
  
  const comparisonData = [
    {
      feature: t('features.codeGeneration.title'),
      dubhe: t('features.codeGeneration.dubhe'),
      others: t('features.codeGeneration.others'),
      dubheStatus: "excellent"
    },
    {
      feature: t('features.uxPerformance.title'), 
      dubhe: t('features.uxPerformance.dubhe'),
      others: t('features.uxPerformance.others'),
      dubheStatus: "excellent"
    },
    {
      feature: t('features.multiChainSupport.title'),
      dubhe: t('features.multiChainSupport.dubhe'),
      others: t('features.multiChainSupport.others'),
      dubheStatus: "good"
    },
    {
      feature: t('features.developerExperience.title'),
      dubhe: t('features.developerExperience.dubhe'),
      others: t('features.developerExperience.others'),
      dubheStatus: "excellent"
    },
    {
      feature: t('features.realTimeFeatures.title'),
      dubhe: t('features.realTimeFeatures.dubhe'),
      others: t('features.realTimeFeatures.others'),
      dubheStatus: "good"
    }
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
          {t('title')}
        </h3>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">{t('table.feature')}</th>
                <th className="text-center py-4 px-6 text-green-400 font-semibold">{t('table.dubhe')}</th>
                <th className="text-center py-4 px-6 text-gray-400 font-semibold">{t('table.others')}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <motion.tr 
                  key={row.feature}
                  className="border-b border-gray-800/50"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <td className="py-4 px-6 text-white font-medium">{row.feature}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      row.dubheStatus === 'excellent' 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {row.dubhe}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="bg-gray-700/50 text-gray-400 px-3 py-1 rounded-full text-sm">
                      {row.others}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}