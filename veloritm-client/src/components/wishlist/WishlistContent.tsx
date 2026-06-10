"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "./WishlistContext";
import { useCartDrawer } from "../cart/CartDrawerContext";
import { formatUAH } from "@/lib/format";
import {
  ArrowRightIcon,
  HeartIcon,
  CartIcon,
  CheckIcon,
  TrashIcon,
  StarIcon,
} from "../ui/Icon";

export function WishlistContent() {
  const { items, remove, clear } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-3 p-12 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#101533] text-[#7a82ad]">
          <HeartIcon size={28} />
        </span>
        <p className="text-lg font-semibold text-white">Список бажань порожній</p>
        <p className="max-w-sm text-sm text-[#7a82ad]">
          Додавайте товари серцем — вони збережуться тут, навіть якщо повернетесь
          з іншого пристрою.
        </p>
        <Link href="/catalog" className="btn btn-primary mt-2">
          До каталогу <ArrowRightIcon size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#7a82ad]">
          У бажаному:{" "}
          <span className="font-semibold text-white">{items.length}</span>{" "}
          {items.length === 1 ? "товар" : items.length < 5 ? "товари" : "товарів"}
        </p>
        <button
          type="button"
          onClick={() => {
            if (confirm("Очистити весь список бажань?")) clear();
          }}
          className="inline-flex items-center gap-1 text-sm text-[#7a82ad] hover:text-[#ef4444] transition-colors"
        >
          <TrashIcon size={14} /> Очистити список
        </button>
      </header>

      <ul className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        {items.map((product) => (
          <WishlistItem key={product.slug} product={product} onRemove={() => remove(product.slug)} />
        ))}
      </ul>
    </div>
  );
}

function WishlistItem({
  product,
  onRemove,
}: {
  product: import("@/lib/types").Product;
  onRemove: () => void;
}) {
  const cart = useCartDrawer();
  const inCart = cart.has(product.slug);
  const outOfStock = product.availability === "OutOfStock";

  return (
    <li className="card group relative flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0e23]">
        <Link
          href={`/product/${product.slug}`}
          aria-label={product.title}
          className="absolute inset-0 block"
        >
          {product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </Link>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Прибрати зі списку бажань"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-[#06081a]/70 text-white backdrop-blur transition-colors hover:bg-[#ef4444]"
        >
          <TrashIcon size={14} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-[#7a82ad]">{product.brand}</span>
          {product.rating && product.reviewCount && (
            <span className="flex items-center gap-1 text-[#b9bee0]">
              <StarIcon size={12} className="text-[#f5a524]" />
              {product.rating.toFixed(1)}
            </span>
          )}
        </div>
        <h3 className="text-base font-semibold leading-snug text-white">
          <Link href={`/product/${product.slug}`} className="hover:text-[#ff3d8b]">
            {product.title}
          </Link>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            {product.oldPrice && (
              <p className="text-xs text-[#5a6190] line-through">
                {formatUAH(product.oldPrice)}
              </p>
            )}
            <p className="text-lg font-bold text-white">{formatUAH(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => !outOfStock && cart.addItem(product, 1)}
            disabled={outOfStock}
            aria-label={inCart ? "Додати ще один" : "Додати у кошик"}
            className="btn btn-primary !p-2.5 disabled:opacity-50"
          >
            {inCart ? <CheckIcon size={16} /> : <CartIcon size={16} />}
          </button>
        </div>
      </div>
    </li>
  );
}
