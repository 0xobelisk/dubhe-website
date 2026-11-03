import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { act, render, screen, within } from '../test-utils'
import ChannelPage from '../app/[locale]/channel/page'
import IncubationPage from '../app/[locale]/incubation/page'
import ProposalPage from '../app/[locale]/proposal/page'
import GrantsPage from '../app/[locale]/grants/page'
import LabsPage from '../app/[locale]/labs/page'
import ModeratorsPage from '../app/[locale]/moderators/page'
import TokenPage from '../app/[locale]/token/page'
import AmbassadorPage from '../app/[locale]/ambassador/page'
import OSPage from '../app/[locale]/os/page'
import TeamPage from '../app/[locale]/team/page'
import EnginePage from '../app/[locale]/engine/page'
import WalletPage from '../app/[locale]/wallet/page'
import EventsPage from '../app/[locale]/events/page'
import FoundationPage from '../app/[locale]/foundation/page'
import PortalPage from '../app/[locale]/portal/page'
import TermsPage from '../app/[locale]/terms/page'
import PrivacyPage from '../app/[locale]/privacy/page'
import InvestorPage from '../app/[locale]/investor/page'
import Ecosystem from '../components/ecosystem'
import NetworkStats from '../components/network-stats'
import ProductSuiteSection from '../components/home/ProductSuiteSection'
import Page from '../app/[locale]/page'
import LanguageSelector from '../components/LanguageSelector'
import CosmicLoader from '../components/cosmic-loader'
import StarCanvas from '../components/hero/StarCanvas'
import type { MotionValue } from 'framer-motion'
import type { Metadata } from 'next'

const nextRouter = vi.hoisted(() => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), refresh: vi.fn() }))

vi.mock('next/navigation', () => ({
  useRouter: () => nextRouter,
  usePathname: () => '/en/wallet',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({ locale: 'en' }),
  redirect: vi.fn(),
  permanentRedirect: vi.fn(),
  notFound: vi.fn(),
}))
vi.mock('next/navigation.js', () => ({
  useRouter: () => nextRouter,
  usePathname: () => '/en/wallet',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({ locale: 'en' }),
  redirect: vi.fn(),
  permanentRedirect: vi.fn(),
  notFound: vi.fn(),
}))

// Keep real page content, links and state. Animation timing and image loading
// are browser integrations, so render their semantic DOM without those effects.
vi.mock('framer-motion', async () => {
  const React = await import('react')
  const components = new Map<string, React.ComponentType>()
  const animationProps = new Set([
    'initial', 'animate', 'exit', 'transition', 'variants', 'whileHover',
    'whileTap', 'whileInView', 'viewport', 'layout', 'layoutId', 'drag',
  ])
  return {
    get m() { return this.motion },
    LazyMotion: ({ children }: React.PropsWithChildren) => children,
    domAnimation: {},
    motion: new Proxy({}, {
      get: (_target, tag: string) => {
        if (!components.has(tag)) {
          components.set(tag, React.forwardRef(function MotionAdapter(props: Record<string, unknown>, ref) {
            const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !animationProps.has(key)))
            return React.createElement(tag, { ...domProps, ref })
          }))
        }
        return components.get(tag)
      },
    }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useInView: () => true,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn(), set: vi.fn() }),
  }
})

