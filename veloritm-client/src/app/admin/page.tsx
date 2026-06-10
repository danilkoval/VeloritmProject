import type { Metadata } from "next";
import Link from "next/link";
import {
  CartIcon,
  TruckIcon,
  WrenchIcon,
  ShieldIcon,
  ChevronRightIcon,
} from "@/components/ui/Icon";
import { formatUAH } from "@/lib/format";

export const metadata: Metadata = {
  title: "Адмін-панель",
  description: "Управління магазином Велоритм.",
  robots: { index: false, follow: false },
};

const kpis = [
  {
    icon: CartIcon,
    label: "Замовлень за добу",
    value: "18",
    delta: "+12%",
    deltaPositive: true,
    href: "/admin/orders",
  },
  {
    icon: TruckIcon,
    label: "У дорозі",
    value: "7",
    delta: "2 нові",
    deltaPositive: true,
    href: "/admin/orders?status=shipped",
  },
  {
    icon: WrenchIcon,
    label: "Низький залишок",
    value: "4",
    delta: "потребує поповнення",
    deltaPositive: false,
    href: "/admin/products",
  },
  {
    icon: ShieldIcon,
    label: "Запити на повернення",
    value: "3",
    delta: "у черзі",
    deltaPositive: false,
    href: "/admin/returns",
  },
];

const revenue = {
  today: 142680,
  week: 894320,
  month: 3127400,
};

const recentActivity = [
  { time: "14:32", text: "Замовлення № VR-2026-1058 — оплачено (WayForPay)" },
  { time: "13:58", text: "Резерв на Trek Marlin 7 знято за TTL (30 хв)" },
  { time: "12:14", text: "Запит на повернення RT-2026-0043 — підтверджено" },
  { time: "11:02", text: "Залишок: Shimano Deore CS-M6100 поповнено на 24 шт." },
  { time: "09:45", text: "Промокод SPRING10 застосовано 6 разів" },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <section>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((k) => (
            <li key={k.label}>
              <Link
                href={k.href}
                className="group card flex h-full flex-col gap-2 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff3d8b]/40 hover:bg-[#141a3d] hover:shadow-xl hover:shadow-pink-500/10"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#101533] text-[#ff3d8b] transition-colors group-hover:bg-[#ff3d8b]/15">
                  <k.icon size={18} />
                </span>
                <p className="text-xs text-[#7a82ad]">{k.label}</p>
                <p className="text-3xl font-bold text-white">{k.value}</p>
                <p
                  className={`text-xs ${
                    k.deltaPositive ? "text-[#22c55e]" : "text-[#f5a524]"
                  }`}
                >
                  {k.delta}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-6">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-xl font-semibold text-white">Виторг</h2>
          <span className="text-xs text-[#7a82ad]">Дані за UTC+2</span>
        </div>
        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#1f2750] p-4">
            <dt className="text-xs uppercase tracking-wider text-[#7a82ad]">
              Сьогодні
            </dt>
            <dd className="mt-1 text-2xl font-bold text-white">
              {formatUAH(revenue.today)}
            </dd>
          </div>
          <div className="rounded-xl border border-[#1f2750] p-4">
            <dt className="text-xs uppercase tracking-wider text-[#7a82ad]">
              За тиждень
            </dt>
            <dd className="mt-1 text-2xl font-bold text-white">
              {formatUAH(revenue.week)}
            </dd>
          </div>
          <div className="rounded-xl border border-[#1f2750] p-4">
            <dt className="text-xs uppercase tracking-wider text-[#7a82ad]">
              За місяць
            </dt>
            <dd className="mt-1 text-2xl font-bold text-white">
              {formatUAH(revenue.month)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="card p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-white">Стрічка подій</h2>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1 text-sm text-[#ff3d8b] hover:text-[#ff7a3d]"
          >
            Усі замовлення <ChevronRightIcon size={14} />
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-[#1f2750] text-sm">
          {recentActivity.map((a) => (
            <li
              key={a.text}
              className="flex items-start gap-4 py-3 text-[#cfd3ef]"
            >
              <span className="w-12 shrink-0 font-mono text-xs text-[#7a82ad]">
                {a.time}
              </span>
              <span>{a.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
