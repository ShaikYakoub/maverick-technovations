import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Phone, CheckCircle, ArrowLeft } from "lucide-react";
import { ACADEMY_COURSES, BUSINESS_DATA } from "@/lib/constants";

type CourseSlug = (typeof ACADEMY_COURSES)[number]["slug"];

interface CourseDetail {
  tagline: string;
  heroBody: string;
  whoFor: string[];
  modules: { title: string; topics: string[] }[];
  outcomes: string[];
  fee: string;
  feeNote: string;
}

const COURSE_DETAILS: Record<CourseSlug, CourseDetail> = {
  "medical-coding": {
    tagline: "Code smarter. Earn globally.",
    heroBody:
      "Our AAPC-aligned Medical Coding program trains you on real-world clinical documentation, ICD-10-CM, CPT, and HCPCS coding systems used by US hospitals and telehealth providers.",
    whoFor: [
      "Science graduates (B.Sc., B.Pharm, BDS, MBBS)",
      "Healthcare workers seeking remote income",
      "Stay-at-home professionals re-entering the workforce",
      "Anyone targeting the US healthcare outsourcing sector",
    ],
    modules: [
      {
        title: "Foundation",
        topics: [
          "Human Anatomy & Medical Terminology",
          "Health Insurance & Revenue Cycle Basics",
          "Introduction to ICD-10-CM",
        ],
      },
      {
        title: "Core Coding",
        topics: [
          "CPT Procedural Coding (Surgery, Radiology, Lab)",
          "HCPCS Level II",
          "E/M Services & Inpatient Coding",
        ],
      },
      {
        title: "Specialties",
        topics: [
          "Cardiology & Orthopaedics",
          "Oncology & Emergency Medicine",
          "Outpatient vs Inpatient workflows",
        ],
      },
      {
        title: "Exam Prep & Placement",
        topics: [
          "Mock CPC exams (1 800-question bank)",
          "Resume & LinkedIn optimisation",
          "Interview prep + direct referrals",
        ],
      },
    ],
    outcomes: [
      "CPC certification readiness (AAPC)",
      "Ability to work with US-based healthcare providers remotely",
      "Starting packages: ₹3–5 LPA freshers, ₹6–10 LPA with 1 year experience",
    ],
    fee: "₹35,000",
    feeNote: "EMI available — ₹6,000/mo × 6",
  },
  "digital-marketing-training": {
    tagline: "Run ads. Rank on Google. Build brands.",
    heroBody:
      "A practical, agency-backed program that covers every pillar of modern digital marketing — from SEO and paid ads to content strategy and analytics — using live client accounts.",
    whoFor: [
      "Fresh graduates seeking a high-demand marketing career",
      "Business owners wanting to manage their own growth",
      "Marketing professionals upskilling in digital",
      "Freelancers building a service portfolio",
    ],
    modules: [
      {
        title: "Digital Foundations",
        topics: [
          "Digital marketing ecosystem overview",
          "Buyer personas & customer journey",
          "Domain, hosting, WordPress website setup",
        ],
      },
      {
        title: "Search Marketing",
        topics: [
          "On-page & off-page SEO",
          "Google Search Console & Analytics 4",
          "Google Ads Search, Display & Performance Max",
        ],
      },
      {
        title: "Social & Content",
        topics: [
          "Meta Ads (Facebook + Instagram)",
          "Content calendar creation & copywriting",
          "Short-form video strategy & Reels",
        ],
      },
      {
        title: "Data & Strategy",
        topics: [
          "GA4 goals, funnels & attribution",
          "Reporting dashboards (Looker Studio)",
          "Complete campaign strategy capstone project",
        ],
      },
    ],
    outcomes: [
      "Meta Blueprint & Google Ads certifications",
      "Portfolio of 2 live campaigns to show employers",
      "Starting packages: ₹2.5–4.5 LPA freshers",
    ],
    fee: "₹20,000",
    feeNote: "EMI available — ₹7,000/mo × 3",
  },
};

