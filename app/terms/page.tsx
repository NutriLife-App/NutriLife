import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Leaf } from "lucide-react"

export const metadata: Metadata = {
  title: "Умови використання | NutriLife",
  description: "Базові умови використання сайту NutriLife.",
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span>Повернутися на головну</span>
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">NutriLife</p>
            <h1 className="text-3xl font-bold tracking-tight">Умови використання</h1>
          </div>
        </div>

        <div className="mt-8 space-y-8 text-sm leading-7 text-muted-foreground">
          
<section>
  <h2 className="text-lg font-semibold text-foreground">1. Загальна інформація</h2>
  <p className="mt-2">NutriLife — це інформаційний сайт і landing page продукту, який перебуває на етапі розвитку. Інформація на сайті надається для ознайомлення з продуктом та збору інтересу до запуску.</p>
</section>
<section>
  <h2 className="text-lg font-semibold text-foreground">2. Характер матеріалів</h2>
  <p className="mt-2">Матеріали на сайті не є індивідуальною медичною консультацією. Будь-які персональні рекомендації у майбутньому мають використовуватися з урахуванням вашого стану здоров’я та, за потреби, консультації зі спеціалістом.</p>
</section>
<section>
  <h2 className="text-lg font-semibold text-foreground">3. Інтелектуальна власність</h2>
  <p className="mt-2">Дизайн, тексти, логіка продукту та інші матеріали NutriLife належать правовласнику проєкту, якщо інше прямо не зазначено окремо.</p>
</section>
<section>
  <h2 className="text-lg font-semibold text-foreground">4. Контакти</h2>
  <p className="mt-2">Якщо у вас є питання щодо використання сайту або продукту, напишіть на <a className="text-foreground underline" href="mailto:yurii.korenets@gmail.com">yurii.korenets@gmail.com</a>.</p>
</section>
<section>
  <h2 className="text-lg font-semibold text-foreground">5. Важлива примітка</h2>
  <p className="mt-2">Це базова редакція умов використання для ранньої версії сайту. Перед офіційним запуском продукту варто підготувати фінальну юридичну редакцію.</p>
</section>

        </div>
      </div>
    </main>
  )
}
