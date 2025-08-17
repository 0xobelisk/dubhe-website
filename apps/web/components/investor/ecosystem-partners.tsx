"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Handshake, Network, TrendingUp, Users } from "lucide-react"
import Section from "../ui/Section"
import Card from "../ui/Card"
import GradientText from "../ui/GradientText"

/**
 * 生态系统合作伙伴数据
 */
const ecosystemPartners = [
  {
    name: "Sui",
    type: "Move L1",
    logo: "🔷",
    status: "Active Collaboration",
    impact: "Grant programs",
    benefit: "Access to $SUI ecosystem and developer network"
  },
  {
    name: "Aptos", 
    type: "Move L1",
    logo: "🔸",
    status: "SDK Deployed",
    impact: "Native Aptos Move support",
    benefit: "Tap into rapidly growing Aptos developer base" 
  },
  {
    name: "Rooch",
    type: "BTC Layer2", 
    logo: "🔹",
    status: "Co-building",
    impact: "Shared infrastructure and tooling",
    benefit: "Combined Bitcoin ecosystem growth and user acquisition"
  },
  {
    name: "Movement",
    type: "Ethereum Layer2",
    logo: "🔻", 
    status: "Integration Ready",
    impact: "Multi-VM support and broader reach",
    benefit: "Access to Ethereum and Solana bridge users"
  }
]

/**
 * 网络效应数据
 */
const networkEffects = {
  title: "Developer Network Effects Drive Ecosystem Value",
  description: "Good dev tools create a virtuous cycle of growth",
  cycle: [
    { step: "Easy to Build", icon: "🛠️", result: "More Developers" },
    { step: "More Developers", icon: "👨‍💻", result: "Higher Value" },
    { step: "Higher Value", icon: "💰", result: "More Users" }, 
    { step: "More Users", icon: "👥", result: "More dApps" },
    { step: "More dApps", icon: "🚀", result: "Easy to Build" }
  ]
}

/**
 * EcosystemPartners组件 - 生态系统合作伙伴展示
 */
export default function EcosystemPartners() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <Section
      title="Strategic Ecosystem Positioning"
      subtitle="Building the foundational layer across all major Move chains"
      label="ECOSYSTEM & PARTNERSHIPS"
      maxWidth="xl"
      paddingY="xl"
      showBackground={true}
      backgroundVariant="gradient"
    >
      <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* 合作伙伴网格 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {ecosystemPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="glass" padding="lg" className="h-full">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{partner.logo}</div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {partner.name}
                    </h3>
                    <div className="mb-3">
                      <span className="inline-block bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {partner.type}
                      </span>
                      <span className="inline-block bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-semibold ml-2">
                        {partner.status}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">
                      {partner.impact}
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                      <p className="text-sm text-blue-400">
                        <strong>Strategic Value:</strong> {partner.benefit}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* 网络效应可视化 */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <GradientText
              preset="green-blue"
              size="2xl"
              weight="bold"
              className="mb-4"
            >
              {networkEffects.title}
            </GradientText>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {networkEffects.description}
            </p>
          </div>

          <Card variant="glass" padding="lg" className="max-w-4xl mx-auto">
            <div className="relative">
              {/* 中心圆 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Network className="w-12 h-12 text-white" />
                </div>
              </div>
              
              {/* 外围循环 */}
              <div className="relative w-full h-96">
                {networkEffects.cycle.map((item, index) => {
                  const angle = (index * 72) - 90 // 5个元素，每个72度
                  const radius = 140
                  const x = Math.cos(angle * Math.PI / 180) * radius
                  const y = Math.sin(angle * Math.PI / 180) * radius
                  
                  return (
                    <motion.div
                      key={item.step}
                      className="absolute w-24 h-24 bg-gray-800 rounded-full border-2 border-blue-500/50 flex flex-col items-center justify-center text-center"
                      style={{
                        left: `calc(50% + ${x}px - 48px)`,
                        top: `calc(50% + ${y}px - 48px)`
                      }}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <div className="text-xs text-gray-300 font-semibold leading-tight">
                        {item.step.split(' ').map((word, i) => (
                          <div key={i}>{word}</div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 生态系统价值主张 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="glass" padding="lg" className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl text-blue-400 mb-4">
                  <Handshake className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Strategic Alliances</h3>
                <p className="text-gray-300">
                  Deep partnerships with all major Move ecosystem players ensure comprehensive market coverage
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-2xl text-green-400 mb-4">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Network Effects</h3>
                <p className="text-gray-300">
                  Each new developer and project strengthens the entire ecosystem, creating compound growth
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-2xl text-purple-400 mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Community Flywheel</h3>
                <p className="text-gray-300">
                  Better tools attract more developers, creating more value for everyone in the ecosystem
                </p>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-700">
              <GradientText
                preset="blue-purple"
                size="xl"
                weight="bold"
                className="mb-4"
              >
                Positioned as the De Facto Standard for Move Development
              </GradientText>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                Our strategic partnerships and network effects position Dubhe as the 
                <strong className="text-white"> foundational infrastructure</strong> that all Move developers will eventually use.
              </p>
            </div>
          </Card>
        </motion.div>

      </div>
    </Section>
  )
}