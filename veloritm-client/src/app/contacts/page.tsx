import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Контакти Велоритм: телефон, email, адреса магазину в Кременчуці.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsPage() {
  const { phone, phoneDisplay, email, address, social } = site.organization;
  return (
    <InfoPage
      kicker="Контакти"
      title="Завжди раді чути"
      lead="Відповідаємо в робочі дні з 9:00 до 19:00, у вихідні — до 17:00. У Telegram — швидше за телефон."
      breadcrumbs={[
        { name: "Головна", href: "/" },
        { name: "Контакти", href: "/contacts" },
      ]}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card !list-none p-6">
          <h3 className="text-base">Магазин у Кременчуці</h3>
          <p>{address.addressLocality}, {address.streetAddress}</p>
          <p>Працюємо: пн–нд, 9:00–19:00</p>
        </div>
        <div className="card !list-none p-6">
          <h3 className="text-base">Зв&apos;язок</h3>
          <p>Телефон: <a href={`tel:${phone}`}>{phoneDisplay}</a></p>
          <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
          <p>
            Соцмережі:{" "}
            <a href={social.telegram} target="_blank" rel="noopener">Telegram</a>,{" "}
            <a href={social.instagram} target="_blank" rel="noopener">Instagram</a>
          </p>
        </div>
      </div>
      <h2>Реквізити</h2>
      <p>ФОП &laquo;Велоритм&raquo;, ЄДРПОУ 12345678, IBAN UA00 0000 0000 0000 0000 0000.</p>
    </InfoPage>
  );
}
