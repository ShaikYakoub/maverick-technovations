"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const PRELOADER_KEY = "mavericks-preloader-seen";

export default function RouteExperience() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const previousPathRef = useRef<string | null>(null);
  const [showPreloader, setShowPreloader] = useState(false);
  const [showWipe, setShowWipe] = useState(false);

  useEffect(() => {
    try {
      const seen = window.sessionStorage.getItem(PRELOADER_KEY);
      if (seen) return;

      setShowPreloader(true);
      window.sessionStorage.setItem(PRELOADER_KEY, "1");

      const timer = window.setTimeout(
        () => {
          setShowPreloader(false);
        },
        reducedMotion ? 120 : 1200,
      );

      return () => window.clearTimeout(timer);
    } catch {
      // Ignore storage errors and continue without blocking navigation.
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (!pathname) return;

    if (previousPathRef.current === null) {
      previousPathRef.current = pathname;
      return;
    }

    if (previousPathRef.current !== pathname) {
      if (reducedMotion) {
        previousPathRef.current = pathname;
        return;
      }

      setShowWipe(true);
      const timer = window.setTimeout(() => {
        setShowWipe(false);
      }, 850);
      previousPathRef.current = pathname;

      return () => window.clearTimeout(timer);
    }
  }, [pathname, reducedMotion]);

  return (
    <>
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 120,
              background: "var(--color-dark-base)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reducedMotion ? 0.1 : 0.45 }}
              style={{
                position: "absolute",
                inset: "-18%",
                background:
                  "radial-gradient(circle at 50% 50%, rgba(239,89,36,0.22) 0%, rgba(249,160,27,0.12) 24%, transparent 62%)",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                width: "min(420px, 76vw)",
                position: "relative",
                zIndex: 1,
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0.1 : 0.32 }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-text-secondary)",
                }}
              >
                Building your experience
              </motion.span>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(24px, 5vw, 36px)",
                  letterSpacing: "-0.03em",
                  color: "var(--color-text-primary)",
                  textAlign: "center",
                }}
              >
                Mavericks
                <span style={{ color: "var(--color-brand-orange)" }}>
                  Technovations
                </span>
              </p>
              <div
                style={{
                  width: "100%",
                  height: "4px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.12)",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: reducedMotion ? 0.12 : 1.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    width: "45%",
                    height: "100%",
                    background: "var(--gradient-brand-premium)",
                  }}
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{
                  duration: reducedMotion ? 0.18 : 1.2,
                  repeat: reducedMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: "var(--color-brand-orange)",
                  boxShadow: "0 0 14px rgba(239,89,36,0.6)",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWipe && (
          <motion.div
            key={`wipe-wrap-${pathname}`}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 110,
              pointerEvents: "none",
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <motion.div
              key={`wipe-main-${pathname}`}
              initial={{ x: "100%" }}
              animate={{ x: ["100%", "0%", "-100%"] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.9,
                times: [0, 0.44, 1],
                ease: [0.65, 0, 0.35, 1],
              }}
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--gradient-brand-premium)",
                willChange: "transform",
              }}
            />
            <motion.div
              key={`wipe-accent-${pathname}`}
              initial={{ x: "118%" }}
              animate={{ x: ["118%", "4%", "-112%"] }}
              transition={{
                duration: 0.78,
                times: [0, 0.48, 1],
                ease: [0.65, 0, 0.35, 1],
              }}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(120deg, rgba(10,10,10,0.18), rgba(255,255,255,0.26), rgba(10,10,10,0.1))",
                mixBlendMode: "overlay",
                willChange: "transform",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
