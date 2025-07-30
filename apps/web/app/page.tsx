import Hero from "@/components/hero"
import Features from "@/components/features"
import TechStack from "@/components/tech-stack"
import NetworkArchitecture from "@/components/network-architecture"
import Showcase from "@/components/showcase"
import Investors from "@/components/investors"
import GetStarted from "@/components/get-started"


export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <TechStack />
      <NetworkArchitecture />
      <Showcase />
      <Investors />
      <GetStarted />
    </main>
  )
}
