"use client"

import { useLanguage } from "@/lib/language-context"
import {
  MapPin,
  UserCheck,
  Wallet,
  ShoppingBasket,
  CalendarDays,
  Microscope,
} from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { useScrollAnimation, animationVariants } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function WhyDifferent() {
  const { t } = useLanguage()
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>()

  const benefits = [
    {
      icon: MapPin,
      title: t("different.item1.title"),
      description: t("different.item1.desc"),
      featured: true,   // wide card — top-left
    },
    {
      icon: UserCheck,
      title: t("different.item2.title"),
      description: t("different.item2.desc"),
      featured: false,
    },
    {
      icon: Wallet,
      title: t("different.item3.title"),
      description: t("different.item3.desc"),
      featured: false,
    },
    {
      icon: ShoppingBasket,
      title: t("different.item4.title"),
      description: t("different.item4.desc"),
      featured: false,
    },
    {
      icon: CalendarDays,
      title: t("different.item5.title"),
      description: t("different.item5.desc"),
      featured: false,
    },
    {
      icon: Microscope,
      title: t("different.item6.title"),
      description: t("different.item6.desc"),
      featured: true,   // wide card — bottom-right
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

        {/*
          Bento grid — 4 columns on desktop:
          Row 1: [featured wide: col-span-2] [normal] [normal]
          Row 2: [normal] [normal] [featured wide: col-span-2]

          On tablet (sm): 2 columns, featured = col-span-2 full width
          On mobile: single column, all equal
        */}
        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5"
        >
          {benefits.map((item, index) => (
            <div
              key={index}
              className={cn(
                // Base card styles
                "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
                "transition-all duration-250 ease-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/8",
                "scroll-hidden",
                // Padding: featured cards get more breathing room
                item.featured ? "p-8" : "p-7",
                // Column spans on lg
                item.featured && index === 0 ? "lg:col-span-2" : "",
                item.featured && index === 5 ? "lg:col-span-2" : "",
                // On sm: featured gets full width
                item.featured ? "sm:col-span-2 lg:col-span-2" : "",
                gridVisible && animationVariants.scaleUp,
              )}
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              {/* Icon */}
              <div
                className={cn(
                  "mb-5 inline-flex items-center justify-center rounded-xl bg-primary/10 transition-colors duration-200 group-hover:bg-primary/18",
                  item.featured ? "h-12 w-12" : "h-10 w-10",
                )}
              >
                <item.icon
                  className={cn(
                    "text-primary",
                    item.featured ? "h-6 w-6" : "h-5 w-5",
                  )}
                />
              </div>

              {/* Content */}
              <h3
                className={cn(
                  "font-semibold leading-snug text-foreground",
                  item.featured ? "text-[1.0625rem]" : "text-[1rem]",
                )}
              >
                {item.title}
              </h3>
              <p
                className={cn(
                  "mt-2.5 leading-relaxed text-muted-foreground",
                  item.featured ? "max-w-sm text-[0.9375rem]" : "text-[0.9rem]",
                )}
              >
                {item.description}
              </p>

              {/* Subtle hover glow */}
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary/8 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Bottom trust note */}
        <AnimatedSection animation="fadeUp" className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
            {t("different.trust")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
