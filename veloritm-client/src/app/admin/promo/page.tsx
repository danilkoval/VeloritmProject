import type { Metadata } from "next";
import { PromoManager } from "@/components/admin/PromoManager";

export const metadata: Metadata = {
  title: "Адмін — Промокоди",
  description: "Управління промокодами та акціями.",
  robots: { index: false, follow: false },
};

export default function AdminPromoPage() {
  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Промокоди</h2>
          <p className="mt-1 text-sm text-[#7a82ad]">
            Створення акцій та промокодів. Розділ доступний лише адміну.
          </p>
        </div>
        <span className="rounded-full bg-[#6a4cff]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#a59bff]">
          ROLE_ADMIN
        </span>
      </header>
      <PromoManager />
    </div>
  );
}
