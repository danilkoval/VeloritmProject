"use client";

import { useState } from "react";
import { useCartDrawer } from "./CartDrawerContext";
import { formatUAH } from "@/lib/format";

export function CheckoutSummary() {
  const { items, subtotal } = useCartDrawer();
  const [promo, setPromo] = useState("");

  return (
    <aside className="card h-fit space-y-5 p-6 lg:sticky lg:top-44">
      <h2 className="text-lg font-bold text-white">Ваше замовлення</h2>
      {items.length === 0 ? (
        <p className="text-sm text-[#7a82ad]">
          Кошик порожній. Поверніться до каталогу та додайте товари.
        </p>
      ) : (
        <>
          <ul className="space-y-3 text-sm">
            {items.map((i) => (
              <li
                key={i.product.slug}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-[#cfd3ef]">
                  {i.product.title} × {i.quantity}
                </span>
                <span className="text-white tabular-nums">
                  {formatUAH(i.product.price * i.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 border-t border-[#1f2750] pt-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-[#7a82ad]">Сума товарів</dt>
              <dd className="text-white">{formatUAH(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#7a82ad]">Доставка</dt>
              <dd className="text-[#cfd3ef]">Розрахується далі</dd>
            </div>
            <div className="flex justify-between border-t border-[#1f2750] pt-3 text-base">
              <dt className="text-white">До оплати</dt>
              <dd className="text-xl font-black text-white">{formatUAH(subtotal)}</dd>
            </div>
          </dl>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a82ad]">
              Промокод
            </span>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="VELORITM10"
                className="field-dark flex-1 !py-2.5"
              />
              <button type="button" className="btn btn-secondary !px-4 !py-2.5">
                Застосувати
              </button>
            </div>
          </label>
        </>
      )}
      <button
        type="submit"
        disabled={items.length === 0}
        className="btn btn-primary w-full !py-3.5 text-base disabled:opacity-50"
      >
        Підтвердити замовлення
      </button>
      <p className="text-xs text-[#7a82ad]">
        Натискаючи кнопку, ви погоджуєтесь з{" "}
        <a href="/offer" className="underline">
          Публічною офертою
        </a>
        .
      </p>
    </aside>
  );
}
