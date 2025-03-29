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
import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

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

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  
  // Ensure index is valid and feature exists
  const safeIndex = Math.max(0, Math.min(activeFeature, features.length - 1))
  const currentFeature = features[safeIndex]!
  const FeatureIcon = currentFeature.icon

  return (
    <div className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
      
      {/* Content container */}
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-400 mb-3 flex items-center justify-center gap-2">
            <span className="text-yellow-400 text-2xl">🔑</span> KEY FEATURES
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Build Decentralized Applications with Confidence
          </p>
          <p className="mt-6 text-xl leading-8 text-gray-300">
            Dubhe Engine provides powerful tools and primitives for Move developers, with an architecture designed for security, performance, and flexibility.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
            <div className="lg:col-span-1">
              {/* Feature selector */}
              <div className="space-y-2">
                {features.map((feature, index) => {
                  const FeatureIconItem = feature.icon;
                  return (
                    <button
                      key={feature.name}
                      className={`group w-full text-left p-4 rounded-lg transition-all duration-200 border border-gray-800 ${
                        activeFeature === index 
                          ? 'bg-gray-900 shadow-md border-gray-700' 
                          : 'hover:bg-gray-900/50 hover:border-gray-700'
                      }`}
                      onClick={() => setActiveFeature(index)}
                    >
                      <div className="flex items-center">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color}`}>
                          <FeatureIconItem className="h-5 w-5 text-white" aria-hidden="true" />
                        </div>
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
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {/* Feature detail card */}
              <div className="relative h-full rounded-2xl overflow-hidden border border-gray-800 p-6 shadow-lg">
                {/* Glowing accents */}
                <div className={`absolute -top-20 -left-20 w-96 h-96 rounded-full filter blur-[100px] opacity-20 bg-gradient-to-br ${currentFeature.color}`}></div>
                
                {/* Feature content */}
                <div className="relative z-10 h-full flex flex-col">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${currentFeature.color} mb-6`}>
                    <FeatureIcon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{currentFeature.name}</h3>
                  
                  <p className="text-lg text-gray-300 mb-8 flex-grow">
                    {currentFeature.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Button 
                      variant="ghost" 
                      className="text-blue-400 hover:text-blue-300 p-0 hover:bg-transparent"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
                  <MousePointer className="absolute bottom-8 right-8 h-8 w-8 text-blue-400 animate-pulse" />
                  <div className="absolute bottom-12 right-12 w-32 h-32 border-2 border-dashed rounded-lg border-blue-500 opacity-30"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Roadmap Section */}
          <div className="mt-24 pt-8 border-t border-gray-800">
            <div className="flex items-center gap-3 mb-8">
              <LinkIcon className="h-6 w-6 text-gray-500" />
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="text-purple-500 mr-2 text-3xl">🔮</span> Roadmap
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="bg-gradient-to-r from-amber-600 to-amber-400 text-white p-2 rounded-md mr-4 flex-shrink-0">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">ZK-login Plugin Integration</h3>
                    <p className="text-gray-400 mt-1">Zero-knowledge proof login integration for secure authentication without revealing sensitive data.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white p-2 rounded-md mr-4 flex-shrink-0">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Transaction Sponsorship Plugin</h3>
                    <p className="text-gray-400 mt-1">Enable sponsored transactions for improved user experience with gas fees covered by application developers.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-2 rounded-md mr-4 flex-shrink-0">
                    <Repeat className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">State Synchronization Client Hooks</h3>
                    <p className="text-gray-400 mt-1">Synchronize client state with on-chain data automatically for real-time UI updates and consistent experiences.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="bg-gradient-to-r from-gray-600 to-gray-400 text-white p-2 rounded-md mr-4 flex-shrink-0">
                    <Cog className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Custom Runtime Sandbox</h3>
                    <p className="text-gray-400 mt-1">Develop and test applications in a controlled environment that simulates blockchain conditions without deploying.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-2 rounded-md mr-4 flex-shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">World Browser Interface</h3>
                    <p className="text-gray-400 mt-1">Explore and interact with on-chain data through an intuitive visual interface for simplified blockchain navigation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 