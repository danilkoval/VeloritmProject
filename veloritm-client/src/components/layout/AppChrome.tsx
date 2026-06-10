"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { CartDrawerProvider } from "../cart/CartDrawerContext";
import { CartDrawer } from "../cart/CartDrawer";
import { WishlistProvider } from "../wishlist/WishlistContext";

const HIDDEN_PREFIXES = ["/login", "/register"];

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const hideChrome = HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (hideChrome) {
    return (
      <>
        <ScrollToTop />
        {children}
      </>
    );
  }

  return (
    <WishlistProvider>
      <CartDrawerProvider>
        <ScrollToTop />
        <Header />
        <main id="main" className="min-h-[60vh]">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </CartDrawerProvider>
    </WishlistProvider>
  );
}
