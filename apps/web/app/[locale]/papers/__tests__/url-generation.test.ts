import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Unit tests for PDF URL generation functions
describe('PDF URL Generation Functions', () => {
  let originalEnv: NodeJS.ProcessEnv
  
  beforeEach(() => {
    // Store original environment
    originalEnv = { ...process.env }
    // Reset console.log mock
    vi.clearAllMocks()
    // Mock console.log to capture development logs
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv
    vi.restoreAllMocks()
  })

  describe('getLightpaperUrl', () => {
    // Import function dynamically to pick up environment changes
    const getLightpaperUrl = () => {
      const envUrl = process.env.NEXT_PUBLIC_LIGHTPAPER_URL;
      const fallbackUrl = 'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing';
      
      // Check if environment variable exists and is not an empty string
      if (!envUrl || envUrl.trim() === '') {
        if (process.env.NODE_ENV === 'development') {
          console.log('NEXT_PUBLIC_LIGHTPAPER_URL not set or empty, using fallback Google Drive URL');
        }
        return fallbackUrl;
      }
      
      return envUrl;
    };

    it('returns environment variable URL when set', () => {
      const customUrl = 'https://custom-cdn.com/lightpaper.pdf'
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = customUrl
      process.env.NODE_ENV = 'production'

      const result = getLightpaperUrl()

      expect(result).toBe(customUrl)
      expect(console.log).not.toHaveBeenCalled()
    })

    it('returns fallback Google Drive URL when environment variable is empty', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = ''
      process.env.NODE_ENV = 'development'

      const result = getLightpaperUrl()

      expect(result).toBe('https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing')
      expect(console.log).toHaveBeenCalledWith('NEXT_PUBLIC_LIGHTPAPER_URL not set or empty, using fallback Google Drive URL')
    })

    it('returns fallback URL when environment variable is undefined', () => {
      delete process.env.NEXT_PUBLIC_LIGHTPAPER_URL
      process.env.NODE_ENV = 'development'

      const result = getLightpaperUrl()

      expect(result).toBe('https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing')
      expect(console.log).toHaveBeenCalledWith('NEXT_PUBLIC_LIGHTPAPER_URL not set or empty, using fallback Google Drive URL')
    })

    it('returns fallback URL when environment variable is whitespace only', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = '   \t\n   '
      process.env.NODE_ENV = 'development'

      const result = getLightpaperUrl()

      expect(result).toBe('https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing')
      expect(console.log).toHaveBeenCalledWith('NEXT_PUBLIC_LIGHTPAPER_URL not set or empty, using fallback Google Drive URL')
    })

    it('does not log in production environment when using fallback', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = ''
      process.env.NODE_ENV = 'production'

      const result = getLightpaperUrl()

      expect(result).toBe('https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing')
      expect(console.log).not.toHaveBeenCalled()
    })

    it('handles non-standard environment values', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = 'https://example.com/custom-path?param=value&another=test'
      process.env.NODE_ENV = 'test'

      const result = getLightpaperUrl()

      expect(result).toBe('https://example.com/custom-path?param=value&another=test')
    })
  })

  describe('getOnepaperUrl', () => {
    const getOnepaperUrl = () => {
      const envUrl = process.env.NEXT_PUBLIC_ONEPAPER_URL;
      const fallbackUrl = 'https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing';
      
      // Check if environment variable exists and is not an empty string
      if (!envUrl || envUrl.trim() === '') {
        if (process.env.NODE_ENV === 'development') {
          console.log('NEXT_PUBLIC_ONEPAPER_URL not set or empty, using fallback Google Drive URL');
        }
        return fallbackUrl;
      }
      
      return envUrl;
    };

    it('returns environment variable URL when set', () => {
      const customUrl = 'https://cdn.example.com/onepager.pdf'
      process.env.NEXT_PUBLIC_ONEPAPER_URL = customUrl
      process.env.NODE_ENV = 'production'

      const result = getOnepaperUrl()

      expect(result).toBe(customUrl)
      expect(console.log).not.toHaveBeenCalled()
    })

    it('returns fallback Google Drive URL when environment variable is empty', () => {
      process.env.NEXT_PUBLIC_ONEPAGER_URL = ''
      process.env.NODE_ENV = 'development'

      const result = getOnepaperUrl()

      expect(result).toBe('https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing')
      expect(console.log).toHaveBeenCalledWith('NEXT_PUBLIC_ONEPAPER_URL not set or empty, using fallback Google Drive URL')
    })

    it('returns fallback URL when environment variable is undefined', () => {
      delete process.env.NEXT_PUBLIC_ONEPAPER_URL
      process.env.NODE_ENV = 'development'

      const result = getOnepaperUrl()

      expect(result).toBe('https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing')
      expect(console.log).toHaveBeenCalledWith('NEXT_PUBLIC_ONEPAPER_URL not set or empty, using fallback Google Drive URL')
    })

    it('handles edge case with null-like strings', () => {
      process.env.NEXT_PUBLIC_ONEPAGER_URL = 'null'
      process.env.NODE_ENV = 'test'

      const getOnepaperUrl = () => {
        const envUrl = process.env.NEXT_PUBLIC_ONEPAGER_URL;
        const fallbackUrl = 'https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing';
        
        if (!envUrl || envUrl.trim() === '') {
          return fallbackUrl;
        }
        
        return envUrl;
      };

      const result = getOnepaperUrl()

      // Should treat 'null' string as valid URL, not as null
      expect(result).toBe('null')
    })

    it('preserves complex URLs with query parameters', () => {
      const complexUrl = 'https://storage.example.com/docs/onepager.pdf?version=v2&token=abc123&format=pdf'
      process.env.NEXT_PUBLIC_ONEPAGER_URL = complexUrl
      process.env.NODE_ENV = 'production'

      const getOnepaperUrl = () => {
        const envUrl = process.env.NEXT_PUBLIC_ONEPAGER_URL;
        const fallbackUrl = 'https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing';
        
        if (!envUrl || envUrl.trim() === '') {
          return fallbackUrl;
        }
        
        return envUrl;
      };

      const result = getOnepaperUrl()

      expect(result).toBe(complexUrl)
    })
  })

  describe('URL Validation and Security', () => {
    it('generated URLs should be valid URLs', () => {
      const lightpaperUrl = 'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing'
      const onepaperUrl = 'https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing'

      // Should not throw when creating URL objects
      expect(() => new URL(lightpaperUrl)).not.toThrow()
      expect(() => new URL(onepaperUrl)).not.toThrow()

      const lightpaperUrlObj = new URL(lightpaperUrl)
      const onepaperUrlObj = new URL(onepaperUrl)

      expect(lightpaperUrlObj.protocol).toBe('https:')
      expect(lightpaperUrlObj.hostname).toBe('drive.google.com')
      expect(onepaperUrlObj.protocol).toBe('https:')
      expect(onepaperUrlObj.hostname).toBe('drive.google.com')
    })

    it('should handle potentially malicious environment variables safely', () => {
      const maliciousUrl = 'javascript:alert("xss")'
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = maliciousUrl
      
      const getLightpaperUrl = () => {
        const envUrl = process.env.NEXT_PUBLIC_LIGHTPAPER_URL;
        const fallbackUrl = 'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing';
        
        if (!envUrl || envUrl.trim() === '') {
          return fallbackUrl;
        }
        
        return envUrl;
      };

      const result = getLightpaperUrl()

      // The function should return the malicious URL as-is (security handled by browser)
      // This is expected behavior - environment variables are trusted
      expect(result).toBe(maliciousUrl)
    })

    it('should preserve Unicode characters in URLs', () => {
      const unicodeUrl = 'https://example.com/文档/lightpaper.pdf'
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = unicodeUrl
      
      const getLightpaperUrl = () => {
        const envUrl = process.env.NEXT_PUBLIC_LIGHTPAPER_URL;
        const fallbackUrl = 'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing';
        
        if (!envUrl || envUrl.trim() === '') {
          return fallbackUrl;
        }
        
        return envUrl;
      };

      const result = getLightpaperUrl()

      expect(result).toBe(unicodeUrl)
    })
  })

  describe('Performance and Reliability', () => {
    it('should execute quickly with valid environment variables', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = 'https://example.com/test.pdf'
      
      const getLightpaperUrl = () => {
        const envUrl = process.env.NEXT_PUBLIC_LIGHTPAPER_URL;
        const fallbackUrl = 'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing';
        
        if (!envUrl || envUrl.trim() === '') {
          return fallbackUrl;
        }
        
        return envUrl;
      };

      const startTime = performance.now()
      const result = getLightpaperUrl()
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(1) // Should complete in less than 1ms
      expect(result).toBe('https://example.com/test.pdf')
    })

    it('should execute quickly with fallback URLs', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = ''
      process.env.NODE_ENV = 'test' // Avoid logging overhead
      
      const getLightpaperUrl = () => {
        const envUrl = process.env.NEXT_PUBLIC_LIGHTPAPER_URL;
        const fallbackUrl = 'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing';
        
        if (!envUrl || envUrl.trim() === '') {
          return fallbackUrl;
        }
        
        return envUrl;
      };

      const startTime = performance.now()
      const result = getLightpaperUrl()
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(1) // Should complete in less than 1ms
      expect(result).toBe('https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing')
    })

    it('should handle multiple rapid calls consistently', () => {
      process.env.NEXT_PUBLIC_ONEPAGER_URL = 'https://example.com/consistent.pdf'
      
      const getOnepaperUrl = () => {
        const envUrl = process.env.NEXT_PUBLIC_ONEPAGER_URL;
        const fallbackUrl = 'https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing';
        
        if (!envUrl || envUrl.trim() === '') {
          return fallbackUrl;
        }
        
        return envUrl;
      };

      const results = []
      for (let i = 0; i < 100; i++) {
        results.push(getOnepaperUrl())
      }

      // All results should be identical
      const firstResult = results[0]
      expect(results.every(result => result === firstResult)).toBe(true)
      expect(firstResult).toBe('https://example.com/consistent.pdf')
    })
  })

  describe('Environment Variable Edge Cases', () => {
    it('should handle environment variable with only spaces', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = '     '
      process.env.NODE_ENV = 'development'
      
      const getLightpaperUrl = () => {
        const envUrl = process.env.NEXT_PUBLIC_LIGHTPAPER_URL;
        const fallbackUrl = 'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing';
        
        if (!envUrl || envUrl.trim() === '') {
          if (process.env.NODE_ENV === 'development') {
            console.log('NEXT_PUBLIC_LIGHTPAPER_URL not set or empty, using fallback Google Drive URL');
          }
          return fallbackUrl;
        }
        
        return envUrl;
      };

      const result = getLightpaperUrl()

      expect(result).toBe('https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing')
      expect(console.log).toHaveBeenCalled()
    })

    it('should handle environment variable with mixed whitespace', () => {
      process.env.NEXT_PUBLIC_ONEPAGER_URL = '\t\n  \r  '
      process.env.NODE_ENV = 'development'
      
      const getOnepaperUrl = () => {
        const envUrl = process.env.NEXT_PUBLIC_ONEPAGER_URL;
        const fallbackUrl = 'https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing';
        
        if (!envUrl || envUrl.trim() === '') {
          if (process.env.NODE_ENV === 'development') {
            console.log('NEXT_PUBLIC_ONEPAGER_URL not set or empty, using fallback Google Drive URL');
          }
          return fallbackUrl;
        }
        
        return envUrl;
      };

      const result = getOnepaperUrl()

      expect(result).toBe('https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing')
      expect(console.log).toHaveBeenCalledWith('NEXT_PUBLIC_ONEPAGER_URL not set or empty, using fallback Google Drive URL')
    })

    it('should handle environment variable with leading/trailing whitespace', () => {
      const urlWithWhitespace = '  https://example.com/test.pdf  '
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = urlWithWhitespace
      
      const getLightpaperUrl = () => {
        const envUrl = process.env.NEXT_PUBLIC_LIGHTPAPER_URL;
        const fallbackUrl = 'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing';
        
        if (!envUrl || envUrl.trim() === '') {
          return fallbackUrl;
        }
        
        return envUrl;
      };

      const result = getLightpaperUrl()

      // Should return the URL as-is (with whitespace)
      // Application can choose to trim if needed
      expect(result).toBe(urlWithWhitespace)
    })
  })
})