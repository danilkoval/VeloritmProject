import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { Filters } from "@/components/catalog/Filters";
import { products } from "@/lib/products";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const title = query ? `Пошук: ${query}` : "Пошук по сайту";
  return {
    title,
    description: query
      ? `Результати пошуку «${query}» у магазині Велоритм.`
      : "Знайдіть велосипеди, запчастини та аксесуари у Велоритм.",
    robots: { index: false, follow: true },
    alternates: { canonical: "/search" },
  };
}

function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.title, p.brand, p.slug, p.shortDescription, p.description]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? searchProducts(query) : [];

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Головна", href: "/" },
          { name: "Пошук", href: "/search" },
        ]}
      />
      <div className="container-app pb-16">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {query ? `Результати пошуку: «${query}»` : "Пошук"}
          </h1>
          {!query && (
            <p className="mt-2 text-[#b9bee0]">
              Введіть запит у пошуковий рядок угорі сайту.
            </p>
          )}
        </header>
        {query && (
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <Filters />
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-[#7a82ad]">
                  Знайдено{" "}
                  <span className="text-white font-semibold">
                    {results.length}
                  </span>{" "}
                  {pluralize(results.length, ["товар", "товари", "товарів"])}
                </p>
                <label className="text-sm text-[#cfd3ef]">
                  Сортувати:&nbsp;
                  <select className="field-dark inline-block w-auto !py-1.5 !px-3 text-sm">
                    <option>За релевантністю</option>
                    <option>Спочатку дешевше</option>
                    <option>Спочатку дорожче</option>
                    <option>Новинки</option>
                  </select>
                </label>
              </div>
              <CatalogGrid products={results} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function pluralize(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
