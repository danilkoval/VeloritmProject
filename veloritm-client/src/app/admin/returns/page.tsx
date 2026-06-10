import type { Metadata } from "next";
import { ReturnsManager } from "@/components/admin/ReturnsManager";

export const metadata: Metadata = {
  title: "Адмін — Повернення",
  description: "Обробка запитів на повернення та рефанди.",
  robots: { index: false, follow: false },
};

export default function AdminReturnsPage() {
  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-xl font-semibold text-white">Повернення</h2>
        <p className="mt-1 text-sm text-[#7a82ad]">
          Обробка запитів за 2 робочих дні. Статуси: <code>initiated</code> →
          <code> approved</code> / <code>rejected</code> → <code>received</code> →
          <code> refunded</code>.
        </p>
      </header>
      <ReturnsManager />
    </div>
  );
}
