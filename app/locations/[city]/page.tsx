import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";
import { CITIES, CITY_LABELS, SERVICES, BUSINESS_DATA } from "@/lib/constants";
import type { City } from "@/lib/constants";

export const revalidate = 86400; // ISR — regenerate daily

export function generateStaticParams() {
  return CITIES.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  if (!CITIES.includes(city as City)) return {};

  const label = CITY_LABELS[city as City];

  return {
    title: `Digital Marketing Agency in ${label} | Mavericks Technovations`,
    description: `Top-rated digital marketing services in ${label} — SEO, Google Ads, Social Media, Website Design & more. 200+ brands scaled. Call us today.`,
    alternates: {
      canonical: `${BUSINESS_DATA.url}/locations/${city}`,
    },
    openGraph: {
      title: `Digital Marketing Agency in ${label}`,
      description: `Certified digital marketing services in ${label}. Dominate local search & social. Get a free strategy call.`,
      url: `${BUSINESS_DATA.url}/locations/${city}`,
      images: [
        {
          url: `/og?title=Digital+Marketing+in+${encodeURIComponent(label)}&type=location`,
          width: 1200,
          height: 630,
        },
      ],
    },
    keywords: [
      `digital marketing agency in ${label}`,
      `SEO company in ${label}`,
      `Google Ads agency ${label}`,
      `social media marketing ${label}`,
      `website design ${label}`,
    ],
  };
}

/* Per-city contextual blurb (personalises copy beyond just name injection) */
const CITY_CONTEXT: Partial<Record<City, { industry: string; hook: string }>> =
  {
    bangalore: {
      industry: "tech startups, D2C brands, and SaaS companies",
      hook: "In Bangalore's hyper-competitive market, generic marketing fails. We build systems that compound.",
    },
    hyderabad: {
      industry: "pharma, IT, and fast-growing retail chains",
      hook: "Hyderabad's digital economy is scaling fast. Position your brand at the front of that wave.",
    },
    chennai: {
      industry: "manufacturing, healthcare, and B2B service firms",
      hook: "Chennai enterprises trust data-driven marketing. We speak that language fluently.",
    },
    vizag: {
      industry: "tourism, ports, and emerging tech hubs",
      hook: "Visakhapatnam is becoming AP's commercial crown — be the brand that customers find first.",
    },
    kadapa: {
      industry: "retail, real estate, and education businesses",
      hook: "Our home base. Deep local networks, direct relationships, and unmatched on-ground support.",
    },
    tirupati: {
      industry: "hospitality, pilgrimage services, and retail",
      hook: "Tirupati's footfall is among India's highest. Convert that visibility into paying customers.",
    },
    nellore: {
      industry: "agriculture, aquaculture, and retail",
      hook: "Nellore businesses are digitising rapidly. Be the benchmark, not the follower.",
    },
    kurnool: {
      industry: "trading, manufacturing, and services",
      hook: "Transform Kurnool's local customer base into a loyal, digital-first community.",
    },
    guntur: {
      industry: "agriculture, textiles, and emerging retail",
      hook: "Guntur's commercial heartbeat is loud. Make sure your brand is heard above the noise.",
    },
    vijayawada: {
      industry: "retail, finance, and logistics",
      hook: "AP's business capital deserves a marketing partner that plays at its level.",
    },
  };

const KEY_SERVICES = SERVICES.slice(0, 6); // top 6 services featured on city pages

