import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Clock3, Mail, MapPin, Phone, ShieldCheck, Timer } from "lucide-react";
import ContactLeadForm from "@/components/contact/ContactLeadForm";
import FaqAccordion from "@/components/shared/FaqAccordion";
import { BUSINESS_DATA } from "@/lib/constants";
import { MEDIA_ASSETS } from "@/lib/mediaManifest";

const RESPONSE_TIMELINE = [
  {
    title: "Step 1: Enquiry Review",
    body: "We review your business context, market, and current bottlenecks.",
  },
  {
    title: "Step 2: Strategy Call",
    body: "You get a practical call focused on lead flow, positioning, and next actions.",
  },
  {
    title: "Step 3: Execution Blueprint",
    body: "We share a channel mix and rollout sequence tailored to your stage.",
  },
] as const;

const TRUST_SIGNALS = [
  "Transparent reporting and weekly optimisation cadence",
  "Dedicated support for both services and academy admissions",
  "Local execution context for Kadapa and South India markets",
] as const;

const OFFICE_HOURS = [
  "Mon-Sat: 9:30 AM - 8:00 PM",
  "Sun: Counselling by prior appointment",
  "Response SLA: under 30 minutes during business hours",
] as const;

const CONTACT_FAQ = [
  {
    question: "How quickly will your team respond?",
    answer:
      "We usually respond within 30 minutes during business hours, and within 24 hours outside business hours.",
  },
  {
    question: "Is the strategy call free?",
    answer:
      "Yes. The first strategy consultation is completely free and includes practical next-step recommendations.",
  },
  {
    question: "Can I enquire for both services and training?",
    answer:
      "Yes. Select your primary intent in the form and our team can guide you through both options if needed.",
  },
  {
    question: "Do you support startups and small businesses?",
    answer:
      "Yes. We support both small businesses and scaling brands with package options that match stage and budget.",
  },
  {
    question: "Can I schedule a callback instead of calling now?",
    answer:
      "Yes. Submit the form with your preferred callback window and our team will call you at the requested time.",
  },
  {
    question: "Do you provide onsite meetings in Kadapa?",
    answer:
      "Yes. You can visit our Kadapa office for strategic consultations, onboarding, and academy counselling.",
  },
] as const;

