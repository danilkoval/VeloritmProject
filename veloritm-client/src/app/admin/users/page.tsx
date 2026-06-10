import type { Metadata } from "next";
import { UsersManager } from "@/components/admin/UsersManager";

export const metadata: Metadata = {
  title: "Адмін — Користувачі",
  description: "Управління користувачами та ролями.",
  robots: { index: false, follow: false },
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Користувачі</h2>
          <p className="mt-1 text-sm text-[#7a82ad]">
            Призначення ролей <code className="text-[#cfd3ef]">ROLE_MANAGER</code> /
            <code className="text-[#cfd3ef]"> ROLE_ADMIN</code> — лише для адміна.
          </p>
        </div>
        <span className="rounded-full bg-[#6a4cff]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#a59bff]">
          ROLE_ADMIN
        </span>
      </header>
      <UsersManager />
    </div>
  );
}
