"use client";

import type { Product } from "@/lib/types";
import { useCartDrawer } from "../cart/CartDrawerContext";
import { useWishlist } from "../wishlist/WishlistContext";
import { CartIcon, HeartIcon, CheckIcon } from "../ui/Icon";

export function ProductActions({ product }: { product: Product }) {
  const cart = useCartDrawer();
  const wishlist = useWishlist();
  const outOfStock = product.availability === "OutOfStock";
  const inWishlist = wishlist.has(product.slug);
  const inCart = cart.has(product.slug);

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => !outOfStock && cart.addItem(product, 1)}
        disabled={outOfStock}
        className="btn btn-primary !px-7 !py-3.5 text-base disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {inCart ? <CheckIcon size={18} /> : <CartIcon size={18} />}
        {outOfStock
          ? "Сповістити, коли з'явиться"
          : inCart
            ? "У кошику · додати ще"
            : "Додати в кошик"}
      </button>
      <button
        type="button"
        onClick={() => wishlist.toggle(product)}
        aria-pressed={inWishlist}
        className={`btn !px-5 !py-3.5 text-base transition-colors ${
          inWishlist
            ? "!border !border-[#ff3d8b] !bg-[#ff3d8b]/10 !text-[#ff3d8b]"
            : "btn-secondary"
        }`}
      >
        <HeartIcon
          size={18}
          fill={inWishlist ? "currentColor" : "none"}
          stroke={inWishlist ? "currentColor" : "currentColor"}
        />
        {inWishlist ? "У бажаному" : "У бажане"}
      </button>
    </div>
  );
}
