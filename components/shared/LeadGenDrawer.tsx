"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "motion/react";
import {
  X,
  ArrowRight,
  CheckCircle,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { submitLead, trackEvent } from "@/actions/lead";
import type { LeadActionResult } from "@/actions/lead";

// ── Types ──────────────────────────────────────────────────────────────────
type Intent = "marketing" | "training";
type FunnelStep = "proof" | "intent" | "form" | "success";

interface FormState {
  name: string;
  whatsapp: string;
  email: string;
  intent: Intent | null;
}

// ── Case Study Data (proof step) ──────────────────────────────────────────
const CASE_STUDIES = [
  {
    client: "Retail Brand, Kadapa",
    metric: "312%",
    label: "Revenue Growth",
    detail:
      "Ranked #1 on Google Maps within 90 days. 4× qualified lead volume.",
    tag: "SEO + GMB",
  },
  {
    client: "Fashion E-Commerce, AP",
    metric: "8.4×",
    label: "Return on Ad Spend",
    detail: "Meta Ads campaign restructure — same budget, 8× conversions.",
    tag: "Paid Ads",
  },
  {
    client: "Local Service Business",
    metric: "1,200+",
    label: "WhatsApp Leads / Month",
    detail:
      "Automated WhatsApp funnel converting cold traffic to booked appointments.",
    tag: "Automation",
  },
] as const;

// ── Individual Metric Card ─────────────────────────────────────────────────
function MetricCard({
  study,
  index,
}: {
  study: (typeof CASE_STUDIES)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1 + index * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid var(--color-border)",
        background: "var(--color-dark-surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Tag */}
      <span
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          fontFamily: "var(--font-body)",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-brand-orange)",
          background: "rgba(255,85,0,0.1)",
          padding: "3px 8px",
          borderRadius: "100px",
        }}
      >
        {study.tag}
      </span>

      <p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "42px",
          lineHeight: 1,
          color: "var(--color-brand-orange)",
          letterSpacing: "-0.03em",
          marginBottom: "4px",
        }}
      >
        {study.metric}
      </p>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "13px",
          color: "var(--color-text-primary)",
          marginBottom: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {study.label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
          marginBottom: "12px",
        }}
      >
        {study.detail}
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          color: "var(--color-text-muted)",
        }}
      >
        — {study.client}
      </p>
    </motion.div>
  );
}

