"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Building, 
  Code, 
  ArrowRight,
  CheckCircle,
  Network,
  Layers,
  Sparkles,
  ExternalLink,
  Zap
} from "lucide-react"

const customStyles = `
  @keyframes lab-pulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.05); opacity: 1; }
  }
  
  @keyframes connect-line {
    0% { stroke-dashoffset: 100; }
    100% { stroke-dashoffset: 0; }
  }
  
  @keyframes tech-orbit {
    0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
  }
  
  .labs-gradient {
    background: linear-gradient(135deg, 
      #06b6d4 0%, 
      #3b82f6 50%, 
      #8b5cf6 100%);
  }
  
  .lab-card {
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`

export default function LabsPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const labs = [
    {
      name: "Obelisk Labs",
      logo: "🏛️",
      focus: "Core Protocol Development",
      description: "Leading the development of Dubhe Engine and core protocol infrastructure. Focused on Move language tooling and schema-based development platforms.",
      website: "https://obelisk.build",
      contributions: [
        "Dubhe Engine architecture",
        "Move smart contract framework",
        "Developer toolchain",
        "Code generation systems"
      ],
      status: "Active",
      team: "12+ Engineers"
    },
    {
      name: "Cyferio Labs",
      logo: "🔬",
      focus: "Zero-Knowledge & Privacy",
      description: "Specialized in zero-knowledge proofs, privacy-preserving protocols, and cryptographic research for the Dubhe ecosystem.",
      website: "https://cyferio.com",
      contributions: [
        "ZK proof systems",
        "Privacy protocols",
        "Cryptographic primitives",
        "Scalability research"
      ],
      status: "Active",
      team: "8+ Researchers"
    },
    {
      name: "Obelisk Labs",
      logo: "⚡",
      focus: "Real-Time Infrastructure",
      description: "Building the real-time P2P communication layer and high-performance networking infrastructure for Dubhe Channel.",
      website: "#",
      contributions: [
        "P2P networking protocols",
        "Real-time communication",
        "Performance optimization",
        "Edge computing solutions"
      ],
      status: "Active",
      team: "6+ Engineers"
    },
    {
      name: "Obelisk Labs",
      logo: "🌐",
      focus: "Cross-Chain Solutions",
      description: "Developing universal bridging protocols and cross-chain infrastructure to connect the Move ecosystem through Dubhe OS.",
      website: "#",
      contributions: [
        "Cross-chain bridges",
        "Interoperability protocols",
        "Multi-chain governance",
        "Asset transfer mechanisms"
      ],
      status: "Active",
      team: "10+ Engineers"
    }
  ]

  const researchAreas = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Protocol Development",
      description: "Core blockchain protocols, consensus mechanisms, and Move language enhancements",
      teams: ["Obelisk Labs"]
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Infrastructure & Scaling",
      description: "High-performance networking, real-time communication, and scalability solutions",
      teams: ["Obelisk Labs","Cyferio Labs"]
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Cross-Chain Technology",
      description: "Interoperability protocols, universal bridging, and multi-chain governance",
      teams: ["Obelisk Labs"]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Privacy & Security",
      description: "Zero-knowledge proofs, privacy-preserving protocols, and cryptographic research",
      teams: ["Cyferio Labs"]
    }
  ]

  const collaboration = [
    {
      phase: "Research",
      description: "Collaborative research and protocol design across all teams"
    },
    {
      phase: "Development",
      description: "Parallel implementation with shared standards and interfaces"
    },
    {
      phase: "Testing",
      description: "Cross-team integration testing and validation"
    },
    {
      phase: "Deployment",
      description: "Coordinated rollout and ecosystem integration"
    }
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-blue-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/30 to-purple-600/40 rounded-full blur-3xl"></div>
          
          {/* Tech orbiting elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {isClient && Array.from({ length: 8 }).map((_, i) => {
                // Use deterministic values based on index to avoid hydration mismatch
                const durations = [12, 15, 18, 21, 24, 27, 30, 33];
                const delays = [0, 1.5, 3, 4.5, 6, 7.5, 9, 10.5];
                
                return (
                  <div
                    key={`tech-${i}`}
                    className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                    style={{
                      animation: `tech-orbit ${durations[i] || 12}s linear infinite`,
                      animationDelay: `${delays[i] || 0}s`
                    }}
                  />
                );
              })}
            </div>
            
            {/* Floating lab icons */}
            {isClient && Array.from({ length: 12 }).map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const topPositions = [10, 25, 40, 55, 70, 85, 15, 30, 45, 60, 75, 90];
              const leftPositions = [12, 28, 44, 60, 76, 92, 8, 24, 52, 68, 84, 36];
              const durations = [3, 4, 5, 3.5, 4.5, 3.2, 4.2, 5.2, 3.8, 4.8, 3.3, 4.3];
              const delays = [0, 0.5, 1, 1.5, 2, 0.2, 0.7, 1.2, 1.7, 0.3, 0.8, 1.3];
              
              return (
                <div
                  key={`lab-${i}`}
                  className="absolute text-cyan-300/20 text-xl"
                  style={{
                    top: `${topPositions[i] || 50}%`,
                    left: `${leftPositions[i] || 50}%`,
                    animation: `lab-pulse ${durations[i] || 3}s ease-in-out infinite ${delays[i] || 0}s`
                  }}
                >
                  ⚗️
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
                className="inline-block bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-cyan-500/20"
              >
                <Building className="w-4 h-4 inline mr-2" />
                Dubhe Development Labs
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-5xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Collaborative
                  <br />
                  <span className="labs-gradient bg-clip-text text-transparent">
                    Innovation Labs
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Multiple specialized development teams working together under the Dubhe Foundation 
                  to build the future of Move-based blockchain infrastructure, just like Polkadot JAM.
                </motion.p>
              </div>

              {/* Ecosystem Stats */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">2+</div>
                  <div className="text-gray-300">Active Labs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">20+</div>
                  <div className="text-gray-300">Core Engineers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">Unified</div>
                  <div className="text-gray-300">Protocol Vision</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Explore Labs
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
                
                <button className="border-2 border-cyan-400/50 hover:border-cyan-300 bg-cyan-900/20 backdrop-blur-sm text-cyan-100 hover:text-white hover:bg-cyan-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
                  Join a Lab
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Labs Overview Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-cyan-200"
            >
              Development Teams
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Specialized Labs
              <br />
              Unified Vision
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Each lab brings unique expertise while working towards a common goal of advancing the Dubhe ecosystem
            </motion.p>
          </div>

          {/* Labs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {labs.map((lab, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="lab-card bg-slate-800/50 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{lab.logo}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{lab.name}</h3>
                      <p className="text-cyan-400 font-medium">{lab.focus}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                      {lab.status}
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                      {lab.team}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{lab.description}</p>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Key Contributions</h4>
                  <div className="space-y-2">
                    {lab.contributions.map((contribution, contribIndex) => (
                      <div key={contribIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{contribution}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {lab.website !== "#" && (
                  <a 
                    href={lab.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
                  >
                    Visit Lab
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Research Areas Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-cyan-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-cyan-500/20"
            >
              Research Focus
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Collaborative Research Areas
            </motion.h2>
          </div>

          {/* Research Areas Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white mb-6">
                  {area.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{area.title}</h3>
                <p className="text-gray-300 mb-6">{area.description}</p>
                <div>
                  <h4 className="text-cyan-400 font-medium mb-2">Contributing Labs:</h4>
                  <div className="flex flex-wrap gap-2">
                    {area.teams.map((team, teamIndex) => (
                      <span key={teamIndex} className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                        {team}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Collaboration Process Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Collaborative Development Process
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              How multiple labs coordinate to deliver unified protocol implementations
            </motion.p>
          </div>

          {/* Process Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {collaboration.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center relative"
              >
                {/* Connection line */}
                {index < collaboration.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                )}
                
                {/* Phase number */}
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">{phase.phase}</h3>
                <p className="text-gray-300 leading-relaxed">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-cyan-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Join the Innovation
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Be part of building the future of Move-based blockchain infrastructure
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Apply to Labs
              <Sparkles className="w-5 h-5 inline ml-2" />
            </button>
            <button className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
              View Open Positions
            </button>
          </motion.div>
        </div>
      </div>

    </>
  )
}