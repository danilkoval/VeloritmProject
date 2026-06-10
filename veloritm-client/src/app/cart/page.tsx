import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Кошик",
  description: "Перегляньте товари у вашому кошику та оформіть замовлення.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Головна", href: "/" }, { name: "Кошик", href: "/cart" }]} />
      <div className="container-app pb-16">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Кошик</h1>
        <CartPageContent />
      </div>
    </>
  );
}
