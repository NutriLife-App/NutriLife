"use client"

import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Problem } from "@/components/landing/problem"
import { Solution } from "@/components/landing/solution"
import { HowItWorks } from "@/components/landing/how-it-works"
import { ForWhom } from "@/components/landing/for-whom"
import { ProductPreview } from "@/components/landing/product-preview"
import { WhyDifferent } from "@/components/landing/why-different"
import { Partners } from "@/components/landing/partners"
import { Waitlist } from "@/components/landing/waitlist"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"

export function PageContent() {
  const { isTransitioning } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Header stays stable — not faded, only content below it fades */}
      <Header />

      {/* Content wrapper — fades subtly on language switch */}
      <div
        style={{
          opacity: isTransitioning ? 0 : 1,
          transition: "opacity 120ms ease-out",
        }}
      >
        <main>
          <Hero />
          <Problem />
          <Solution />
          <HowItWorks />
          <ForWhom />
          <ProductPreview />
          <WhyDifferent />
          <Partners />
          <Waitlist />
          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  )
}
