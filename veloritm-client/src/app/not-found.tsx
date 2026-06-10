import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сторінку не знайдено",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-app grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="text-7xl font-black gradient-text">404</p>
        <h1 className="mt-4 text-3xl font-bold text-white">Сторінку не знайдено</h1>
        <p className="mt-3 text-[#b9bee0]">
          Можливо, її переміщено або видалено. Спробуйте розпочати з головної сторінки.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            На головну
          </Link>
          <Link href="/catalog" className="btn btn-secondary">
            До каталогу
          </Link>
        </div>
      </div>
    </div>
  );
}