// ── Input Field ────────────────────────────────────────────────────────────
function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  prefix,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  prefix?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: error
            ? "var(--color-brand-red)"
            : "var(--color-text-secondary)",
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: `1px solid ${
            error
              ? "var(--color-brand-red)"
              : focused
                ? "rgba(255,85,0,0.6)"
                : "var(--color-border)"
          }`,
          borderRadius: "8px",
          background: "var(--color-dark-elevated)",
          transition: "border-color 0.2s ease",
          boxShadow: focused ? "0 0 0 3px rgba(255,85,0,0.08)" : "none",
        }}
      >
        {prefix && (
          <span
            style={{
              padding: "0 12px",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "var(--color-text-muted)",
              borderRight: "1px solid var(--color-border)",
              userSelect: "none",
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: "13px 14px",
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--color-text-primary)",
            cursor: "none",
          }}
          autoComplete={
            type === "email" ? "email" : type === "tel" ? "tel" : "name"
          }
        />
      </div>
      {error && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "var(--color-brand-red)",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ── Main Drawer Component ──────────────────────────────────────────────────
export default function LeadGenDrawer({
  isOpen,
  onClose,
  sourcePage = "website",
  sourceCity,
}: {
  isOpen: boolean;
  onClose: () => void;
  sourcePage?: string;
  sourceCity?: string;
}) {
  const [step, setStep] = useState<FunnelStep>("proof");
  const [form, setForm] = useState<FormState>({
    name: "",
    whatsapp: "",
    email: "",
    intent: null,
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<string, string[]>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<LeadActionResult | null>(null);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep("proof");
        setForm({ name: "", whatsapp: "", email: "", intent: null });
        setFieldErrors({});
        setResult(null);
        setSubmitting(false);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Track funnel open
  useEffect(() => {
    if (isOpen) {
      trackEvent("drawer_opened", { sourcePage, sourceCity });
    }
  }, [isOpen, sourcePage, sourceCity]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent background page from scrolling while drawer is open
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.intent) return;
    setSubmitting(true);
    setFieldErrors({});

    const res = await submitLead({
      name: form.name,
      whatsapp: form.whatsapp,
      email: form.email,
      intent: form.intent,
      sourcePage,
      sourceCity,
    });

    setSubmitting(false);
    setResult(res);

    if (res.success) {
      setStep("success");
      trackEvent("lead_submitted", {
        intent: form.intent,
        sourcePage,
        sourceCity,
      });
    } else if (!res.success && res.fieldErrors) {
      setFieldErrors(res.fieldErrors);
    }
  }

  const stepTitles: Record<FunnelStep, string> = {
    proof: "See Our Results",
    intent: "Get This For Your Business",
    form: "Unlock Your Strategy",
    success: "You're In",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ──────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              zIndex: 60,
            }}
          />

          {/* ── Drawer Panel ──────────────────────────────────── */}
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={stepTitles[step]}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              height: "100dvh",
              width: "min(520px, 100vw)",
              zIndex: 61,
              background: "var(--color-dark-surface)",
              borderLeft: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              overscrollBehavior: "contain",
              touchAction: "pan-y",
            }}
          >
            {/* Top accent bar */}
            <div
              aria-hidden="true"
              style={{
                height: "3px",
                background:
                  "linear-gradient(90deg, var(--color-brand-orange) 0%, var(--color-brand-red) 100%)",
                flexShrink: 0,
              }}
            />

            {/* Header */}
            <div
              style={{
                padding: "20px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--color-border)",
                flexShrink: 0,
              }}
            >
              {/* Step progress */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {(["proof", "intent", "form"] as const).map((s, i) => (
                  <div
                    key={s}
                    aria-hidden="true"
                    style={{
                      width:
                        step === s || (step === "success" && i <= 2)
                          ? "24px"
                          : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background:
                        s === step || step === "success"
                          ? "var(--color-brand-orange)"
                          : (["proof", "intent", "form"] as const).indexOf(s) <
                              (["proof", "intent", "form"] as const).indexOf(
                                step as Exclude<FunnelStep, "success">,
                              )
                            ? "var(--color-brand-orange)"
                            : "var(--color-border-bright)",
                      transition: "all 0.4s ease",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={onClose}
                aria-label="Close drawer"
                style={{
                  background: "none",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  padding: "7px",
                  cursor: "none",
                  color: "var(--color-text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "var(--color-brand-red)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--color-brand-red)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "var(--color-border)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--color-text-secondary)";
                }}
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Content area */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
                padding: "28px",
              }}
            >
              <AnimatePresence mode="wait">
                {/* ── STEP 1: Proof ──────────────────────────── */}
                {step === "proof" && (
                  <motion.div
                    key="proof"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--color-brand-orange)",
                        marginBottom: "12px",
                      }}
                    >
                      Proven Results
                    </p>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(28px, 5vw, 36px)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.03em",
                        color: "var(--color-text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      Real Businesses.
                      <br />
                      <span style={{ color: "var(--color-brand-orange)" }}>
                        Real Numbers.
                      </span>
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.6,
                        marginBottom: "28px",
                      }}
                    >
                      Every result below was delivered from the exact same
                      region you're in.
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        marginBottom: "32px",
                      }}
                    >
                      {CASE_STUDIES.map((study, i) => (
                        <MetricCard key={i} study={study} index={i} />
                      ))}
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setStep("intent");
                        trackEvent("proof_step_completed", { sourcePage });
                      }}
                      style={{
                        width: "100%",
                        padding: "16px",
                        background: "var(--color-brand-orange)",
                        color: "#000",
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "14px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      Continue to Personalize
                      <ArrowRight size={16} strokeWidth={2} />
                    </motion.button>
                  </motion.div>
                )}

                {/* ── STEP 2: Intent ─────────────────────────── */}
                {step === "intent" && (
                  <motion.div
                    key="intent"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--color-brand-orange)",
                        marginBottom: "12px",
                      }}
                    >
                      Step 2 of 3
                    </p>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(28px, 5vw, 36px)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.03em",
                        color: "var(--color-text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      What are you here for?
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.6,
                        marginBottom: "32px",
                      }}
                    >
                      We'll personalise your experience based on your goal.
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      {(
                        [
                          {
                            value: "marketing" as const,
                            title: "I need Digital Marketing",
                            sub: "Grow my business, get leads, rank higher",
                            icon: "🚀",
                          },
                          {
                            value: "training" as const,
                            title: "I want Academy Training",
                            sub: "Learn professional skills, get certified",
                            icon: "🎓",
                          },
                        ] as const
                      ).map((opt) => (
                        <motion.button
                          key={opt.value}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setForm((f) => ({ ...f, intent: opt.value }));
                            setStep("form");
                            trackEvent("intent_selected", {
                              intent: opt.value,
                              sourcePage,
                            });
                          }}
                          style={{
                            padding: "20px",
                            background: "var(--color-dark-elevated)",
                            border: "1px solid var(--color-border)",
                            borderRadius: "12px",
                            cursor: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            textAlign: "left",
                            transition: "border-color 0.2s, background 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.borderColor = "var(--color-brand-orange)";
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "rgba(255,85,0,0.06)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.borderColor = "var(--color-border)";
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "var(--color-dark-elevated)";
                          }}
                        >
                          <span
                            aria-hidden="true"
                            style={{
                              fontSize: "28px",
                              lineHeight: 1,
                              flexShrink: 0,
                            }}
                          >
                            {opt.icon}
                          </span>
                          <div style={{ flex: 1 }}>
                            <p
                              style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                fontSize: "15px",
                                color: "var(--color-text-primary)",
                                marginBottom: "4px",
                              }}
                            >
                              {opt.title}
                            </p>
                            <p
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "13px",
                                color: "var(--color-text-muted)",
                              }}
                            >
                              {opt.sub}
                            </p>
                          </div>
                          <ChevronRight
                            size={16}
                            strokeWidth={1.5}
                            style={{
                              color: "var(--color-text-muted)",
                              flexShrink: 0,
                            }}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: Form ───────────────────────────── */}
                {step === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--color-brand-orange)",
                        marginBottom: "12px",
                      }}
                    >
                      Step 3 of 3 · Almost there
                    </p>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(28px, 5vw, 36px)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.03em",
                        color: "var(--color-text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      Unlock Your
                      <br />
                      <span style={{ color: "var(--color-brand-orange)" }}>
                        Custom Strategy
                      </span>
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.6,
                        marginBottom: "28px",
                      }}
                    >
                      We'll reach out within 2 hours with a tailored plan and
                      transparent pricing.
                    </p>

                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <FormField
                        label="Full Name"
                        value={form.name}
                        onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                        placeholder="Your name"
                        error={fieldErrors.name?.[0]}
                      />
                      <FormField
                        label="WhatsApp Number"
                        type="tel"
                        value={form.whatsapp}
                        onChange={(v) =>
                          setForm((f) => ({
                            ...f,
                            whatsapp: v.replace(/\D/g, "").slice(0, 10),
                          }))
                        }
                        placeholder="10-digit mobile number"
                        prefix="+91"
                        error={fieldErrors.whatsapp?.[0]}
                      />
                      <FormField
                        label="Email Address"
                        type="email"
                        value={form.email}
                        onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                        placeholder="you@company.com"
                        error={fieldErrors.email?.[0]}
                      />

                      {/* Intent badge */}
                      {form.intent && (
                        <button
                          type="button"
                          onClick={() => setStep("intent")}
                          className="btn-animated"
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "8px",
                            background: "rgba(255,85,0,0.08)",
                            border: "1px solid rgba(255,85,0,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "none",
                            textAlign: "left",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "13px",
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            Goal:{" "}
                            <span
                              style={{
                                color: "var(--color-brand-orange)",
                                fontWeight: 600,
                              }}
                            >
                              {form.intent === "marketing"
                                ? "Digital Marketing"
                                : "Academy Training"}
                            </span>
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "12px",
                              color: "var(--color-text-muted)",
                              textDecoration: "underline",
                            }}
                          >
                            Change
                          </span>
                        </button>
                      )}

                      {/* Server-level error */}
                      {result && !result.success && !result.fieldErrors && (
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "13px",
                            color: "var(--color-brand-red)",
                            padding: "12px",
                            borderRadius: "8px",
                            background: "rgba(232,0,45,0.08)",
                            border: "1px solid rgba(232,0,45,0.2)",
                          }}
                        >
                          {result.error}
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          width: "100%",
                          padding: "16px",
                          background: submitting
                            ? "var(--color-dark-elevated)"
                            : "var(--color-brand-orange)",
                          color: submitting
                            ? "var(--color-text-muted)"
                            : "#000",
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: "14px",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          border: "none",
                          borderRadius: "8px",
                          cursor: submitting ? "not-allowed" : "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          marginTop: "8px",
                          transition: "background 0.3s, color 0.3s",
                        }}
                      >
                        {submitting ? (
                          <>
                            <Loader2
                              size={16}
                              strokeWidth={1.5}
                              className="animate-spin"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Get My Free Strategy
                            <ArrowRight size={16} strokeWidth={2} />
                          </>
                        )}
                      </motion.button>

                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "11px",
                          color: "var(--color-text-muted)",
                          textAlign: "center",
                          lineHeight: 1.5,
                        }}
                      >
                        No spam. No commitment. We'll call you within 2 hours.
                      </p>
                    </form>
                  </motion.div>
                )}

                {/* ── STEP 4: Success ────────────────────────── */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "60vh",
                      textAlign: "center",
                      gap: "24px",
                    }}
                  >
                    {/* Animated check */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.1,
                      }}
                    >
                      <CheckCircle
                        size={64}
                        strokeWidth={1.5}
                        style={{ color: "var(--color-brand-orange)" }}
                      />
                    </motion.div>

                    <div>
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: "36px",
                          lineHeight: 1.1,
                          letterSpacing: "-0.03em",
                          color: "var(--color-text-primary)",
                          marginBottom: "12px",
                        }}
                      >
                        You&apos;re in,{" "}
                        <span style={{ color: "var(--color-brand-orange)" }}>
                          {form.name.split(" ")[0]}
                        </span>
                        .
                      </h2>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "15px",
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.6,
                          maxWidth: "360px",
                          margin: "0 auto",
                        }}
                      >
                        Our team will WhatsApp you at{" "}
                        <strong style={{ color: "var(--color-text-primary)" }}>
                          +91 {form.whatsapp}
                        </strong>{" "}
                        within 2 hours with your personalised strategy.
                      </p>
                    </div>

                    <div
                      style={{
                        padding: "16px 24px",
                        borderRadius: "12px",
                        background: "var(--color-dark-elevated)",
                        border: "1px solid var(--color-border)",
                        width: "100%",
                        maxWidth: "360px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          color: "var(--color-text-muted)",
                          marginBottom: "4px",
                        }}
                      >
                        Meanwhile, reach us directly:
                      </p>
                      <a
                        href={`https://wa.me/91${BUSINESS_DATA_PHONE}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "20px",
                          color: "var(--color-brand-orange)",
                          textDecoration: "none",
                        }}
                      >
                        +91 {BUSINESS_DATA_PHONE}
                      </a>
                    </div>

                    <button
                      onClick={onClose}
                      style={{
                        background: "none",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                        padding: "12px 28px",
                        cursor: "none",
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "13px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// Inline constant to avoid circular import in the success step
const BUSINESS_DATA_PHONE = "7382440976";
