import type { Metadata } from "next";
import Link from "next/link";
import { ProductForm } from "@/components/admin/ProductForm";
import { ChevronRightIcon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Адмін — Новий товар",
  description: "Створення нового товару в каталозі.",
  robots: { index: false, follow: false },
};

export default function NewProductPage() {
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
        <span className="text-white">Новий товар</span>
      </nav>
      <header>
        <h2 className="text-xl font-semibold text-white">Новий товар</h2>
        <p className="mt-1 text-sm text-[#7a82ad]">
          Створення картки товару. Slug формується автоматично з назви, але
          його можна задати вручну.
        </p>
      </header>
      <ProductForm mode="create" />
    </div>
  );
}
