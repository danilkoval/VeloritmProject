import type { Metadata } from "next";
import { formatUAH } from "@/lib/format";
import { ChevronRightIcon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Мої замовлення",
  description: "Список ваших замовлень у Велоритм.",
  robots: { index: false, follow: false },
};

const orders = [
  {
    id: "VR-2026-1042",
    date: "12 травня 2026",
    status: "У дорозі",
    statusColor: "text-[#22c55e] bg-[#22c55e]/10",
    items: ["Trek Marlin 7 (2026)"],
    total: 38990,
  },
  {
    id: "VR-2026-0987",
    date: "28 квітня 2026",
    status: "Доставлено",
    statusColor: "text-[#7a82ad] bg-[#101533]",
    items: ["Шолом Kask Mojito³", "Касета Shimano Deore CS-M6100 12s"],
    total: 9480,
  },
];

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-xl font-semibold text-white">Мої замовлення</h2>
        <p className="mt-1 text-sm text-[#7a82ad]">
          Всі замовлення зберігаються 5 років згідно вимог бухгалтерського обліку.
        </p>
      </header>
      <ul className="space-y-3">
        {orders.map((o) => (
          <li key={o.id}>
            <article className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <p className="text-base font-semibold text-white">№ {o.id}</p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${o.statusColor}`}
                  >
                    {o.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#7a82ad]">{o.date}</p>
                <ul className="mt-2 text-sm text-[#cfd3ef]">
                  {o.items.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-white">{formatUAH(o.total)}</p>
                <button
                  type="button"
                  className="mt-2 flex items-center gap-1 text-sm text-[#ff3d8b] hover:text-[#ff7a3d]"
                >
                  Деталі <ChevronRightIcon size={14} />
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