vi.mock('next/image', () => ({
  default: ({ fill: _fill, priority: _priority, quality: _quality, placeholder: _placeholder, blurDataURL: _blur, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & Record<string, unknown>) => <img {...props} />,
}))

// The server translation boundary uses the same real English catalog as the
// client provider. It does not need a running Next request to render Wallet.
vi.mock('next-intl/server', async () => {
  const { createTranslator } = await import('next-intl')
  const { default: messages } = await import('../messages/en.json')
  return {
    getTranslations: async ({ locale, namespace }: { locale: string; namespace: string }) => createTranslator({ locale, namespace, messages }),
  }
})

const params = Promise.resolve({ locale: 'en' })
const rulesNotice = 'Historical page rules; current validity awaits confirmation. These are not confirmed funding offers or payment records.'

let restoreSpies: Array<() => void> = []
function trackSpy<T extends { mockRestore: () => void }>(spy: T): T {
  restoreSpies.push(() => spy.mockRestore())
  return spy
}

afterEach(() => {
  vi.useRealTimers()
  restoreSpies.reverse().forEach(restore => restore())
  restoreSpies = []
  vi.unstubAllGlobals()
})

function expectExternalLink(link: HTMLElement, href: string) {
  expect(link).toHaveAttribute('href', href)
  expect(link).toHaveAttribute('target', '_blank')
  expect(link.getAttribute('rel')?.split(/\s+/)).toContain('noopener')
  expect(link.getAttribute('rel')?.split(/\s+/)).toContain('noreferrer')
}

describe('public product routes', () => {
  it.each([
    ['Channel', <ChannelPage key="ChannelPage" />, /Real-Time P2P\s*Interaction Layer/, 'Join Network'],
    ['Engine', <EnginePage key="EnginePage" />, /Dubhe\s*Auto-Generation/, 'Start Building'],
    ['OS', <OSPage key="OSPage" />, /Cross-Chain\s*Move Ecosystem/, 'Join Ecosystem'],
  ])('%s explains the product and leads developers to technical documentation', (_name, page, heading, primaryCta) => {
    render(page as React.ReactElement)
    expect(screen.getByRole('heading', { level: 1, name: heading as RegExp })).toBeVisible()
    for (const link of screen.getAllByRole('link', { name: primaryCta as string })) {
      expectExternalLink(link, 'https://dubhe.mintlify.app')
    }
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(1)
  })

  it('Wallet explains permission, execution and recovery capabilities with real product destinations', async () => {
    render(await WalletPage({ params }))
    expect(screen.getByRole('heading', { level: 1, name: 'A production wallet for Move apps and high-value execution' })).toBeVisible()
    for (const title of ['Control Surface', 'Execution Surface', 'Operations Surface']) {
      expect(screen.getByRole('heading', { name: title })).toBeVisible()
    }
    for (const link of screen.getAllByRole('link', { name: /Get started/ })) {
      expectExternalLink(link, 'https://wallet.dubhe.obelisk.build')
    }
    expectExternalLink(screen.getByRole('link', { name: 'Follow product progress' }), 'https://github.com/0xobelisk')
    expect(screen.getByText('Hardware / OWS signing paths')).toBeInTheDocument()
  })

  it('Labs identifies the independent labs and links to each published project', () => {
    const { container } = render(<LabsPage />)
    expect(screen.getByRole('heading', { level: 1, name: /Collaborative\s*Innovation Labs/ })).toBeVisible()
    for (const href of ['https://dubheos.org', 'https://obelisk.build', 'https://cyferio.com', 'https://numeron.obelisk.build']) {
      const link = container.querySelector(`a[href="${href}"]`)
      expect(link).not.toBeNull()
      expectExternalLink(link as HTMLElement, href)
    }
    expect(screen.getByRole('link', { name: 'Explore Labs' })).toHaveAttribute('href', '/contact')
  })
})

describe('historical program and community contracts', () => {
  it.each([
    ['Incubation', <IncubationPage key="incubation" />, /Build the Next Unicorn Startup/, 'Apply Now'],
    ['Grants', <GrantsPage key="grants" params={params} />, /Fund Your Innovation/, 'Apply for Grant'],
  ])('%s discloses unconfirmed funding rules and routes applications through contact', (_name, page, heading, primaryCta) => {
    render(page as React.ReactElement)
    expect(screen.getByRole('heading', { level: 1, name: heading as RegExp })).toBeVisible()
    expect(screen.getByRole('note')).toHaveTextContent(rulesNotice)
    expect(screen.getAllByText('Coming Soon').length).toBeGreaterThanOrEqual(3)
    expect(screen.getByRole('link', { name: primaryCta as string })).toHaveAttribute('href', '/contact')
  })

  it('Grants labels Numeron as external playtesting, without implying verified grant payments', () => {
    render(<GrantsPage params={params} />)
    expect(screen.getByText('Numeron')).toBeVisible()
    expect(screen.getByText('External players invited to playtest')).toBeVisible()
    expect(screen.getAllByText('Awaiting confirmation').length).toBeGreaterThan(0)
    expect(screen.getByRole('note')).toHaveTextContent('not confirmed funding offers or payment records')
  })

  it('Proposal links specifically to the devnet explorer and referenda and labels its examples', () => {
    render(<ProposalPage />)
    const base = 'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fdubheos-node-devnet-wss.obelisk.build%2Fwss'
    expect(screen.getByRole('heading', { level: 1, name: /Shape the Future\s*Together/ })).toBeVisible()
    expectExternalLink(screen.getByRole('link', { name: 'DubheOS Devnet' }), `${base}#/explorer`)
    expectExternalLink(screen.getByRole('link', { name: 'View All Referenda' }), `${base}#/referenda`)
    expect(screen.getAllByRole('note').some(note => note.textContent?.includes('Interface example'))).toBe(true)
    expect(screen.getAllByRole('note').some(note => note.textContent === rulesNotice)).toBe(true)
  })

  it.each([
    ['Ambassador', <AmbassadorPage key="AmbassadorPage" />, /Become a\s*Dubhe Ambassador/, 'Apply Now', 'https://docs.google.com/forms/d/e/1FAIpQLSeDcEdrHgI-ATQWQ7_h1XdGXPaJYL5VWsnmUnMfHc3XRiaXvA/viewform', '#responsibilities'],
    ['Moderators', <ModeratorsPage key="ModeratorsPage" />, /Community\s*Moderators/, 'Apply to Moderate', 'https://docs.google.com/forms/d/e/1FAIpQLSei3iIf7wGYxlhPL0jeQ2dlYx0l4_GEMzaBicVBcKNX8G2DaA/viewform?usp=header', '#guidelines'],
  ])('%s retains the official application and in-page program information', (_name, page, heading, cta, application, anchor) => {
    const { container } = render(page as React.ReactElement)
    expect(screen.getByRole('heading', { level: 1, name: heading as RegExp })).toBeVisible()
    for (const link of screen.getAllByRole('link', { name: cta as string })) {
      expectExternalLink(link, application as string)
    }
    expect(container.querySelector(`a[href="${anchor}"]`)).not.toBeNull()
    expect(container.querySelector(anchor as string)).not.toBeNull()
    expect(screen.getByRole('note')).toHaveTextContent(rulesNotice)
  })

  it('Team keeps named members while clearly withholding unverified roles', () => {
    render(<TeamPage params={params} />)
    expect(screen.getByRole('heading', { level: 1, name: /Meet the Dubhe Foundation Team/ })).toBeVisible()
    expect(screen.getByRole('note')).toHaveTextContent('Names and current roles are being checked.')
    for (const name of ['Jason', 'Joan', 'David', 'Bonnie', 'Liam McKenzie', 'Emily Smith']) {
      expect(screen.getByRole('heading', { name })).toBeVisible()
    }
    expect(screen.getAllByText('Awaiting confirmation').length).toBeGreaterThanOrEqual(6)
    expect(screen.getByRole('link', { name: 'Join the Team' })).toHaveAttribute('href', '/contact')
  })

  it('Token describes proposed utilities and explicitly withholds allocation and availability claims', () => {
    render(<TokenPage key="TokenPage" />)
    expect(screen.getByRole('heading', { level: 1, name: /DUBHE & STARS\s*Token Ecosystem/ })).toBeVisible()
    expect(screen.getByRole('note')).toHaveTextContent(rulesNotice)
    expect(screen.getByText('Proposed DUBHE utility — current availability awaits confirmation')).toBeVisible()
    expect(screen.getByText('Proposed STARS utility — current availability awaits confirmation')).toBeVisible()
    expect(screen.getByText('Historical allocation categories — quantities and current validity await confirmation')).toBeVisible()
    expect(screen.getAllByText('Awaiting confirmation').length).toBeGreaterThan(1)
  })

  it('Foundation provides the mission and routes team inquiries to contact', () => {
    render(<FoundationPage />)
    expect(screen.getByRole('heading', { level: 1, name: 'Supporting the growth of the Dubhe Ecosystem' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Join the team' })).toHaveAttribute('href', '/contact')
    for (const title of ['Developer Support', 'Ecosystem Growth', 'Decentralization']) {
      expect(screen.getByRole('heading', { name: title })).toBeVisible()
    }
  })

  it('Portal labels sample addresses, schedule and balances as examples', () => {
    render(<PortalPage />)
    expect(screen.getByRole('heading', { level: 1, name: 'Foundation Portal' })).toBeVisible()
    expect(screen.getAllByRole('note').some(note => note.textContent?.includes('not a verified account or payment record'))).toBe(true)
    expect(screen.getByText('Example destination address (not a confirmed payout):')).toBeVisible()
    expect(screen.getByText('Example schedule — current rules awaiting confirmation')).toBeVisible()
    expect(screen.getAllByText('— DUBHE').length).toBeGreaterThan(1)
    expect(screen.getByText('Completed')).toBeVisible()
    expect(screen.getAllByText('Ongoing')).toHaveLength(3)
    expect(screen.getAllByText('Pending')).toHaveLength(56)
  })
})

describe('events and public information', () => {
  it('filters event names, locations and categories and recovers from an empty result', async () => {
    const user = userEvent.setup()
    render(<EventsPage />)
    expect(screen.getByRole('heading', { level: 1, name: 'Upcoming events' })).toBeVisible()
    const search = screen.getByPlaceholderText('Search')
    const category = screen.getAllByRole('combobox')[0]
    expect(screen.getByText('Dubhe Engine Developer Workshop')).toBeVisible()
    await user.selectOptions(category, 'workshop')
    expect(screen.getByText('Zero-Knowledge Privacy Solutions Workshop')).toBeVisible()
    expect(screen.queryByText('Move Ecosystem AMA with Dubhe Foundation')).not.toBeInTheDocument()
    await user.type(search, 'zero-knowledge')
    expect(screen.queryByText('Dubhe Engine Developer Workshop')).not.toBeInTheDocument()
    await user.clear(search)
    await user.selectOptions(category, 'all')
    await user.type(search, 'san francisco')
    expect(screen.getByText('Dubhe Community Meetup - San Francisco')).toBeVisible()
    expect(screen.queryByText('Zero-Knowledge Privacy Solutions Workshop')).not.toBeInTheDocument()
    await user.clear(search)
    await user.type(search, 'no such event')
    expect(screen.getByText('No events found matching your criteria.')).toBeVisible()
    await user.clear(search)
    expect(screen.getByText('Move Ecosystem AMA with Dubhe Foundation')).toBeVisible()
  })

  it.each([
    ['Terms', <TermsPage key="TermsPage" />, /Terms of\s*Service/, ['Acceptance of Terms', 'Use of Services', 'Intellectual Property']],
    ['Privacy', <PrivacyPage key="PrivacyPage" />, /Your Privacy\s*Matters/, ['Information We Collect', 'How We Use Information', 'Data Protection']],
  ])('%s exposes policy sections and a contact route', (_name, page, heading, sections) => {
    const { container } = render(page as React.ReactElement)
    expect(screen.getByRole('heading', { level: 1, name: heading as RegExp })).toBeVisible()
    for (const title of sections as string[]) {
      expect(screen.getByRole('heading', { name: title })).toBeVisible()
    }
    expect(container.querySelector('a[href^="mailto:"]')).not.toBeNull()
  })
})

describe('real home and investor sections', () => {
  it('renders the real home content as soon as the route is ready, with no decorative loader delay', async () => {
    render(<Page />)
    expect(await screen.findByRole('heading', { level: 1, name: /We make the Dubhe\.\s*You make it Move\./ })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Get Dubhe Stack' })).toHaveAttribute('href', 'https://github.com/0xobelisk/dubhe')
    expect(await screen.findByText('External players invited to playtest')).toBeVisible()
    expect(await screen.findByRole('heading', { name: 'The Complete Move Development Stack' })).toBeVisible()
  })

  it('Ecosystem preserves Numeron development and external-playtest context without presenting internal recharge tests as revenue', () => {
    render(<Ecosystem />)
    const title = screen.getByRole('heading', { name: 'Numeron' })
    const card = title.closest('a')
    expect(card).not.toBeNull()
    expect(card).toHaveAttribute('href', 'https://numeron.obelisk.build')
    expect(within(card as HTMLElement).getByText('External players invited to playtest')).toBeVisible()
    expect(within(card as HTMLElement).getByText('Development began in May 2026.')).toBeVisible()
    expect(within(card as HTMLElement).getByText(/internal recharge tests do not represent revenue/)).toBeVisible()
    expect(within(card as HTMLElement).getByText(/different 2025 hackathon game/)).toBeVisible()
  })

  it('Network statistics withhold unsourced values', () => {
    render(<NetworkStats />)
    expect(screen.getAllByText('—')).toHaveLength(4)
    expect(screen.getByText(/Figures withheld pending verifiable sources/)).toBeVisible()
  })

  it('the home product suite includes the three distinct infrastructure products', () => {
    render(<ProductSuiteSection />)
    for (const title of ['Dubhe Engine', 'Dubhe Channel', 'Dubhe OS']) {
      expect(screen.getByRole('heading', { name: title })).toBeVisible()
    }
    expect(screen.getByText('Schema Definition')).toBeVisible()
    const engineCard = screen.getByRole('heading', { name: 'Dubhe Engine' }).parentElement
    expect(within(engineCard as HTMLElement).getByText('Code Generation')).toBeVisible()
  })

  it('the full investor page preserves verification notices and traceable contact destinations', async () => {
    const user = userEvent.setup()
    const { container } = render(<InvestorPage />)
    expect(screen.getByText('Verified production metrics are not yet published.')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Metrics Review' }))
    expect(screen.getByText(/Revenue and product-market fit claims await verifiable sources/)).toBeVisible()
    expect(screen.getByText('External players have been invited to playtest Numeron')).toBeVisible()
    expect(screen.getByRole('note')).toHaveTextContent('Names and current roles are being checked.')
    expect(container.querySelector('a[href^="mailto:"]')).not.toBeNull()
    expect(screen.getAllByRole('button', { name: /Dubhe (Engine|Channel|OS)/ }).length).toBeGreaterThanOrEqual(3)
    await user.click(screen.getByRole('button', { name: /Dubhe Channel/ }))
    expect(screen.getByText('Real-time programmable P2P interaction layer that makes blockchain feel like Web2')).toBeVisible()
    await user.click(screen.getByRole('button', { name: /Dubhe OS/ }))
    expect(screen.getByText('Blockchain operating system with native cross-chain support and developer incentive mechanisms')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Tech Adoption' }))
    expect(screen.getAllByText('Awaiting confirmation').length).toBeGreaterThan(1)
    await user.click(screen.getByRole('button', { name: 'Community', exact: true }))
    expect(screen.getByText(/Quantitative community claims await verification/)).toBeVisible()
  })
})

describe('browser-facing community components', () => {
  it('filters supported languages by native name and preserves the current product route when switching', async () => {
    nextRouter.replace.mockClear()
    const user = userEvent.setup()
    render(<LanguageSelector />)
    const toggle = screen.getByRole('button')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(screen.getByText('Filter list (16 languages)')).toBeVisible()
    await user.type(screen.getByPlaceholderText('Type to filter'), '日本語')
    expect(screen.getByText('Filter list (1 languages)')).toBeVisible()
    expect(screen.queryByRole('button', { name: /English/ })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /日本語/ }))
    expect(nextRouter.replace).toHaveBeenCalledWith('/ja/wallet')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(screen.getByText('Filter list (16 languages)')).toBeVisible()
    await user.click(document.body)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('shows loading progress and constellation discovery, and clears its completion work on unmount', () => {
    vi.useFakeTimers()
    const complete = vi.fn()
    const { container, unmount } = render(<CosmicLoader duration={1000} onComplete={complete} />)
    expect(screen.getByText('Exploring the cosmos...')).toBeVisible()
    expect(screen.getByText('0%')).toBeVisible()
    act(() => { vi.advanceTimersByTime(700) })
    expect(screen.getByText('Big Dipper found...')).toBeVisible()
    expect(container.querySelectorAll('svg line')).toHaveLength(7)
    for (const name of ['Merak', 'Phecda', 'Megrez', 'Alioth', 'Mizar', 'Alkaid']) {
      expect(screen.getByText(name)).toBeVisible()
    }
    act(() => { vi.advanceTimersByTime(200) })
    expect(screen.getByText('Dubhe constellation locked!')).toBeVisible()
    act(() => { vi.advanceTimersByTime(1000) })
    expect(complete).toHaveBeenCalledTimes(1)
    unmount()
    act(() => { vi.advanceTimersByTime(5000) })
    expect(complete).toHaveBeenCalledTimes(1)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('does not call a loading completion handler after its owner unmounts', () => {
    vi.useFakeTimers()
    const complete = vi.fn()
    const { unmount } = render(<CosmicLoader duration={1000} onComplete={complete} />)
    unmount()
    act(() => { vi.advanceTimersByTime(2000) })
    expect(complete).not.toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('draws finite constellation geometry, resizes the canvas, and removes the resize listener', () => {
    trackSpy(vi.spyOn(Math, 'random')).mockReturnValue(0.5)
    const gradient = { addColorStop: vi.fn() }
    const context = {
      clearRect: vi.fn(), beginPath: vi.fn(), arc: vi.fn(), fill: vi.fn(),
      save: vi.fn(), restore: vi.fn(), translate: vi.fn(), moveTo: vi.fn(),
      lineTo: vi.fn(), stroke: vi.fn(), quadraticCurveTo: vi.fn(),
      createRadialGradient: vi.fn(() => gradient),
    }
    trackSpy(vi.spyOn(HTMLCanvasElement.prototype, 'getContext')).mockReturnValue(context as unknown as CanvasRenderingContext2D)
    const frames: FrameRequestCallback[] = []
    vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => frames.push(callback)))
    const removeListener = trackSpy(vi.spyOn(window, 'removeEventListener'))
    const { container, unmount } = render(<StarCanvas backgroundOpacity={1 as unknown as MotionValue<number>} />)
    const canvas = container.querySelector('canvas')!
    expect(canvas.width).toBe(window.innerWidth)
    expect(canvas.height).toBe(window.innerHeight)
    expect(context.clearRect).toHaveBeenCalledWith(0, 0, canvas.width, canvas.height)
    expect(context.quadraticCurveTo).toHaveBeenCalledTimes(7)
    expect(context.arc.mock.calls.every(args => args.every(Number.isFinite) && args[2] > 0)).toBe(true)
    vi.stubGlobal('innerWidth', 640)
    vi.stubGlobal('innerHeight', 480)
    act(() => { window.dispatchEvent(new Event('resize')); frames[0](16) })
    expect(canvas.width).toBe(640)
    expect(canvas.height).toBe(480)
    expect(context.clearRect).toHaveBeenLastCalledWith(0, 0, 640, 480)
    unmount()
    expect(removeListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('allows a missing canvas renderer without starting an animation loop', () => {
    trackSpy(vi.spyOn(HTMLCanvasElement.prototype, 'getContext')).mockReturnValue(null)
    const frame = vi.fn()
    vi.stubGlobal('requestAnimationFrame', frame)
    const { container } = render(<StarCanvas backgroundOpacity={1 as unknown as MotionValue<number>} />)
    expect(container.querySelector('canvas')).toBeInTheDocument()
    expect(frame).not.toHaveBeenCalled()
  })
})

type PublicLayout = {
  default: (props: { children: React.ReactNode; params: Promise<{ locale: string }> }) => React.ReactNode | Promise<React.ReactNode>
  metadata?: Metadata
  generateMetadata?: (props: { params: Promise<{ locale: string }> }) => Promise<Metadata>
}

const publicLayouts: Array<{ route: string; schemaType: string; load: () => Promise<PublicLayout> }> = [
  { route: 'ambassador', schemaType: 'ProfessionalService', load: () => import('../app/[locale]/ambassador/layout') },
  { route: 'channel', schemaType: 'SoftwareApplication', load: () => import('../app/[locale]/channel/layout') },
  { route: 'contact', schemaType: 'ContactPage', load: () => import('../app/[locale]/contact/layout') },
  { route: 'engine', schemaType: 'SoftwareApplication', load: () => import('../app/[locale]/engine/layout') },
  { route: 'events', schemaType: 'EventSeries', load: () => import('../app/[locale]/events/layout') },
  { route: 'foundation', schemaType: 'Organization', load: () => import('../app/[locale]/foundation/layout') },
  { route: 'grants', schemaType: 'FinancialProduct', load: () => import('../app/[locale]/grants/layout') },
  { route: 'incubation', schemaType: 'EducationalOrganization', load: () => import('../app/[locale]/incubation/layout') },
  { route: 'investor', schemaType: 'Organization', load: () => import('../app/[locale]/investor/layout') },
  { route: 'labs', schemaType: 'ResearchOrganization', load: () => import('../app/[locale]/labs/layout') },
  { route: 'moderators', schemaType: 'Organization', load: () => import('../app/[locale]/moderators/layout') },
  { route: 'os', schemaType: 'SoftwareApplication', load: () => import('../app/[locale]/os/layout') },
  { route: 'portal', schemaType: 'SoftwareApplication', load: () => import('../app/[locale]/portal/layout') },
  { route: 'privacy', schemaType: 'WebPage', load: () => import('../app/[locale]/privacy/layout') },
  { route: 'proposal', schemaType: 'GovernmentService', load: () => import('../app/[locale]/proposal/layout') },
  { route: 'terms', schemaType: 'WebPage', load: () => import('../app/[locale]/terms/layout') },
  { route: 'token', schemaType: 'FinancialProduct', load: () => import('../app/[locale]/token/layout') },
  { route: 'wallet', schemaType: 'SoftwareApplication', load: () => import('../app/[locale]/wallet/layout') },
]

describe('public route layout and search metadata contracts', () => {
  it.each(publicLayouts)('$route keeps its canonical URL, structured data, navigation and page content aligned', async ({ route, schemaType, load }) => {
    const routeModule = await load()
    const metadata = routeModule.generateMetadata ? await routeModule.generateMetadata({ params }) : routeModule.metadata!
    expect(metadata.alternates?.canonical).toBe(`/${route}`)
    expect(metadata.openGraph?.url).toBe(`/${route}`)

    const content = <h1>{`${route} product and community information`}</h1>
    const { container } = render(await routeModule.default({ children: content, params }))
    const main = screen.getByRole('main')
    expect(within(main).getByRole('heading', { level: 1, name: `${route} product and community information` })).toBeVisible()
    expect(within(screen.getByRole('navigation')).getByRole('button', { name: 'Build', exact: true })).toBeVisible()
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByRole('link', { name: /Privacy/i })).toHaveAttribute('href', '/en/privacy')
    expect(within(footer).getByRole('link', { name: /Terms/i })).toHaveAttribute('href', '/en/terms')

    const structured = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!)
    expect(structured['@context']).toBe('https://schema.org')
    expect(structured['@type']).toBe(schemaType)
    if (structured.url) {
      expect(new URL(structured.url).origin).toBe('https://dubhe.obelisk.build')
    }
    if (['grants', 'incubation', 'token'].includes(route)) {
      expect(metadata.description).toMatch(/await confirmation/)
      expect(metadata.openGraph?.description).toMatch(/await confirmation/)
      expect(structured.description).toMatch(/await confirmation/)
    }
    if (route === 'portal') {
      expect(metadata.description).toContain('sample data, not a verified account balance or payment record')
      expect(structured.description).toContain('sample data, not a verified account balance or payment record')
    }
  })
})
