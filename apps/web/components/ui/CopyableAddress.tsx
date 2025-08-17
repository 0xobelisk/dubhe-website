"use client"

import { Copy, Check } from "lucide-react"
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard"

/**
 * CopyableAddress组件Props接口
 */
interface CopyableAddressProps {
  /** 完整地址 */
  fullAddress: string;
  /** 显示的截断地址，默认自动截断 */
  displayAddress?: string;
  /** 自定义样式类名 */
  className?: string;
  /** 是否显示复制成功提示 */
  showCopyFeedback?: boolean;
}

/**
 * CopyableAddress组件 - 可复制的地址显示
 * 
 * 功能特性：
 * - 地址复制到剪贴板
 * - 复制成功视觉反馈
 * - 自动地址截断显示
 * - 可自定义样式
 * 
 * @param fullAddress 完整地址
 * @param displayAddress 显示的截断地址
 * @param className 自定义样式类名
 * @param showCopyFeedback 是否显示复制成功提示
 * @returns CopyableAddress组件JSX元素
 */
export default function CopyableAddress({ 
  fullAddress, 
  displayAddress, 
  className = "",
  showCopyFeedback = true 
}: CopyableAddressProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard(2000)

  /**
   * 复制地址到剪贴板
   */
  const handleCopy = () => {
    if (showCopyFeedback) {
      copyToClipboard(fullAddress)
    } else {
      // 如果不需要反馈，直接复制
      navigator.clipboard.writeText(fullAddress).catch(error => {
        console.error('Failed to copy address:', error)
      })
    }
  }

  /**
   * 自动截断地址显示
   */
  const getDisplayAddress = () => {
    if (displayAddress) return displayAddress
    if (fullAddress.length <= 12) return fullAddress
    return `${fullAddress.slice(0, 6)}...${fullAddress.slice(-4)}`
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <p className="font-mono text-sm">{getDisplayAddress()}</p>
      <button 
        onClick={handleCopy}
        className="p-1 hover:bg-gray-800 rounded transition-colors flex items-center justify-center"
        title={isCopied ? "Copied!" : "Copy address"}
        aria-label={isCopied ? "Address copied" : "Copy address to clipboard"}
      >
        {isCopied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </button>
    </div>
  )
}