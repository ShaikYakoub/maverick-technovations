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
} from "lucide-react";
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
    icon: Gauge,
  },
  {
    title: "Transparent performance reporting",
    icon: Layers,
  },
  {
    title: "South India market intelligence",
    icon: Radar,
  },
  {
    title: "Agency + Academy capability",
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
      <section className="section-shell" style={{ padding: "0 24px 72px" }}>
        <div style={{ display: "grid", gap: "18px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(24px, 3.2vw, 34px)",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
            }}
          >
            Service categories built to
            <span className="text-brand-gradient"> compound together.</span>
          </h2>
          <div className="grid-card-4" style={{ gap: "14px" }}>
            {SERVICE_CATEGORIES.map((category, idx) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.08, duration: 0.45 }}
                  style={{
                    borderRadius: "14px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-dark-elevated)",
                    padding: "16px",
                    display: "grid",
                    gap: "10px",
                  }}
                >
                  <span
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
                      strokeWidth={1.6}
                      style={{ color: "var(--color-brand-orange)" }}
                    />
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {category.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      lineHeight: 1.65,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {category.body}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {category.slugs
                      .map(
                        (slug) =>
                          SERVICES.find((service) => service.slug === slug)
                            ?.shortTitle,
                      )
                      .filter(Boolean)
                      .join(" • ")}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell" style={{ padding: "0 24px 72px" }}>
        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "16px",
            background: "var(--color-dark-elevated)",
            padding: "28px",
            display: "grid",
            gap: "18px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(24px, 3.2vw, 34px)",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
            }}
          >
            Service Packages designed to move you toward
            <span className="text-brand-gradient"> Market Dominance.</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "var(--color-text-secondary)",
            }}
          >
            Pick your operating level. Lower tiers are valid, but they
            intentionally leave growth multipliers on the table.
          </p>

          <div className="grid-card-4" style={{ gap: "14px" }}>
            {PACKAGE_STACK.map((plan) => {
              const Icon = plan.icon;
              const active = selectedPlan === plan.name;
              return (
                <motion.button
                  key={plan.name}
                  type="button"
                  onClick={() => setSelectedPlan(plan.name)}
                  whileHover={{ y: -5 }}
                  style={{
                    textAlign: "left",
                    borderRadius: "14px",
                    border: active
                      ? "1px solid rgba(239,89,36,0.52)"
                      : "1px solid var(--color-border)",
                    background:
                      active || plan.featured
                        ? "linear-gradient(160deg, rgba(249,160,27,0.16), rgba(211,32,39,0.1))"
                        : "var(--color-dark-surface)",
                    padding: "16px",
                    display: "grid",
                    gap: "10px",
                    position: "relative",
                  }}
                >
                  {plan.featured ? (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        fontFamily: "var(--font-body)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      Most Chosen
                    </span>
                  ) : null}
                  <span
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
                      strokeWidth={1.6}
                      style={{ color: "var(--color-brand-orange)" }}
                    />
                  </span>
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
                      lineHeight: 1.6,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {plan.promise}
                  </p>
                </motion.button>
              );
            })}
          </div>

          <div
            style={{
              borderRadius: "14px",
              border: "1px solid rgba(239,89,36,0.4)",
              background: "rgba(239,89,36,0.07)",
              padding: "16px",
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
            <div className="grid-card-2" style={{ gap: "12px" }}>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-brand-orange)",
                    marginBottom: "8px",
                  }}
                >
                  You Get
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "grid",
                    gap: "6px",
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
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-brand-red)",
                    marginBottom: "8px",
                  }}
                >
                  If you stay on {selected.name}, you miss
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "grid",
                    gap: "6px",
                  }}
                >
                  {(selected.name === "Market Dominance"
                    ? ["None. You unlock the full growth stack."]
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
            <button
              type="button"
              style={{
                marginTop: "4px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px 18px",
                borderRadius: "999px",
                border: "none",
                background: "var(--gradient-brand-premium)",
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "12px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                width: "fit-content",
              }}
            >
              Lock {selected.name}
              <ArrowRight size={14} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </section>

      <section className="section-shell" style={{ padding: "0 24px 72px" }}>
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
            How we operate with
            <span className="text-brand-gradient"> execution intensity.</span>
          </h2>
          <div className="grid-card-4" style={{ gap: "12px" }}>
            {OPERATE_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  whileHover={{ y: -6 }}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
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

      <section className="section-shell" style={{ padding: "0 24px 72px" }}>
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
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.05, duration: 0.35 }}
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
        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "16px",
            background: "var(--color-dark-elevated)",
            padding: "24px",
            display: "grid",
            gap: "16px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(24px, 3.2vw, 34px)",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
            }}
          >
            Ready to work together?
            <span className="text-brand-gradient">
              {" "}
              Build a predictable revenue system.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              lineHeight: 1.75,
              color: "var(--color-text-secondary)",
              maxWidth: "760px",
            }}
          >
            Strategy, execution, and reporting under one operating roof. We help
            you scale faster without wasting budget on guesswork.
          </p>
          <div className="grid-card-4" style={{ gap: "10px" }}>
            {VALUE_TILES.map((tile, index) => {
              const Icon = tile.icon;
              return (
                <motion.div
                  key={tile.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                  whileHover={{ y: -4 }}
                  style={{
                    borderRadius: "12px",
                    border: "1px solid rgba(239,89,36,0.28)",
                    background: "rgba(239,89,36,0.08)",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    style={{ color: "var(--color-brand-orange)" }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {tile.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
