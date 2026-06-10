import Link from "next/link";
import { site } from "@/lib/site";
import { PinIcon, PhoneIcon, MailIcon } from "../ui/Icon";

export function TopBar() {
  return (
    <div className="border-b border-[#1f2750] bg-[#06081a]/80">
      <div className="container-app flex h-10 items-center justify-between gap-4 text-xs text-[#b9bee0]">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <li className="hidden sm:flex items-center gap-1.5">
            <PinIcon size={14} className="text-[#ff7a3d]" />
            <span>
              {site.organization.address.addressLocality}, {site.organization.address.streetAddress}
            </span>
          </li>
          <li>
            <a
              href={`tel:${site.organization.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <PhoneIcon size={14} className="text-[#ff3d8b]" />
              {site.organization.phoneDisplay}
            </a>
          </li>
          <li className="hidden md:block">
            <a
              href={`mailto:${site.organization.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MailIcon size={14} className="text-[#6a4cff]" />
              {site.organization.email}
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-5">
          <Link
            href="/service"
            className="hidden sm:inline-block text-white hover:text-[#ff3d8b] transition-colors"
          >
            Сервісний центр
          </Link>
          <span aria-hidden className="hidden sm:block h-3 w-px bg-[#2c356b]" />
          <div className="flex items-center gap-1 text-xs">
            <button
              type="button"
              aria-pressed="true"
              className="rounded px-1.5 py-0.5 text-white"
            >
              UA
            </button>
            <span aria-hidden className="text-[#5a6190]">·</span>
            <button
              type="button"
              aria-pressed="false"
              className="rounded px-1.5 py-0.5 text-[#7a82ad] hover:text-white transition-colors"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
