"use client"

import { useState, useRef, useEffect } from "react"
import { ExternalLink, Coins, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import CopyableAddress from "@/components/ui/CopyableAddress"
import Card from "@/components/ui/Card" 
import GradientText from "@/components/ui/GradientText"

/**
 * 时间线项目状态类型
 */
type TimelineStatus = "completed" | "ongoing" | "pending";

/**
 * 时间线项目接口定义
 */
interface TimelineItem {
  /** 日期字符串 */
  date: string;
  /** 代币数量 */
  amount: string;
  /** 状态 */
  status: TimelineStatus;
}

/**
 * FoundationPage组件 - 代币基金会页面
 * 
 * 功能特性：
 * - 代币领取界面
 * - 60天解锁时间线的可滚动展示
 * - 用户余额和状态显示
 * - 合约信息展示
 * - 响应式设计
 * 
 * @returns FoundationPage组件JSX元素
 */
export default function FoundationPage() {
  const claimableAmount = "960"
  const totalRewards = "60,000"
  const claimedRewards = "0"
  const endTime = "2025/10/15 19:00 GMT+08:00"
  
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Generate more timeline data for scrolling demo
  const timelineData: TimelineItem[] = Array.from({ length: 60 }, (_, i) => {
    const date = new Date(2025, 6, 15 + i) // Starting from July 15, 2025
    const dateStr = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`
    const status: TimelineStatus = i === 0 ? "completed" : i <= 3 ? "ongoing" : "pending";
    return {
      date: dateStr,
      amount: "960 DUBHE",
      status
    }
  })

  /**
   * 检查滚动按钮的可用状态
   */
  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  /**
   * 向左滚动时间线
   */
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
      setTimeout(checkScrollButtons, 300)
    }
  }

  /**
   * 向右滚动时间线
   */
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
      setTimeout(checkScrollButtons, 300)
    }
  }

  useEffect(() => {
    // Check scroll buttons on initial load
    setTimeout(checkScrollButtons, 100)
  }, [])

  /**
   * 处理代币领取
   */
  const handleClaim = () => {
    // Token claiming logic would go here
    console.log("Claiming tokens...")
  }


  return (
    <>
      <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Coins className="w-10 h-10 text-white" />
            </div>
          </div>
          <GradientText 
            as="h1" 
            size="4xl" 
            weight="bold" 
            preset="blue-purple"
            className="mb-4"
          >
            Foundation Portal
          </GradientText>
          <p className="text-xl text-gray-300 mb-2">Daily unlock over 60 days</p>
        </div>

        {/* Main Card */}
        <Card variant="glass" padding="lg">
          {/* Contract Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Package Address</p>
              <div className="flex justify-center">
                <CopyableAddress 
                  fullAddress="0x553F24AB1234567890ABCDEF1234567890ABCDEF"
                  displayAddress="0x553F...24AB"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Network</p>
              <p className="font-medium">Sui</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">End Time</p>
              <p className="font-medium">{endTime}</p>
            </div>
          </div>

          {/* Rewards Summary */}
          <div className="bg-gray-950/50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
                <span className="font-mono text-lg">hEKCBvX23ska4BTvBpTVUC</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
              >
                View Airdrop Rules
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Rewards</p>
                <p className="text-xl font-semibold">{totalRewards} DUBHE</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Claimable</p>
                <p className="text-xl font-semibold text-blue-400">14,400 DUBHE</p>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-blue-400 p-0 h-auto"
                >
                  Claim All
                </Button>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Rewards</p>
                <p className="text-xl font-semibold">{totalRewards} DUBHE</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Claimed Rewards</p>
                <p className="text-xl font-semibold">{claimedRewards} DUBHE</p>
              </div>
            </div>

            {/* Daily Claim Section */}
            <div className="text-center mb-8">
              <p className="text-gray-400 text-sm mb-2">2025/07/18 21:00 - 2025/10/15 19:00 GMT+08:00</p>
              <p className="text-6xl font-bold mb-4">{claimableAmount} DUBHE</p>
              <p className="text-gray-400 mb-6 flex items-center justify-center flex-wrap gap-2">
                <span>Your reward will be delivered to your primary Sui address after claiming:</span>
                <CopyableAddress 
                  fullAddress="0x7219ABCD1234567890EFGH1234567890IJKL6597"
                  displayAddress="0x7219...6597"
                />
              </p>
              
              <Button 
                onClick={handleClaim}
                className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-3 text-lg font-semibold rounded-lg transition-all duration-200"
              >
                Claim
              </Button>
            </div>

            {/* Scrollable Timeline Carousel */}
            <div className="relative mt-8">
              {/* Navigation buttons */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Daily Unlock Progress</h3>
                <div className="flex gap-2">
                  <button
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    className={`p-2 rounded-full transition-colors ${
                      canScrollLeft 
                        ? "bg-gray-800 hover:bg-gray-700 text-white" 
                        : "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                    className={`p-2 rounded-full transition-colors ${
                      canScrollRight 
                        ? "bg-gray-800 hover:bg-gray-700 text-white" 
                        : "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable timeline */}
              <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none'
                }}
                onScroll={checkScrollButtons}
              >
                {timelineData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center relative flex-shrink-0 min-w-[120px]">
                    {/* Progress line */}
                    {index < timelineData.length - 1 && (
                      <div className="absolute top-2 left-[60px] w-[60px] h-0.5 bg-gray-700"></div>
                    )}
                    
                    {/* Status dot */}
                    <div className={`w-4 h-4 rounded-full mb-2 z-10 ${
                      item.status === "completed" 
                        ? "bg-green-500" 
                        : item.status === "ongoing"
                        ? "bg-blue-500"
                        : "bg-gray-600"
                    }`}></div>
                    
                    {/* Date */}
                    <p className="text-xs text-gray-400 mb-1 text-center">{item.date}</p>
                    
                    {/* Amount */}
                    <p className="text-xs font-medium text-center">{item.amount}</p>
                    
                    {/* Status badge */}
                    <div className={`px-2 py-1 rounded text-xs mt-1 text-center ${
                      item.status === "completed" 
                        ? "bg-green-500/20 text-green-400" 
                        : item.status === "ongoing"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-600/20 text-gray-400"
                    }`}>
                      {item.status === "completed" ? "Completed" : item.status === "ongoing" ? "Ongoing" : "Pending"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
    </>
  )
}