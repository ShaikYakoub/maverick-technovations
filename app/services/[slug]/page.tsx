import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { SERVICES, BUSINESS_DATA, CITIES, CITY_LABELS } from "@/lib/constants";
import type { ServiceSlug } from "@/lib/constants";

// ── Static params ─────────────────────────────────────────────────────────
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.title,
    description: `${service.description} Expert ${service.title} services in Kadapa and across South India — Mavericks Technovations.`,
    alternates: {
      canonical: `${BUSINESS_DATA.url}/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Mavericks Technovations`,
      description: service.description,
      url: `${BUSINESS_DATA.url}/services/${slug}`,
      images: [
        {
          url: `/og?title=${encodeURIComponent(service.title)}&type=service`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

// ── Per-service detail content ────────────────────────────────────────────
const SERVICE_DETAILS: Partial<
  Record<
    ServiceSlug,
    { benefits: string[]; process: string[]; result: string }
  >
> = {
  "digital-marketing": {
    benefits: [
      "360° multi-channel campaign management",
      "Data-led creative — copy, visuals, and targeting tested weekly",
      "Dedicated strategist + campaign manager",
      "Transparent monthly ROI reports",
    ],
    process: [
      "Discovery & competitor audit",
      "Custom growth blueprint",
      "Channel activation & creative production",
      "Weekly optimisation & scaling",
    ],
    result: "Brands we manage see an average 3× revenue lift within 6 months.",
  },
  seo: {
    benefits: [
      "Technical SEO audit and full remediation",
      "Topical authority content strategy",
      "Local SEO for South India city dominance",
      "Backlink acquisition from authoritative domains",
    ],
    process: [
      "Full-site technical crawl",
      "Keyword opportunity mapping",
      "On-page + content publishing (8 articles/mo)",
      "Link building & monthly reporting",
    ],
    result: "Clients rank on page 1 for target keywords within 90 days.",
  },
  "social-media-marketing": {
    benefits: [
      "Platform-native content calendars (Instagram, Facebook, LinkedIn)",
      "Reels & short-form video production",
      "Community management and DM automation",
      "Influencer collaboration pipeline",
    ],
    process: [
      "Brand audit and competitor benchmarking",
      "Content strategy and calendar planning",
      "Content production and scheduling",
      "Analytics reporting and monthly refresh",
    ],
    result:
      "Average 40% follower growth and 5× engagement rate within 60 days.",
  },
  "google-ads": {
    benefits: [
      "Google Search, Display, YouTube and Shopping campaigns",
      "Conversion-optimised landing page design",
      "Negative keyword pruning weekly",
      "8.4× average ROAS across client portfolio",
    ],
    process: [
      "Account audit and competitor analysis",
      "Campaign architecture and keyword research",
      "Ad creative production and A/B testing",
      "Bid optimisation and weekly scaling",
    ],
    result: "First qualified leads typically arrive within 72 hours of launch.",
  },
  "website-design": {
    benefits: [
      "Custom designs — no templates",
      "Core Web Vitals optimised (LCP <2.5s, CLS <0.1)",
      "Mobile-first, SEO-ready architecture",
      "Lead capture forms integrated with CRM",
    ],
    process: [
      "Discovery call and brand alignment",
      "Wireframes and design prototypes",
      "Development, CMS setup, and QA",
      "Launch, handover, and 30-day support",
    ],
    result: "Websites we build convert at 2–4× the industry average.",
  },
  ecommerce: {
    benefits: [
      "Shopify / WooCommerce custom builds",
      "Product catalogue optimisation and SEO",
      "Checkout funnel optimisation",
      "Integrated marketing automations (cart abandonment, upsells)",
    ],
    process: [
      "Platform selection and architecture planning",
      "Store design and product onboarding",
      "Payment gateway and logistics integration",
      "Launch + performance marketing activation",
    ],
    result: "E-commerce stores we build average ₹50 lakh in revenue year 1.",
  },
};

const DEFAULT_DETAIL = {
  benefits: [
    "Certified experts with proven track records",
    "Custom strategy tailored to your business",
    "Transparent reporting every month",
    "Dedicated account manager",
  ],
  process: [
    "Free discovery consultation",
    "Custom strategy development",
    "Execution and optimisation",
    "Monthly performance review",
  ],
  result:
    "Every client engagement is backed by our 30-day performance guarantee.",
};

// ── Page ──────────────────────────────────────────────────────────────────
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const detail = SERVICE_DETAILS[service.slug as ServiceSlug] ?? DEFAULT_DETAIL;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS_DATA.name,
      url: BUSINESS_DATA.url,
      telephone: `+91${BUSINESS_DATA.phone}`,
    },
    areaServed: CITIES.map((c) => ({
      "@type": "City",
      name: CITY_LABELS[c],
    })),
    url: `${BUSINESS_DATA.url}/services/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div
        style={{
          minHeight: "100vh",
          background: "var(--color-dark-base)",
          paddingTop: "100px",
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "24px 24px 0",
          }}
        >
          <Link
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "var(--color-text-muted)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            All Services
          </Link>
        </div>

        {/* Hero */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "40px 24px 72px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "40px",
            alignItems: "start",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div>
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
              Service
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(36px, 6vw, 72px)",
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                color: "var(--color-text-primary)",
                marginBottom: "24px",
              }}
            >
              {service.title}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
                maxWidth: "520px",
                marginBottom: "36px",
              }}
            >
              {service.description}
            </p>

            <a
              href={`tel:+91${BUSINESS_DATA.phone}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                background: "var(--color-brand-orange)",
                color: "#000",
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
              Book Free Consultation
            </a>
          </div>

          {/* Result callout */}
          <div
            style={{
              padding: "28px",
              borderRadius: "16px",
              border: "1px solid rgba(255,85,0,0.3)",
              background: "rgba(255,85,0,0.06)",
              maxWidth: "300px",
              flexShrink: 0,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-brand-orange)",
                marginBottom: "12px",
              }}
            >
              Typical Result
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: 1.5,
                color: "var(--color-text-primary)",
              }}
            >
              {detail.result}
            </p>
          </div>
        </section>

        {/* Benefits + Process */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "72px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
          }}
        >
          {/* Benefits */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "24px",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                marginBottom: "28px",
              }}
            >
              What&apos;s included
            </h2>
            <ul
              role="list"
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {detail.benefits.map((b) => (
                <li
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <CheckCircle
                    size={16}
                    strokeWidth={2}
                    style={{
                      color: "var(--color-brand-orange)",
                      flexShrink: 0,
                      marginTop: "3px",
                    }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "24px",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                marginBottom: "28px",
              }}
            >
              How it works
            </h2>
            <ol
              role="list"
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {detail.process.map((step, i) => (
                <li
                  key={step}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      border: "1px solid rgba(255,85,0,0.4)",
                      background: "rgba(255,85,0,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "12px",
                      color: "var(--color-brand-orange)",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      lineHeight: 1.6,
                      color: "var(--color-text-secondary)",
                      paddingTop: "3px",
                    }}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* City links for pSEO interlinking */}
        <section
          style={{
            background: "var(--color-dark-surface)",
            padding: "60px 24px",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--color-text-muted)",
                marginBottom: "16px",
              }}
            >
              {service.title} services available in:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {CITIES.map((city) => (
                <Link
                  key={city}
                  href={`/locations/${city}`}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "100px",
                    border: "1px solid var(--color-border)",
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "var(--color-brand-orange)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--color-brand-orange)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "var(--color-border)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--color-text-secondary)";
                  }}
                >
                  {CITY_LABELS[city]}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA bar */}
        <section
          style={{
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 44px)",
                letterSpacing: "-0.04em",
                color: "var(--color-text-primary)",
                lineHeight: 1.1,
                marginBottom: "16px",
              }}
            >
              Ready to start with
              <br />
              <span style={{ color: "var(--color-brand-orange)" }}>
                {service.title}?
              </span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                marginBottom: "32px",
              }}
            >
              Book a free 30-minute strategy call. No obligation, no fluff —
              just a clear plan for your growth.
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
                  gap: "8px",
                  padding: "14px 28px",
                  background: "var(--color-brand-orange)",
                  color: "#000",
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
                Call +91 {BUSINESS_DATA.phone}
              </a>
              <Link
                href="/services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  background: "transparent",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderRadius: "8px",
                  border: "1px solid var(--color-border)",
                  textDecoration: "none",
                }}
              >
                View all services
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
