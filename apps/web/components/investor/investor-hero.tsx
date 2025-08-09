"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@workspace/ui/components/button"
import { ArrowRight, TrendingUp, Users, DollarSign, Zap } from "lucide-react"
import Section from "../ui/Section"
import Card from "../ui/Card"
import GradientText from "../ui/GradientText"
import Image from "next/image"

/**
 * 投资相关链接
 */
const investmentLinks = {
  deck: "https://docsend.com/view/iqua3sqswib2jbnv",
  scheduleMeeting: "https://calendly.com/dubheengine/30min"
}

/**
 * 关键指标数据
 */
const keyMetrics = [
  {
    icon: <Users className="w-6 h-6" />,
    label: "Move Developers",
    value: "1,555+",
    trend: "in <3 years",
    color: "text-blue-500"
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    label: "Revenue Generated", 
    value: "$500K+",
    trend: "Proven PMF",
    color: "text-green-500"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    label: "Transaction Volume",
    value: "10M+",
    trend: "Web2-level UX",
    color: "text-purple-500"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    label: "Dev Efficiency",
    value: "80%",
    trend: "Code auto-gen",
    color: "text-orange-500"
  }
]

/**
 * InvestorHero组件 - 投资者导向的Hero区域
 * 
 * 功能特性：
 * - 30秒投资价值主张
 * - 关键traction指标展示
 * - 明确的投资者CTA
 * - 社会证明展示
 * 
 * @returns InvestorHero组件JSX元素
 */
export default function InvestorHero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <Section
      maxWidth="xl"
      paddingY="xl"
      showBackground={true}
      backgroundVariant="gradient"
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      {/* 背景装饰 */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full filter blur-[120px] bg-blue-500 opacity-10 -z-10" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full filter blur-[120px] bg-purple-500 opacity-10 -z-10" />
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full filter blur-[80px] bg-green-500 opacity-5 -z-10" />

      <div className={`w-full transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* 主标题区域 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 text-sm font-semibold rounded-full border border-blue-500/20 mb-4">
              🚀 Series Seed Round - $3M Target
            </span>
          </div>
          
          <GradientText
            preset="blue-purple"
            size="4xl"
            weight="bold"
            className="mb-6 leading-tight"
          >
            The Infrastructure Powering<br />Move&apos;s Next 100M Developers
          </GradientText>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            <strong className="text-white">80% faster development, 30-40% cost reduction</strong> — 
            Supporting the fastest-growing blockchain ecosystem with the first complete Move development stack.
          </p>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Dubhe simplifies Move development with auto-generated code, one-click deployment, 
            and Web2-level user experience across Sui, Aptos, and emerging Move chains.
          </p>
        </motion.div>

        {/* 关键指标网格 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <Card variant="glass" padding="lg" className="text-center h-full">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 ${metric.color} mb-4`}>
                  {metric.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-gray-300 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-gray-500">
                  {metric.trend}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* 核心价值主张 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card variant="glass" padding="lg" className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">80%</div>
                <div className="text-lg font-semibold text-white mb-2">Code Auto-Generation</div>
                <div className="text-sm text-gray-400">Developers focus on 20% core logic, 80% generated automatically</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">30-40%</div>
                <div className="text-lg font-semibold text-white mb-2">Cost Reduction vs Ethereum</div>
                <div className="text-sm text-gray-400">Significantly lower development costs on Move ecosystem</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">&lt;50ms</div>
                <div className="text-lg font-semibold text-white mb-2">Average Latency</div>
                <div className="text-sm text-gray-400">Web2-level real-time user experience</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CTA按钮组 */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href={investmentLinks.deck}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl shadow-blue-500/25 w-full"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              View Investment Deck
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
          
          <a
            href={investmentLinks.scheduleMeeting}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-gray-700 hover:border-blue-500/50 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white px-8 py-4 text-lg transition-all duration-200 rounded-full w-full"
            >
              <Zap className="w-5 h-5 mr-2" />
              Schedule Call
            </Button>
          </a>
        </motion.div>

        {/* 社会证明 */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <p className="text-sm text-gray-500 mb-4">
            Building partnerships across the Move ecosystem
          </p>
          <div className="flex justify-center items-center gap-8">
            <Image src="/marketing/logos/sui.svg" alt="Sui" width={32} height={32} className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 filter invert" />
            <Image src="/marketing/logos/aptos.svg" alt="Aptos" width={32} height={32} className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 filter invert" />
            <Image src="/marketing/logos/rooch.svg" alt="Rooch" width={32} height={32} className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 filter invert" />
            <Image src="/marketing/logos/movement.svg" alt="Movement" width={32} height={32} className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 filter invert" />
            <Image src="/marketing/logos/initia.svg" alt="Initia" width={32} height={32} className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 filter invert" />
          </div>
        </motion.div>

      </div>
    </Section>
  )
}