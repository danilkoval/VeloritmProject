"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Variant = "default" | "primary" | "danger";

interface BaseProps {
  label: string;
  variant?: Variant;
  active?: boolean;
  children: ReactNode;
}

type Props =
  | (BaseProps & { onClick?: () => void; href?: undefined })
  | (BaseProps & { href: string; onClick?: undefined });

const variantStyle: Record<Variant, string> = {
  default:
    "border-[#1f2750] text-[#cfd3ef] hover:border-[#2c356b] hover:text-white",
  primary:
    "border-[#1f2750] text-[#cfd3ef] hover:border-[#ff3d8b]/40 hover:bg-[#ff3d8b]/10 hover:text-white",
  danger:
    "border-[#1f2750] text-[#ef4444] hover:border-[#ef4444]/40 hover:bg-[#ef4444]/10",
};

export function IconButton(props: Props) {
  const { label, variant = "default", active, children } = props;
  const ref = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  const activeRing =
    active && variant === "primary"
      ? "border-[#ff3d8b]/40 bg-[#ff3d8b]/10 text-white"
      : "";

  const show = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      top: rect.top + window.scrollY,
      left: rect.left + rect.width / 2 + window.scrollX,
    });
  };
  const hide = () => setPos(null);

  const className = `grid h-8 w-8 place-items-center rounded-lg border transition-colors ${variantStyle[variant]} ${activeRing}`;

  const handlers = {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    onTouchStart: hide,
    onPointerLeave: hide,
  };

  return (
    <>
      {"href" in props && props.href ? (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={props.href}
          aria-label={label}
          className={className}
          {...handlers}
          onClick={hide}
        >
          {children}
        </Link>
      ) : (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          aria-label={label}
          onClick={() => {
            hide();
            props.onClick?.();
          }}
          className={className}
          {...handlers}
        >
          {children}
        </button>
      )}
      {pos !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <span
            role="tooltip"
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              transform: "translate(-50%, calc(-100% - 8px))",
            }}
            className="pointer-events-none z-[60] whitespace-nowrap rounded-md border border-[#1f2750] bg-[#06081a] px-2 py-1 text-[11px] font-semibold text-white shadow-lg shadow-black/40"
          >
            {label}
            <span
              aria-hidden
              className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#06081a]"
            />
          </span>,
          document.body,
        )}
    </>
  );
}
