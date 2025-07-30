"use client"

import { ReactNode } from "react"

/**
 * Section组件Props接口
 */
interface SectionProps {
  /** 章节内容 */
  children: ReactNode;
  /** 章节标题 */
  title?: string;
  /** 章节副标题/描述 */
  subtitle?: string;
  /** 章节标签 */
  label?: string;
  /** 容器最大宽度 */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  /** 垂直内边距 */
  paddingY?: "sm" | "md" | "lg" | "xl";
  /** 文本对齐方式 */
  textAlign?: "left" | "center" | "right";
  /** 自定义样式类名 */
  className?: string;
  /** 是否显示背景装饰 */
  showBackground?: boolean;
  /** 背景装饰变体 */
  backgroundVariant?: "grid" | "gradient" | "dots";
}

/**
 * Section组件 - 通用章节容器
 * 
 * 功能特性：
 * - 一致的章节布局结构
 * - 可配置标题和副标题
 * - 多种容器宽度选项
 * - 背景装饰效果
 * - 响应式设计
 * 
 * @param children 章节内容
 * @param title 章节标题
 * @param subtitle 章节副标题/描述
 * @param label 章节标签
 * @param maxWidth 容器最大宽度
 * @param paddingY 垂直内边距
 * @param textAlign 文本对齐方式
 * @param className 自定义样式类名
 * @param showBackground 是否显示背景装饰
 * @param backgroundVariant 背景装饰变体
 * @returns Section组件JSX元素
 */
export default function Section({ 
  children, 
  title, 
  subtitle, 
  label,
  maxWidth = "lg", 
  paddingY = "lg",
  textAlign = "center",
  className = "",
  showBackground = true,
  backgroundVariant = "grid"
}: SectionProps) {
  
  /**
   * 获取最大宽度样式
   */
  const getMaxWidthStyles = () => {
    switch (maxWidth) {
      case "sm":
        return "max-w-2xl";
      case "md":
        return "max-w-4xl";
      case "lg":
        return "max-w-[1200px]";
      case "xl":
        return "max-w-[1400px]";
      case "full":
        return "max-w-full";
      default:
        return "max-w-[1200px]";
    }
  };

  /**
   * 获取垂直内边距样式
   */
  const getPaddingYStyles = () => {
    switch (paddingY) {
      case "sm":
        return "py-12 sm:py-16";
      case "md":
        return "py-16 sm:py-20";
      case "lg":
        return "py-24 sm:py-32";
      case "xl":
        return "py-32 sm:py-40";
      default:
        return "py-24 sm:py-32";
    }
  };

  /**
   * 获取文本对齐样式
   */
  const getTextAlignStyles = () => {
    switch (textAlign) {
      case "left":
        return "text-left";
      case "right":
        return "text-right";
      case "center":
      default:
        return "text-center";
    }
  };

  /**
   * 获取背景装饰元素
   */
  const getBackgroundElements = () => {
    if (!showBackground) return null;

    const baseClass = "absolute inset-0 -z-10";
    
    switch (backgroundVariant) {
      case "grid":
        return (
          <>
            <div className={`${baseClass} bg-grid-pattern opacity-5`} />
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full filter blur-[120px] bg-blue-500 opacity-10 -z-10" />
          </>
        );
      case "gradient":
        return (
          <div className={`${baseClass} bg-gradient-to-r from-blue-900/5 via-indigo-900/5 to-purple-900/5 opacity-70`} />
        );
      case "dots":
        return (
          <div className={`${baseClass} bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:20px_20px]`} />
        );
      default:
        return null;
    }
  };

  return (
    <section className={`relative overflow-hidden ${getPaddingYStyles()} ${className}`}>
      {getBackgroundElements()}
      
      <div className={`mx-auto ${getMaxWidthStyles()} px-6 lg:px-8`}>
        {/* Header */}
        {(label || title || subtitle) && (
          <div className={`mx-auto max-w-2xl ${textAlign === "left" ? "lg:mx-0" : ""} ${getTextAlignStyles()}`}>
            {label && (
              <p className="text-base font-semibold leading-7 text-blue-400 mb-3">
                {label}
              </p>
            )}
            {title && (
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-6 text-xl leading-8 text-gray-300">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`${(label || title || subtitle) ? "mt-16" : ""}`}>
          {children}
        </div>
      </div>
    </section>
  );
}