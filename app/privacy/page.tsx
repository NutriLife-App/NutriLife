import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Leaf } from "lucide-react"

export const metadata: Metadata = {
  title: "Політика конфіденційності | NutriLife",
  description: "Базова політика конфіденційності для landing page NutriLife.",
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
            <h1 className="text-3xl font-bold tracking-tight">Політика конфіденційності</h1>
          </div>
        </div>

        <div className="mt-8 space-y-8 text-sm leading-7 text-muted-foreground">
          
<section>
  <h2 className="text-lg font-semibold text-foreground">1. Які дані ми можемо збирати</h2>
  <p className="mt-2">На поточному етапі сайт NutriLife може збирати лише базові контактні дані, які ви добровільно залишаєте у формі очікування, зокрема email-адресу.</p>
</section>
<section>
  <h2 className="text-lg font-semibold text-foreground">2. Для чого ми використовуємо дані</h2>
  <p className="mt-2">Ми використовуємо ці дані, щоб повідомити вас про запуск продукту, тестування бета-версії та важливі оновлення, пов’язані з NutriLife.</p>
</section>
<section>
  <h2 className="text-lg font-semibold text-foreground">3. Передача третім сторонам</h2>
  <p className="mt-2">Ми не продаємо ваші персональні дані. Технічні сервіси для зберігання заявок або аналітики можуть обробляти дані від нашого імені лише в межах роботи сайту.</p>
</section>
<section>
  <h2 className="text-lg font-semibold text-foreground">4. Ваші права</h2>
  <p className="mt-2">Ви можете попросити видалити або оновити ваші контактні дані, написавши на <a className="text-foreground underline" href="mailto:yurii.korenets@gmail.com">yurii.korenets@gmail.com</a>.</p>
</section>
<section>
  <h2 className="text-lg font-semibold text-foreground">5. Важлива примітка</h2>
  <p className="mt-2">Це стартова редакція політики конфіденційності для MVP-сайту. Перед публічним комерційним запуском її варто перевірити з урахуванням реальної інфраструктури, аналітики, CRM та юрисдикції.</p>
</section>

        </div>
      </div>
    </main>
  )
}
