import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Filters } from "@/components/catalog/Filters";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Каталог велосипедів, запчастин та аксесуарів",
  description:
    "Повний каталог Велоритм: гірські, шосейні, міські, дитячі та електровелосипеди, запчастини й аксесуари. Доставка по всій Україні.",
  alternates: { canonical: "/catalog" },
};

export const revalidate = 600;

export default function CatalogPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Головна", href: "/" }, { name: "Каталог", href: "/catalog" }]} />
      <div className="container-app pb-16">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Каталог
          </h1>
        </header>
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <Filters />
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#7a82ad]">
                Знайдено <span className="text-white font-semibold">{products.length}</span> товарів
              </p>
              <label className="text-sm text-[#cfd3ef]">
                Сортувати:&nbsp;
                <select className="field-dark inline-block w-auto !py-1.5 !px-3 text-sm">
                  <option>За популярністю</option>
                  <option>Спочатку дешевше</option>
                  <option>Спочатку дорожче</option>
                  <option>Новинки</option>
                </select>
              </label>
            </div>
            <CatalogGrid products={products} />
          </div>
        </div>
      </div>
    </>
  );
}
