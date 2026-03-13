"use client";

import { motion } from "motion/react";
import { TRUST_PILLARS } from "@/lib/constants";
import { Award, Eye, BarChart2, Shield } from "lucide-react";

const ICON_MAP: Record<
  string,
  React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    style?: React.CSSProperties;
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
                background: "var(--color-brand-orange)",
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
        <MarqueeTrack reverse />
      </div>
    </section>
  );
}
