"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartDrawer } from "./CartDrawerContext";
import { formatUAH } from "@/lib/format";
import {
  ArrowRightIcon,
  CheckIcon,
  ShieldIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "../ui/Icon";

export function CartPageContent() {
  const { items, subtotal, setQuantity, remove } = useCartDrawer();

  if (items.length === 0) {
    return (
      <div className="card mt-8 flex flex-col items-center gap-3 p-12 text-center">
        <p className="text-lg font-semibold text-white">Кошик порожній</p>
        <p className="text-sm text-[#7a82ad]">
          Подивіться каталог — там понад 500 моделей.
        </p>
        <Link href="/catalog" className="btn btn-primary">
          До каталогу <ArrowRightIcon size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <ul className="space-y-3">
        {items.map(({ product, quantity }) => (
          <li
            key={product.slug}
            className="flex gap-3 rounded-2xl border border-[#1f2750] bg-[#06081a] p-3 sm:gap-4 sm:p-4"
          >
            <Link
              href={`/product/${product.slug}`}
              className="relative block aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-[#101533] sm:w-28"
            >
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-cover"
                />
              )}
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-[#7a82ad]">{product.brand}</p>
                  <Link
                    href={`/product/${product.slug}`}
                    className="line-clamp-2 text-sm font-semibold text-white hover:text-[#ff3d8b] sm:text-base"
                  >
                    {product.title}
                  </Link>
                  <p className="mt-1 hidden text-xs text-[#7a82ad] sm:block">
                    {product.availability === "InStock"
                      ? "В наявності"
                      : product.availability === "LimitedAvailability"
                        ? `Залишилось мало (${product.stock} шт.)`
                        : "Немає в наявності"}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-bold text-white tabular-nums sm:text-base">
                  {formatUAH(product.price * quantity)}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                <div className="inline-flex items-center rounded-lg border border-[#1f2750]">
                  <button
                    type="button"
                    onClick={() => setQuantity(product.slug, quantity - 1)}
                    aria-label="Зменшити"
                    className="grid h-8 w-8 place-items-center text-[#b9bee0] hover:text-white"
                  >
                    <MinusIcon size={14} />
                  </button>
                  <span className="border-x border-[#1f2750] px-3 py-1 text-sm text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(product.slug, quantity + 1)}
                    aria-label="Збільшити"
                    className="grid h-8 w-8 place-items-center text-[#b9bee0] hover:text-white"
                  >
                    <PlusIcon size={14} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => remove(product.slug)}
                  aria-label="Видалити товар"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-[#1f2750] text-[#7a82ad] hover:border-[#ef4444]/40 hover:text-[#ef4444] transition-colors"
                >
                  <TrashIcon size={14} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="card h-fit space-y-5 p-6">
        <h2 className="text-lg font-bold text-white">Ваше замовлення</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-[#7a82ad]">Сума товарів</dt>
            <dd className="text-white">{formatUAH(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-[#7a82ad]">Доставка</dt>
            <dd className="text-[#cfd3ef]">Розрахується далі</dd>
          </div>
          <div className="flex items-center justify-between border-t border-[#1f2750] pt-3 text-base">
            <dt className="text-white">До оплати</dt>
            <dd className="text-xl font-black text-white">{formatUAH(subtotal)}</dd>
          </div>
        </dl>
        <Link href="/checkout" className="btn btn-primary w-full !py-3.5 text-base">
          Оформити замовлення
          <ArrowRightIcon size={18} />
        </Link>
        <ul className="space-y-2 text-xs text-[#7a82ad]">
          <li className="flex items-center gap-2">
            <ShieldIcon size={14} className="text-[#22c55e]" />
            Офіційна гарантія від виробника
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon size={14} className="text-[#22c55e]" />
            Повернення протягом 14 днів
          </li>
        </ul>
      </aside>
    </div>
  );
}
