import Link from "next/link";
import { ChevronRightIcon } from "./Icon";
import { JsonLd } from "../JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <nav
        aria-label="Хлібні крихти"
        className="container-app py-4 text-sm text-[#7a82ad]"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {isLast ? (
                  <span className="text-white">{item.name}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast && <ChevronRightIcon size={14} className="text-[#5a6190]" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(items)} />
    </>
  );
}
