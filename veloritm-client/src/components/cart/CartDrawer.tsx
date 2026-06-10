"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartDrawer } from "./CartDrawerContext";
import { formatUAH } from "@/lib/format";
import {
  CartIcon,
  CloseIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ArrowRightIcon,
} from "../ui/Icon";

const pluralForms = (n: number, forms: [string, string, string]) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
};

export function CartDrawer() {
  const { isOpen, close, items, itemCount, subtotal, setQuantity, remove } = useCartDrawer();

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={close}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Кошик"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[440px] flex-col border-l border-[#1f2750] bg-[#0a0e23] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between gap-3 border-b border-[#1f2750] px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#101533] text-[#ff3d8b]">
              <CartIcon size={20} />
            </span>
            <div>
              <p className="text-lg font-bold text-white">Кошик</p>
              <p className="text-xs text-[#7a82ad]">
                {itemCount > 0
                  ? `${itemCount} ${pluralForms(itemCount, ["поз.", "поз.", "поз."])}`
                  : "Порожньо"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Закрити кошик"
            className="grid h-10 w-10 place-items-center rounded-xl text-[#b9bee0] hover:bg-[#101533] hover:text-white transition-colors"
          >
            <CloseIcon size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-[#101533] text-[#7a82ad]">
                <CartIcon size={28} />
              </span>
              <p className="text-base font-semibold text-white">Кошик порожній</p>
              <p className="text-sm text-[#7a82ad]">
                Додайте товари з каталогу — є понад 500 моделей.
              </p>
              <Link
                href="/catalog"
                onClick={close}
                className="btn btn-primary mt-2"
              >
                До каталогу
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.slug}
                  className="flex gap-3 rounded-2xl border border-[#1f2750] bg-[#06081a] p-3"
                >
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={close}
                    className="relative block aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-[#101533]"
                  >
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        sizes="80px"
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
                          onClick={close}
                          className="line-clamp-2 text-sm font-semibold text-white hover:text-[#ff3d8b]"
                        >
                          {product.title}
                        </Link>
                      </div>
                      <p className="shrink-0 text-sm font-bold text-white tabular-nums">
                        {formatUAH(product.price * quantity)}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                      <div className="inline-flex items-center rounded-lg border border-[#1f2750]">
                        <button
                          type="button"
                          onClick={() => setQuantity(product.slug, quantity - 1)}
                          aria-label="Зменшити кількість"
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
                          aria-label="Збільшити кількість"
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
          )}
        </div>

        {items.length > 0 && (
          <footer className="space-y-4 border-t border-[#1f2750] px-6 py-5">
            <dl className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-[#7a82ad]">Доставка</dt>
                <dd className="text-[#cfd3ef]">Розрахується далі</dd>
              </div>
              <div className="flex items-center justify-between border-t border-[#1f2750] pt-3">
                <dt className="text-base text-white">Разом</dt>
                <dd className="text-2xl font-black text-white">{formatUAH(subtotal)}</dd>
              </div>
            </dl>
            <div className="space-y-2">
              <Link
                href="/cart"
                onClick={close}
                className="btn btn-secondary w-full !py-3 text-sm"
              >
                Перейти в кошик
              </Link>
              <Link
                href="/checkout"
                onClick={close}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2756ff] py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-[#1d44e0]"
              >
                Оформити
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}
