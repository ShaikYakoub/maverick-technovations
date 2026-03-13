import type { Metadata } from "next";
import { BUSINESS_DATA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service | Mavericks Technovations",
  description:
    "Terms of service for Mavericks Technovations digital agency and academy services.",
  alternates: {
    canonical: `${BUSINESS_DATA.url}/terms`,
  },
};

const terms = [
  {
    title: "Scope of Services",
    body: "Service scope, timelines, deliverables, and responsibilities are defined in written proposals, work orders, or agreements accepted by both parties.",
  },
  {
    title: "Fees and Payments",
    body: "All fees are payable as per the agreed schedule. Delayed payments may pause campaign activity, deliverables, or support until outstanding dues are cleared.",
  },
  {
    title: "Client Responsibilities",
    body: "Clients must provide timely access to required accounts, assets, approvals, and legal permissions. Delays in inputs may affect delivery timelines and performance.",
  },
  {
    title: "Performance Disclaimer",
    body: "Marketing outcomes depend on multiple external variables including competition, platform policies, seasonality, and market conditions. We do not guarantee specific revenue figures unless explicitly contracted.",
  },
  {
    title: "Intellectual Property",
    body: "Upon full payment, final approved deliverables become client property unless otherwise stated. Proprietary frameworks, internal tools, and reusable templates remain Mavericks Technovations intellectual property.",
  },
  {
    title: "Termination",
    body: "Either party may terminate active services by giving written notice as specified in the applicable agreement. Fees for completed work and committed spends remain payable.",
  },
  {
    title: "Limitation of Liability",
    body: "To the maximum extent permitted by law, Mavericks Technovations is not liable for indirect, incidental, or consequential losses arising from service use.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of India. Jurisdiction for legal disputes will be in Andhra Pradesh, unless otherwise required by law.",
  },
] as const;

export default function TermsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-dark-base)",
        paddingTop: "100px",
      }}
    >
      <section
        style={{
          maxWidth: "920px",
          margin: "0 auto",
          padding: "60px 24px 90px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-brand-orange)",
            marginBottom: "14px",
          }}
        >
          Legal
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(34px, 6vw, 56px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "var(--color-text-primary)",
            marginBottom: "10px",
          }}
        >
          Terms of Service
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "var(--color-text-muted)",
            marginBottom: "34px",
          }}
        >
          Effective date: March 13, 2026
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {terms.map((term) => (
            <article
              key={term.title}
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "14px",
                background: "var(--color-dark-elevated)",
                padding: "24px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "20px",
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-primary)",
                  marginBottom: "10px",
                }}
              >
                {term.title}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  color: "var(--color-text-secondary)",
                }}
              >
                {term.body}
              </p>
            </article>
          ))}
        </div>

        <div
          style={{
            marginTop: "28px",
            border: "1px solid rgba(239,89,36,0.25)",
            borderRadius: "12px",
            background: "rgba(239,89,36,0.06)",
            padding: "18px 20px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              lineHeight: 1.7,
              color: "var(--color-text-secondary)",
              margin: 0,
            }}
          >
            Questions about these terms: {BUSINESS_DATA.email} · +91{" "}
            {BUSINESS_DATA.phone}
          </p>
        </div>
      </section>
    </div>
  );
}
