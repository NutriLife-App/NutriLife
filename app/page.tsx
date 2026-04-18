import { LanguageProvider } from "@/lib/language-context"
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

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
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
    </LanguageProvider>
  )
}
