"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Apple, Salad, Heart } from "lucide-react"

export function Hero() {
  const { t } = useLanguage()

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden pb-20 pt-12 sm:pb-32 sm:pt-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>{t("hero.badge")}</span>
            </div>

            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("hero.headline")}
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t("hero.subheadline")}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={() => scrollToSection("#waitlist")}
                className="gap-2 px-8"
              >
                {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("#how-it-works")}
                className="px-8"
              >
                {t("hero.cta.secondary")}
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-8">
              <div>
                <p className="text-3xl font-bold text-foreground">2000+</p>
                <p className="text-sm text-muted-foreground">{t("hero.stats.recipes")}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">{t("hero.stats.local")}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">AI</p>
                <p className="text-sm text-muted-foreground">{t("hero.stats.ai")}</p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative lg:ml-auto">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main card */}
              <div className="relative rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
                {/* Phone mockup header */}
                <div className="mb-6 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                {/* App preview content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-2xl bg-secondary p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                      <Apple className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{t("hero.meal.breakfast")}</p>
                      <p className="text-sm text-muted-foreground">{t("hero.meal.breakfast.desc")}</p>
                    </div>
                    <p className="ml-auto font-semibold text-primary">320 kcal</p>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl bg-secondary p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                      <Salad className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{t("hero.meal.lunch")}</p>
                      <p className="text-sm text-muted-foreground">{t("hero.meal.lunch.desc")}</p>
                    </div>
                    <p className="ml-auto font-semibold text-primary">520 kcal</p>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl bg-secondary p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{t("hero.meal.dinner")}</p>
                      <p className="text-sm text-muted-foreground">{t("hero.meal.dinner.desc")}</p>
                    </div>
                    <p className="ml-auto font-semibold text-primary">450 kcal</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-6 rounded-2xl bg-secondary p-4">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("hero.dailyGoal")}</span>
                    <span className="font-medium text-foreground">1,290 / 2,000 kcal</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-primary/20">
                    <div className="h-full w-[65%] rounded-full bg-primary" />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -left-6 top-8 rounded-2xl border border-border bg-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <span className="text-lg">🥗</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">+15%</p>
                    <p className="text-xs text-muted-foreground">{t("hero.health")}</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 rounded-2xl border border-border bg-card p-4 shadow-lg sm:-right-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-lg">💰</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">-20%</p>
                    <p className="text-xs text-muted-foreground">{t("hero.spending")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
