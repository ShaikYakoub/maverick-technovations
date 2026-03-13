"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitLead, trackEvent } from "@/actions/lead";

type Intent = "marketing" | "training";

interface FormState {
  name: string;
  whatsapp: string;
  email: string;
  intent: "marketing" | "training";
}

interface AttributionState {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  fbclid: string;
  msclkid: string;
  landingPath: string;
  referrer: string;
}

export default function ContactLeadForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    whatsapp: "",
    email: "",
    intent: "marketing",
  });
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormState, string[]>>
  >({});
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [attribution, setAttribution] = useState<AttributionState>({
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
    gclid: "",
    fbclid: "",
    msclkid: "",
    landingPath: "",
    referrer: "",
  });

  const intentCopy =
    form.intent === "marketing"
      ? {
          button: "Request Free Strategy Call",
          success:
            "Thanks! Our growth team will contact you shortly with next steps.",
        }
      : {
          button: "Request Course Counselling",
          success:
            "Thanks! Our academy counsellor will contact you shortly with batch and fee details.",
        };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const routeIntent = params.get("intent");
    if (routeIntent === "training") {
      setForm((prev) => ({ ...prev, intent: "training" }));
    }

    setAttribution({
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      utmTerm: params.get("utm_term") ?? "",
      utmContent: params.get("utm_content") ?? "",
      gclid: params.get("gclid") ?? "",
      fbclid: params.get("fbclid") ?? "",
      msclkid: params.get("msclkid") ?? "",
      landingPath: `${window.location.pathname}${window.location.search}`,
      referrer: document.referrer || "direct",
    });
  }, []);

  const attributionSource = [
    `contact-${form.intent}`,
    attribution.utmSource ? `utm_source=${attribution.utmSource}` : "",
    attribution.utmMedium ? `utm_medium=${attribution.utmMedium}` : "",
    attribution.utmCampaign ? `utm_campaign=${attribution.utmCampaign}` : "",
    attribution.gclid ? `gclid=${attribution.gclid}` : "",
    attribution.fbclid ? `fbclid=${attribution.fbclid}` : "",
    attribution.msclkid ? `msclkid=${attribution.msclkid}` : "",
  ]
    .filter(Boolean)
    .join("|");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setSuccess(false);
    setFieldErrors({});

    const result = await submitLead({
      ...form,
      sourcePage: attributionSource,
      utmSource: attribution.utmSource || undefined,
      utmMedium: attribution.utmMedium || undefined,
      utmCampaign: attribution.utmCampaign || undefined,
      utmTerm: attribution.utmTerm || undefined,
      utmContent: attribution.utmContent || undefined,
      gclid: attribution.gclid || undefined,
      fbclid: attribution.fbclid || undefined,
      msclkid: attribution.msclkid || undefined,
      landingPath: attribution.landingPath || undefined,
      referrer: attribution.referrer || undefined,
    });

    setSubmitting(false);

    if (result.success) {
      setSuccess(true);
      setMessage(intentCopy.success);
      setForm({ name: "", whatsapp: "", email: "", intent: form.intent });
      await trackEvent("contact_form_submitted", { intent: form.intent });
      await trackEvent(`contact_form_submitted_${form.intent}`, {
        intent: form.intent,
        sourcePage: attributionSource,
        utmSource: attribution.utmSource || "",
        utmMedium: attribution.utmMedium || "",
        utmCampaign: attribution.utmCampaign || "",
        utmTerm: attribution.utmTerm || "",
        utmContent: attribution.utmContent || "",
        gclid: attribution.gclid || "",
        fbclid: attribution.fbclid || "",
        msclkid: attribution.msclkid || "",
        landingPath: attribution.landingPath || "",
        referrer: attribution.referrer || "",
      });
      return;
    }

    setSuccess(false);
    setMessage(result.error);
    if (result.fieldErrors) {
      setFieldErrors(
        result.fieldErrors as Partial<Record<keyof FormState, string[]>>,
      );
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      style={{ display: "grid", gap: "16px" }}
    >
      <div style={{ display: "grid", gap: "6px" }}>
        <label
          htmlFor="contact-name"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-text-secondary)",
          }}
        >
          Full Name
        </label>
        <input
          id="contact-name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Your full name"
          autoComplete="name"
          style={inputStyle}
        />
        {fieldErrors.name?.[0] ? (
          <p style={errorStyle}>{fieldErrors.name[0]}</p>
        ) : null}
      </div>

      <div style={{ display: "grid", gap: "6px" }}>
        <label
          htmlFor="contact-whatsapp"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-text-secondary)",
          }}
        >
          WhatsApp Number
        </label>
        <input
          id="contact-whatsapp"
          value={form.whatsapp}
          onChange={(e) =>
            update("whatsapp", e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          placeholder="10-digit mobile number"
          inputMode="numeric"
          autoComplete="tel"
          style={inputStyle}
        />
        {fieldErrors.whatsapp?.[0] ? (
          <p style={errorStyle}>{fieldErrors.whatsapp[0]}</p>
        ) : null}
      </div>

      <div style={{ display: "grid", gap: "6px" }}>
        <label
          htmlFor="contact-email"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-text-secondary)",
          }}
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          style={inputStyle}
        />
        {fieldErrors.email?.[0] ? (
          <p style={errorStyle}>{fieldErrors.email[0]}</p>
        ) : null}
      </div>

      <fieldset
        style={{
          margin: 0,
          border: "1px solid var(--color-border)",
          borderRadius: "10px",
          padding: "12px",
          display: "grid",
          gap: "8px",
        }}
      >
        <legend
          style={{
            padding: "0 6px",
            fontFamily: "var(--font-display)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-text-secondary)",
          }}
        >
          I Need Help With
        </legend>

        <label style={radioLabelStyle}>
          <input
            type="radio"
            name="intent"
            checked={form.intent === "marketing"}
            onChange={() => update("intent", "marketing")}
          />
          Digital Marketing Services
        </label>

        <label style={radioLabelStyle}>
          <input
            type="radio"
            name="intent"
            checked={form.intent === "training"}
            onChange={() => update("intent", "training")}
          />
          Academy Training Programs
        </label>
      </fieldset>

      <button
        type="submit"
        disabled={submitting}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "15px 20px",
          borderRadius: "8px",
          border: "none",
          background: "var(--gradient-brand-premium)",
          color: "#fff",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "13px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: submitting ? "not-allowed" : "none",
          opacity: submitting ? 0.8 : 1,
        }}
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          intentCopy.button
        )}
      </button>

      {message ? (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: success ? "#22c55e" : "var(--color-brand-red)",
            margin: 0,
          }}
        >
          {success ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
          {message}
        </p>
      ) : null}
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--color-dark-elevated)",
  border: "1px solid var(--color-border)",
  borderRadius: "8px",
  padding: "12px 14px",
  color: "var(--color-text-primary)",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  outline: "none",
};

const errorStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-body)",
  fontSize: "12px",
  color: "var(--color-brand-red)",
};

const radioLabelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  color: "var(--color-text-secondary)",
};
