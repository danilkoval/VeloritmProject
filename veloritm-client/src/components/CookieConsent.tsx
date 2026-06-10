"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "veloritm:cookie-consent";

type Choice = "all" | "necessary" | "custom";

interface ConsentPayload {
  choice: Choice;
  analytics: boolean;
  marketing: boolean;
  date: string;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage unavailable (private mode) — show banner
      setVisible(true);
    }
  }, []);

  const save = (payload: ConsentPayload) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore — user can re-choose later via footer link
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Згода на використання cookie"
      className="fixed inset-x-3 bottom-3 z-50 flex flex-col gap-4 rounded-2xl border border-[#2c356b] bg-[#0a0e23]/95 p-5 shadow-2xl backdrop-blur md:left-auto md:right-6 md:max-w-md"
    >
      <p className="text-sm text-[#cfd3ef]">
        Ми використовуємо cookie для коректної роботи сайту та аналітики. Ви
        можете обрати, які категорії дозволити. Детальніше у{" "}
        <Link href="/privacy" className="underline">
          Політиці конфіденційності
        </Link>
        .
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            save({
              choice: "all",
              analytics: true,
              marketing: true,
              date: new Date().toISOString(),
            })
          }
          className="btn btn-primary !py-2 text-sm"
        >
          Прийняти все
        </button>
        <button
          type="button"
          onClick={() =>
            save({
              choice: "necessary",
              analytics: false,
              marketing: false,
              date: new Date().toISOString(),
            })
          }
          className="btn btn-secondary !py-2 text-sm"
        >
          Тільки необхідні
        </button>
        <Link
          href="/account/data"
          className="btn btn-ghost !py-2 text-sm"
        >
          Налаштувати
        </Link>
      </div>
    </div>
  );
}
