"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Lock, ArrowRight, Star } from "lucide-react";
import { PRICING_TIERS } from "@/lib/constants";

const SILVER_FEATURES = [
  "Up to 3 digital channels",
  "Monthly strategy call",
  "Bi-weekly performance report",
  "Basic ad campaign management",
  "GMB optimisation",
  "Dedicated account manager",
];

const GOLD_FEATURES = [
  "Up to 6 digital channels",
  "Weekly strategy calls",
  "Real-time dashboard access",
  "Advanced ad campaigns (Google + Meta)",
  "SEO + Content (8 articles/mo)",
  "Social media management",
  "WhatsApp automation setup",
  "Priority support (4hr SLA)",
];

const PLATINUM_FEATURES = [
  "Unlimited channels",
  "Dedicated strategist + team",
  "Daily performance monitoring",
  "Full-funnel campaigns",
  "Custom website development",
  "Video production (2 shoots/mo)",
  "Influencer partnerships",
  "White-glove onboarding",
];

const FEATURES_MAP: Record<string, string[]> = {
  Silver: SILVER_FEATURES,
  Gold: GOLD_FEATURES,
  Platinum: PLATINUM_FEATURES,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

interface PricingCardProps {
  tier: (typeof PRICING_TIERS)[number];
  features: string[];
  delay: number;
  isLocked: boolean;
  onUnlock: () => void;
}

function PricingCard({
  tier,
  features,
  delay,
  isLocked,
  onUnlock,
}: PricingCardProps) {
  const isFeatured = "featured" in tier && tier.featured;
  const accent = isFeatured
    ? "var(--color-brand-orange)"
    : isLocked
      ? "var(--color-brand-red)"
      : "var(--color-border-bright)";

  return (
    <motion.div
      {...fadeUp(delay)}
      style={{
        flex: "1 1 300px",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        padding: "36px 32px",
        borderRadius: "20px",
        border: `1px solid ${isFeatured ? "rgba(239,89,36,0.4)" : "var(--color-border)"}`,
        background: isFeatured
          ? "linear-gradient(160deg, rgba(249,160,27,0.08) 0%, rgba(239,89,36,0.07) 40%, var(--color-dark-elevated) 85%)"
          : "var(--color-dark-elevated)",
        position: "relative",
        overflow: "hidden",
        boxShadow: isFeatured ? "0 0 48px rgba(239,89,36,0.12)" : "none",
      }}
    >
      {/* Featured badge */}
      {isFeatured && (
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 10px",
            borderRadius: "100px",
            background: "var(--gradient-brand-premium)",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "10px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#000",
          }}
        >
          <Star size={9} fill="#000" strokeWidth={0} />
          Most Popular
        </div>
      )}

      {/* Plan name */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: accent,
          marginBottom: "8px",
        }}
      >
        {tier.name}
      </p>

      {/* Price */}
      {isLocked ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "6px",
          }}
        >
          <Lock
            size={22}
            strokeWidth={1.5}
            style={{ color: "var(--color-brand-red)" }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "28px",
              letterSpacing: "-0.04em",
              color: "var(--color-text-secondary)",
            }}
          >
            Custom Pricing
          </span>
        </div>
      ) : (
        <div style={{ marginBottom: "6px" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 42px)",
              letterSpacing: "-0.04em",
              color: "var(--color-text-primary)",
            }}
          >
            {tier.priceFormatted}
          </span>
        </div>
      )}

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          color: "var(--color-text-muted)",
          marginBottom: "28px",
        }}
      >
        {tier.tagline}
      </p>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "var(--color-border)",
          marginBottom: "24px",
        }}
      />

      {/* Features */}
      <ul
        role="list"
        style={{
          listStyle: "none",
          margin: "0 0 auto",
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
              alignItems: "flex-start",
              gap: "10px",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: isLocked
                ? "var(--color-text-muted)"
                : "var(--color-text-secondary)",
              filter: isLocked ? "blur(2px)" : "none",
              userSelect: isLocked ? "none" : "auto",
            }}
          >
            <Check
              size={14}
              strokeWidth={2.5}
              style={{
                color: accent,
                flexShrink: 0,
                marginTop: "1px",
              }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onUnlock}
        style={{
          marginTop: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "14px 24px",
          borderRadius: "8px",
          background: isFeatured
            ? "var(--gradient-brand-premium)"
            : isLocked
              ? "rgba(211,32,39,0.12)"
              : "transparent",
          border: isFeatured
            ? "none"
            : isLocked
              ? "1px solid rgba(211,32,39,0.4)"
              : "1px solid var(--color-border)",
          color: isFeatured
            ? "#000"
            : isLocked
              ? "var(--color-brand-red)"
              : "var(--color-text-secondary)",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "13px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          cursor: "none",
          width: "100%",
        }}
      >
        {isLocked ? (
          <>
            <Lock size={14} strokeWidth={2} /> Unlock Details
          </>
        ) : (
          <>
            Get Started <ArrowRight size={14} strokeWidth={2} />
          </>
        )}
      </button>
    </motion.div>
  );
}

interface PricingSectionProps {
  onOpenDrawer: () => void;
}

export default function PricingSection({ onOpenDrawer }: PricingSectionProps) {
  return (
    <section
      aria-labelledby="pricing-heading"
      className="section-shell"
      style={{
        padding: "100px 24px 120px",
      }}
    >
      {/* Header */}
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
          Transparent Pricing
        </p>
        <h2
          id="pricing-heading"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "-0.04em",
            color: "var(--color-text-primary)",
            lineHeight: 1.05,
            marginBottom: "16px",
          }}
        >
          Investment in growth.
          <br />
          <span className="text-brand-gradient">Not just a line item.</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            color: "var(--color-text-secondary)",
            maxWidth: "440px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          No hidden fees. Monthly rolling. Cancel anytime. Platinum pricing is
          bespoke — unlock it below.
        </p>
      </motion.div>

      {/* Cards */}
      <div
        className="grid-balance-2"
        style={{
          gap: "20px",
        }}
      >
        {PRICING_TIERS.map((tier, i) => (
          <PricingCard
            key={tier.name}
            tier={tier}
            features={FEATURES_MAP[tier.name]}
            delay={i * 0.1}
            isLocked={tier.name === "Platinum"}
            onUnlock={onOpenDrawer}
          />
        ))}
      </div>

      {/* Footnote */}
      <motion.p
        {...fadeUp(0.35)}
        style={{
          textAlign: "center",
          marginTop: "40px",
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          color: "var(--color-text-muted)",
        }}
      >
        All plans include onboarding, setup, and a 30-day performance guarantee.
        GST applicable.
      </motion.p>
    </section>
  );
}
