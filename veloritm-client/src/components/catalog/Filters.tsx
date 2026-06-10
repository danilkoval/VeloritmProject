import { allBrands } from "@/lib/products";
import { categories } from "@/lib/categories";

export function Filters() {
  const brands = allBrands();
  return (
    <aside aria-label="Фільтри" className="card sticky top-44 hidden h-fit space-y-6 p-5 lg:block">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a82ad]">
          Категорії
        </h3>
        <ul className="mt-4 space-y-2 text-sm">
          {categories.map((c) => (
            <li key={c.slug}>
              <label className="flex items-center gap-2 text-[#cfd3ef] hover:text-white cursor-pointer">
                <input type="checkbox" className="accent-[#ff3d8b]" />
                {c.shortTitle}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a82ad]">
          Ціна, ₴
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="від"
            className="field-dark !py-2 text-sm"
            min={0}
          />
          <input
            type="number"
            placeholder="до"
            className="field-dark !py-2 text-sm"
            min={0}
          />
        </div>
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a82ad]">
          Бренд
        </h3>
        <ul className="mt-4 space-y-2 text-sm">
          {brands.map((brand) => (
            <li key={brand}>
              <label className="flex items-center gap-2 text-[#cfd3ef] hover:text-white cursor-pointer">
                <input type="checkbox" className="accent-[#ff3d8b]" />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a82ad]">
          Наявність
        </h3>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <label className="flex items-center gap-2 text-[#cfd3ef] hover:text-white cursor-pointer">
              <input type="checkbox" className="accent-[#ff3d8b]" defaultChecked />В наявності
            </label>
          </li>
          <li>
            <label className="flex items-center gap-2 text-[#cfd3ef] hover:text-white cursor-pointer">
              <input type="checkbox" className="accent-[#ff3d8b]" />
              Залишилось мало
            </label>
          </li>
        </ul>
      </div>
      <button type="button" className="btn btn-primary w-full">
        Застосувати фільтри
      </button>
    </aside>
  );
}
