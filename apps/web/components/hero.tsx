"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ChevronRight, Download, PlayCircle, Globe, Code, Box } from "lucide-react"
import CountUp from "react-countup"
import { motion } from "framer-motion"
import StarCanvas from "./hero/StarCanvas"
import GradientText from "./ui/GradientText"
import { useScrollAnimation } from "../hooks/useScrollAnimation"


/**
 * 统计数据接口定义
 */
interface StatsData {
  /** 交易数量 */
  transactions: number;
  /** 事件数量 */
  events: number;
  /** Gas节约金额 */
  gasSavings: number;
}


/**
 * Hero组件 - 首页主要展示区域
 * 
 * 功能特性：
 * - 动态星座背景动画（Big Dipper/Dubhe星座）
 * - 实时统计数据展示和递增动画
 * - 终端模拟器界面展示
 * - 滚动视差效果
 * - 响应式设计
 * 
 * @returns Hero组件JSX元素
 */
export default function Hero() {
  const [, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Setup scroll-based animations using custom hook
  const { transformOpacity, transformY } = useScrollAnimation({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const backgroundOpacity = transformOpacity({ input: [0, 1], output: [1, 0.3] })
  const headerY = transformY({ input: [0, 1], output: [0, -100] })
  
  // 添加计数器状态
  const [counts, setCounts] = useState<StatsData>({
    transactions: 3214,
    events: 155017,
    gasSavings: 101.9
  })
  
  // 添加状态来控制是否应该增加数值
  const [shouldIncrement] = useState(true)
  
  // 使用 useEffect 创建一个每秒增加数值的定时器
  useEffect(() => {
    if (!shouldIncrement) return
    
    const interval = setInterval(() => {
      setCounts(prev => ({
        transactions: prev.transactions + Math.floor(Math.random() * 5 + 1),
        events: prev.events + Math.floor(Math.random() * 20 + 1),
        gasSavings: prev.gasSavings + Math.random() * 0.1
      }))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [shouldIncrement])
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <motion.div 
      ref={containerRef}
      className="relative overflow-hidden pt-20 pb-16 md:pt-24 md:pb-24 min-h-screen flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Star constellation background animation */}
      <StarCanvas backgroundOpacity={backgroundOpacity} />
      
      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-indigo-900/5 to-purple-900/5 opacity-70 -z-10" />
      
      {/* Animated tech grid pattern with lower opacity */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-3 -z-10" />
      
      {/* Glowing accent */}
      <motion.div 
        className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px] opacity-10 -z-10"
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-[120px] opacity-10 -z-10"
        animate={{ 
          opacity: [0.05, 0.12, 0.05],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 relative z-10">
        <motion.div 
          className="mx-auto max-w-4xl text-center"
          style={{ y: headerY }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              Version 1.1.1 Now Available
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GradientText 
              as="h1"
              preset="custom"
              customGradient="from-white via-blue-100 to-blue-200"
              size="4xl"
              weight="bold"
              className="text-5xl sm:text-7xl md:text-7xl tracking-tight pb-2"
            >
              Move Without <span className="text-blue-400">Limits</span>
            </GradientText>
          </motion.div>
          
          <motion.p 
            className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Dubhe Engine is a Open-source, high-performance engine for real-time Fully On-Chain Move apps. 
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="https://dubhe-docs.obelisk.build/dubhe/sui/quick-start"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 transition-all duration-200 flex items-center"
              >
              <Download className="h-4 w-4 mr-2" />
                Build Now
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="https://www.youtube.com/@DubheEngine"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border-gray-700 hover:border-blue-500 bg-gray-900/50 hover:bg-gray-800 px-8 py-3 text-base transition-all duration-300 text-gray-200 inline-flex items-center"
              >
              <PlayCircle className="h-4 w-4 mr-2" />
                Watch Tutorial
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-10 flex justify-center gap-6 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.1, color: "#4D9DFF" }}
            >
              <Globe className="h-5 w-5 mr-2 text-blue-400" />
              <span>Cross-platform</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.1, color: "#4D9DFF" }}
            >
              <Code className="h-5 w-5 mr-2 text-blue-400" />
              <span>Open Source</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.1, color: "#4D9DFF" }}
            >
              <Box className="h-5 w-5 mr-2 text-blue-400" />
              <span>Real-time Events</span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-20 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ y: -5 }}
        >
          <motion.div 
            className="relative overflow-hidden rounded-lg shadow-2xl shadow-blue-900/20 border border-gray-800"
            whileHover={{ 
              boxShadow: "0 20px 40px -15px rgba(30, 64, 175, 0.3)",
              borderColor: "rgba(96, 165, 250, 0.5)"
            }}
          >
            {/* Terminal interface mockup */}
            <div className="w-full bg-gray-900 aspect-[16/9] relative">
              {/* UI elements overlay to make it look like a terminal window */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800/80 backdrop-blur-sm flex items-center px-4 border-b border-gray-700/50">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-6"></div>
                <div className="text-xs text-gray-400">Project: New Game - Dubhe Engine 1.1.1</div>
              </div>
              
              {/* Terminal content */}
              <div className="terminal-content p-8 pt-16 text-sm text-gray-300 font-mono overflow-y-auto h-full bg-gradient-to-b from-gray-900 to-gray-950">
                {/* Command prompt header with subtle glow */}
                <div className="border-b border-blue-900/30 pb-3 mb-4">
                  <span className="text-blue-500 font-semibold">$ Dubhe Engine CLI</span>
                  <span className="text-gray-500 text-xs ml-2">v1.1.1</span>
                </div>
                
                <div className="command-line flex items-center">
                  <span className="text-cyan-400 mr-2">$</span>
                  <span className="text-white">pnpm create dubhe@latest</span>
                </div>
                <div className="result-line text-gray-400 mt-1">Downloading create-dubhe@0.1.9: 7.41 MB/7.41 MB, done</div>
                <div className="result-line text-teal-700">.../195e05c54ab-abb7 | <span className="text-green-500">+148 ++++++++++++++</span></div>
                <div className="result-line text-gray-400">Progress: resolved <span className="text-green-400">148</span>, reused <span className="text-blue-400">147</span>, downloaded <span className="text-yellow-400">1</span>, added <span className="text-green-400">148</span>, done</div>
                
                <div className="mt-4">
                  <div className="command-line">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span className="text-blue-300">Input your projectName:</span>
                    <span className="text-white ml-2 border-b border-blue-500/30 pb-px">dubhe-template-project</span>
                  </div>
                  <div className="command-line mt-2">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span className="text-blue-300">Pick your chain:</span>
                    <span className="bg-blue-900/20 text-cyan-300 px-2 py-0.5 ml-2 rounded text-xs">sui</span>
                  </div>
                  <div className="command-line mt-2">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span className="text-blue-300">Pick your platform:</span>
                    <span className="bg-blue-900/20 text-cyan-300 px-2 py-0.5 ml-2 rounded text-xs">101</span>
                  </div>
                </div>
                
                <div className="result-line mt-5">
                  <span className="text-yellow-400 flex items-center">
                    <span className="text-2xl mr-2">🎉</span> Project creation successful!
                  </span>
                </div>
                <div className="result-line text-blue-400 flex items-center">
                  <span className="mr-2">📂</span> Project location: <span className="text-gray-400">/path/to/dubhe-template-project</span>
                </div>
                
                <div className="mt-6 bg-blue-950/20 border border-blue-900/30 rounded-md p-4">
                  <div className="next-steps text-white font-semibold flex items-center">
                    <span className="text-blue-500 mr-2">▶</span> Next steps:
                  </div>
                  <div className="command-suggestion ml-6 mt-2">
                    <div className="flex items-center text-yellow-300 my-1">
                      <span className="text-gray-500 mr-2">1.</span>
                      <span className="bg-gray-800/50 px-2 py-0.5 rounded">cd dubhe-template-project</span>
                    </div>
                    <div className="flex items-center text-yellow-300 my-1">
                      <span className="text-gray-500 mr-2">2.</span>
                      <span className="bg-gray-800/50 px-2 py-0.5 rounded">pnpm install</span>
                    </div>
                    <div className="flex items-center text-yellow-300 my-1">
                      <span className="text-gray-500 mr-2">3.</span>
                      <span className="bg-gray-800/50 px-2 py-0.5 rounded">pnpm run start:localnet</span>
                    </div>
                    <div className="flex items-center text-yellow-300 my-1">
                      <span className="text-gray-500 mr-2">4.</span>
                      <span className="bg-gray-800/50 px-2 py-0.5 rounded">pnpm run dev</span>
                    </div>
          </div>
        </div>
        
                <div className="mt-6 cursor-animation flex items-center">
                  <span className="text-cyan-400 mr-2">$</span>
                  <span className="inline-block w-3 h-5 bg-white animate-pulse"></span>
                </div>
              </div>
            </div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-20 pointer-events-none"></div>
            
            {/* Add 3D perspective effect with transform */}
            <div className="absolute inset-0 shadow-inner pointer-events-none border border-blue-500/20 rounded-lg transform perspective"></div>
          </motion.div>
          
          {/* Version label */}
          <motion.div 
            className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-xl px-6 py-3 rounded-full border border-gray-800 shadow-lg z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            whileHover={{ 
              y: -3,
              boxShadow: "0 10px 25px -5px rgba(30, 64, 175, 0.4)",
              borderColor: "rgba(96, 165, 250, 0.6)" 
            }}
          >
            <div className="flex items-center gap-x-2 text-sm font-medium">
              <span className="text-gray-300">Latest Version: <span className="text-blue-400">Dubhe Engine v1.1.1</span></span>
              <ChevronRight className="h-4 w-4 text-blue-400" />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Metrics/Stats Section */}
        <motion.div 
          className="mt-16 pt-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <CountUp 
                  end={counts.transactions} 
                  separator="," 
                  duration={0.5} 
                  useEasing={false}
                  preserveValue={true} 
                  suffix="+" 
                />
              </div>
              <div className="text-gray-400">Transactions</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <CountUp 
                  end={counts.events} 
                  separator="," 
                  duration={0.5} 
                  useEasing={false} 
                  preserveValue={true}
                  suffix="+" 
                />
              </div>
              <div className="text-gray-400">Event-Driven Operations</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <CountUp 
                  end={counts.gasSavings} 
                  decimals={1} 
                  duration={0.5} 
                  useEasing={false} 
                  preserveValue={true}
                  prefix="$" 
                  suffix="M" 
                />
              </div>
              <div className="text-gray-400">Gas Savings (USD)</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">80%+</div>
              <div className="text-gray-400">Time Savings</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 