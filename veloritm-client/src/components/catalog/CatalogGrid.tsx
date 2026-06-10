import { ProductCard } from "../product/ProductCard";
import type { Product } from "@/lib/types";

export function CatalogGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="card flex min-h-[300px] flex-col items-center justify-center gap-2 p-10 text-center">
        <p className="text-lg font-semibold text-white">Нічого не знайдено</p>
        <p className="text-sm text-[#7a82ad]">
          Спробуйте змінити фільтри або зайти пізніше.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
