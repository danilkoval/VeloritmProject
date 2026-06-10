import Link from "next/link";
import { categories } from "@/lib/categories";
import {
  MenuIcon,
  MountainIcon,
  RoadIcon,
  CityIcon,
  KidsIcon,
  BoltIcon,
  SunIcon,
  HelmetIcon,
} from "../ui/Icon";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  girski: MountainIcon,
  shoseini: RoadIcon,
  miski: CityIcon,
  dytiachi: KidsIcon,
  elektro: BoltIcon,
  zapchastyny: SunIcon,
  aksesuary: HelmetIcon,
};

export function CategoryNav() {
  return (
    <nav
      aria-label="Категорії товарів"
      className="border-y border-[#1f2750] bg-[#0a0e23]/60 backdrop-blur"
    >
      <div className="container-app flex h-14 items-center gap-1 overflow-x-auto">
        <Link
          href="/catalog"
          className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff3d8b] to-[#ff7a3d] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/20"
        >
          <MenuIcon size={16} />
          Усі категорії
        </Link>
        <ul className="flex items-center gap-1 pl-2">
          {categories.map((cat) => {
            const Icon = iconMap[cat.slug] ?? MenuIcon;
            return (
              <li key={cat.slug} className="shrink-0">
                <Link
                  href={`/catalog/${cat.slug}`}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-[#b9bee0] hover:bg-[#101533] hover:text-white transition-colors"
                >
                  <Icon size={16} className="text-[#7a82ad]" />
                  {cat.shortTitle}
                </Link>
              </li>
            );
          })}
        </ul>
        <span aria-hidden className="ml-auto hidden lg:flex shrink-0 items-center gap-2 text-sm text-[#ff3d8b]">
          <span className="h-2 w-2 rounded-full bg-[#ff3d8b]" />
          Розпродаж до -30%
        </span>
      </div>
    </nav>
  );
}
