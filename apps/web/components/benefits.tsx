"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Rocket, Zap, Globe, Code, TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

const benefits = [
  {
    id: "engine",
    name: "Dubhe Engine",
    tagline: "80% Code Auto-Generation",
    value: "15x Faster Development",
    description: "The only development toolkit that auto-generates 80% of Move code, letting developers focus on core business logic",
    keyBenefits: [
      "Reduce dev time from months to weeks",
      "90% lower infrastructure costs", 
      "Compatible with Unity, Unreal, Godot",
      "One command deploys to all Move chains"
    ],
    icon: <Rocket className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "channel", 
    name: "Dubhe Channel",
    tagline: "Web2-Level Real-Time Experience",
    value: "<50ms Latency",
    description: "Real-time programmable P2P interaction layer that makes blockchain feel like Web2",
    keyBenefits: [
      "Instant frontend rendering",
      "Ultra-fast execution speed",
      "Full node security without complexity",
      "Supports multi-client mobile, desktop, and web"
    ],
    icon: <Zap className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "os",
    name: "Dubhe OS",
    tagline: "Cross-Chain Interoperability OS",
    value: "Native Multi-Chain",
    description: "Blockchain operating system with native cross-chain support and developer incentive mechanisms",
    keyBenefits: [
      "Single codebase, all Move chains",
      "Built-in developer rewards ($DUBHE)",
      "Sustainable ecosystem growth",
      "Bridge to Sui, Aptos, Solana ecosystems"
    ],
    icon: <Globe className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500"
  }
]

const architectureComparison = {
  title: "The Complete Move Development Stack",
  subtitle: "First and only comprehensive solution for Move ecosystem development",
  competitive: [
    { aspect: "Code Generation", dubhe: "80% automated", others: "Manual coding" },
    { aspect: "UX Performance", dubhe: "<50ms", others: "3-15 seconds" },
    { aspect: "Cross-Chain", dubhe: "Native support", others: "Custom bridges" },
    { aspect: "Developer Tools", dubhe: "All-in-one", others: "Fragmented" }
  ]
}

export default function Benefits() {
  const [activeBenefit, setActiveBenefit] = useState(benefits[0]?.id || "engine")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const currentBenefit = benefits.find(b => b.id === activeBenefit) || benefits[0]!

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-green-600/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
                Core Benefits
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Product That Changes{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Everything
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Three integrated products that solve every major friction point in Move development
            </p>
          </motion.div>

          {/* Benefits Navigation */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit) => (
                <motion.button
                  key={benefit.id}
                  onClick={() => setActiveBenefit(benefit.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    activeBenefit === benefit.id
                      ? "border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/20"
                      : "border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/50"
                  }`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${benefit.color} text-white mb-4`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {benefit.name}
                  </h3>
                  <p className="text-sm text-blue-400 font-semibold">
                    {benefit.tagline}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Benefit Details */}
          <motion.div
            key={activeBenefit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left: Benefit Information */}
              <div className="space-y-8">
                <div>
                  <h3 className={`text-3xl font-bold bg-gradient-to-r ${currentBenefit.color} bg-clip-text text-transparent mb-4`}>
                    {currentBenefit.name}
                  </h3>
                  <p className="text-xl text-gray-300 mb-6">
                    {currentBenefit.description}
                  </p>
                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-semibold text-green-400">Key Value</span>
                    </div>
                    <p className="text-lg font-bold text-white">
                      {currentBenefit.value}
                    </p>
                  </div>
                </div>

                {/* Key Benefits */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-400" />
                    Key Benefits
                  </h4>
                  <div className="space-y-3">
                    {currentBenefit.keyBenefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="relative">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-r ${currentBenefit.color} text-white mb-6`}>
                      {currentBenefit.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Interactive Experience
                    </h3>
                    <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700 min-h-[200px] flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-sm">Live Demo</p>
                        <p className="text-xs">Coming Soon</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    size="lg"
                    className={`w-full mt-6 bg-gradient-to-r ${currentBenefit.color} hover:opacity-90 text-white border-0 font-semibold`}
                  >
                    Try Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Architecture Comparison */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                {architectureComparison.title}
              </h3>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {architectureComparison.subtitle}
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
                    {architectureComparison.competitive.map((comp, index) => (
                      <motion.tr
                        key={comp.aspect}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border-b border-gray-800/50"
                      >
                        <td className="py-4 px-6 text-white font-medium">{comp.aspect}</td>
                        <td className="py-4 px-6 text-center">
                          <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                            {comp.dubhe}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="bg-gray-700/50 text-gray-400 px-3 py-1 rounded-full text-sm">
                            {comp.others}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Bottom Summary */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-5xl mx-auto">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-6">
                The Technical Foundation That Enables Innovation
              </h3>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Our integrated stack doesn&apos;t just solve individual problems — it creates a 
                <strong className="text-white"> unified ecosystem</strong> where each component reinforces the others. 
                Developers who start with one Dubhe product naturally adopt the entire stack.
              </p>
              
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 px-8 py-4 text-lg font-semibold"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}