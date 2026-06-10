"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/types";

const STORAGE_KEY = "veloritm:wishlist";

interface WishlistContextValue {
  items: Product[];
  count: number;
  has: (slug: string) => boolean;
  add: (product: Product) => void;
  remove: (slug: string) => void;
  toggle: (product: Product) => void;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once on mount. Done after first paint so SSR markup
  // matches what the client renders before hydration (count is 0 on both).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore; user can still use wishlist in-session
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota / private mode
    }
  }, [items, hydrated]);

  const add = useCallback((product: Product) => {
    setItems((prev) =>
      prev.some((i) => i.slug === product.slug) ? prev : [...prev, product],
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const toggle = useCallback((product: Product) => {
    setItems((prev) =>
      prev.some((i) => i.slug === product.slug)
        ? prev.filter((i) => i.slug !== product.slug)
        : [...prev, product],
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      count: items.length,
      has: (slug: string) => items.some((i) => i.slug === slug),
      add,
      remove,
      toggle,
      clear,
    }),
    [items, add, remove, toggle, clear],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
