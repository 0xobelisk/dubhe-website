"use client"

import { useState, useEffect } from "react"
import { m as motion } from "framer-motion"
import { Activity, Zap, DollarSign, Users, CheckCircle, TrendingUp, Globe } from "lucide-react"
import Section from "../ui/Section"
import Card from "../ui/Card"
import GradientText from "../ui/GradientText"

/**
 * 核心指标数据 (基于Deck第31页)
 */
const headlineMetrics = [
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Fully On-Chain DApp",
    value: "—",
    description: "Deployment status awaits source verification",
    color: "text-green-400",
    bgColor: "bg-green-500/10"
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "Transaction Volume",
    value: "—",
    description: "Total transactions processed across all deployed applications",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Average Latency",
    value: "—",
    description: "Web2-level response times for real-time user interactions",
    color: "text-purple-400", 
    bgColor: "bg-purple-500/10"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "User Experience",
    value: "—",
    description: "User experience depends on implementation",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10"
  }
]

/**
 * 技术采用数据
 */
const adoptionMetrics = [
  { platform: "Sui", status: "✅ Compatible", integration: "Framework deployed" },
  { platform: "Aptos", status: "✅ Compatible", integration: "SDK available" },
  { platform: "Rooch", status: "✅ Compatible", integration: "Awaiting confirmation" },
  { platform: "Movement", status: "✅ Compatible", integration: "Integration ready" },
  { platform: "Initia", status: "✅ Compatible", integration: "Testnet deployed" }
]

/**
 * 市场验证数据
 */
const validationMetrics = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Revenue Generated",
    value: "—",
    description: "Revenue figures await verifiable source records",
    trend: ""
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Ecosystem Projects",
    value: "—",
    description: "External players have been invited to playtest Numeron",
    trend: ""
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Ecosystem Partners",
    value: "—",
    description: "External partnership status awaits confirmation",
    trend: ""
  }
]

/**
 * 社区指标数据
 */
const communityMetrics = [
  {
    platform: "Twitter",
    followers: "—",
    engagement: "High activity",
    icon: "🐦",
    growth: ""
  },
  {
    platform: "Discord",
    daily: "—",
    total: "—",
    icon: "💬", 
    growth: ""
  },
  {
    platform: "Developer Community",
    engagement: "Active",
    projects: "Growing",
    icon: "👨‍💻",
    growth: ""
  }
]

/**
 * TractionMetrics组件 - 核心指标和商业验证展示
 * 
 * 功能特性：
 * - 关键业务指标仪表板
 * - 技术采用度展示
 * - 商业验证证明
 * - 社区增长数据
 * 
 * @returns TractionMetrics组件JSX元素
 */
