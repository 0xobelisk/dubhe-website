"use client"

import { motion } from "framer-motion"
import { CheckCircle, Layers, Zap, Globe, Database, Code, Network, Shield } from "lucide-react"

const keyMetrics = [
  "10M+ transactions processed",
  "<200ms average latency", 
  "Web2-level user experience",
  "Compatible with Sui, Aptos, Rooch, Movement, Initia"
]

const moveEcosystemFeatures = [
  "1,555 active Move developers",
  "Growing 40% monthly",
  "Less than 3 years old",
  "Huge growth potential"
]

const architectureLayers = [
  {
    title: "Move Applications",
    subtitle: "Your dApps & Games",
    description: "Build complex decentralized applications with Move's safety and flexibility",
    icon: Code,
    features: ["DeFi Protocols", "Gaming Apps", "NFT Platforms", "Social dApps"],
    gradient: "from-purple-500 to-blue-600"
  },
  {
    title: "Dubhe Engine", 
    subtitle: "Development Toolkit",
    description: "Auto-generates 80% of code and provides complete developer toolchain",
    icon: Zap,
    features: ["Code Generation", "Schema-Based Development", "Multi-Chain Deployment", "Dev Environment"],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Dubhe Channel",
    subtitle: "Real-time Layer", 
    description: "P2P interaction layer for Web2-level real-time user experience",
    icon: Network,
    features: ["<50ms Latency", "Real-time Sync", "P2P Communication", "Mobile Support"],
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    title: "Dubhe OS",
    subtitle: "Cross-Chain Infrastructure",
    description: "Decentralized operating system with native multi-chain interoperability",
    icon: Globe,
    features: ["Cross-Chain Bridges", "Unified State", "Developer Incentives", "Governance"],
    gradient: "from-teal-500 to-green-500"
  }
]

const technicalFeatures = [
  {
    icon: Shield,
    title: "Security First",
    description: "Move's formal verification ensures bug-free smart contracts"
  },
  {
    icon: Zap,
    title: "High Performance", 
    description: "Parallel execution and optimized runtime for maximum throughput"
  },
  {
    icon: Layers,
    title: "Composable",
    description: "Modular architecture allows easy integration and customization"
  },
  {
    icon: Database,
    title: "Unified State",
    description: "Single source of truth across all chains and applications"
  }
]

export default function NetworkArchitectureSection() {
  return (
    <div className="py-24 px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            NETWORK ARCHITECTURE
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
            The Complete Move Development Stack
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From development tools to real-time interaction channels and decentralized infrastructure - 
            Dubhe provides everything needed to build the next generation of fully on-chain applications.
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
                <h3 className="text-lg font-bold text-amber-900 mb-4">Key Metrics</h3>
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
                <h3 className="text-lg font-bold text-emerald-900 mb-4">Move Ecosystem</h3>
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
              {/* Layer Content */}
              <div className="lg:w-1/2 space-y-6">
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r ${layer.gradient} text-white`}>
                  <layer.icon className="w-5 h-5" />
                  <span className="font-semibold">Layer {index + 1}</span>
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

              {/* Layer Visual */}
              <div className="lg:w-1/2 flex justify-center">
                <div className={`w-64 h-32 rounded-xl bg-gradient-to-r ${layer.gradient} flex items-center justify-center relative overflow-hidden shadow-xl`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <layer.icon className="w-16 h-16 text-white/90 relative z-10" />
                  <div className="absolute top-4 right-4 text-white/70 text-xs font-medium">
                    Layer {index + 1}
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
              Complete Stack Solution
            </h3>
            <p className="text-lg text-purple-100 max-w-3xl mx-auto">
              Dubhe is the first and only platform that provides a complete, integrated solution 
              for Move ecosystem development - from code generation to real-time user experience.
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