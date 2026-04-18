import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "NutriLife - Персоналізоване харчування для України",
  description:
    "NutriLife допомагає скласти персональний раціон із реальних продуктів, які є в українських магазинах — під ваші цілі, бюджет та смаки.",
  keywords: ["харчування", "дієта", "здорове харчування", "Україна", "meal plan", "nutrition", "планування раціону"],
  authors: [{ name: "NutriLife Team" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "NutriLife - Персоналізоване харчування для України",
    description: "Smart nutrition assistant для створення персоналізованого раціону",
    type: "website",
    locale: "uk_UA",
  },
  twitter: {
    card: "summary_large_image",
    title: "NutriLife - Персоналізоване харчування для України",
    description: "Smart nutrition assistant для створення персоналізованого раціону",
  },
  alternates: {
    languages: {
      uk: "/",
      en: "/",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk" className="bg-background" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
