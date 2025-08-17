/// <reference types="vitest" />
/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

import 'vitest/globals'
import '@testing-library/jest-dom'

// Exclude Playwright tests from Vitest
declare module 'vitest/config' {
  interface InlineConfig {
    test?: {
      exclude?: string[]
    }
  }
}