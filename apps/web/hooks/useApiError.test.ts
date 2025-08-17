import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useApiError } from './useApiError'

describe('useApiError Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('initializes with no error', () => {
    const { result } = renderHook(() => useApiError())

    expect(result.current.error).toBeNull()
    expect(result.current.isError).toBe(false)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.retryCount).toBe(0)
  })

  it('handles error correctly', () => {
    const { result } = renderHook(() => useApiError())
    const testError = { message: 'API Error', status: 500 }

    act(() => {
      result.current.setError(testError)
    })

    expect(result.current.error).toEqual(testError)
    expect(result.current.isError).toBe(true)
    expect(result.current.isLoading).toBe(false)
  })

  it('clears error when clearError is called', () => {
    const { result } = renderHook(() => useApiError())
    const testError = { message: 'API Error', status: 500 }

    // Set error first
    act(() => {
      result.current.setError(testError)
    })

    expect(result.current.error).toEqual(testError)

    // Clear error
    act(() => {
      result.current.clearError()
    })

    expect(result.current.error).toBeNull()
    expect(result.current.isError).toBe(false)
    expect(result.current.retryCount).toBe(0)
  })

  it('sets loading state correctly', () => {
    const { result } = renderHook(() => useApiError())

    act(() => {
      result.current.setLoading(true)
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBeNull()
    expect(result.current.isError).toBe(false)

    act(() => {
      result.current.setLoading(false)
    })

    expect(result.current.isLoading).toBe(false)
  })

  it('executes operation successfully', async () => {
    const { result } = renderHook(() => useApiError())
    
    const successOperation = vi.fn().mockResolvedValue('Success')

    let operationResult: string | undefined

    await act(async () => {
      operationResult = await result.current.executeWithRetry(successOperation)
    })

    expect(operationResult).toBe('Success')
    expect(successOperation).toHaveBeenCalledTimes(1)
    expect(result.current.error).toBeNull()
    expect(result.current.isError).toBe(false)
    expect(result.current.isLoading).toBe(false)
  })

  it('executes operation with retry on failure', async () => {
    const { result } = renderHook(() => useApiError())
    
    // Create errors that are retryable (server errors)
    const failingOperation = vi.fn()
      .mockRejectedValueOnce({ message: 'Network error', status: 500 })
      .mockRejectedValueOnce({ message: 'Server error', status: 503 })
      .mockResolvedValueOnce('Success')

    const operationResult = await result.current.executeWithRetry(failingOperation)

    expect(operationResult).toBe('Success')
    expect(failingOperation).toHaveBeenCalledTimes(3)
  })

  it('stops retrying after max attempts', async () => {
    const { result } = renderHook(() => useApiError({ maxRetries: 2 }))
    
    // Use retryable server error
    const failingOperation = vi.fn()
      .mockRejectedValue({ message: 'Server error', status: 500 })

    let thrownError: any = null

    try {
      await result.current.executeWithRetry(failingOperation)
    } catch (error) {
      thrownError = error
    }

    expect(thrownError).toBeDefined()
    expect(thrownError.message).toBe('Server error')
    expect(failingOperation).toHaveBeenCalledTimes(3) // Initial + 2 retries
    
    // Wait for state update
    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })
  })

  it('tracks retry count correctly', async () => {
    const { result } = renderHook(() => useApiError())
    
    // Use retryable server error for first attempt
    const failingOperation = vi.fn()
      .mockRejectedValueOnce({ message: 'Server error', status: 500 })
      .mockResolvedValueOnce('Success')

    await result.current.executeWithRetry(failingOperation)

    expect(result.current.retryCount).toBe(1)
  })

  it('calls onError callback when error occurs', () => {
    const onError = vi.fn()
    const { result } = renderHook(() => useApiError({ onError }))
    const testError = { message: 'API Error', status: 500 }

    act(() => {
      result.current.setError(testError)
    })

    expect(onError).toHaveBeenCalledWith(testError)
  })

  it('indicates if can retry', () => {
    const { result } = renderHook(() => useApiError({ maxRetries: 2 }))

    expect(result.current.canRetry).toBe(true)

    // Simulate some retries
    act(() => {
      result.current.setError({ message: 'Error' })
    })

    expect(result.current.canRetry).toBe(true)
  })
})