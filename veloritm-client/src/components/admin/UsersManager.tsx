"use client";

import { useMemo, useState } from "react";
import { AdminToolbar } from "./AdminToolbar";

type Role = "ROLE_USER" | "ROLE_MANAGER" | "ROLE_ADMIN";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  orders: number;
  joined: string;
}

const seed: AdminUser[] = [
  {
    id: "u-1042",
    name: "Олексій Шевченко",
    email: "o.shevchenko@mail.com",
    role: "ROLE_USER",
    orders: 12,
    joined: "14.02.2025",
  },
  {
    id: "u-1043",
    name: "Ірина Коваль",
    email: "i.koval@mail.com",
    role: "ROLE_USER",
    orders: 4,
    joined: "08.10.2025",
  },
  {
    id: "u-0987",
    name: "Дмитро Лисенко",
    email: "d.lysenko@veloritm.com",
    role: "ROLE_MANAGER",
    orders: 0,
    joined: "12.06.2024",
  },
  {
    id: "u-0001",
    name: "Тарас Бондарчук",
    email: "t.bondarchuk@veloritm.com",
    role: "ROLE_ADMIN",
    orders: 0,
    joined: "01.01.2024",
  },
];

const roleStyle: Record<Role, string> = {
  ROLE_USER: "text-[#cfd3ef] bg-[#101533] border border-[#1f2750]",
  ROLE_MANAGER: "text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/30",
  ROLE_ADMIN: "text-[#a59bff] bg-[#6a4cff]/10 border border-[#6a4cff]/30",
};

const allRoles: Role[] = ["ROLE_USER", "ROLE_MANAGER", "ROLE_ADMIN"];

export function UsersManager() {
  const [users, setUsers] = useState(seed);
  const [state, setState] = useState({ search: "", filter: "all" });

  const counts = useMemo(
    () => ({
      all: users.length,
      ROLE_USER: users.filter((u) => u.role === "ROLE_USER").length,
      ROLE_MANAGER: users.filter((u) => u.role === "ROLE_MANAGER").length,
      ROLE_ADMIN: users.filter((u) => u.role === "ROLE_ADMIN").length,
    }),
    [users],
  );

  const filtered = useMemo(() => {
    const q = state.search.trim().toLowerCase();
    return users.filter((u) => {
      if (state.filter !== "all" && u.role !== state.filter) return false;
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
      );
    });
  }, [users, state]);

  const setRole = (id: string, role: Role) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));

  return (
    <div className="space-y-5">
      <AdminToolbar
        searchPlaceholder="Пошук за іменем, email або ID…"
        filters={[
          { value: "all", label: "Усі", count: counts.all },
          { value: "ROLE_USER", label: "Покупці", count: counts.ROLE_USER },
          { value: "ROLE_MANAGER", label: "Менеджери", count: counts.ROLE_MANAGER },
          { value: "ROLE_ADMIN", label: "Адміни", count: counts.ROLE_ADMIN },
        ]}
        defaultFilter="all"
        onChange={(s) => setState(s)}
      />

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-[#1f2750] text-left text-xs uppercase tracking-wider text-[#7a82ad]">
              <tr>
                <th className="px-5 py-3 font-semibold">Користувач</th>
                <th className="px-5 py-3 font-semibold">Замовлень</th>
                <th className="px-5 py-3 font-semibold">З нами з</th>
                <th className="px-5 py-3 font-semibold">Роль</th>
                <th className="px-5 py-3 font-semibold text-right">Дії</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-[#1f2750]/60 last:border-0 hover:bg-[#141a3d]/60"
                >
                  <td className="px-5 py-3">
                    <p className="font-semibold text-white">{u.name}</p>
                    <p className="text-xs text-[#7a82ad]">{u.email}</p>
                  </td>
                  <td className="px-5 py-3 text-white">{u.orders}</td>
                  <td className="px-5 py-3 text-[#cfd3ef]">{u.joined}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleStyle[u.role]}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <label className="inline-flex items-center gap-2 text-xs text-[#7a82ad]">
                      Призначити:
                      <select
                        value={u.role}
                        onChange={(e) => setRole(u.id, e.target.value as Role)}
                        className="rounded-lg border border-[#1f2750] bg-[#0a0e23] px-2 py-1 text-xs text-white focus:border-[#ff3d8b] focus:outline-none"
                      >
                        {allRoles.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </label>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-sm text-[#7a82ad]"
                  >
                    Користувачів не знайдено.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
