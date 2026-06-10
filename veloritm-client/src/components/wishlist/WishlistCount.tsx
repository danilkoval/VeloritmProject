"use client";

import { useWishlist } from "./WishlistContext";

export function WishlistCount() {
  const { count } = useWishlist();
  return <>{count}</>;
}
