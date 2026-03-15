"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, ChevronDown, MapPin } from "@/lib/icons";

// R3F canvas must be dynamically imported (no SSR)
const HeroThreeCanvas = dynamic(() => import("./HeroThreeCanvas"), {
  ssr: false,
  loading: () => null,
});

// ── Stats ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: "312%", label: "Avg. Revenue Lift" },
  { value: "8.4×", label: "ROAS (Paid Ads)" },
  { value: "200+", label: "Brands Scaled" },
  { value: "#1", label: "Ranked Keywords" },
];

// ── Rotating city names for sub-headline ──────────────────────────────────
const CITIES = [
  "Kadapa",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Vizag",
  "Tirupati",
];

interface HeroSectionProps {
  onOpenDrawer: () => void;
}

export default function HeroSection({ onOpenDrawer }: HeroSectionProps) {
  const mouseRef = useRef<[number, number]>([0, 0]);
  const [cityIdx, setCityIdx] = useState(0);
  const [cityVisible, setCityVisible] = useState(true);

  // City rotation with fade
  useEffect(() => {
    const interval = setInterval(() => {
      setCityVisible(false);
      setTimeout(() => {
        setCityIdx((i) => (i + 1) % CITIES.length);
        setCityVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Feed mouse position to R3F canvas
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Headline word stagger
  const headline1 = "Dominate";
  const headline2 = "the";
  const headline3 = "Algorithm.";
  const words = [headline1, headline2, headline3];

  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "clamp(20px, 4vw, 36px)",
        paddingBottom: "clamp(20px, 4vw, 32px)",
        overflow: "hidden",
        background: "var(--color-dark-base)",
      }}
    >
      {/* ── R3F Canvas background ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.65,
        }}
      >
        <HeroThreeCanvas mouseRef={mouseRef} />
      </div>

      {/* ── Radial vignette ───────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, var(--color-dark-base) 85%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 14px",
            borderRadius: "100px",
            border: "1px solid rgba(239,89,36,0.32)",
            background: "rgba(239,89,36,0.1)",
            marginBottom: "28px",
          }}
        >
          <MapPin
            size={12}
            style={{ color: "var(--color-brand-orange)" }}
            strokeWidth={1.5}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-brand-orange)",
            }}
          >
            South India&apos;s Growth Engine —{" "}
            <span
              style={{
                display: "inline-grid",
                minWidth: "13ch",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  transition: "opacity 0.3s",
                  opacity: cityVisible ? 1 : 0,
                }}
              >
                {CITIES[cityIdx]}
              </span>
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          aria-label="Dominate the Algorithm."
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(44px, 10vw, 120px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            margin: "0 0 20px",
          }}
        >
          {words.map((word, wi) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.2 + wi * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                display: "inline-block",
                marginRight: wi < words.length - 1 ? "0.22em" : 0,
                color: wi === 0 ? "transparent" : "var(--color-text-primary)",
                backgroundImage:
                  wi === 0 ? "var(--gradient-brand-premium)" : undefined,
                backgroundClip: wi === 0 ? "text" : undefined,
                WebkitBackgroundClip: wi === 0 ? "text" : undefined,
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 2vw, 19px)",
            lineHeight: 1.65,
            color: "var(--color-text-secondary)",
            maxWidth: "560px",
            margin: "0 auto 32px",
          }}
        >
          Digital marketing campaigns that compound. Tech training that places.
          Results that silence doubt — across every city in South India.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={onOpenDrawer}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "15px 32px",
              background: "var(--gradient-brand-premium)",
              color: "#fff",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "14px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderRadius: "8px",
              border: "none",
              cursor: "none",
              boxShadow: "0 0 32px rgba(239,89,36,0.32)",
            }}
          >
            Unlock Pricing
            <ArrowRight size={16} strokeWidth={2} />
          </button>

          <a
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "15px 26px",
              background: "rgba(255,255,255,0.02)",
              color: "var(--color-brand-orange-light)",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "14px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderRadius: "999px",
              border: "1px solid rgba(239,89,36,0.36)",
              cursor: "none",
              textDecoration: "none",
            }}
          >
            See All Services
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "clamp(40px, 8vw, 64px)",
            paddingTop: "clamp(20px, 5vw, 32px)",
            borderTop: "1px solid var(--color-border)",
            width: "100%",
          }}
        >
          {STATS.map((s) => (
            <div key={s.value} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 4vw, 40px)",
                  letterSpacing: "-0.04em",
                  color: "var(--color-brand-orange)",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1.6 }}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown
            size={20}
            strokeWidth={1.5}
            style={{ color: "var(--color-text-muted)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
