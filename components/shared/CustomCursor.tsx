"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";

/**
 * CustomCursor
 *
 * Replaces the native cursor with:
 * – A small neon-orange dot that follows with spring physics
 * – An outer ring that lags further behind
 * – Both expand + shift to red on hover over any clickable element
 * – Velocity-reactive scale: faster movement = larger dot
 *
 * Mounted inside the global layout via <ClientShell />.
 * The body has `cursor: none` set in globals.css.
 */
export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot springs — tight, high-responsiveness
  const dotX = useSpring(cursorX, { stiffness: 600, damping: 40, mass: 0.4 });
  const dotY = useSpring(cursorY, { stiffness: 600, damping: 40, mass: 0.4 });

  // Ring springs — looser, trails behind
  const ringX = useSpring(cursorX, { stiffness: 160, damping: 22, mass: 0.6 });
  const ringY = useSpring(cursorY, { stiffness: 160, damping: 22, mass: 0.6 });

  // Hover state
  const hovering = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show on devices that have a fine pointer (mouse/trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let lastX = 0;
    let lastT = Date.now();
    let velTimeout: ReturnType<typeof setTimeout>;

    function onMouseMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Velocity-based dot scale
      const now = Date.now();
      const dt = Math.max(now - lastT, 1);
      const dx = e.clientX - lastX;
      const vel = Math.abs(dx / dt);
      lastX = e.clientX;
      lastT = now;

      const scale = Math.min(1 + vel * 0.8, 2.4);
      if (dotRef.current)
        dotRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;

      clearTimeout(velTimeout);
      velTimeout = setTimeout(() => {
        if (dotRef.current)
          dotRef.current.style.transform = `translate(-50%, -50%) scale(1)`;
      }, 100);
    }

    function onMouseEnterClickable() {
      hovering.current = true;
      if (dotRef.current) {
        dotRef.current.style.background = "var(--color-brand-red)";
        dotRef.current.style.boxShadow =
          "0 0 0 4px rgba(211,32,39,0.25), 0 0 16px rgba(211,32,39,0.5)";
        dotRef.current.style.width = "10px";
        dotRef.current.style.height = "10px";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "44px";
        ringRef.current.style.height = "44px";
        ringRef.current.style.borderColor = "var(--color-brand-red)";
        ringRef.current.style.opacity = "1";
      }
    }

    function onMouseLeaveClickable() {
      hovering.current = false;
      if (dotRef.current) {
        dotRef.current.style.background = "var(--color-brand-orange)";
        dotRef.current.style.boxShadow =
          "0 0 0 3px rgba(239,89,36,0.2), 0 0 12px rgba(239,89,36,0.5)";
        dotRef.current.style.width = "8px";
        dotRef.current.style.height = "8px";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "32px";
        ringRef.current.style.height = "32px";
        ringRef.current.style.borderColor = "rgba(239,89,36,0.5)";
        ringRef.current.style.opacity = "0.7";
      }
    }

    function onMouseLeaveViewport() {
      cursorX.set(-200);
      cursorY.set(-200);
    }

    // Listen on all clickable elements via event delegation
    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const isClickable =
        target.closest(
          "a, button, [role='button'], input, textarea, select, label, [tabindex]",
        ) !== null;
      if (isClickable && !hovering.current) onMouseEnterClickable();
      else if (!isClickable && hovering.current) onMouseLeaveClickable();
    }

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveViewport);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeaveViewport);
      clearTimeout(velTimeout);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* ── Outer ring ────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          x: ringX,
          y: ringY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        <div
          ref={ringRef}
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1px solid rgba(239,89,36,0.5)",
            opacity: 0.7,
            transition:
              "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, opacity 0.25s ease",
          }}
        />
      </motion.div>

      {/* ── Inner dot ─────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          x: dotX,
          y: dotY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 10000,
        }}
      >
        <div
          ref={dotRef}
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%) scale(1)",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--color-brand-orange)",
            boxShadow:
              "0 0 0 3px rgba(239,89,36,0.2), 0 0 12px rgba(239,89,36,0.5)",
            transition:
              "background 0.2s ease, box-shadow 0.2s ease, width 0.2s ease, height 0.2s ease",
            willChange: "transform",
          }}
        />
      </motion.div>
    </>
  );
}
