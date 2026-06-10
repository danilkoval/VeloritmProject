import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Сервісний центр",
  description:
    "ТО, ремонт та налаштування велосипедів у Кременчуці. Запис онлайн.",
  alternates: { canonical: "/service" },
};

const services = [
  { name: "Базове ТО", price: "від 600 ₴", desc: "Регулювання гальм, перемикачів, мастило ланцюга, перевірка вузлів" },
  { name: "Повне ТО", price: "від 1 500 ₴", desc: "Розборка, миття, заміна змазки, протяжка усіх з'єднань" },
  { name: "Ремонт трансмісії", price: "від 800 ₴", desc: "Діагностика та налаштування передач, заміна ланцюга/касети" },
  { name: "Гальмівна система", price: "від 500 ₴", desc: "Прокачка гідравлічних гальм, заміна колодок" },
  { name: "Капремонт вилки", price: "від 1 800 ₴", desc: "Заміна масла, сальників, прокачка повітряної камери" },
  { name: "Збірка нового велосипеда", price: "безкоштовно", desc: "Безкоштовно для велосипедів, придбаних у Велоритм" },
];

export default function ServicePage() {
  return (
    <InfoPage
      kicker="Сервіс"
      title="Сервісний центр Велоритм"
      lead={`Власна майстерня у ${site.organization.address.addressLocality}: ${site.organization.address.streetAddress}. Майстри з 10-річним досвідом, оригінальні запчастини, чесні строки.`}
      breadcrumbs={[
        { name: "Головна", href: "/" },
        { name: "Сервісний центр", href: "/service" },
      ]}
    >
      <h2>Послуги та ціни</h2>
      <ul className="!pl-0 !list-none grid gap-3 md:grid-cols-2">
        {services.map((s) => (
          <li key={s.name} className="card !list-none p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base !mt-0">{s.name}</h3>
              <span className="text-sm font-semibold text-[#ff3d8b]">{s.price}</span>
            </div>
            <p className="mt-2 text-sm text-[#b9bee0]">{s.desc}</p>
          </li>
        ))}
      </ul>
      <h2>Як записатися</h2>
      <p>
        Зателефонуйте за номером{" "}
        <a href={`tel:${site.organization.phone}`}>{site.organization.phoneDisplay}</a>{" "}
        або напишіть нам у{" "}
        <a href={site.organization.social.telegram} target="_blank" rel="noopener">Telegram</a>. Зазвичай ми
        записуємо на найближчі 1–3 дні. Базове ТО — приходьте без запису.
      </p>
    </InfoPage>
  );
}
