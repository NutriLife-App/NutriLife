"use client"

import { useLanguage } from "@/lib/language-context"
import { Check, ChefHat, MapPin, PiggyBank, Microscope, Egg, Soup, Utensils } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { useScrollAnimation, animationVariants } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function Solution() {
  const { t } = useLanguage()
  const { ref: visualRef, isVisible: visualVisible } = useScrollAnimation<HTMLDivElement>()
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation<HTMLDivElement>()

  const features = [
    { icon: ChefHat, text: t("solution.feature1") },
    { icon: MapPin, text: t("solution.feature2") },
    { icon: PiggyBank, text: t("solution.feature3") },
    { icon: Microscope, text: t("solution.feature4") },
  ]

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <div
            ref={visualRef}
            className={cn("relative order-2 lg:order-1 scroll-hidden", visualVisible && animationVariants.fadeRight)}
          >
            <div className="relative mx-auto max-w-md">
              {/* Main illustration */}
              <div className="aspect-square rounded-3xl bg-primary/5 p-8">
                <div className="relative h-full w-full rounded-2xl border border-border bg-card p-6 shadow-lg">
                  {/* Meal plan grid */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground">{t("solution.weeklyPlan")}</p>
                    <h3 className="text-lg font-semibold text-foreground">{t("solution.monday")}</h3>
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: Egg, name: t("solution.oatmeal"), cal: "320" },
                      { icon: Soup, name: t("solution.caesar"), cal: "420" },
                      { icon: Utensils, name: t("solution.chicken"), cal: "480" },
                    ].map((meal, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl bg-secondary/80 p-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <meal.icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="flex-1 font-medium text-foreground">{meal.name}</span>
                        <span className="text-sm text-primary">{meal.cal} kcal</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-xl bg-primary/10 p-3">
                    <span className="text-sm font-medium text-foreground">{t("solution.total")}</span>
                    <span className="font-semibold text-primary">1,220 kcal</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 -top-4 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{t("solution.availableAtb")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <AnimatedSection animation="fadeLeft" className="order-1 lg:order-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t("solution.label")}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("solution.headline")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t("solution.desc")}
            </p>

            <div ref={featuresRef} className="mt-10 grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl border border-transparent bg-secondary/60 p-4 transition-all duration-250 ease-out hover:border-primary/20 hover:bg-primary/5 scroll-hidden",
                    featuresVisible && animationVariants.fadeUp
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-200 group-hover:bg-primary/18">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-[0.9375rem] font-medium text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
