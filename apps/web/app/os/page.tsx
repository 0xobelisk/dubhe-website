"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Coins, 
  Vote, 
  Link,
  ArrowRight,
  CheckCircle,
  Network,
  Shield,
  Sparkles
} from "lucide-react"
import Navigation from "../../components/navigation"
import Footer from "../../components/footer"

const customStyles = `
  @keyframes orbit {
    0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
  }
  
  @keyframes token-float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  @keyframes chain-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(244, 63, 94, 0.3); }
    50% { box-shadow: 0 0 40px rgba(244, 63, 94, 0.6); }
  }
  
  .os-gradient {
    background: linear-gradient(135deg, 
      #f43f5e 0%, 
      #8b5cf6 50%, 
      #3b82f6 100%);
  }
  
  .ecosystem-card {
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`

export default function OSPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const features = [
    {
      icon: <Coins className="w-6 h-6" />,
      title: "$DUBHE Token Ecosystem",
      description: "Native token powering the entire ecosystem with governance, staking, and utility features across all connected chains.",
      details: [
        "Cross-chain governance voting",
        "Staking rewards and yields",
        "Transaction fee payments",
        "Developer incentive programs"
      ]
    },
    {
      icon: <Link className="w-6 h-6" />,
      title: "Universal Bridging",
      description: "Seamless asset transfers between Move-based chains with instant finality and minimal fees.",
      details: [
        "Sui ↔ Aptos bridging",
        "Movement network support",
        "Atomic cross-chain swaps",
        "Liquidity pool management"
      ]
    },
    {
      icon: <Vote className="w-6 h-6" />,
      title: "Decentralized Governance",
      description: "Community-driven decision making for protocol upgrades, treasury management, and ecosystem development.",
      details: [
        "Proposal submission system",
        "Weighted voting mechanisms",
        "Treasury fund allocation",
        "Protocol parameter updates"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Unified Security Model",
      description: "Shared security framework providing protection across all connected chains and applications.",
      details: [
        "Cross-chain validation",
        "Slashing mechanisms",
        "Fraud proof systems",
        "Emergency response protocols"
      ]
    }
  ]

  const chains = [
    {
      name: "Sui Network",
      status: "Live",
      logo: "🌊",
      features: ["High throughput", "Object-centric model", "Move language"]
    },
    {
      name: "Aptos",
      status: "Live", 
      logo: "🚀",
      features: ["Parallel execution", "Move VM", "Safe smart contracts"]
    },
    {
      name: "Movement",
      status: "Integration",
      logo: "⚡",
      features: ["EVM compatibility", "Move runtime", "Modular architecture"]
    },
    {
      name: "Future Chains",
      status: "Planned",
      logo: "🔮",
      features: ["Community driven", "Move-based", "Ecosystem expansion"]
    }
  ]

  const tokenomics = [
    {
      category: "Ecosystem Development",
      percentage: "40%",
      description: "Funding for developers, grants, and ecosystem growth",
      color: "from-purple-500 to-pink-500"
    },
    {
      category: "Community Rewards",
      percentage: "25%",
      description: "Staking rewards, governance participation, and incentives",
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Treasury Reserve",
      percentage: "20%",
      description: "Long-term sustainability and strategic partnerships",
      color: "from-green-500 to-emerald-500"
    },
    {
      category: "Team & Advisors",
      percentage: "15%",
      description: "Core team allocation with vesting schedules",
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-purple-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-rose-500/30 to-purple-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-600/30 to-blue-600/40 rounded-full blur-3xl"></div>
          
          {/* Orbiting elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`orbit-${i}`}
                  className="absolute w-4 h-4 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full"
                  style={{
                    animation: `orbit ${8 + i * 2}s linear infinite`,
                    animationDelay: `${i * 1.3}s`
                  }}
                />
              ))}
            </div>
            
            {/* Floating tokens */}
            {isClient && Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`token-${i}`}
                className="absolute text-rose-300/30 text-2xl"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `token-float ${4 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              >
                ◉
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="text-center">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block bg-rose-500/10 text-rose-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-rose-500/20"
              >
                <Network className="w-4 h-4 inline mr-2" />
                Dubhe OS
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-5xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Cross-Chain
                  <br />
                  <span className="os-gradient bg-clip-text text-transparent">
                    Move Ecosystem
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-rose-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Unified ecosystem connecting Move-based blockchains with $DUBHE token governance, 
                  universal bridging, and shared security across the entire network.
                </motion.p>
              </div>

              {/* Ecosystem Stats */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-400 mb-2">Multi-Chain</div>
                  <div className="text-gray-300">Move Ecosystem</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">$DUBHE</div>
                  <div className="text-gray-300">Native Token</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">Unified</div>
                  <div className="text-gray-300">Governance</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Join Ecosystem
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
                
                <button className="border-2 border-rose-400/50 hover:border-rose-300 bg-rose-900/20 backdrop-blur-sm text-rose-100 hover:text-white hover:bg-rose-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
                  Explore Tokenomics
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gradient-to-r from-rose-100 to-purple-100 text-rose-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-rose-200"
            >
              Ecosystem Features
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              One Token, Multiple Chains
              <br />
              Unified Experience
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Seamlessly interact across the entire Move ecosystem with shared governance and universal bridging
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="ecosystem-card bg-slate-800/50 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-rose-500 to-purple-500 text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                <div className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Supported Chains Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-rose-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-rose-500/10 text-rose-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-rose-500/20"
            >
              Supported Networks
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Multi-Chain Move Ecosystem
            </motion.h2>
          </div>

          {/* Chains Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chains.map((chain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-rose-500/20 hover:border-rose-400/50 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{chain.logo}</div>
                <h3 className="text-xl font-bold text-white mb-2">{chain.name}</h3>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  chain.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                  chain.status === 'Integration' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {chain.status}
                </div>
                <div className="space-y-2">
                  {chain.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="text-gray-300 text-sm">
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tokenomics Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              $DUBHE Tokenomics
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Designed for sustainable ecosystem growth and community governance
            </motion.p>
          </div>

          {/* Tokenomics Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Pie Chart Representation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-rose-500/20 to-blue-500/20 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full bg-slate-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">$DUBHE</div>
                    <div className="text-gray-400">Total Supply</div>
                    <div className="text-xl font-semibold text-rose-400">1B Tokens</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tokenomics Details */}
            <div className="space-y-6">
              {tokenomics.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{item.category}</h3>
                    <div className="text-2xl font-bold text-white">{item.percentage}</div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                  <div className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-rose-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Join the Move Ecosystem
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Be part of the unified cross-chain future powered by $DUBHE
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Get $DUBHE Token
              <Sparkles className="w-5 h-5 inline ml-2" />
            </button>
            <button className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
              Governance Portal
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}