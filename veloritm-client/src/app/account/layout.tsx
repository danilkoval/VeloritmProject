import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AccountNav } from "@/components/account/AccountNav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Головна", href: "/" },
          { name: "Особистий кабінет", href: "/account" },
        ]}
      />
      <div className="container-app pb-16">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff3d8b]">
            Кабінет
          </p>
          <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">Особистий кабінет</h1>
        </header>
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside>
            <AccountNav />
          </aside>
          <section className="min-w-0">{children}</section>
        </div>
      </div>
    </>
  );
}
