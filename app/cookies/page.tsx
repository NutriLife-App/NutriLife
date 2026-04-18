import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Leaf } from "lucide-react"

export const metadata: Metadata = {
  title: "Політика cookies | NutriLife",
  description: "Базова політика cookies для landing page NutriLife.",
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
            <h1 className="text-3xl font-bold tracking-tight">Політика cookies</h1>
          </div>
        </div>

        <div className="mt-8 space-y-8 text-sm leading-7 text-muted-foreground">
          
<section>
  <h2 className="text-lg font-semibold text-foreground">1. Що таке cookies</h2>
  <p className="mt-2">Cookies — це невеликі файли, які браузер зберігає на вашому пристрої, щоб сайт міг працювати коректно та запам’ятовувати окремі налаштування.</p>
</section>
<section>
  <h2 className="text-lg font-semibold text-foreground">2. Як NutriLife використовує cookies</h2>
  <p className="mt-2">На поточному етапі сайт може використовувати технічні cookies або локальне збереження для базових налаштувань інтерфейсу, наприклад для вибору мови.</p>
</section>
<section>
  <h2 className="text-lg font-semibold text-foreground">3. Аналітика</h2>
  <p className="mt-2">Після підключення аналітики або інших сторонніх сервісів ця сторінка має бути оновлена з урахуванням фактичних інструментів, які використовуються на сайті.</p>
</section>
<section>
  <h2 className="text-lg font-semibold text-foreground">4. Керування cookies</h2>
  <p className="mt-2">Ви можете очищати або блокувати cookies у налаштуваннях браузера. Зверніть увагу, що після цього окремі функції сайту можуть працювати інакше.</p>
</section>
<section>
  <h2 className="text-lg font-semibold text-foreground">5. Важлива примітка</h2>
  <p className="mt-2">Це стартова редакція cookie policy для MVP. Перед публічним запуском її варто перевірити разом з фінальною політикою конфіденційності.</p>
</section>

        </div>
      </div>
    </main>
  )
}
