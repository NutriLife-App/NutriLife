"use client"

import { useLanguage } from "@/lib/language-context"
import { Leaf, Mail } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  const productLinks = [
    { key: "nav.howItWorks", href: "#how-it-works" },
    { key: "nav.forWhom", href: "#for-whom" },
    { key: "nav.features", href: "#why-different" },
    { key: "nav.faq", href: "#faq" },
  ]

  const companyLinks = [
    { key: "footer.about", href: "/" },
    { key: "partners.label", href: "#partners" },
    { key: "nav.waitlist", href: "#waitlist" },
    { key: "footer.contact", href: "mailto:yurii.korenets@gmail.com" },
  ]

  const legalLinks = [
    { key: "footer.privacy", href: "/privacy" },
    { key: "footer.terms", href: "/terms" },
    { key: "footer.cookies", href: "/cookies" },
  ]

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">NutriLife</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t("footer.tagline")}</p>
            <a
              href="mailto:yurii.korenets@gmail.com"
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              <span>yurii.korenets@gmail.com</span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 lg:col-span-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{t("footer.product")}</h3>
              <ul className="mt-4 space-y-3">
                {productLinks.map((link) => (
                  <li key={link.key}>
                    <a href={link.href} className="group inline-flex text-sm text-muted-foreground transition-colors duration-200 hover:text-primary">
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">{t("footer.company")}</h3>
              <ul className="mt-4 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.key}>
                    <a href={link.href} className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary">
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">{t("footer.legal")}</h3>
              <ul className="mt-4 space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.key}>
                    <a href={link.href} className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary">
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">{t("footer.copyright")}</p>
            <p className="text-sm text-muted-foreground">{t("footer.madeWith")}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
