/**
 * 自定义Hooks库导出文件
 * 
 * 统一导出所有自定义Hooks，方便其他组件引用
 */

export { useCopyToClipboard } from './useCopyToClipboard'
export { useCountUp } from './useCountUp'
export { useScrollAnimation, useParallaxScroll, useFadeInScroll } from './useScrollAnimation'
export { useLocalStorage, useSessionStorage } from './useLocalStorage'

// 类型导出
export type { UseCopyToClipboardReturn } from './useCopyToClipboard'
export type { UseCountUpOptions, UseCountUpReturn } from './useCountUp'
export type { UseScrollAnimationOptions, UseScrollAnimationReturn } from './useScrollAnimation'
export type { UseLocalStorageReturn } from './useLocalStorage'