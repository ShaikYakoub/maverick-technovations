import type { Metadata } from "next";
import { ArrowRight, Phone } from "lucide-react";
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
    icon: "01",
    title: "Real industry curriculum",
    body: "Every program is built around what hiring managers actually test for — tools, workflows, and execution standards — not what was relevant five years ago.",
  },
  {
    icon: "02",
    title: "Live projects, not textbook tasks",
    body: "You work on real client-facing briefs, agency-grade tools, and domain-specific assignments that turn into recruiter-visible portfolio proof.",
  },
  {
    icon: "03",
    title: "End-to-end placement system",
    body: "Resume building, LinkedIn optimisation, mock interviews, ATS-tuned applications, and warm referrals to our hiring partner network are baked into every track.",
  },
  {
    icon: "04",
    title: "Salary and negotiation coaching",
    body: "We don't just get you to the offer stage — we coach you on market benchmarks, negotiation language, and how to push for what you're worth.",
  },
  {
    icon: "05",
    title: "Flexible batch formats",
    body: "Attend offline at our Kadapa studio or join live-online without losing mentorship access, accountability sessions, or assignment feedback.",
  },
  {
    icon: "06",
    title: "Market and behaviour depth",
    body: "Beyond skills, we teach how industries operate — hiring cycles, platform dynamics, client behaviour, and the professional patterns that separate average from excellent.",
  },
] as const;

