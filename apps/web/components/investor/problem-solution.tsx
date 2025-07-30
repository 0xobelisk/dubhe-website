"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, DollarSign, Wrench, Clock, Target, CheckCircle, TrendingUp } from "lucide-react"
import Section from "../ui/Section"
import Card from "../ui/Card"
import GradientText from "../ui/GradientText"

/**
 * 市场背景数据
 */
const marketContext = {
  title: "Move Ecosystem: The Fastest Growing Developer Community",
  moveDevs: "1,555",
  timeFrame: "<3 years",
  ethereumDevs: "8,925", 
  comparison: "Move achieving 17% of Ethereum's developer base in <3 years",
  insight: "Strong network effects but high friction hurts entire ecosystem"
}

/**
 * 问题数据配置
 */
const problems = [
  {
    id: "cost",
    icon: <DollarSign className="w-8 h-8" />,
    title: "30-40% Higher Development Costs vs Ethereum",
    description: "Same dApp development costs significantly more on Move chains",
    impact: "Barriers preventing mass developer adoption",
    stats: "Creating same complexity dApp costs $200K+ on Move vs $150K on Ethereum",
    color: "from-red-500 to-pink-500"
  },
  {
    id: "infra",
    icon: <Wrench className="w-8 h-8" />,
    title: "Lacking Infrastructure & Tools",
    description: "Few DApps have been successfully launched and sustained",
    impact: "Reduced variety, smaller dev base, stagnant ecosystem",
    stats: "Move has significantly fewer mature development tools compared to established ecosystems",
    color: "from-orange-500 to-yellow-500"
  },
  {
    id: "ux",
    icon: <Clock className="w-8 h-8" />,
    title: "Slow, Non-Web2-like User Experience",
    description: "High latency and poor interaction patterns",
    impact: "Users drop off, limiting ecosystem growth potential",
    stats: "Average blockchain interaction takes 12-45 seconds vs <50ms for Web2",
    color: "from-blue-500 to-cyan-500"
  }
]

/**
 * 解决方案数据
 */
const solution = {
  title: "Dubhe: The Complete Move Development Stack",
  subtitle: "First comprehensive toolkit for building verifiable decentralized applications",
  benefits: [
    {
      icon: <Target className="w-6 h-6" />,
      title: "80% Code Auto-Generation",
      description: "Developers focus on 20% core logic, 80% infrastructure generated automatically",
      result: "15x faster development cycles"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "One-Command Deployment", 
      description: "Deploy across all Move chains with single command",
      result: "Cross-ecosystem compatibility out of the box"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Web2-Level Real-Time Experience",
      description: "<50ms average latency with instant frontend rendering",
      result: "Feels like using a web2 app"
    }
  ]
}

/**
 * ProblemSolution组件 - 问题分析与解决方案展示
 * 
 * 功能特性：
 * - 市场背景和发展趋势
 * - 核心问题识别和量化
 * - Dubhe解决方案价值主张
 * - 对比式展示和数据支撑
 * 
 * @returns ProblemSolution组件JSX元素
 */
export default function ProblemSolution() {
  const [activeTab, setActiveTab] = useState("problems")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <Section
      title="Market Opportunity & Solution"
      subtitle="Move ecosystem is at an inflection point — huge potential but significant barriers"
      label="INVESTMENT THESIS"
      maxWidth="xl"
      paddingY="xl"
      showBackground={true}
      backgroundVariant="gradient"
      className="relative"
    >
      <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* 市场背景 */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="glass" padding="lg" className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <GradientText
                preset="green-blue"
                size="2xl"
                weight="bold"
                className="mb-4"
              >
                {marketContext.title}
              </GradientText>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                {marketContext.insight}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="text-5xl font-bold text-blue-400">
                  {marketContext.moveDevs}
                </div>
                <div className="text-lg font-semibold text-white">
                  Move Stack Developers
                </div>
                <div className="text-sm text-gray-400">
                  Active in {marketContext.timeFrame}
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-400 mb-2">vs</div>
                  <div className="text-sm text-gray-400">
                    17% of Ethereum&apos;s<br />developer base
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-5xl font-bold text-gray-500">
                  {marketContext.ethereumDevs}
                </div>
                <div className="text-lg font-semibold text-gray-400">
                  Ethereum Developers
                </div>
                <div className="text-sm text-gray-500">
                  Established ecosystem
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-base text-gray-300 max-w-3xl mx-auto">
                <strong className="text-white">{marketContext.comparison}</strong> — 
                demonstrating massive growth potential, but current friction prevents mass adoption.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* 问题与解决方案切换 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800/50 rounded-full p-1 border border-gray-700">
              <button
                onClick={() => setActiveTab("problems")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === "problems" 
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/25" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Market Problems
              </button>
              <button
                onClick={() => setActiveTab("solution")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === "solution" 
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/25" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Dubhe Solution
              </button>
            </div>
          </div>
        </motion.div>

        {/* 问题展示 */}
        {activeTab === "problems" && (
          <motion.div
            key="problems"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {problems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card variant="glass" padding="lg">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="text-center lg:text-left">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${problem.color} text-white mb-4`}>
                        {problem.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {problem.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <div className="text-sm font-semibold text-red-400 mb-2">
                          <AlertTriangle className="w-4 h-4 inline mr-2" />
                          Impact
                        </div>
                        <p className="text-gray-300 text-sm">
                          {problem.impact}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
                      <div className="text-sm font-semibold text-blue-400 mb-2">
                        Data Point
                      </div>
                      <p className="text-gray-300 text-sm">
                        {problem.stats}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* 解决方案展示 */}
        {activeTab === "solution" && (
          <motion.div
            key="solution"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <GradientText
                preset="green-blue"
                size="3xl"
                weight="bold"
                className="mb-4"
              >
                {solution.title}
              </GradientText>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {solution.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {solution.benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card variant="glass" padding="lg" className="h-full text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10 text-green-400 mb-6">
                      {benefit.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {benefit.description}
                    </p>
                    
                    <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                      <div className="text-sm font-semibold text-green-400 mb-1">
                        Result
                      </div>
                      <div className="text-white font-semibold">
                        {benefit.result}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 底部总结 */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="glass" padding="lg" className="max-w-4xl mx-auto">
            <GradientText
              preset="blue-purple"
              size="2xl"
              weight="bold"
              className="mb-4"
            >
              The Market Timing is Perfect
            </GradientText>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Move ecosystem has <strong className="text-white">proven developer demand</strong> but 
              lacks the infrastructure to scale. Dubhe addresses every major friction point, 
              positioning us as the <strong className="text-white">foundational layer</strong> for 
              the next wave of Move adoption.
            </p>
          </Card>
        </motion.div>

      </div>
    </Section>
  )
}