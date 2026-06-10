import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Повернення",
  description: "Запити на повернення товарів.",
  robots: { index: false, follow: false },
};

const returns = [
  {
    id: "RT-2026-0042",
    orderId: "VR-2026-0987",
    item: "Шолом Kask Mojito³",
    status: "approved",
    statusLabel: "Очікуємо товар",
    statusColor: "text-[#f5a524] bg-[#f5a524]/10",
    date: "20 травня 2026",
  },
];

export default function ReturnsPage() {
  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Повернення</h2>
          <p className="mt-1 text-sm text-[#7a82ad]">
            14 днів на повернення товару належної якості (Закон України «Про захист
            прав споживачів», ст. 9).
          </p>
        </div>
        <button type="button" className="btn btn-primary">
          + Новий запит
        </button>
      </header>

      {returns.length > 0 ? (
        <ul className="space-y-3">
          {returns.map((r) => (
            <li key={r.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">№ {r.id}</p>
                  <p className="text-xs text-[#7a82ad]">
                    Замовлення № {r.orderId} · {r.date}
                  </p>
                  <p className="mt-2 text-sm text-[#cfd3ef]">{r.item}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${r.statusColor}`}
                >
                  {r.statusLabel}
                </span>
              </div>
              <ol className="mt-4 grid grid-cols-4 gap-2 text-xs text-[#7a82ad]">
                {["Створено", "Підтверджено", "Отримано", "Кошти повернено"].map(
                  (label, idx) => (
                    <li
                      key={label}
                      className={`flex flex-col gap-1 rounded-lg border px-2 py-2 ${
                        idx <= 1
                          ? "border-[#ff3d8b]/40 text-white"
                          : "border-[#1f2750]"
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-wider">
                        Етап {idx + 1}
                      </span>
                      {label}
                    </li>
                  ),
                )}
              </ol>
            </li>
          ))}
        </ul>
      ) : (
        <p className="card p-8 text-center text-sm text-[#7a82ad]">
          У вас немає запитів на повернення.
        </p>
      )}
    </div>
  );
}
