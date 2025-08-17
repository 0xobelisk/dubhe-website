"use client"

import { useState, useEffect, useCallback } from 'react'

/**
 * useLocalStorage Hook返回类型
 */
export type UseLocalStorageReturn<T> = [
  /** 当前存储的值 */
  T,
  /** 设置新值的函数 */
  (value: T | ((prev: T) => T)) => void,
  /** 移除存储项的函数 */
  () => void
]

/**
 * useLocalStorage - 本地存储Hook
 * 
 * 功能特性：
 * - 自动序列化和反序列化
 * - SSR安全（客户端渲染检查）
 * - 错误处理和降级
 * - 支持函数式更新
 * - 跨标签页同步
 * 
 * @param key 存储键名
 * @param initialValue 初始值
 * @returns [value, setValue, removeValue] 元组
 * 
 * @example
 * ```tsx
 * const [user, setUser, removeUser] = useLocalStorage('user', null);
 * const [theme, setTheme] = useLocalStorage('theme', 'dark');
 * const [count, setCount] = useLocalStorage('count', 0);
 * 
 * // 函数式更新
 * setCount(prev => prev + 1);
 * 
 * // 移除存储
 * removeUser();
 * ```
 */
export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): UseLocalStorageReturn<T> {
  // 状态初始化函数
  const [storedValue, setStoredValue] = useState<T>(() => {
    // SSR安全检查
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  /**
   * 设置值到localStorage和状态
   * @param value 新值或更新函数
   */
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      // 支持函数式更新
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // 更新状态
      setStoredValue(valueToStore)
      
      // SSR安全检查
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
        
        // 触发自定义事件以支持跨标签页同步
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: JSON.stringify(valueToStore),
          oldValue: window.localStorage.getItem(key),
          storageArea: window.localStorage,
          url: window.location.href
        }))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  /**
   * 从localStorage移除值
   */
  const removeValue = useCallback(() => {
    try {
      // 重置为初始值
      setStoredValue(initialValue)
      
      // SSR安全检查
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
        
        // 触发自定义事件
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: null,
          oldValue: window.localStorage.getItem(key),
          storageArea: window.localStorage,
          url: window.location.href
        }))
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // 监听localStorage变化（跨标签页同步）
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.storageArea === window.localStorage) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue
          setStoredValue(newValue)
        } catch (error) {
          console.warn(`Error parsing localStorage change for key "${key}":`, error)
        }
      }
    }

    // 监听storage事件
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

/**
 * useSessionStorage - 会话存储Hook
 * 
 * 类似于useLocalStorage，但使用sessionStorage
 * 数据在会话结束时会被清除
 * 
 * @param key 存储键名
 * @param initialValue 初始值
 * @returns [value, setValue, removeValue] 元组
 */
export function useSessionStorage<T>(
  key: string, 
  initialValue: T
): UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}