"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Code2, 
  Zap, 
  Layers, 
  Database,
  ArrowRight,
  CheckCircle,
  Cpu,
  Sparkles
} from "lucide-react"
import Link from "next/link"

const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
    50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.6); }
  }
  
  @keyframes code-scroll {
    0% { transform: translateY(0); }
    100% { transform: translateY(-20px); }
  }
  
  .engine-gradient {
    background: linear-gradient(135deg, 
      #8b5cf6 0%, 
      #3b82f6 50%, 
      #06b6d4 100%);
  }
  
  .feature-card {
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`

export default function EnginePage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "80% Code Auto-Generation",
      description: "Dramatically reduce development time with intelligent code generation that handles boilerplate, data structures, and common patterns automatically.",
      details: [
        "Schema-driven code generation",
        "Automatic API endpoint creation",
        "Smart contract scaffolding",
        "UI component generation"
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Schema-Based Development",
      description: "Define your data structures once and let Dubhe Engine generate everything else. Changes propagate automatically across your entire application.",
      details: [
        "Single source of truth",
        "Automatic type safety",
        "Real-time validation",
        "Cross-platform compatibility"
      ]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time DApp Toolchain",
      description: "Build fully on-chain applications with real-time capabilities. From game state to financial applications, everything happens instantly.",
      details: [
        "Sub-second transaction finality",
        "Real-time state synchronization",
        "Event-driven architecture",
        "Optimistic UI updates"
      ]
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Multi-Chain Support",
      description: "Deploy across multiple Move-based chains without changing your code. Write once, deploy everywhere.",
      details: [
        "Sui network integration",
        "Aptos compatibility",
        "Movement network support",
        "Cross-chain state management"
      ]
    }
  ]

  const workflow = [
    {
      step: "01",
      title: "Define Schema",
      description: "Create your data models and business logic using our intuitive schema definition language"
    },
    {
      step: "02", 
      title: "Generate Code",
      description: "Dubhe Engine automatically generates 80% of your application code including smart contracts and APIs"
    },
    {
      step: "03",
      title: "Customize Logic",
      description: "Focus on the unique 20% - your business logic, custom features, and user experience"
    },
    {
      step: "04",
      title: "Deploy Instantly",
      description: "One-click deployment to multiple Move chains with automatic optimization and monitoring"
    }
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-blue-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/30 to-cyan-600/40 rounded-full blur-3xl"></div>
          
          {/* Floating code elements */}
          <div className="absolute inset-0 overflow-hidden">
            {isClient && Array.from({ length: 20 }).map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const topPositions = [15, 25, 35, 45, 55, 65, 75, 85, 95, 5, 20, 30, 40, 50, 60, 70, 80, 90, 10, 85];
              const leftPositions = [10, 30, 50, 70, 90, 20, 40, 60, 80, 25, 45, 65, 85, 15, 35, 55, 75, 95, 5, 25];
              const durations = [3, 4, 5, 3.5, 4.5, 5.5, 3.2, 4.2, 5.2, 3.8, 4.8, 3.3, 4.3, 5.3, 3.7, 4.7, 5.7, 3.1, 4.1, 5.1];
              const delays = [0, 0.5, 1, 1.5, 2, 0.2, 0.7, 1.2, 1.7, 0.3, 0.8, 1.3, 1.8, 0.1, 0.6, 1.1, 1.6, 0.4, 0.9, 1.4];
              const codeElements = ['func', 'struct', 'impl', 'pub', 'move'];
              
              return (
                <div
                  key={`code-${i}`}
                  className="absolute text-purple-300/20 font-mono text-xs"
                  style={{
                    top: `${topPositions[i] || 50}%`,
                    left: `${leftPositions[i] || 50}%`,
                    animation: `float ${durations[i] || 3}s ease-in-out infinite ${delays[i] || 0}s`
                  }}
                >
                  {codeElements[i % 5]}
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
                className="inline-block bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-purple-500/20"
              >
                <Cpu className="w-4 h-4 inline mr-2" />
                Dubhe Engine
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-5xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  80% Code
                  <br />
                  <span className="engine-gradient bg-clip-text text-transparent">
                    Auto-Generation
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Schema-based development platform that generates smart contracts, APIs, and UI components automatically. 
                  Focus on what matters - your unique business logic.
                </motion.p>
              </div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">80%</div>
                  <div className="text-gray-300">Code Auto-Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">10x</div>
                  <div className="text-gray-300">Faster Development</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">Multi-Chain</div>
                  <div className="text-gray-300">Move Ecosystem</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href="https://dubhe-docs.obelisk.build/dubhe" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
                  Start Building
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                
                <Link href="https://dubhe-docs.obelisk.build/dubhe" target="_blank" rel="noopener noreferrer" className="border-2 border-purple-400/50 hover:border-purple-300 bg-purple-900/20 backdrop-blur-sm text-purple-100 hover:text-white hover:bg-purple-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center">
                  View Documentation
                </Link>
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
              className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-purple-200"
            >
              Core Features
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Build Faster, Ship Sooner
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Dubhe Engine handles the heavy lifting so you can focus on innovation
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
                className="feature-card bg-slate-800/50 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                <div className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-purple-500/20"
            >
              Development Workflow
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              From Idea to Production
              <br />
              in 4 Simple Steps
            </motion.h2>
          </div>

          {/* Workflow Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {workflow.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center relative"
              >
                {/* Connection line */}
                {index < workflow.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-16 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
                )}
                
                {/* Step number */}
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {step.step}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to 10x Your Development Speed?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join developers building the future of fully on-chain applications
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="https://dubhe-docs.obelisk.build/dubhe" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
              Get Started Free
              <Sparkles className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/contact" className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center">
              Schedule Demo
            </Link>
          </motion.div>
        </div>
      </div>

    </>
  )
}