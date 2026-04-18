"use client"

import { useLanguage } from "@/lib/language-context"
import { UserCircle, Wand2, Utensils } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { useScrollAnimation, animationVariants } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function HowItWorks() {
  const { t } = useLanguage()
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation<HTMLDivElement>()

  const steps = [
    {
      number: "01",
      icon: UserCircle,
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.desc"),
    },
    {
      number: "02",
      icon: Wand2,
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.desc"),
    },
    {
      number: "03",
      icon: Utensils,
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.desc"),
    },
  ]

  return (
    <section id="how-it-works" className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("howItWorks.label")}
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("howItWorks.headline")}
          </h2>
        </AnimatedSection>

        {/* Steps */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative">
            {/* Connection line - desktop */}
            <div className="absolute left-0 right-0 top-[60px] hidden h-0.5 bg-border lg:block" />

            <div ref={stepsRef} className="grid gap-8 lg:grid-cols-3 lg:gap-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={cn("relative scroll-hidden", stepsVisible && animationVariants.scaleUp)}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Number + Icon */}
                    <div className="relative z-10 mb-6">
                      <div className="group flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full border-2 border-primary/60 bg-card shadow-lg transition-all duration-250 ease-out hover:border-primary hover:shadow-[0_8px_32px_oklch(0.55_0.18_145_/_0.18)]">
                        <span className="text-2xl font-bold text-primary">{step.number}</span>
                        <step.icon className="mt-1 h-8 w-8 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
