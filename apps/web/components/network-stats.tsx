"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, Zap, DollarSign } from "lucide-react"


// Simulated real-time incrementing component
function LiveCounter({ 
  baseValue, 
  suffix = "", 
  prefix = "",
  incrementRate = 1, // increment every X seconds
  formatMillion = false // format large numbers as millions
}: { 
  baseValue: number
  suffix?: string
  prefix?: string
  incrementRate?: number
  formatMillion?: boolean
}) {
  const [count, setCount] = useState(baseValue)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3) + 1) // Random increment 1-3
    }, incrementRate * 1000)
    
    return () => clearInterval(interval)
  }, [incrementRate])
  
  const formatNumber = (num: number) => {
    if (formatMillion && num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    return num.toLocaleString()
  }
  
  return (
    <motion.span
      key={count}
      initial={{ scale: 1.1, color: "#10b981" }}
      animate={{ scale: 1, color: "#ffffff" }}
      transition={{ duration: 0.3 }}
    >
      {prefix}{formatNumber(count)}{suffix}
    </motion.span>
  )
}

export default function NetworkStats() {
  const stats = [
    {
      icon: Zap,
      label: "Transactions",
      value: <LiveCounter baseValue={10000000} suffix="+" incrementRate={2} formatMillion={true} />,
      change: "Live",
      changeType: "positive" as const
    },
    {
      icon: TrendingUp,
      label: "Event-Driven Operations",
      value: <LiveCounter baseValue={50000000} suffix="+" incrementRate={1.5} formatMillion={true} />,
      change: "Real-time",
      changeType: "positive" as const
    },
    {
      icon: Users,
      label: "Users",
      value: <LiveCounter baseValue={50000} suffix="+" incrementRate={3} />,
      change: "Growing",
      changeType: "positive" as const
    },
    {
      icon: DollarSign,
      label: "Income (USD)",
      value: <LiveCounter baseValue={500000} prefix="$" suffix="" incrementRate={4} />,
      change: "+15.2%",
      changeType: "positive" as const
    }
  ]

  return (
    <div className="py-16 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Network Statistics
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-time metrics showcasing the growth and health of the Dubhe network
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