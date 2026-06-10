import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { faqLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Часті запитання (FAQ)",
  description:
    "Відповіді на найпоширеніші питання покупців Велоритм: доставка, гарантія, повернення, оплата.",
  alternates: { canonical: "/faq" },
};

const faq = [
  {
    question: "Скільки триває доставка?",
    answer:
      "Замовлення з Києва та Кременчука відправляються в день замовлення (якщо до 14:00). Нова Пошта — 1–2 робочі дні до більшості міст України.",
  },
  {
    question: "Чи можна сплатити частинами без переплат?",
    answer:
      "Так. Доступна Privat24 «Оплата частинами» — до 6 місяців без переплат.",
  },
  {
    question: "Який термін гарантії?",
    answer:
      "Стандартна гарантія від виробника — 1-3 роки.",
  },
  {
    question: "Чи можна повернути товар, який не сподобався?",
    answer:
      "Так, протягом 14 днів — за умови збереження товарного вигляду та упаковки (ст. 9 Закону «Про захист прав споживачів»). Якщо причина повернення — брак, доставку оплачує магазин.",
  },
  {
    question: "Чи зберуть мені велосипед перед відправкою?",
    answer:
      "Так. Усі велосипеди проходять передпродажну збірку та налаштування — налаштовуємо гальма, перемикачі, перевіряємо колеса.",
  },
  {
    question: "Чи можна забронювати товар?",
    answer:
      "Так. При додаванні товару в кошик він резервується на 30 хвилин — за цей час можна спокійно оформити замовлення.",
  },
];

export default function FaqPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Головна", href: "/" }, { name: "FAQ", href: "/faq" }]} />
      <div className="container-app pb-16">
        <header className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff3d8b]">
            Покупцям
          </p>
          <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
            Часті запитання
          </h1>
        </header>
        <ul className="space-y-3">
          {faq.map((item) => (
            <li key={item.question}>
              <details className="card group p-5 transition-colors hover:border-[#2c356b]">
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-base font-semibold text-white">
                  {item.question}
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#101533] text-[#ff3d8b] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[#b9bee0]">{item.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
      <JsonLd data={faqLd(faq)} />
    </>
  );
}
