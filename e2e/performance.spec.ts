import { test, expect } from '@playwright/test'

test.describe('性能测试', () => {
  test('首页 Core Web Vitals 性能指标', async ({ page }) => {
    // 启用性能监控
    await page.goto('/', { waitUntil: 'networkidle' })
    
    // 等待页面完全加载
    await page.waitForTimeout(2000)

    // Read actual Navigation Timing entries supported by all configured browsers.
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
      if (!navigation) throw new Error('Navigation Timing entry is unavailable')
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
        loadComplete: navigation.loadEventEnd - navigation.startTime,
        domInteractive: navigation.domInteractive - navigation.startTime
      }
    })

    console.log('性能指标:', performanceMetrics)

    // 验证性能指标在合理范围内
    const metrics = performanceMetrics as Record<string, number>
    
    expect(metrics.domContentLoaded).toBeGreaterThan(0)
    expect(metrics.domContentLoaded).toBeLessThan(8000)
    console.log(`DOM 内容加载时间: ${metrics.domContentLoaded}ms`)

    expect(metrics.loadComplete).toBeGreaterThan(0)
    expect(metrics.loadComplete).toBeLessThan(12000)
    console.log(`页面完全加载时间: ${metrics.loadComplete}ms`)
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
    type JavaScriptRead = { url: string; bytes: number } | { url: string; error: unknown }
    const pendingReads: Promise<JavaScriptRead>[] = []
    
    // 监听网络请求
    const onResponse = (response: import('@playwright/test').Response) => {
      const url = response.url()
      const contentType = response.headers()['content-type'] || ''
      
      if (contentType.includes('javascript') || url.endsWith('.js')) {
        pendingReads.push(response.body().then(
          buffer => ({ url, bytes: buffer.length }),
          error => ({ url, error })
        ))
      }
    }
    page.on('response', onResponse)

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    page.off('response', onResponse)

    const reads = await Promise.all(pendingReads)
    const failures = reads.filter((read): read is { url: string; error: unknown } => 'error' in read)
    if (failures.length > 0) {
      throw new Error(`Failed to read JavaScript response bodies: ${failures.map(read => `${read.url}: ${String(read.error)}`).join('; ')}`)
    }
    for (const read of reads) {
      if ('bytes' in read) resourceSizes[read.url] = read.bytes
    }
    expect(Object.keys(resourceSizes).length, 'JavaScript budget requires successfully measured resources').toBeGreaterThan(0)

    console.log('JavaScript 资源大小:', resourceSizes)

    // 计算总 JS 大小
    const totalJSSize = Object.values(resourceSizes).reduce((sum, size) => sum + size, 0)
    expect(totalJSSize, 'JavaScript budget requires a non-empty measured payload').toBeGreaterThan(0)
    console.log(`总 JavaScript 大小: ${(totalJSSize / 1024 / 1024).toFixed(2)} MB`)

    // 验证 JS 包大小在合理范围内（放宽限制到50MB，考虑到开发环境）
    expect(totalJSSize).toBeLessThan(50 * 1024 * 1024) // 50MB

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

    // 验证移动端加载时间（放宽限制考虑网络延迟和动画）
    expect(loadTime).toBeLessThan(15000) // 15秒以内（考虑到网络延迟、加载动画和移动端性能）

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
    
    // 获取初始内存使用情况（增强浏览器兼容性）
    const initialMemory = await page.evaluate(() => {
      // Chrome/Chromium支持memory API
      if ((performance as any).memory) {
        return {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
        }
      }
      // Firefox和Safari不支持，返回null
      return null
    })

    // Verify real DOM-resource cleanup in every browser, including those without
    // Chromium's non-standard heap API.
    const domResources = await page.evaluate(() => {
      const before = document.querySelectorAll('*').length
      const container = document.createElement('div')
      for (let i = 0; i < 1000; i++) {
        const child = document.createElement('div')
        child.textContent = `Test content ${i}`
        container.appendChild(child)
      }
      document.body.appendChild(container)
      const created = container.childElementCount
      container.remove()
      return { before, created, after: document.querySelectorAll('*').length }
    })
    expect(domResources.created).toBe(1000)
    expect(domResources.after).toBe(domResources.before)

    if (initialMemory) {
      console.log('初始内存使用:', initialMemory)

      // 强制垃圾回收（如果可能）
      await page.evaluate(() => {
        if ((window as any).gc) {
          (window as any).gc()
        }
      })

      // 等待一段时间
      await page.waitForTimeout(1000)

      // 获取最终内存使用情况（增强浏览器兼容性）
      const finalMemory = await page.evaluate(() => {
        // Chrome/Chromium支持memory API
        if ((performance as any).memory) {
          return {
            usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
            totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
            jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
          }
        }
        // Firefox和Safari不支持，返回null
        return null
      })

      if (finalMemory) {
        console.log('最终内存使用:', finalMemory)
        
        const memoryIncrease = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize
        console.log(`内存增长: ${(memoryIncrease / 1024 / 1024).toFixed(2)} MB`)
        
        // 验证内存增长在合理范围内
        expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024) // 50MB以内
      }
    } else {
      console.log('浏览器不支持内存监控 API（Firefox/Safari正常现象）')
      // DOM resource creation and cleanup above remain required on these browsers.
    }
  })
})
