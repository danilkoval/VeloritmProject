"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  CloseIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/ui/Icon";

type Mode = "restock" | "writeoff";

export interface StockAdjustTarget {
  slug: string;
  title: string;
  brand: string;
  image?: string;
  stock: number;
}

interface Props {
  target: StockAdjustTarget;
  onClose: () => void;
  onApply: (payload: {
    slug: string;
    mode: Mode;
    qty: number;
    note: string;
    newStock: number;
  }) => void;
}

export function StockAdjustDialog({ target, onClose, onApply }: Props) {
  const [mode, setMode] = useState<Mode>("restock");
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const maxQty = mode === "writeoff" ? target.stock : Number.MAX_SAFE_INTEGER;
  const safeQty = Math.min(maxQty, Math.max(1, qty));
  const delta = mode === "writeoff" ? -safeQty : safeQty;
  const newStock = target.stock + delta;

  const switchMode = (m: Mode) => {
    setMode(m);
    if (m === "writeoff" && qty > target.stock) {
      setQty(Math.max(1, target.stock));
    }
  };

  const accent = mode === "writeoff" ? "#ef4444" : "#22c55e";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="stock-adjust-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#06081a]/80 p-4 backdrop-blur"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-[#1f2750] bg-[#0a0e23] shadow-2xl shadow-black/40">
        <header className="flex items-start justify-between gap-3 border-b border-[#1f2750] p-5">
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#101533]">
              {target.image && (
                <Image
                  src={target.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <p
                id="stock-adjust-title"
                className="text-base font-semibold text-white"
              >
                {target.title}
              </p>
              <p className="text-xs text-[#7a82ad]">
                {target.brand} · поточний залишок{" "}
                <span className="font-semibold text-white">
                  {target.stock} шт.
                </span>
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Закрити"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg border border-[#1f2750] text-[#cfd3ef] transition-colors hover:border-[#2c356b] hover:text-white"
          >
            <CloseIcon size={14} />
          </button>
        </header>

        <div className="space-y-5 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
              Тип операції
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => switchMode("restock")}
                className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                  mode === "restock"
                    ? "border-[#22c55e]/40 bg-[#22c55e]/10 text-[#22c55e]"
                    : "border-[#1f2750] text-[#cfd3ef] hover:border-[#2c356b] hover:text-white"
                }`}
              >
                Поповнення
              </button>
              <button
                type="button"
                onClick={() => switchMode("writeoff")}
                className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                  mode === "writeoff"
                    ? "border-[#ef4444]/40 bg-[#ef4444]/10 text-[#ef4444]"
                    : "border-[#1f2750] text-[#cfd3ef] hover:border-[#2c356b] hover:text-white"
                }`}
              >
                Списання
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
                Кількість
              </p>
              <div className="mt-2 flex items-center gap-1 rounded-xl border border-[#1f2750] p-1">
                <button
                  type="button"
                  aria-label="Менше"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={safeQty <= 1}
                  className="grid h-11 w-11 place-items-center rounded-lg text-[#cfd3ef] hover:bg-[#101533] hover:text-white disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <MinusIcon size={16} />
                </button>
                <div className="flex flex-1 items-center justify-center">
                  {mode === "writeoff" && (
                    <span
                      aria-hidden
                      className="text-base font-semibold leading-none"
                      style={{ color: accent }}
                    >
                      −
                    </span>
                  )}
                  <input
                    type="number"
                    size={3}
                    min={1}
                    max={mode === "writeoff" ? target.stock : undefined}
                    value={safeQty}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      const next = Number.isFinite(v) ? Math.abs(v) : 1;
                      setQty(Math.min(maxQty, Math.max(1, next)));
                    }}
                    className="w-12 bg-transparent text-center text-base font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style={{ color: accent }}
                  />
                </div>
                <button
                  type="button"
                  aria-label="Більше"
                  onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                  disabled={safeQty >= maxQty}
                  className="grid h-11 w-11 place-items-center rounded-lg text-[#cfd3ef] hover:bg-[#101533] hover:text-white disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <PlusIcon size={16} />
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
                Новий залишок
              </p>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#1f2750] bg-[#06081a] px-4 py-2.5">
                <span className="text-sm text-[#7a82ad]">{target.stock} шт.</span>
                <span className="text-[#5a6190]">→</span>
                <span className="text-lg font-bold text-white">{newStock} шт.</span>
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
                    mode === "writeoff"
                      ? "text-[#ef4444] bg-[#ef4444]/10"
                      : "text-[#22c55e] bg-[#22c55e]/10"
                  }`}
                >
                  {mode === "writeoff" ? "−" : "+"}
                  {safeQty}
                </span>
              </div>
            </div>
          </div>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
              Коментар (для аудит-логу)
            </span>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Накладна № 2026/05/210"
              className="field-dark mt-2"
            />
          </label>
        </div>

        <footer className="flex items-center justify-end gap-2 border-t border-[#1f2750] p-5">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost"
          >
            Скасувати
          </button>
          <button
            type="button"
            onClick={() =>
              onApply({ slug: target.slug, mode, qty: safeQty, note, newStock })
            }
            className="btn btn-primary"
            disabled={safeQty < 1 || (mode === "writeoff" && target.stock === 0)}
          >
            Застосувати
          </button>
        </footer>
      </div>
    </div>
  );
}
