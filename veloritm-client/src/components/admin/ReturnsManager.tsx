"use client";

import { useMemo, useState } from "react";
import { AdminToolbar } from "./AdminToolbar";
import { formatUAH } from "@/lib/format";

type Status = "initiated" | "approved" | "rejected" | "received" | "refunded";

interface ReturnItem {
  id: string;
  orderId: string;
  customer: string;
  item: string;
  reason: string;
  amount: number;
  status: Status;
  createdAt: string;
}

const seed: ReturnItem[] = [
  {
    id: "RT-2026-0045",
    orderId: "VR-2026-1052",
    customer: "Петро Мельник",
    item: "Cannondale Quick 4",
    reason: "Не підійшов розмір рами",
    amount: 27990,
    status: "initiated",
    createdAt: "29.05.2026",
  },
  {
    id: "RT-2026-0044",
    orderId: "VR-2026-1042",
    customer: "Богдан Сергієнко",
    item: "Касета Shimano Deore CS-M6100",
    reason: "Брак — пошкоджена упаковка",
    amount: 3490,
    status: "approved",
    createdAt: "26.05.2026",
  },
  {
    id: "RT-2026-0042",
    orderId: "VR-2026-0987",
    customer: "Олена Гриценко",
    item: "Шолом Kask Mojito³",
    reason: "Передумала",
    amount: 5990,
    status: "received",
    createdAt: "20.05.2026",
  },
  {
    id: "RT-2026-0040",
    orderId: "VR-2026-0954",
    customer: "Микола Бондаренко",
    item: "Specialized Riprock 24\"",
    reason: "Дитині не сподобався колір",
    amount: 22500,
    status: "refunded",
    createdAt: "12.05.2026",
  },
];

const statusLabel: Record<Status, string> = {
  initiated: "Новий",
  approved: "Підтверджено",
  rejected: "Відхилено",
  received: "Товар отримано",
  refunded: "Повернуто",
};

const statusColor: Record<Status, string> = {
  initiated: "text-[#2756ff] bg-[#2756ff]/10",
  approved: "text-[#f5a524] bg-[#f5a524]/10",
  rejected: "text-[#ef4444] bg-[#ef4444]/10",
  received: "text-[#a59bff] bg-[#a59bff]/10",
  refunded: "text-[#22c55e] bg-[#22c55e]/10",
};

export function ReturnsManager() {
  const [items, setItems] = useState(seed);
  const [state, setState] = useState({ search: "", filter: "all" });

  const counts = useMemo(
    () => ({
      all: items.length,
      initiated: items.filter((i) => i.status === "initiated").length,
      approved: items.filter((i) => i.status === "approved").length,
      received: items.filter((i) => i.status === "received").length,
      refunded: items.filter((i) => i.status === "refunded").length,
    }),
    [items],
  );

  const filtered = useMemo(() => {
    const q = state.search.trim().toLowerCase();
    return items.filter((r) => {
      if (state.filter !== "all" && r.status !== state.filter) return false;
      if (!q) return true;
      return (
        r.id.toLowerCase().includes(q) ||
        r.orderId.toLowerCase().includes(q) ||
        r.customer.toLowerCase().includes(q) ||
        r.item.toLowerCase().includes(q)
      );
    });
  }, [items, state]);

  const setStatus = (id: string, status: Status) =>
    setItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );

  return (
    <div className="space-y-5">
      <AdminToolbar
        searchPlaceholder="Пошук за № запиту, замовлення, клієнта…"
        filters={[
          { value: "all", label: "Усі", count: counts.all },
          { value: "initiated", label: "Нові", count: counts.initiated },
          { value: "approved", label: "Підтверджено", count: counts.approved },
          { value: "received", label: "Отримано", count: counts.received },
          { value: "refunded", label: "Повернуто", count: counts.refunded },
        ]}
        defaultFilter="all"
        onChange={(s) => setState(s)}
      />

      <ul className="space-y-3">
        {filtered.map((r) => (
          <li key={r.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-white">№ {r.id}</p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[r.status]}`}
                  >
                    {statusLabel[r.status]}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#7a82ad]">
                  Замовлення № {r.orderId} · {r.customer} · {r.createdAt}
                </p>
                <p className="mt-2 text-sm text-[#cfd3ef]">{r.item}</p>
                <p className="mt-1 text-xs text-[#7a82ad]">
                  Причина: {r.reason}
                </p>
              </div>
              <p className="text-lg font-bold text-white">
                {formatUAH(r.amount)}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {r.status === "initiated" && (
                <>
                  <button
                    type="button"
                    onClick={() => setStatus(r.id, "approved")}
                    className="rounded-lg border border-[#22c55e]/30 bg-[#22c55e]/10 px-3 py-1.5 text-xs font-semibold text-[#22c55e] transition-colors hover:bg-[#22c55e]/15"
                  >
                    Підтвердити
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(r.id, "rejected")}
                    className="rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 px-3 py-1.5 text-xs font-semibold text-[#ef4444] transition-colors hover:bg-[#ef4444]/15"
                  >
                    Відхилити
                  </button>
                </>
              )}
              {r.status === "approved" && (
                <button
                  type="button"
                  onClick={() => setStatus(r.id, "received")}
                  className="rounded-lg border border-[#a59bff]/30 bg-[#a59bff]/10 px-3 py-1.5 text-xs font-semibold text-[#a59bff] transition-colors hover:bg-[#a59bff]/15"
                >
                  Відмітити «товар отримано»
                </button>
              )}
              {r.status === "received" && (
                <button
                  type="button"
                  onClick={() => setStatus(r.id, "refunded")}
                  className="rounded-lg border border-[#22c55e]/30 bg-[#22c55e]/10 px-3 py-1.5 text-xs font-semibold text-[#22c55e] transition-colors hover:bg-[#22c55e]/15"
                >
                  Повернути кошти ({formatUAH(r.amount)})
                </button>
              )}
              {(r.status === "rejected" || r.status === "refunded") && (
                <span className="text-xs text-[#7a82ad]">
                  Запит закрито · фінальний стан
                </span>
              )}
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="card p-8 text-center text-sm text-[#7a82ad]">
            Запитів на повернення не знайдено.
          </li>
        )}
      </ul>
    </div>
  );
}
