"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@workspace/ui/components/button"
import { Code, Database, Network, Layers, Zap, Shield, Globe, ArrowRight } from "lucide-react"
import Section from "./ui/Section"
import Card from "./ui/Card"
import GradientText from "./ui/GradientText"
import AnimatedIcon from "./ui/AnimatedIcon"

/**
 * 技术栈层级接口定义
 */
interface TechStackLayer {
  /** 层级ID */
  id: string;
  /** 层级名称 */
  name: string;
  /** 层级描述 */
  description: string;
  /** 特性列表 */
  features: string[];
  /** 图标组件 */
  icon: React.ReactNode;
  /** 颜色主题 */
  color: string;
  /** 按钮文本 */
  buttonText: string;
  /** 按钮链接 */
  buttonLink: string;
}

/**
 * 技术栈数据配置
 */
const techStackLayers: TechStackLayer[] = [
  {
    id: "dubhe-engine",
    name: "Dubhe Engine",
    description: "The most powerful real-time, fully on-chain DApp development toolchain",
    features: [
      "80% of code can be auto-generated from schemas",
      "Only 1 command to scaffold the dApp project",
      "Schema-based code generation (monolithic vs structured style)",
      "Compatible with Unity, Unreal, Cocos, Godot game engines",
      "Multi-chain deployment: Sui, Aptos, Rooch, Movement, Initia"
    ],
    icon: <Database className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    buttonText: "Build with Dubhe Engine",
    buttonLink: "https://dubhe-docs.obelisk.build"
  },
  {
    id: "dubhe-channel",
    name: "Dubhe Channel",
    description: "The Most Powerful Real-Time Programmable P2P Interaction Channel for DApps",
    features: [
      "Instant front-end rendering: Reflect on-chain changes in real time",
      "Ultra-fast execution speed: Feel like using a web2 app",
      "Directly mirror & override on-chain data: Simulate and interact with real blockchain state locally",
      "Real-time P2P communication between users",
      "Programmable layer with real-time execution powered by Sui Executor"
    ],
    icon: <Network className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    buttonText: "Deploy Dubhe Channel",
    buttonLink: "https://dubhe-docs.obelisk.build/dubhe/sui/quick-start"
  },
  {
    id: "dubhe-os",
    name: "Dubhe OS",
    description: "$DUBHE incentivize builders, forming sustainable Dev Community",
    features: [
      "Operation Fees: Collected and distributed through $DUBHE staking",
      "Task Bounty: Community-driven rewards for ecosystem development",
      "On-chain Launchpad: For mature DApps built with Dubhe",
      "Cross-chain Bridge & Governance: Connect with multiple blockchain ecosystems",
      "Community Users, Validator Nodes, DApps integration"
    ],
    icon: <Globe className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
    buttonText: "Join Dubhe OS",
    buttonLink: "https://dubhe-docs.obelisk.build"
  }
];


/**
 * TechStack组件 - 技术栈展示区域
 * 
 * 功能特性：
 * - 分层式技术栈展示
 * - 3D动效图标
 * - 交互式特性列表
 * - 渐变背景效果
 * - 响应式布局
 * 
 * @returns TechStack组件JSX元素
 */
export default function TechStack() {
  const [activeLayer, setActiveLayer] = useState<string>(techStackLayers[0]?.id || "")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    // 自动轮播激活状态
    const interval = setInterval(() => {
      setActiveLayer(prev => {
        const currentIndex = techStackLayers.findIndex(layer => layer.id === prev)
        const nextIndex = (currentIndex + 1) % techStackLayers.length
        return techStackLayers[nextIndex]?.id || ""
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Section
      title="The Dubhe Technology Stack"
      subtitle="Complete development toolchain, real-time interaction layer, and decentralized operating system for Move applications"
      label="TECHNOLOGY STACK"
      maxWidth="xl"
      paddingY="xl"
      showBackground={true}
      backgroundVariant="gradient"
      className="relative overflow-hidden"
    >
      {/* 额外的背景装饰 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full filter blur-[120px] bg-purple-500 opacity-10 -z-10" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full filter blur-[120px] bg-cyan-500 opacity-10 -z-10" />

      <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* 技术栈层级展示 */}
        <div className="space-y-24">
          {techStackLayers.map((layer, index) => (
            <motion.div
              key={layer.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onViewportEnter={() => setActiveLayer(layer.id)}
            >
              {/* 图标区域 - 左右交替布局 */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} flex justify-center`}>
                <AnimatedIcon
                  gradient={layer.color}
                  isActive={activeLayer === layer.id}
                  size="lg"
                >
                  {layer.icon}
                </AnimatedIcon>
              </div>

              {/* 内容区域 */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} space-y-6`}>
                <div>
                  <GradientText
                    preset="custom"
                    customGradient={layer.color}
                    size="3xl"
                    weight="bold"
                    className="mb-4"
                  >
                    {layer.name}
                  </GradientText>
                  <p className="text-xl text-gray-300 mb-6">
                    {layer.description}
                  </p>
                </div>

                {/* 特性列表 */}
                <Card variant="glass" padding="lg">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-x-4 text-sm font-medium leading-6 text-blue-400">
                      <Layers className="w-4 h-4" />
                      Key Features
                      <div className="h-px flex-auto bg-gradient-to-r from-blue-500/50 to-transparent" />
                    </h4>
                    <ul className="space-y-3">
                      {layer.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex gap-x-3 items-start text-sm leading-6 text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 flex-shrink-0 mt-0.5">
                            <Zap className="h-3 w-3" />
                          </div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </Card>

                {/* 行动按钮 */}
                <div className="flex gap-4 pt-4">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0 px-6 py-3 text-base font-semibold transition-all duration-200"
                  >
                    <a 
                      href={layer.buttonLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      {layer.buttonText}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="border-gray-700 hover:border-blue-500/50 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white px-6 py-3 text-base transition-all duration-200"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 底部总结 */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="glass" padding="lg" className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <GradientText
                preset="blue-purple"
                size="2xl"
                weight="bold"
              >
                Build the Future of Decentralized Applications
              </GradientText>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                From 80% automated code generation to Web2-level user experience and sustainable 
                ecosystem incentives - Dubhe provides the complete stack for building the next 
                generation of fully on-chain applications on Move blockchains.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 px-8 py-4 text-lg font-semibold"
                >
                  <a 
                    href="https://dubhe-docs.obelisk.build/dubhe/sui/quick-start" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Code className="w-5 h-5" />
                    Start Building Now
                  </a>
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-gray-700 hover:border-blue-500/50 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white px-8 py-4 text-lg"
                >
                  <Database className="w-5 h-5 mr-2" />
                  View Documentation
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  )
}