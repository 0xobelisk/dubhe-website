import Navigation from "@/components/navigation"
import InvestorHero from "@/components/investor/investor-hero"
import ProblemSolution from "@/components/investor/problem-solution"
import TractionMetrics from "@/components/investor/traction-metrics"
import ProductSuite from "@/components/investor/product-suite"
import EcosystemPartners from "@/components/investor/ecosystem-partners"
import InvestmentOpportunity from "@/components/investor/investment-opportunity"
import TeamExecution from "@/components/investor/team-execution"

export default function InvestorPage() {
  return (
    <>
      <Navigation />
      <main className="flex flex-col min-h-screen">
        <InvestorHero />
        <ProblemSolution />
        <TractionMetrics />
        <ProductSuite />
        <EcosystemPartners />
        <TeamExecution />
        <InvestmentOpportunity />
      </main>
    </>
  )
}