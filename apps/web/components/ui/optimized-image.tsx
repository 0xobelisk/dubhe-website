'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useEffect } from 'react'
import { cn } from '@workspace/ui/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  fallbackSrc?: string
  aspectRatio?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  lazy?: boolean
  fadeIn?: boolean
}

// Default blur placeholder
const DEFAULT_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

export function OptimizedImage({
  src,
  alt,
  className,
  fallbackSrc = '/logo/light.png',
  aspectRatio,
  objectFit = 'cover',
  lazy = true,
  fadeIn = true,
  priority = false,
  sizes = '100vw',
  quality = 75,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [isInView, setIsInView] = useState(!lazy)

  // Handle image errors
  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
    }
  }

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    )

    const element = document.querySelector(`[data-img-src="${src}"]`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [src, lazy])

  // Generate responsive sizes string
  const responsiveSizes = sizes || `
    (max-width: 640px) 100vw,
    (max-width: 1024px) 75vw,
    (max-width: 1536px) 50vw,
    33vw
  `.trim()

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        aspectRatio && `aspect-[${aspectRatio}]`,
        className
      )}
      data-img-src={src}
    >
      {isInView && (
        <Image
          {...props}
          src={imgSrc}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            fadeIn && isLoading && 'opacity-0',
            fadeIn && !isLoading && 'opacity-100',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'fill' && 'object-fill',
            objectFit === 'none' && 'object-none',
            objectFit === 'scale-down' && 'object-scale-down'
          )}
          sizes={responsiveSizes}
          quality={quality}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
        />
      )}
      
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}
    </div>
  )
}

// Preload component for critical images
export function PreloadImage({ src }: { src: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    }
  }, [src])
  
  return null
}