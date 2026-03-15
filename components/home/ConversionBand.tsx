"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeIndianRupee,
  BookOpen,
  Building2,
  MapPin,
} from "@/lib/icons";
import { BUSINESS_DATA } from "@/lib/constants";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: {
    duration: 0.62,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

const PATHS = [
  {
    title: "Grow the business",
    body: "Launch campaigns, rebuild your funnel, or fix the part of your growth engine that is leaking revenue.",
    action: "Book a strategy call",
    icon: Building2,
    tone: "var(--color-brand-orange)",
    kind: "drawer",
  },
  {
    title: "Start the skill track",
    body: "Choose the academy path that gets you practical execution, resume support, and hiring-ready outcomes.",
    href: "/academy",
    action: "View academy programs",
    icon: BookOpen,
    tone: "var(--color-brand-red)",
    kind: "link",
  },
  {
    title: "Strategy & Pricing",
    body: "Download our comprehensive blueprint and unlock the exact tiers we use to scale brands.",
    action: "Get the blueprint",
    icon: BadgeIndianRupee,
    tone: "var(--color-brand-orange)",
    kind: "drawer",
  },
  {
    title: "Visit or contact us",
    body: `${BUSINESS_DATA.address.city} office access, direct phone support, and a fast response window for service or admission enquiries.`,
    href: "/contact",
    action: "Open contact options",
    icon: MapPin,
    tone: "var(--color-brand-orange)",
    kind: "link",
  },
] as const;

interface ConversionBandProps {
  onOpenDrawer: () => void;
}

export default function ConversionBand({ onOpenDrawer }: ConversionBandProps) {
  return (
    <section
      aria-labelledby="conversion-band-heading"
      style={{
        padding: "clamp(72px, 10vw, 98px) 24px clamp(88px, 11vw, 124px)",
        background:
          "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(18,18,18,0.95) 18%, rgba(10,10,10,1) 100%)",
      }}
    >
      <div className="section-shell">
        <motion.div
          {...fadeUp()}
          style={{
            display: "grid",
            gap: "clamp(12px, 2.6vw, 16px)",
            marginBottom: "clamp(24px, 4vw, 36px)",
            justifyItems: "start",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-brand-orange)",
            }}
          >
            Your Next Move
          </p>
          <h2
            id="conversion-band-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(28px, 5vw, 54px)",
              letterSpacing: "-0.05em",
              lineHeight: 1.02,
              color: "var(--color-text-primary)",
              maxWidth: "780px",
            }}
          >
            One homepage. Clear paths.
            <br />
            <span className="text-brand-gradient">
              No clutter between intent and action.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(13px, 2.5vw, 15px)",
              lineHeight: 1.75,
              color: "var(--color-text-secondary)",
              maxWidth: "640px",
            }}
          >
            If you need growth, training, or a direct line to the team, the next
            step should be obvious. This section closes the homepage with the
            only actions most visitors actually need.
          </p>
        </motion.div>

        <div
          className="grid-card-4"
          style={{
            gap: "clamp(12px, 2.6vw, 16px)",
            marginBottom: "clamp(18px, 3vw, 28px)",
          }}
        >
          {PATHS.map((item, index) => {
            const Icon = item.icon;
            const cardStyle: CSSProperties = {
              display: "flex",
              flexDirection: "column",
              gap: "clamp(14px, 2.8vw, 18px)",
              minHeight: "100%",
              width: "100%",
              padding: "clamp(20px, 4.4vw, 26px)",
              borderRadius: "20px",
              border: "1px solid rgba(239,89,36,0.16)",
              background:
                "linear-gradient(180deg, rgba(24,24,24,0.98) 0%, rgba(14,14,14,0.98) 100%)",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
              textAlign: "left",
              boxShadow: "0 18px 40px rgba(0,0,0,0.16)",
            };

            const content = (
              <>
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "auto -20px -70px auto",
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${item.tone}26 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "14px 14px auto auto",
                    width: "72px",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent 0%, ${item.tone} 100%)`,
                    opacity: 0.8,
                  }}
                />

                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid color-mix(in srgb, ${item.tone} 34%, transparent)`,
                    background: `color-mix(in srgb, ${item.tone} 14%, transparent)`,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    style={{ color: item.tone }}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: "10px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(18px, 3vw, 24px)",
                      letterSpacing: "-0.03em",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(12px, 2.4vw, 14px)",
                      lineHeight: 1.7,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {item.body}
                  </p>
                </div>

                <span
                  style={{
                    marginTop: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: item.tone,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {item.action}
                  <ArrowRight size={14} strokeWidth={2} />
                </span>
              </>
            );

            if (item.kind === "drawer") {
              return (
                <motion.button
                  key={item.title}
                  type="button"
                  {...fadeUp(index * 0.08)}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="btn-animated"
                  onClick={onOpenDrawer}
                  style={cardStyle}
                >
                  {content}
                </motion.button>
              );
            }

            return (
              <motion.a
                key={item.title}
                {...fadeUp(index * 0.08)}
                whileHover={{ y: -10, scale: 1.02 }}
                href={item.href}
                className="btn-animated"
                style={{
                  ...cardStyle,
                  display: "flex",
                }}
              >
                {content}
              </motion.a>
            );
          })}
        </div>

        <motion.div
          {...fadeUp(0.16)}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "stretch",
            justifyContent: "space-between",
            padding: "clamp(16px, 3vw, 20px) clamp(16px, 3.2vw, 24px)",
            borderRadius: "18px",
            border: "1px solid rgba(239,89,36,0.16)",
            background:
              "linear-gradient(180deg, rgba(20,20,20,0.96) 0%, rgba(14,14,14,0.96) 100%)",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: "8px",
              flex: "1 1 430px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(20px, 3.4vw, 30px)",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                lineHeight: 1.12,
              }}
            >
              Every engagement runs on one operating rhythm,
              <span className="text-brand-gradient"> built for momentum.</span>
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(12px, 2.3vw, 13px)",
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
                maxWidth: "620px",
              }}
            >
              Strategy maps the priorities, execution ships in weekly sprints,
              and reporting keeps each move tied to measurable business impact.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
