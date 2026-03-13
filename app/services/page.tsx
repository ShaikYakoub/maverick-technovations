import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  TrendingUp,
  Search,
  Share2,
  Zap,
  Monitor,
  ShoppingCart,
  MapPin,
  Mail,
  Pen,
  MessageCircle,
  Users,
  Video,
} from "lucide-react";
import { SERVICES, BUSINESS_DATA } from "@/lib/constants";
import { MEDIA_ASSETS } from "@/lib/mediaManifest";

export const metadata: Metadata = {
  title: "Digital Marketing Services",
  description:
    "SEO, Google Ads, Social Media, WhatsApp Marketing, Website Design, E-Commerce — every growth lever managed by certified experts in South India.",
  alternates: {
    canonical: `${BUSINESS_DATA.url}/services`,
  },
  openGraph: {
    title: "Digital Marketing Services | Mavericks Technovations",
    description:
      "12 specialised digital marketing services. Rank #1, drive qualified leads, and convert at scale — Kadapa, Andhra Pradesh.",
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

const ICON_MAP: Record<
  string,
  React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    style?: React.CSSProperties;
  }>
> = {
  TrendingUp,
  Search,
  Share2,
  Zap,
  Monitor,
  ShoppingCart,
  MapPin,
  Mail,
  Pen,
  MessageCircle,
  Users,
  Video,
};

export default function ServicesPage() {
  return (
    <>
      {/* JSON-LD for services list */}
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
              lineHeight: 1.0,
              color: "var(--color-text-primary)",
              maxWidth: "700px",
              marginBottom: "24px",
            }}
          >
            Every lever that
            <br />
            <span style={{ color: "var(--color-brand-orange)" }}>
              drives growth.
            </span>
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

        {/* Services Grid */}
        <section
          aria-label="Services list"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "64px 24px 120px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {SERVICES.map((service) => {
              const Icon = ICON_MAP[service.icon] ?? TrendingUp;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    padding: "32px",
                    borderRadius: "16px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-dark-elevated)",
                    textDecoration: "none",
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(255,85,0,0.45)";
                    (e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "var(--color-border)";
                    (e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,85,0,0.25)",
                      background: "rgba(255,85,0,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      style={{ color: "var(--color-brand-orange)" }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "17px",
                        letterSpacing: "-0.02em",
                        color: "var(--color-text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      {service.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        lineHeight: 1.65,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {service.description}
                    </p>
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
                      color: "var(--color-brand-orange)",
                    }}
                  >
                    Learn more
                    <ArrowUpRight size={13} strokeWidth={1.5} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
