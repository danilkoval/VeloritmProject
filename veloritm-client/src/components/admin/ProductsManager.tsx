"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdminToolbar } from "./AdminToolbar";
import {
  PlusIcon,
  SlidersIcon,
  TrashIcon,
  WrenchIcon,
} from "@/components/ui/Icon";
import { formatUAH } from "@/lib/format";
import type { Product } from "@/lib/types";
import { StockAdjustDialog } from "./StockAdjustDialog";
import { IconButton } from "./IconButton";

type Filter = "all" | "in" | "low" | "out" | "reserved";

interface Row {
  slug: string;
  title: string;
  brand: string;
  price: number;
  image: string | undefined;
  stock: number;
  reserved: number;
  threshold: number;
}

const availabilityLabel = {
  InStock: "В наявності",
  LimitedAvailability: "Залишилось",
  OutOfStock: "Немає в наявності",
} as const;

const availabilityShort = {
  InStock: "В наявності",
  LimitedAvailability: "Залишилось",
  OutOfStock: "Немає",
} as const;

const availabilityColor = {
  InStock: "text-[#22c55e] bg-[#22c55e]/10",
  LimitedAvailability: "text-[#f5a524] bg-[#f5a524]/10",
  OutOfStock: "text-[#ef4444] bg-[#ef4444]/10",
} as const;

const deriveStatus = (row: Row): keyof typeof availabilityLabel => {
  if (row.stock === 0) return "OutOfStock";
  if (row.stock <= row.threshold) return "LimitedAvailability";
  return "InStock";
};

