import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Clock3, Mail, MapPin, Phone, ShieldCheck, Timer } from "lucide-react";
import ContactLeadForm from "@/components/contact/ContactLeadForm";
import FaqAccordion from "@/components/shared/FaqAccordion";
import { BUSINESS_DATA } from "@/lib/constants";
import { MEDIA_ASSETS } from "@/lib/mediaManifest";

const RESPONSE_TIMELINE = [
  {
    title: "Context review",
    body: "We read the business stage, intent, and current bottlenecks before anyone calls you back.",
  },
  {
    title: "Practical response",
    body: "You get a conversation focused on what to do next, not a generic sales script.",
  },
  {
    title: "Right-fit path",
    body: "Services, academy, or both. We map the shortest useful route and the order it should happen in.",
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
      "Yes. Tell us your primary need in the form and our team can guide you through both options if needed.",
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
  const addressQuery = `${BUSINESS_DATA.address.street}, ${BUSINESS_DATA.address.city}, ${BUSINESS_DATA.address.state} ${BUSINESS_DATA.address.postalCode}`;
  const coordinateQuery = `${BUSINESS_DATA.geo.latitude},${BUSINESS_DATA.geo.longitude}`;
  const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(coordinateQuery)}&z=16&output=embed`;
  const mapDirectionsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordinateQuery)}`;

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
            padding: "24px 24px 44px",
            gap: "clamp(20px, 4vw, 32px)",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(239,89,36,0.16)",
              borderRadius: "24px",
              backgroundImage: `linear-gradient(120deg, rgba(10,10,10,0.92), rgba(10,10,10,0.74)), url(${MEDIA_ASSETS.contact.heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "clamp(22px, 4vw, 34px)",
              minHeight: "100%",
              display: "grid",
              gap: "18px",
              alignContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-80px",
                right: "-40px",
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(249,160,27,0.18) 0%, transparent 72%)",
                animation: "float-orb 8s ease-in-out infinite",
              }}
            />
            <div
              style={{
                display: "grid",
                gap: "14px",
                position: "relative",
                zIndex: 1,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-orange)",
                }}
              >
                Get In Touch
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(34px, 6vw, 58px)",
                  letterSpacing: "-0.05em",
                  lineHeight: 1.02,
                  color: "var(--color-text-primary)",
                }}
              >
                Let&apos;s build the
                <span className="text-brand-gradient"> next useful move.</span>
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  lineHeight: 1.74,
                  color: "var(--color-text-secondary)",
                  maxWidth: "540px",
                }}
              >
                Tell us what you need and we will respond with a practical route
                forward. Typical response time stays under 30 minutes during
                business hours.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gap: "12px",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                className="cta-row-mobile"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
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
              </div>
              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(10,10,10,0.48)",
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
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-brand-orange)",
                  }}
                >
                  What you can expect
                </p>
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
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid rgba(239,89,36,0.16)",
              borderRadius: "24px",
              background:
                "linear-gradient(180deg, rgba(24,24,24,0.98) 0%, rgba(12,12,12,0.98) 100%)",
              padding: "clamp(22px, 4vw, 34px)",
              display: "grid",
              gap: "18px",
              minHeight: "100%",
              alignContent: "start",
            }}
          >
            <div style={{ display: "grid", gap: "8px" }}>
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
                Quick enquiry form
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(24px, 3vw, 30px)",
                  letterSpacing: "-0.03em",
                  color: "var(--color-text-primary)",
                }}
              >
                Share the problem. We&apos;ll route the response properly.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  lineHeight: 1.72,
                  color: "var(--color-text-secondary)",
                }}
              >
                No enquiry tabs, no dead-end fork. Just tell us what you need
                and the team will handle the path from there.
              </p>
            </div>
            <ContactLeadForm />
          </div>
        </section>

        <section className="section-shell" style={{ padding: "0 24px 24px" }}>
          <div
            className="grid-balance-2"
            style={{ gap: "14px", alignItems: "stretch" }}
          >
            <div
              style={{
                border: "1px solid rgba(239,89,36,0.14)",
                borderRadius: "20px",
                background: "var(--color-dark-surface)",
                overflow: "hidden",
                minHeight: "360px",
                position: "relative",
              }}
            >
              <iframe
                title="Mavericks Technovations location map"
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  width: "100%",
                  minHeight: "360px",
                  border: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "auto 14px 14px auto",
                  borderRadius: "999px",
                  border: "1px solid rgba(239,89,36,0.26)",
                  background: "rgba(10,10,10,0.8)",
                  padding: "8px 12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                <MapPin
                  size={12}
                  strokeWidth={1.8}
                  style={{ color: "var(--color-brand-orange)" }}
                />
                Pin Locked to Office Coordinates
              </div>
            </div>

            <div
              style={{
                border: "1px solid rgba(239,89,36,0.14)",
                borderRadius: "20px",
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
                Visit our Kadapa office.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  lineHeight: 1.72,
                  color: "var(--color-text-secondary)",
                }}
              >
                Meet the strategy and academy team in person for planning
                sessions, onboarding conversations, and admissions guidance.
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
              <div
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(239,89,36,0.18)",
                  background: "rgba(239,89,36,0.06)",
                  padding: "14px",
                  display: "grid",
                  gap: "8px",
                }}
              >
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  <MapPin
                    size={14}
                    strokeWidth={1.6}
                    style={{
                      color: "var(--color-brand-orange)",
                      marginTop: "2px",
                    }}
                  />
                  {BUSINESS_DATA.address.street}, {BUSINESS_DATA.address.city},{" "}
                  {BUSINESS_DATA.address.state}{" "}
                  {BUSINESS_DATA.address.postalCode}
                </p>
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
          </div>
        </section>

        <section className="section-shell" style={{ padding: "0 24px 24px" }}>
          <div
            style={{
              border: "1px solid rgba(239,89,36,0.14)",
              borderRadius: "24px",
              background:
                "radial-gradient(circle at top left, rgba(249,160,27,0.16) 0%, rgba(18,18,18,0.98) 32%, rgba(10,10,10,1) 100%)",
              padding: "clamp(22px, 4vw, 32px)",
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
              What happens after you contact us?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                lineHeight: 1.74,
                color: "var(--color-text-secondary)",
                maxWidth: "700px",
              }}
            >
              We keep the response simple: understand context fast, reply with
              something useful, and move you toward the right engagement path
              without friction.
            </p>
            <div className="grid-card-4" style={{ gap: "12px" }}>
              {RESPONSE_TIMELINE.map((item, index) => (
                <div
                  key={item.title}
                  style={{
                    border: "1px solid rgba(239,89,36,0.16)",
                    borderRadius: "18px",
                    background: "rgba(255,255,255,0.03)",
                    padding: "18px",
                    display: "grid",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      border: "1px solid rgba(239,89,36,0.22)",
                      background: "rgba(239,89,36,0.08)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-brand-orange)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "14px",
                    }}
                  >
                    0{index + 1}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      lineHeight: 1.7,
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
                borderRadius: "18px",
                border: "1px solid rgba(239,89,36,0.22)",
                background: "rgba(255,255,255,0.03)",
                padding: "16px",
                display: "grid",
                gap: "8px",
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
                Fast callback windows are available if you share preferred
                timing in the enquiry form.
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
              border: "1px solid rgba(239,89,36,0.14)",
              borderRadius: "20px",
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
            <FaqAccordion items={CONTACT_FAQ} />
          </div>
        </section>
      </div>
    </>
  );
}

const contactItemStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  minWidth: 0,
  fontFamily: "var(--font-body)",
  fontSize: "clamp(12px, 2.8vw, 14px)",
  color: "var(--color-text-primary)",
  textDecoration: "none",
  lineHeight: 1.6,
  padding: "12px 14px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(10,10,10,0.42)",
};
