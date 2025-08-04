"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Vote, 
  Users, 
  Target, 
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink,
  FileText,
  MessageSquare,
  TrendingUp,
  Award,
  Shield,
  Globe,
  Calendar,
  Lightbulb
} from "lucide-react"
import Navigation from "../../components/navigation"
import Footer from "../../components/footer"

export default function ProposalPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const proposalTypes = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Protocol Upgrades",
      description: "Technical improvements, new features, and protocol enhancements",
      examples: ["Smart contract updates", "New consensus mechanisms", "Performance optimizations"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Governance Changes",
      description: "Modifications to voting mechanisms, treasury management, and governance structure",
      examples: ["Voting threshold changes", "Treasury allocation", "Governance token distribution"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Ecosystem Initiatives",
      description: "Community programs, partnerships, and ecosystem development proposals",
      examples: ["Grant program changes", "Partnership agreements", "Community incentives"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Updates",
      description: "Security patches, audit recommendations, and risk mitigation measures",
      examples: ["Security audits", "Bug fixes", "Risk assessments"],
      color: "from-orange-500 to-red-500"
    }
  ]

  const votingProcess = [
    {
      step: "1",
      title: "Draft Proposal",
      description: "Create detailed proposal with technical specifications and impact analysis",
      duration: "1-2 weeks",
      requirements: ["Technical documentation", "Impact assessment", "Community feedback"]
    },
    {
      step: "2", 
      title: "Community Review",
      description: "Public discussion period for community feedback and proposal refinement",
      duration: "2 weeks",
      requirements: ["Forum discussion", "Technical review", "Stakeholder input"]
    },
    {
      step: "3",
      title: "Formal Submission",
      description: "Submit proposal to governance system with required stake and documentation",
      duration: "1 week",
      requirements: ["Governance stake", "Final documentation", "Implementation plan"]
    },
    {
      step: "4",
      title: "Voting Period",
      description: "Active voting by token holders with transparent tallying",
      duration: "1 week",
      requirements: ["Token holder participation", "Quorum requirements", "Vote transparency"]
    },
    {
      step: "5",
      title: "Implementation",
      description: "Execute approved proposals with community oversight and monitoring",
      duration: "Variable",
      requirements: ["Development resources", "Testing", "Monitoring"]
    }
  ]

  const activeProposals = [
    {
      id: "DIP-001",
      title: "Move VM Performance Optimization",
      category: "Protocol Upgrade",
      status: "Active Voting",
      votes: { for: 15420, against: 2340, abstain: 890 },
      endDate: "2025-01-15",
      description: "Implement bytecode optimization to improve Move VM execution speed by 40%",
      author: "Core Development Team"
    },
    {
      id: "DIP-002", 
      title: "Community Treasury Allocation",
      category: "Governance",
      status: "Active Voting",
      votes: { for: 12580, against: 4200, abstain: 1100 },
      endDate: "2025-01-12",
      description: "Allocate 5M DUBHE tokens from treasury for ecosystem development initiatives",
      author: "Dubhe Foundation"
    },
    {
      id: "DIP-003",
      title: "Cross-Chain Bridge Security Audit",
      category: "Security",
      status: "Under Review",
      votes: { for: 0, against: 0, abstain: 0 },
      endDate: "2025-01-20",
      description: "Comprehensive security audit of all cross-chain bridge contracts",
      author: "Security Committee"
    }
  ]

  const stats = [
    { label: "Active Proposals", value: "12", change: "+3" },
    { label: "Total Votes Cast", value: "45.2K", change: "+12%" },
    { label: "Voter Participation", value: "68%", change: "+5%" },
    { label: "Implemented Proposals", value: "156", change: "+8" }
  ]

  const requirements = [
    "Hold minimum 1000 DUBHE tokens to create proposals",
    "Provide detailed technical documentation",
    "Complete impact assessment and risk analysis", 
    "Engage in community discussion period",
    "Stake 5000 DUBHE tokens as proposal bond",
    "Follow governance framework guidelines"
  ]

  return (
    <>
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/30 to-purple-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-600/30 to-indigo-600/40 rounded-full blur-3xl"></div>
          
          {/* Floating governance symbols */}
          <div className="absolute inset-0 overflow-hidden">
            {isClient && Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`governance-${i}`}
                className="absolute text-indigo-300/20 text-2xl"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              >
                {i % 4 === 0 ? '🗳️' : i % 4 === 1 ? '📝' : i % 4 === 2 ? '⚖️' : '🏛️'}
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
                className="inline-block bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-indigo-500/20"
              >
                <Vote className="w-4 h-4 inline mr-2" />
                Dubhe Governance
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-5xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Shape the Future
                  <br />
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Together
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Participate in Dubhe's decentralized governance by creating proposals, 
                  voting on protocol changes, and helping build the future of Move blockchain technology.
                </motion.p>
              </div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-indigo-400 mb-2">
                      {stat.value}
                      <span className="text-sm text-green-400 ml-2">{stat.change}</span>
                    </div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Create Proposal
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
                
                <button className="border-2 border-indigo-400/50 hover:border-indigo-300 bg-indigo-900/20 backdrop-blur-sm text-indigo-100 hover:text-white hover:bg-indigo-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
                  View All Proposals
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Proposal Types Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-indigo-200"
            >
              Proposal Categories
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Types of Governance Proposals
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {proposalTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${type.color} text-white mb-6`}>
                  {type.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{type.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{type.description}</p>
                <div className="space-y-2">
                  <div className="text-sm text-indigo-400 font-medium mb-3">Example proposals:</div>
                  {type.examples.map((example, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Proposals Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Active Proposals
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Current proposals under community discussion and voting
            </motion.p>
          </div>

          <div className="space-y-6">
            {activeProposals.map((proposal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
                        {proposal.id}
                      </span>
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {proposal.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        proposal.status === 'Active Voting' 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {proposal.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{proposal.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{proposal.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>By {proposal.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Ends {proposal.endDate}
                      </span>
                    </div>
                  </div>
                  
                  {proposal.status === 'Active Voting' && (
                    <div className="lg:min-w-80">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-green-400 text-sm">For: {proposal.votes.for.toLocaleString()}</span>
                          <span className="text-red-400 text-sm">Against: {proposal.votes.against.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                            style={{ 
                              width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100}%` 
                            }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200">
                            Vote For
                          </button>
                          <button className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200">
                            Vote Against
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Voting Process Section */}
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
              Governance Process
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Step-by-step process for creating and voting on governance proposals
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
            {votingProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.step}
                  </div>
                  {index < votingProcess.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 transform -translate-y-0.5" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{step.description}</p>
                <span className="text-indigo-400 text-xs font-medium">{step.duration}</span>
                <div className="mt-4 space-y-1">
                  {step.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                      <CheckCircle className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Proposal Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{requirement}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-indigo-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Participate?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join the governance process and help shape the future of Dubhe
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Proposal
              <Sparkles className="w-5 h-5 inline ml-2" />
            </button>
            <button className="text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center gap-2">
              Learn More
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