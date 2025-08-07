import { test, expect } from '@playwright/test'

test.describe('性能测试', () => {
  test('首页 Core Web Vitals 性能指标', async ({ page }) => {
    // 启用性能监控
    await page.goto('/', { waitUntil: 'networkidle' })
    
    // 等待页面完全加载
    await page.waitForTimeout(2000)

    // 获取性能指标
    const performanceMetrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const metrics: Record<string, number> = {}
          
          entries.forEach((entry) => {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming
              metrics.domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.navigationStart
              metrics.loadComplete = navEntry.loadEventEnd - navEntry.navigationStart
              metrics.domInteractive = navEntry.domInteractive - navEntry.navigationStart
            }
          })
          
          resolve(metrics)
        }).observe({ entryTypes: ['navigation'] })
        
        // 如果没有性能数据，返回基础指标
        setTimeout(() => {
          resolve({
            domContentLoaded: performance.timing?.domContentLoadedEventEnd - performance.timing?.navigationStart || 0,
            loadComplete: performance.timing?.loadEventEnd - performance.timing?.navigationStart || 0,
            domInteractive: performance.timing?.domInteractive - performance.timing?.navigationStart || 0
          })
        }, 100)
      })
    })

    console.log('性能指标:', performanceMetrics)

    // 验证性能指标在合理范围内
    const metrics = performanceMetrics as Record<string, number>
    
    if (metrics.domContentLoaded > 0) {
      expect(metrics.domContentLoaded).toBeLessThan(3000) // 3秒以内
      console.log(`DOM 内容加载时间: ${metrics.domContentLoaded}ms`)
    }

    if (metrics.loadComplete > 0) {
      expect(metrics.loadComplete).toBeLessThan(5000) // 5秒以内
      console.log(`页面完全加载时间: ${metrics.loadComplete}ms`)
    }
  })

  test('图片加载性能', async ({ page }) => {
    await page.goto('/')
    
    // 等待图片加载
    await page.waitForLoadState('networkidle')
    
    // 检查图片加载情况
    const imageMetrics = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'))
      const metrics = {
        totalImages: images.length,
        loadedImages: 0,
        failedImages: 0,
        lazyImages: 0
      }

      images.forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
          metrics.loadedImages++
        } else if (img.complete && img.naturalWidth === 0) {
          metrics.failedImages++
        }
        
        if (img.loading === 'lazy') {
          metrics.lazyImages++
        }
      })

      return metrics
    })

    console.log('图片加载指标:', imageMetrics)

    // 验证大部分图片成功加载
    if (imageMetrics.totalImages > 0) {
      const successRate = imageMetrics.loadedImages / imageMetrics.totalImages
      expect(successRate).toBeGreaterThan(0.8) // 80%以上的图片应该成功加载
    }

    // 验证失败的图片数量不要太多
    expect(imageMetrics.failedImages).toBeLessThan(5)
  })

  test('JavaScript 包大小检查', async ({ page }) => {
    const resourceSizes: Record<string, number> = {}
    
    // 监听网络请求
    page.on('response', async (response) => {
      const url = response.url()
      const contentType = response.headers()['content-type'] || ''
      
      if (contentType.includes('javascript') || url.endsWith('.js')) {
        try {
          const buffer = await response.body()
          resourceSizes[url] = buffer.length
        } catch (error) {
          // 忽略无法获取的资源
        }
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    console.log('JavaScript 资源大小:', resourceSizes)

    // 计算总 JS 大小
    const totalJSSize = Object.values(resourceSizes).reduce((sum, size) => sum + size, 0)
    console.log(`总 JavaScript 大小: ${(totalJSSize / 1024 / 1024).toFixed(2)} MB`)

    // 验证 JS 包大小在合理范围内（20MB 以内，现代React应用标准）
    expect(totalJSSize).toBeLessThan(20 * 1024 * 1024) // 20MB

    // 检查是否有异常大的单个文件
    Object.entries(resourceSizes).forEach(([url, size]) => {
      if (size > 500 * 1024) { // 500KB
        console.warn(`大型 JS 文件: ${url} - ${(size / 1024).toFixed(2)} KB`)
      }
    })
  })

  test('移动端性能', async ({ page }) => {
    // 模拟移动端设备
    await page.setViewportSize({ width: 375, height: 667 })
    
    // 模拟慢速网络
    await page.context().route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100)) // 随机延迟
      await route.continue()
    })

    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    const loadTime = Date.now() - startTime

    console.log(`移动端首次内容绘制时间: ${loadTime}ms`)

    // 验证移动端加载时间 (包含4秒加载动画)
    expect(loadTime).toBeLessThan(8000) // 8秒以内（考虑到加载动画和移动端性能）

    // 验证页面在移动端可交互
    await expect(page.locator('body')).toBeVisible()
    
    // 检查是否有移动端特定的优化
    const viewport = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="viewport"]')
      return meta?.getAttribute('content')
    })
    
    expect(viewport).toBeTruthy()
    expect(viewport).toContain('width=device-width')
  })

  test('内存泄漏检查', async ({ page }) => {
    await page.goto('/')
    
    // 获取初始内存使用情况
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory ? {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
      } : null
    })

    if (initialMemory) {
      console.log('初始内存使用:', initialMemory)

      // 进行一些页面交互
      await page.evaluate(() => {
        // 模拟一些内存密集型操作
        for (let i = 0; i < 1000; i++) {
          const div = document.createElement('div')
          div.innerHTML = `Test content ${i}`
          document.body.appendChild(div)
        }
        
        // 清理创建的元素
        const testDivs = document.querySelectorAll('div')
        testDivs.forEach(div => {
          if (div.innerHTML.includes('Test content')) {
            div.remove()
          }
        })
      })

      // 强制垃圾回收（如果可能）
      await page.evaluate(() => {
        if ((window as any).gc) {
          (window as any).gc()
        }
      })

      // 等待一段时间
      await page.waitForTimeout(1000)

      // 获取最终内存使用情况
      const finalMemory = await page.evaluate(() => {
        return (performance as any).memory ? {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
        } : null
      })

      if (finalMemory) {
        console.log('最终内存使用:', finalMemory)
        
        const memoryIncrease = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize
        console.log(`内存增长: ${(memoryIncrease / 1024 / 1024).toFixed(2)} MB`)
        
        // 验证内存增长在合理范围内
        expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024) // 50MB以内
      }
    } else {
      console.log('浏览器不支持内存监控 API')
    }
  })
})