"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Check, Mail, AlertCircle } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"

export function Waitlist() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError(t("waitlist.emailError"))
      return
    }

    if (!validateEmail(email)) {
      setError(t("waitlist.emailError"))
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Request failed")
      }

      setIsSuccess(true)
      setEmail("")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : ""
      setError(message || t("waitlist.submitError"))
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm font-medium text-primary-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/80" />
              <span>{t("waitlist.label")}</span>
            </div>

            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              {t("waitlist.headline")}
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">{t("waitlist.desc")}</p>

            {isSuccess ? (
              <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-2xl bg-primary-foreground/20 p-6 backdrop-blur">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-foreground">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <p className="text-left text-base font-medium text-primary-foreground">
                  {t("waitlist.success")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md" noValidate>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder={t("waitlist.placeholder")}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError("")
                      }}
                      className="h-12 bg-primary-foreground pl-12 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary-foreground/50"
                      aria-label="Email address"
                      autoComplete="email"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="secondary"
                    size="lg"
                    className="h-12 cursor-pointer whitespace-nowrap px-6"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("waitlist.loading")}
                      </>
                    ) : (
                      t("waitlist.button")
                    )}
                  </Button>
                </div>

                {error && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-primary-foreground/90">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <p className="mt-4 text-sm text-primary-foreground/60">{t("waitlist.privacy")}</p>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
