import Link from "next/link";
import { ArrowRightIcon, StarIcon } from "../ui/Icon";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 grid-pattern"
      />
      <div
        aria-hidden
        className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[#6a4cff]/12 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full bg-[#ff3d8b]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute right-1/4 bottom-20 h-[200px] w-[380px] rounded-full bg-[#2756ff]/13 blur-3xl"
      />

      <div className="container-app relative pb-16 pt-6 lg:pb-24 lg:pt-12">
        <div>
          <h1
            style={{ fontFamily: "var(--font-oswald)" }}
            className="text-5xl font-bold leading-[1.1] tracking-[-1.8px] text-white sm:text-6xl lg:text-[72px]"
          >
            ТРИМАЙ
            <br />
            <span className="gradient-text">СВІЙ РИТМ</span>
            <br />
            <span className="whitespace-nowrap">НА ВЕЛОСИПЕДІ</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-[#b9bee0] sm:text-lg">
            500+ моделей у наявності · доставка по всій Україні · оплата частинами без переплат · сервісний центр у Кременчуці.
          </p>
          <div className="mt-8 flex max-w-md flex-col gap-3">
            <Link
              href="/catalog"
              className="btn btn-primary w-full !px-6 !py-3.5 text-base"
            >
              Переглянути каталог
              <ArrowRightIcon size={18} />
            </Link>
            <Link
              href="/catalog?sale=1"
              className="btn btn-secondary w-full !px-6 !py-3.5 text-base"
            >
              Акції та знижки
            </Link>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 text-white">
            <Stat value="500+" label="моделей у каталозі" />
            <Stat value="24/7" label="підтримка онлайн" />
            <Stat
              value={
                <span className="inline-flex items-center gap-1">
                  4.9
                  <StarIcon size={20} className="text-[#f5a524]" />
                </span>
              }
              label="рейтинг покупців"
            />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <dt className="text-3xl font-black sm:text-4xl">{value}</dt>
      <dd className="mt-1 text-xs uppercase tracking-wider text-[#7a82ad]">{label}</dd>
    </div>
  );
}
