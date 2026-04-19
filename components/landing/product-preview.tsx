"use client"

import { useLanguage } from "@/lib/language-context"
import { LayoutDashboard, CalendarDays, ShoppingCart, TrendingUp, Check, Egg, Soup, Utensils } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { useScrollAnimation, animationVariants } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function ProductPreview() {
  const { t } = useLanguage()
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation<HTMLDivElement>()
  const { ref: phoneRef, isVisible: phoneVisible } = useScrollAnimation<HTMLDivElement>()

  const features = [
    { icon: LayoutDashboard, text: t("preview.feature1") },
    { icon: CalendarDays, text: t("preview.feature2") },
    { icon: ShoppingCart, text: t("preview.feature3") },
    { icon: TrendingUp, text: t("preview.feature4") },
  ]

  return (
    <section className="overflow-hidden bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("preview.label")}
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("preview.headline")}
          </h2>
        </AnimatedSection>

        <div className="mt-16">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Feature list */}
            <div ref={featuresRef} className="order-2 lg:order-1">
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={cn(
                      "group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-250 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/[0.02] hover:shadow-lg hover:shadow-primary/8 scroll-hidden",
                      featuresVisible && animationVariants.fadeRight
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-200 group-hover:bg-primary/18">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="flex-1 text-base font-medium text-foreground">{feature.text}</span>
                    <Check className="ml-auto h-5 w-5 text-primary/50 transition-all duration-200 group-hover:text-primary" />
                  </div>
                ))}
              </div>
            </div>

            {/* Phone mockup */}
            <div
              ref={phoneRef}
              className={cn("relative order-1 lg:order-2 scroll-hidden", phoneVisible && animationVariants.fadeLeft)}
            >
              <div className="relative mx-auto w-full max-w-sm">
                {/* Phone frame */}
                <div className="relative rounded-[40px] border-8 border-foreground/90 bg-card p-2 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute left-1/2 top-0 z-10 h-7 w-32 -translate-x-1/2 rounded-b-xl bg-foreground/90" />

                  {/* Screen content */}
                  <div className="relative overflow-hidden rounded-[28px] bg-background">
                    {/* App header */}
                    <div className="bg-primary px-6 pb-6 pt-10">
                      <p className="text-sm text-primary-foreground/80">{t("preview.greeting")}</p>
                      <h3 className="mt-1 text-xl font-semibold text-primary-foreground">{t("preview.todayPlan")}</h3>

                      {/* Stats row */}
                      <div className="mt-4 flex gap-4">
                        <div className="flex-1 rounded-xl bg-primary-foreground/20 p-3 text-center backdrop-blur">
                          <p className="text-2xl font-bold text-primary-foreground">1,850</p>
                          <p className="text-xs text-primary-foreground/80">kcal</p>
                        </div>
                        <div className="flex-1 rounded-xl bg-primary-foreground/20 p-3 text-center backdrop-blur">
                          <p className="text-2xl font-bold text-primary-foreground">120g</p>
                          <p className="text-xs text-primary-foreground/80">{t("preview.protein")}</p>
                        </div>
                        <div className="flex-1 rounded-xl bg-primary-foreground/20 p-3 text-center backdrop-blur">
                          <p className="text-2xl font-bold text-primary-foreground">85%</p>
                          <p className="text-xs text-primary-foreground/80">{t("preview.goal")}</p>
                        </div>
                      </div>
                    </div>

                    {/* Meals list */}
                    <div className="p-4">
                      <div className="space-y-3">
                        {[
                          { icon: Egg, name: t("preview.syrnyky"), time: "08:00", cal: "380" },
                          { icon: Soup, name: t("preview.borscht"), time: "13:00", cal: "350" },
                          { icon: Utensils, name: t("preview.cutlets"), time: "19:00", cal: "520" },
                        ].map((meal, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 rounded-xl bg-secondary p-3"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <meal.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{meal.name}</p>
                              <p className="text-xs text-muted-foreground">{meal.time}</p>
                            </div>
                            <span className="text-sm font-medium text-primary">{meal.cal}</span>
                          </div>
                        ))}
                      </div>

                      {/* Shopping reminder */}
                      <div className="mt-4 rounded-xl bg-primary/10 p-3">
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{t("preview.shoppingList")}</p>
                            <p className="text-xs text-muted-foreground">{t("preview.items")}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background decoration */}
                <div className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
