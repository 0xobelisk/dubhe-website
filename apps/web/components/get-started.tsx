"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { Download, ExternalLink, FileText, Play, Server, Layers, Bot, Globe, Code, ChevronRight } from "lucide-react"

export default function GetStarted() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full filter blur-[120px] bg-blue-500 opacity-10 -z-10" />
      
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className={`mx-auto max-w-2xl text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Ready to Create Your Next Masterpiece?
          </h2>
          <p className="mt-6 text-xl leading-8 text-gray-300">
            Join thousands of developers and studios already using Dubhe Engine to bring their creative visions to life.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
            <Link 
              href="https://dubhe.obelisk.build/dubhe/sui/quick-start"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 transition-all duration-200 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Now
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 w-full sm:w-auto rounded-md border-gray-700 hover:border-blue-500 bg-gray-900/50 hover:bg-gray-800 px-8 py-6 text-base transition-all duration-300 text-gray-200"
            >
              <Play className="h-4 w-4 mr-2" />
              Try Online
            </Button>
          </div>
        </div>
        
        <div className={`mx-auto mt-16 max-w-5xl rounded-2xl sm:mt-20 lg:mx-0 overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-300`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
            <div className="p-8 sm:p-10 lg:col-span-7 relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-1/2 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent to-blue-500"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold tracking-tight text-white">Get Started with Dubhe Engine</h3>
                <p className="mt-6 text-base leading-7 text-gray-300">
                  Dubhe Engine offers flexible licensing options suitable for independent developers, educational institutions, and enterprise studios alike.
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-medium leading-6 text-blue-400">What's Included</h4>
                  <div className="h-px flex-auto bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                </div>
                <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2">
                  {[
                    { text: "Complete Engine Source Code", icon: Code },
                    { text: "Visual Scripting System", icon: Layers },
                    { text: "Automated Storage Contracts", icon: Globe },
                    { text: "Cross-platform Deployment", icon: Server },
                    { text: "Obelisk Labs Saas Access", icon: FileText },
                    { text: "Regular Updates & Support", icon: Download },
                    { text: "Developer Community Access", icon: ExternalLink },
                    { text: "Comprehensive Documentation", icon: FileText },
                  ].map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <li key={feature.text} className="flex gap-x-3 items-center">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-gray-300">{feature.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-900/30 to-gray-900/90 relative">
              <div className="h-full py-12 px-8 sm:px-10 flex flex-col justify-center lg:py-16 relative">
                {/* Decorative tech elements */}
                <div className="absolute inset-0 overflow-hidden opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full grid grid-cols-6 gap-1">
                    {Array.from({ length: 60 }).map((_, index) => (
                      <div 
                        key={index} 
                        className="aspect-square w-full opacity-20 bg-blue-500"
                        style={{ 
                          opacity: isLoaded ? Math.random() * 0.3 : 0,
                          animationDelay: isLoaded ? `${Math.random() * 5}s` : '0s',
                          animationDuration: isLoaded ? `${Math.random() * 5 + 5}s` : '0s'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="mx-auto max-w-sm relative z-10">
                  <p className="text-base font-semibold text-white">Start with Community Version</p>
                  <p className="mt-6 flex items-baseline gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-white">$0</span>
                    <span className="text-sm font-medium text-gray-400">for indie developers</span>
                  </p>
                  {/* <Link 
                    href="https://dubhe.obelisk.build/dubhe/sui/quick-start"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 w-full rounded-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white transition-all duration-300 border-0 shadow-lg shadow-blue-900/40"
                  >
                    Download Free Version
                  </Link> */}
                  {/* <p className="mt-6 text-xs leading-5 text-gray-400 text-center">
                    Free for personal and educational use <br />
                    Revenue cap of $100,000
                  </p> */}
                  <div className="mt-8 flex justify-center">
                    <Link href="https://dubhe.obelisk.build/dubhe/sui/quick-start" className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300">
                      <FileText className="h-3.5 w-3.5 text-blue-400" />
                      <span>Start to Learn</span>
                      <ChevronRight className="h-3.5 w-3.5 text-blue-400" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-24 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-500`}>
          <h3 className="text-base font-semibold leading-7 text-blue-400 mb-2">JOIN OUR COMMUNITY</h3>
          <p className="mt-2 text-2xl font-bold tracking-tight text-white">Connect with Developers Worldwide</p>
          <p className="mt-6 text-xl text-gray-300">
            Get help, share your work, and collaborate with developers from around the world.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              { name: "Discord", href: "#", icon: <Bot className="h-4 w-4 mr-2 text-blue-400" /> },
              { name: "Forum", href: "#", icon: <Globe className="h-4 w-4 mr-2 text-blue-400" /> },
              { name: "GitHub", href: "https://github.com/0xobelisk/dubhe", icon: <Code className="h-4 w-4 mr-2 text-blue-400" /> },
              { name: "Youtubi", href: "https://www.youtube.com/@DubheEngine", icon: <Play className="h-4 w-4 mr-2 text-blue-400" /> },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-md px-5 py-3 text-sm font-medium border border-gray-800 bg-gray-900/50 hover:bg-gray-800/80 hover:border-blue-500/30 transition-all duration-300 flex items-center gap-2"
              >
                {item.icon}
                {item.name}
                <ExternalLink className="h-4 w-4 ml-1 text-gray-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 