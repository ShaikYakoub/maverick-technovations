"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  TrendingUp,
  Search,
  Share2,
  Zap,
  Monitor,
  ShoppingCart,
  MapPin,
  Mail,
  Pen,
  MessageCircle,
  Users,
  Video,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICON_MAP: Record<
  string,
  React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    style?: React.CSSProperties;
  }>
> = {
  TrendingUp,
  Search,
  Share2,
  Zap,
  Monitor,
  ShoppingCart,
  MapPin,
  Mail,
  Pen,
  MessageCircle,
  Users,
  Video,
};

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

interface ServiceCardProps {
  slug: string;
  title: string;
  icon: string;
  description: string;
  delay: number;
}

function ServiceCard({
  slug,
  title,
  icon,
  description,
  delay,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const radialBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(300px circle at ${x as number}px ${y as number}px, rgba(255,85,0,0.09) 0%, transparent 65%)`,
  );

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const Icon = ICON_MAP[icon] ?? TrendingUp;

  return (
    <motion.a
      ref={cardRef}
      {...fadeUp(delay)}
      href={`/services/${slug}`}
      onMouseMove={onMouseMove}
      whileHover={{ y: -4, borderColor: "rgba(255,85,0,0.5)" }}
      transition={{ y: { type: "spring", stiffness: 300, damping: 30 } }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "28px",
        borderRadius: "16px",
        border: "1px solid var(--color-border)",
        background: "var(--color-dark-elevated)",
        textDecoration: "none",
        overflow: "hidden",
        cursor: "none",
      }}
    >
      {/* Spotlight overlay */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "16px",
          background: radialBg,
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "10px",
          border: "1px solid rgba(255,85,0,0.25)",
          background: "rgba(255,85,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon
          size={20}
          strokeWidth={1.5}
          style={{ color: "var(--color-brand-orange)" }}
        />
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "16px",
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            marginBottom: "8px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            lineHeight: 1.65,
            color: "var(--color-text-secondary)",
          }}
        >
          {description}
        </p>
      </div>

      {/* Arrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--color-brand-orange)",
        }}
      >
        Learn more
        <ArrowUpRight size={14} strokeWidth={1.5} />
      </div>
    </motion.a>
  );
}

export default function SpotlightGrid() {
  return (
    <section
      aria-labelledby="services-heading"
      style={{
        padding: "80px 24px 120px",
        background: "var(--color-dark-surface)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
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
            <span style={{ color: "var(--color-brand-orange)" }}>
              drives growth.
            </span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              title={service.title}
              icon={service.icon}
              description={service.description}
              delay={(i % 4) * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
