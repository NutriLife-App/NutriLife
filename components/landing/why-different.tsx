"use client"

import { useLanguage } from "@/lib/language-context"
import { MapPin, BrainCircuit, Coins, Settings2 } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { useScrollAnimation, animationVariants } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function WhyDifferent() {
  const { t } = useLanguage()
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>()
  const { ref: trustRef, isVisible: trustVisible } = useScrollAnimation<HTMLDivElement>()

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
                  "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 scroll-hidden",
                  index === 0 || index === 3 ? "lg:col-span-2" : "",
                  gridVisible && animationVariants.scaleUp
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </div>

                {/* Hover effect */}
                <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-primary/5 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div
          ref={trustRef}
          className={cn("mx-auto mt-16 max-w-4xl scroll-hidden", trustVisible && animationVariants.fadeUp)}
        >
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <p className="text-lg text-muted-foreground">{t("different.trust")}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
              {[
                { value: "100+", label: t("different.sources") },
                { value: "15+", label: t("different.experts") },
                { value: "5000+", label: t("different.products") },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
