"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Огляд" },
  { href: "/admin/products", label: "Товари" },
  { href: "/admin/orders", label: "Замовлення" },
  { href: "/admin/returns", label: "Повернення" },
  { href: "/admin/promo", label: "Промокоди", adminOnly: true },
  { href: "/admin/content", label: "Контент головної", adminOnly: true },
  { href: "/admin/users", label: "Користувачі", adminOnly: true },
];

export function AdminNav() {
  const pathname = usePathname() ?? "";

  return (
    <nav aria-label="Розділи адмін-панелі">
      <ul className="space-y-1 text-sm">
        {links.map((l) => {
          const active =
            l.href === "/admin"
              ? pathname === "/admin"
              : pathname === l.href || pathname.startsWith(`${l.href}/`);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 transition-colors ${
                  active
                    ? "border-[#ff3d8b]/30 bg-gradient-to-r from-[#ff3d8b]/15 via-[#ff3d8b]/5 to-transparent text-white"
                    : "border-transparent text-[#cfd3ef] hover:bg-[#101533] hover:text-white"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                    active ? "bg-[#ff3d8b] shadow-[0_0_10px_#ff3d8b]" : "bg-transparent"
                  }`}
                />
                <span className="flex-1">{l.label}</span>
                {l.adminOnly && (
                  <span
                    title="Тільки для ROLE_ADMIN"
                    className="rounded-full bg-[#6a4cff]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#a59bff]"
                  >
                    admin
                  </span>
                )}
              </Link>
            </li>
          );
        })}
        <li className="pt-2">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg border border-transparent px-4 py-2.5 text-left text-sm text-[#ef4444] hover:bg-[#101533]"
          >
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-transparent" />
            Вийти
          </button>
        </li>
      </ul>
    </nav>
  );
}
