"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "@studio-freight/react-lenis";

/**
 * Lightweight, non-intrusive Smooth Scroll wrapper:
 * - Bypasses Lenis on /admin routes (preventing conflicts with fixed sidebars & scrollable tables)
 * - Respects prefers-reduced-motion accessibility preference
 * - Prevents wheel hijacking inside dialogs/modals
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reducedMotion || pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TypedLenis = ReactLenis as React.ComponentType<any>;

  return (
    <TypedLenis
      root
      options={{
        lerp: 0.11,
        duration: 0.9,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.4,
        prevent: (node: HTMLElement) =>
          Boolean(
            node?.closest?.('[role="dialog"]') ||
              node?.closest?.("[data-lenis-prevent]")
          ),
      }}
    >
      {children}
    </TypedLenis>
  );
}
