"use client";

import type { Product } from "@/lib/types";
import { useCartDrawer } from "../cart/CartDrawerContext";
import { useWishlist } from "../wishlist/WishlistContext";
import { CartIcon, HeartIcon, PlusIcon, MinusIcon } from "../ui/Icon";

export function WishlistToggleButton({ product }: { product: Product }) {
  const wishlist = useWishlist();
  const active = wishlist.has(product.slug);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        wishlist.toggle(product);
      }}
      aria-label={active ? "Видалити з обраного" : "Додати в обране"}
      aria-pressed={active}
      className={`grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-colors ${
        active
          ? "bg-[#ff3d8b] text-white"
          : "bg-[#06081a]/70 text-white hover:bg-[#ff3d8b]"
      }`}
    >
      <HeartIcon size={16} fill={active ? "currentColor" : "none"} />
    </button>
  );
}

export function AddToCartIconButton({ product }: { product: Product }) {
  const cart = useCartDrawer();
  const item = cart.items.find((i) => i.product.slug === product.slug);
  const outOfStock = product.availability === "OutOfStock";

  if (item) {
    return (
      <div
        className="flex w-full items-stretch rounded-lg border border-[#1f2750] bg-[#06081a] sm:inline-flex sm:w-auto"
        role="group"
        aria-label={`У кошику: ${item.quantity}`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            cart.setQuantity(product.slug, item.quantity - 1);
          }}
          aria-label="Зменшити кількість"
          className="grid h-10 flex-1 place-items-center text-[#b9bee0] hover:text-white sm:h-9 sm:w-9 sm:flex-none"
        >
          <MinusIcon size={16} />
        </button>
        <span className="grid h-10 flex-1 place-items-center border-x border-[#1f2750] px-2 text-sm font-semibold text-white tabular-nums sm:h-9 sm:min-w-8 sm:flex-none">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            cart.setQuantity(product.slug, item.quantity + 1);
          }}
          aria-label="Збільшити кількість"
          className="grid h-10 flex-1 place-items-center text-[#b9bee0] hover:text-white sm:h-9 sm:w-9 sm:flex-none"
        >
          <PlusIcon size={16} />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        if (!outOfStock) cart.addItem(product, 1);
      }}
      disabled={outOfStock}
      aria-label="Додати у кошик"
      className="btn btn-primary w-full justify-center disabled:opacity-50 sm:w-auto sm:!p-2.5"
    >
      <CartIcon size={16} />
      <span className="sm:hidden">{outOfStock ? "Немає" : "В кошик"}</span>
    </button>
  );
}
