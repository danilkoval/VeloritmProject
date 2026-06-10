import type { Metadata } from "next";
import { OrdersManager } from "@/components/admin/OrdersManager";

export const metadata: Metadata = {
  title: "Адмін — Замовлення",
  description: "Управління замовленнями.",
  robots: { index: false, follow: false },
};

export default function AdminOrdersPage() {
  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-xl font-semibold text-white">Замовлення</h2>
        <p className="mt-1 text-sm text-[#7a82ad]">
          Статуси: нове → в обробці → відправлено → доставлено. Скасування —
          окремий термінальний стан.
        </p>
      </header>
      <OrdersManager />
    </div>
  );
}
