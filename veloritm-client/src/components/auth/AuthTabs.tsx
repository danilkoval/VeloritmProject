"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AuthTabs() {
  const pathname = usePathname() ?? "";
  const isLogin = pathname.startsWith("/login");
  return (
    <div
      role="tablist"
      aria-label="Авторизація"
      className="inline-flex rounded-xl bg-[#101533] p-1 text-sm font-semibold lg:bg-slate-100"
    >
      <Link
        href="/login"
        role="tab"
        aria-selected={isLogin}
        className={`rounded-lg px-5 py-2.5 transition-colors ${
          isLogin
            ? "bg-[#1c2348] text-white shadow-sm lg:bg-white lg:text-slate-900"
            : "text-[#7a82ad] hover:text-white lg:text-slate-500 lg:hover:text-slate-900"
        }`}
      >
        Увійти
      </Link>
      <Link
        href="/register"
        role="tab"
        aria-selected={!isLogin}
        className={`rounded-lg px-5 py-2.5 transition-colors ${
          !isLogin
            ? "bg-[#1c2348] text-white shadow-sm lg:bg-white lg:text-slate-900"
            : "text-[#7a82ad] hover:text-white lg:text-slate-500 lg:hover:text-slate-900"
        }`}
      >
        Реєстрація
      </Link>
    </div>
  );
}
