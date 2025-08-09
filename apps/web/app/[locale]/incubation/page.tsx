"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Lightbulb, 
  Users, 
  ArrowRight,
  CheckCircle,
  Target,
  Sparkles,
  ExternalLink,
  Rocket,
  Award,
  Building,
  Briefcase,
  Globe,
  Zap
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function IncubationPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const programs = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Foundation Accelerator",
      duration: "3 months",
      funding: "Up to $500K",
      description: "Dubhe Foundation-backed intensive program co-incubated with Obelisk Labs and ecosystem VCs",
      benefits: ["Dubhe Foundation funding", "Obelisk Labs co-incubation", "Move development support", "Ecosystem VC partnerships"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Collaborative Studio",
      duration: "6-12 months", 
      funding: "Up to $1M",
      description: "Co-incubated by Dubhe Foundation, Obelisk Labs, and ecosystem VCs with shared resources",
      benefits: ["Multi-partner co-incubation", "Shared technical resources", "Cross-project collaboration", "Ecosystem VC networks"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Ecosystem Scale",
      duration: "6 months",
      funding: "Up to $2M",
      description: "Scale with comprehensive support from Dubhe Foundation, Obelisk Labs, and ecosystem VC partners",
      benefits: ["Co-incubation network", "Strategic introductions", "Global market access", "Enterprise VC connections"],
      color: "from-green-500 to-emerald-500"
    }
  ]

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unused_mentors = [
    {
      name: "Dr. Alex Chen",
      role: "CTO at Obelisk Labs",
      expertise: "Infrastructure Development",
      image: "AC",
      company: "Obelisk Labs"
    },
    {
      name: "Sarah Rodriguez", 
      role: "Head of Incubation at Dubhe Foundation",
      expertise: "Startup Strategy",
      image: "SR",
      company: "Dubhe Foundation"
    },
    {
      name: "Michael Zhang",
      role: "Lead Developer at Dubhe Core",
      expertise: "Move Programming",
      image: "MZ", 
      company: "Dubhe Core"
    },
    {
      name: "Lisa Wang",
      role: "Business Development at Obelisk Labs",
      expertise: "Partnership Strategy",
      image: "LW",
      company: "Obelisk Labs"
    }
  ]

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unused_startups = [
    {
      name: "ChainBridge",
      category: "Infrastructure",
      stage: "Series A",
      funding: "$5M raised",
      description: "Cross-chain interoperability protocol",
      valuation: "$50M"
    },
    {
      name: "Merak",
      category: "DeFi",
      stage: "Seed",
      funding: "$2M raised", 
      description: "Yield farming aggregator for Move chains",
      valuation: "$20M"
    },
    {
      name: "Numeron",
      category: "Gaming",
      stage: "Pre-Seed",
      funding: "$500K raised",
      description: "On-chain gaming metaverse platform", 
      valuation: "$8M"
    }
  ]

  const resources = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Multi-Partner Co-Incubation", 
      description: "Joint guidance from Dubhe Foundation, Obelisk Labs, and ecosystem VCs"
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Shared Infrastructure",
      description: "Access to Obelisk Labs infrastructure and ecosystem VC resources"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Ecosystem Integration",
      description: "Direct integration with Dubhe projects and partner networks"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Collaborative Development",
      description: "Technical support from Dubhe Foundation and Obelisk Labs engineering teams"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Partner Demo Days",
      description: "Present to Dubhe Foundation board and ecosystem VC networks"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Ecosystem Network",
      description: "Access to the entire Dubhe and partner company ecosystem"
    }
  ]

  return (
    <>
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-blue-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/30 to-purple-600/40 rounded-full blur-3xl"></div>
          
          {/* Floating startup symbols */}
          <div className="absolute inset-0 overflow-hidden">
            {isClient && Array.from({ length: 15 }).map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const topPositions = [12, 28, 44, 60, 76, 92, 8, 24, 40, 56, 72, 88, 16, 32, 48];
              const leftPositions = [6, 22, 38, 54, 70, 86, 14, 30, 46, 62, 78, 94, 10, 26, 42];
              const durations = [3, 4, 5, 3.5, 4.5, 3.2, 4.2, 5.2, 3.8, 4.8, 3.3, 4.3, 5.3, 3.7, 4.7];
              const delays = [0, 0.4, 0.8, 1.2, 1.6, 0.2, 0.6, 1.0, 1.4, 1.8, 0.3, 0.7, 1.1, 1.5, 1.9];
              const icons = ['🚀', '💡', '🏢'];
              
              return (
                <div
                  key={`startup-${i}`}
                  className="absolute text-purple-300/20 text-2xl"
                  style={{
                    top: `${topPositions[i] || 50}%`,
                    left: `${leftPositions[i] || 50}%`,
                    animation: `float ${durations[i] || 3}s ease-in-out infinite ${delays[i] || 0}s`
                  }}
                >
                  {icons[i % 3]}
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
                <Lightbulb className="w-4 h-4 inline mr-2" />
                Dubhe Foundation Incubation
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-5xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Build the Next
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Unicorn Startup
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Join our collaborative incubation ecosystem supported by Dubhe Foundation, 
                  co-incubated with Obelisk Labs and ecosystem VCs to build the next generation of Move startups.
                </motion.p>
              </div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">Coming Soon</div>
                  <div className="text-gray-300">Total Funding</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">Coming Soon</div>
                  <div className="text-gray-300">Startups Incubated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-2">Coming Soon</div>
                  <div className="text-gray-300">Unicorns Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">Coming Soon</div>
                  <div className="text-gray-300">Success Rate</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href="/contact" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                
                <Link href="https://dubhe-docs.obelisk.build/dubhe" target="_blank" rel="noopener noreferrer" className="border-2 border-purple-400/50 hover:border-purple-300 bg-purple-900/20 backdrop-blur-sm text-purple-100 hover:text-white hover:bg-purple-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center">
                  Learn More
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-purple-200"
            >
              Incubation Programs
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Choose Your Growth Path
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${program.color} text-white mb-6`}>
                  {program.icon}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{program.title}</h3>
                  <span className="text-sm text-purple-400 font-medium">{program.duration}</span>
                </div>
                <div className="text-2xl font-bold text-purple-400 mb-4">{program.funding}</div>
                <p className="text-gray-300 mb-6">{program.description}</p>
                <div className="space-y-2">
                  {program.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mentors Section */}
      {/* <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              World-Class Mentors
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Learn from industry veterans who have built and scaled successful companies
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.map((mentor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                    {mentor.image}
                  </div>
                  <h3 className="text-lg font-bold text-white">{mentor.name}</h3>
                  <p className="text-purple-400 text-sm">{mentor.role}</p>
                  <p className="text-gray-400 text-xs">{mentor.company}</p>
                </div>
                <div className="text-center">
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">
                    {mentor.expertise}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Portfolio Companies Section */}
      {/* <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Portfolio Companies
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Successful startups that graduated from our incubation programs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {startups.map((startup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Building className="w-8 h-8 text-purple-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{startup.name}</h3>
                    <p className="text-purple-400 text-sm">{startup.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                    {startup.stage}
                  </span>
                  <span className="text-gray-300 text-sm">{startup.funding}</span>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{startup.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-semibold">Valuation:</span>
                  <span className="text-white font-bold">{startup.valuation}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Partners Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Incubation Partners
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Co-incubation ecosystem led by Dubhe Foundation with Obelisk Labs and ecosystem VCs to nurture the next generation of Move startups
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <Image
                  src="/mediakit/dubhe/png/a.png"
                  alt="Dubhe Foundation"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Dubhe Foundation</h3>
              <p className="text-purple-400 text-sm mb-3">Primary Sponsor</p>
              <p className="text-gray-300 text-sm">Provides funding, strategic guidance, and ecosystem connections</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <Image
                  src="/mediakit/obelisklabs/svg/light.svg"
                  alt="Obelisk Labs"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Obelisk Labs</h3>
              <p className="text-cyan-400 text-sm mb-3">Co-Incubation Partner</p>
              <p className="text-gray-300 text-sm">Infrastructure expertise, technical mentorship, and co-incubation resources</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 hover:border-green-400/50 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ecosystem VCs</h3>
              <p className="text-green-400 text-sm mb-3">Investment Partners</p>
              <p className="text-gray-300 text-sm">Leading venture capital firms specializing in Move ecosystem and Web3 investments</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-purple-900 to-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Collaborative Resources
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Shared resources and support from our partner ecosystem
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-4">
                  {resource.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{resource.title}</h3>
                <p className="text-gray-300 text-sm">{resource.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Join Our Collaborative Ecosystem
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Partner with Dubhe Foundation, Obelisk Labs, and ecosystem VCs to build the future
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/contact" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
              Start Application
              <Sparkles className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center gap-2">
              Schedule Call
              <ExternalLink className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

    </>
  )
}