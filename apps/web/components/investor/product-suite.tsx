"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Rocket, Zap, Globe, Code, DollarSign, Users, ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import Section from "../ui/Section"
import Card from "../ui/Card"
import GradientText from "../ui/GradientText"

/**
 * 投资相关链接
 */
const investmentLinks = {
  deck: "https://docsend.com/view/iqua3sqswib2jbnv",
  scheduleMeeting: "https://calendly.com/dubheengine/30min"
}

/**
 * 产品套件数据 (简化版，突出商业价值)
 */
const productSuite = [
  {
    id: "engine",
    name: "Dubhe Engine",
    tagline: "80% Code Auto-Generation",
    businessValue: "15x Faster Development = 90% Cost Reduction",
    description: "The only development toolkit that auto-generates 80% of Move code, letting developers focus on core business logic",
    keyBenefits: [
      "Reduce dev time from months to weeks",
      "90% lower infrastructure costs", 
      "Compatible with Unity, Unreal, Godot",
      "One command deploys to all Move chains"
    ],
    marketImpact: "Eliminates the #1 barrier to Move adoption",
    revenueModel: "Dubhe DApp Storage Fees = (basic fee + op fees * byte fee *$DUBHE)",
    icon: <Rocket className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    demo: "Schema-based code generation showcase"
  },
  {
    id: "channel", 
    name: "Dubhe Channel",
    tagline: "Web2-Level Real-Time Experience",
    businessValue: "<50ms Latency = Mass User Adoption",
    description: "Real-time programmable P2P interaction layer that makes blockchain feel like Web2",
    keyBenefits: [
      "Instant frontend rendering",
      "Ultra-fast execution speed",
      "Full node security without complexity",
      "Works on mobile, smartwatch, laptop"
    ],
    marketImpact: "Solves the UX problem preventing mainstream adoption",
    revenueModel: "Dubhe DApp Transaction Fees = (basic fee + op fees * byte fee * Channel bytes *$DUBHE)",
    icon: <Zap className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500", 
    demo: "Real-time gaming interaction showcase"
  },
  {
    id: "os",
    name: "Dubhe OS",
    tagline: "Cross-Chain Interoperability OS",
    businessValue: "Native Multi-Chain = 10x Larger TAM",
    description: "Blockchain operating system with native cross-chain support and developer incentive mechanisms",
    keyBenefits: [
      "Single codebase, all Move chains",
      "Built-in developer rewards ($DUBHE)",
      "Sustainable ecosystem growth",
      "Bridge to Sui, Aptos, Solana ecosystems"
    ],
    marketImpact: "Creates network effects across entire Move ecosystem",
    revenueModel: "Native Token $DUBHE Gas Fees",
    icon: <Globe className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
    demo: "Cross-chain transaction showcase"
  }
]

/**
 * 市场定位数据
 */
const marketPosition = {
  title: "The Complete Move Development Stack",
  subtitle: "First and only comprehensive solution for Move ecosystem development",
  competitive: [
    { aspect: "Code Generation", dubhe: "80% automated", others: "Manual coding" },
    { aspect: "UX Performance", dubhe: "<50ms", others: "3-15 seconds" },
    { aspect: "Cross-Chain", dubhe: "Native support", others: "Custom bridges" },
    { aspect: "Developer Tools", dubhe: "All-in-one", others: "Fragmented" }
  ]
}

/**
 * ProductSuite组件 - 投资者导向的产品展示
 * 
 * 功能特性：
 * - 商业价值导向的产品介绍
 * - 竞争优势突出
 * - 收入模式清晰
 * - 市场影响量化
 * 
 * @returns ProductSuite组件JSX元素
 */
export default function ProductSuite() {
  const [activeProduct, setActiveProduct] = useState(productSuite[0]?.id || "engine")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const currentProduct = productSuite.find(p => p.id === activeProduct) || productSuite[0]!

  return (
    <Section
      title="The Product That Changes Everything"
      subtitle="Three integrated products that solve every major friction point in Move development"
      label="PRODUCT SUITE"
      maxWidth="xl"
      paddingY="xl"
      showBackground={true}
      backgroundVariant="gradient"
      className="relative"
    >
      <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* 产品导航 */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {productSuite.map((product) => (
              <motion.button
                key={product.id}
                onClick={() => setActiveProduct(product.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  activeProduct === product.id
                    ? "border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/20"
                    : "border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/50"
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${product.color} text-white mb-4`}>
                  {product.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-blue-400 font-semibold">
                  {product.tagline}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 产品详情展示 */}
        <motion.div
          key={activeProduct}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* 左侧：产品信息 */}
            <div className="space-y-8">
              <div>
                <GradientText
                  preset="custom"
                  customGradient={currentProduct.color}
                  size="3xl"
                  weight="bold"
                  className="mb-4"
                >
                  {currentProduct.name}
                </GradientText>
                <p className="text-xl text-gray-300 mb-6">
                  {currentProduct.description}
                </p>
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-semibold text-green-400">Business Impact</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    {currentProduct.businessValue}
                  </p>
                </div>
              </div>

              {/* 关键优势 */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  Key Benefits
                </h4>
                <div className="space-y-3">
                  {currentProduct.keyBenefits.map((benefit, index) => (
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

              {/* 收入模式 */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-semibold text-yellow-400">Revenue Model</span>
                </div>
                <p className="text-white font-semibold mb-2">
                  {currentProduct.revenueModel}
                </p>
                <p className="text-sm text-gray-400">
                  {currentProduct.marketImpact}
                </p>
              </div>
            </div>

            {/* 右侧：演示或可视化 */}
            <div>
              <Card variant="glass" padding="lg" className="text-center h-full">
                <div className="mb-8">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-r ${currentProduct.color} text-white mb-6`}>
                    {currentProduct.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {currentProduct.demo}
                  </h3>
                  <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700 min-h-[200px] flex items-center justify-center">
                    <div className="text-gray-400">
                      <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-sm">Interactive Demo</p>
                      <p className="text-xs">Coming Soon</p>
                    </div>
                  </div>
                </div>
                
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${currentProduct.color} hover:opacity-90 text-white border-0 px-6 py-3 font-semibold`}
                >
                  Try Live Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* 竞争优势对比 */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <GradientText
              preset="blue-purple"
              size="2xl"
              weight="bold"
              className="mb-4"
            >
              {marketPosition.title}
            </GradientText>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {marketPosition.subtitle}
            </p>
          </div>

          <Card variant="glass" padding="lg" className="max-w-4xl mx-auto">
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
                  {marketPosition.competitive.map((comp, index) => (
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
          </Card>
        </motion.div>

        {/* 底部总结 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="glass" padding="lg" className="max-w-5xl mx-auto">
            <GradientText
              preset="green-blue"
              size="2xl"
              weight="bold"
              className="mb-6"
            >
              The Technical Moat That Creates Market Dominance
            </GradientText>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Our integrated product suite doesn&apos;t just solve individual problems — it creates a 
              <strong className="text-white"> defensible ecosystem</strong> where each product reinforces the others. 
              Developers who start with one Dubhe product naturally adopt the entire stack.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={investmentLinks.scheduleMeeting}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 px-8 py-4 text-lg font-semibold w-full"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Schedule Call
                </Button>
              </a>
              <a
                href={investmentLinks.deck}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 hover:border-blue-500/50 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white px-8 py-4 text-lg w-full"
                >
                  <Code className="w-5 h-5 mr-2" />
                  View Deck
                </Button>
              </a>
            </div>
          </Card>
        </motion.div>

      </div>
    </Section>
  )
}