import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import {
  ArrowRight,
  Activity,
  Bell,
  Building2,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  Layers3,
  MonitorSmartphone,
  Route,
  Shield,
  Wallet,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react"

const differentiatorConfigs: Array<{ index: number; icon: LucideIcon }> = [
  { index: 0, icon: Shield },
  { index: 1, icon: Workflow },
  { index: 2, icon: Building2 },
]

const audienceConfigs: Array<{ index: number; icon: LucideIcon }> = [
  { index: 0, icon: Layers3 },
  { index: 1, icon: Activity },
  { index: 2, icon: Building2 },
]

type WalletPageProps = {
  params: Promise<{ locale: string }>
}

export default async function WalletPage({ params }: WalletPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "wallet" })

  const differentiators = differentiatorConfigs.map(({ index, icon }) => ({
    icon,
    title: t(`hero.differentiators.${index}.title`),
    description: t(`hero.differentiators.${index}.description`),
  }))

  const capabilityGroups = [0, 1, 2].map((index) => ({
    eyebrow: t(`capabilities.groups.${index}.eyebrow`),
    title: t(`capabilities.groups.${index}.title`),
    items: [0, 1, 2].map((itemIndex) => t(`capabilities.groups.${index}.items.${itemIndex}`)),
  }))

  const audienceCards = audienceConfigs.map(({ index, icon }) => ({
    icon,
    title: t(`audience.cards.${index}.title`),
    description: t(`audience.cards.${index}.description`),
  }))

  const platformStatus = [0, 1, 2].map((index) => ({
    title: t(`platform.cards.${index}.title`),
    status: t(`platform.cards.${index}.status`),
    detail: t(`platform.cards.${index}.detail`),
  }))

  const faqs = [0, 1, 2, 3].map((index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
  }))

  const securityCards = [
    { icon: KeyRound, title: t("security.cards.0.title"), description: t("security.cards.0.description") },
    { icon: Route, title: t("security.cards.1.title"), description: t("security.cards.1.description") },
    { icon: Bell, title: t("security.cards.2.title"), description: t("security.cards.2.description") },
    { icon: Wrench, title: t("security.cards.3.title"), description: t("security.cards.3.description") },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800 pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_28%),radial-gradient(circle_at_left,_rgba(59,130,246,0.16),_transparent_32%),linear-gradient(to_bottom,_rgba(15,23,42,0.35),rgba(2,6,23,0.9))]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
              <Wallet className="h-4 w-4" />
              {t("hero.badge")}
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {t("hero.description")}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="https://wallet.dubhe.obelisk.build"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                {t("hero.primaryCta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="https://github.com/0xobelisk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
              >
                {t("hero.secondaryCta")}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.65)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {t("hero.positioningEyebrow")}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              {t("hero.positioningTitle")}
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-300">
              {t("hero.positioningDescription")}
            </p>
            <div className="mt-8 space-y-4">
              {differentiators.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            {t("why.eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            {t("why.title")}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            {t("why.description")}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {capabilityGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                {group.eyebrow}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">{group.title}</h3>
              <div className="mt-6 space-y-4">
                {group.items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                    <p className="text-sm leading-7 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              {t("audience.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              {t("audience.title")}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              {t("audience.description")}
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {audienceCards.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              {t("security.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              {t("security.title")}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              {t("security.description")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {securityCards.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {t("platform.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              {t("platform.title")}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              {t("platform.description")}
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {platformStatus.map(({ title, status, detail }) => (
              <div
                key={title}
                className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-300">
                    {status}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">{detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                <MonitorSmartphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{t("platform.callout.title")}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {t("platform.callout.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              {t("faq.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              {t("faq.title")}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              {t("faq.description")}
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map(({ question, answer }) => (
              <div
                key={question}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6"
              >
                <h3 className="text-lg font-semibold text-white">{question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="rounded-[2rem] border border-slate-800 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  {t("finalCta.eyebrow")}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  {t("finalCta.title")}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  {t("finalCta.description")}
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                <Link
                  href="https://wallet.dubhe.obelisk.build"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  {t("finalCta.primaryCta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="https://github.com/0xobelisk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
                >
                  {t("finalCta.secondaryCta")}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
