import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductCard } from "@/components/product/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import { products, productBySlug, productsByCategory } from "@/lib/products";
import { categoryBySlug } from "@/lib/categories";
import { formatUAH } from "@/lib/format";
import { productLd } from "@/lib/jsonld";
import {
  StarIcon,
  TruckIcon,
  ShieldIcon,
  WrenchIcon,
  CheckIcon,
} from "@/components/ui/Icon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 600;
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: "Товар не знайдено" };

  const title = `${product.title} — купити в Україні`;
  const description = `${product.shortDescription} Ціна ${formatUAH(product.price)}. Доставка по Україні, гарантія, оплата частинами.`;

  return {
    title,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title,
      description,
      url: `/product/${product.slug}`,
      type: "website",
      images: product.images.map((url) => ({ url, alt: product.title })),
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const category = categoryBySlug(product.category);
  const related = productsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const availability = {
    InStock: { label: "В наявності", color: "text-[#22c55e]" },
    LimitedAvailability: {
      label: `Залишилось мало (${product.stock} шт.)`,
      color: "text-[#f5a524]",
    },
    OutOfStock: { label: "Немає в наявності", color: "text-[#ef4444]" },
  }[product.availability];

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Головна", href: "/" },
          { name: "Каталог", href: "/catalog" },
          ...(category
            ? [{ name: category.shortTitle, href: `/catalog/${category.slug}` }]
            : []),
          { name: product.title, href: `/product/${product.slug}` },
        ]}
      />
      <div className="container-app pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <ProductGallery images={product.images} alt={product.title} />

          <div>
            <p className="text-sm text-[#7a82ad]">{product.brand}</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              {product.title}
            </h1>
            {product.rating && product.reviewCount && (
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1 text-white">
                  <StarIcon size={16} className="text-[#f5a524]" />
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[#7a82ad]">
                  · {product.reviewCount} відгуків · Артикул: {product.slug}
                </span>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-end gap-3">
              {product.oldPrice && (
                <span className="text-base text-[#5a6190] line-through">
                  {formatUAH(product.oldPrice)}
                </span>
              )}
              <span className="text-4xl font-black text-white">
                {formatUAH(product.price)}
              </span>
              <span className={`text-sm ${availability.color}`}>
                · {availability.label}
              </span>
            </div>

            <p className="mt-6 text-[#b9bee0]">{product.shortDescription}</p>

            <ProductActions product={product} />

            <dl className="mt-8 grid grid-cols-3 gap-3 text-sm">
              <Perk icon={TruckIcon} title="Доставка" text="Нова Пошта" />
              <Perk icon={ShieldIcon} title="Гарантія" text="до 3 років" />
              <Perk icon={WrenchIcon} title="Сервіс" text="у Кременчуці" />
            </dl>

            <ul className="mt-8 space-y-1 text-sm">
              <li className="flex items-center gap-2 text-[#cfd3ef]">
                <CheckIcon size={16} className="text-[#22c55e]" /> Оплата частинами без переплат
              </li>
              <li className="flex items-center gap-2 text-[#cfd3ef]">
                <CheckIcon size={16} className="text-[#22c55e]" /> Тест-драйв перед покупкою
              </li>
            </ul>
          </div>
        </div>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <article>
            <h2 className="text-2xl font-bold text-white">Опис</h2>
            <p className="mt-4 leading-relaxed text-[#cfd3ef]">{product.description}</p>
          </article>
          <div>
            <h2 className="text-2xl font-bold text-white">Характеристики</h2>
            <dl className="card mt-4 divide-y divide-[#1f2750] p-1">
              {(() => {
                const frameMaterial = product.attributes.find(
                  (a) => a.name === "Матеріал рами",
                );
                const otherAttrs = product.attributes.filter(
                  (a) => a.name !== "Матеріал рами",
                );
                const rows: { name: string; value: string }[] = [];
                if (frameMaterial) rows.push(frameMaterial);
                if (product.frameSize)
                  rows.push({ name: "Розмір рами", value: product.frameSize });
                if (product.wheelSize)
                  rows.push({ name: "Розмір коліс", value: product.wheelSize });
                rows.push(...otherAttrs);
                if (product.color)
                  rows.push({ name: "Колір", value: product.color });
                return rows.map((row) => (
                  <div
                    key={row.name}
                    className="grid grid-cols-[1fr_1fr] gap-4 px-4 py-3 text-sm"
                  >
                    <dt className="text-[#7a82ad]">{row.name}</dt>
                    <dd className="text-white">{row.value}</dd>
                  </div>
                ));
              })()}
            </dl>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-bold text-white">Схожі товари</h2>
              {category && (
                <Link
                  href={`/catalog/${category.slug}`}
                  className="text-sm text-[#b9bee0] hover:text-white transition-colors"
                >
                  Усі моделі категорії →
                </Link>
              )}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <JsonLd data={productLd(product)} />
    </>
  );
}

function Perk({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="card flex flex-col gap-1 p-3">
      <Icon size={18} className="text-[#ff3d8b]" />
      <p className="text-xs text-[#7a82ad]">{title}</p>
      <p className="text-sm font-semibold text-white">{text}</p>
    </div>
  );
}
