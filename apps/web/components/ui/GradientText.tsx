"use client"

import { ReactNode } from "react"

/**
 * 渐变方向类型
 */
type GradientDirection = "to-r" | "to-l" | "to-t" | "to-b" | "to-br" | "to-bl" | "to-tr" | "to-tl";

/**
 * 渐变预设类型
 */
type GradientPreset = "blue-purple" | "blue-cyan" | "orange-yellow" | "green-blue" | "pink-purple" | "custom";

/**
 * GradientText组件Props接口
 */
interface GradientTextProps {
  /** 文本内容 */
  children: ReactNode;
  /** 渐变预设 */
  preset?: GradientPreset;
  /** 渐变方向 */
  direction?: GradientDirection;
  /** 自定义渐变颜色 (当preset为custom时使用) */
  customGradient?: string;
  /** 文本大小 */
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  /** 字体粗细 */
  weight?: "normal" | "medium" | "semibold" | "bold";
  /** 自定义样式类名 */
  className?: string;
  /** HTML标签类型 */
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}

/**
 * GradientText组件 - 渐变文本
 * 
 * 功能特性：
 * - 多种渐变预设颜色
 * - 可配置渐变方向
 * - 自定义渐变颜色
 * - 多种文本尺寸
 * - 灵活的HTML标签
 * 
 * @param children 文本内容
 * @param preset 渐变预设
 * @param direction 渐变方向
 * @param customGradient 自定义渐变颜色
 * @param size 文本大小
 * @param weight 字体粗细
 * @param className 自定义样式类名
 * @param as HTML标签类型
 * @returns GradientText组件JSX元素
 */
export default function GradientText({ 
  children, 
  preset = "blue-purple",
  direction = "to-r",
  customGradient,
  size = "base",
  weight = "normal",
  className = "",
  as: Component = "span"
}: GradientTextProps) {
  
  /**
   * 获取渐变颜色样式
   */
  const getGradientStyles = () => {
    if (preset === "custom" && customGradient) {
      return `bg-gradient-${direction} ${customGradient}`;
    }

    const gradientMap = {
      "blue-purple": `bg-gradient-${direction} from-blue-400 to-purple-500`,
      "blue-cyan": `bg-gradient-${direction} from-blue-400 to-cyan-400`,
      "orange-yellow": `bg-gradient-${direction} from-orange-500 to-yellow-500`,
      "green-blue": `bg-gradient-${direction} from-green-400 to-blue-500`,
      "pink-purple": `bg-gradient-${direction} from-pink-400 to-purple-500`,
      "custom": "" // Will be handled above
    };

    return gradientMap[preset] || gradientMap["blue-purple"];
  };

  /**
   * 获取文本大小样式
   */
  const getSizeStyles = () => {
    const sizeMap = {
      "sm": "text-sm",
      "base": "text-base",
      "lg": "text-lg",
      "xl": "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl"
    };
    
    return sizeMap[size] || sizeMap["base"];
  };

  /**
   * 获取字体粗细样式
   */
  const getWeightStyles = () => {
    const weightMap = {
      "normal": "font-normal",
      "medium": "font-medium", 
      "semibold": "font-semibold",
      "bold": "font-bold"
    };
    
    return weightMap[weight] || weightMap["normal"];
  };

  const combinedClassName = `
    ${getGradientStyles()} 
    ${getSizeStyles()} 
    ${getWeightStyles()} 
    bg-clip-text 
    text-transparent 
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <Component className={combinedClassName}>
      {children}
    </Component>
  );
}