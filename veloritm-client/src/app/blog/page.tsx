import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Блог про велосипеди",
  description:
    "Поради з вибору, обслуговування та маршрути для велосипедистів. Експертний блог Велоритм.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    slug: "yak-vybraty-girskyi-velosyped",
    title: "Як вибрати гірський велосипед у 2026 році",
    excerpt: "Розбираємо хардтейли проти двопідвісів, розмір рами, діаметр коліс і компоненти.",
    publishedAt: "2026-05-10",
    minutes: 8,
  },
  {
    slug: "elektrovelosypedy-faq",
    title: "Електровелосипеди: 12 запитань новачка",
    excerpt: "Дальність, потужність, законодавство в Україні та як обирати батарею.",
    publishedAt: "2026-04-22",
    minutes: 6,
  },
  {
    slug: "regulnyi-dohliad",
    title: "ТО велосипеда: що робити кожні 500 км",
    excerpt: "Покроковий гайд із базового обслуговування трансмісії, гальм та коліс.",
    publishedAt: "2026-04-02",
    minutes: 5,
  },
  {
    slug: "vyber-shose-bike",
    title: "Шосейний велосипед: алюміній vs карбон",
    excerpt: "Бюджети 30 000–120 000 ₴, на чому економити, а на чому — ні.",
    publishedAt: "2026-03-18",
    minutes: 7,
  },
];

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Головна", href: "/" }, { name: "Блог", href: "/blog" }]} />
      <div className="container-app pb-16">
        <header className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff3d8b]">
            Блог
          </p>
          <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
            Поради та гайди для велосипедистів
          </h1>
        </header>
        <ul className="grid gap-5 md:grid-cols-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="card flex h-full flex-col gap-3 p-6 transition-colors hover:border-[#2c356b]"
              >
                <p className="text-xs text-[#7a82ad]">
                  {formatDate(p.publishedAt)} · {p.minutes} хв читання
                </p>
                <h2 className="text-xl font-bold text-white">{p.title}</h2>
                <p className="text-sm text-[#b9bee0]">{p.excerpt}</p>
                <span className="mt-auto text-sm text-[#ff3d8b]">Читати →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
