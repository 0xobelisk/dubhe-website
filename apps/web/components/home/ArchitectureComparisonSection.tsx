"use client"

import { motion } from "framer-motion"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CheckCircle, XCircle } from "lucide-react"

const comparisonData = [
  {
    feature: "Code Generation",
    dubhe: "80% automated",
    others: "Manual coding",
    dubheStatus: "excellent"
  },
  {
    feature: "UX Performance", 
    dubhe: "<50ms",
    others: "3-15 seconds",
    dubheStatus: "excellent"
  },
  {
    feature: "Multi-Chain Support",
    dubhe: "Native support",
    others: "Complex bridges",
    dubheStatus: "good"
  },
  {
    feature: "Developer Experience",
    dubhe: "One-click deployment",
    others: "Complex setup",
    dubheStatus: "excellent"
  },
  {
    feature: "Real-time Features",
    dubhe: "Built-in Channel",
    others: "External solutions",
    dubheStatus: "good"
  }
]

export default function ArchitectureComparisonSection() {
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
          Competitive Advantage
        </h3>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          First and only comprehensive solution for Move ecosystem development
        </p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Feature</th>
                <th className="text-center py-4 px-6 text-green-400 font-semibold">Dubhe</th>
                <th className="text-center py-4 px-6 text-gray-400 font-semibold">Others</th>
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