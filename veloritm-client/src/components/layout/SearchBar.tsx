"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchIcon } from "../ui/Icon";

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const urlQ = params?.get("q") ?? "";
  const [q, setQ] = useState(urlQ);

  useEffect(() => {
    setQ(urlQ);
  }, [urlQ]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form
      role="search"
      onSubmit={submit}
      className="flex w-full items-center gap-2 rounded-2xl border border-[#2c356b] bg-[#101533] p-1.5 shadow-inner shadow-black/30 transition-[border-color,box-shadow] duration-200 focus-within:border-[#ff3d8b]/60 focus-within:shadow-[0_0_0_3px_rgba(255,61,139,0.18)]"
    >
      <label
        htmlFor="site-search"
        className="flex min-w-0 flex-1 cursor-text items-center gap-2 pl-2.5"
      >
        <SearchIcon size={18} className="shrink-0 text-[#7a82ad]" />
        <span className="sr-only">Пошук по сайту</span>
        <input
          id="site-search"
          name="q"
          type="search"
          autoComplete="off"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Пошук велосипедів, запчастин, аксесуарів..."
          className="min-w-0 flex-1 bg-transparent py-2 text-base text-white placeholder:text-[#7a82ad] outline-none focus-visible:outline-none sm:text-sm"
        />
      </label>
      <button
        type="submit"
        className="btn btn-primary !px-5 !py-2 text-sm"
        aria-label="Знайти"
      >
        Знайти
      </button>
    </form>
  );
}
