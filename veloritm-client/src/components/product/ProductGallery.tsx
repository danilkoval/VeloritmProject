"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const main = images[index] ?? images[0];
  if (!main) return null;

  return (
    <div className="grid gap-3 lg:grid-cols-[80px_1fr] lg:items-start">
      <ul className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
        {images.map((src, i) => (
          <li key={src + i}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className={`relative block aspect-square w-20 shrink-0 overflow-hidden rounded-xl border transition-colors ${
                i === index
                  ? "border-[#ff3d8b]"
                  : "border-[#1f2750] hover:border-[#2c356b]"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} — фото ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>
      <div className="order-1 relative aspect-square w-full overflow-hidden rounded-2xl border border-[#1f2750] bg-[#0a0e23] lg:order-2">
        <Image
          src={main}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
