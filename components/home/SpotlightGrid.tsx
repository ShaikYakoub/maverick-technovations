"use client";

import { motion } from "motion/react";
import { SERVICES } from "@/lib/constants";
import ExpandableServiceGrid from "@/components/shared/ExpandableServiceGrid";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.55,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  },
});

export default function SpotlightGrid() {
  return (
    <section
      aria-labelledby="services-heading"
      style={{
        padding: "clamp(68px, 8vw, 80px) 24px clamp(88px, 11vw, 120px)",
        background: "var(--color-dark-surface)",
      }}
    >
      <div className="section-shell">
        <motion.div {...fadeUp()} style={{ marginBottom: "56px" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-brand-orange)",
              marginBottom: "10px",
            }}
          >
            What We Do
          </p>
          <h2
            id="services-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 44px)",
              letterSpacing: "-0.04em",
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
              maxWidth: "520px",
            }}
          >
            Every lever that
            <br />
            <span className="text-brand-gradient">drives growth.</span>
          </h2>
        </motion.div>

        <ExpandableServiceGrid
          services={SERVICES.slice(0, 4)}
          showIntel={true}
          gap="clamp(12px, 2.8vw, 20px)"
          cardPadding="clamp(18px, 4.6vw, 28px)"
        />

        <motion.div
          {...fadeUp(0.08)}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(22px, 4vw, 30px)",
          }}
        >
          <a
            href="/services"
            className="btn-animated"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px 22px",
              borderRadius: "999px",
              border: "1px solid rgba(239,89,36,0.32)",
              background: "rgba(239,89,36,0.08)",
              color: "var(--color-brand-orange-light)",
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            View All Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
