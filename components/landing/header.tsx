"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { scrollToSection } from "@/lib/scroll"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { LanguageTransitionWrapper } from "@/components/language-transition-wrapper"
import { Menu } from "lucide-react"
import Image from "next/image"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { key: "nav.howItWorks", href: "#how-it-works" },
    { key: "nav.forWhom", href: "#for-whom" },
    { key: "nav.features", href: "#why-different" },
    { key: "nav.faq", href: "#faq" },
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

        <LanguageTransitionWrapper className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
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
        </LanguageTransitionWrapper>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-border/60 bg-secondary p-1">
            <button
              onClick={() => setLanguage("ua")}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-500 ease-out ${
                language === "ua"
                  ? "scale-110 bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:bg-background hover:text-foreground"
              }`}
              style={{
                transform: language === "ua" ? "scale(1.1) translateY(-1px)" : "scale(1) translateY(0)",
              }}
            >
              UA
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-500 ease-out ${
                language === "en"
                  ? "scale-110 bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:bg-background hover:text-foreground"
              }`}
              style={{
                transform: language === "en" ? "scale(1.1) translateY(-1px)" : "scale(1) translateY(0)",
              }}
            >
              EN
            </button>
          </div>

          <Button onClick={() => handleNav("#waitlist")} className="hidden sm:flex" size="sm">
            {t("nav.waitlist")}
          </Button>

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
                    <Image
                      src="/logo-mark.png"
                      alt="NutriLife logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xl font-semibold text-foreground">NutriLife</span>
                </button>

                <div className="flex items-center rounded-full border border-border/60 bg-secondary p-1">
                  <button
                    onClick={() => setLanguage("ua")}
                    className={`flex-1 cursor-pointer rounded-full px-3 py-2 text-sm font-medium transition-all duration-500 ease-out ${
                      language === "ua"
                        ? "scale-110 bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:bg-background hover:text-foreground"
                    }`}
                    style={{
                      transform: language === "ua" ? "scale(1.1) translateY(-1px)" : "scale(1) translateY(0)",
                    }}
                  >
                    UA
                  </button>
                  <button
                    onClick={() => setLanguage("en")}
                    className={`flex-1 cursor-pointer rounded-full px-3 py-2 text-sm font-medium transition-all duration-500 ease-out ${
                      language === "en"
                        ? "scale-110 bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:bg-background hover:text-foreground"
                    }`}
                    style={{
                      transform: language === "en" ? "scale(1.1) translateY(-1px)" : "scale(1) translateY(0)",
                    }}
                  >
                    EN
                  </button>
                </div>

                <LanguageTransitionWrapper>
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
                </LanguageTransitionWrapper>
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
