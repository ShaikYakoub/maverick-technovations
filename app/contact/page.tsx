import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactLeadForm from "@/components/contact/ContactLeadForm";
import { BUSINESS_DATA } from "@/lib/constants";
import { MEDIA_ASSETS } from "@/lib/mediaManifest";

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <div
        style={{
          minHeight: "100vh",
          background: "var(--color-dark-base)",
          paddingTop: "100px",
        }}
      >
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "60px 24px 90px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              backgroundImage: `linear-gradient(120deg, rgba(10,10,10,0.92), rgba(10,10,10,0.75)), url(${MEDIA_ASSETS.contact.heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "32px",
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

            <div style={{ display: "grid", gap: "12px" }}>
              <a
                href={`tel:+91${BUSINESS_DATA.phone}`}
                style={contactItemStyle}
              >
                <Phone size={15} strokeWidth={1.5} />
                +91 {BUSINESS_DATA.phone}
              </a>
              <a
                href={`mailto:${BUSINESS_DATA.email}`}
                style={contactItemStyle}
              >
                <Mail size={15} strokeWidth={1.5} />
                {BUSINESS_DATA.email}
              </a>
              <p style={{ ...contactItemStyle, margin: 0 }}>
                <MapPin size={15} strokeWidth={1.5} />
                {BUSINESS_DATA.address.street}, {BUSINESS_DATA.address.city},{" "}
                {BUSINESS_DATA.address.state}
              </p>
            </div>
          </div>

          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              background: "var(--color-dark-surface)",
              padding: "32px",
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
            <ContactLeadForm />
          </div>
        </section>
      </div>
    </>
  );
}

const contactItemStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "flex-start",
  gap: "10px",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  color: "var(--color-text-muted)",
  textDecoration: "none",
  lineHeight: 1.6,
};
