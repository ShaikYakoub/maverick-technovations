"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useMotionValue, type MotionValue } from "motion/react";

// ── Context ────────────────────────────────────────────────────────────────
interface LenisContextValue {
  /** Mirrors the Lenis virtual scroll position as a Framer Motion MotionValue.
   *  Use this instead of native window.scrollY for scroll-linked animations
   *  to stay perfectly synced with the smooth scroll engine. */
  scrollY: MotionValue<number>;
  /** Direct Lenis instance for imperative control (e.g., lenis.scrollTo('#id')). */
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({
  scrollY: null as unknown as MotionValue<number>,
  lenis: null,
});

export function useLenisScroll(): LenisContextValue {
  return useContext(LenisContext);
}

// ── Provider ───────────────────────────────────────────────────────────────
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      // Expo-out easing — fast start, cushioned deceleration
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenis(lenis);

    // Sync virtual scroll position → MotionValue so Framer Motion
    // scroll-linked animations read from the Lenis position, not native scroll.
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      scrollY.set(scroll);
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [scrollY]);

  return (
    <LenisContext.Provider value={{ scrollY, lenis }}>
      {children}
    </LenisContext.Provider>
  );
}
