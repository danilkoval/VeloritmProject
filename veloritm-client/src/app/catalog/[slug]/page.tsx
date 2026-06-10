import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Filters } from "@/components/catalog/Filters";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { categories, categoryBySlug } from "@/lib/categories";
import { productsByCategory } from "@/lib/products";
import { site } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 600;
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return { title: "Категорія не знайдена" };

  const title = `${category.title} — купити в Україні`;
  const description = `${category.description} Доставка по всій Україні від ${site.name}.`;

  return {
    title,
    description,
    alternates: { canonical: `/catalog/${category.slug}` },
    openGraph: { title, description, url: `/catalog/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const items = productsByCategory(category.slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Головна", href: "/" },
          { name: "Каталог", href: "/catalog" },
          { name: category.shortTitle, href: `/catalog/${category.slug}` },
        ]}
      />
      <div className="container-app pb-16">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{category.title}</h1>
          <p className="mt-3 max-w-2xl text-[#b9bee0]">{category.description}</p>
        </header>
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <Filters />
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#7a82ad]">
                Знайдено <span className="text-white font-semibold">{items.length}</span> товарів
              </p>
              <label className="text-sm text-[#cfd3ef]">
                Сортувати:&nbsp;
                <select className="field-dark inline-block w-auto !py-1.5 !px-3 text-sm">
                  <option>За популярністю</option>
                  <option>Спочатку дешевше</option>
                  <option>Спочатку дорожче</option>
                </select>
              </label>
            </div>
            <CatalogGrid products={items} />
          </div>
        </div>
      </div>
    </>
  );
}
