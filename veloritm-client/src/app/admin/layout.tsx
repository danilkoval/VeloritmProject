import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Головна", href: "/" },
          { name: "Адмін-панель", href: "/admin" },
        ]}
      />
      <div className="container-app pb-16">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff3d8b]">
            Адмін-панель
          </p>
          <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
            Управління магазином
          </h1>
        </header>
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside>
            <AdminNav />
          </aside>
          <section className="min-w-0">{children}</section>
        </div>
      </div>
    </>
  );
}
