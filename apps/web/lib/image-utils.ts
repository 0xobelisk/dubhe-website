import { getPlaiceholder } from 'plaiceholder'
import fs from 'fs/promises'
import path from 'path'

// Cache for blur data URLs to avoid regenerating
const blurCache = new Map<string, string>()

/**
 * Generate base64 blur placeholder for an image
 */
export async function getBlurDataURL(src: string): Promise<string> {
  // Check cache first
  if (blurCache.has(src)) {
    return blurCache.get(src)!
  }

  try {
    let buffer: Buffer

    // Handle different image sources
    if (src.startsWith('http')) {
      // For external images, fetch them
      const response = await fetch(src)
      const arrayBuffer = await response.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)
    } else if (src.startsWith('/')) {
      // For local images in public folder
      const filePath = path.join(process.cwd(), 'public', src)
      buffer = await fs.readFile(filePath)
    } else {
      // For relative paths
      buffer = await fs.readFile(src)
    }

    const { base64 } = await getPlaiceholder(buffer, { size: 10 })
    
    // Cache the result
    blurCache.set(src, base64)
    
    return base64
  } catch (error) {
    console.error(`Failed to generate blur placeholder for ${src}:`, error)
    // Return a default tiny transparent image as fallback
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
  }
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(src: string, sizes: number[] = [640, 750, 828, 1080, 1200, 1920]): string {
  if (src.startsWith('http')) {
    // For external images, we can't generate srcset
    return ''
  }
  
  return sizes
    .map(size => `${src}?w=${size} ${size}w`)
    .join(', ')
}

/**
 * Get optimized image props for Next.js Image component
 */
export interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
}

export async function getOptimizedImageProps(props: OptimizedImageProps) {
  const {
    src,
    alt,
    width,
    height,
    priority = false,
    className = '',
    sizes = '100vw',
    quality = 75
  } = props

  // Generate blur placeholder
  const blurDataURL = await getBlurDataURL(src)

  return {
    src,
    alt,
    width,
    height,
    className,
    sizes,
    quality,
    priority,
    loading: priority ? undefined : ('lazy' as const),
    placeholder: 'blur' as const,
    blurDataURL,
  }
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, as: 'image' = 'image') {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = as
    link.href = src
    document.head.appendChild(link)
  }
}

/**
 * Image optimization configuration for different use cases
 */
export const imageConfigs = {
  hero: {
    sizes: '100vw',
    quality: 90,
    priority: true,
  },
  thumbnail: {
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    quality: 75,
    priority: false,
  },
  card: {
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
    quality: 75,
    priority: false,
  },
  logo: {
    sizes: '200px',
    quality: 90,
    priority: false,
  },
  avatar: {
    sizes: '100px',
    quality: 85,
    priority: false,
  },
  fullWidth: {
    sizes: '100vw',
    quality: 80,
    priority: false,
  }
}