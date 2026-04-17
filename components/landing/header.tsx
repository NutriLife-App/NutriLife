"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, Leaf } from "lucide-react"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { key: "nav.howItWorks", href: "#how-it-works" },
    { key: "nav.forWhom", href: "#for-whom" },
    { key: "nav.features", href: "#why-different" },
    { key: "nav.faq", href: "#faq" },
  ]

  const scrollToSection = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">NutriLife</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollToSection(item.href)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.key)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full bg-secondary p-1">
            <button
              onClick={() => setLanguage("ua")}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                language === "ua"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              UA
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                language === "en"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>

          <Button onClick={() => scrollToSection("#waitlist")} className="hidden sm:flex" size="sm">
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
                <a href="/" className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                    <Leaf className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-semibold text-foreground">NutriLife</span>
                </a>

                <div className="flex items-center rounded-full bg-secondary p-1">
                  <button
                    onClick={() => setLanguage("ua")}
                    className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition-all ${
                      language === "ua"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    UA
                  </button>
                  <button
                    onClick={() => setLanguage("en")}
                    className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition-all ${
                      language === "en"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    EN
                  </button>
                </div>

                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => scrollToSection(item.href)}
                      className="text-left text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t(item.key)}
                    </button>
                  ))}
                </nav>
                <Button onClick={() => scrollToSection("#waitlist")} className="w-full">
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
