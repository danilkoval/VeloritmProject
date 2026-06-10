const brands = [
  "Trek",
  "Giant",
  "Merida",
  "Cannondale",
  "Specialized",
  "Haibike",
  "Shimano",
  "SRAM",
  "RockShox",
  "Kask",
];

export function Brands() {
  return (
    <section className="container-app py-16">
      <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7a82ad]">
        Бренди-партнери
      </h2>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {brands.map((brand) => (
          <li
            key={brand}
            className="grid h-20 place-items-center rounded-xl border border-[#1f2750] bg-[#0a0e23] text-lg font-bold tracking-wider text-[#cfd3ef] transition-colors hover:border-[#2c356b] hover:text-white"
          >
            {brand}
          </li>
        ))}
      </ul>
    </section>
  );
}
