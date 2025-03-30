"use client"

import { 
  Layers, 
  Code, 
  Box, 
  Cpu, 
  Shield, 
  Users, 
  Bolt, 
  Workflow,
  MousePointer,
  ArrowRight,
  LucideIcon,
  Globe,
  Zap,
  Building2,
  Package,
  Wrench,
  Link as LinkIcon,
  Lock,
  DollarSign,
  Repeat,
  Cog
} from "lucide-react"
import { useState, useRef } from "react"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"

interface Feature {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const features: Feature[] = [
  {
    name: "Built with Move",
    description:
      "Leveraging Move programming language for secure, efficient, and flexible blockchain development with robust verification capabilities.",
    icon: Zap,
    color: "from-blue-600 to-cyan-600"
  },
  {
    name: "Harvard Structural Architecture",
    description:
      "Implements Harvard Architecture principles to separate data and instruction memory, providing enhanced security and performance.",
    icon: Building2,
    color: "from-purple-600 to-indigo-600"
  },
  {
    name: "Structured Schema-based Storage",
    description:
      "Store data using flexible schemas that ensure data integrity and efficient retrieval while maintaining compatibility across platforms.",
    icon: Package,
    color: "from-orange-600 to-red-600"
  },
  {
    name: "Multi-Move Ecosystem Support",
    description:
      "Seamlessly integrate with various Move-based blockchain platforms including Sui, Aptos, and other compatible networks.",
    icon: Globe,
    color: "from-yellow-600 to-amber-600"
  },
  {
    name: "Development Tools",
    description:
      "Complete suite of development tools including sandbox networking, indexing services, type-safe SDKs, hot updates, and data migration.",
    icon: Wrench,
    color: "from-teal-600 to-emerald-600"
  },
  {
    name: "Automated Indexer",
    description:
      "Built-in indexing system that automatically tracks and catalogs on-chain events and transactions for quick access and analysis.",
    icon: Code,
    color: "from-blue-600 to-indigo-600"
  },
  {
    name: "Type-safe SDKs",
    description:
      "Generate strongly-typed software development kits that provide compile-time safety and enhanced developer experience.",
    icon: Shield,
    color: "from-pink-600 to-rose-600"
  },
  {
    name: "Hot Updates & Data Migration",
    description:
      "Seamlessly update your applications and migrate data without disrupting user experience or requiring system downtime.",
    icon: Bolt,
    color: "from-green-600 to-emerald-600"
  },
]

const featureCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
      duration: 0.5,
      ease: "easeOut"
    }
  })
}

