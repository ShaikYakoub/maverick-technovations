import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles } from "@/lib/icons";
import { BUSINESS_DATA } from "@/lib/constants";
import { MEDIA_ASSETS } from "@/lib/mediaManifest";
import FaqAccordion from "@/components/shared/FaqAccordion";

export const metadata: Metadata = {
  title: "About Mavericks Technovations | Agency & Academy in Kadapa",
  description:
    "Mavericks Technovations is a South India digital marketing agency and training academy helping brands and professionals grow online from Kadapa.",
  alternates: {
    canonical: `${BUSINESS_DATA.url}/about`,
  },
  openGraph: {
    title: "About Mavericks Technovations",
    description:
      "South India digital growth partner combining agency execution and academy capability.",
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
  { value: "200+", label: "Brands and learners supported" },
  { value: "312%", label: "Average traffic lift across growth engagements" },
  { value: "8.4×", label: "Average Google Ads ROAS on matured accounts" },
  { value: "4+", label: "Years of operating in agency and academy mode" },
];

const VALUES = [
  {
    title: "Results over reporting theater",
    body: "Every recommendation has to move a commercial metric. Dashboards exist to guide decisions, not to perform competence.",
  },
  {
    title: "Radical visibility",
    body: "Clients and learners always know what is happening, why it matters, and what comes next. No hiding behind jargon.",
  },
  {
    title: "Local intelligence with global execution standards",
    body: "We understand South India buying behavior, but we execute with frameworks that can compete anywhere.",
  },
  {
    title: "Capability transfer, not dependency",
    body: "Our Academy and client systems are both designed to leave teams stronger, sharper, and more independent over time.",
  },
] as const;

const TIMELINE = [
  {
    title: "Started lean in Kadapa",
    body: "The company began as a small performance-led team solving practical growth problems for local businesses that could not afford agency waste.",
  },
  {
    title: "Built a full-funnel agency rhythm",
    body: "Campaign delivery expanded into strategy, conversion, reporting, and creative systems so execution stayed aligned to revenue.",
  },
  {
    title: "Added Academy capability",
    body: "Training became the second engine: practical education, hiring readiness, and talent development built from real market demand.",
  },
  {
    title: "Now operating as a dual-growth platform",
    body: "Today the agency and academy reinforce each other, giving businesses execution support and giving professionals a clearer career path.",
  },
] as const;

const TEAM = [
  {
    name: "Lokesh",
    role: "Founder & Growth Strategist",
    bio: "Performance marketer focused on attribution, offer clarity, and operating systems that scale beyond short-term campaign spikes.",
  },
  {
    name: "Strategy & Delivery Team",
    role: "Media, SEO, Design, and Lifecycle Specialists",
    bio: "Cross-functional operators who work across campaigns, content, conversion design, reporting, and client growth planning.",
  },
  {
    name: "Academy Mentors",
    role: "Trainers & Placement Counsellors",
    bio: "Practitioners from medical coding, marketing, design, AI, and infrastructure tracks translating execution into employable skill depth.",
  },
] as const;

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
        <section
          className="section-shell"
          style={{ padding: "24px 24px 84px" }}
        >
          <div
            style={{
              border: "1px solid rgba(239,89,36,0.16)",
              borderRadius: "28px",
              overflow: "hidden",
              background: `linear-gradient(120deg, rgba(10,10,10,0.92), rgba(10,10,10,0.68)), url(${MEDIA_ASSETS.about.heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-90px",
                right: "-40px",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(249,160,27,0.2) 0%, transparent 72%)",
                animation: "float-orb 9s ease-in-out infinite",
              }}
            />
            <div
              style={{
                gap: "clamp(22px, 4vw, 38px)",
                padding: "clamp(28px, 6vw, 56px)",
                alignItems: "end",
                position: "relative",
                zIndex: 1,
                display: "grid",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gap: "16px",
                  animation: "rise-in 0.8s ease both",
                  maxWidth: "820px",
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
                  Built for this market
                </p>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(40px, 7vw, 84px)",
                    letterSpacing: "-0.05em",
                    lineHeight: 0.98,
                    color: "var(--color-text-primary)",
                    maxWidth: "820px",
                  }}
                >
                  Built in Kadapa.
                  <br />
                  <span className="text-brand-gradient">
                    Designed to compound across South India.
                  </span>
                </h1>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "16px",
                    lineHeight: 1.76,
                    color: "var(--color-text-secondary)",
                    maxWidth: "640px",
                  }}
                >
                  Mavericks Technovations combines agency execution and academy
                  capability under one operating philosophy: practical growth,
                  sharp visibility, and systems that improve outcomes instead of
                  just creating activity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section-shell"
          style={{ padding: "0 24px 84px" }}
          aria-label="Key metrics"
        >
          <div className="about-stats-grid" style={{ gap: "16px" }}>
            {STATS.map((s, index) => (
              <div
                key={s.label}
                style={{
                  border: "1px solid rgba(239,89,36,0.14)",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(180deg, rgba(24,24,24,0.98) 0%, rgba(14,14,14,0.98) 100%)",
                  padding: "20px 18px",
                  animation: `rise-in 0.7s ease ${0.08 * index}s both`,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(30px, 4vw, 50px)",
                    letterSpacing: "-0.05em",
                    lineHeight: 1,
                    color: "var(--color-text-primary)",
                    marginBottom: "10px",
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "0 24px 84px" }}>
          <div
            className="section-shell grid-balance-2"
            style={{
              gap: "16px",
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                border: "1px solid rgba(239,89,36,0.14)",
                borderRadius: "24px",
                background: "var(--color-dark-surface)",
                padding: "clamp(22px, 4vw, 34px)",
                display: "grid",
                gap: "16px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-orange)",
                }}
              >
                Mission
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 4vw, 42px)",
                  letterSpacing: "-0.04em",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.08,
                }}
              >
                Give South Indian businesses and professionals an unfair digital
                advantage.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  lineHeight: 1.78,
                  color: "var(--color-text-secondary)",
                }}
              >
                We do not separate strategy from execution or education from
                employability. The agency exists to create measurable business
                movement. The academy exists to create people capable of
                sustaining that movement.
              </p>
            </div>

            <div
              style={{
                border: "1px solid rgba(239,89,36,0.14)",
                borderRadius: "24px",
                background:
                  "radial-gradient(circle at top right, rgba(239,89,36,0.14) 0%, rgba(18,18,18,0.98) 36%, rgba(10,10,10,1) 100%)",
                padding: "clamp(22px, 4vw, 34px)",
                display: "grid",
                gap: "14px",
              }}
            >
              {TIMELINE.map((item, index) => (
                <div
                  key={item.title}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "34px 1fr",
                    gap: "12px",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      justifyItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "999px",
                        background: "var(--gradient-brand-premium)",
                        boxShadow: "0 0 0 6px rgba(239,89,36,0.08)",
                      }}
                    />
                    {index < TIMELINE.length - 1 ? (
                      <span
                        style={{
                          width: "1px",
                          minHeight: "58px",
                          background:
                            "linear-gradient(180deg, rgba(239,89,36,0.4) 0%, rgba(239,89,36,0.04) 100%)",
                        }}
                      />
                    ) : null}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gap: "6px",
                      paddingBottom: "6px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "17px",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {item.title}
                    </h3>
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
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" style={{ padding: "0 24px 84px" }}>
          <div style={{ display: "grid", gap: "16px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(26px, 3.6vw, 38px)",
                letterSpacing: "-0.04em",
                color: "var(--color-text-primary)",
              }}
            >
              How we operate
              <span className="text-brand-gradient">
                {" "}
                when the stakes are real.
              </span>
            </h2>
            <div className="grid-card-4" style={{ gap: "14px" }}>
              {VALUES.map((value, index) => (
                <div
                  key={value.title}
                  style={{
                    display: "grid",
                    gap: "10px",
                    padding: "22px",
                    borderRadius: "18px",
                    border: "1px solid rgba(239,89,36,0.14)",
                    background: "var(--color-dark-elevated)",
                    minHeight: "100%",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--color-brand-orange)",
                    }}
                  >
                    0{index + 1}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "17px",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      lineHeight: 1.72,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {value.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" style={{ padding: "0 24px 84px" }}>
          <div style={{ display: "grid", gap: "16px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(26px, 3.6vw, 38px)",
                letterSpacing: "-0.04em",
                color: "var(--color-text-primary)",
              }}
            >
              The people behind the operating system.
            </h2>
            <div className="grid-card-4" style={{ gap: "14px" }}>
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  style={{
                    display: "grid",
                    gap: "12px",
                    padding: "22px",
                    borderRadius: "18px",
                    border: "1px solid rgba(239,89,36,0.14)",
                    background:
                      "linear-gradient(180deg, rgba(24,24,24,0.98) 0%, rgba(14,14,14,0.98) 100%)",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      background: "var(--gradient-brand-premium)",
                    }}
                    aria-hidden="true"
                  />
                  <div style={{ display: "grid", gap: "4px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "18px",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--color-brand-orange)",
                      }}
                    >
                      {member.role}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      lineHeight: 1.72,
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

        <section className="section-shell" style={{ padding: "0 24px 64px" }}>
          <div
            style={{
              border: "1px solid rgba(239,89,36,0.18)",
              borderRadius: "24px",
              background:
                "radial-gradient(circle at top left, rgba(249,160,27,0.16) 0%, rgba(18,18,18,0.98) 32%, rgba(10,10,10,1) 100%)",
              padding: "clamp(24px, 4vw, 40px)",
              display: "grid",
              gap: "20px",
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
                letterSpacing: "0.18em",
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
                fontSize: "clamp(28px, 4vw, 46px)",
                letterSpacing: "-0.04em",
                color: "var(--color-text-primary)",
                maxWidth: "780px",
                lineHeight: 1.05,
              }}
            >
              Build a clearer growth path for your business,
              <span className="text-brand-gradient"> your team, or both.</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                color: "var(--color-text-secondary)",
                maxWidth: "680px",
                lineHeight: 1.72,
              }}
            >
              If you need a performance partner, a practical training pathway,
              or a more capable in-house system, we can help you map the next
              move without wasting cycles.
            </p>
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
                  borderRadius: "999px",
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
                  borderRadius: "999px",
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
              border: "1px solid rgba(239,89,36,0.14)",
              borderRadius: "20px",
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
            <FaqAccordion items={ABOUT_FAQ} />
          </div>
        </section>
      </div>
    </>
  );
}