export default async function LocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  if (!CITIES.includes(city as City)) notFound();

  const label = CITY_LABELS[city as City];
  const ctx = CITY_CONTEXT[city as City] ?? {
    industry: "businesses across all sectors",
    hook: `${label} businesses deserve a digital partner that drives real results, not just reports.`,
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BUSINESS_DATA.url}/locations/${city}`,
    name: `${BUSINESS_DATA.name} — ${label}`,
    url: `${BUSINESS_DATA.url}/locations/${city}`,
    telephone: `+91${BUSINESS_DATA.phone}`,
    email: BUSINESS_DATA.email,
    description: `Digital marketing agency serving ${label} — SEO, Google Ads, Social Media, Website Design and more.`,
    areaServed: {
      "@type": "City",
      name: label,
      addressCountry: "IN",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_DATA.address.street,
      addressLocality: BUSINESS_DATA.address.city,
      addressRegion: BUSINESS_DATA.address.state,
      postalCode: BUSINESS_DATA.address.postalCode,
      addressCountry: "IN",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Digital Marketing Services in ${label}`,
      itemListElement: KEY_SERVICES.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: `${s.title} in ${label}`,
        url: `${BUSINESS_DATA.url}/services/${s.slug}`,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BUSINESS_DATA.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: `${BUSINESS_DATA.url}/locations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: label,
        item: `${BUSINESS_DATA.url}/locations/${city}`,
      },
    ],
  };

  // Other cities for internal linking
  const otherCities = CITIES.filter((c) => c !== city);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div
        style={{
          minHeight: "100vh",
          background: "var(--color-dark-base)",
          paddingTop: "100px",
        }}
      >
        {/* Hero */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "60px 24px 80px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "32px" }}>
            <ol
              style={{
                display: "flex",
                gap: "8px",
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "var(--color-text-muted)",
              }}
            >
              <li>
                <Link
                  href="/"
                  style={{
                    color: "var(--color-text-muted)",
                    textDecoration: "none",
                  }}
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>Locations</li>
              <li aria-hidden="true">›</li>
              <li style={{ color: "var(--color-text-secondary)" }}>{label}</li>
            </ol>
          </nav>

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
            Digital Marketing Agency · {label}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(38px, 6.5vw, 76px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "var(--color-text-primary)",
              maxWidth: "820px",
              marginBottom: "24px",
            }}
          >
            #1 Digital Marketing
            <br />
            Agency in{" "}
            <span style={{ color: "var(--color-brand-orange)" }}>{label}</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--color-text-secondary)",
              maxWidth: "600px",
              marginBottom: "16px",
            }}
          >
            {ctx.hook}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              lineHeight: 1.65,
              color: "var(--color-text-muted)",
              maxWidth: "560px",
              marginBottom: "36px",
            }}
          >
            Specialists in {ctx.industry}. Full-service digital marketing — SEO,
            Google Ads, Social Media, Website Design, and more.
          </p>
          <a
            href={`tel:+91${BUSINESS_DATA.phone}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 32px",
              background: "var(--color-brand-orange)",
              color: "#fff",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "13px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            <Phone size={15} strokeWidth={2} />
            Free Strategy Call
          </a>
        </section>

        {/* Services for this city */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "72px 24px",
            borderBottom: "1px solid var(--color-border)",
          }}
          aria-labelledby="services-heading"
        >
          <h2
            id="services-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(22px, 3.5vw, 36px)",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              marginBottom: "12px",
            }}
          >
            Services in {label}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "var(--color-text-muted)",
              marginBottom: "40px",
              maxWidth: "520px",
            }}
          >
            Every service is delivered with local context, backed by our
            Kadapa-based team and certified specialists.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {KEY_SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="server-hover-card-orange"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  padding: "28px",
                  borderRadius: "16px",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-dark-elevated)",
                  textDecoration: "none",
                  transition: "border-color 0.2s",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "16px",
                    letterSpacing: "-0.02em",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {service.shortTitle} in {label}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "var(--color-text-secondary)",
                    flexGrow: 1,
                  }}
                >
                  {service.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--color-brand-orange)",
                  }}
                >
                  Learn More
                  <ArrowRight size={11} strokeWidth={1.5} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why choose us in this city */}
        <section
          style={{
            background: "var(--color-dark-surface)",
            padding: "72px 24px",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(22px, 3.5vw, 36px)",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                marginBottom: "40px",
              }}
            >
              Why brands in {label} choose us
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "20px",
              }}
            >
              {[
                `Deep knowledge of ${label}'s consumer behaviour and local search intent`,
                "200+ brands scaled across South India with verified, measurable results",
                "Dedicated account manager — no ticket queues, no offshore handoffs",
                "Weekly reporting with live dashboards and plain-language insights",
                "Certified specialists: Google, Meta, and AAPC-trained team",
                "Transparent pricing — Silver ₹15K, Gold ₹35K, Platinum ₹50K",
              ].map((point) => (
                <li
                  key={point}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "20px",
                    borderRadius: "12px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-dark-elevated)",
                  }}
                >
                  <CheckCircle
                    size={15}
                    strokeWidth={1.5}
                    style={{
                      color: "var(--color-brand-orange)",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA bar */}
        <section
          style={{
            background:
              "linear-gradient(135deg, rgba(249,160,27,0.08) 0%, rgba(211,32,39,0.05) 100%)",
            padding: "72px 24px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(26px, 4vw, 44px)",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              marginBottom: "12px",
            }}
          >
            Ready to dominate {label}?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "var(--color-text-muted)",
              marginBottom: "32px",
            }}
          >
            Get a free 30-minute strategy session with zero obligations.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={`tel:+91${BUSINESS_DATA.phone}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                background: "var(--color-brand-orange)",
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              <Phone size={15} strokeWidth={2} />
              +91 {BUSINESS_DATA.phone}
            </a>
            <Link
              href="/services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 32px",
                border: "1px solid var(--color-border-bright)",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              All Services
            </Link>
          </div>
        </section>

        {/* Other city links (internal linking for pSEO) */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "64px 24px",
          }}
          aria-labelledby="other-cities-heading"
        >
          <h2
            id="other-cities-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
              marginBottom: "20px",
            }}
          >
            We also serve
          </h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {otherCities.map((c) => (
              <Link
                key={c}
                href={`/locations/${c}`}
                className="server-hover-pill-bright"
                style={{
                  padding: "8px 16px",
                  borderRadius: "100px",
                  border: "1px solid var(--color-border)",
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {CITY_LABELS[c]}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
