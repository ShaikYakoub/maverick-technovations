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
    title: "Industry-calibrated curriculum",
    body: "Programs are shaped around current hiring demand and practical role expectations, not old brochure promises.",
  },
  {
    title: "Project-led learning",
    body: "Students work through tools, workflows, and assignments that translate into recruiter-visible proof.",
  },
  {
    title: "Placement support built in",
    body: "Resume prep, interview practice, portfolio guidance, and referral support are part of the operating model.",
  },
  {
    title: "Offline and live-online delivery",
    body: "Learners can attend from Kadapa or join remotely without losing mentorship or accountability.",
  },
] as const;

const OUTCOME_TRACKS = [
  {
    title: "Clinical and healthcare roles",
    body: "Medical Coding pathway focused on process accuracy, compliance awareness, and healthcare operations readiness.",
  },
  {
    title: "Marketing and growth roles",
    body: "Digital Marketing pathway for agency, brand, freelance, and performance-led in-house execution.",
  },
  {
    title: "AI and applied data roles",
    body: "AI/ML pathway for model workflows, applied automation, and implementation thinking.",
  },
  {
    title: "Design and product roles",
    body: "UI/UX pathway for user research, interface systems, and product communication depth.",
  },
  {
    title: "Cloud and delivery roles",
    body: "Cloud/DevOps pathway for release reliability, infrastructure thinking, and deployment discipline.",
  },
  {
    title: "Security and defense roles",
    body: "Cybersecurity pathway for monitoring, vulnerability awareness, and incident-response readiness.",
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
        <section
          className="section-shell"
          style={{ padding: "24px 24px 84px" }}
        >
          <div
            style={{
              border: "1px solid rgba(239,89,36,0.16)",
              borderRadius: "28px",
              overflow: "hidden",
              backgroundImage: `linear-gradient(120deg, rgba(10,10,10,0.92), rgba(10,10,10,0.68)), url(${MEDIA_ASSETS.academy.heroImage})`,
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
                  maxWidth: "780px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-brand-red)",
                  }}
                >
                  Mavericks Academy
                </p>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(40px, 7vw, 80px)",
                    letterSpacing: "-0.05em",
                    lineHeight: 0.98,
                    color: "var(--color-text-primary)",
                    maxWidth: "780px",
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
                    lineHeight: 1.76,
                    color: "var(--color-text-secondary)",
                    maxWidth: "620px",
                  }}
                >
                  Six high-demand tracks including Medical Coding, Digital
                  Marketing, AI/ML, UI/UX, Cloud/DevOps, and Cybersecurity.
                  Practical curriculum, project depth, and placement support
                  built on real execution standards.
                </p>
                <a
                  href={`tel:+91${BUSINESS_DATA.phone}`}
                  className="btn-animated"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
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
                    width: "fit-content",
                  }}
                >
                  <Phone size={15} strokeWidth={2} />
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell" style={{ padding: "0 24px 72px" }}>
          <div
            style={{
              border: "1px solid rgba(239,89,36,0.16)",
              borderRadius: "24px",
              background:
                "radial-gradient(circle at top right, rgba(239,89,36,0.16) 0%, rgba(18,18,18,0.98) 34%, rgba(10,10,10,1) 100%)",
              padding: "clamp(22px, 4vw, 34px)",
              display: "grid",
              gap: "18px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(26px, 4vw, 40px)",
                letterSpacing: "-0.04em",
                color: "var(--color-text-primary)",
                lineHeight: 1.06,
              }}
            >
              Career pathways aligned to
              <span className="text-brand-gradient"> hiring demand.</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                lineHeight: 1.74,
                color: "var(--color-text-secondary)",
                maxWidth: "720px",
              }}
            >
              Choose a direction based on the kind of work you want to be
              trusted with, not just the name of the course.
            </p>
            <div className="grid-card-4" style={{ gap: "14px" }}>
              {OUTCOME_TRACKS.map((track, index) => (
                <div
                  key={track.title}
                  style={{
                    border: "1px solid rgba(239,89,36,0.14)",
                    borderRadius: "18px",
                    background: "rgba(255,255,255,0.03)",
                    padding: "18px",
                    display: "grid",
                    gap: "10px",
                    animation: `rise-in 0.7s ease ${index * 0.06}s both`,
                  }}
                >
                  <span
                    style={{
                      width: "42px",
                      height: "42px",
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
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "17px",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {track.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {track.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

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

        <section
          style={{
            background: "var(--color-dark-surface)",
            padding: "0 24px 56px",
          }}
        >
          <div className="section-shell">
            <div
              style={{
                border: "1px solid rgba(239,89,36,0.16)",
                borderRadius: "24px",
                background:
                  "linear-gradient(180deg, rgba(24,24,24,0.98) 0%, rgba(12,12,12,0.98) 100%)",
                padding: "clamp(22px, 4vw, 34px)",
                display: "grid",
                gap: "18px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(26px, 4vw, 40px)",
                  letterSpacing: "-0.04em",
                  color: "var(--color-text-primary)",
                }}
              >
                Why Mavericks Academy?
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  lineHeight: 1.74,
                  color: "var(--color-text-secondary)",
                  maxWidth: "720px",
                }}
              >
                Because students need more than syllabus coverage. They need a
                system that makes them legible to employers and confident in
                real work environments.
              </p>
              <div className="grid-card-4" style={{ gap: "14px" }}>
                {WHY_POINTS.map((point, index) => (
                  <div
                    key={point.title}
                    style={{
                      display: "grid",
                      gap: "10px",
                      padding: "20px",
                      borderRadius: "18px",
                      border: "1px solid rgba(239,89,36,0.14)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <span
                      style={{
                        width: "42px",
                        height: "42px",
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
                      {index + 1}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "17px",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {point.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        lineHeight: 1.72,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {point.body}
                    </p>
                  </div>
                ))}
              </div>
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
              border: "1px solid rgba(239,89,36,0.14)",
              borderRadius: "20px",
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
            <FaqAccordion items={ACADEMY_FAQ} />
          </div>
        </section>
      </div>
    </>
  );
}
