import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Phone, CheckCircle, ArrowLeft } from "lucide-react";
import FaqAccordion from "@/components/shared/FaqAccordion";
import CourseFeeSelector from "@/components/academy/CourseFeeSelector";
import { ACADEMY_COURSES, BUSINESS_DATA } from "@/lib/constants";

type CourseSlug = (typeof ACADEMY_COURSES)[number]["slug"];

interface CourseDetail {
  tagline: string;
  heroBody: string;
  whoFor: string[];
  modules: { title: string; topics: string[] }[];
  outcomes: string[];
  proofStats: { label: string; value: string }[];
  portfolioProof: string[];
  tools: string[];
  hiringRoles: string[];
  salarySignals: string[];
  feeTiers: {
    name: string;
    price: string;
    feeNote: string;
    benefits: string[];
    featured?: boolean;
  }[];
  careerSupport: string[];
  businessImpact: string;
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
    proofStats: [
      { label: "Mock assessments", value: "20+" },
      { label: "Case scenarios", value: "120+" },
      { label: "Mentor checkpoints", value: "Weekly" },
      { label: "Placement support window", value: "180 days" },
    ],
    portfolioProof: [
      "Coded clinical case sheets with audit comments",
      "AAPC-style mock exam performance tracker",
      "Interview-ready documentation portfolio",
    ],
    tools: [
      "ICD-10-CM codebooks",
      "CPT and HCPCS references",
      "EHR-style documentation workflows",
      "Medical coding audit checklists",
    ],
    hiringRoles: [
      "Medical Coder",
      "Revenue Cycle Associate",
      "Quality Coding Analyst",
      "Claims Documentation Specialist",
    ],
    salarySignals: [
      "Entry roles: ₹3-5 LPA",
      "With CPC + experience: ₹6-10 LPA",
      "Remote healthcare process roles grow faster with specialty coding",
    ],
    feeTiers: [
      {
        name: "Foundation",
        price: "₹24,000",
        feeNote: "EMI available — ₹4,500/mo × 6",
        benefits: [
          "Core coding fundamentals",
          "Recorded revision library",
          "Basic assignment evaluations",
        ],
      },
      {
        name: "Professional",
        price: "₹35,000",
        feeNote: "EMI available — ₹6,000/mo × 6",
        benefits: [
          "Full curriculum + live projects",
          "Resume + LinkedIn optimisation",
          "Mock interviews + certification prep",
        ],
        featured: true,
      },
      {
        name: "Elite Placement",
        price: "₹49,000",
        feeNote: "EMI available — ₹8,500/mo × 6",
        benefits: [
          "Everything in Professional",
          "Priority mentor office hours",
          "Placement acceleration with hiring referrals",
        ],
      },
    ],
    careerSupport: [
      "ATS-ready resume building workshops",
      "LinkedIn profile positioning for recruiters",
      "Structured mock interviews and feedback loops",
      "Placement referral guidance with partner network",
    ],
    businessImpact:
      "Without this capability, healthcare outsourcing opportunities stay inaccessible and salary growth remains slower than market demand.",
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
    proofStats: [
      { label: "Live campaigns", value: "2-4" },
      { label: "Ad creatives shipped", value: "40+" },
      { label: "Reporting cadences", value: "Weekly" },
      { label: "Placement support window", value: "120 days" },
    ],
    portfolioProof: [
      "Campaign setup and optimisation snapshots",
      "Looker Studio reporting dashboard",
      "Channel strategy and budget allocation sheet",
    ],
    tools: [
      "Google Ads",
      "Meta Ads Manager",
      "GA4 and Search Console",
      "Looker Studio dashboards",
    ],
    hiringRoles: [
      "Performance Marketing Executive",
      "SEO Associate",
      "Social Media Strategist",
      "Paid Ads Analyst",
    ],
    salarySignals: [
      "Entry roles: ₹2.5-4.5 LPA",
      "Performance specialists can reach ₹5-8 LPA in 18-24 months",
      "Freelance retainers often begin after portfolio proof",
    ],
    feeTiers: [
      {
        name: "Starter",
        price: "₹14,000",
        feeNote: "EMI available — ₹5,000/mo × 3",
        benefits: [
          "Digital foundations + SEO basics",
          "Guided practical assignments",
          "Template-based campaign planning",
        ],
      },
      {
        name: "Growth Pro",
        price: "₹20,000",
        feeNote: "EMI available — ₹7,000/mo × 3",
        benefits: [
          "Full channel training (SEO + Ads + Social)",
          "Live campaign execution",
          "Resume + interview coaching",
        ],
        featured: true,
      },
      {
        name: "Performance Elite",
        price: "₹29,000",
        feeNote: "EMI available — ₹10,000/mo × 3",
        benefits: [
          "Everything in Growth Pro",
          "Advanced analytics + automation workflows",
          "Freelance/client acquisition mentorship",
        ],
      },
    ],
    careerSupport: [
      "Portfolio project reviews with mentors",
      "Client pitch deck and proposal training",
      "Interview simulation for agency roles",
      "Career pathway planning for jobs or freelancing",
    ],
    businessImpact:
      "Without digital capability, brands lose visibility, pay more for poor leads, and struggle to compete in performance-driven markets.",
  },
  "ai-ml-engineering": {
    tagline: "Build models. Deploy intelligence.",
    heroBody:
      "A practical AI and ML track focused on Python workflows, model building, deployment pipelines, and portfolio-ready use cases for modern teams.",
    whoFor: [
      "Engineering and science graduates",
      "Developers moving into AI product roles",
      "Data-curious professionals shifting into ML",
      "Students targeting high-growth technology roles",
    ],
    modules: [
      {
        title: "Python and Data Foundations",
        topics: [
          "Python for data workflows",
          "Pandas, NumPy, and data wrangling",
          "Statistical intuition for ML",
        ],
      },
      {
        title: "Machine Learning Core",
        topics: [
          "Supervised and unsupervised models",
          "Model validation and performance metrics",
          "Feature engineering strategies",
        ],
      },
      {
        title: "Deep Learning and LLM Basics",
        topics: [
          "Neural network fundamentals",
          "Computer vision and NLP intro",
          "Prompting and LLM application design",
        ],
      },
      {
        title: "Deployment and Portfolio",
        topics: [
          "Model serving with APIs",
          "MLOps overview and monitoring",
          "Capstone: end-to-end AI product",
        ],
      },
    ],
    outcomes: [
      "Build and deploy applied ML solutions",
      "Portfolio with 2 production-style projects",
      "Starting packages: ₹4-7 LPA depending on stack depth",
    ],
    proofStats: [
      { label: "Capstone projects", value: "2" },
      { label: "Model experiments", value: "25+" },
      { label: "Code review cycles", value: "Weekly" },
      { label: "Placement support window", value: "150 days" },
    ],
    portfolioProof: [
      "End-to-end ML pipeline project",
      "Inference API deployment walkthrough",
      "Evaluation and model comparison report",
    ],
    tools: ["Python", "scikit-learn", "TensorFlow/PyTorch", "FastAPI"],
    hiringRoles: [
      "ML Engineer - Junior",
      "AI Application Developer",
      "Data Science Analyst",
      "Prompt Engineer",
    ],
    salarySignals: [
      "Entry AI roles: ₹4-7 LPA",
      "Product + deployment skills can accelerate growth to ₹8-12 LPA",
      "AI portfolio quality heavily influences interview conversion",
    ],
    feeTiers: [
      {
        name: "Core",
        price: "₹32,000",
        feeNote: "EMI available - ₹8,500/mo x 4",
        benefits: [
          "Python + ML fundamentals",
          "Assignments and mentor reviews",
          "One mini project",
        ],
      },
      {
        name: "Applied Pro",
        price: "₹46,000",
        feeNote: "EMI available - ₹12,000/mo x 4",
        benefits: [
          "Full curriculum + guided capstone",
          "Interview prep and profile optimisation",
          "Deployment and API workflows",
        ],
        featured: true,
      },
      {
        name: "AI Career Elite",
        price: "₹59,000",
        feeNote: "EMI available - ₹15,500/mo x 4",
        benefits: [
          "Everything in Applied Pro",
          "Advanced portfolio coaching",
          "Priority placement support",
        ],
      },
    ],
    careerSupport: [
      "Github project review sessions",
      "Mock technical rounds for AI roles",
      "Portfolio storytelling for recruiters",
      "Referral support through partner network",
    ],
    businessImpact:
      "Without AI capability, teams automate slower, learn slower, and lose competitive velocity in data-driven markets.",
  },
  "ui-ux-design": {
    tagline: "Design experiences users trust.",
    heroBody:
      "A modern UI/UX program covering research, user flows, wireframing, design systems, and usability testing for product and service teams.",
    whoFor: [
      "Creative graduates entering product design",
      "Developers improving product thinking",
      "Freelancers offering UI/UX services",
      "Founders improving product conversion",
    ],
    modules: [
      {
        title: "UX Foundations",
        topics: [
          "User research basics",
          "Information architecture",
          "User journey mapping",
        ],
      },
      {
        title: "Wireframing and Interaction",
        topics: [
          "Low and high fidelity wireframes",
          "Interaction and layout patterns",
          "Accessibility-first principles",
        ],
      },
      {
        title: "Visual Systems",
        topics: [
          "Typography and color systems",
          "Component libraries in Figma",
          "Responsive interface design",
        ],
      },
      {
        title: "Testing and Portfolio",
        topics: [
          "Usability testing workflows",
          "Iteration from user feedback",
          "Case-study portfolio building",
        ],
      },
    ],
    outcomes: [
      "Portfolio with product-grade case studies",
      "Strong UI system and prototyping confidence",
      "Starting packages: ₹3-6 LPA across design roles",
    ],
    proofStats: [
      { label: "Case studies", value: "2-3" },
      { label: "User tests", value: "10+" },
      { label: "Design critiques", value: "Weekly" },
      { label: "Placement support window", value: "120 days" },
    ],
    portfolioProof: [
      "Research-backed design case studies",
      "Component system in Figma",
      "Usability findings and iteration log",
    ],
    tools: ["Figma", "FigJam", "Miro", "Notion"],
    hiringRoles: [
      "UI Designer",
      "UX Designer",
      "Product Design Associate",
      "Design System Intern",
    ],
    salarySignals: [
      "Entry UI/UX roles: ₹3-6 LPA",
      "Case-study quality drives compensation and hiring speed",
      "Cross-skill designers (UX + motion) command premium roles",
    ],
    feeTiers: [
      {
        name: "Foundation",
        price: "₹22,000",
        feeNote: "EMI available - ₹7,500/mo x 3",
        benefits: [
          "UX and interface fundamentals",
          "Design exercises and reviews",
          "One guided case study",
        ],
      },
      {
        name: "Studio Pro",
        price: "₹31,000",
        feeNote: "EMI available - ₹10,500/mo x 3",
        benefits: [
          "Full UI/UX curriculum",
          "2 end-to-end case studies",
          "Interview and portfolio coaching",
        ],
        featured: true,
      },
      {
        name: "Product Elite",
        price: "₹42,000",
        feeNote: "EMI available - ₹14,500/mo x 3",
        benefits: [
          "Everything in Studio Pro",
          "Mentor-led portfolio overhaul",
          "Priority placement support",
        ],
      },
    ],
    careerSupport: [
      "Case study storytelling workshops",
      "Portfolio and Dribbble profile feedback",
      "Mock design challenge rounds",
      "Interview prep with product scenarios",
    ],
    businessImpact:
      "Without UX maturity, products bleed conversion, increase churn, and force higher acquisition spend.",
  },
  "cloud-devops": {
    tagline: "Ship reliably. Scale confidently.",
    heroBody:
      "An operations-first track for cloud infrastructure, CI/CD, containerization, and deployment automation used by modern engineering teams.",
    whoFor: [
      "CS and IT graduates",
      "Developers transitioning to DevOps",
      "Support engineers moving to cloud roles",
      "Professionals preparing for platform engineering paths",
    ],
    modules: [
      {
        title: "Cloud Basics",
        topics: [
          "Compute, storage, networking fundamentals",
          "IAM and security principles",
          "Cloud architecture patterns",
        ],
      },
      {
        title: "DevOps Foundations",
        topics: [
          "Linux and shell workflows",
          "Version control and branching strategies",
          "CI/CD pipelines",
        ],
      },
      {
        title: "Containers and Orchestration",
        topics: [
          "Docker image lifecycle",
          "Kubernetes basics",
          "Environment configuration management",
        ],
      },
      {
        title: "Monitoring and Reliability",
        topics: [
          "Observability and logs",
          "Deployment rollback patterns",
          "Capstone: automated cloud deployment",
        ],
      },
    ],
    outcomes: [
      "Ability to automate deployment and release workflows",
      "Cloud project portfolio with CI/CD and containerized stacks",
      "Starting packages: ₹4-7 LPA for junior cloud/devops roles",
    ],
    proofStats: [
      { label: "Deployment labs", value: "30+" },
      { label: "CI/CD pipelines", value: "6+" },
      { label: "Infra reviews", value: "Weekly" },
      { label: "Placement support window", value: "150 days" },
    ],
    portfolioProof: [
      "Containerized service deployment project",
      "CI/CD pipeline with rollback strategy",
      "Cloud architecture and monitoring playbook",
    ],
    tools: ["AWS", "Docker", "Kubernetes", "GitHub Actions"],
    hiringRoles: [
      "Cloud Support Engineer",
      "DevOps Associate",
      "Site Reliability Associate",
      "Platform Operations Analyst",
    ],
    salarySignals: [
      "Entry cloud/devops roles: ₹4-7 LPA",
      "Automation depth can move compensation to ₹8-12 LPA",
      "Production reliability skills are highly valued in hiring loops",
    ],
    feeTiers: [
      {
        name: "Starter",
        price: "₹30,000",
        feeNote: "EMI available - ₹8,000/mo x 4",
        benefits: [
          "Cloud and DevOps fundamentals",
          "Lab environments and assignments",
          "One deployment project",
        ],
      },
      {
        name: "Scale Pro",
        price: "₹44,000",
        feeNote: "EMI available - ₹11,500/mo x 4",
        benefits: [
          "Full cloud + CI/CD + container stack",
          "2 capstone deployments",
          "Interview and resume support",
        ],
        featured: true,
      },
      {
        name: "Reliability Elite",
        price: "₹56,000",
        feeNote: "EMI available - ₹14,500/mo x 4",
        benefits: [
          "Everything in Scale Pro",
          "Advanced reliability playbooks",
          "Priority placement support",
        ],
      },
    ],
    careerSupport: [
      "Real-world deployment simulation rounds",
      "Debugging and incident interview preparation",
      "Cloud resume keyword optimisation",
      "Job referral readiness checks",
    ],
    businessImpact:
      "Without cloud and delivery automation, teams ship slower, recover slower, and spend more on operational friction.",
  },
  cybersecurity: {
    tagline: "Defend systems before threats scale.",
    heroBody:
      "A practical cybersecurity track built around network security, SOC workflows, vulnerability management, and incident response readiness.",
    whoFor: [
      "IT graduates and system admins",
      "Network professionals moving to security",
      "Beginners targeting SOC analyst roles",
      "Professionals preparing for security certifications",
    ],
    modules: [
      {
        title: "Security Foundations",
        topics: [
          "Threat landscape and attack lifecycle",
          "Network and endpoint security basics",
          "Security policies and compliance overview",
        ],
      },
      {
        title: "SOC Operations",
        topics: [
          "Log analysis and SIEM workflows",
          "Alert triage and escalation",
          "Threat hunting basics",
        ],
      },
      {
        title: "Vulnerability and Defense",
        topics: [
          "Vulnerability assessment cycles",
          "Hardening and patch management",
          "Blue-team defensive playbooks",
        ],
      },
      {
        title: "Incident Readiness",
        topics: [
          "Incident response process",
          "Forensics fundamentals",
          "Capstone: security response simulation",
        ],
      },
    ],
    outcomes: [
      "SOC-ready operational skillset",
      "Portfolio with security lab reports and response plans",
      "Starting packages: ₹3.5-6.5 LPA for security entry roles",
    ],
    proofStats: [
      { label: "Security labs", value: "35+" },
      { label: "Incident drills", value: "12+" },
      { label: "SOC simulations", value: "Weekly" },
      { label: "Placement support window", value: "150 days" },
    ],
    portfolioProof: [
      "Threat analysis and incident report samples",
      "Vulnerability assessment documentation",
      "Defensive hardening checklist portfolio",
    ],
    tools: ["Wireshark", "SIEM basics", "Nmap", "Burp Suite"],
    hiringRoles: [
      "SOC Analyst - L1",
      "Security Operations Associate",
      "Vulnerability Assessment Associate",
      "Incident Response Trainee",
    ],
    salarySignals: [
      "Entry cybersecurity roles: ₹3.5-6.5 LPA",
      "Analysts with incident handling depth can reach ₹7-11 LPA",
      "Security certifications and labs improve shortlist rates",
    ],
    feeTiers: [
      {
        name: "Core Defense",
        price: "₹28,000",
        feeNote: "EMI available - ₹7,500/mo x 4",
        benefits: [
          "Cybersecurity fundamentals",
          "Guided security labs",
          "One incident-response assignment",
        ],
      },
      {
        name: "SOC Pro",
        price: "₹39,000",
        feeNote: "EMI available - ₹10,500/mo x 4",
        benefits: [
          "Full SOC and vulnerability curriculum",
          "Live simulation exercises",
          "Interview prep and resume support",
        ],
        featured: true,
      },
      {
        name: "Security Elite",
        price: "₹52,000",
        feeNote: "EMI available - ₹14,000/mo x 4",
        benefits: [
          "Everything in SOC Pro",
          "Advanced threat hunting mentorship",
          "Priority placement support",
        ],
      },
    ],
    careerSupport: [
      "Security interview scenario practice",
      "SOC analyst profile optimisation",
      "Lab portfolio review sessions",
      "Referral readiness and hiring guidance",
    ],
    businessImpact:
      "Without cyber readiness, organizations risk outages, data exposure, and trust damage that is expensive to recover.",
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
  const featuredTier =
    detail.feeTiers.find((tier) => tier.featured) ?? detail.feeTiers[0];
  const courseFaq = [
    {
      question: "Do I need prior experience to join this program?",
      answer:
        "No. The curriculum starts from fundamentals and progressively builds toward advanced execution.",
    },
    {
      question: "Are classes available online and offline?",
      answer:
        "Yes. Programs are delivered in blended mode with practical assignments and mentor guidance.",
    },
    {
      question: "Will I get resume and interview support?",
      answer:
        "Yes. Career support includes resume optimisation, interview simulation, and placement guidance.",
    },
    {
      question: "Can I pay through EMI options?",
      answer:
        "Yes. Flexible EMI plans are available based on the selected tier and current batch policies.",
    },
  ] as const;

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
    learningResourceType: "Blended training program",
    keywords: [...detail.hiringRoles, ...detail.tools].join(", "),
    teaches: detail.modules.flatMap((module) => module.topics),
    occupationalCategory: detail.hiringRoles,
    courseMode: ["onsite", "online"],
    timeRequired: course.duration,
    offers: {
      "@type": "Offer",
      price: featuredTier.price.replace(/[^\d]/g, ""),
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: courseFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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

          <CourseFeeSelector tiers={detail.feeTiers} />

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
                background: "var(--gradient-brand-premium)",
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
              className="grid-card-4"
              style={{
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

          <div
            style={{
              marginTop: "28px",
              padding: "20px",
              borderRadius: "14px",
              border: "1px solid var(--color-border)",
              background: "var(--color-dark-elevated)",
              maxWidth: "700px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-brand-orange)",
                marginBottom: "10px",
              }}
            >
              Career Support
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: "8px",
              }}
            >
              {detail.careerSupport.map((item) => (
                <li
                  key={item}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="academy-detail-faq-heading"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px 40px",
          }}
        >
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              background: "var(--color-dark-elevated)",
              padding: "24px",
              marginBottom: "24px",
              display: "grid",
              gap: "16px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(22px, 3vw, 30px)",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
              }}
            >
              Outcome proof you can show recruiters
            </h2>
            <div className="grid-card-4" style={{ gap: "12px" }}>
              {detail.proofStats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                    background: "var(--color-dark-surface)",
                    padding: "14px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(20px, 3vw, 28px)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                borderRadius: "12px",
                border: "1px solid rgba(239,89,36,0.35)",
                background: "rgba(239,89,36,0.08)",
                padding: "14px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-orange)",
                  marginBottom: "8px",
                }}
              >
                Portfolio Proof Stack
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: "6px",
                }}
              >
                {detail.portfolioProof.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              background: "var(--color-dark-elevated)",
              padding: "24px",
              marginBottom: "24px",
              display: "grid",
              gap: "16px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(22px, 3vw, 30px)",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
              }}
            >
              Tools and roles you build toward
            </h2>
            <div className="grid-card-2" style={{ gap: "14px" }}>
              <div
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  background: "var(--color-dark-surface)",
                  padding: "14px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-brand-orange)",
                    marginBottom: "8px",
                  }}
                >
                  Tools You Practice
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gap: "6px",
                  }}
                >
                  {detail.tools.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  background: "var(--color-dark-surface)",
                  padding: "14px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-brand-orange)",
                    marginBottom: "8px",
                  }}
                >
                  Hiring Roles
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gap: "6px",
                  }}
                >
                  {detail.hiringRoles.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              style={{
                borderRadius: "12px",
                border: "1px solid rgba(239,89,36,0.35)",
                background: "rgba(239,89,36,0.08)",
                padding: "14px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-red)",
                  marginBottom: "8px",
                }}
              >
                Salary Signals
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: "6px",
                }}
              >
                {detail.salarySignals.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              background: "var(--color-dark-surface)",
              padding: "24px",
            }}
          >
            <h2
              id="academy-detail-faq-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(22px, 3vw, 30px)",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                marginBottom: "18px",
              }}
            >
              Program FAQ
            </h2>
            <FaqAccordion items={courseFaq} defaultOpenIndex={0} />
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          style={{
            background:
              "linear-gradient(135deg, rgba(249,160,27,0.12) 0%, rgba(239,89,36,0.08) 50%, rgba(211,32,39,0.08) 100%)",
            padding: "72px 24px",
            textAlign: "center",
          }}
        >
          <div
            className="section-shell"
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "18px",
              background: "rgba(10,10,10,0.35)",
              padding: "clamp(24px, 4vw, 40px)",
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
                fontSize: "clamp(13px, 2.8vw, 15px)",
                color: "var(--color-text-muted)",
                marginBottom: "12px",
              }}
            >
              Batches fill fast. Reach out on WhatsApp or call us directly.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--color-text-secondary)",
                marginBottom: "28px",
                maxWidth: "760px",
                marginInline: "auto",
              }}
            >
              {detail.businessImpact}
            </p>
            <div className="cta-row-mobile">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "16px 32px",
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
          </div>
        </section>
      </div>
    </>
  );
}
