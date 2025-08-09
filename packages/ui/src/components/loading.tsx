import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

interface SpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8'
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingButtonProps extends React.ComponentProps<'button'> {
  loading?: boolean
  loadingText?: string
}

export function LoadingButton({ 
  children, 
  loading, 
  loadingText,
  disabled,
  className,
  ...props 
}: LoadingButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2",
        className
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {loading ? (loadingText || children) : children}
    </button>
  )
}

interface LoadingStateProps {
  loading: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}

export function LoadingState({ 
  loading, 
  children, 
  fallback,
  className 
}: LoadingStateProps) {
  if (loading) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        {fallback || (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Spinner size="sm" />
            <span>Loading...</span>
          </div>
        )}
      </div>
    )
  }

  return <>{children}</>
}