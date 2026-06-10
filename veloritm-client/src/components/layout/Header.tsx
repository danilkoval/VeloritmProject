import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "../ui/Logo";
import { SearchBar } from "./SearchBar";
import { TopBar } from "./TopBar";
import { CategoryNav } from "./CategoryNav";
import { UserIcon } from "../ui/Icon";
import { CartButton } from "../cart/CartButton";
import { WishlistHeaderLink } from "../wishlist/WishlistHeaderLink";
import { HeaderShell } from "./HeaderShell";

const SearchBarFallback = () => (
  <div className="h-12 w-full rounded-2xl border border-[#2c356b] bg-[#101533]" />
);

export function Header() {
  return (
    <HeaderShell>
      <TopBar />
      <div className="container-app grid grid-cols-[auto_1fr_auto] items-center gap-6 py-4">
        <Logo />
        <div className="hidden md:block">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <CartButton />
          <WishlistHeaderLink />
          <Link
            href="/account"
            aria-label="Особистий кабінет"
            className="flex items-center gap-2 rounded-lg p-2 text-sm text-white hover:bg-[#101533] transition-colors sm:px-3"
          >
            <UserIcon size={20} className="text-[#b9bee0]" />
            <span className="hidden lg:inline">Кабінет</span>
          </Link>
        </div>
      </div>
      <div className="container-app pb-4 md:hidden">
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </div>
      <CategoryNav />
    </HeaderShell>
  );
}
