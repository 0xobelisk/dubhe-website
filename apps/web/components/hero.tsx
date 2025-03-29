"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { ChevronRight, Download, PlayCircle, Globe, Code, Box } from "lucide-react"
import CountUp from "react-countup"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // 添加计数器状态
  const [counts, setCounts] = useState({
    transactions: 3214,
    events: 155017,
    gasSavings: 101.9
  })
  
  // 添加状态来控制是否应该增加数值
  const [shouldIncrement, setShouldIncrement] = useState(true)
  
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
    
    // Simple particle animation in canvas (similar to Unity/Unreal sites)
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Particle properties
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = []
    
    // Create particles
    const createParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.3 - 0.15,
          speedY: Math.random() * 0.3 - 0.15,
          opacity: Math.random() * 0.5 + 0.1
        })
      }
    }
    
    createParticles()
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw and update particles
      particles.forEach((particle, index) => {
        ctx.fillStyle = `rgba(77, 157, 255, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        // Reset if particle goes off screen
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
        
        // Connect particles with lines if they're close
        for (let j = index + 1; j < particles.length; j++) {
          const otherParticle = particles[j]
          if (!otherParticle) continue
          
          const dx = otherParticle.x - particle.x
          const dy = otherParticle.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(77, 157, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        }
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="relative overflow-hidden pt-20 pb-16 md:pt-24 md:pb-24 min-h-screen flex items-center">
      {/* Canvas background for particle animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-gray-900 to-black -z-10"
      />
      
      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-cyan-900/10 opacity-70 -z-10" />
      
      {/* Animated tech grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5 -z-10" />
      
      {/* Glowing accent */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px] opacity-10 -z-10" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-[120px] opacity-10 -z-10" />
      
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              Version 1.0 Now Available
            </div>
          </div>
          
          <h1 className={`text-5xl font-bold tracking-tight sm:text-7xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 pb-2 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-150`}>
            Move Without <span className="text-blue-400">Limits</span>
          </h1>
          
          <p className={`mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-300`}>
            Dubhe Engine is an open-source toolchain for Move applications, empowering everyone to build intent-centric worlds.
          </p>
          <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-500`}>
            <Button size="lg" className="rounded-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-6 text-base transition-all duration-300 shadow-lg shadow-blue-600/20 border-0">
              <Download className="h-4 w-4 mr-2" />
              Download Now
            </Button>
            <Button variant="outline" size="lg" className="rounded-md border-gray-700 hover:border-blue-500 bg-gray-900/50 hover:bg-gray-800 px-8 py-6 text-base transition-all duration-300 text-gray-200">
              <PlayCircle className="h-4 w-4 mr-2" />
              Watch Tutorial
            </Button>
          </div>
          
          <div className={`mt-10 flex justify-center gap-6 text-gray-400 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-700`}>
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-400" />
              <span>Cross-platform</span>
            </div>
            <div className="flex items-center">
              <Code className="h-5 w-5 mr-2 text-blue-400" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center">
              <Box className="h-5 w-5 mr-2 text-blue-400" />
              <span>Real-time Events</span>
            </div>
          </div>
        </div>
        
        <div className={`mt-20 relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-700`}>
          <div className="relative overflow-hidden rounded-lg shadow-2xl shadow-blue-900/20 border border-gray-800">
            {/* Terminal interface mockup */}
            <div className="w-full bg-gray-900 aspect-[16/9] relative">
              {/* UI elements overlay to make it look like a terminal window */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800/80 backdrop-blur-sm flex items-center px-4 border-b border-gray-700/50">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-6"></div>
                <div className="text-xs text-gray-400">Project: New Game - Dubhe Engine 1.0</div>
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
          </div>
          
          {/* Version label */}
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-xl px-6 py-3 rounded-full border border-gray-800 shadow-lg z-10">
            <div className="flex items-center gap-x-2 text-sm font-medium">
              <span className="text-gray-300">Latest Version: <span className="text-blue-400">Dubhe Engine v1.1.1</span></span>
              <ChevronRight className="h-4 w-4 text-blue-400" />
            </div>
          </div>
        </div>
        
        {/* Metrics/Stats Section */}
        <div className={`mt-16 pt-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-800`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
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
            </div>
            
            <div className="text-center">
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
            </div>
            
            <div className="text-center">
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
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">80%+</div>
              <div className="text-gray-400">Time Savings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 