export function ProductsManager({ products }: { products: Product[] }) {
  const [rows, setRows] = useState<Row[]>(() =>
    products.map((p, i) => ({
      slug: p.slug,
      title: p.title,
      brand: p.brand,
      price: p.price,
      image: p.images[0],
      stock: p.stock,
      reserved: [3, 1, 0, 2, 0, 1, 4, 2][i % 8],
      threshold: 5,
    })),
  );
  const [state, setState] = useState({ search: "", filter: "all" as Filter });
  const [adjustSlug, setAdjustSlug] = useState<string | null>(null);

  const counts = useMemo(() => {
    return rows.reduce(
      (acc, r) => {
        const status = deriveStatus(r);
        acc.all += 1;
        if (status === "InStock") acc.in += 1;
        if (status === "LimitedAvailability") acc.low += 1;
        if (status === "OutOfStock") acc.out += 1;
        if (r.reserved > 0) acc.reserved += 1;
        return acc;
      },
      { all: 0, in: 0, low: 0, out: 0, reserved: 0 },
    );
  }, [rows]);

  const filtered = useMemo(() => {
    const q = state.search.trim().toLowerCase();
    return rows.filter((r) => {
      const status = deriveStatus(r);
      if (state.filter === "in" && status !== "InStock") return false;
      if (state.filter === "low" && status !== "LimitedAvailability") return false;
      if (state.filter === "out" && status !== "OutOfStock") return false;
      if (state.filter === "reserved" && r.reserved === 0) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.brand.toLowerCase().includes(q) ||
        r.slug.toLowerCase().includes(q)
      );
    });
  }, [rows, state]);

  const remove = (slug: string) =>
    setRows((prev) => prev.filter((r) => r.slug !== slug));

  const adjustTarget = adjustSlug
    ? rows.find((r) => r.slug === adjustSlug)
    : undefined;

  return (
    <div className="space-y-5">
      <AdminToolbar
        searchPlaceholder="Пошук за назвою або брендом…"
        filters={[
          { value: "all", label: "Усі", count: counts.all },
          { value: "in", label: "В наявності", count: counts.in },
          { value: "low", label: "Залишилось мало", count: counts.low },
          { value: "out", label: "Немає", count: counts.out },
          { value: "reserved", label: "З резервами", count: counts.reserved },
        ]}
        defaultFilter="all"
        onChange={(s) =>
          setState({ search: s.search, filter: s.filter as Filter })
        }
        action={
          <Link href="/admin/products/new" className="btn btn-primary">
            <PlusIcon size={16} /> Новий товар
          </Link>
        }
      />

      <div className="card overflow-hidden">
        {/* Mobile list — < md */}
        <ul className="md:hidden">
          {filtered.map((r) => {
            const status = deriveStatus(r);
            const low = r.stock <= r.threshold;
            return (
              <li
                key={r.slug}
                className="border-b border-[#1f2750]/60 px-4 py-3 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#0a0e23]">
                    {r.image && (
                      <Image
                        src={r.image}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {r.title}
                    </p>
                    <p className="text-xs text-[#7a82ad]">{r.brand}</p>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-white tabular-nums">
                    {formatUAH(r.price)}
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-[90px_44px_1fr_auto] items-center gap-2 text-xs">
                  <span
                    className={`rounded-full px-2 py-0.5 text-center font-semibold ${availabilityColor[status]}`}
                  >
                    {availabilityShort[status]}
                  </span>
                  <span
                    className={`font-semibold tabular-nums ${low ? "text-[#f5a524]" : "text-white"}`}
                  >
                    {r.stock} шт.
                  </span>
                  <span className="truncate text-[#cfd3ef]">
                    резерв {r.reserved}
                  </span>
                  <div className="flex shrink-0 items-center gap-1">
                    <IconButton
                      label="Коригувати залишок"
                      variant="primary"
                      onClick={() => setAdjustSlug(r.slug)}
                    >
                      <SlidersIcon size={14} />
                    </IconButton>
                    <IconButton
                      label="Редагувати"
                      href={`/admin/products/${r.slug}/edit`}
                    >
                      <WrenchIcon size={14} />
                    </IconButton>
                    <IconButton
                      label="Видалити"
                      variant="danger"
                      onClick={() => remove(r.slug)}
                    >
                      <TrashIcon size={14} />
                    </IconButton>
                  </div>
                </div>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="px-5 py-10 text-center text-sm text-[#7a82ad]">
              Нічого не знайдено.
            </li>
          )}
        </ul>

        {/* Desktop table — md+ */}
        <table className="hidden w-full table-fixed text-sm md:table">
          <colgroup>
            <col />
            <col className="w-[14%]" />
            <col className="w-[14%]" />
            <col className="w-[12%]" />
            <col className="w-[16%]" />
            <col className="w-[120px]" />
          </colgroup>
          <thead className="border-b border-[#1f2750] text-left text-xs uppercase tracking-wider text-[#7a82ad]">
            <tr>
              <th className="px-5 py-3 font-semibold">Товар</th>
              <th className="px-5 py-3 font-semibold">Ціна</th>
              <th className="px-5 py-3 font-semibold">Залишок</th>
              <th className="px-5 py-3 font-semibold">Резерви</th>
              <th className="px-5 py-3 font-semibold">Статус</th>
              <th className="px-5 py-3 font-semibold text-right">Дії</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const status = deriveStatus(r);
              const low = r.stock <= r.threshold;
              return (
                <tr
                  key={r.slug}
                  className="border-b border-[#1f2750]/60 last:border-0 hover:bg-[#141a3d]/60"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#0a0e23]">
                        {r.image && (
                          <Image
                            src={r.image}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-white">
                          {r.title}
                        </p>
                        <p className="text-xs text-[#7a82ad]">{r.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-white">{formatUAH(r.price)}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`font-semibold ${low ? "text-[#f5a524]" : "text-white"}`}
                    >
                      {r.stock} шт.
                    </span>
                    {low && r.stock > 0 && (
                      <p className="text-[10px] uppercase tracking-wider text-[#f5a524]">
                        нижче порога ({r.threshold})
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-3 text-[#cfd3ef]">{r.reserved} шт.</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${availabilityColor[status]}`}
                    >
                      {availabilityLabel[status]}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <IconButton
                        label="Коригувати залишок"
                        variant="primary"
                        onClick={() => setAdjustSlug(r.slug)}
                      >
                        <SlidersIcon size={14} />
                      </IconButton>
                      <IconButton
                        label="Редагувати"
                        href={`/admin/products/${r.slug}/edit`}
                      >
                        <WrenchIcon size={14} />
                      </IconButton>
                      <IconButton
                        label="Видалити"
                        variant="danger"
                        onClick={() => remove(r.slug)}
                      >
                        <TrashIcon size={14} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-[#7a82ad]"
                >
                  Нічого не знайдено.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {adjustTarget && (
        <StockAdjustDialog
          target={{
            slug: adjustTarget.slug,
            title: adjustTarget.title,
            brand: adjustTarget.brand,
            image: adjustTarget.image,
            stock: adjustTarget.stock,
          }}
          onClose={() => setAdjustSlug(null)}
          onApply={({ slug, newStock }) => {
            setRows((prev) =>
              prev.map((r) => (r.slug === slug ? { ...r, stock: newStock } : r)),
            );
            setAdjustSlug(null);
          }}
        />
      )}
    </div>
  );
}
