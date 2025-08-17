"use client"

import { useState, useCallback } from 'react'

/**
 * useCopyToClipboard Hook返回类型
 */
export interface UseCopyToClipboardReturn {
  /** 复制状态 */
  isCopied: boolean;
  /** 复制文本到剪贴板的函数 */
  copyToClipboard: (text: string) => Promise<boolean>;
  /** 重置复制状态的函数 */
  resetCopyState: () => void;
}

/**
 * useCopyToClipboard - 复制到剪贴板Hook
 * 
 * 功能特性：
 * - 复制文本到剪贴板
 * - 复制状态管理
 * - 自动重置状态
 * - 错误处理
 * 
 * @param resetDelay 自动重置延迟时间（毫秒），默认2000
 * @returns 复制相关的状态和方法
 * 
 * @example
 * ```tsx
 * const { isCopied, copyToClipboard } = useCopyToClipboard();
 * 
 * const handleCopy = () => {
 *   copyToClipboard("Hello World");
 * };
 * ```
 */
export function useCopyToClipboard(resetDelay: number = 2000): UseCopyToClipboardReturn {
  const [isCopied, setIsCopied] = useState(false)

  /**
   * 复制文本到剪贴板
   * @param text 要复制的文本
   * @returns 复制是否成功
   */
  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      // 检查浏览器是否支持clipboard API
      if (!navigator.clipboard) {
        // 降级方案：使用传统的execCommand方法
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        
        const success = document.execCommand('copy')
        document.body.removeChild(textArea)
        
        if (success) {
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), resetDelay)
          return true
        }
        return false
      }

      // 使用现代clipboard API
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      
      // 自动重置状态
      setTimeout(() => setIsCopied(false), resetDelay)
      
      return true
    } catch (error) {
      console.error('Failed to copy text to clipboard:', error)
      setIsCopied(false)
      return false
    }
  }, [resetDelay])

  /**
   * 手动重置复制状态
   */
  const resetCopyState = useCallback(() => {
    setIsCopied(false)
  }, [])

  return {
    isCopied,
    copyToClipboard,
    resetCopyState
  }
}