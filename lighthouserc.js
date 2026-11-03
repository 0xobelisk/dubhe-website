module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: 'pnpm start',
      // Keep the original mobile/Slow 4G environment across Lighthouse upgrades.
      settings: {
        "formFactor": "mobile",
        "screenEmulation": {
          "mobile": true,
          "width": 412,
          "height": 823,
          "deviceScaleFactor": 1.75,
          "disabled": false
        },
        "emulatedUserAgent": "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36",
        "throttlingMethod": "simulate",
        "throttling": {
          "rttMs": 150,
          "throughputKbps": 1638.4,
          "requestLatencyMs": 562.5,
          "downloadThroughputKbps": 1474.5600000000002,
          "uploadThroughputKbps": 675,
          "cpuSlowdownMultiplier": 4
        }
      },
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/engine',
        'http://localhost:3000/os',
        'http://localhost:3000/channel',
        'http://localhost:3000/contact',
        'http://localhost:3000/team'
      ]
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.85 }],
        'categories:seo': ['error', { minScore: 0.85 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        
        // 其他重要指标
        'speed-index': ['warn', { maxNumericValue: 3000 }],
        'interactive': ['warn', { maxNumericValue: 3500 }],
        'image-delivery-insight': 'warn',
        'uses-responsive-images': 'warn',
        'modern-image-formats': 'warn',
        
        // 可访问性
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        
        // SEO
        'document-title': 'error',
        'meta-description': 'error',
        'robots-txt': 'warn',
        'canonical': 'warn'
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-ci-results'
    },
    server: {
      port: 9001,
      storage: './lighthouse-ci-results'
    }
  }
}
