"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"

/**
 * Hook that detects language changes and manages a transition state.
 * Use with opacity/fade CSS transitions for smooth language switching.
 * 
 * Example: className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
 */
export function useLanguageTransition() {
  const { language } = useLanguage()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prevLanguage, setPrevLanguage] = useState(language)

  useEffect(() => {
    if (language !== prevLanguage) {
      // Trigger fade out effect
      setIsTransitioning(true)
      
      // Brief delay for smooth visual transition
      const timer = setTimeout(() => {
        setPrevLanguage(language)
        setIsTransitioning(false)
      }, 150)

      return () => clearTimeout(timer)
    }
  }, [language, prevLanguage])

  return { isTransitioning }
}
