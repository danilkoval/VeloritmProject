"use client";

import { useState, type ReactNode } from "react";
import { SearchIcon } from "@/components/ui/Icon";

interface AdminToolbarProps {
  searchPlaceholder?: string;
  filters?: { value: string; label: string; count?: number }[];
  defaultFilter?: string;
  onChange?: (state: { search: string; filter: string }) => void;
  action?: ReactNode;
}

export function AdminToolbar({
  searchPlaceholder = "Пошук…",
  filters,
  defaultFilter,
  onChange,
  action,
}: AdminToolbarProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(defaultFilter ?? filters?.[0]?.value ?? "");

  const emit = (next: { search?: string; filter?: string }) => {
    const merged = { search, filter, ...next };
    setSearch(merged.search);
    setFilter(merged.filter);
    onChange?.(merged);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-md">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#7a82ad]">
            <SearchIcon size={16} />
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => emit({ search: e.target.value })}
            placeholder={searchPlaceholder}
            className="field-dark pl-10"
          />
        </div>
        {action && <div className="sm:ml-auto">{action}</div>}
      </div>

      {filters && filters.length > 0 && (
        <div
          role="tablist"
          aria-label="Фільтри"
          className="flex flex-wrap items-center gap-1.5"
        >
          {filters.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => emit({ filter: f.value })}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "border-[#ff3d8b]/40 bg-[#ff3d8b]/10 text-white"
                    : "border-[#1f2750] text-[#cfd3ef] hover:border-[#2c356b] hover:bg-[#101533] hover:text-white"
                }`}
              >
                {f.label}
                {typeof f.count === "number" && (
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                      active
                        ? "bg-[#ff3d8b]/20 text-[#ff8ab8]"
                        : "bg-[#0a0e23] text-[#7a82ad]"
                    }`}
                  >
                    {f.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
