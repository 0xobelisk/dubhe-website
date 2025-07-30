"use client"

import { ReactNode } from "react"

/**
 * Card组件变体类型
 */
type CardVariant = "default" | "glass" | "solid" | "outline";

/**
 * Card组件Props接口
 */
interface CardProps {
  /** 卡片内容 */
  children: ReactNode;
  /** 卡片变体样式 */
  variant?: CardVariant;
  /** 自定义样式类名 */
  className?: string;
  /** 内边距大小 */
  padding?: "sm" | "md" | "lg";
  /** 是否可点击 */
  clickable?: boolean;
  /** 点击事件处理 */
  onClick?: () => void;
}

/**
 * Card组件 - 通用卡片容器
 * 
 * 功能特性：
 * - 多种卡片样式变体
 * - 可配置内边距
 * - 支持点击交互
 * - 一致的视觉设计
 * 
 * @param children 卡片内容
 * @param variant 卡片变体样式
 * @param className 自定义样式类名
 * @param padding 内边距大小
 * @param clickable 是否可点击
 * @param onClick 点击事件处理
 * @returns Card组件JSX元素
 */
export default function Card({ 
  children, 
  variant = "default", 
  className = "", 
  padding = "md",
  clickable = false,
  onClick 
}: CardProps) {
  
  /**
   * 获取卡片基础样式
   */
  const getBaseStyles = () => {
    const baseStyles = "rounded-xl transition-all duration-200";
    
    if (clickable || onClick) {
      return `${baseStyles} cursor-pointer hover:scale-[1.02] active:scale-[0.98]`;
    }
    
    return baseStyles;
  };

  /**
   * 获取变体样式
   */
  const getVariantStyles = () => {
    switch (variant) {
      case "glass":
        return "bg-gray-900/50 border border-gray-800 backdrop-blur-sm";
      case "solid":
        return "bg-gray-900 border border-gray-700";
      case "outline":
        return "border border-gray-800 hover:border-gray-700";
      case "default":
      default:
        return "bg-gray-900/30 border border-gray-800/50";
    }
  };

  /**
   * 获取内边距样式
   */
  const getPaddingStyles = () => {
    switch (padding) {
      case "sm":
        return "p-4";
      case "lg":
        return "p-8";
      case "md":
      default:
        return "p-6";
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`${getBaseStyles()} ${getVariantStyles()} ${getPaddingStyles()} ${className}`}
      onClick={handleClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
}