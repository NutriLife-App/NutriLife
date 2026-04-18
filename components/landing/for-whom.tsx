"use client"

import { useLanguage } from "@/lib/language-context"
import { Users, GraduationCap, Dumbbell, Briefcase } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { useScrollAnimation, animationVariants } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function ForWhom() {
  const { t } = useLanguage()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation<HTMLDivElement>()

  const audiences = [
    {
      icon: Users,
      title: t("forWhom.card1.title"),
      description: t("forWhom.card1.desc"),
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: GraduationCap,
      title: t("forWhom.card2.title"),
      description: t("forWhom.card2.desc"),
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      icon: Dumbbell,
      title: t("forWhom.card3.title"),
      description: t("forWhom.card3.desc"),
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      icon: Briefcase,
      title: t("forWhom.card4.title"),
      description: t("forWhom.card4.desc"),
      color: "bg-purple-500/10 text-purple-600",
    },
  ]

  return (
    <section id="for-whom" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("forWhom.label")}
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("forWhom.headline")}
          </h2>
        </AnimatedSection>

        {/* Audience cards */}
        <div ref={cardsRef} className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:gap-8">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-250 ease-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/8 scroll-hidden",
                cardsVisible && animationVariants.fadeUp
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-250 group-hover:scale-105 ${audience.color}`}>
                <audience.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{audience.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{audience.description}</p>

              {/* Decorative corner */}
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-primary/5 opacity-0 blur-xl transition-all duration-400 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
