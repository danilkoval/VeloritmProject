import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Тест-драйв велосипеда",
  description: "Запишіться на тест-драйв велосипеда у Велоритм перед покупкою.",
  alternates: { canonical: "/test-drive" },
};

export default function TestDrivePage() {
  return (
    <InfoPage
      kicker="Тест-драйв"
      title="Спробуйте велосипед перед покупкою"
      lead="У нас можна прокатати найпопулярніші моделі прямо біля магазину. Привезли товар з іншого складу — також безкоштовний тест-драйв."
      breadcrumbs={[
        { name: "Головна", href: "/" },
        { name: "Тест-драйв", href: "/test-drive" },
      ]}
    >
      <h2>Як це працює</h2>
      <ul>
        <li>Запис на тест-драйв за телефоном або через форму на сайті</li>
        <li>Безкоштовно, тривалість — до 30 хвилин</li>
        <li>За окремою домовленістю — продовжений тест-драйв на 24 години (під заставу)</li>
        <li>Якщо купуєте велосипед після тесту — повертаємо вартість продовженого тесту</li>
      </ul>

      <h2>Записатися</h2>
      <form className="card !list-none grid gap-4 p-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a82ad]">
            Ім&apos;я
          </span>
          <input className="field-dark mt-1.5" placeholder="Олексій" required />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a82ad]">
            Телефон
          </span>
          <input type="tel" className="field-dark mt-1.5" placeholder="+380 67 412 18 36" required />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a82ad]">
            Модель велосипеда
          </span>
          <input className="field-dark mt-1.5" placeholder="Trek Marlin 7" />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a82ad]">
            Зручний час
          </span>
          <input className="field-dark mt-1.5" placeholder="Завтра після 18:00" />
        </label>
        <button className="btn btn-primary sm:col-span-2" type="submit">
          Записатися на тест-драйв
        </button>
      </form>
    </InfoPage>
  );
}
