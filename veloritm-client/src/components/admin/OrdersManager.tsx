"use client";

import { useMemo, useState } from "react";
import { AdminToolbar } from "./AdminToolbar";
import { formatUAH } from "@/lib/format";

type Status = "new" | "processing" | "shipped" | "delivered" | "cancelled";

interface AdminOrder {
  id: string;
  customer: string;
  city: string;
  items: number;
  total: number;
  date: string;
  status: Status;
  payment: "WayForPay" | "Накладений" | "Privat частини";
}

const statusOrder: Status[] = [
  "new",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const statusLabel: Record<Status, string> = {
  new: "Нове",
  processing: "В обробці",
  shipped: "Відправлено",
  delivered: "Доставлено",
  cancelled: "Скасовано",
};

const statusColor: Record<Status, string> = {
  new: "text-[#2756ff] bg-[#2756ff]/10",
  processing: "text-[#f5a524] bg-[#f5a524]/10",
  shipped: "text-[#a59bff] bg-[#a59bff]/10",
  delivered: "text-[#22c55e] bg-[#22c55e]/10",
  cancelled: "text-[#7a82ad] bg-[#101533]",
};

const seed: AdminOrder[] = [
  {
    id: "VR-2026-1058",
    customer: "Олексій Шевченко",
    city: "Київ",
    items: 1,
    total: 38990,
    date: "30 травня 2026",
    status: "new",
    payment: "WayForPay",
  },
  {
    id: "VR-2026-1057",
    customer: "Ірина Коваль",
    city: "Львів",
    items: 2,
    total: 9480,
    date: "30 травня 2026",
    status: "processing",
    payment: "WayForPay",
  },
  {
    id: "VR-2026-1052",
    customer: "Петро Мельник",
    city: "Одеса",
    items: 1,
    total: 27990,
    date: "29 травня 2026",
    status: "shipped",
    payment: "Накладений",
  },
  {
    id: "VR-2026-1042",
    customer: "Богдан Сергієнко",
    city: "Дніпро",
    items: 3,
    total: 11470,
    date: "12 травня 2026",
    status: "shipped",
    payment: "Privat частини",
  },
  {
    id: "VR-2026-0987",
    customer: "Олена Гриценко",
    city: "Кременчук",
    items: 2,
    total: 9480,
    date: "28 квітня 2026",
    status: "delivered",
    payment: "WayForPay",
  },
  {
    id: "VR-2026-0954",
    customer: "Микола Бондаренко",
    city: "Харків",
    items: 1,
    total: 22500,
    date: "22 квітня 2026",
    status: "cancelled",
    payment: "WayForPay",
  },
];

export function OrdersManager() {
  const [orders, setOrders] = useState(seed);
  const [state, setState] = useState({ search: "", filter: "all" });

  const counts = useMemo(() => {
    const byStatus = statusOrder.reduce(
      (acc, s) => {
        acc[s] = orders.filter((o) => o.status === s).length;
        return acc;
      },
      {} as Record<Status, number>,
    );
    return { all: orders.length, ...byStatus };
  }, [orders]);

  const filtered = useMemo(() => {
    const q = state.search.trim().toLowerCase();
    return orders.filter((o) => {
      if (state.filter !== "all" && o.status !== state.filter) return false;
      if (!q) return true;
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q)
      );
    });
  }, [orders, state]);

  const advance = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const idx = statusOrder.indexOf(o.status);
        if (o.status === "cancelled" || o.status === "delivered") return o;
        return { ...o, status: statusOrder[idx + 1] ?? o.status };
      }),
    );
  };

  return (
    <div className="space-y-5">
      <AdminToolbar
        searchPlaceholder="Пошук за № замовлення, ПІБ, містом…"
        filters={[
          { value: "all", label: "Усі", count: counts.all },
          { value: "new", label: "Нові", count: counts.new },
          {
            value: "processing",
            label: "В обробці",
            count: counts.processing,
          },
          {
            value: "shipped",
            label: "Відправлено",
            count: counts.shipped,
          },
          {
            value: "delivered",
            label: "Доставлено",
            count: counts.delivered,
          },
          {
            value: "cancelled",
            label: "Скасовано",
            count: counts.cancelled,
          },
        ]}
        defaultFilter="all"
        onChange={(s) => setState(s)}
      />

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] text-sm">
            <thead className="border-b border-[#1f2750] text-left text-xs uppercase tracking-wider text-[#7a82ad]">
              <tr>
                <th className="px-5 py-3 font-semibold">Замовлення</th>
                <th className="px-5 py-3 font-semibold">Клієнт</th>
                <th className="px-5 py-3 font-semibold">Дата</th>
                <th className="px-5 py-3 font-semibold">Сума</th>
                <th className="px-5 py-3 font-semibold">Оплата</th>
                <th className="px-5 py-3 font-semibold">Статус</th>
                <th className="px-5 py-3 font-semibold text-right">Дії</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-[#1f2750]/60 last:border-0 hover:bg-[#141a3d]/60"
                >
                  <td className="px-5 py-3">
                    <p className="font-semibold text-white">№ {o.id}</p>
                    <p className="text-xs text-[#7a82ad]">{o.items} поз.</p>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-white">{o.customer}</p>
                    <p className="text-xs text-[#7a82ad]">{o.city}</p>
                  </td>
                  <td className="px-5 py-3 text-[#cfd3ef]">{o.date}</td>
                  <td className="px-5 py-3 font-semibold text-white">
                    {formatUAH(o.total)}
                  </td>
                  <td className="px-5 py-3 text-[#cfd3ef]">{o.payment}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[o.status]}`}
                    >
                      {statusLabel[o.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {o.status !== "delivered" && o.status !== "cancelled" ? (
                      <button
                        type="button"
                        onClick={() => advance(o.id)}
                        className="rounded-lg border border-[#1f2750] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-[#ff3d8b]/40 hover:bg-[#ff3d8b]/10"
                      >
                        → {statusLabel[statusOrder[statusOrder.indexOf(o.status) + 1]]}
                      </button>
                    ) : (
                      <span className="text-xs text-[#7a82ad]">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-sm text-[#7a82ad]"
                  >
                    Замовлень не знайдено.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
