"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Check, Sparkles, Mail } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"

const WAITLIST_ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT
const WAITLIST_EMAIL = "yurii.korenets@gmail.com"

export function Waitlist() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !email.includes("@")) {
      setError(t("waitlist.emailError"))
      return
    }

    setIsLoading(true)

    try {
      if (WAITLIST_ENDPOINT) {
        const response = await fetch(WAITLIST_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            source: "nutrilife-landing",
          }),
        })

        if (!response.ok) {
          throw new Error("Request failed")
        }
      } else {
        const subject = encodeURIComponent("NutriLife waitlist")
        const body = encodeURIComponent(`Please add this email to the NutriLife waitlist: ${email}`)
        window.location.href = `mailto:${WAITLIST_EMAIL}?subject=${subject}&body=${body}`
      }

      setIsSuccess(true)
      setEmail("")
    } catch {
      setError(t("waitlist.emailError"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="waitlist" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:px-12 sm:py-20 lg:px-20">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary-foreground/5 blur-3xl" />
          </div>

          <AnimatedSection animation="scaleUp" className="relative mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-2 text-sm font-medium text-primary-foreground">
              <Sparkles className="h-4 w-4" />
              <span>{t("waitlist.label")}</span>
            </div>

            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              {t("waitlist.headline")}
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">{t("waitlist.desc")}</p>

            {isSuccess ? (
              <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-2xl bg-primary-foreground/20 p-6 backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <p className="text-lg font-medium text-primary-foreground">{t("waitlist.success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder={t("waitlist.placeholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 bg-primary-foreground pl-12 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button type="submit" disabled={isLoading} variant="secondary" size="lg" className="h-12 whitespace-nowrap px-6">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("waitlist.loading")}
                      </>
                    ) : (
                      t("waitlist.button")
                    )}
                  </Button>
                </div>
                {error && <p className="mt-2 text-sm text-destructive-foreground">{error}</p>}
                <p className="mt-4 text-sm text-primary-foreground/60">{t("waitlist.privacy")}</p>
              </form>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary-foreground text-sm font-medium text-primary"
                  >
                    {["🧑", "👩", "👨", "👩‍🦱", "🧔"][i - 1]}
                  </div>
                ))}
              </div>
              <p className="text-primary-foreground/80">
                <span className="font-semibold text-primary-foreground">1,200+</span>{" "}
                {t("waitlist.joined")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
