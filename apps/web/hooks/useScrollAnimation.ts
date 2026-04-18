"use client"

import type { RefObject } from 'react'
import { useScroll, useTransform, type MotionValue } from 'framer-motion'

/**
 * useScrollAnimation Hook配置选项
 */
export interface UseScrollAnimationOptions {
  /** 目标元素引用 */  
  target?: RefObject<HTMLElement | null>;
  /** 滚动偏移量配置 */
  offset?: NonNullable<Parameters<typeof useScroll>[0]>['offset'];
}

/**
 * useScrollAnimation Hook返回类型
 */
export interface UseScrollAnimationReturn {
  /** 滚动进度 (0-1) */
  scrollYProgress: MotionValue<number>;
  /** 创建Y轴变换 */
  y: MotionValue<number>;
  /** 创建透明度变换 */
  opacity: MotionValue<number>;
  /** 创建缩放变换 */
  scale: MotionValue<number>;
  /** 创建旋转变换 */
  rotate: MotionValue<number>;
}

/**
 * useScrollAnimation - 滚动动画Hook
 * 
 * 功能特性：
 * - 基于滚动进度的动画
 * - 多种预设变换类型
 * - 自定义变换支持
 * - 性能优化的滚动监听
 * - 灵活的偏移量配置
 * 
 * @param options 配置选项
 * @returns 滚动动画相关的状态和方法
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const { y, opacity } = useScrollAnimation({
 *   target: ref,
 *   offset: ["start end", "end start"]
 * });
 * 
 * return (
 *   <motion.div 
 *     ref={ref}
 *     style={{ y, opacity }}
 *   >
 *     Content
 *   </motion.div>
 * );
 * ```
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}): UseScrollAnimationReturn {
  const { target, offset = ["start end", "end start"] } = options

  const { scrollYProgress } = useScroll({
    target,
    offset
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5])

  return {
    scrollYProgress,
    y,
    opacity,
    scale,
    rotate
  }
}

/**
 * useParallaxScroll - 视差滚动Hook (便捷封装)
 * 
 * @param speed 视差速度，正数向上移动，负数向下移动
 * @param target 目标元素引用
 * @returns Y轴位移MotionValue
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const y = useParallaxScroll(-50, ref); // 向下视差移动50px
 * 
 * return <motion.div ref={ref} style={{ y }}>Content</motion.div>;
 * ```
 */
export function useParallaxScroll(speed: number, target?: RefObject<HTMLElement | null>): MotionValue<number> {
  const { scrollYProgress } = useScrollAnimation({ target })
  return useTransform(scrollYProgress, [0, 1], [0, speed])
}

/**
 * useFadeInScroll - 滚动淡入Hook (便捷封装)
 * 
 * @param target 目标元素引用
 * @param fadeStart 开始淡入的滚动进度 (0-1)
 * @param fadeEnd 完成淡入的滚动进度 (0-1)
 * @returns 透明度MotionValue
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const opacity = useFadeInScroll(ref, 0.2, 0.6); // 在20%-60%滚动进度间淡入
 * 
 * return <motion.div ref={ref} style={{ opacity }}>Content</motion.div>;
 * ```
 */
export function useFadeInScroll(
  target?: RefObject<HTMLElement | null>, 
  fadeStart: number = 0, 
  fadeEnd: number = 0.5
): MotionValue<number> {
  const { scrollYProgress } = useScrollAnimation({ target })
  return useTransform(scrollYProgress, [fadeStart, fadeEnd], [0, 1])
}
