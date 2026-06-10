"use client";

import { useCartDrawer } from "./CartDrawerContext";
import { CartIcon } from "../ui/Icon";

export function CartButton() {
  const { open, itemCount } = useCartDrawer();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Кошик${itemCount ? `, ${itemCount}` : ""}`}
      className="relative flex items-center gap-2 rounded-lg p-2 text-white hover:bg-[#101533] transition-colors"
    >
      <CartIcon size={20} className="text-[#b9bee0]" />
      <span className="hidden lg:inline text-sm">Кошик</span>
      {itemCount > 0 && (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-r from-[#ff3d8b] to-[#ff7a3d] px-1 text-[10px] font-bold text-white"
        >
          {itemCount}
        </span>
      )}
    </button>
  );
}
