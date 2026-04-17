"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Check, Building2, ArrowRight } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { useScrollAnimation, animationVariants } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function Partners() {
  const { t } = useLanguage()
  const { ref: visualRef, isVisible: visualVisible } = useScrollAnimation<HTMLDivElement>()

  const features = [
    t("partners.feature1"),
    t("partners.feature2"),
    t("partners.feature3"),
  ]

  return (
    <section id="partners" className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <AnimatedSection animation="fadeRight">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t("partners.label")}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("partners.headline")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t("partners.desc")}
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button asChild className="mt-8 gap-2" size="lg">
              <a href="mailto:yurii.korenets@gmail.com?subject=NutriLife%20Partnership">
                {t("partners.cta")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </AnimatedSection>

          {/* Visual */}
          <div
            ref={visualRef}
            className={cn("relative scroll-hidden", visualVisible && animationVariants.fadeLeft)}
          >
            <div className="relative mx-auto max-w-md">
              {/* Main card */}
              <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
                    <Building2 className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{t("partners.program")}</h3>
                    <p className="text-sm text-muted-foreground">{t("partners.forRetailers")}</p>
                  </div>
                </div>

                {/* Partner benefits preview */}
                <div className="space-y-4">
                  {[
                    { 
                      emoji: "📊", 
                      title: t("partners.analytics"),
                      value: "+45%",
                      desc: t("partners.conversion")
                    },
                    { 
                      emoji: "🎯", 
                      title: t("partners.targeting"),
                      value: "2.5x",
                      desc: t("partners.roi")
                    },
                    { 
                      emoji: "❤️", 
                      title: t("partners.loyalty"),
                      value: "+60%",
                      desc: t("partners.retention")
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-xl bg-secondary p-4"
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <span className="text-xl font-bold text-primary">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partner logos placeholder */}
              <div className="mt-6 flex items-center justify-center gap-6 opacity-50">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-20 rounded-lg bg-muted"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
