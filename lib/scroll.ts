/**
 * Smoothly scrolls to a section by its selector, compensating for the
 * sticky header height so content isn't hidden underneath it.
 *
 * @param href  CSS selector string, e.g. "#how-it-works"
 */
export function scrollToSection(href: string): void {
  const element = document.querySelector(href)
  if (!element) return

  const header = document.querySelector("header")
  const headerHeight = header ? header.getBoundingClientRect().height : 64

  const top =
    element.getBoundingClientRect().top + window.scrollY - headerHeight - 8

  window.scrollTo({ top, behavior: "smooth" })
}
