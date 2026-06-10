"use client";

import { useState } from "react";
import { PlusIcon, TrashIcon, WrenchIcon } from "@/components/ui/Icon";
import { IconButton } from "./IconButton";

interface Slot {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  active: boolean;
}

const heroSeed: Slot[] = [
  {
    id: "hero-1",
    title: "Тримай свій ритм",
    subtitle: "Велосипеди та запчастини з доставкою по Україні",
    link: "/catalog",
    active: true,
  },
  {
    id: "hero-2",
    title: "Електровелосипеди — до 90 км на одному заряді",
    subtitle: "Нова колекція Haibike 2026",
    link: "/catalog/elektro",
    active: false,
  },
];

const promoSeed: Slot[] = [
  {
    id: "promo-1",
    title: "Літня знижка -10%",
    subtitle: "Промокод SPRING10 діє до 30 червня",
    link: "/catalog?sale=1",
    active: true,
  },
  {
    id: "promo-2",
    title: "Безкоштовна доставка від 5 000 ₴",
    subtitle: "Нова Пошта по всій Україні",
    link: "/delivery",
    active: true,
  },
];

function SlotList({
  title,
  initial,
}: {
  title: string;
  initial: Slot[];
}) {
  const [slots, setSlots] = useState(initial);
  const toggle = (id: string) =>
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)),
    );
  const remove = (id: string) => setSlots((prev) => prev.filter((s) => s.id !== id));

  return (
    <section className="card p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <button type="button" className="btn btn-secondary !py-2 !text-xs">
          <PlusIcon size={14} /> Додати
        </button>
      </div>
      <ul className="mt-4 space-y-3">
        {slots.map((s) => (
          <li
            key={s.id}
            className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-[#1f2750] p-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-white">{s.title}</p>
                <button
                  type="button"
                  onClick={() => toggle(s.id)}
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    s.active
                      ? "text-[#22c55e] bg-[#22c55e]/10"
                      : "text-[#7a82ad] bg-[#101533]"
                  }`}
                >
                  {s.active ? "Опубліковано" : "Чернетка"}
                </button>
              </div>
              <p className="mt-1 text-sm text-[#cfd3ef]">{s.subtitle}</p>
              <p className="mt-1 text-xs text-[#7a82ad]">
                Посилання: <code className="text-[#cfd3ef]">{s.link}</code>
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <IconButton label="Редагувати слот">
                <WrenchIcon size={14} />
              </IconButton>
              <IconButton
                label="Видалити слот"
                variant="danger"
                onClick={() => remove(s.id)}
              >
                <TrashIcon size={14} />
              </IconButton>
            </div>
          </li>
        ))}
        {slots.length === 0 && (
          <li className="rounded-xl border border-dashed border-[#1f2750] p-6 text-center text-sm text-[#7a82ad]">
            Слот пустий.
          </li>
        )}
      </ul>
    </section>
  );
}

export function ContentManager() {
  return (
    <div className="space-y-5">
      <SlotList title="Банери головної" initial={heroSeed} />
      <SlotList title="Акції та сповіщення" initial={promoSeed} />
    </div>
  );
}
