import { expect, test } from '@playwright/test'

const criticalContent = [
  {
    path: '/en/engine',
    headline: /^Dubhe\s*Auto-Generation$/,
    description: 'Schema-based development platform that generates smart contracts, APIs, and UI components automatically. Focus on what matters - your unique business logic.',
  },
  {
    path: '/en/os',
    headline: /^Cross-Chain\s*Move Ecosystem$/,
    description: 'Unified ecosystem connecting Move-based blockchains with cross-chain governance, universal bridging, and shared security across the entire network.',
  },
  {
    path: '/en/channel',
    headline: /^Real-Time P2P\s*Interaction Layer$/,
    description: 'Multi-layered approach for optimal performance and scalability',
  },
  {
    path: '/en/contact',
    headline: /^Get in\s*Touch$/,
    description: "Have questions about Dubhe? Want to partner with us? We'd love to hear from you.",
  },
  {
    path: '/en/team',
    headline: /^Meet the\s*Dubhe Foundation Team$/,
    description: 'Our diverse, global team of engineers, researchers, and community builders is dedicated to advancing the Move ecosystem and empowering developers worldwide.',
  },
]

test.describe('Critical page content before hydration', () => {
  test.use({ javaScriptEnabled: false })

  test('renders the real English headline and body on five routes without client JavaScript', async ({ page }) => {
    for (const { path, headline, description } of criticalContent) {
      await test.step(path, async () => {
        const response = await page.goto(path, { waitUntil: 'domcontentloaded' })
        expect(response?.status(), path).toBe(200)

        const heading = page.getByRole('heading', { level: 1 })
        const body = heading.locator('..').getByText(description, { exact: true })
        await expect(heading).toHaveText(headline)

        for (const content of [heading, body]) {
          await expect(content).toBeVisible()
          const effectiveOpacity = await content.evaluate(element => {
            let opacity = 1
            for (let ancestor: Element | null = element; ancestor; ancestor = ancestor.parentElement) {
              opacity *= Number(getComputedStyle(ancestor).opacity)
            }
            return opacity
          })
          expect(effectiveOpacity, `${path} critical text must not be hidden before hydration`).toBe(1)
        }
      })
    }
  })
})
