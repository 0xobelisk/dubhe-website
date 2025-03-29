"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { ChevronRight, Download, PlayCircle } from "lucide-react"

export default function Hero() {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] -z-10" />
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-r from-[#0071e3] to-[#64d2ff] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div className="mx-auto max-w-[1072px] px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-[#0071e3] to-[#64d2ff]">
            创造无限可能
          </h1>
          <p className="mt-6 text-xl leading-8 text-foreground max-w-2xl mx-auto">
            Dubhe Engine 是为创作者打造的强大游戏引擎，帮助您将创意转化为现实。无论是2D冒险还是沉浸式3D世界，Dubhe都能助您实现卓越的游戏体验。
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white px-8 py-6 text-base transition-colors duration-300">
              <Download className="h-4 w-4 mr-2" />
              立即下载
            </Button>
            <Button variant="outline" size="lg" className="rounded-full border-gray-200 dark:border-gray-800 hover:bg-background/80 px-8 py-6 text-base transition-colors duration-300">
              <PlayCircle className="h-4 w-4 mr-2" />
              观看演示
            </Button>
          </div>
        </div>
        
        <div className="mt-16 sm:mt-24 relative flex justify-center">
          <div className="relative overflow-hidden rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800">
            <Image
              src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop"
              alt="Dubhe Engine 界面"
              width={1000}
              height={600}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60"></div>
          </div>
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-xl px-6 py-3 rounded-full border border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="flex items-center gap-x-2 text-sm font-medium">
              <span className="text-foreground">最新版本: Dubhe Engine v1.0</span>
              <ChevronRight className="h-4 w-4 text-[#0071e3]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 