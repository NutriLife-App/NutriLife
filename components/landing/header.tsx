"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { scrollToSection } from "@/lib/scroll"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"

// ── Reusable language switcher ──────────────────────────────────────────────
function LanguageSwitcher({
  language,
  setLanguage,
  size = "sm",
}: {
  language: "ua" | "en"
  setLanguage: (l: "ua" | "en") => void
  size?: "sm" | "md"
}) {
  const isEn = language === "en"
  const sizeStyles = size === "sm"
    ? { wrapH: "h-8", pillH: "h-7", labelSize: "text-[0.7rem]" }
    : { wrapH: "h-9", pillH: "h-8", labelSize: "text-xs" }

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className={`relative flex ${sizeStyles.wrapH} w-[5.25rem] items-center rounded-full border border-border/50 bg-muted/60 p-[3px]`}
    >
      {/* Animated sliding pill background */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${sizeStyles.pillH} w-[calc(50%-3px)] rounded-full bg-primary shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)] ${isEn ? "translate-x-[calc(100%+3px)]" : "translate-x-0"}`}
      />

      {/* Language buttons */}
      {(["ua", "en"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`relative z-10 flex-1 flex items-center justify-center cursor-pointer rounded-full ${sizeStyles.labelSize} font-semibold tracking-wider transition-colors duration-200 select-none ${language === lang ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

// ── Header ──────────────────────────────────────────────────────────────────
export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { key: "nav.howItWorks", href: "#how-it-works" },
    { key: "nav.forWhom",    href: "#for-whom" },
    { key: "nav.features",   href: "#why-different" },
    { key: "nav.faq",        href: "#faq" },
  ]

  const handleNav = (href: string) => {
    setIsOpen(false)
    scrollToSection(href)
  }

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <button onClick={handleLogoClick} className="flex cursor-pointer items-center gap-2.5 transition-opacity duration-200 hover:opacity-80">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl">
            <Image
              src="/logo-mark.png"
              alt="NutriLife logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="text-xl font-semibold text-foreground">NutriLife</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNav(item.href)}
              className="group relative cursor-pointer text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {t(item.key)}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher language={language} setLanguage={setLanguage} size="sm" />

          <Button onClick={() => handleNav("#waitlist")} className="hidden sm:flex" size="sm">
            {t("nav.waitlist")}
          </Button>

          {/* Mobile hamburger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 pt-6">

                <button onClick={handleLogoClick} className="flex cursor-pointer items-center gap-2.5 transition-opacity duration-200 hover:opacity-80">
                  <div className="relative h-9 w-9 overflow-hidden rounded-xl">
                    <Image src="/logo-mark.png" alt="NutriLife logo" fill className="object-cover" />
                  </div>
                  <span className="text-xl font-semibold text-foreground">NutriLife</span>
                </button>

                <LanguageSwitcher language={language} setLanguage={setLanguage} size="md" />

                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleNav(item.href)}
                      className="cursor-pointer text-left text-base font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
                    >
                      {t(item.key)}
                    </button>
                  ))}
                </nav>

                <Button onClick={() => handleNav("#waitlist")} className="w-full">
                  {t("nav.waitlist")}
                </Button>

              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}
