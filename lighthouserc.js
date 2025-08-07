module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: 'pnpm build && pnpm start',
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
        'uses-webp-images': 'warn',
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
      target: 'temporary-public-storage'
    },
    server: {
      port: 9001,
      storage: './lighthouse-ci-results'
    }
  }
}