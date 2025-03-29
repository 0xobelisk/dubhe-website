import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Showcase from "@/components/showcase"
import GetStarted from "@/components/get-started"


export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <Showcase />
      <GetStarted />
    </main>
  )
}
