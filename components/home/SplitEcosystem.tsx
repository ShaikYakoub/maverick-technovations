"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Award, BookOpen } from "lucide-react";

const AGENCY_FEATURES = [
  "SEO & Content Strategy",
  "Google & YouTube Ads",
  "Social Media Growth",
  "WhatsApp Automation",
  "Website & E-commerce",
  "Video Production",
];

const ACADEMY_FEATURES = [
  "Medical Coding (ICD-10, CPT, HCPCS)",
  "Digital Marketing Training",
  "Hands-on Live Projects",
  "Placement Support",
  "Flexible Online + Offline",
  "Industry Certification",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: {
    duration: 0.65,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  },
});

interface PanelProps {
  side: "agency" | "academy";
  onOpenDrawer: () => void;
}

function Panel({ side, onOpenDrawer }: PanelProps) {
  const isAgency = side === "agency";
  const title = isAgency ? "Digital Marketing Agency" : "Tech Academy";
  const tagline = isAgency
    ? "We run ads, dominate SEO, and grow your revenue — while you do the work you love."
    : "Certified programs with real-world projects and guaranteed placement support.";
  const accent = isAgency
    ? "var(--color-brand-orange)"
    : "var(--color-brand-red)";
  const features = isAgency ? AGENCY_FEATURES : ACADEMY_FEATURES;
  const ctaLabel = isAgency ? "Scale My Business" : "Enroll Now";
  const ctaHref = isAgency ? undefined : "/academy";

  return (
    <motion.div
      {...fadeUp(isAgency ? 0 : 0.15)}
      style={{
        flex: "1 1 440px",
        minWidth: 0,
        padding: "clamp(30px, 5vw, 52px) clamp(22px, 4vw, 44px)",
        borderRadius: "20px",
        border: "1px solid var(--color-border)",
        background: "var(--color-dark-elevated)",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
      whileHover={{ borderColor: accent }}
      transition={{ borderColor: { duration: 0.25 } }}
    >
      {/* Corner glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}18 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Icon badge */}
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          border: `1px solid ${accent}40`,
          background: `${accent}12`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {isAgency ? (
          <Award size={24} strokeWidth={1.5} style={{ color: accent }} />
        ) : (
          <BookOpen size={24} strokeWidth={1.5} style={{ color: accent }} />
        )}
      </div>

      {/* Text */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: accent,
            marginBottom: "10px",
          }}
        >
          {isAgency ? "For Businesses" : "For Professionals"}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(24px, 3vw, 32px)",
            letterSpacing: "-0.03em",
            color: "var(--color-text-primary)",
            lineHeight: 1.15,
            marginBottom: "16px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--color-text-secondary)",
            maxWidth: "380px",
          }}
        >
          {tagline}
        </p>
      </div>

      {/* Features */}
      <ul
        role="list"
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {features.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "var(--color-text-secondary)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: accent,
                flexShrink: 0,
              }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div style={{ marginTop: "auto" }}>
        {isAgency ? (
          <button
            onClick={onOpenDrawer}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 26px",
              background: accent,
              color: isAgency ? "#000" : "#fff",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "13px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderRadius: "8px",
              border: "none",
              cursor: "none",
            }}
          >
            {ctaLabel}
            <ArrowRight size={15} strokeWidth={2} />
          </button>
        ) : (
          <a
            href={ctaHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 26px",
              background: accent,
              color: "#fff",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "13px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderRadius: "8px",
              textDecoration: "none",
              cursor: "none",
            }}
          >
            {ctaLabel}
            <ArrowRight size={15} strokeWidth={2} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

interface SplitEcosystemProps {
  onOpenDrawer: () => void;
}

export default function SplitEcosystem({ onOpenDrawer }: SplitEcosystemProps) {
  return (
    <section
      aria-labelledby="ecosystem-heading"
      className="section-shell"
      style={{
        padding: "120px 24px",
      }}
    >
      {/* Section label */}
      <motion.div
        {...fadeUp()}
        style={{ textAlign: "center", marginBottom: "64px" }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-brand-orange)",
            marginBottom: "12px",
          }}
        >
          One Roof. Two Verticals.
        </p>
        <h2
          id="ecosystem-heading"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "-0.04em",
            color: "var(--color-text-primary)",
            lineHeight: 1.05,
          }}
        >
          Built for growth,
          <br />
          <span className="text-brand-gradient">in every direction.</span>
        </h2>
      </motion.div>

      {/* Panels */}
      <div
        className="grid-balance-2"
        style={{
          gap: "20px",
        }}
      >
        <Panel side="agency" onOpenDrawer={onOpenDrawer} />
        <Panel side="academy" onOpenDrawer={onOpenDrawer} />
      </div>
    </section>
  );
}
