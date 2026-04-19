"use client"

import { ReactNode } from "react"
import { useLanguageTransition } from "@/hooks/use-language-transition"

interface LanguageTransitionWrapperProps {
  children: ReactNode
  className?: string
}

/**
 * Wraps content that changes based on language selection.
 * Provides smooth fade transitions when language changes.
 * 
 * Example usage:
 * <LanguageTransitionWrapper>
 *   <h1>{t("hero.headline")}</h1>
 * </LanguageTransitionWrapper>
 */
export function LanguageTransitionWrapper({
  children,
  className = "",
}: LanguageTransitionWrapperProps) {
  const { isTransitioning } = useLanguageTransition()

  return (
    <div
      className={`transition-opacity duration-300 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  )
}
