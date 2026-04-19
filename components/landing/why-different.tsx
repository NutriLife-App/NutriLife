"use client"

import { useLanguage } from "@/lib/language-context"
import { MapPin, BrainCircuit, Coins, Settings2 } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { useScrollAnimation, animationVariants } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function WhyDifferent() {
  const { t } = useLanguage()
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>()

  const differentiators = [
    {
      icon: MapPin,
      title: t("different.item1.title"),
      description: t("different.item1.desc"),
    },
    {
      icon: BrainCircuit,
      title: t("different.item2.title"),
      description: t("different.item2.desc"),
    },
    {
      icon: Coins,
      title: t("different.item3.title"),
      description: t("different.item3.desc"),
    },
    {
      icon: Settings2,
      title: t("different.item4.title"),
      description: t("different.item4.desc"),
    },
  ]

  return (
    <section id="why-different" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("different.label")}
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("different.headline")}
          </h2>
        </AnimatedSection>

        {/* Bento grid */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-250 ease-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/8 scroll-hidden",
                  index === 0 || index === 3 ? "lg:col-span-2" : "",
                  gridVisible && animationVariants.scaleUp
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-200 group-hover:bg-primary/20">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{item.description}</p>
                </div>

                {/* Subtle hover glow */}
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary/8 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
