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
    "NutriLife - це smart nutrition assistant, який допомагає створити зручний раціон під ваші цілі, бюджет, уподобання та продукти, які справді можна купити поруч.",
  keywords: ["харчування", "дієта", "здорове харчування", "Україна", "meal plan", "nutrition", "AI"],
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
