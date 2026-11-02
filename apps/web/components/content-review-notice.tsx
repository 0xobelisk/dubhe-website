"use client"

import { useTranslations } from "next-intl"

export default function ContentReviewNotice({
  kind,
  className = "",
}: {
  kind: "pending" | "people" | "rules" | "demo" | "metrics"
  className?: string
}) {
  const t = useTranslations("contentReview")

  return (
    <p role="note" className={`my-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-amber-600 ${className}`}>
      {t(kind)}
    </p>
  )
}
