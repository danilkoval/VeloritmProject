import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (props: IconProps) => ({
  width: props.size ?? 20,
  height: props.size ?? 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
});

export const PinIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 22a8 8 0 0 1 16 0" />
  </svg>
);

export const HeartIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const CartIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <circle cx="9" cy="21" r="1.5" />
    <circle cx="19" cy="21" r="1.5" />
    <path d="M2.5 3h2.5l3 12h11l2-8H7" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg {...p} width={p.size ?? 20} height={p.size ?? 20} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="m12 17.27 6.18 3.73-1.64-7.03 5.46-4.73-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const BoltIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);

export const TruckIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M3 7h11v10H3zM14 11h4l3 3v3h-7z" />
    <circle cx="7" cy="19" r="1.7" />
    <circle cx="17" cy="19" r="1.7" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M12 2 4 5v7c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const SunIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MountainIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M3 20 9 9l4 7 2-3 6 7z" />
  </svg>
);

export const RoadIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M4 20 8 4M20 20 16 4M12 4v4M12 12v4M12 20v0" />
  </svg>
);

export const CityIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M3 21h18M5 21V8l5-3v16M14 21V11l5-3v13" />
    <path d="M7 11h2M7 14h2M7 17h2M16 14h2M16 17h2" />
  </svg>
);

export const KidsIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <circle cx="9" cy="6" r="2" />
    <path d="M5 22v-7l-2-2 4-4h4l4 4-2 2v7" />
  </svg>
);

export const HelmetIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M3 14a9 9 0 0 1 18 0v3H3z" />
    <path d="M7 17v3M17 17v3M7 11h10" />
  </svg>
);

export const WrenchIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M14.7 6.3a4 4 0 0 0 5.4 5.4L21 13l-8 8a3 3 0 0 1-4-4l8-8z" />
  </svg>
);

export const TelegramIcon = (p: IconProps) => (
  <svg {...p} width={p.size ?? 20} height={p.size ?? 20} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M21.7 2.4 2.6 9.7c-1 .4-1 1.7 0 2L7 13l11.2-7.5L9.6 13.7l-.3 5.1c.7 0 1-.3 1.4-.7l2.4-2.3 4.7 3.5c.9.5 1.5.3 1.7-.8l3-13.3c.3-1.3-.5-2-1.8-1.4z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);

export const EyeIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const TrashIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M5 12h14" />
  </svg>
);

export const SlidersIcon = (p: IconProps) => (
  <svg {...base(p)} {...p}>
    <path d="M4 6h10M4 12h6M4 18h12" />
    <circle cx="17" cy="6" r="2" />
    <circle cx="13" cy="12" r="2" />
    <circle cx="19" cy="18" r="2" />
  </svg>
);
