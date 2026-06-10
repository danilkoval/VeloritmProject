import { ProductCard } from "../product/ProductCard";
import { SectionHeading } from "./CategoryGrid";
import type { Product } from "@/lib/types";

export function FeaturedProducts({
  products,
  kicker,
  title,
  href,
}: {
  products: Product[];
  kicker: string;
  title: string;
  href?: string;
}) {
  if (!products.length) return null;
  return (
    <section className="container-app py-16">
      <SectionHeading
        kicker={kicker}
        title={title}
        href={href ?? "/catalog"}
        hrefLabel="Усі товари"
      />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
