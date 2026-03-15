import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, ArrowRight, CheckCircle } from "@/lib/icons";
import FaqAccordion from "@/components/shared/FaqAccordion";
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
    {
      benefits: string[];
      process: string[];
      result: string;
      lossIfIgnored: string;
      packages: {
        name: string;
        price: string;
        benefits: string[];
        featured?: boolean;
      }[];
    }
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
    lossIfIgnored:
      "Without integrated marketing systems, brands leak budget across disconnected channels and miss compounding revenue growth.",
    packages: [
      {
        name: "Starter",
        price: "₹18,000/mo",
        benefits: [
          "2-channel setup",
          "Monthly reporting",
          "Basic optimisation",
        ],
      },
      {
        name: "Growth",
        price: "₹35,000/mo",
        benefits: [
          "Multi-channel campaigns",
          "Weekly optimisation",
          "Creative + funnel support",
        ],
        featured: true,
      },
      {
        name: "Dominance",
        price: "₹58,000/mo",
        benefits: [
          "Advanced attribution",
          "Dedicated strategist",
          "Scaling automation",
        ],
      },
    ],
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
    lossIfIgnored:
      "Without SEO authority, your business depends only on paid reach while high-intent customers choose competitors ranking above you.",
    packages: [
      {
        name: "Local Launch",
        price: "₹15,000/mo",
        benefits: [
          "Technical fixes",
          "Local SEO setup",
          "Monthly keyword tracking",
        ],
      },
      {
        name: "Authority Growth",
        price: "₹29,000/mo",
        benefits: [
          "Content strategy",
          "On-page + off-page SEO",
          "Weekly ranking improvements",
        ],
        featured: true,
      },
      {
        name: "Market Leader",
        price: "₹49,000/mo",
        benefits: [
          "Aggressive authority building",
          "High-volume content engine",
          "CRO + SEO integration",
        ],
      },
    ],
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
    lossIfIgnored:
      "Without social systems, brand trust erodes and inbound demand drops while competitors capture audience attention daily.",
    packages: [
      {
        name: "Brand Start",
        price: "₹14,000/mo",
        benefits: ["Content calendar", "Basic creatives", "Monthly analytics"],
      },
      {
        name: "Engagement Pro",
        price: "₹28,000/mo",
        benefits: [
          "Reels strategy",
          "Community management",
          "Paid boost support",
        ],
        featured: true,
      },
      {
        name: "Influence Scale",
        price: "₹45,000/mo",
        benefits: [
          "Influencer mapping",
          "Advanced creative testing",
          "Funnel-linked social growth",
        ],
      },
    ],
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
    lossIfIgnored:
      "Without high-intent paid acquisition, revenue growth slows and your competitors capture customers already searching for your offer.",
    packages: [
      {
        name: "Lead Starter",
        price: "₹20,000/mo",
        benefits: [
          "Search ads setup",
          "Keyword structuring",
          "Basic landing review",
        ],
      },
      {
        name: "Performance Pro",
        price: "₹38,000/mo",
        benefits: [
          "Search + YouTube campaigns",
          "A/B ad testing",
          "Weekly bid optimisation",
        ],
        featured: true,
      },
      {
        name: "Scale Max",
        price: "₹62,000/mo",
        benefits: [
          "Advanced audience strategy",
          "Conversion architecture",
          "Cross-channel retargeting",
        ],
      },
    ],
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
    lossIfIgnored:
      "Without a conversion-focused website, businesses lose trust, leads, and measurable revenue from every traffic source.",
    packages: [
      {
        name: "Launch Site",
        price: "₹30,000",
        benefits: [
          "Business site build",
          "Responsive pages",
          "Basic SEO setup",
        ],
      },
      {
        name: "Growth Site",
        price: "₹65,000",
        benefits: [
          "Conversion-first UX",
          "Lead automation",
          "Performance optimization",
        ],
        featured: true,
      },
      {
        name: "Scale Platform",
        price: "₹1,10,000",
        benefits: [
          "Advanced funnels",
          "Custom integrations",
          "Full analytics stack",
        ],
      },
    ],
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
    lossIfIgnored:
      "Without structured e-commerce systems, ad spend rises while conversion rates and repeat purchases stay low.",
    packages: [
      {
        name: "Store Starter",
        price: "₹45,000",
        benefits: ["Core store build", "Product setup", "Payment integration"],
      },
      {
        name: "Conversion Pro",
        price: "₹85,000",
        benefits: [
          "Optimized checkout",
          "Marketing automation",
          "SEO catalog setup",
        ],
        featured: true,
      },
      {
        name: "Scale Commerce",
        price: "₹1,40,000",
        benefits: [
          "Retention flows",
          "Advanced analytics",
          "Growth infrastructure",
        ],
      },
    ],
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
  lossIfIgnored:
    "Without strategic execution, businesses overpay for weak lead quality and lose compounding growth opportunities.",
  packages: [
    {
      name: "Starter",
      price: "₹15,000/mo",
      benefits: ["Core execution", "Monthly reviews", "Essential support"],
    },
    {
      name: "Growth",
      price: "₹32,000/mo",
      benefits: [
        "Expanded channels",
        "Weekly optimisation",
        "Priority strategy",
      ],
      featured: true,
    },
    {
      name: "Premium",
      price: "₹55,000/mo",
      benefits: ["Scale systems", "Advanced analytics", "Dedicated growth pod"],
    },
  ],
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
  const serviceFaq = [
    {
      question: `How soon can ${service.title} campaigns start?`,
      answer:
        "Most engagements start within 3 to 5 working days after strategy alignment and onboarding.",
    },
    {
      question: "Do you work only with Kadapa businesses?",
      answer:
        "No. We support brands across South India with remote execution and city-specific strategy adaptations.",
    },
    {
      question: "Will I get transparent reporting?",
      answer:
        "Yes. You receive clear performance tracking with practical action points, not vanity-only metrics.",
    },
    {
      question: "Can I upgrade package tiers later?",
      answer:
        "Yes. As volume grows, plans can be upgraded with expanded scope and deeper optimisation layers.",
    },
  ] as const;

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceFaq.map((item) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
        {/* Breadcrumb */}
        <div
          className="section-shell"
          style={{
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
          className="section-shell grid-detail-hero"
          style={{
            padding: "32px 24px 64px",
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
                fontSize: "clamp(15px, 2vw, 17px)",
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
                maxWidth: "520px",
                marginBottom: "28px",
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
                background: "var(--gradient-brand-premium)",
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
              padding: "clamp(20px, 3.4vw, 28px)",
              borderRadius: "16px",
              border: "1px solid rgba(239,89,36,0.3)",
              background:
                "linear-gradient(160deg, rgba(249,160,27,0.12), rgba(239,89,36,0.08) 55%, rgba(211,32,39,0.08))",
              maxWidth: "360px",
              width: "100%",
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

        <section
          className="section-shell"
          style={{
            padding: "0 24px 64px",
          }}
        >
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              background: "var(--color-dark-elevated)",
              padding: "28px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(22px, 3vw, 30px)",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                marginBottom: "18px",
              }}
            >
              Pricing Packages
            </h2>
            <div className="grid-card-4" style={{ gap: "14px" }}>
              {detail.packages.map((pkg) => (
                <div
                  key={pkg.name}
                  style={{
                    borderRadius: "14px",
                    border: pkg.featured
                      ? "1px solid rgba(239,89,36,0.45)"
                      : "1px solid var(--color-border)",
                    background: pkg.featured
                      ? "linear-gradient(160deg, rgba(249,160,27,0.14), rgba(211,32,39,0.08))"
                      : "var(--color-dark-surface)",
                    padding: "16px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--color-brand-orange)",
                      marginBottom: "6px",
                    }}
                  >
                    {pkg.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(20px, 3vw, 28px)",
                      color: "var(--color-text-primary)",
                      marginBottom: "10px",
                    }}
                  >
                    {pkg.price}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "grid",
                      gap: "6px",
                    }}
                  >
                    {pkg.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "12px",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        • {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p
              style={{
                marginTop: "16px",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              <strong style={{ color: "var(--color-text-primary)" }}>
                If ignored:
              </strong>{" "}
              {detail.lossIfIgnored}
            </p>
          </div>
        </section>

        {/* Benefits + Process */}
        <section
          className="section-shell grid-balance-2"
          style={{
            padding: "64px 24px",
            gap: "clamp(28px, 5vw, 48px)",
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
                      border: "1px solid rgba(239,89,36,0.4)",
                      background: "rgba(239,89,36,0.08)",
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

        <section
          aria-labelledby="service-detail-faq-heading"
          className="section-shell"
          style={{
            padding: "0 24px 64px",
          }}
        >
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              background: "var(--color-dark-surface)",
              padding: "24px",
            }}
          >
            <h2
              id="service-detail-faq-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(22px, 3vw, 30px)",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                marginBottom: "18px",
              }}
            >
              Service FAQ
            </h2>
            <FaqAccordion items={serviceFaq} />
          </div>
        </section>

        {/* City links for pSEO interlinking */}
        <section
          style={{
            background: "var(--color-dark-surface)",
            padding: "60px 24px",
          }}
        >
          <div className="section-shell">
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
                  className="server-hover-pill-orange"
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
                >
                  {CITY_LABELS[city]}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA bar */}
        <section
          className="section-shell"
          style={{
            padding: "64px 24px",
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
              <span className="text-brand-gradient">{service.title}?</span>
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
              className="cta-row-mobile"
              style={{
                margin: "0 auto",
                maxWidth: "560px",
              }}
            >
              <a
                href={`tel:+91${BUSINESS_DATA.phone}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  background: "var(--gradient-brand-premium)",
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
