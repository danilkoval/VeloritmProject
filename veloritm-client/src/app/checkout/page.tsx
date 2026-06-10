import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckoutSummary } from "@/components/cart/CheckoutSummary";
import { Section, Field, Select } from "@/components/checkout/FormPrimitives";
import { DeliverySection } from "@/components/checkout/DeliverySection";
import { CheckIcon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Оформлення замовлення",
  description: "Заповніть дані для доставки та оберіть спосіб оплати.",
  robots: { index: false, follow: false },
};

const steps = ["Контакти", "Доставка", "Оплата", "Підтвердження"];

export default function CheckoutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Головна", href: "/" },
          { name: "Кошик", href: "/cart" },
          { name: "Оформлення", href: "/checkout" },
        ]}
      />
      <div className="container-app pb-16">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Оформлення замовлення</h1>

        <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {steps.map((step, idx) => {
            const isActive = idx === 0;
            const isDone = idx < 0;
            return (
              <li
                key={step}
                className={`flex items-center gap-2 ${
                  isActive ? "text-white" : "text-[#7a82ad]"
                }`}
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-gradient-to-r from-[#ff3d8b] to-[#ff7a3d] text-white"
                      : isDone
                      ? "bg-[#22c55e] text-white"
                      : "bg-[#101533] text-[#7a82ad]"
                  }`}
                >
                  {isDone ? <CheckIcon size={14} /> : idx + 1}
                </span>
                {step}
              </li>
            );
          })}
        </ol>

        <form className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <Section title="Контактні дані" description="Як з вами зв'язатися">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Ім'я" name="firstName" placeholder="Олексій" required />
                <Field label="Прізвище" name="lastName" placeholder="Шевченко" required />
                <Field label="Телефон" name="phone" type="tel" placeholder="+380 67 412 18 36" required />
                <Field label="Email" name="email" type="email" placeholder="you@example.com" optional />
              </div>
            </Section>

            <DeliverySection />

            <Section title="Оплата" description="Безпечні платіжні шлюзи">
              <label className="block">
                <span className="sr-only">Спосіб оплати</span>
                <Select name="pay" defaultValue="liqpay">
                  <option value="liqpay">Карткою (VISA / MasterCard)</option>
                  <option value="np-cod">Накладений платіж (Оплата при отриманні)</option>
                  <option value="privat">Оплата частинами (Privat Bank)</option>
                </Select>
              </label>
            </Section>

            <Section title="Коментар" description="Необов'язково">
              <textarea
                name="comment"
                rows={4}
                placeholder="Деталі замовлення, побажання..."
                className="field-dark resize-none"
              />
            </Section>
          </div>

          <CheckoutSummary />
        </form>
      </div>
    </>
  );
}
