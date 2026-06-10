/**
 * Centralised site configuration used by metadata, JSON-LD, footer, sitemap.
 * Replace siteUrl with the production domain when deploying.
 */
export const site = {
  name: "Велоритм",
  legalName: "Велоритм",
  slogan: "Тримай свій ритм на велосипеді",
  description:
    "Інтернет-магазин велосипедів, запчастин та аксесуарів у Кременчуці. Перевірені бренди, доставка по всій Україні, сервісний центр та оплата частинами.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://veloritm.ua",
  locale: "uk_UA",
  defaultLocale: "uk",
  supportedLocales: ["uk", "en"] as const,
  twitter: "@veloritm_ua",
  organization: {
    legalName: "Велоритм",
    email: "veloritm@gmail.com",
    phone: "+380980279427",
    phoneDisplay: "098 027 94 27",
    address: {
      streetAddress: "проспект Свободи, 7",
      addressLocality: "Кременчук",
      addressCountry: "UA",
      postalCode: "39600",
    },
    social: {
      telegram: "https://t.me/veloritm",
      instagram: "https://instagram.com/veloritm",
    },
  },
  payment: ["LiqPay", "WayForPay", "Privat24"] as const,
  delivery: ["Нова Пошта"] as const,
} as const;

export type SupportedLocale = (typeof site.supportedLocales)[number];
