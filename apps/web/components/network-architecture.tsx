"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@workspace/ui/components/button"
import { ArrowDown, Shield, Zap, Network, Database } from "lucide-react"
import Section from "./ui/Section"
import Card from "./ui/Card"

/**
 * 网络层级接口定义
 */
interface NetworkLayer {
  /** 层级ID */
  id: string;
  /** 层级名称 */
  name: string;
  /** 层级描述 */
  description: string;
  /** 背景颜色 */
  bgColor: string;
  /** 文本颜色 */
  textColor: string;
  /** 特性列表 */
  features?: string[];
  /** 是否显示箭头 */
  showArrow?: boolean;
}


/**
 * 网络架构数据配置
 */
const networkLayers: NetworkLayer[] = [
  {
    id: "applications",
    name: "Move Applications",
    description: "Decentralized applications built with Dubhe Engine across Move ecosystem",
    bgColor: "bg-amber-100",
    textColor: "text-amber-900",
    features: [
      "Fully On-Chain RPG Games",
      "DeFi Protocols with Real-time UX", 
      "Social Applications",
      "Autonomous Worlds"
    ],
    showArrow: true
  },
  {
    id: "dubhe-engine",
    name: "Dubhe Engine",
    description: "The most powerful real-time, fully on-chain DApp development toolchain with 80% code auto-generation",
    bgColor: "bg-purple-200",
    textColor: "text-purple-900",
    features: [
      "Schema-based code generation",
      "One command to scaffold dApp",
      "Unity, Cocos, Unreal Engine integration",
      "Multi-chain deployment (Sui, Aptos, Rooch, Movement, Initia)"
    ],
    showArrow: true
  },
  {
    id: "dubhe-channel",
    name: "Dubhe Channel",
    description: "Real-time programmable P2P interaction channel providing Web2-level user experience for DApps",
    bgColor: "bg-blue-200", 
    textColor: "text-blue-900",
    features: [
      "Instant front-end rendering",
      "Ultra-fast execution speed",
      "Direct mirror & override on-chain data",
      "&lt;50ms average latency"
    ],
    showArrow: true
  },
  {
    id: "dubhe-os",
    name: "Dubhe OS",
    description: "Decentralized operating system with $DUBHE token incentives, bridging, and governance mechanisms",
    bgColor: "bg-green-200",
    textColor: "text-green-900",
    features: [
      "Operation Fees & $DUBHE Staking",
      "Task Bounty System",
      "On-chain Launchpad",
      "Cross-chain Bridge & Governance"
    ],
    showArrow: false
  }
];


/**
 * 特性数据配置
 */
const networkFeatures = [
  "10M+ transactions processed",
  "&lt;200ms average latency", 
  "Web2-level user experience",
  "Compatible with Sui, Aptos, Rooch, Movement, Initia"
];

/**
 * 网络层级组件
 */
interface NetworkLayerCardProps {
  layer: NetworkLayer;
  index: number;
  isVisible: boolean;
}

