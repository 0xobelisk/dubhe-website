"use client"

import { m as motion } from "framer-motion"
import { TrendingUp, Users, Zap, DollarSign } from "lucide-react"
import { useTranslations } from 'next-intl'


export default function NetworkStats() {
  const t = useTranslations('home.networkStats')
  
  const stats = [
    {
      icon: Zap,
      label: t('transactions.label'),
      value: "—",
      change: t('transactions.change'),
      changeType: "positive" as const
    },
    {
      icon: TrendingUp,
      label: t('operations.label'),
      value: "—",
      change: t('operations.change'),
      changeType: "positive" as const
    },
    {
      icon: Users,
      label: t('users.label'),
      value: "—",
      change: t('users.change'),
      changeType: "positive" as const
    },
    {
      icon: DollarSign,
      label: t('income.label'),
      value: "—",
      change: t('income.change'),
      changeType: "positive" as const
    }
  ]

  return (
    <div className="py-16 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            {t('title')}
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <stat.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
