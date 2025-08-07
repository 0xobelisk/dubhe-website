"use client"

import { motion } from "framer-motion"
import { Code, Zap, Globe } from "lucide-react"
import ArchitectureComparisonSection from "./ArchitectureComparisonSection"

const products = [
  {
    id: "engine",
    icon: Code,
    title: "Dubhe Engine",
    subtitle: "80% Code Auto-Generation",
    description: "The only development toolkit that auto-generates 80% of Move code, letting developers focus on core business logic",
    features: [
      "Reduce dev time from months to weeks",
      "90% lower infrastructure costs",
      "One command deploys to all Move chains"
    ],
    highlight: "10x Faster Development",
    gradient: "from-purple-500 to-blue-500",
    hoverBorder: "hover:border-blue-500/50"
  },
  {
    id: "channel",
    icon: Zap,
    title: "Dubhe Channel",
    subtitle: "Web2-Level Real-Time Experience",
    description: "Real-time programmable P2P interaction layer that makes blockchain feel like Web2",
    features: [
      "Instant frontend rendering",
      "Ultra-fast execution speed",
      "Supports multi-client mobile, desktop, and web"
    ],
    highlight: "<50ms Latency",
    gradient: "from-purple-500 to-pink-500",
    hoverBorder: "hover:border-purple-500/50"
  },
  {
    id: "os",
    icon: Globe,
    title: "Dubhe OS",
    subtitle: "Cross-Chain Interoperability OS",
    description: "Blockchain operating system with native cross-chain support and developer incentive mechanisms",
    features: [
      "Single codebase, all Move chains",
      "Built-in developer rewards",
      "Bridge to Multi-Chains ecosystems"
    ],
    highlight: "Native Multi-Chain",
    gradient: "from-green-500 to-emerald-500",
    hoverBorder: "hover:border-green-500/50"
  }
]

export default function ProductSuiteSection() {
  return (
    <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-purple-500/20">
            PRODUCT SUITE
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            The Complete Move Development Stack
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Three integrated products that solve every major friction point in Move development
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