import type { Metadata } from "next";
import Link from "next/link";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { PasswordField } from "@/components/auth/PasswordField";
import { ArrowRightIcon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Створення акаунту",
  description: "Зареєструйте акаунт Велоритм — для покупок, замовлень і бонусів.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <form className="space-y-6" method="post" action="/api/auth/register">
      <header>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white lg:text-slate-900">
          Створення акаунту
        </h1>
        <p className="mt-1 text-sm text-[#b9bee0] lg:text-slate-500">
          Один акаунт — для покупок, замовлень і бонусів.
        </p>
      </header>

      <AuthTabs />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-white lg:text-slate-700">
            Ім&apos;я
          </span>
          <input
            type="text"
            name="firstName"
            autoComplete="given-name"
            required
            placeholder="Олексій"
            className="field-auth mt-1.5"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-white lg:text-slate-700">
            Прізвище
          </span>
          <input
            type="text"
            name="lastName"
            autoComplete="family-name"
            required
            placeholder="Шевченко"
            className="field-auth mt-1.5"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-white lg:text-slate-700">
          Email
        </span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="field-auth mt-1.5"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-white lg:text-slate-700">
          Телефон
        </span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          required
          placeholder="+380 67 412 18 36"
          className="field-auth mt-1.5"
        />
      </label>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-white lg:text-slate-700"
        >
          Пароль
        </label>
        <PasswordField autoComplete="new-password" />
      </div>

      <div className="space-y-3">
        <label className="flex items-start gap-3 text-sm text-[#cfd3ef] lg:text-slate-700">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-0.5 h-4 w-4 accent-[#ff3d8b] lg:accent-[#2756ff]"
          />
          <span>
            Погоджуюсь з{" "}
            <Link href="/offer" className="font-semibold underline">
              Публічною офертою
            </Link>{" "}
            та{" "}
            <Link href="/privacy" className="font-semibold underline">
              Політикою конфіденційності
            </Link>
          </span>
        </label>
        <label className="flex items-start gap-3 text-sm text-[#cfd3ef] lg:text-slate-700">
          <input
            type="checkbox"
            name="marketing"
            defaultChecked
            className="mt-0.5 h-4 w-4 accent-[#ff3d8b] lg:accent-[#2756ff]"
          />
          <span>Хочу отримувати листи про новинки та акції</span>
        </label>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff3d8b] to-[#ff7a3d] py-3.5 font-semibold text-white shadow-lg shadow-pink-500/20 transition-all hover:opacity-90 lg:bg-[#2756ff] lg:from-[#2756ff] lg:to-[#2756ff] lg:shadow-blue-500/20 lg:hover:bg-[#1d44e0]"
      >
        Створити акаунт
        <ArrowRightIcon size={18} />
      </button>

      <p className="text-center text-sm text-[#7a82ad] lg:text-slate-500">
        Вже є акаунт?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#ff3d8b] hover:underline lg:text-[#2756ff]"
        >
          Увійти
        </Link>
      </p>
    </form>
  );
}
