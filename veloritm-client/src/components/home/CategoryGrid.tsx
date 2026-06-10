import Link from "next/link";
import { categories } from "@/lib/categories";
import {
  MountainIcon,
  RoadIcon,
  CityIcon,
  KidsIcon,
  BoltIcon,
  SunIcon,
  HelmetIcon,
  ChevronRightIcon,
} from "../ui/Icon";

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  girski: MountainIcon,
  shoseini: RoadIcon,
  miski: CityIcon,
  dytiachi: KidsIcon,
  elektro: BoltIcon,
  zapchastyny: SunIcon,
  aksesuary: HelmetIcon,
};

export function CategoryGrid() {
  return (
    <section className="container-app py-16">
      <SectionHeading
        kicker="Каталог"
        title="Знайди свою категорію"
        href="/catalog"
        hrefLabel="Дивитись усі"
      />
      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => {
          const Icon = icons[cat.slug] ?? MountainIcon;
          return (
            <li key={cat.slug}>
              <Link
                href={`/catalog/${cat.slug}`}
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-[#1f2750] bg-[#0a0e23] p-5 transition-colors hover:border-[#ff3d8b]"
              >
                <span
                  aria-hidden
                  className="absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#6a4cff]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#101533] text-[#ff3d8b]">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">{cat.shortTitle}</h3>
                  <p className="mt-1 text-sm text-[#7a82ad] line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <span className="mt-auto flex items-center gap-1 text-sm text-[#b9bee0]">
                  До категорії
                  <ChevronRightIcon size={14} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  href,
  hrefLabel,
}: {
  kicker: string;
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff3d8b]">
          {kicker}
        </span>
        <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      </div>
      {href && hrefLabel && (
        <Link
          href={href}
          className="flex items-center gap-1.5 text-sm text-[#b9bee0] hover:text-white transition-colors"
        >
          {hrefLabel}
          <ChevronRightIcon size={14} />
        </Link>
      )}
    </div>
  );
}
