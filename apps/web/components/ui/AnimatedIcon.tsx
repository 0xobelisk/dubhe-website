"use client"

import { motion } from "framer-motion"
import { useState, memo, useCallback } from "react"

/**
 * AnimatedIcon组件Props接口
 */
interface AnimatedIconProps {
  /** 图标内容 */
  children: React.ReactNode;
  /** 渐变颜色 */
  gradient: string;
  /** 是否激活状态 */
  isActive?: boolean;
  /** 尺寸大小 */
  size?: "sm" | "md" | "lg" | "xl";
  /** 点击回调 */
  onClick?: () => void;
}

/**
 * AnimatedIcon组件 - 动画图标容器
 * 
 * 功能特性：
 * - 3D变换效果
 * - 鼠标悬停动画
 * - 激活状态动画
 * - 渐变背景
 * - 多种尺寸
 * 
 * @param children 图标内容
 * @param gradient 渐变颜色
 * @param isActive 是否激活状态
 * @param size 尺寸大小
 * @param onClick 点击回调
 * @returns AnimatedIcon组件JSX元素
 */
const AnimatedIcon = memo(function AnimatedIcon({ 
  children, 
  gradient, 
  isActive = false, 
  size = "lg",
  onClick 
}: AnimatedIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  /**
   * 获取尺寸样式
   */
  const getSizeClasses = useCallback(() => {
    switch (size) {
      case "sm":
        return "w-16 h-16";
      case "md":
        return "w-24 h-24";
      case "lg":
        return "w-32 h-32";
      case "xl":
        return "w-40 h-40";
      default:
        return "w-32 h-32";
    }
  }, [size]);

  return (
    <div className="relative flex justify-center">
      <motion.div
        className={`${getSizeClasses()} mx-auto mb-8 rounded-2xl bg-gradient-to-br ${gradient} 
          shadow-2xl cursor-pointer relative overflow-hidden`}
        animate={isActive ? {
          rotateY: [0, 5, -5, 0],
          rotateX: [0, -5, 5, 0],
          scale: [1, 1.05, 1]
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{
          scale: 1.1,
          rotateY: 10,
          rotateX: -10
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        {/* 3D效果底层 */}
        <motion.div 
          className="absolute inset-2 bg-white/20 rounded-xl backdrop-blur-sm"
          animate={{
            opacity: isHovered ? 0.3 : 0.2
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* 图标容器 */}
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isActive ? [0, 360] : 0
            }}
            transition={{
              scale: { duration: 0.3 },
              rotate: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
          >
            {children}
          </motion.div>
        </div>
        
        {/* 光晕效果 */}
        <motion.div
          className={`absolute -inset-4 bg-gradient-to-br ${gradient} rounded-3xl blur-xl -z-10`}
          animate={{
            opacity: isActive ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1],
            scale: isActive ? [1, 1.1, 1] : [0.9, 1, 0.9]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* 脉冲环 */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        )}
        
        {/* 连接线 */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-gray-400 to-transparent" />
      </motion.div>
      
      {/* 底部指示器 */}
      {isActive && (
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
})

export default AnimatedIcon