const glowVariants = {
  initial: { opacity: 0.2 },
  animate: {
    opacity: [0.2, 0.4, 0.2],
    scale: [1, 1.1, 1],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
}

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 })
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.5, 1, 1, 0.5])
  const scaleFactor = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.95, 1, 1, 0.98])
  
  // Ensure index is valid and feature exists
  const safeIndex = Math.max(0, Math.min(activeFeature, features.length - 1))
  const currentFeature = features[safeIndex]!
  const FeatureIcon = currentFeature.icon

  return (
    <motion.div 
      id="features" 
      className="py-24 sm:py-32 relative overflow-hidden"
      ref={containerRef}
      style={{ opacity: sectionOpacity, scale: scaleFactor }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-black -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />
      
      {/* Animated border gradients */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
      />
      
      {/* Floating constellation particles */}
      <motion.div
        className="absolute top-20 left-20 w-80 h-80 rounded-full bg-blue-500/5 blur-[80px] -z-5"
        animate={{
          y: [0, 30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-purple-500/5 blur-[80px] -z-5"
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      
      {/* Content container */}
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-2xl lg:text-center"
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-base font-semibold leading-7 text-blue-400 mb-3 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span 
              className="text-yellow-400 text-2xl"
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.2, 1, 1.2, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatDelay: 5
              }}
            >
              🔑
            </motion.span> KEY FEATURES
          </motion.h2>
          
          <motion.p 
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Build Decentralized Applications with Confidence
          </motion.p>
          
          <motion.p 
            className="mt-6 text-xl leading-8 text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Dubhe Engine provides powerful tools and primitives for Move developers, with an architecture designed for security, performance, and flexibility.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="mx-auto mt-16 max-w-2xl lg:max-w-none"
          initial={{ opacity: 0, y: 40 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
            <div className="lg:col-span-1">
              {/* Feature selector */}
              <div className="space-y-2">
                <AnimatePresence>
                  {features.map((feature, index) => {
                    const FeatureIconItem = feature.icon;
                    return (
                      <motion.button
                        key={feature.name}
                        custom={index}
                        variants={featureCardVariants}
                        initial="hidden"
                        animate="visible"
                        className={`group w-full text-left p-4 rounded-lg transition-all duration-200 border border-gray-800 ${
                          activeFeature === index 
                            ? 'bg-gray-900 shadow-md border-gray-700' 
                            : 'hover:bg-gray-900/50 hover:border-gray-700'
                        }`}
                        onClick={() => setActiveFeature(index)}
                        whileHover={{ x: 5, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center">
                          <motion.div 
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color}`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            animate={activeFeature === index ? { scale: [1, 1.1, 1], rotate: [0, 5, 0] } : {}}
                            transition={activeFeature === index ? { duration: 0.5 } : {}}
                          >
                            <FeatureIconItem className="h-5 w-5 text-white" aria-hidden="true" />
                          </motion.div>
                          <div className="ml-4">
                            <p className={`text-base font-semibold ${
                              activeFeature === index ? 'text-blue-400' : 'text-gray-200'
                            }`}>
                              {feature.name}
                            </p>
                            <div className={`h-0.5 w-0 bg-blue-500 mt-1 transition-all duration-300 ${
                              activeFeature === index ? 'w-full' : 'group-hover:w-1/4'
                            }`}></div>
        </div>
                </div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {/* Feature detail card */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeFeature}
                  className="relative h-full rounded-2xl overflow-hidden border border-gray-800 p-6 shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Glowing accents */}
                  <motion.div 
                    className={`absolute -top-20 -left-20 w-96 h-96 rounded-full filter blur-[100px] opacity-20 bg-gradient-to-br ${currentFeature.color}`}
                    variants={glowVariants}
                    initial="initial"
                    animate="animate"
                  />
                  
                  {/* Feature content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <motion.div 
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${currentFeature.color} mb-6`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <FeatureIcon className="h-8 w-8 text-white" aria-hidden="true" />
                    </motion.div>
                    
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {currentFeature.name}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-lg text-gray-300 mb-8 flex-grow"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {currentFeature.description}
                    </motion.p>
                    
                    <motion.div 
                      className="mt-auto"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <motion.div
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Link 
                          href="https://dubhe-docs.obelisk.build/dubhe/sui/quick-start"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 p-0 hover:bg-transparent"
                        >
                          <span>Learn more</span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                          >
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
                    <motion.div
                      animate={{ 
                        x: [0, 8, 0, -8, 0],
                        y: [0, 5, 0, -5, 0]
                      }}
                      transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <MousePointer className="absolute bottom-8 right-8 h-8 w-8 text-blue-400" />
                    </motion.div>
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, 0, -10, 0],
                        scale: [1, 1.05, 1, 0.95, 1]
                      }}
                      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <div className="absolute bottom-12 right-12 w-32 h-32 border-2 border-dashed rounded-lg border-blue-500 opacity-30"></div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Roadmap Section */}
          <motion.div 
            className="mt-24 pt-8 border-t border-gray-800"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div 
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 15, 0, -15, 0],
                  transition: { duration: 4, repeat: Infinity, repeatType: "reverse" }
                }}
              >
                <LinkIcon className="h-6 w-6 text-gray-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white flex items-center">
                <motion.span 
                  className="text-purple-500 mr-2 text-3xl"
                  animate={{ 
                    scale: [1, 1.2, 1], 
                    rotate: [0, 10, 0] 
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    repeatType: "reverse"
                  }}
                >
                  🔮
                </motion.span> Roadmap
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                {[
                  {
                    icon: <Lock className="h-5 w-5" />,
                    color: "from-amber-600 to-amber-400",
                    title: "ZK-login Plugin Integration",
                    description: "Zero-knowledge proof login integration for secure authentication without revealing sensitive data."
                  },
                  {
                    icon: <DollarSign className="h-5 w-5" />,
                    color: "from-yellow-600 to-yellow-400",
                    title: "Transaction Sponsorship Plugin",
                    description: "Enable sponsored transactions for improved user experience with gas fees covered by application developers."
                  },
                  {
                    icon: <Repeat className="h-5 w-5" />,
                    color: "from-blue-600 to-blue-400",
                    title: "State Synchronization Client Hooks",
                    description: "Synchronize client state with on-chain data automatically for real-time UI updates and consistent experiences."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={item.title}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ x: 5, scale: 1.01 }}
                  >
                    <motion.div 
                      className={`bg-gradient-to-r ${item.color} text-white p-2 rounded-md mr-4 flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                      <p className="text-gray-400 mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="space-y-5">
                {[
                  {
                    icon: <Cog className="h-5 w-5" />,
                    color: "from-gray-600 to-gray-400",
                    title: "Custom Runtime Sandbox",
                    description: "Develop and test applications in a controlled environment that simulates blockchain conditions without deploying."
                  },
                  {
                    icon: <Globe className="h-5 w-5" />,
                    color: "from-green-600 to-green-400",
                    title: "World Browser Interface",
                    description: "Explore and interact with on-chain data through an intuitive visual interface for simplified blockchain navigation."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={item.title}
                    className="flex items-start"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ x: -5, scale: 1.01 }}
                  >
                    <motion.div 
                      className={`bg-gradient-to-r ${item.color} text-white p-2 rounded-md mr-4 flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                      <p className="text-gray-400 mt-1">{item.description}</p>
                    </div>
                  </motion.div>
            ))}
          </div>
        </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
} 