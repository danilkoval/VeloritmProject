import type { Metadata } from "next";
import { WishlistContent } from "@/components/wishlist/WishlistContent";

export const metadata: Metadata = {
  title: "Список бажань",
  description: "Збережені товари в особистому кабінеті Велоритм.",
  robots: { index: false, follow: false },
};

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-white">Список бажань</h2>
        <p className="mt-1 text-sm text-[#7a82ad]">
          Збережені товари. Список доступний з будь-якого пристрою — поки він
          живе у вашому браузері.
        </p>
      </header>
      <WishlistContent />
    </div>
  );
}