export const metadata: Metadata = {
  title: "Contact Mavericks Technovations | Strategy Call",
  description:
    "Talk to Mavericks Technovations for digital marketing services or academy admissions. Call, email, or submit a quick enquiry form.",
  alternates: {
    canonical: `${BUSINESS_DATA.url}/contact`,
  },
  openGraph: {
    title: "Contact Mavericks Technovations",
    description:
      "Get a free strategy call for your business growth or training journey.",
    url: `${BUSINESS_DATA.url}/contact`,
    images: [
      {
        url: "/og?title=Contact+Us&type=contact",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ContactPage() {
  const mapEmbedSrc = `https://maps.google.com/maps?q=${BUSINESS_DATA.geo.latitude},${BUSINESS_DATA.geo.longitude}&z=15&output=embed`;
  const mapDirectionsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${BUSINESS_DATA.geo.latitude},${BUSINESS_DATA.geo.longitude}`,
  )}`;

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Mavericks Technovations",
    url: `${BUSINESS_DATA.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: BUSINESS_DATA.name,
      telephone: `+91${BUSINESS_DATA.phone}`,
      email: BUSINESS_DATA.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS_DATA.address.street,
        addressLocality: BUSINESS_DATA.address.city,
        addressRegion: BUSINESS_DATA.address.state,
        postalCode: BUSINESS_DATA.address.postalCode,
        addressCountry: "IN",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CONTACT_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div
        style={{
          minHeight: "100vh",
          background: "var(--color-dark-base)",
          paddingTop: "100px",
        }}
      >
        <section
          className="section-shell grid-balance-2"
          style={{
            padding: "44px 24px 44px",
            gap: "clamp(20px, 4vw, 32px)",
          }}
        >
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              backgroundImage: `linear-gradient(120deg, rgba(10,10,10,0.92), rgba(10,10,10,0.75)), url(${MEDIA_ASSETS.contact.heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "clamp(22px, 4vw, 32px)",
              height: "fit-content",
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
              Get In Touch
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(34px, 6vw, 52px)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                color: "var(--color-text-primary)",
                marginBottom: "14px",
              }}
            >
              Let&apos;s Build Your Growth Engine
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
                marginBottom: "24px",
              }}
            >
              Tell us what you need and we will share a practical next-step
              plan. Typical response time: under 30 minutes during business
              hours.
            </p>

            <div className="cta-row-mobile" style={{ width: "100%" }}>
              <a
                href={`tel:+91${BUSINESS_DATA.phone}`}
                className="btn-animated"
                style={contactItemStyle}
              >
                <Phone size={15} strokeWidth={1.5} />
                <span className="mobile-contact-text">
                  +91 {BUSINESS_DATA.phone}
                </span>
              </a>
              <a
                href={`mailto:${BUSINESS_DATA.email}`}
                style={contactItemStyle}
              >
                <Mail size={15} strokeWidth={1.5} />
                <span className="mobile-contact-text">
                  {BUSINESS_DATA.email}
                </span>
              </a>
              <div style={{ ...contactItemStyle, margin: 0 }}>
                <MapPin size={15} strokeWidth={1.5} />
                <span className="mobile-contact-text">
                  {BUSINESS_DATA.address.street}, {BUSINESS_DATA.address.city},{" "}
                  {BUSINESS_DATA.address.state}
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              background: "var(--color-dark-surface)",
              padding: "clamp(22px, 4vw, 32px)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "26px",
                letterSpacing: "-0.02em",
                color: "var(--color-text-primary)",
                marginBottom: "18px",
              }}
            >
              Quick Enquiry Form
            </h2>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "14px",
              }}
            >
              <a
                href="/contact?intent=marketing"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderRadius: "999px",
                  border: "1px solid var(--color-border)",
                  background: "transparent",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Service Enquiry
              </a>
              <a
                href="/contact?intent=training"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderRadius: "999px",
                  border: "1px solid var(--color-border)",
                  background: "transparent",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Academy Enquiry
              </a>
            </div>
            <ContactLeadForm />
          </div>
        </section>

        <section
          className="section-shell"
          style={{
            padding: "0 24px 24px",
          }}
        >
          <div className="grid-balance-2" style={{ gap: "14px" }}>
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "16px",
                background: "var(--color-dark-surface)",
                overflow: "hidden",
                minHeight: "320px",
              }}
            >
              <iframe
                title="Mavericks Technovations location map"
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  width: "100%",
                  minHeight: "320px",
                  border: "none",
                }}
              />
            </div>

            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "16px",
                background: "var(--color-dark-surface)",
                padding: "clamp(22px, 4vw, 32px)",
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
                Visit Our Office
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "var(--color-text-secondary)",
                }}
              >
                Meet the strategy and academy team at our Kadapa office for an
                in-person consultation and planning session.
              </p>
              <div style={{ display: "grid", gap: "8px" }}>
                {OFFICE_HOURS.map((item) => (
                  <p
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <Clock3
                      size={14}
                      strokeWidth={1.6}
                      style={{
                        color: "var(--color-brand-orange)",
                        marginTop: "2px",
                      }}
                    />
                    {item}
                  </p>
                ))}
              </div>

              <a
                href={mapDirectionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animated"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "fit-content",
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
                  textDecoration: "none",
                }}
              >
                <MapPin size={14} strokeWidth={1.8} />
                Get Directions
              </a>
            </div>
          </div>
        </section>

        <section
          className="section-shell"
          style={{
            padding: "0 24px 24px",
          }}
        >
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              background: "var(--color-dark-surface)",
              padding: "clamp(22px, 4vw, 30px)",
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
              What happens after you contact us?
            </h2>
            <div className="grid-card-4" style={{ gap: "12px" }}>
              {RESPONSE_TIMELINE.map((item) => (
                <div
                  key={item.title}
                  style={{
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                    background: "var(--color-dark-elevated)",
                    padding: "14px",
                    display: "grid",
                    gap: "8px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "15px",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      lineHeight: 1.65,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                borderRadius: "12px",
                border: "1px solid rgba(239,89,36,0.32)",
                background: "rgba(239,89,36,0.07)",
                padding: "14px",
              }}
            >
              {TRUST_SIGNALS.map((item) => (
                <p
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    marginBottom: "8px",
                  }}
                >
                  <ShieldCheck
                    size={14}
                    strokeWidth={1.6}
                    style={{
                      color: "var(--color-brand-orange)",
                      marginTop: "2px",
                    }}
                  />
                  {item}
                </p>
              ))}
              <p
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--color-text-secondary)",
                }}
              >
                <Timer
                  size={14}
                  strokeWidth={1.6}
                  style={{
                    color: "var(--color-brand-orange)",
                    marginTop: "2px",
                  }}
                />
                Fast callback windows available if you share preferred timing in
                the enquiry form.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="contact-faq-heading"
          className="section-shell"
          style={{
            padding: "0 24px 72px",
          }}
        >
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              background: "var(--color-dark-surface)",
              padding: "clamp(22px, 4vw, 32px)",
            }}
          >
            <h2
              id="contact-faq-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(24px, 3.2vw, 34px)",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                marginBottom: "20px",
              }}
            >
              FAQ
            </h2>
            <FaqAccordion items={CONTACT_FAQ} defaultOpenIndex={0} />
          </div>
        </section>
      </div>
    </>
  );
}

const contactItemStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  minWidth: 0,
  fontFamily: "var(--font-body)",
  fontSize: "clamp(12px, 2.8vw, 14px)",
  color: "var(--color-text-muted)",
  textDecoration: "none",
  lineHeight: 1.6,
};
