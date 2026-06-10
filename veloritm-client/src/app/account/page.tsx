import type { Metadata } from "next";
import Link from "next/link";
import { CartIcon, TruckIcon, HeartIcon, StarIcon } from "@/components/ui/Icon";
import { WishlistCount } from "@/components/wishlist/WishlistCount";

export const metadata: Metadata = {
  title: "Профіль",
  description: "Огляд вашого акаунту в Велоритм.",
  robots: { index: false, follow: false },
};

const widgets: {
  icon: typeof CartIcon;
  title: string;
  value: React.ReactNode;
  href: string;
}[] = [
  {
    icon: CartIcon,
    title: "Активні замовлення",
    value: "2",
    href: "/account/orders",
  },
  {
    icon: TruckIcon,
    title: "У дорозі",
    value: "1",
    href: "/account/orders",
  },
  {
    icon: HeartIcon,
    title: "У бажаному",
    value: <WishlistCount />,
    href: "/account/wishlist",
  },
  {
    icon: StarIcon,
    title: "Бонусних балів",
    value: "320",
    href: "/account",
  },
];

export default function AccountPage() {
  return (
    <div className="space-y-8">
      <section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {widgets.map((w) => (
            <li key={w.title}>
              <Link
                href={w.href}
                className="group card flex h-full flex-col gap-2 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff3d8b]/40 hover:bg-[#141a3d] hover:shadow-xl hover:shadow-pink-500/10"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#101533] text-[#ff3d8b] transition-colors group-hover:bg-[#ff3d8b]/15">
                  <w.icon size={18} />
                </span>
                <p className="text-xs text-[#7a82ad]">{w.title}</p>
                <p className="text-3xl font-bold text-white">{w.value}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-white">Особисті дані</h2>
        <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <div className="flex justify-between gap-3">
            <dt className="text-[#7a82ad]">Ім&apos;я</dt>
            <dd className="text-white">Олексій Шевченко</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#7a82ad]">Email</dt>
            <dd className="text-white">o.shevchenko@mail.com</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#7a82ad]">Телефон</dt>
            <dd className="text-white">+380 67 412 18 36</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#7a82ad]">Місто</dt>
            <dd className="text-white">Київ</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/account/data" className="btn btn-secondary">
            Редагувати дані
          </Link>
          <Link href="/account/data?section=security" className="btn btn-ghost">
            Змінити пароль
          </Link>
        </div>
      </section>
    </div>
  );
}
