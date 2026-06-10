"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/account", label: "Профіль" },
  { href: "/account/orders", label: "Мої замовлення" },
  { href: "/account/wishlist", label: "Список бажань" },
  { href: "/account/returns", label: "Повернення" },
  { href: "/account/data", label: "Мої дані" },
];

export function AccountNav() {
  const pathname = usePathname() ?? "";

  return (
    <nav aria-label="Розділи кабінету">
      <ul className="space-y-1 text-sm">
        {links.map((l) => {
          const active =
            l.href === "/account"
              ? pathname === "/account"
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
                {l.label}
              </Link>
            </li>
          );
        })}
        <li>
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
