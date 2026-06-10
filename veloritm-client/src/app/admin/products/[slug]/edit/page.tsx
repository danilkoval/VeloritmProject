import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { ChevronRightIcon } from "@/components/ui/Icon";
import { productBySlug, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Адмін — Редагування товару",
  description: "Редагування картки товару.",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  return (
    <div className="space-y-5">
      <nav
        aria-label="Підшлях"
        className="flex items-center gap-1.5 text-xs text-[#7a82ad]"
      >
        <Link href="/admin/products" className="hover:text-white">
          Товари
        </Link>
        <ChevronRightIcon size={12} className="text-[#5a6190]" />
        <span className="text-white">{product.title}</span>
      </nav>
      <header>
        <h2 className="text-xl font-semibold text-white">{product.title}</h2>
        <p className="mt-1 text-sm text-[#7a82ad]">
          Артикул <code className="text-[#cfd3ef]">{product.slug}</code> змінити
          не можна (інакше зламаються 301-редиректи).
        </p>
      </header>
      <ProductForm mode="edit" product={product} />
    </div>
  );
}
