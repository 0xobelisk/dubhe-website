import {
  addBreadcrumb as sdkAddBreadcrumb,
  captureException as sdkCaptureException,
} from '@sentry/nextjs'

export function captureException(...args: Parameters<typeof sdkCaptureException>) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return sdkCaptureException(...args)
  }
}

export function addBreadcrumb(...args: Parameters<typeof sdkAddBreadcrumb>) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return sdkAddBreadcrumb(...args)
  }
}
