import { TruckIcon, ShieldIcon, WrenchIcon, BoltIcon } from "../ui/Icon";

const items = [
  {
    icon: TruckIcon,
    title: "Доставка по Україні",
    text: "Доставка по всій Україні Новою поштою.",
  },
  {
    icon: ShieldIcon,
    title: "Офіційна гарантія",
    text: "Від 1 до 3 років залежно від виробника. Прямі постачання.",
  },
  {
    icon: WrenchIcon,
    title: "Власний сервіс",
    text: "ТО, ремонт і налаштування в Кременчуці. Запис онлайн.",
  },
  {
    icon: BoltIcon,
    title: "Оплата частинами",
    text: "PrivatBank — до 24 місяців.",
  },
];

export function Advantages() {
  return (
    <section className="container-app py-16">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.title}
            className="card flex flex-col gap-3 p-6 transition-colors hover:border-[#2c356b]"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[#ff3d8b] to-[#ff7a3d] text-white">
              <item.icon size={22} />
            </span>
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-[#b9bee0]">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
