"use client";

import { useMemo, useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import { motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Bot,
  Briefcase,
  Gauge,
  Globe2,
  Layers,
  Megaphone,
  Radar,
  Sparkles,
  TrendingUp,
  Users,
} from "@/lib/icons";
import { SERVICES } from "@/lib/constants";

interface ServicePlan {
  name: string;
  price: string;
  icon: ComponentType<{
    size?: number;
    strokeWidth?: number;
    style?: CSSProperties;
  }>;
  promise: string;
  includes: string[];
  featured?: boolean;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: {
    duration: 0.62,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

const SERVICE_CATEGORIES = [
  {
    title: "Acquisition Engine",
    body: "Capture high-intent demand and convert quickly.",
    icon: TrendingUp,
    slugs: ["digital-marketing", "seo", "google-ads", "social-media-marketing"],
  },
  {
    title: "Visibility & Reputation",
    body: "Own local presence and trust signals before competitors.",
    icon: Radar,
    slugs: ["google-my-business", "influencer-marketing", "graphic-designing"],
  },
  {
    title: "Retention & Automation",
    body: "Increase repeat purchases through lifecycle systems.",
    icon: Bot,
    slugs: ["email-marketing", "whatsapp-marketing"],
  },
  {
    title: "Platform & Commerce",
    body: "Build web assets that support scale and conversion.",
    icon: Globe2,
    slugs: ["website-design", "ecommerce", "video-shooting"],
  },
] as const;

const PACKAGE_STACK: ServicePlan[] = [
  {
    name: "Starter",
    price: "₹15,000/mo",
    icon: Layers,
    promise: "Get active with foundational campaigns.",
    includes: [
      "Core channel setup",
      "Monthly optimization review",
      "Basic reporting dashboard",
      "Landing page health audit",
    ],
  },
  {
    name: "Growth Pro",
    price: "₹35,000/mo",
    icon: Gauge,
    promise: "Scale with weekly optimisation and creative velocity.",
    includes: [
      "Everything in Starter",
      "Multi-channel execution",
      "Weekly campaign optimization",
      "Creative + conversion support",
      "Lead quality scoring",
    ],
    featured: true,
  },
  {
    name: "Market Dominance",
    price: "₹58,000/mo",
    icon: Sparkles,
    promise: "Build a compounding growth machine with strategy depth.",
    includes: [
      "Everything in Growth Pro",
      "Dedicated strategist",
      "Advanced attribution stack",
      "Scale playbooks + automation",
      "Executive growth war-room",
    ],
  },
];

const OPERATE_STEPS = [
  {
    title: "Diagnostic Sprint",
    body: "We map your funnel leaks, CAC pressure points, and growth constraints in week one.",
    icon: Activity,
  },
  {
    title: "Execution Cadence",
    body: "Campaigns, creatives, and automations ship on a weekly operating rhythm.",
    icon: Megaphone,
  },
  {
    title: "Optimisation Loops",
    body: "Live insights trigger rapid changes in targeting, messaging, and budget mix.",
    icon: BadgeCheck,
  },
  {
    title: "Scale Decisions",
    body: "Leadership dashboards translate data into confident expansion decisions.",
    icon: Briefcase,
  },
] as const;

const TEAM_PODS = [
  "Performance Media Pod",
  "SEO + Content Pod",
  "Conversion Design Pod",
  "Automation + CRM Pod",
  "Video + Creative Pod",
  "Local Growth Pod",
] as const;

const VALUE_TILES = [
  {
    title: "Weekly optimisation cycles",
    detail: "No dead months. Strategy gets re-scoped every single week.",
    icon: Gauge,
  },
  {
    title: "Transparent performance reporting",
    detail:
      "Spend, lead quality, and conversion movement stay visible to leadership.",
    icon: Layers,
  },
  {
    title: "South India market intelligence",
    detail:
      "Local buyer behavior shapes messaging, timing, and channel mix decisions.",
    icon: Radar,
  },
  {
    title: "Agency + Academy capability",
    detail:
      "Execution capacity and talent enablement live under one operating roof.",
    icon: Users,
  },
] as const;

export default function ServicesShowcase() {
  const [selectedPlan, setSelectedPlan] = useState("Growth Pro");

  const selected = useMemo(
    () =>
      PACKAGE_STACK.find((plan) => plan.name === selectedPlan) ??
      PACKAGE_STACK[1],
    [selectedPlan],
  );

  const elite = PACKAGE_STACK[2];
  const selectedIncludes = new Set(selected.includes);
  const selectedHasGrowthBundle = selected.includes.includes(
    "Everything in Growth Pro",
  );
  const missedCapabilities = elite.includes.filter(
    (item) => !selectedIncludes.has(item) && !selectedHasGrowthBundle,
  );

  return (
    <>
      <section className="section-shell" style={{ padding: "0 24px 80px" }}>
        <motion.div
          {...fadeUp()}
          style={{
            border: "1px solid rgba(239,89,36,0.18)",
            borderRadius: "24px",
            background:
              "radial-gradient(circle at top right, rgba(239,89,36,0.18) 0%, rgba(18,18,18,0.98) 34%, rgba(10,10,10,1) 100%)",
            padding: "clamp(22px, 4vw, 34px)",
            display: "grid",
            gap: "22px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-120px",
              right: "-40px",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(249,160,27,0.18) 0%, transparent 72%)",
              filter: "blur(8px)",
            }}
          />
          <div
            style={{
              display: "grid",
              gap: "12px",
              position: "relative",
              zIndex: 1,
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
              Growth Architecture
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(26px, 4.2vw, 42px)",
                letterSpacing: "-0.04em",
                color: "var(--color-text-primary)",
                maxWidth: "760px",
                lineHeight: 1.05,
              }}
            >
              Service categories built to
              <span className="text-brand-gradient"> compound together.</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                lineHeight: 1.72,
                color: "var(--color-text-secondary)",
                maxWidth: "620px",
              }}
            >
              Strong growth does not come from one channel in isolation. These
              pods are designed to stack, feed each other, and keep your revenue
              system resilient.
            </p>
          </div>

          <div
            className="grid-card-4"
            style={{ gap: "14px", position: "relative", zIndex: 1 }}
          >
            {SERVICE_CATEGORIES.map((category, idx) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  {...fadeUp(idx * 0.08)}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    borderRadius: "18px",
                    border: "1px solid rgba(239,89,36,0.18)",
                    background:
                      "linear-gradient(180deg, rgba(24,24,24,0.98) 0%, rgba(14,14,14,0.98) 100%)",
                    padding: "18px",
                    display: "grid",
                    gap: "12px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: "auto -50px -80px auto",
                      width: "160px",
                      height: "160px",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(239,89,36,0.12) 0%, transparent 72%)",
                    }}
                  />
                  <span
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "14px",
                      border: "1px solid rgba(239,89,36,0.28)",
                      background: "rgba(239,89,36,0.1)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      style={{ color: "var(--color-brand-orange)" }}
                    />
                  </span>
                  <div
                    style={{
                      display: "grid",
                      gap: "8px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "18px",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {category.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        lineHeight: 1.68,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {category.body}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {category.slugs
                      .map(
                        (slug) =>
                          SERVICES.find((service) => service.slug === slug)
                            ?.shortTitle,
                      )
                      .filter(Boolean)
                      .map((service) => (
                        <span
                          key={service}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "8px 10px",
                            borderRadius: "999px",
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "rgba(255,255,255,0.03)",
                            color: "var(--color-text-secondary)",
                            fontFamily: "var(--font-body)",
                            fontSize: "11px",
                            fontWeight: 600,
                          }}
                        >
                          {service}
                        </span>
                      ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="section-shell" style={{ padding: "0 24px 80px" }}>
        <div
          style={{
            border: "1px solid rgba(239,89,36,0.18)",
            borderRadius: "24px",
            background:
              "linear-gradient(180deg, rgba(24,24,24,0.98) 0%, rgba(12,12,12,0.98) 100%)",
            padding: "clamp(22px, 4vw, 34px)",
            display: "grid",
            gap: "22px",
          }}
        >
          <div style={{ display: "grid", gap: "10px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(24px, 3.4vw, 38px)",
                letterSpacing: "-0.04em",
                color: "var(--color-text-primary)",
                lineHeight: 1.06,
              }}
            >
              Service packages designed to move you toward
              <span className="text-brand-gradient"> market dominance.</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.72,
                maxWidth: "700px",
              }}
            >
              Featured means the best balance for most brands. Selected means
              the plan you are comparing right now. Those signals should never
              look the same.
            </p>
          </div>

          <div className="grid-card-4" style={{ gap: "14px" }}>
            {PACKAGE_STACK.map((plan, index) => {
              const Icon = plan.icon;
              const active = selectedPlan === plan.name;
              const featured = Boolean(plan.featured);
              return (
                <motion.button
                  key={plan.name}
                  type="button"
                  {...fadeUp(index * 0.06)}
                  onClick={() => setSelectedPlan(plan.name)}
                  whileHover={{ y: -8 }}
                  style={{
                    textAlign: "left",
                    borderRadius: "18px",
                    border: active
                      ? "1px solid rgba(249,160,27,0.72)"
                      : featured
                        ? "1px solid rgba(239,89,36,0.4)"
                        : "1px solid var(--color-border)",
                    background: active
                      ? "linear-gradient(160deg, rgba(249,160,27,0.18), rgba(239,89,36,0.12))"
                      : featured
                        ? "linear-gradient(160deg, rgba(239,89,36,0.14), rgba(211,32,39,0.08))"
                        : "var(--color-dark-surface)",
                    padding: "18px",
                    display: "grid",
                    gap: "12px",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: active
                      ? "0 22px 60px rgba(239,89,36,0.18)"
                      : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        border: "1px solid rgba(239,89,36,0.28)",
                        background: "rgba(239,89,36,0.1)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.7}
                        style={{ color: "var(--color-brand-orange)" }}
                      />
                    </span>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        justifyContent: "flex-end",
                      }}
                    >
                      {featured ? (
                        <span
                          style={{
                            padding: "7px 10px",
                            borderRadius: "999px",
                            border: "1px solid rgba(239,89,36,0.3)",
                            background: "transparent",
                            color: "var(--color-text-primary)",
                            fontFamily: "var(--font-body)",
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          Most Chosen
                        </span>
                      ) : null}
                      {active ? (
                        <span
                          style={{
                            padding: "7px 10px",
                            borderRadius: "999px",
                            border: "1px solid rgba(249,160,27,0.42)",
                            background: "rgba(249,160,27,0.14)",
                            color: "var(--color-brand-orange-light)",
                            fontFamily: "var(--font-body)",
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          Selected
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: "8px" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: active
                          ? "var(--color-brand-orange-light)"
                          : "var(--color-brand-orange)",
                      }}
                    >
                      {plan.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(20px, 3vw, 28px)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {plan.price}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        lineHeight: 1.65,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {plan.promise}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="grid-balance-2" style={{ gap: "14px" }}>
            <div
              style={{
                borderRadius: "18px",
                border: "1px solid rgba(249,160,27,0.28)",
                background: "rgba(249,160,27,0.06)",
                padding: "18px",
                display: "grid",
                gap: "12px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "18px",
                  color: "var(--color-text-primary)",
                }}
              >
                Selected plan: {selected.name}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "grid",
                  gap: "7px",
                }}
              >
                {selected.includes.map((benefit) => (
                  <li
                    key={benefit}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    • {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                borderRadius: "18px",
                border: "1px solid rgba(211,32,39,0.22)",
                background: "rgba(211,32,39,0.06)",
                padding: "18px",
                display: "grid",
                gap: "12px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "18px",
                  color: "var(--color-text-primary)",
                }}
              >
                What you leave on the table
              </p>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "grid",
                  gap: "7px",
                }}
              >
                {(selected.name === "Market Dominance"
                  ? ["None. This unlocks the full growth stack."]
                  : missedCapabilities
                ).map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "13px 18px",
              borderRadius: "999px",
              border: "none",
              background: "var(--gradient-brand-premium)",
              color: "#fff",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              width: "fit-content",
              textDecoration: "none",
            }}
          >
            Lock {selected.name}
            <ArrowRight size={14} strokeWidth={1.8} />
          </a>
        </div>
      </section>

      <section className="section-shell" style={{ padding: "0 24px 80px" }}>
        <div
          style={{
            border: "1px solid rgba(239,89,36,0.16)",
            borderRadius: "24px",
            background:
              "linear-gradient(180deg, rgba(20,20,20,0.96) 0%, rgba(10,10,10,0.98) 100%)",
            padding: "clamp(20px, 4vw, 30px)",
            display: "grid",
            gap: "16px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-90px",
              left: "-70px",
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(239,89,36,0.2) 0%, transparent 72%)",
              filter: "blur(6px)",
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(24px, 3.2vw, 34px)",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              position: "relative",
              zIndex: 1,
            }}
          >
            How we operate with
            <span className="text-brand-gradient"> execution intensity.</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              lineHeight: 1.72,
              color: "var(--color-text-secondary)",
              maxWidth: "760px",
              position: "relative",
              zIndex: 1,
            }}
          >
            Every campaign runs inside one execution rhythm: diagnose fast,
            launch with discipline, optimise weekly, and convert learning into
            repeatable scale decisions.
          </p>

          <div
            className="grid-balance-2"
            style={{ gap: "14px", position: "relative", zIndex: 1 }}
          >
            <div
              style={{
                borderRadius: "18px",
                border: "1px solid rgba(239,89,36,0.16)",
                background: "rgba(255,255,255,0.02)",
                padding: "16px",
                display: "grid",
                gap: "10px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-orange)",
                }}
              >
                Operating Tempo
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(22px, 3vw, 30px)",
                  lineHeight: 1.08,
                  color: "var(--color-text-primary)",
                }}
              >
                Weekly execution loops.
                <span className="text-brand-gradient">
                  {" "}
                  Monthly strategic reset.
                </span>
              </p>
              <div
                style={{
                  borderRadius: "999px",
                  border: "1px solid rgba(239,89,36,0.22)",
                  background: "rgba(239,89,36,0.08)",
                  padding: "8px 12px",
                  display: "inline-flex",
                  width: "fit-content",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  color: "var(--color-text-secondary)",
                }}
              >
                Signal -&gt; Decision -&gt; Action -&gt; Learning
              </div>
            </div>

            <div
              style={{
                borderRadius: "18px",
                border: "1px solid rgba(249,160,27,0.22)",
                background: "rgba(249,160,27,0.06)",
                padding: "16px",
                display: "grid",
                gap: "10px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-orange)",
                }}
              >
                Governance Layer
              </p>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "grid",
                  gap: "8px",
                }}
              >
                {[
                  "Leadership dashboard for spend, lead quality, and conversion health",
                  "Weekly creative and funnel review with clear next actions",
                  "Role-based pod ownership so no growth lever is unmanaged",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      lineHeight: 1.62,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="grid-card-4"
            style={{ gap: "12px", position: "relative", zIndex: 1 }}
          >
            {OPERATE_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  {...fadeUp(index * 0.06)}
                  whileHover={{ y: -6 }}
                  style={{
                    borderRadius: "14px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-dark-elevated)",
                    padding: "16px",
                    display: "grid",
                    gap: "10px",
                  }}
                >
                  <motion.span
                    whileHover={{ rotate: 8, scale: 1.06 }}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      border: "1px solid rgba(239,89,36,0.28)",
                      background: "rgba(239,89,36,0.1)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.7}
                      style={{ color: "var(--color-brand-orange)" }}
                    />
                  </motion.span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      lineHeight: 1.65,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {step.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell" style={{ padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gap: "14px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(24px, 3.2vw, 34px)",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
            }}
          >
            Specialist pods behind every
            <span className="text-brand-gradient"> growth lever.</span>
          </h2>
          <div className="grid-card-4" style={{ gap: "12px" }}>
            {TEAM_PODS.map((pod, idx) => (
              <motion.div
                key={pod}
                {...fadeUp(idx * 0.05)}
                style={{
                  borderRadius: "14px",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-dark-elevated)",
                  padding: "16px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "var(--color-text-primary)",
                    marginBottom: "6px",
                  }}
                >
                  {pod}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    lineHeight: 1.65,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Cross-functional execution team aligned to one KPI set and one
                  growth dashboard.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell" style={{ padding: "0 24px 72px" }}>
        <motion.div
          {...fadeUp()}
          style={{
            border: "1px solid rgba(239,89,36,0.22)",
            borderRadius: "26px",
            background:
              "radial-gradient(circle at top left, rgba(249,160,27,0.16) 0%, rgba(18,18,18,0.98) 32%, rgba(10,10,10,1) 100%)",
            padding: "clamp(24px, 4vw, 34px)",
            display: "grid",
            gap: "18px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-80px",
              bottom: "-110px",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(211,32,39,0.18) 0%, transparent 72%)",
            }}
          />
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-brand-orange)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Sparkles size={14} />
            Ready to work together?
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 46px)",
              letterSpacing: "-0.04em",
              color: "var(--color-text-primary)",
              maxWidth: "780px",
              lineHeight: 1.05,
              position: "relative",
              zIndex: 1,
            }}
          >
            Build a revenue system that can handle
            <span className="text-brand-gradient"> real growth pressure.</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              lineHeight: 1.74,
              color: "var(--color-text-secondary)",
              maxWidth: "700px",
              position: "relative",
              zIndex: 1,
            }}
          >
            Strategy, execution, reporting, and talent enablement stay
            connected. That is how brands stop patching channels and start
            compounding outcomes.
          </p>
          <div
            className="grid-card-4"
            style={{ gap: "10px", position: "relative", zIndex: 1 }}
          >
            {VALUE_TILES.map((tile, index) => {
              const Icon = tile.icon;
              return (
                <motion.div
                  key={tile.title}
                  {...fadeUp(index * 0.05)}
                  whileHover={{ y: -4 }}
                  style={{
                    borderRadius: "14px",
                    border: "1px solid rgba(239,89,36,0.22)",
                    background: "rgba(255,255,255,0.03)",
                    padding: "14px",
                    display: "grid",
                    gap: "8px",
                  }}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    style={{ color: "var(--color-brand-orange)" }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {tile.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      lineHeight: 1.6,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {tile.detail}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 18px",
                borderRadius: "999px",
                border: "none",
                background: "var(--gradient-brand-premium)",
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "12px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Book Strategy Call
              <ArrowRight size={14} strokeWidth={1.8} />
            </a>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "13px 16px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Weekly operating rhythm. Clear ROI visibility. No fluff layer.
            </span>
          </div>
        </motion.div>
      </section>
    </>
  );
}