const STUDENT_PATHWAY = [
  {
    step: "01",
    title: "First Contact",
    desc: "Reach out by phone, walk in, or fill our enquiry form. No commitment needed — just a starting point.",
  },
  {
    step: "02",
    title: "Free Counseling Session",
    desc: "One-on-one conversation with our team to understand your goals, background, and career direction. No generic pitch.",
  },
  {
    step: "03",
    title: "Program Mapping",
    desc: "We match you to the right track and batch format — Medical Coding, Digital Marketing, AI/ML, UI/UX, Cloud, or Cybersecurity.",
  },
  {
    step: "04",
    title: "Enrollment & Kickoff",
    desc: "Flexible enrollment with payment options. Get access to materials, tools, and your cohort before Day 1.",
  },
  {
    step: "05",
    title: "Core Training & Tools",
    desc: "Live sessions covering theory, domain tools, and workflows used by professionals in real agency and enterprise environments.",
  },
  {
    step: "06",
    title: "Live Projects & Practice",
    desc: "Hands-on assignments on client-grade briefs. Build a portfolio that shows what you can actually do, not just what you studied.",
  },
  {
    step: "07",
    title: "Industry Sneak Peek",
    desc: "Behind-the-scenes into how agencies, hospitals, product teams, and tech orgs actually run. Workflow demos, tools, team dynamics.",
  },
  {
    step: "08",
    title: "Mock Interviews & Feedback",
    desc: "Multiple rounds of simulated interviews with real scoring, structured feedback, and re-rounds until you perform confidently.",
  },
  {
    step: "09",
    title: "Resume & Platform Optimisation",
    desc: "ATS-optimised resume, LinkedIn profile polish, portfolio setup on relevant platforms, and platform-specific behaviour coaching.",
  },
  {
    step: "10",
    title: "Salary, Market & Negotiation",
    desc: "Understand real market salary bands, how negotiations work, what to accept, what to counter, and how to position your experience.",
  },
  {
    step: "11",
    title: "Placement & Referrals",
    desc: "Applications go through our hiring partner network. Warm intros, application support, and follow-up tracking until you land the role.",
  },
  {
    step: "12",
    title: "Career Launch",
    desc: "First role, client, or freelance project — you leave with skills, proof, a network, and the confidence to grow from there.",
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
          aria-labelledby="pathway-heading"
          style={{
            background: "var(--color-dark-base)",
            padding: "0 24px 72px",
          }}
        >
          <div className="section-shell">
            <div
              style={{
                border: "1px solid rgba(239,89,36,0.16)",
                borderRadius: "24px",
                background:
                  "radial-gradient(circle at top left, rgba(249,160,27,0.12) 0%, rgba(18,18,18,0.98) 36%, rgba(10,10,10,1) 100%)",
                padding: "clamp(28px, 5vw, 48px)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-80px",
                  right: "-80px",
                  width: "360px",
                  height: "360px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(239,89,36,0.12) 0%, transparent 65%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-brand-orange)",
                    marginBottom: "12px",
                  }}
                >
                  Your Journey With Us
                </p>
                <h2
                  id="pathway-heading"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(28px, 4vw, 44px)",
                    letterSpacing: "-0.04em",
                    color: "var(--color-text-primary)",
                    lineHeight: 1.06,
                    marginBottom: "12px",
                  }}
                >
                  From first call to
                  <span className="text-brand-gradient"> career launch.</span>
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    lineHeight: 1.74,
                    color: "var(--color-text-secondary)",
                    maxWidth: "680px",
                    marginBottom: "40px",
                  }}
                >
                  Every student goes through a structured pathway — from the
                  moment they enquire to the day they land their first role or
                  client. No guesswork, no drop-off.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {STUDENT_PATHWAY.map((item, index) => (
                    <div
                      key={item.step}
                      style={{
                        padding: "20px",
                        borderRadius: "18px",
                        border: "1px solid rgba(239,89,36,0.14)",
                        background:
                          index === 0 || index === 11
                            ? "linear-gradient(135deg, rgba(249,160,27,0.12) 0%, rgba(239,89,36,0.08) 100%)"
                            : "rgba(255,255,255,0.03)",
                        display: "grid",
                        gap: "10px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {index < 11 && (
                        <div
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "16px",
                            color: "rgba(239,89,36,0.06)",
                            fontFamily: "var(--font-display)",
                            fontWeight: 900,
                            fontSize: "52px",
                            lineHeight: 1,
                            letterSpacing: "-0.04em",
                            userSelect: "none",
                          }}
                        >
                          {item.step}
                        </div>
                      )}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          width: "fit-content",
                        }}
                      >
                        <span
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "8px",
                            background: "var(--gradient-brand-premium)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "11px",
                            flexShrink: 0,
                          }}
                        >
                          {item.step}
                        </span>
                        {index < 11 && (
                          <ArrowRight
                            size={12}
                            strokeWidth={2}
                            style={{ color: "rgba(239,89,36,0.4)" }}
                          />
                        )}
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "15px",
                          color: "var(--color-text-primary)",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "12px",
                          lineHeight: 1.7,
                          color: "var(--color-text-secondary)",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "28px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    href={`tel:+91${BUSINESS_DATA.phone}`}
                    className="btn-animated"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "13px 24px",
                      background: "var(--gradient-brand-premium)",
                      color: "#fff",
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "12px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      borderRadius: "999px",
                      textDecoration: "none",
                      boxShadow: "0 4px 16px rgba(239,89,36,0.30)",
                    }}
                  >
                    <Phone size={13} strokeWidth={2} />
                    Start Your Journey
                  </a>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Free counselling · No commitment
                  </p>
                </div>
              </div>
            </div>
          </div>
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
                padding: "clamp(22px, 4vw, 48px)",
                display: "grid",
                gap: "18px",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-brand-orange)",
                    marginBottom: "12px",
                  }}
                >
                  The Mavericks Difference
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(26px, 4vw, 40px)",
                    letterSpacing: "-0.04em",
                    color: "var(--color-text-primary)",
                    lineHeight: 1.06,
                    marginBottom: "12px",
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
                  Because students need more than syllabus hours. They need a
                  system that makes them legible to employers, confident in real
                  work environments, and ready from Day 1.
                </p>
              </div>
              <div className="grid-card-4" style={{ gap: "16px" }}>
                {WHY_POINTS.map((point) => (
                  <div
                    key={point.title}
                    style={{
                      display: "grid",
                      gap: "12px",
                      padding: "22px",
                      borderRadius: "18px",
                      border: "1px solid rgba(239,89,36,0.14)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <span
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "var(--gradient-brand-premium)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "14px",
                      }}
                    >
                      {point.icon}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "var(--color-text-primary)",
                        lineHeight: 1.3,
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
