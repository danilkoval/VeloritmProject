import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatUAH } from "@/lib/format";
import { StarIcon } from "../ui/Icon";
import { WishlistToggleButton, AddToCartIconButton } from "./ProductCardActions";

const badgeStyles: Record<string, string> = {
  hit: "bg-gradient-to-r from-[#ff3d8b] to-[#ff7a3d] text-white",
  new: "bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30",
  sale: "bg-[#f5a524]/20 text-[#f5a524] border border-[#f5a524]/30",
};

const badgeLabel: Record<string, string> = {
  hit: "Хіт",
  new: "Новинка",
  sale: "Знижка",
};

export function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.availability === "OutOfStock";
  const availabilityLabel = outOfStock ? "Немає в наявності" : "В наявності";
  const availabilityColor = outOfStock ? "text-[#ef4444]" : "text-[#22c55e]";

  return (
    <article className="group card overflow-hidden flex flex-col transition-all hover:border-[#2c356b] hover:shadow-2xl hover:shadow-pink-500/5">
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
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </Link>
        {product.badges && product.badges.length > 0 && (
          <ul className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col gap-1.5">
            {product.badges.map((b) => (
              <li
                key={b}
                className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badgeStyles[b]}`}
              >
                {badgeLabel[b]}
              </li>
            ))}
          </ul>
        )}
        <div className="absolute right-3 top-3 z-10">
          <WishlistToggleButton product={product} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-[#7a82ad]">{product.brand}</span>
          {product.rating && product.reviewCount && (
            <span className="flex items-center gap-1 text-[#b9bee0]">
              <StarIcon size={12} className="text-[#f5a524]" />
              {product.rating.toFixed(1)}
              <span className="text-[#5a6190]">({product.reviewCount})</span>
            </span>
          )}
        </div>
        <h3 className="text-base font-semibold leading-snug text-white">
          <Link
            href={`/product/${product.slug}`}
            className="hover:text-[#ff3d8b] transition-colors"
          >
            {product.title}
          </Link>
        </h3>
        <p className="text-sm text-[#7a82ad] line-clamp-2">{product.shortDescription}</p>
        <p className={`text-xs ${availabilityColor}`}>{availabilityLabel}</p>
        <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {product.oldPrice && (
              <p className="text-xs text-[#5a6190] line-through">
                {formatUAH(product.oldPrice)}
              </p>
            )}
            <p className="text-lg font-bold text-white">{formatUAH(product.price)}</p>
          </div>
          <AddToCartIconButton product={product} />
        </div>
      </div>
    </article>
  );
}
