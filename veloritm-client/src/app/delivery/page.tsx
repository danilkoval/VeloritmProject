import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Доставка та оплата",
  description:
    "Способи доставки (Нова Пошта, кур'єр, самовивіз) та оплати (LiqPay, WayForPay, Privat24, накладений платіж).",
  alternates: { canonical: "/delivery" },
};

export default function DeliveryPage() {
  return (
    <InfoPage
      kicker="Сервіс"
      title="Доставка та оплата"
      lead="Доставляємо по всій Україні. Безкоштовна доставка від 5 000 ₴ (крім великогабариту)."
      breadcrumbs={[
        { name: "Головна", href: "/" },
        { name: "Доставка та оплата", href: "/delivery" },
      ]}
    >
      <h2>Способи доставки</h2>
      <ul>
        <li><strong>Нова Пошта</strong> — на відділення або кур&apos;єром. 1–2 робочі дні.</li>
        <li><strong>Кур&apos;єр по Кременчуку</strong> — у день замовлення.</li>
        <li><strong>Самовивіз</strong> — Кременчук, проспект Свободи, 7.</li>
      </ul>
      <h2>Способи оплати</h2>
      <ul>
        <li><strong>Карткою онлайн</strong> — LiqPay, WayForPay (Visa, Mastercard, Apple Pay, Google Pay).</li>
        <li><strong>Накладений платіж</strong> — оплата при отриманні через Нову Пошту.</li>
        <li><strong>Оплата частинами</strong> — Privat24 «Оплата частинами» до 24 міс. без переплат.</li>
        <li><strong>Безготівковий розрахунок</strong> — для юридичних осіб з ПДВ.</li>
      </ul>
      <h2>Великогабаритні товари</h2>
      <p>
        Велосипеди та інші великі товари відправляються через Нову Пошту з
        вантажним відділенням. Вартість залежить від розміру коробки — ми
        повідомимо точну суму перед відправкою.
      </p>
    </InfoPage>
  );
}
