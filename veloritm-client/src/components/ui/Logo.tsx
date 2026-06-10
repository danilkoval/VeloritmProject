import Link from "next/link";

interface LogoProps {
  withTagline?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Logo({ withTagline = true, size = "md", href = "/" }: LogoProps) {
  const sizes = {
    sm: { badge: "h-8 w-8", title: "text-base", tag: "text-[10px]" },
    md: { badge: "h-12 w-12", title: "text-xl", tag: "text-[11px]" },
    lg: { badge: "h-14 w-14", title: "text-2xl", tag: "text-xs" },
  } as const;
  const s = sizes[size];

  return (
    <Link href={href} className="inline-flex items-center gap-3" aria-label="Велоритм — головна">
      <span
        className={`relative ${s.badge} shrink-0 rounded-full bg-gradient-to-br from-[#2756ff] via-[#6a4cff] to-[#ff3d8b] p-[2px]`}
      >
        <span className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0e23] text-[10px] font-bold uppercase tracking-wider text-white">
          <BikeMark />
        </span>
      </span>
      <span className="leading-none">
        <span className={`block font-black tracking-tight text-white ${s.title}`}>
          ВЕЛО<span className="gradient-text">РИТМ</span>
        </span>
        {withTagline && (
          <span className={`block uppercase tracking-[0.22em] text-[#7a82ad] ${s.tag} mt-1`}>
            велосипеди · сервіс
          </span>
        )}
      </span>
    </Link>
  );
}

function BikeMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-white"
      aria-hidden="true"
    >
      <circle cx="6" cy="17" r="4" />
      <circle cx="18" cy="17" r="4" />
      <path d="M6 17l4-7h5l3 7" />
      <path d="M10 10l2-4h3" />
    </svg>
  );
}
