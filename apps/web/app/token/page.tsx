"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Coins, 
  Star, 
  Shield, 
  ArrowUpRight,
  Users,
  Lock,
  Zap,
  Globe,
  TrendingUp,
  Award,
  ExternalLink,
  CircleDollarSign,
  Sparkles
} from "lucide-react"

export default function TokenPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const dubheFeatures = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Governance Token",
      description: "Vote on protocol upgrades and ecosystem decisions"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Gas Token",
      description: "Pay for transaction fees across the Dubhe network"
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Staking Rewards",
      description: "Stake DUBHE to earn rewards and secure the network"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Cross-Chain Bridge",
      description: "Native bridging token across all supported chains"
    }
  ]

  const starsFeatures = [
    {
      icon: <Award className="w-5 h-5" />,
      title: "Reputation Token",
      description: "Earn through community contributions and achievements"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Community Access",
      description: "Unlock exclusive events, content, and opportunities"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Ecosystem Rewards",
      description: "Participate in ecosystem growth and earn multipliers"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Special Benefits",
      description: "Access premium features and priority support"
    }
  ]

  const tokenomics = [
    {
      token: "DUBHE",
      supply: "1,000,000,000",
      distribution: [
        { category: "Public Sale", percentage: 15, color: "from-blue-500 to-cyan-500" },
        { category: "Ecosystem", percentage: 30, color: "from-green-500 to-emerald-500" },
        { category: "Team", percentage: 20, color: "from-purple-500 to-pink-500" },
        { category: "Foundation", percentage: 15, color: "from-orange-500 to-red-500" },
        { category: "Advisors", percentage: 5, color: "from-indigo-500 to-purple-500" },
        { category: "Liquidity", percentage: 15, color: "from-teal-500 to-blue-500" }
      ]
    },
    {
      token: "STARS",
      supply: "1T",
      distribution: [
        { category: "Community Rewards", percentage: 60, color: "from-yellow-500 to-orange-500" },
        { category: "Developer Incentives", percentage: 25, color: "from-blue-500 to-indigo-500" },
        { category: "Ecosystem Growth", percentage: 10, color: "from-green-500 to-teal-500" },
        { category: "Reserve", percentage: 5, color: "from-purple-500 to-pink-500" }
      ]
    }
  ]

  return (
    <>
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-600/30 to-cyan-600/40 rounded-full blur-3xl"></div>
          
          {/* Floating token elements */}
          <div className="absolute inset-0 overflow-hidden">
            {isClient && Array.from({ length: 25 }).map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const topPositions = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92, 4, 84];
              const leftPositions = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 10, 20, 30, 40, 50, 60, 70, 80, 90, 18, 38, 58, 78, 98, 22];
              const durations = [3, 4, 5, 3.5, 4.5, 3.2, 4.2, 5.2, 3.8, 4.8, 3.3, 4.3, 5.3, 3.7, 4.7, 3.1, 4.1, 5.1, 3.6, 4.6, 3.4, 4.4, 5.4, 3.9, 4.9];
              const delays = [0, 0.5, 1, 1.5, 2, 0.2, 0.7, 1.2, 1.7, 0.3, 0.8, 1.3, 1.8, 0.1, 0.6, 1.1, 1.6, 0.4, 0.9, 1.4, 1.9, 0.15, 0.65, 1.15, 1.65];
              
              return (
                <div
                  key={`token-${i}`}
                  className="absolute text-blue-300/20 text-2xl"
                  style={{
                    top: `${topPositions[i] || 50}%`,
                    left: `${leftPositions[i] || 50}%`,
                    animation: `float ${durations[i] || 3}s ease-in-out infinite ${delays[i] || 0}s`
                  }}
                >
                  {i % 2 === 0 ? '💎' : '⭐'}
                </div>
              );
            })}
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
                className="inline-block bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-500/20"
              >
                <Coins className="w-4 h-4 inline mr-2" />
                Dual Token Economy
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-5xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  DUBHE & STARS
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Token Ecosystem
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Power the Dubhe ecosystem with two complementary tokens: DUBHE for governance and utility, 
                  STARS for community participation and reputation. Together, they create a balanced economic model.
                </motion.p>
              </div>

              {/* Token Stats */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <CircleDollarSign className="w-8 h-8 text-blue-400" />
                    <h3 className="text-2xl font-bold text-white">DUBHE</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">Governance & Utility Token</p>
                  <div className="text-3xl font-bold text-blue-400">1B Supply</div>
                </div>
                <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-8 h-8 text-purple-400" />
                    <h3 className="text-2xl font-bold text-white">STARS</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">Community & Reputation Token</p>
                  <div className="text-3xl font-bold text-purple-400">Unlimited</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Get DUBHE
                  <ArrowUpRight className="w-5 h-5 inline ml-2" />
                </button>
                
                <button className="border-2 border-blue-400/50 hover:border-blue-300 bg-blue-900/20 backdrop-blur-sm text-blue-100 hover:text-white hover:bg-blue-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
                  Earn STARS
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* DUBHE Token Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200"
            >
              DUBHE Token
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The Core Utility Token
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              DUBHE powers the entire ecosystem with governance rights, transaction fees, and staking rewards
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dubheFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* STARS Token Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-purple-500/10 text-purple-400 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-purple-500/20"
            >
              STARS Token
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Community & Reputation Token
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Earn STARS through contributions, unlock exclusive benefits, and build your reputation in the ecosystem
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {starsFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tokenomics Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Token Distribution
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Transparent and balanced token allocation designed for sustainable ecosystem growth
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {tokenomics.map((tokenData, tokenIndex) => (
              <motion.div
                key={tokenData.token}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: tokenIndex * 0.2 }}
                className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700"
              >
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{tokenData.token}</h3>
                  <p className="text-gray-400">Total Supply: {tokenData.supply}</p>
                </div>

                <div className="space-y-4">
                  {tokenData.distribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color}`}></div>
                        <span className="text-gray-300 text-sm">{item.category}</span>
                      </div>
                      <span className="text-white font-semibold">{item.percentage}%</span>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="mt-6 space-y-2">
                  {tokenData.distribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Get Tokens Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How to Get Tokens
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Multiple ways to acquire DUBHE and earn STARS in the ecosystem
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20"
            >
              <CircleDollarSign className="w-12 h-12 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Get DUBHE</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Trade on DEXs and CEXs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Provide liquidity for rewards</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Participate in governance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Bridge from other chains</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
            >
              <Star className="w-12 h-12 text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Earn STARS</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Contribute to community</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Complete ecosystem tasks</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Participate in events</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Refer new users</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Trading
              <ExternalLink className="w-5 h-5 inline ml-2" />
            </button>
            <button className="text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center gap-2">
              Join Community
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

    </>
  )
}