import type { Metadata } from "next";
import { BUSINESS_DATA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Mavericks Technovations",
  description:
    "Privacy policy for Mavericks Technovations. Learn how we collect, use, and protect your information.",
  alternates: {
    canonical: `${BUSINESS_DATA.url}/privacy`,
  },
};

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide through enquiry forms, calls, email, and WhatsApp interactions. This may include your name, phone number, email address, company name, and service interest.",
  },
  {
    title: "How We Use Information",
    body: "We use your information to respond to enquiries, provide service proposals, deliver contracted services, improve our offerings, and send important service-related updates.",
  },
  {
    title: "Data Sharing",
    body: "We do not sell your personal data. Information may be shared with trusted service providers (such as CRM, analytics, communication, and payment tools) only when required to operate our services.",
  },
  {
    title: "Data Retention",
    body: "We retain enquiry and client data only as long as necessary for business operations, legal compliance, and dispute resolution.",
  },
  {
    title: "Security",
    body: "We use commercially reasonable safeguards to protect your data. No online system is 100% secure, but we continuously improve our technical and operational protections.",
  },
  {
    title: "Your Rights",
    body: "You may request access, correction, or deletion of your personal data by contacting us at the email below.",
  },
  {
    title: "Policy Updates",
    body: "We may update this policy periodically. The latest version will always be posted on this page with an updated effective date.",
  },
] as const;

export default function PrivacyPage() {
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
          Privacy Policy
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
          {sections.map((section) => (
            <article
              key={section.title}
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
                {section.title}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  color: "var(--color-text-secondary)",
                }}
              >
                {section.body}
              </p>
            </article>
          ))}
        </div>

        <div
          style={{
            marginTop: "28px",
            border: "1px solid rgba(255,85,0,0.25)",
            borderRadius: "12px",
            background: "rgba(255,85,0,0.06)",
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
            Contact for privacy requests: {BUSINESS_DATA.email} · +91{" "}
            {BUSINESS_DATA.phone}
          </p>
        </div>
      </section>
    </div>
  );
}
