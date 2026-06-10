import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мої дані",
  description:
    "Управління персональними даними та налаштуваннями конфіденційності.",
  robots: { index: false, follow: false },
};

export default function DataPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-white">Мої дані</h2>
        <p className="mt-1 text-sm text-[#7a82ad]">
          Згідно ЗУ «Про захист персональних даних» ви маєте право переглядати,
          виправляти та видаляти свої дані.
        </p>
      </header>

      <section className="card space-y-4 p-6">
        <h3 className="text-base font-semibold text-white">Особиста інформація</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ім'я" defaultValue="Олексій" />
          <Field label="Прізвище" defaultValue="Шевченко" />
          <Field label="Email" type="email" defaultValue="o.shevchenko@mail.com" />
          <Field label="Телефон" type="tel" defaultValue="+380 67 412 18 36" />
        </div>
        <button type="button" className="btn btn-primary">
          Зберегти
        </button>
      </section>

      <section className="card space-y-3 p-6">
        <h3 className="text-base font-semibold text-white">Згоди та підписки</h3>
        <label className="flex items-start gap-3 text-sm text-[#cfd3ef]">
          <input type="checkbox" defaultChecked className="mt-1 accent-[#ff3d8b]" />
          Email-розсилка про новинки та акції
        </label>
        <label className="flex items-start gap-3 text-sm text-[#cfd3ef]">
          <input type="checkbox" className="mt-1 accent-[#ff3d8b]" />
          SMS-сповіщення про статуси замовлень
        </label>
      </section>

      <section className="card space-y-3 p-6">
        <h3 className="text-base font-semibold text-white">Cookie-уподобання</h3>
        <p className="text-sm text-[#7a82ad]">
          Виберіть, які категорії cookie ми можемо використовувати.
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-between rounded-lg border border-[#1f2750] p-3 text-[#cfd3ef]">
            Необхідні (завжди увімкнено)
            <span className="text-[#22c55e]">Увімкнено</span>
          </li>
          <li>
            <label className="flex items-center justify-between rounded-lg border border-[#1f2750] p-3 text-[#cfd3ef]">
              Аналітика (Google Analytics 4)
              <input type="checkbox" className="accent-[#ff3d8b]" />
            </label>
          </li>
          <li>
            <label className="flex items-center justify-between rounded-lg border border-[#1f2750] p-3 text-[#cfd3ef]">
              Маркетинг та персоналізація
              <input type="checkbox" className="accent-[#ff3d8b]" />
            </label>
          </li>
        </ul>
      </section>

      <section className="card space-y-3 border-[#ef4444]/30 p-6">
        <h3 className="text-base font-semibold text-[#ef4444]">Видалення акаунту</h3>
        <p className="text-sm text-[#cfd3ef]">
          При видаленні акаунту персональні дані анонімізуються. Замовлення
          зберігаються в системі без прив&apos;язки до особи (вимоги бухгалтерського обліку).
        </p>
        <button
          type="button"
          className="btn !border !border-[#ef4444]/50 !text-[#ef4444] hover:!bg-[#ef4444]/10"
        >
          Видалити акаунт
        </button>
      </section>
    </div>
  );
}

function Field({
  label,
  type = "text",
  defaultValue,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a82ad]">
        {label}
      </span>
      <input type={type} defaultValue={defaultValue} className="field-dark mt-1.5" />
    </label>
  );
}
