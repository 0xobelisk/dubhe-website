"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  DollarSign, 
  Users, 
  Rocket, 
  ArrowRight,
  CheckCircle,
  Target,
  Sparkles,
  ExternalLink,
  Gift,
  TrendingUp,
  Award,
  Building
} from "lucide-react"
import Navigation from "../../components/navigation"
import Footer from "../../components/footer"

export default function GrantsPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const grantCategories = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Infrastructure Grants",
      amount: "Up to $100K",
      description: "Build core infrastructure, developer tools, and ecosystem utilities",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "DApp Development",
      amount: "Up to $75K", 
      description: "Create innovative decentralized applications on Dubhe ecosystem",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Research Grants",
      amount: "Up to $50K",
      description: "Academic research, protocol improvements, and theoretical contributions",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Community Projects",
      amount: "Up to $25K",
      description: "Education, documentation, community tools, and outreach programs",
      color: "from-orange-500 to-red-500"
    }
  ]

  const requirements = [
    "Clear project vision and roadmap",
    "Experienced team with relevant skills",
    "Open-source commitment",
    "Active community engagement",
    "Measurable success metrics",
    "Alignment with Dubhe ecosystem goals"
  ]

  const process = [
    {
      step: "1",
      title: "Application",
      description: "Submit detailed proposal with project scope, team, and budget",
      duration: "1 week"
    },
    {
      step: "2", 
      title: "Review",
      description: "Technical and business evaluation by our grants committee",
      duration: "2-3 weeks"
    },
    {
      step: "3",
      title: "Interview",
      description: "Present your project to the grants team and answer questions",
      duration: "1 week"
    },
    {
      step: "4",
      title: "Decision",
      description: "Final approval and funding terms negotiation",
      duration: "1 week"
    },
    {
      step: "5",
      title: "Funding",
      description: "Milestone-based funding with ongoing support and mentorship",
      duration: "Ongoing"
    }
  ]

  const successStories = [
    {
      project: "MoveDEX",
      category: "DeFi Protocol",
      funding: "$85K",
      impact: "10K+ users, $50M TVL",
      description: "Automated market maker with innovative liquidity mining"
    },
    {
      project: "Dubhe IDE",
      category: "Developer Tools", 
      funding: "$60K",
      impact: "5K+ developers",
      description: "Full-featured IDE for Move smart contract development"
    },
    {
      project: "Move University",
      category: "Education",
      funding: "$30K", 
      impact: "2K+ students",
      description: "Comprehensive Move programming course and certification"
    }
  ]

  return (
    <>
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-green-500/30 to-blue-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/30 to-green-600/40 rounded-full blur-3xl"></div>
          
          {/* Floating grant symbols */}
          <div className="absolute inset-0 overflow-hidden">
            {isClient && Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`grant-${i}`}
                className="absolute text-green-300/20 text-xl"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              >
                💰
              </div>
            ))}
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
                className="inline-block bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-green-500/20"
              >
                <Gift className="w-4 h-4 inline mr-2" />
                Dubhe Grants Program
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-5xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Fund Your
                  <br />
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Innovation
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Get funding up to $100K to build the next generation of Move applications, 
                  infrastructure, and tools that will shape the future of blockchain technology.
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
                  <div className="text-3xl font-bold text-green-400 mb-2">$2M+</div>
                  <div className="text-gray-300">Total Funded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">150+</div>
                  <div className="text-gray-300">Projects Funded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">75%</div>
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
                <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Apply for Grant
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
                
                <button className="border-2 border-green-400/50 hover:border-green-300 bg-green-900/20 backdrop-blur-sm text-green-100 hover:text-white hover:bg-green-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
                  View Guidelines
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Grant Categories Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-green-200"
            >
              Grant Categories
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Choose Your Track
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {grantCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-green-500/50 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} text-white mb-6`}>
                  {category.icon}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  <span className="text-lg font-bold text-green-400">{category.amount}</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Process Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-green-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Application Process
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Simple 5-step process to get your project funded
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-500/50 to-blue-500/50 transform -translate-y-0.5" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm mb-2">{step.description}</p>
                <span className="text-green-400 text-xs font-medium">{step.duration}</span>
              </motion.div>
            ))}
          </div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Application Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{requirement}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Success Stories
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Projects that received grants and made significant impact
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-green-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8 text-green-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{story.project}</h3>
                    <p className="text-green-400 text-sm">{story.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-400">{story.funding}</span>
                  <span className="text-gray-300 text-sm">{story.impact}</span>
                </div>
                
                <p className="text-gray-300 text-sm">{story.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-green-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Build the Future?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Apply for a grant and join the growing ecosystem of innovative projects
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Application
              <Sparkles className="w-5 h-5 inline ml-2" />
            </button>
            <button className="text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center gap-2">
              Contact Team
              <ExternalLink className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}