export function generateStaticParams() {
  return ACADEMY_COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = ACADEMY_COURSES.find((c) => c.slug === slug);
  if (!course) return {};

  return {
    title: `${course.title} Course in Kadapa | Mavericks Academy`,
    description: course.description,
    alternates: { canonical: `${BUSINESS_DATA.url}/academy/${slug}` },
    openGraph: {
      title: `${course.title} | Mavericks Academy`,
      description: course.description,
      url: `${BUSINESS_DATA.url}/academy/${slug}`,
      images: [
        {
          url: `/og?title=${encodeURIComponent(course.title)}&type=academy`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function AcademyCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = ACADEMY_COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  const detail = COURSE_DETAILS[course.slug as CourseSlug];

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: "Mavericks Technovations Academy",
      sameAs: BUSINESS_DATA.url,
    },
    educationalCredentialAwarded: course.credential,
    courseMode: ["onsite", "online"],
    timeRequired: course.duration,
    offers: {
      "@type": "Offer",
      price: detail.fee.replace(/[^\d]/g, ""),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "blended",
      location: {
        "@type": "Place",
        name: "Mavericks Academy",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kadapa",
          addressRegion: "Andhra Pradesh",
          addressCountry: "IN",
        },
      },
    },
  };

  const whatsappLink = `https://wa.me/91${BUSINESS_DATA.phone}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${course.title} program at Mavericks Academy.`,
  )}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
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
            href="/academy"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "var(--color-text-muted)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            All Programs
          </Link>
        </div>

        {/* Hero */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "36px 24px 72px",
            borderBottom: "1px solid var(--color-border)",
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
              marginBottom: "14px",
            }}
          >
            {course.duration} · {course.format}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(38px, 6.5vw, 72px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "var(--color-text-primary)",
              marginBottom: "16px",
            }}
          >
            {course.title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(18px, 2.5vw, 26px)",
              letterSpacing: "-0.02em",
              color: "var(--color-brand-red)",
              marginBottom: "20px",
            }}
          >
            {detail.tagline}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "var(--color-text-secondary)",
              maxWidth: "600px",
              marginBottom: "40px",
            }}
          >
            {detail.heroBody}
          </p>

          {/* Fee callout */}
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              gap: "4px",
              padding: "20px 28px",
              borderRadius: "14px",
              border: "1px solid rgba(232,0,45,0.3)",
              background: "rgba(232,0,45,0.06)",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-brand-red)",
              }}
            >
              Program Fee
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "28px",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
              }}
            >
              {detail.fee}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "var(--color-text-muted)",
              }}
            >
              {detail.feeNote}
            </span>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 24px",
                background: "#25D366",
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "12px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              WhatsApp Enquiry
            </a>
            <a
              href={`tel:+91${BUSINESS_DATA.phone}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 24px",
                border: "1px solid var(--color-border-bright)",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              <Phone size={14} strokeWidth={2} />
              Call Us
            </a>
          </div>
        </section>

        {/* Who it&apos;s for */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "64px 24px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(22px, 3vw, 30px)",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              marginBottom: "28px",
            }}
          >
            Who is this for?
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              maxWidth: "600px",
            }}
          >
            {detail.whoFor.map((item) => (
              <li
                key={item}
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
                  size={15}
                  strokeWidth={1.5}
                  style={{
                    color: "var(--color-brand-red)",
                    marginTop: "3px",
                    flexShrink: 0,
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Curriculum */}
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
                fontSize: "clamp(22px, 3vw, 30px)",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                marginBottom: "40px",
              }}
            >
              Curriculum
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "20px",
              }}
            >
              {detail.modules.map((mod, i) => (
                <div
                  key={mod.title}
                  style={{
                    padding: "28px",
                    borderRadius: "14px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-dark-elevated)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--color-brand-red)",
                      marginBottom: "8px",
                    }}
                  >
                    Module {i + 1}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "16px",
                      letterSpacing: "-0.02em",
                      color: "var(--color-text-primary)",
                      marginBottom: "14px",
                    }}
                  >
                    {mod.title}
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {mod.topics.map((t) => (
                      <li
                        key={t}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          lineHeight: 1.5,
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        <span
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: "var(--color-brand-red)",
                            marginTop: "7px",
                            flexShrink: 0,
                          }}
                        />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "72px 24px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(22px, 3vw, 30px)",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              marginBottom: "28px",
            }}
          >
            Career Outcomes
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              maxWidth: "640px",
            }}
          >
            {detail.outcomes.map((o) => (
              <li
                key={o}
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
                  size={15}
                  strokeWidth={1.5}
                  style={{
                    color: "var(--color-brand-red)",
                    marginTop: "3px",
                    flexShrink: 0,
                  }}
                />
                {o}
              </li>
            ))}
          </ul>
        </section>

        {/* Bottom CTA */}
        <section
          style={{
            background:
              "linear-gradient(135deg, rgba(232,0,45,0.08) 0%, rgba(255,85,0,0.04) 100%)",
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
            Ready to enrol?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "var(--color-text-muted)",
              marginBottom: "32px",
            }}
          >
            Batches fill fast. Reach out on WhatsApp or call us directly.
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
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 32px",
                background: "#25D366",
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
              WhatsApp Us
            </a>
            <a
              href={`tel:+91${BUSINESS_DATA.phone}`}
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
              <Phone size={15} strokeWidth={2} />
              +91 {BUSINESS_DATA.phone}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
