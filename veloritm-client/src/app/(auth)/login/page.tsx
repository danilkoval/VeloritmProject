import type { Metadata } from "next";
import Link from "next/link";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { PasswordField } from "@/components/auth/PasswordField";
import { ArrowRightIcon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Вхід до кабінету",
  description: "Увійдіть до особистого кабінету Велоритм.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <form className="space-y-6" method="post" action="/api/auth/login">
      <header>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white lg:text-slate-900">
          Вхід до кабінету
        </h1>
        <p className="mt-1 text-sm text-[#b9bee0] lg:text-slate-500">
          Раді знову бачити! Введіть email і пароль.
        </p>
      </header>

      <AuthTabs />

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-white lg:text-slate-700">
            Email
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="o.shevchenko@mail.com"
            className="field-auth mt-1.5"
          />
        </label>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-white lg:text-slate-700"
            >
              Пароль
            </label>
            <Link
              href="/account/recover"
              className="text-sm font-medium text-[#ff3d8b] hover:underline lg:text-[#2756ff]"
            >
              Забув пароль?
            </Link>
          </div>
          <PasswordField />
        </div>

        <label className="flex items-center gap-2 text-sm text-[#cfd3ef] lg:text-slate-600">
          <input
            type="checkbox"
            defaultChecked
            className="h-4 w-4 accent-[#ff3d8b] lg:accent-[#2756ff]"
          />
          Запам&apos;ятати на цьому пристрої
        </label>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff3d8b] to-[#ff7a3d] py-3.5 font-semibold text-white shadow-lg shadow-pink-500/20 transition-all hover:opacity-90 lg:bg-[#2756ff] lg:from-[#2756ff] lg:to-[#2756ff] lg:shadow-blue-500/20 lg:hover:bg-[#1d44e0]"
      >
        Увійти
        <ArrowRightIcon size={18} />
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#1f2750] lg:border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-[0.18em] text-[#7a82ad] lg:text-slate-400">
          <span className="bg-[#06081a] px-3 lg:bg-white">або</span>
        </div>
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#1f2750] bg-[#101533] py-3 font-semibold text-white transition-colors hover:bg-[#141a3d] lg:border-slate-200 lg:bg-white lg:text-slate-900 lg:hover:bg-slate-50"
      >
        <GoogleMark />
        Увійти через Google
      </button>
    </form>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.4c-.2 1.4-1.6 4.1-5.4 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.5 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"
      />
    </svg>
  );
}
