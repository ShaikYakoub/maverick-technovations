"use client";

import { motion } from "motion/react";
import type { ComponentType, CSSProperties } from "react";
import { TRUST_PILLARS } from "@/lib/constants";
import { Award, Eye, BarChart2, Shield } from "lucide-react";

const ICON_MAP: Record<
  string,
  ComponentType<{
    size?: number;
    strokeWidth?: number;
    style?: CSSProperties;
  }>
> = {
  Award,
  Eye,
  BarChart2,
  Shield,
};

// ── Marquee items ─────────────────────────────────────────────────────────
const MARQUEE_STATS = [
  "312% Revenue Growth",
  "8.4× ROAS",
  "200+ Brands Scaled",
  "#1 Google Rankings",
  "1,200+ WhatsApp Leads / Month",
  "6 Cities Served",
  "98% Client Retention",
  "Certified Experts",
  "3-Month Course • Job Placement",
  "Medical Coding • AAPC Aligned",
];

// Duplicate for seamless loop
const TRACK_ITEMS = [...MARQUEE_STATS, ...MARQUEE_STATS, ...MARQUEE_STATS];
const LOGO_ITEMS = [
  "Apollo Fintech",
  "Nexa Retail",
  "Urban Spine",
  "CodeVista Labs",
  "SouthPeak Clinics",
  "Nova Homes",
  "Pulse Foods",
  "Sapphire Infra",
];
const LOGO_TRACK_ITEMS = [...LOGO_ITEMS, ...LOGO_ITEMS, ...LOGO_ITEMS];

function MarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        overflow: "hidden",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `${reverse ? "marquee-reverse" : "marquee"} 32s linear infinite`,
          gap: "32px",
          alignItems: "center",
        }}
      >
        {TRACK_ITEMS.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color:
                i % 4 === 0
                  ? "var(--color-brand-orange)"
                  : "var(--color-text-secondary)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "var(--gradient-brand-premium)",
                flexShrink: 0,
                opacity: 0.5,
              }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function LogoMarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        overflow: "hidden",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `${reverse ? "marquee-reverse" : "marquee"} 32s linear infinite`,
          gap: "24px",
          alignItems: "center",
        }}
      >
        {LOGO_TRACK_ITEMS.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="logo-marquee-item"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 14px",
              borderRadius: "999px",
              border: "1px solid var(--color-border)",
              background: "rgba(26,26,26,0.9)",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-display)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              filter: "grayscale(1)",
              opacity: 0.7,
              transition:
                "filter 0.25s ease, opacity 0.25s ease, border-color 0.25s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <circle cx="7" cy="7" r="6" fill="currentColor" opacity="0.45" />
              <circle cx="7" cy="7" r="2.6" fill="currentColor" />
            </svg>
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section
      aria-label="Trust and social proof"
      style={{ padding: "72px 0", overflow: "hidden" }}
    >
      {/* Trust pillars */}
      <div
        className="section-shell"
        style={{
          margin: "0 auto 52px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {TRUST_PILLARS.map((pillar, i) => {
          const Icon = ICON_MAP[pillar.icon] ?? Award;
          return (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 22px",
                borderRadius: "100px",
                border: "1px solid var(--color-border)",
                background: "var(--color-dark-elevated)",
              }}
            >
              <Icon
                size={15}
                strokeWidth={1.5}
                style={{ color: "var(--color-brand-orange)" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--color-text-secondary)",
                  whiteSpace: "nowrap",
                }}
              >
                {pillar.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Marquee tracks */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <MarqueeTrack />
        <LogoMarqueeTrack reverse />
        <MarqueeTrack />
      </div>

      <style>{`
        .logo-marquee-item:hover {
          filter: grayscale(0);
          opacity: 1;
          border-color: rgba(239,89,36,0.4);
        }
      `}</style>
    </section>
  );
}
