"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon } from "@/components/ui/Icon";
import { IconButton } from "./IconButton";

interface Promo {
  code: string;
  discount: string;
  used: number;
  limit: number | null;
  validUntil: string;
  active: boolean;
}

const seed: Promo[] = [
  {
    code: "SPRING10",
    discount: "-10%",
    used: 42,
    limit: 200,
    validUntil: "30.06.2026",
    active: true,
  },
  {
    code: "FREEDELIVERY",
    discount: "Безкоштовна доставка",
    used: 18,
    limit: null,
    validUntil: "31.12.2026",
    active: true,
  },
  {
    code: "NEWBIKE2025",
    discount: "-1500 ₴",
    used: 96,
    limit: 100,
    validUntil: "01.01.2026",
    active: false,
  },
];

export function PromoManager() {
  const [promos, setPromos] = useState(seed);
  const [draft, setDraft] = useState({ code: "", discount: "", validUntil: "" });

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.code.trim()) return;
    setPromos((prev) => [
      {
        code: draft.code.toUpperCase().trim(),
        discount: draft.discount || "-10%",
        used: 0,
        limit: null,
        validUntil: draft.validUntil || "31.12.2026",
        active: true,
      },
      ...prev,
    ]);
    setDraft({ code: "", discount: "", validUntil: "" });
  };

  const toggle = (code: string) =>
    setPromos((prev) =>
      prev.map((p) => (p.code === code ? { ...p, active: !p.active } : p)),
    );

  const remove = (code: string) =>
    setPromos((prev) => prev.filter((p) => p.code !== code));

  return (
    <div className="space-y-5">
      <form
        onSubmit={create}
        className="card grid gap-3 p-5 sm:grid-cols-[1fr_1fr_1fr_auto]"
      >
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
            Код
          </span>
          <input
            type="text"
            value={draft.code}
            onChange={(e) => setDraft((d) => ({ ...d, code: e.target.value }))}
            placeholder="SUMMER2026"
            className="field-dark mt-1 uppercase"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
            Знижка
          </span>
          <input
            type="text"
            value={draft.discount}
            onChange={(e) =>
              setDraft((d) => ({ ...d, discount: e.target.value }))
            }
            placeholder="-10% або -500 ₴"
            className="field-dark mt-1"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
            Діє до
          </span>
          <input
            type="date"
            value={draft.validUntil}
            onChange={(e) =>
              setDraft((d) => ({ ...d, validUntil: e.target.value }))
            }
            className="field-dark mt-1"
          />
        </label>
        <button type="submit" className="btn btn-primary self-end">
          <PlusIcon size={16} /> Створити
        </button>
      </form>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-[#1f2750] text-left text-xs uppercase tracking-wider text-[#7a82ad]">
              <tr>
                <th className="px-5 py-3 font-semibold">Код</th>
                <th className="px-5 py-3 font-semibold">Знижка</th>
                <th className="px-5 py-3 font-semibold">Використань</th>
                <th className="px-5 py-3 font-semibold">Діє до</th>
                <th className="px-5 py-3 font-semibold">Статус</th>
                <th className="px-5 py-3 font-semibold text-right">Дії</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((p) => (
                <tr
                  key={p.code}
                  className="border-b border-[#1f2750]/60 last:border-0 hover:bg-[#141a3d]/60"
                >
                  <td className="px-5 py-3 font-mono font-semibold text-white">
                    {p.code}
                  </td>
                  <td className="px-5 py-3 text-[#cfd3ef]">{p.discount}</td>
                  <td className="px-5 py-3 text-white">
                    {p.used}
                    {p.limit !== null && (
                      <span className="text-[#7a82ad]"> / {p.limit}</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-[#cfd3ef]">{p.validUntil}</td>
                  <td className="px-5 py-3">
                    <button
                      type="button"
                      onClick={() => toggle(p.code)}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        p.active
                          ? "text-[#22c55e] bg-[#22c55e]/10"
                          : "text-[#7a82ad] bg-[#101533]"
                      }`}
                    >
                      {p.active ? "Активний" : "Вимкнено"}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <IconButton
                        label="Видалити промокод"
                        variant="danger"
                        onClick={() => remove(p.code)}
                      >
                        <TrashIcon size={14} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
              {promos.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-[#7a82ad]"
                  >
                    Промокодів немає. Створіть перший вище.
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
