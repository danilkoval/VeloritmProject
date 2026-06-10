import type { Metadata } from "next";
import { ContentManager } from "@/components/admin/ContentManager";

export const metadata: Metadata = {
  title: "Адмін — Контент головної",
  description: "Управління банерами та акціями головної сторінки.",
  robots: { index: false, follow: false },
};

export default function AdminContentPage() {
  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Контент головної</h2>
          <p className="mt-1 text-sm text-[#7a82ad]">
            Банери, акції та сповіщення. Зміни регенерують ISR-кеш сторінки.
          </p>
        </div>
        <span className="rounded-full bg-[#6a4cff]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#a59bff]">
          ROLE_ADMIN
        </span>
      </header>
      <ContentManager />
    </div>
  );
}
