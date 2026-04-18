"use client"

import { useLanguage } from "@/lib/language-context"
import { AlertCircle, MapPinOff, Wallet, Clock } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { useScrollAnimation, animationVariants } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function Problem() {
  const { t } = useLanguage()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation<HTMLDivElement>()

  const problems = [
    {
      icon: AlertCircle,
      title: t("problem.item1.title"),
      description: t("problem.item1.desc"),
    },
    {
      icon: MapPinOff,
      title: t("problem.item2.title"),
      description: t("problem.item2.desc"),
    },
    {
      icon: Wallet,
      title: t("problem.item3.title"),
      description: t("problem.item3.desc"),
    },
    {
      icon: Clock,
      title: t("problem.item4.title"),
      description: t("problem.item4.desc"),
    },
  ]

  return (
    <section className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("problem.label")}
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("problem.headline")}
          </h2>
        </AnimatedSection>

        {/* Problem cards */}
        <div ref={cardsRef} className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={cn(
                "group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-250 ease-out hover:-translate-y-0.5 hover:border-destructive/20 hover:shadow-md hover:shadow-destructive/5 scroll-hidden",
                cardsVisible && animationVariants.fadeUp
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10 transition-colors duration-200 group-hover:bg-destructive/15">
                  <problem.icon className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {problem.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
