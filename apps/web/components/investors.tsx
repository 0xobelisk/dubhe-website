"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

/**
 * 投资者信息接口定义
 */
interface Investor {
  /** 投资者ID */
  id: string;
  /** 投资者名称 */
  name: string;
  /** Logo图片路径 */
  logo: string;
  /** 网站链接 */
  website?: string;
  /** Logo宽度 */
  width?: number;
  /** Logo高度 */
  height?: number;
}

/**
 * 投资者数据配置
 */
const investors: Investor[] = [
  {
    id: "obelisk-labs",
    name: "Obelisk Labs",
    logo: "/logo/light.png",
    website: "https://obelisk.build",
    width: 120,
    height: 36
  },
  {
    id: "polygon",
    name: "Polygon",
    logo: "/investors/polygon.png",
    website: "https://polygon.technology",
    width: 100,
    height: 32
  },
  {
    id: "binance-labs", 
    name: "Binance Labs",
    logo: "/investors/binance-labs.png",
    website: "https://labs.binance.com",
    width: 110,
    height: 32
  },
  {
    id: "coinbase-ventures",
    name: "Coinbase Ventures", 
    logo: "/investors/coinbase-ventures.png",
    website: "https://ventures.coinbase.com",
    width: 120,
    height: 32
  },
  {
    id: "animoca-brands",
    name: "Animoca Brands",
    logo: "/investors/animoca-brands.png", 
    website: "https://animocabrands.com",
    width: 110,
    height: 36
  },
  {
    id: "alameda-research",
    name: "Alameda Research",
    logo: "/investors/alameda-research.png",
    website: "https://alameda-research.com",
    width: 120,
    height: 32
  },
  {
    id: "jump-crypto",
    name: "Jump Crypto",
    logo: "/investors/jump-crypto.png",
    website: "https://jumpcrypto.com", 
    width: 100,
    height: 32
  },
  {
    id: "paradigm",
    name: "Paradigm",
    logo: "/investors/paradigm.png",
    website: "https://paradigm.xyz",
    width: 110,
    height: 32
  },
  {
    id: "andreessen-horowitz",
    name: "Andreessen Horowitz",
    logo: "/investors/a16z.png",
    website: "https://a16z.com",
    width: 80,
    height: 32
  },
  {
    id: "sequoia-capital",
    name: "Sequoia Capital", 
    logo: "/investors/sequoia.png",
    website: "https://sequoiacap.com",
    width: 110,
    height: 32
  },
  {
    id: "accel",
    name: "Accel",
    logo: "/investors/accel.png",
    website: "https://accel.com",
    width: 80,
    height: 32
  },
  {
    id: "lightspeed",
    name: "Lightspeed Venture Partners",
    logo: "/investors/lightspeed.png", 
    website: "https://lsvp.com",
    width: 100,
    height: 32
  }
];

/**
 * 投资者Logo组件
 */
interface InvestorLogoProps {
  investor: Investor;
  index: number;
}

function InvestorLogo({ investor, index }: InvestorLogoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="flex-shrink-0 flex items-center justify-center px-8 py-4"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.1 }}
    >
      {investor.website ? (
        <a
          href={investor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-opacity duration-200 hover:opacity-80"
        >
          {!imageError ? (
            <Image
              src={investor.logo}
              alt={investor.name}
              width={investor.width || 100}
              height={investor.height || 32}
              className="max-h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div className="flex items-center justify-center bg-gray-100 rounded-md px-4 py-2 min-w-[100px] h-8">
              <span className="text-sm font-medium text-gray-600">{investor.name}</span>
            </div>
          )}
        </a>
      ) : (
        !imageError ? (
          <Image
            src={investor.logo}
            alt={investor.name}
            width={investor.width || 100}
            height={investor.height || 32}
            className="max-h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-100 rounded-md px-4 py-2 min-w-[100px] h-8">
            <span className="text-sm font-medium text-gray-600">{investor.name}</span>
          </div>
        )
      )}
    </motion.div>
  );
}

/**
 * Investors组件 - 投资者展示区域
 * 
 * 功能特性：
 * - 无限滚动的投资者Logo展示
 * - 悬停暂停滚动
 * - 灰度到彩色的悬停效果
 * - 响应式设计
 * - 图片错误处理
 * 
 * @returns Investors组件JSX元素
 */
export default function Investors() {
  const [isPaused, setIsPaused] = useState(false);

  // 复制投资者数组以实现无限滚动
  const duplicatedInvestors = [...investors, ...investors];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Backed By
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by leading investors and institutions in the blockchain ecosystem
          </p>
        </motion.div>

        {/* 滚动容器 */}
        <div className="relative">
          {/* 左右渐变遮罩 */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          
          {/* 滚动动画容器 */}
          <motion.div
            className="flex items-center"
            animate={isPaused ? {} : { x: [-1600, 0] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ width: `${duplicatedInvestors.length * 160}px` }}
          >
            {duplicatedInvestors.map((investor, index) => (
              <InvestorLogo
                key={`${investor.id}-${index}`}
                investor={investor}
                index={index % investors.length}
              />
            ))}
          </motion.div>
        </div>

        {/* 底部统计 */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">$50M+</div>
            <div className="text-sm text-gray-600">Total Funding Raised</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">20+</div>
            <div className="text-sm text-gray-600">Strategic Partners</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
            <div className="text-sm text-gray-600">Portfolio Companies</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}