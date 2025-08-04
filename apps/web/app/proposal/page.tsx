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

export default function ProposalPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const proposalTypes = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Treasury Spending",
      description: "Request funding from Dubhe Treasury for development projects and initiatives",
      examples: ["Development grants", "Infrastructure funding", "Research projects"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Governance Changes",
      description: "Modifications to voting mechanisms, treasury management, and governance parameters",
      examples: ["Voting thresholds", "Referendum parameters", "Track configurations"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Runtime Upgrades",
      description: "Protocol improvements and runtime modifications requiring governance approval",
      examples: ["Pallet upgrades", "Runtime optimizations", "New features"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Emergency Actions",
      description: "Time-sensitive proposals for security issues and critical protocol fixes",
      examples: ["Security patches", "Emergency updates", "Critical bug fixes"],
      color: "from-orange-500 to-red-500"
    }
  ]

  const votingProcess = [
    {
      step: "1",
      title: "Connect DubheOS",
      description: "Access DubheOS governance portal with your wallet and ensure you have DUBHE tokens",
      duration: "5 minutes",
      requirements: ["DubheOS wallet", "DUBHE tokens", "Network connection"]
    },
    {
      step: "2", 
      title: "Create Preimage",
      description: "Draft and submit your proposal preimage with detailed specifications",
      duration: "1-3 days",
      requirements: ["Proposal details", "Budget breakdown", "Implementation timeline"]
    },
    {
      step: "3",
      title: "Submit Proposal",
      description: "Submit proposal to appropriate governance track with required deposit",
      duration: "1 day",
      requirements: ["Preimage hash", "Track selection", "Deposit tokens"]
    },
    {
      step: "4",
      title: "Decision Period",
      description: "Community voting period with conviction voting and delegation support",
      duration: "14-28 days",
      requirements: ["Conviction voting", "Delegation tracking", "Quorum achievement"]
    },
    {
      step: "5",
      title: "Enactment",
      description: "Automatic execution after confirmation period if proposal passes",
      duration: "7 days",
      requirements: ["Confirmation period", "Automatic execution", "Treasury disbursement"]
    }
  ]

  const activeProposals = [
    {
      id: "REF-001",
      title: "Developer Incentive Program Funding",
      category: "Treasury Spending",
      track: "Medium Spender",
      status: "Deciding",
      votes: { aye: 25680, nay: 3420 },
      conviction: "6x",
      endDate: "2025-01-15",
      requested: "500,000 DUBHE",
      description: "Fund a 6-month developer incentive program to attract Move developers to Dubhe ecosystem",
      author: "DubheLabs"
    },
    {
      id: "REF-002", 
      title: "Runtime Upgrade v2.1.0",
      category: "Runtime Upgrade",
      track: "Root",
      status: "Confirming",
      votes: { aye: 45200, nay: 1850 },
      conviction: "1x",
      endDate: "2025-01-12",
      requested: "N/A",
      description: "Upgrade runtime to improve cross-chain interoperability and add new pallet features",
      author: "Core Development Team"
    },
    {
      id: "REF-003",
      title: "Emergency Security Patch",
      category: "Emergency",
      track: "Emergency Killer",
      status: "Preparing",
      votes: { aye: 0, nay: 0 },
      conviction: "N/A",
      endDate: "2025-01-08",
      requested: "N/A",
      description: "Critical security patch for recently discovered vulnerability in cross-chain bridge",
      author: "Security Council"
    }
  ]

  const stats = [
    { label: "Active Referenda", value: "18", change: "+5" },
    { label: "Treasury Balance", value: "2.8M DUBHE", change: "+3%" },
    { label: "Conviction Voting", value: "72%", change: "+8%" },
    { label: "Enacted Proposals", value: "89", change: "+12" }
  ]

  const requirements = [
    "Connect wallet to DubheOS governance portal",
    "Hold sufficient DUBHE tokens for proposal deposit",
    "Create detailed preimage with specifications", 
    "Select appropriate governance track",
    "Provide clear budget and timeline for treasury requests",
    "Follow OpenGov governance framework"
  ]

  return (
    <>
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/30 to-purple-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-600/30 to-indigo-600/40 rounded-full blur-3xl"></div>
          
          {/* Floating governance symbols */}
          <div className="absolute inset-0 overflow-hidden">
            {isClient && Array.from({ length: 12 }).map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const topPositions = [15, 30, 45, 60, 75, 90, 10, 25, 40, 55, 70, 85];
              const leftPositions = [8, 24, 40, 56, 72, 88, 16, 32, 48, 64, 80, 96];
              const durations = [3, 4, 5, 3.5, 4.5, 3.2, 4.2, 5.2, 3.8, 4.8, 3.3, 4.3];
              const delays = [0, 0.5, 1, 1.5, 2, 0.2, 0.7, 1.2, 1.7, 0.3, 0.8, 1.3];
              const icons = ['🗳️', '📝', '⚖️', '🏛️'];
              
              return (
                <div
                  key={`governance-${i}`}
                  className="absolute text-indigo-300/20 text-2xl"
                  style={{
                    top: `${topPositions[i] || 50}%`,
                    left: `${leftPositions[i] || 50}%`,
                    animation: `float ${durations[i] || 3}s ease-in-out infinite ${delays[i] || 0}s`
                  }}
                >
                  {icons[i % 4]}
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
                className="inline-block bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-indigo-500/20"
              >
                <Vote className="w-4 h-4 inline mr-2" />
                Dubhe OpenGov
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
                  Submit proposals through DubheOS to request treasury funding, upgrade the runtime, 
                  or participate in governance using Polkadot's OpenGov framework with conviction voting.
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
                  Launch DubheOS
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
                
                <button className="border-2 border-indigo-400/50 hover:border-indigo-300 bg-indigo-900/20 backdrop-blur-sm text-indigo-100 hover:text-white hover:bg-indigo-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
                  View All Referenda
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
              Active Referenda
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Current referenda in various governance tracks with conviction voting
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
                        {proposal.track}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        proposal.status === 'Deciding' 
                          ? 'bg-green-500/20 text-green-300' 
                          : proposal.status === 'Confirming'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {proposal.status}
                      </span>
                      {proposal.requested !== 'N/A' && (
                        <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm">
                          {proposal.requested}
                        </span>
                      )}
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
                      {proposal.conviction !== 'N/A' && (
                        <span className="text-purple-400">
                          Conviction: {proposal.conviction}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {(proposal.status === 'Deciding' || proposal.status === 'Confirming') && (
                    <div className="lg:min-w-80">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-green-400 text-sm">Aye: {proposal.votes.aye.toLocaleString()}</span>
                          <span className="text-red-400 text-sm">Nay: {proposal.votes.nay.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                            style={{ 
                              width: `${(proposal.votes.aye / (proposal.votes.aye + proposal.votes.nay)) * 100}%` 
                            }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200">
                            Vote Aye
                          </button>
                          <button className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200">
                            Vote Nay
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
              Access DubheOS
              <Sparkles className="w-5 h-5 inline ml-2" />
            </button>
            <button className="text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center gap-2">
              OpenGov Guide
              <ExternalLink className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

    </>
  )
}