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
    name: "Applications & dApps",
    description: "Decentralized applications built on Dubhe infrastructure",
    bgColor: "bg-amber-100",
    textColor: "text-amber-900",
    features: [
      "GameFi Applications",
      "DeFi Protocols", 
      "Social Applications",
      "NFT Marketplaces"
    ],
    showArrow: true
  },
  {
    id: "dubhe-nexus",
    name: "Dubhe Nexus",
    description: "A trust-minimized interoperability layer enabling seamless cross-rollup and sovereign chain communication",
    bgColor: "bg-green-200",
    textColor: "text-green-900",
    showArrow: true
  },
  {
    id: "dubhe-da",
    name: "Dubhe DA",
    description: "Horizontally scalable DA with KZG commitments & DAS for trust-minimized, near-instant verification",
    bgColor: "bg-blue-200", 
    textColor: "text-blue-900",
    showArrow: true
  },
  {
    id: "dubhe-consensus",
    name: "Dubhe Consensus",
    description: "A shared security layer leveraging re-staking to provide crypto-economic finality for modular blockchains",
    bgColor: "bg-purple-200",
    textColor: "text-purple-900",
    showArrow: false
  }
];


/**
 * 特性数据配置
 */
const networkFeatures = [
  "Optimistic execution with fraud proofs",
  "Zero-Knowledge proof verification", 
  "Validium architecture support",
  "Sovereign chain interoperability"
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
      title="Scalable, Secure, Interoperable Network"
      subtitle="Dubhe's horizontally scalable, chain-agnostic and trust-minimized infrastructure unifies the fragmented blockchain ecosystem by providing unlimited blockspace, native interoperability, and modular security."
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
            {/* Rollups 区域 */}
            <Card variant="glass" padding="lg" className="bg-amber-50/80 border-amber-200">
              <div className="text-center">
                <h3 className="text-lg font-bold text-amber-900 mb-4">Rollups</h3>
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

            {/* Appchains 区域 */}
            <Card variant="glass" padding="lg" className="bg-amber-50/80 border-amber-200">
              <div className="text-center">
                <h3 className="text-lg font-bold text-amber-900 mb-4">Appchains</h3>
                <div className="text-sm text-amber-800">
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">dApps</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-amber-200/50 rounded-lg p-2 text-xs">GameFi</div>
                      <div className="bg-amber-200/50 rounded-lg p-2 text-xs">DeFi</div>
                      <div className="bg-amber-200/50 rounded-lg p-2 text-xs">SocialFi</div>
                      <div className="bg-amber-200/50 rounded-lg p-2 text-xs">NFTs</div>
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
            By eliminating reliance on centralized full nodes, reducing fragmentation, and enabling seamless 
            communication between appchains, rollups, and dApps, Dubhe empowers developers to build scalable, 
            connected, and customer-centric applications, unlocking the next era of web3 innovation.
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Finality</h3>
            <p className="text-gray-600">
              Near-instant transaction verification with trust-minimized security guarantees
            </p>
          </Card>

          <Card variant="glass" padding="lg" className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <Network className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Horizontal Scaling</h3>
            <p className="text-gray-600">
              Unlimited blockspace that scales with network demand and usage
            </p>
          </Card>

          <Card variant="glass" padding="lg" className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Modular Security</h3>
            <p className="text-gray-600">
              Flexible security models with crypto-economic finality and shared security
            </p>
          </Card>
        </motion.div>
      </div>
    </Section>
  )
}