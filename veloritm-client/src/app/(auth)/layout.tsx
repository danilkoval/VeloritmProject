import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { CartIcon, HeartIcon, StarIcon, TruckIcon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const benefits = [
  { icon: CartIcon, text: "Швидке замовлення в один клік" },
  { icon: HeartIcon, text: "Список бажань між пристроями" },
  { icon: StarIcon, text: "Бонусні бали за кожну покупку" },
  { icon: TruckIcon, text: "Відстеження доставки в реальному часі" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:bg-[#0a0e23]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <aside className="relative hidden overflow-hidden border-r border-[#1f2750] bg-[#0a0e23] p-10 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between">
          <div
            aria-hidden
            className="absolute -right-32 top-10 h-[480px] w-[480px] rounded-full bg-[#6a4cff]/15 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -left-20 bottom-0 h-[420px] w-[420px] rounded-full bg-[#ff3d8b]/10 blur-3xl"
          />
          <div className="relative">
            <Logo />
          </div>
          <div className="relative space-y-8">
            <h2
              style={{ fontFamily: "var(--font-oswald)" }}
              className="text-4xl font-bold leading-[1.1] tracking-[-1.8px] text-white sm:text-5xl lg:text-[72px]"
            >
              ТРИМАЙ
              <br />
              <span className="gradient-text">СВІЙ РИТМ</span>
            </h2>
            <p className="max-w-md text-[#b9bee0]">
              Кабінет Велоритм — твої замовлення, бонусні бали, відстеження
              доставки та персональні рекомендації в одному місці.
            </p>
            <ul className="space-y-3 text-sm text-white">
              {benefits.map((b) => (
                <li key={b.text} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#101533] text-[#ff3d8b]">
                    <b.icon size={16} />
                  </span>
                  {b.text}
                </li>
              ))}
            </ul>
          </div>
          <p className="relative text-xs text-[#5a6190]">
            ©{" "}
            <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            Велоритм
          </p>
        </aside>

        <section className="flex flex-col bg-[#06081a] text-white lg:bg-white lg:text-[#0b0f2a]">
          <div className="border-b border-[#1f2750] p-4 lg:hidden">
            <Logo />
          </div>
          <div className="flex flex-1 items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">{children}</div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 border-t border-[#1f2750] py-5 text-sm text-[#7a82ad] lg:border-slate-200 lg:text-slate-500">
            <Link href="/" className="hover:text-white lg:hover:text-slate-900">
              ← На головну
            </Link>
            <span aria-hidden>·</span>
            <Link href="/faq" className="hover:text-white lg:hover:text-slate-900">
              Допомога
            </Link>
            <span aria-hidden>·</span>
            <Link href="/admin" className="hover:text-white lg:hover:text-slate-900">
              Адмін-вхід
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
