import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { BUSINESS_DATA, CITIES, CITY_LABELS } from "@/lib/constants";
import { MEDIA_ASSETS } from "@/lib/mediaManifest";

export const metadata: Metadata = {
  title: "Locations We Serve | Mavericks Technovations",
  description:
    "Explore all South India cities served by Mavericks Technovations: Kadapa, Bangalore, Hyderabad, Chennai, Vizag, Tirupati, Nellore, Kurnool, Guntur, and Vijayawada.",
  alternates: {
    canonical: `${BUSINESS_DATA.url}/locations`,
  },
  openGraph: {
    title: "Locations We Serve | Mavericks Technovations",
    description:
      "Digital marketing and growth services across 10 key South India cities.",
    url: `${BUSINESS_DATA.url}/locations`,
    images: [
      {
        url: "/og?title=Our+Locations&type=locations",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function LocationsPage() {
  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mavericks Technovations Service Locations",
    itemListElement: CITIES.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: CITY_LABELS[city],
      url: `${BUSINESS_DATA.url}/locations/${city}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
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
            padding: "60px 24px 80px",
            borderBottom: "1px solid var(--color-border)",
            backgroundImage: `linear-gradient(120deg, rgba(10,10,10,0.9), rgba(10,10,10,0.74)), url(${MEDIA_ASSETS.locations.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "14px",
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
              marginBottom: "16px",
            }}
          >
            Service Locations
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(38px, 6.5vw, 76px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "var(--color-text-primary)",
              marginBottom: "24px",
              maxWidth: "840px",
            }}
          >
            South India coverage.
            <br />
            <span style={{ color: "var(--color-brand-orange)" }}>
              Local execution at scale.
            </span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--color-text-secondary)",
              maxWidth: "620px",
            }}
          >
            We run performance marketing systems for businesses in 10
            high-growth cities across South India, with deep regional context
            and centralized execution from our Kadapa operations base.
          </p>
        </section>

        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "72px 24px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {CITIES.map((city) => (
              <Link
                key={city}
                href={`/locations/${city}`}
                style={{
                  textDecoration: "none",
                  border: "1px solid var(--color-border)",
                  borderRadius: "14px",
                  background: "var(--color-dark-elevated)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(255,85,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--color-border)";
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--color-brand-orange)",
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  <MapPin size={12} strokeWidth={1.5} />
                  City Page
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "24px",
                    letterSpacing: "-0.03em",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {CITY_LABELS[city]}
                </h2>
                <div
                  style={{
                    marginTop: "6px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  View services
                  <ArrowRight size={12} strokeWidth={1.5} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          style={{
            padding: "72px 24px",
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgba(255,85,0,0.08) 0%, rgba(232,0,45,0.04) 100%)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(24px, 4vw, 42px)",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              marginBottom: "14px",
            }}
          >
            Need a city-specific growth plan?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "var(--color-text-muted)",
              marginBottom: "28px",
            }}
          >
            Talk to our strategy team and get a practical roadmap for your
            market.
          </p>
          <a
            href={`tel:+91${BUSINESS_DATA.phone}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 30px",
              background: "var(--color-brand-orange)",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "8px",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "13px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            <Phone size={15} strokeWidth={2} />
            +91 {BUSINESS_DATA.phone}
          </a>
        </section>
      </div>
    </>
  );
}
