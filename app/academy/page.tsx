import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, Clock, Wifi, Award } from "lucide-react";
import { ACADEMY_COURSES, BUSINESS_DATA } from "@/lib/constants";
import { MEDIA_ASSETS } from "@/lib/mediaManifest";

export const metadata: Metadata = {
  title: "Tech Academy — Medical Coding & Digital Marketing Courses",
  description:
    "Certified Medical Coding and Digital Marketing training in Kadapa. Hands-on curriculum, live projects, and guaranteed placement support.",
  alternates: {
    canonical: `${BUSINESS_DATA.url}/academy`,
  },
  openGraph: {
    title: "Mavericks Technovations Academy | Kadapa",
    description:
      "Certified tech training programs with placement support — Medical Coding and Digital Marketing.",
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

const ACADEMY_FAQ = [
  {
    question: "Do you offer placement support after training?",
    answer:
      "Yes. We provide resume prep, mock interviews, portfolio support, and referrals through our hiring partner network.",
  },
  {
    question: "Can working professionals join these courses?",
    answer:
      "Yes. Both courses support flexible batches with offline and live online options.",
  },
  {
    question: "Are these beginner-friendly programs?",
    answer:
      "Yes. We start with fundamentals and progressively move to live tools, practical projects, and certification readiness.",
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
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
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
            <span style={{ color: "var(--color-brand-red)" }}>
              Place like one.
            </span>
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
            Certified programs in Medical Coding and Digital Marketing. Hands-on
            curriculum, live projects, and a placement network built on 4 years
            of agency experience.
          </p>
          <a
            href={`tel:+91${BUSINESS_DATA.phone}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              background: "var(--color-brand-red)",
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

        {/* Course cards */}
        <section
          aria-labelledby="courses-heading"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "20px",
            }}
          >
            {ACADEMY_COURSES.map((course) => (
              <Link
                key={course.slug}
                href={`/academy/${course.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  padding: "36px",
                  borderRadius: "18px",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-dark-elevated)",
                  textDecoration: "none",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(232,0,45,0.4)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--color-border)")
                }
              >
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--color-brand-red)",
                      marginBottom: "10px",
                    }}
                  >
                    Certified Program
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "22px",
                      letterSpacing: "-0.02em",
                      color: "var(--color-text-primary)",
                      marginBottom: "12px",
                    }}
                  >
                    {course.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      lineHeight: 1.65,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {course.description}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <Clock
                      size={13}
                      strokeWidth={1.5}
                      style={{ color: "var(--color-brand-red)" }}
                    />
                    {course.duration}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <Wifi
                      size={13}
                      strokeWidth={1.5}
                      style={{ color: "var(--color-brand-red)" }}
                    />
                    {course.format}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    <Award
                      size={13}
                      strokeWidth={1.5}
                      style={{ color: "var(--color-brand-red)" }}
                    />
                    {course.credential}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--color-brand-red)",
                    marginTop: "auto",
                  }}
                >
                  View Program
                  <ArrowRight size={13} strokeWidth={1.5} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why choose us */}
        <section
          style={{
            background: "var(--color-dark-surface)",
            padding: "80px 24px 56px",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "24px",
              }}
            >
              {WHY_POINTS.map((p) => (
                <div
                  key={p.title}
                  style={{
                    padding: "28px",
                    borderRadius: "14px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-dark-elevated)",
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
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
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
            <div style={{ display: "grid", gap: "18px" }}>
              {ACADEMY_FAQ.map((item) => (
                <article key={item.question}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "var(--color-text-primary)",
                      marginBottom: "8px",
                    }}
                  >
                    {item.question}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
