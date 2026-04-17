"use client"

import { useScrollAnimation, animationVariants, type AnimationVariant } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: AnimationVariant
  delay?: number
  threshold?: number
}

export function AnimatedSection({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold })

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-hidden",
        isVisible && animationVariants[animation],
        className
      )}
      style={{ animationDelay: delay ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  )
}

interface AnimatedChildrenProps {
  children: React.ReactNode
  className?: string
  animation?: AnimationVariant
  staggerDelay?: number
  threshold?: number
}

export function AnimatedChildren({
  children,
  className,
  animation = "fadeUp",
  staggerDelay = 0.1,
  threshold = 0.1,
}: AnimatedChildrenProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold })

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={cn("scroll-hidden", isVisible && animationVariants[animation])}
              style={{ animationDelay: isVisible ? `${index * staggerDelay}s` : undefined }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
