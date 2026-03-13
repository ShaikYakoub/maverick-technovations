import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { ACADEMY_COURSES, BUSINESS_DATA } from "@/lib/constants";
import { MEDIA_ASSETS } from "@/lib/mediaManifest";
import FaqAccordion from "@/components/shared/FaqAccordion";
import ExpandableAcademyGrid from "@/components/shared/ExpandableAcademyGrid";

export const metadata: Metadata = {
  title: "Tech Academy — Career Programs in AI, Design, Cloud, Security",
  description:
    "Certified career tracks in Medical Coding, Digital Marketing, AI/ML, UI/UX, Cloud/DevOps, and Cybersecurity with practical projects and placement support.",
  alternates: {
    canonical: `${BUSINESS_DATA.url}/academy`,
  },
  openGraph: {
    title: "Mavericks Technovations Academy | Kadapa",
    description:
      "Certified tech training programs with placement support across six high-demand career tracks.",
    url: `${BUSINESS_DATA.url}/academy`,
    images: [
      {
        url: `/og?title=Tech+Academy&type=academy`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const WHY_POINTS = [
  {
    title: "Industry-Certified Curriculum",
    body: "Programs designed to meet AAPC and industry standards, updated quarterly.",
  },
  {
    title: "Live Project Training",
    body: "Work on real client accounts and live data — not simulations.",
  },
  {
    title: "Placement Support",
    body: "Resume prep, mock interviews, and direct referrals to our agency network.",
  },
  {
    title: "Flexible Delivery",
    body: "Attend offline at our Kadapa centre or join live online sessions from anywhere.",
  },
];

const OUTCOME_TRACKS = [
  {
    title: "Clinical and Healthcare",
    body: "Medical Coding pathway focused on global healthcare process roles.",
  },
  {
    title: "Marketing and Growth",
    body: "Digital Marketing pathway for agency, brand, and freelance careers.",
  },
  {
    title: "AI and Data Applications",
    body: "AI/ML pathway for model building, deployment, and product implementation.",
  },
  {
    title: "Design and Product",
    body: "UI/UX pathway for research-driven interface and product design roles.",
  },
  {
    title: "Cloud and Delivery",
    body: "Cloud/DevOps pathway for deployment reliability and infrastructure operations.",
  },
  {
    title: "Security and Defense",
    body: "Cybersecurity pathway for SOC, vulnerability, and incident response readiness.",
  },
] as const;

const ACADEMY_FAQ = [
  {
    question: "Do you offer placement support after training?",
    answer:
      "Yes. We provide resume prep, mock interviews, portfolio support, and referrals through our hiring partner network.",
  },
  {
    question: "Can working professionals join these courses?",
    answer:
      "Yes. All programs support flexible batches with offline and live online options.",
  },
  {
    question: "Are these beginner-friendly programs?",
    answer:
      "Yes. We start with fundamentals and progressively move to live tools, practical projects, and certification readiness.",
  },
  {
    question: "Do you teach resume building and interview handling?",
    answer:
      "Yes. Every learner gets resume-building support, mock interview rounds, and recruiter-facing profile optimisation.",
  },
  {
    question: "Can I pay course fees in flexible options?",
    answer:
      "Yes. We provide multiple fee plans so learners and business owners can choose the right learning depth and support level.",
  },
  {
    question: "Will I get practical project work?",
    answer:
      "Yes. Programs include live projects, tool-based tasks, and capstone submissions to build real hiring-ready portfolios.",
  },
] as const;

export default function AcademyPage() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mavericks Technovations Academy Courses",
    itemListElement: ACADEMY_COURSES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      url: `${BUSINESS_DATA.url}/academy/${c.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: ACADEMY_FAQ.map((item) => ({
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
            backgroundImage: `linear-gradient(120deg, rgba(10,10,10,0.9), rgba(10,10,10,0.72)), url(${MEDIA_ASSETS.academy.heroImage})`,
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
              color: "var(--color-brand-red)",
              marginBottom: "16px",
            }}
          >
            Mavericks Academy
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(40px, 7vw, 80px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "var(--color-text-primary)",
              maxWidth: "700px",
              marginBottom: "24px",
            }}
          >
            Train like a pro.
            <br />
            <span className="text-brand-gradient">Place like one.</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "var(--color-text-secondary)",
              maxWidth: "540px",
              marginBottom: "36px",
            }}
          >
            Six certified career tracks including Medical Coding, Digital
            Marketing, AI/ML, UI/UX, Cloud/DevOps, and Cybersecurity. Practical
            curriculum, live projects, and placement support built on real
            agency execution.
          </p>
          <a
            href={`tel:+91${BUSINESS_DATA.phone}`}
            className="btn-animated"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              background: "var(--gradient-brand-red)",
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
            Enquire Now
          </a>
        </section>

        <section className="section-shell" style={{ padding: "0 24px 72px" }}>
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              background: "var(--color-dark-elevated)",
              padding: "24px",
              display: "grid",
              gap: "14px",
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
              Career pathways aligned to
              <span className="text-brand-gradient"> hiring demand.</span>
            </h2>
            <div className="grid-card-4" style={{ gap: "12px" }}>
              {OUTCOME_TRACKS.map((track) => (
                <div
                  key={track.title}
                  style={{
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                    background: "var(--color-dark-surface)",
                    padding: "14px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "15px",
                      color: "var(--color-text-primary)",
                      marginBottom: "6px",
                    }}
                  >
                    {track.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.65,
                    }}
                  >
                    {track.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Course cards */}
        <section
          aria-labelledby="courses-heading"
          className="section-shell"
          style={{
            padding: "72px 24px",
          }}
        >
          <h2
            id="courses-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(24px, 3.5vw, 36px)",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              marginBottom: "40px",
            }}
          >
            Our Programs
          </h2>

          <ExpandableAcademyGrid courses={ACADEMY_COURSES} />
        </section>

        {/* Why choose us */}
        <section
          style={{
            background: "var(--color-dark-surface)",
            padding: "80px 24px 56px",
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
              Why Mavericks Academy?
            </h2>
            <div
              className="grid-card-4"
              style={{
                gap: "24px",
              }}
            >
              {WHY_POINTS.map((p) => (
                <div
                  key={p.title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "28px",
                    borderRadius: "14px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-dark-elevated)",
                    height: "100%",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "var(--color-text-primary)",
                      marginBottom: "10px",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      lineHeight: 1.65,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="academy-faq-heading"
          style={{
            background: "var(--color-dark-surface)",
            padding: "0 24px 80px",
          }}
        >
          <div
            className="section-shell"
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              background: "var(--color-dark-elevated)",
              padding: "32px",
            }}
          >
            <h2
              id="academy-faq-heading"
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
            <FaqAccordion items={ACADEMY_FAQ} defaultOpenIndex={0} />
          </div>
        </section>
      </div>
    </>
  );
}