export default function TractionMetrics() {
  const [activeCategory, setActiveCategory] = useState("headline")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const categories = [
    { id: "headline", label: "Core Metrics", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "adoption", label: "Tech Adoption", icon: <Globe className="w-4 h-4" /> },
    { id: "validation", label: "Metrics Review", icon: <DollarSign className="w-4 h-4" /> },
    { id: "community", label: "Community", icon: <Users className="w-4 h-4" /> }
  ]

  return (
    <Section
      title="Ecosystem Information"
      subtitle="Figures withheld pending verifiable sources"
      label="TRACTION DASHBOARD"
      maxWidth="xl" 
      paddingY="xl"
      showBackground={true}
      backgroundVariant="gradient"
      className="relative"
    >
      <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* 分类导航 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-2 bg-gray-800/30 rounded-2xl p-2 max-w-2xl mx-auto border border-gray-700">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                {category.icon}
                <span className="text-sm">{category.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* 核心指标 */}
        {activeCategory === "headline" && (
          <motion.div
            key="headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {headlineMetrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card variant="glass" padding="lg" className="h-full text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${metric.bgColor} ${metric.color} mb-4`}>
                      {metric.icon}
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm font-semibold text-gray-300 mb-3">
                      {metric.title}
                    </div>
                    <div className="text-xs text-gray-400 leading-relaxed">
                      {metric.description}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card variant="glass" padding="lg" className="max-w-4xl mx-auto text-center">
                <GradientText
                  preset="green-blue"
                  size="xl"
                  weight="bold"
                  className="mb-4"
                >
                  Deployment & Performance Information
                </GradientText>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  <strong className="text-white">Verified production metrics are not yet published.</strong>
                  Capacity and performance depend on the deployment, configuration and workload.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* 技术采用度 */}
        {activeCategory === "adoption" && (
          <motion.div
            key="adoption"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {adoptionMetrics.slice(0, 3).map((platform, index) => (
                <motion.div
                  key={platform.platform}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card variant="glass" padding="lg" className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {platform.platform}
                    </div>
                    <div className="text-green-400 font-semibold mb-3">
                      {platform.status}
                    </div>
                    <div className="text-sm text-gray-400">
                      {platform.integration}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {adoptionMetrics.slice(3).map((platform, index) => (
                <motion.div
                  key={platform.platform}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                >
                  <Card variant="glass" padding="lg" className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {platform.platform}
                    </div>
                    <div className="text-green-400 font-semibold mb-3">
                      {platform.status}
                    </div>
                    <div className="text-sm text-gray-400">
                      {platform.integration}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card variant="glass" padding="lg" className="max-w-4xl mx-auto text-center">
                <GradientText
                  preset="blue-purple"
                  size="xl"
                  weight="bold"
                  className="mb-4"
                >
                  Universal Move Ecosystem Support
                </GradientText>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Dubhe is the <strong className="text-white">only development stack</strong> that works seamlessly across 
                  all major Move chains. This positions us as the foundational layer for cross-chain Move development.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* 市场验证 */}
        {activeCategory === "validation" && (
          <motion.div
            key="validation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6 mb-8">
              {validationMetrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card variant="glass" padding="lg">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10 text-green-400">
                          {metric.icon}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-xl font-bold text-white">
                            {metric.title}
                          </h3>
                          <span className="text-2xl font-bold text-green-400">
                            {metric.value}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">
                          {metric.description}
                        </p>
                        <div className="text-sm text-blue-400">
                          {metric.trend}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card variant="glass" padding="lg" className="max-w-4xl mx-auto text-center">
                <GradientText
                  preset="orange-yellow"
                  size="xl"
                  weight="bold"
                  className="mb-4"
                >
                  Commercial Information
                </GradientText>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Revenue and product-market fit claims await verifiable sources.
                  Revenue statements require traceable records before publication.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* 社区指标 */}
        {activeCategory === "community" && (
          <motion.div
            key="community"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {communityMetrics.map((community, index) => (
                <motion.div
                  key={community.platform}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card variant="glass" padding="lg" className="text-center h-full">
                    <div className="text-4xl mb-4">
                      {community.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">
                      {community.platform}
                    </h3>
                    <div className="space-y-2 mb-4">
                      {community.followers && (
                        <div className="text-2xl font-bold text-blue-400">
                          {community.followers}
                        </div>
                      )}
                      {community.daily && (
                        <div>
                          <div className="text-xl font-bold text-green-400">
                            {community.daily}
                          </div>
                          <div className="text-sm text-gray-400">
                            Daily Active ({community.total} total)
                          </div>
                        </div>
                      )}
                      {community.engagement && (
                        <div className="text-lg font-semibold text-purple-400">
                          {community.engagement}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 bg-gray-800/50 rounded-lg p-2">
                      {community.growth}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card variant="glass" padding="lg" className="max-w-4xl mx-auto text-center">
                <GradientText
                  preset="pink-purple"
                  size="xl"
                  weight="bold"
                  className="mb-4"
                >
                  Thriving Developer Ecosystem
                </GradientText>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Community channels support discussion and
                  developer participation. Quantitative community claims await verification.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        )}

      </div>
    </Section>
  )
}
