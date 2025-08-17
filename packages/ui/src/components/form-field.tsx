import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Input } from "./input"
import { Textarea } from "./textarea"

interface FormFieldProps {
  label?: string
  error?: string
  required?: boolean
  className?: string
  children?: React.ReactNode
}

export function FormField({ 
  label, 
  error, 
  required, 
  className, 
  children 
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

interface TextFieldProps extends React.ComponentProps<typeof Input> {
  label?: string
  error?: string
  required?: boolean
  containerClassName?: string
}

export function TextField({ 
  label, 
  error, 
  required, 
  containerClassName,
  className,
  ...props 
}: TextFieldProps) {
  return (
    <FormField 
      label={label} 
      error={error} 
      required={required}
      className={containerClassName}
    >
      <Input 
        className={cn(error && "border-destructive", className)}
        aria-invalid={!!error}
        {...props} 
      />
    </FormField>
  )
}

interface TextareaFieldProps extends React.ComponentProps<typeof Textarea> {
  label?: string
  error?: string
  required?: boolean
  containerClassName?: string
}

export function TextareaField({ 
  label, 
  error, 
  required, 
  containerClassName,
  className,
  ...props 
}: TextareaFieldProps) {
  return (
    <FormField 
      label={label} 
      error={error} 
      required={required}
      className={containerClassName}
    >
      <Textarea 
        className={cn(error && "border-destructive", className)}
        aria-invalid={!!error}
        {...props} 
      />
    </FormField>
  )
}