import Link from "next/link";
import { Logo } from "../ui/Logo";
import { site } from "@/lib/site";
import {
  PhoneIcon,
  MailIcon,
  PinIcon,
  TelegramIcon,
  InstagramIcon,
} from "../ui/Icon";

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Про магазин",
    links: [
      { href: "/about", label: "Про нас" },
      { href: "/service", label: "Сервісний центр" },
      { href: "/test-drive", label: "Тест-драйв" },
      { href: "/blog", label: "Блог" },
      { href: "/contacts", label: "Контакти" },
    ],
  },
  {
    title: "Каталог",
    links: [
      { href: "/catalog/girski", label: "Гірські" },
      { href: "/catalog/shoseini", label: "Шосейні" },
      { href: "/catalog/miski", label: "Міські" },
      { href: "/catalog/dytiachi", label: "Дитячі" },
      { href: "/catalog/elektro", label: "Електро" },
    ],
  },
  {
    title: "Покупцям",
    links: [
      { href: "/account/orders", label: "Мої замовлення" },
      { href: "/returns", label: "Повернення" },
      { href: "/delivery", label: "Доставка та оплата" },
      { href: "/installments", label: "Оплата частинами" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

const paymentBadges = [
  { name: "LiqPay", short: "Li" },
  { name: "WayForPay", short: "Wa" },
  { name: "Privat24", short: "Pr" },
];

const deliveryBadges = [
  { name: "Нова Пошта", short: "Но" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[#1f2750] bg-[#06081a]">
      <span
        aria-hidden
        className="block h-px bg-gradient-to-r from-transparent via-[#ff3d8b] to-transparent"
      />
      <div className="container-app grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#b9bee0]">
            Перевірені велосипеди, запчастини й аксесуари. Доставка по всій Україні.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-[#b9bee0]">
            <li>
              <a
                href={`tel:${site.organization.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <PhoneIcon size={16} className="text-[#ff3d8b]" />
                {site.organization.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.organization.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MailIcon size={16} className="text-[#6a4cff]" />
                {site.organization.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <PinIcon size={16} className="text-[#ff7a3d]" />
              {site.organization.address.addressLocality}, {site.organization.address.streetAddress}
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-3">
            <SocialLink href={site.organization.social.telegram} label="Telegram">
              <TelegramIcon size={16} />
            </SocialLink>
            <SocialLink href={site.organization.social.instagram} label="Instagram">
              <InstagramIcon size={16} />
            </SocialLink>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a82ad]">
              {col.title}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#cfd3ef] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[#1f2750]">
        <div className="container-app flex flex-wrap items-center justify-between gap-6 py-6 text-sm">
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.18em] text-[#7a82ad]">
              Оплата:
            </span>
            <ul className="flex flex-wrap items-center gap-2">
              {paymentBadges.map((p) => (
                <li
                  key={p.name}
                  className="flex items-center gap-2 rounded-lg border border-[#1f2750] bg-[#0a0e23] px-3 py-1.5 text-white"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-[#141a3d] text-[10px] font-bold text-[#cfd3ef]">
                    {p.short}
                  </span>
                  {p.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.18em] text-[#7a82ad]">
              Доставка:
            </span>
            <ul className="flex flex-wrap items-center gap-2">
              {deliveryBadges.map((d) => (
                <li
                  key={d.name}
                  className="flex items-center gap-2 rounded-lg border border-[#1f2750] bg-[#0a0e23] px-3 py-1.5 text-white"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-[#141a3d] text-[10px] font-bold text-[#cfd3ef]">
                    {d.short}
                  </span>
                  {d.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1f2750]">
        <div className="container-app flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-[#7a82ad]">
          <p>
            ©{" "}
            <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            {site.legalName} · Усі права захищено
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Політика конфіденційності
            </Link>
            <Link href="/offer" className="hover:text-white transition-colors">
              Публічна оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-9 w-9 place-items-center rounded-lg border border-[#1f2750] bg-[#0a0e23] text-[#b9bee0] hover:border-[#ff3d8b] hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}
