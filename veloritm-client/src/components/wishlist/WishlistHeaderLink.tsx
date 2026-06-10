"use client";

import Link from "next/link";
import { useWishlist } from "./WishlistContext";
import { HeartIcon } from "../ui/Icon";

export function WishlistHeaderLink() {
  const { count } = useWishlist();
  return (
    <Link
      href="/account/wishlist"
      aria-label={`Список бажань${count ? `, ${count}` : ""}`}
      className="relative flex items-center gap-2 rounded-lg p-2 text-white hover:bg-[#101533] transition-colors"
    >
      <HeartIcon size={20} className="text-[#b9bee0]" />
      {count > 0 && (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-r from-[#ff3d8b] to-[#ff7a3d] px-1 text-[10px] font-bold text-white"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