function NetworkLayerCard({ layer, index, isVisible }: NetworkLayerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative"
    >
      {/* 层级卡片 */}
      <div className={`${layer.bgColor} ${layer.textColor} rounded-xl p-8 shadow-lg border border-gray-300 min-h-[120px] flex flex-col justify-center`}>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-3">
            {layer.name.includes("Dubhe") ? (
              <>
                <span className="text-gray-700">
                  {layer.name.split("Dubhe")[0]}
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Dubhe
                </span>
                <span className="text-gray-700">
                  {layer.name.split("Dubhe")[1]}
                </span>
              </>
            ) : (
              layer.name
            )}
          </h3>
          <p className="text-sm leading-relaxed">
            {layer.description}
          </p>
          
          {/* 特性列表 */}
          {layer.features && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {layer.features.map((feature, idx) => (
                <div key={idx} className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                  {feature}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 连接箭头 */}
      {layer.showArrow && (
        <motion.div
          className="flex justify-center mt-4 mb-4"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
            <ArrowDown className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * NetworkArchitecture组件 - 网络架构展示区域
 * 
 * 功能特性：
 * - 分层网络架构展示
 * - 应用类型展示
 * - 渐进式动画效果
 * - 响应式布局设计
 * 
 * @returns NetworkArchitecture组件JSX元素
 */
export default function NetworkArchitecture() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleLayers, setVisibleLayers] = useState<Set<number>>(new Set())

  useEffect(() => {
    setIsLoaded(true)
    
    // 渐进式显示层级
    const timer = setTimeout(() => {
      networkLayers.forEach((_, index) => {
        setTimeout(() => {
          setVisibleLayers(prev => new Set([...prev, index]))
        }, index * 300)
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Section
      title="The Complete Move Development Stack"
      subtitle="From development tools to real-time interaction channels and decentralized infrastructure - Dubhe provides everything needed to build the next generation of fully on-chain applications."
      label="NETWORK ARCHITECTURE"
      maxWidth="xl"
      paddingY="xl"
      showBackground={true}
      backgroundVariant="gradient"
      className="relative overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full filter blur-[120px] bg-blue-500 opacity-5 -z-10" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full filter blur-[120px] bg-green-500 opacity-5 -z-10" />

      <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* 应用层展示 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Performance Metrics 区域 */}
            <Card variant="glass" padding="lg" className="bg-amber-50/80 border-amber-200">
              <div className="text-center">
                <h3 className="text-lg font-bold text-amber-900 mb-4">Key Metrics</h3>
                <div className="space-y-2">
                  {networkFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 text-sm text-amber-800"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Move Ecosystem 区域 */}
            <Card variant="glass" padding="lg" className="bg-amber-50/80 border-amber-200">
              <div className="text-center">
                <h3 className="text-lg font-bold text-amber-900 mb-4">Move Ecosystem</h3>
                <div className="text-sm text-amber-800">
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">Supported Chains</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-amber-200/50 rounded-lg p-2 text-xs">Sui</div>
                      <div className="bg-amber-200/50 rounded-lg p-2 text-xs">Aptos</div>
                      <div className="bg-amber-200/50 rounded-lg p-2 text-xs">Rooch</div>
                      <div className="bg-amber-200/50 rounded-lg p-2 text-xs">Movement</div>
                      <div className="bg-amber-200/50 rounded-lg p-2 text-xs">Initia</div>
                      <div className="bg-amber-300/50 rounded-lg p-2 text-xs font-medium">+ More</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* 网络架构层级 */}
        <div className="max-w-4xl mx-auto space-y-0">
          {networkLayers.map((layer, index) => (
            <NetworkLayerCard
              key={layer.id}
              layer={layer}
              index={index}
              isVisible={visibleLayers.has(index)}
            />
          ))}
        </div>

        {/* 底部总结文本 */}
        <motion.div
          className="mt-16 text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Dubhe provides the complete infrastructure stack for Move development - from automated code generation 
            and real-time user interaction to decentralized operations and cross-chain compatibility. This enables 
            developers to focus on 20% core logic while 80% is automatically generated and managed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full"
            >
              <a 
                href="https://dubhe-docs.obelisk.build" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Database className="w-5 h-5" />
                Read Dubhe Thesis
              </a>
            </Button>
          </div>
        </motion.div>

        {/* 技术指标网格 */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="glass" padding="lg" className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">80% Code Auto-Generation</h3>
            <p className="text-gray-600">
              Schema-based development with automatic code generation for Move smart contracts
            </p>
          </Card>

          <Card variant="glass" padding="lg" className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <Network className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time P2P Channel</h3>
            <p className="text-gray-600">
              Web2-level user experience with &lt;50ms latency for on-chain applications
            </p>
          </Card>

          <Card variant="glass" padding="lg" className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Chain Support</h3>
            <p className="text-gray-600">
              Native support for all major Move chains with seamless deployment
            </p>
          </Card>
        </motion.div>
      </div>
    </Section>
  )
}