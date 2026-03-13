import type { Metadata } from "next";
import { SERVICES, BUSINESS_DATA } from "@/lib/constants";
import { MEDIA_ASSETS } from "@/lib/mediaManifest";
import FaqAccordion from "@/components/shared/FaqAccordion";
import ExpandableServiceGrid from "@/components/shared/ExpandableServiceGrid";
import ServicesShowcase from "@/components/services/ServicesShowcase";

const SERVICE_GROUPS = [
  {
    title: "Acquisition Engine",
    subtitle: "Capture high-intent demand and convert consistently.",
    slugs: ["digital-marketing", "seo", "google-ads", "social-media-marketing"],
  },
  {
    title: "Visibility & Reputation",
    subtitle:
      "Strengthen trust signals and local authority before competitors.",
    slugs: ["google-my-business", "influencer-marketing", "graphic-designing"],
  },
  {
    title: "Retention & Automation",
    subtitle: "Increase repeat revenue with lifecycle communication systems.",
    slugs: ["email-marketing", "whatsapp-marketing"],
  },
  {
    title: "Platform & Commerce",
    subtitle: "Build digital assets that scale conversion and operations.",
    slugs: ["website-design", "ecommerce", "video-shooting"],
  },
] as const;

const SERVICES_FAQ = [
  {
    question: "Which service should I start with?",
    answer:
      "Most brands start with SEO + Google Ads for immediate and compounding growth. We finalize the mix after a quick strategy audit.",
  },
  {
    question: "Do you work only with businesses in Kadapa?",
    answer:
      "No. We support businesses across South India, including Bangalore, Hyderabad, Chennai, Vizag, Tirupati, Nellore, Kurnool, Guntur, and Vijayawada.",
  },
  {
    question: "How quickly can I expect results?",
    answer:
      "Paid campaigns can produce leads in days, while SEO usually shows strong momentum in 8-12 weeks depending on competition.",
  },
  {
    question: "Do you offer flexible package options?",
    answer:
      "Yes. We offer structured packages so businesses can start lean and scale into premium growth systems as revenue improves.",
  },
  {
    question: "Can you handle both strategy and execution?",
    answer:
      "Yes. Our team handles full-funnel strategy, campaign setup, creative production, optimisation, and reporting.",
  },
  {
    question: "Will I get transparent reporting?",
    answer:
      "Absolutely. We provide clear performance reports with spend, lead quality, conversion trends, and next-step recommendations.",
  },
] as const;

export const metadata: Metadata = {
  title: "Digital Marketing Services",
  description:
    "SEO, Google Ads, Social Media, WhatsApp Marketing, Website Design, E-Commerce - every growth lever managed by certified experts in South India.",
  alternates: {
    canonical: `${BUSINESS_DATA.url}/services`,
  },
  openGraph: {
    title: "Digital Marketing Services | Mavericks Technovations",
    description:
      "12 specialised digital marketing services. Rank #1, drive qualified leads, and convert at scale - Kadapa, Andhra Pradesh.",
    url: `${BUSINESS_DATA.url}/services`,
    images: [
      {
        url: `/og?title=Our+Services&type=services`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Digital Marketing Services",
            description:
              "Digital marketing and growth services offered by Mavericks Technovations",
            itemListElement: SERVICES.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: `${BUSINESS_DATA.url}/services/${s.slug}`,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: SERVICES_FAQ.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <div
        style={{
          minHeight: "100vh",
          background: "var(--color-dark-base)",
          paddingTop: "100px",
        }}
      >
        <section
          className="section-shell"
          style={{
            padding: "60px 24px 80px",
            borderBottom: "1px solid var(--color-border)",
            backgroundImage: `linear-gradient(120deg, rgba(10,10,10,0.9), rgba(10,10,10,0.72)), url(${MEDIA_ASSETS.services.heroImage})`,
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
            What We Do
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(40px, 7vw, 80px)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "var(--color-text-primary)",
              maxWidth: "700px",
              marginBottom: "24px",
            }}
          >
            Every lever that
            <br />
            <span className="text-brand-gradient">drives growth.</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "var(--color-text-secondary)",
              maxWidth: "520px",
            }}
          >
            12 specialised services. One integrated strategy. We manage every
            digital channel that turns strangers into revenue for South Indian
            businesses.
          </p>
        </section>

        <section
          aria-label="Services list"
          className="section-shell"
          style={{
            padding: "64px 24px 72px",
          }}
        >
          <div style={{ display: "grid", gap: "26px" }}>
            {SERVICE_GROUPS.map((group) => {
              const groupServices = group.slugs
                .map((slug) =>
                  SERVICES.find((service) => service.slug === slug),
                )
                .filter(
                  (service): service is (typeof SERVICES)[number] =>
                    service !== undefined,
                );

              return (
                <div
                  key={group.title}
                  style={{
                    border: "1px solid var(--color-border)",
                    borderRadius: "16px",
                    background: "var(--color-dark-elevated)",
                    padding: "22px",
                    display: "grid",
                    gap: "14px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(22px, 3vw, 30px)",
                        letterSpacing: "-0.03em",
                        color: "var(--color-text-primary)",
                        marginBottom: "6px",
                      }}
                    >
                      {group.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {group.subtitle}
                    </p>
                  </div>

                  <ExpandableServiceGrid
                    services={groupServices}
                    showIntel={false}
                    gap="16px"
                    cardPadding="28px"
                    gridClassName="service-grid-responsive"
                  />
                </div>
              );
            })}
          </div>
        </section>

        <ServicesShowcase />

        <section
          aria-labelledby="services-faq-heading"
          className="section-shell"
          style={{
            padding: "0 24px 120px",
          }}
        >
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              background: "var(--color-dark-elevated)",
              padding: "32px",
            }}
          >
            <h2
              id="services-faq-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(24px, 3.2vw, 34px)",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                marginBottom: "20px",
              }}
            >
              Frequently Asked Questions
            </h2>
            <FaqAccordion items={SERVICES_FAQ} defaultOpenIndex={0} />
          </div>
        </section>
      </div>
    </>
  );
}
