import { LanguageProvider } from "@/lib/language-context"
import { PageContent } from "@/components/landing/page-content"

export default function Home() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  )
}
