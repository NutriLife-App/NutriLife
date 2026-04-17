"use client"

import { useLanguage } from "@/lib/language-context"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/ui/animated-section"
import { useScrollAnimation, animationVariants } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export function FAQ() {
  const { t } = useLanguage()
  const { ref: accordionRef, isVisible: accordionVisible } = useScrollAnimation<HTMLDivElement>()

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ]

  return (
    <section id="faq" className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("faq.label")}
          </span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("faq.headline")}
          </h2>
        </AnimatedSection>

        {/* FAQ list */}
        <div ref={accordionRef} className="mx-auto mt-16 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={cn(
                  "rounded-2xl border border-border bg-card px-6 shadow-sm scroll-hidden",
                  accordionVisible && animationVariants.fadeUp
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="py-5 text-left text-lg font-medium hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact prompt */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-muted-foreground">
            {t("faq.contact")}{" "}
            <a
              href="mailto:hello@nutrilife.ua"
              className="font-medium text-primary hover:underline"
            >
              hello@nutrilife.ua
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
