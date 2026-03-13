"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import { motion, useInView, useMotionValue, useTransform } from "motion/react";
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
  ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { MEDIA_ASSETS } from "@/lib/mediaManifest";

const ICON_MAP: Record<
  string,
  ComponentType<{
    size?: number;
    strokeWidth?: number;
    style?: CSSProperties;
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

const SERVICE_INTEL: Partial<
  Record<
    (typeof SERVICES)[number]["slug"],
    {
      risk: string;
      gain: string;
    }
  >
> = {
  "digital-marketing": {
    risk: "Ad spend fragments, lead quality drops, and growth plateaus.",
    gain: "A coordinated multi-channel engine with measurable ROI loops.",
  },
  seo: {
    risk: "High-intent buyers keep choosing whoever ranks above you.",
    gain: "Compounding organic visibility that lowers acquisition cost.",
  },
  "social-media-marketing": {
    risk: "Attention shifts to competitors posting with consistency.",
    gain: "Trust-building content systems that convert audience into pipeline.",
  },
  "google-ads": {
    risk: "You miss customers already searching for your offer.",
    gain: "Fast, high-intent lead flow with weekly optimisation control.",
  },
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [touchMode, setTouchMode] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const inView = useInView(cardRef, {
    margin: "-30% 0px -30% 0px",
    amount: 0.45,
  });

  const media =
    MEDIA_ASSETS.services.cards[
      slug as keyof typeof MEDIA_ASSETS.services.cards
    ];
  const hasVideo = Boolean(media?.hoverVideo);
  const active = hasVideo && (touchMode ? inView : hovered);

  useEffect(() => {
    setTouchMode(window.matchMedia("(hover: none), (pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (active) {
      void videoRef.current.play().catch(() => undefined);
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [active]);

  const radialBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(300px circle at ${x as number}px ${y as number}px, rgba(239,89,36,0.11) 0%, transparent 65%)`,
  );

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const Icon = ICON_MAP[icon] ?? TrendingUp;
  const intel = SERVICE_INTEL[slug as (typeof SERVICES)[number]["slug"]] ?? {
    risk: "Demand leakage grows when your funnel lacks precision.",
    gain: "Clear acquisition systems with predictable lead momentum.",
  };

  return (
    <motion.a
      ref={cardRef}
      {...fadeUp(delay)}
      href={`/services/${slug}`}
      onMouseMove={onMouseMove}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, borderColor: "rgba(239,89,36,0.52)" }}
      transition={{ y: { type: "spring", stiffness: 300, damping: 30 } }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(12px, 2.8vw, 16px)",
        padding: "clamp(18px, 4.6vw, 28px)",
        borderRadius: "16px",
        border: "1px solid var(--color-border)",
        background: "var(--color-dark-elevated)",
        textDecoration: "none",
        overflow: "hidden",
        cursor: "none",
      }}
    >
      {/* Spotlight overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "16px",
          overflow: "hidden",
          opacity: 0.24,
          pointerEvents: "none",
        }}
      >
        <img
          src={media?.poster || MEDIA_ASSETS.services.heroImage}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.28s ease",
            opacity: active ? 0.2 : 1,
          }}
        />
        {hasVideo ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={media.poster}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: active ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <source src={media.hoverVideo} type="video/webm" />
          </video>
        ) : null}
      </div>

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
          border: "1px solid rgba(239,89,36,0.28)",
          background: "rgba(239,89,36,0.1)",
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
            fontSize: "clamp(15px, 2.8vw, 17px)",
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
            fontSize: "clamp(12px, 2.5vw, 13px)",
            lineHeight: 1.65,
            color: "var(--color-text-secondary)",
            marginBottom: "14px",
          }}
        >
          {description}
        </p>

        <div
          style={{
            display: "grid",
            gap: "8px",
            padding: "clamp(9px, 2.2vw, 11px)",
            borderRadius: "10px",
            border: "1px solid rgba(239,89,36,0.22)",
            background: "rgba(239,89,36,0.07)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-brand-orange)",
            }}
          >
            If Ignored
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(11px, 2.3vw, 12px)",
              lineHeight: 1.55,
              color: "var(--color-text-secondary)",
            }}
          >
            {intel.risk}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-brand-orange)",
              marginTop: "2px",
            }}
          >
            You Get
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(11px, 2.3vw, 12px)",
              lineHeight: 1.55,
              color: "var(--color-text-secondary)",
            }}
          >
            {intel.gain}
          </p>
        </div>
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
        padding: "clamp(68px, 8vw, 80px) 24px clamp(88px, 11vw, 120px)",
        background: "var(--color-dark-surface)",
      }}
    >
      <div className="section-shell">
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
          className="grid-card-4"
          style={{
            gap: "clamp(12px, 2.8vw, 20px)",
          }}
        >
          {SERVICES.slice(0, 4).map((service, i) => (
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

        <div
          style={{
            marginTop: "clamp(16px, 2.8vw, 20px)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            href="/services"
            className="btn-animated"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "8px",
              background: "var(--gradient-brand-premium)",
              color: "#fff",
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "13px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            View All Services
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
