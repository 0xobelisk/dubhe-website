/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    include: [
      'apps/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'packages/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    exclude: [
      'node_modules/**',
      '**/node_modules/**',
      'e2e/**', // 排除 E2E 测试文件，这些由 Playwright 运行
      '**/*.e2e.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '.next/**',
      'dist/**',
      'build/**'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        'apps/web/.next/',
        'apps/web/next.config.mjs',
        'turbo.json',
        'vitest.config.ts',
        'vitest.config.mjs',
        'vitest.setup.ts'
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './apps/web'),
      '@/components': resolve(__dirname, './apps/web/components'),
      '@/app': resolve(__dirname, './apps/web/app'),
      '@workspace/ui': resolve(__dirname, './packages/ui/src')
    }
  }
})