import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { BUSINESS_DATA } from "@/lib/constants";
import { MEDIA_ASSETS } from "@/lib/mediaManifest";
import FaqAccordion from "@/components/shared/FaqAccordion";

export const metadata: Metadata = {
  title: "About Mavericks Technovations | Agency & Academy in Kadapa",
  description:
    "Mavericks Technovations is a South India digital marketing agency and training academy helping 200+ brands grow online. Based in Kadapa, serving brands across India.",
  alternates: {
    canonical: `${BUSINESS_DATA.url}/about`,
  },
  openGraph: {
    title: "About Mavericks Technovations",
    description:
      "200+ brands. 312% average growth lift. South India's most results-driven digital partner.",
    url: `${BUSINESS_DATA.url}/about`,
    images: [
      {
        url: `/og?title=About+Mavericks&type=about`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const STATS = [
  { value: "200+", label: "Brands scaled" },
  { value: "312%", label: "Avg. traffic lift" },
  { value: "8.4×", label: "Avg. Google Ads ROAS" },
  { value: "4+", label: "Years of agency ops" },
];

const VALUES = [
  {
    title: "Results over reports",
    body: "Every recommendation we make is tied to a measurable outcome. Vanity metrics stay out of our dashboards.",
  },
  {
    title: "Radical transparency",
    body: "Live dashboards, weekly updates, no jargon. You always know exactly where your money is going and what it's doing.",
  },
  {
    title: "Local intelligence, global standards",
    body: "Deep understanding of Telugu-speaking consumer behaviour combined with globally certified execution methods.",
  },
  {
    title: "Education as a force multiplier",
    body: "Through our Academy, we transfer skills directly to individuals and in-house teams so every community we touch grows stronger.",
  },
];

const TEAM = [
  {
    name: "Lokesh",
    role: "Founder & Growth Strategist",
    bio: "Performance marketer with 4+ years building growth systems for local businesses across South India. Obsessed with attribution and unit economics.",
  },
  {
    name: "Academy Team",
    role: "Trainers & Placement Counsellors",
    bio: "Practicing professionals from medical coding and digital marketing industries turned educators — no career theorists, only active practitioners.",
  },
];

const ABOUT_FAQ = [
  {
    question: "How is Mavericks different from a typical agency?",
    answer:
      "We operate as an execution partner and growth advisor. You get campaign delivery, clear attribution, and weekly optimisation decisions tied to business outcomes.",
  },
  {
    question: "Do you support startups and small businesses?",
    answer:
      "Yes. We work with startup founders, local businesses, and scaling brands through tiered growth roadmaps that match cash flow and stage.",
  },
  {
    question: "Can your academy team help build in-house marketing teams?",
    answer:
      "Yes. We support hiring, intern-to-exec training paths, and practical onboarding systems so internal teams can execute consistently.",
  },
  {
    question: "What reporting visibility do clients get?",
    answer:
      "You get transparent reporting with lead quality tracking, spend vs return visibility, and clear action plans on what we improve next.",
  },
  {
    question: "Do you work only in Kadapa?",
    answer:
      "Kadapa is our home base, but we actively support businesses across South India through remote-first campaign systems and hybrid support.",
  },
] as const;

export default function AboutPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: BUSINESS_DATA.name,
    url: BUSINESS_DATA.url,
    telephone: `+91${BUSINESS_DATA.phone}`,
    email: BUSINESS_DATA.email,
    description:
      "South India digital marketing agency and certified tech training academy based in Kadapa.",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_DATA.address.street,
      addressLocality: BUSINESS_DATA.address.city,
      addressRegion: BUSINESS_DATA.address.state,
      postalCode: BUSINESS_DATA.address.postalCode,
      addressCountry: "IN",
    },
    foundingDate: "2020",
    numberOfEmployees: { "@type": "QuantitativeValue", value: "10" },
    knowsAbout: [
      "Digital Marketing",
      "SEO",
      "Google Ads",
      "Social Media Marketing",
      "Medical Coding Training",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: ABOUT_FAQ.map((item) => ({
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
        {/* Hero */}
        <section
          className="section-shell"
          style={{
            padding: "60px 24px 80px",
            borderBottom: "1px solid var(--color-border)",
            backgroundImage: `linear-gradient(120deg, rgba(10,10,10,0.9), rgba(10,10,10,0.72)), url(${MEDIA_ASSETS.about.heroImage})`,
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
            Our Story
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(40px, 7vw, 80px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "var(--color-text-primary)",
              maxWidth: "800px",
              marginBottom: "24px",
            }}
          >
            Built in Kadapa.
            <br />
            <span style={{ color: "var(--color-brand-orange)" }}>
              Trusted across South India.
            </span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--color-text-secondary)",
              maxWidth: "640px",
            }}
          >
            Mavericks Technovations started as a two-person performance
            marketing team in Kadapa, Andhra Pradesh. Today we operate one of
            the region's fastest-growing full-service digital agencies and a
            certified tech training academy — two platforms with a single
            mission: give South Indian businesses and professionals every
            advantage the digital world offers.
          </p>
        </section>

        {/* Stats */}
        <section
          className="section-shell"
          style={{
            padding: "72px 24px",
            borderBottom: "1px solid var(--color-border)",
          }}
          aria-label="Key metrics"
        >
          <div
            className="about-stats-grid"
            style={{
              gap: "18px",
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  background: "var(--color-dark-elevated)",
                  padding: "18px 16px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(28px, 4vw, 48px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "var(--color-text-primary)",
                    marginBottom: "8px",
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section
          style={{
            background: "var(--color-dark-surface)",
            padding: "80px 24px",
          }}
        >
          <div className="section-shell">
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
              Mission
            </p>
            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(22px, 3.5vw, 40px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                color: "var(--color-text-primary)",
                maxWidth: "800px",
                borderLeft: "3px solid var(--color-brand-orange)",
                paddingLeft: "32px",
                margin: 0,
              }}
            >
              "To give every South Indian business and professional an unfair
              advantage in the digital economy."
            </blockquote>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
                maxWidth: "640px",
                marginTop: "28px",
              }}
            >
              We don't just run campaigns — we build growth infrastructure.
              Whether that's a lean digital marketing system for a Kadapa
              retailer or a placement pathway for a fresh graduate, we only call
              it done when the outcome is real and measurable.
            </p>
          </div>
        </section>

        {/* Values */}
        <section
          className="section-shell"
          style={{
            padding: "80px 24px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(24px, 3.5vw, 36px)",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              marginBottom: "48px",
            }}
          >
            How we operate
          </h2>
          <div
            className="grid-card-4"
            style={{
              gap: "24px",
            }}
          >
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "32px",
                  borderRadius: "16px",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-dark-elevated)",
                  height: "100%",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-brand-orange)",
                    marginBottom: "12px",
                  }}
                >
                  0{i + 1}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "17px",
                    letterSpacing: "-0.02em",
                    color: "var(--color-text-primary)",
                    marginBottom: "10px",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    lineHeight: 1.65,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section
          style={{
            background: "var(--color-dark-surface)",
            padding: "80px 24px",
          }}
        >
          <div className="section-shell">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(24px, 3.5vw, 36px)",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                marginBottom: "48px",
              }}
            >
              The team
            </h2>
            <div
              className="grid-card-2"
              style={{
                gap: "24px",
              }}
            >
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "32px",
                    borderRadius: "16px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-dark-elevated)",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(135deg, var(--color-brand-orange), var(--color-brand-red))",
                      marginBottom: "20px",
                    }}
                    aria-hidden="true"
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "18px",
                      letterSpacing: "-0.02em",
                      color: "var(--color-text-primary)",
                      marginBottom: "4px",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--color-brand-orange)",
                      marginBottom: "14px",
                    }}
                  >
                    {member.role}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      lineHeight: 1.65,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="section-shell"
          style={{
            padding: "80px 24px 64px",
          }}
        >
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "18px",
              background:
                "linear-gradient(125deg, rgba(249,160,27,0.12), rgba(211,32,39,0.06))",
              padding: "clamp(24px, 4vw, 40px)",
              display: "grid",
              gap: "22px",
            }}
          >
            <p
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-brand-orange)",
              }}
            >
              <Sparkles size={14} />
              Ready to work together?
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(24px, 4vw, 42px)",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                maxWidth: "700px",
                lineHeight: 1.1,
              }}
            >
              Let&apos;s build a predictable revenue system for your business.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                color: "var(--color-text-secondary)",
                maxWidth: "640px",
                lineHeight: 1.65,
              }}
            >
              Strategy, execution, and reporting under one roof. We help you
              scale faster without wasting budget on guesswork.
            </p>
            <div
              className="grid-card-4"
              style={{
                gap: "10px",
              }}
            >
              {[
                "Weekly optimisation cycles",
                "Transparent performance reporting",
                "South India market intelligence",
                "Agency + Academy capability",
              ].map((point) => (
                <p
                  key={point}
                  style={{
                    border: "1px solid var(--color-border)",
                    borderRadius: "10px",
                    padding: "10px 12px",
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "var(--color-text-secondary)",
                    background: "rgba(10,10,10,0.25)",
                  }}
                >
                  {point}
                </p>
              ))}
            </div>
            <div className="cta-row-mobile">
              <Link
                href="/services"
                className="btn-animated"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  background: "var(--gradient-brand-premium)",
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
                Explore Services
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
              <a
                href={`tel:+91${BUSINESS_DATA.phone}`}
                className="btn-animated"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
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
                <Phone size={14} strokeWidth={2} />
                +91 {BUSINESS_DATA.phone}
              </a>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="about-faq-heading"
          className="section-shell"
          style={{
            padding: "0 24px 88px",
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
              id="about-faq-heading"
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
            <div style={{ maxWidth: "960px" }}>
              <FaqAccordion items={ABOUT_FAQ} defaultOpenIndex={0} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
