import type { Metadata } from "next";
import { ProductsManager } from "@/components/admin/ProductsManager";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Адмін — Товари",
  description: "Управління каталогом, цінами та залишками.",
  robots: { index: false, follow: false },
};

export default function AdminProductsPage() {
  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-xl font-semibold text-white">Товари</h2>
        <p className="mt-1 text-sm text-[#7a82ad]">
          Створення, редагування, ціни, залишки та резерви — все в одній таблиці.
        </p>
      </header>
      <ProductsManager products={products} />
    </div>
  );
}
