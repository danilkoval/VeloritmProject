"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const SHOW_THRESHOLD = 240;
const DELTA = 8;

export function HeaderShell({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        if (y < SHOW_THRESHOLD) {
          setHidden(false);
        } else if (delta > DELTA) {
          setHidden(true);
        } else if (delta < -DELTA) {
          setHidden(false);
        }
        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-[#1f2750] bg-[#06081a]/95 backdrop-blur transition-transform duration-500 ease-in-out will-change-transform md:!translate-y-0 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {children}
    </header>
  );
}
