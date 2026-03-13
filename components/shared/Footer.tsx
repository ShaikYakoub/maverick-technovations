import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { BUSINESS_DATA, SERVICES, ACADEMY_COURSES } from "@/lib/constants";

const SERVICE_COLS = [
  "Digital Marketing",
  "SEO",
  "Social Media Marketing",
  "Google & YouTube Ads",
  "Website Design",
  "E-Commerce Solutions",
];

const SECONDARY_COLS = [
  "Google My Business",
  "Email Marketing",
  "Graphic Designing",
  "WhatsApp Marketing",
  "Influencer Marketing",
  "Professional Video",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        background: "var(--color-dark-surface)",
        borderTop: "1px solid var(--color-border)",
        padding: "80px 24px 40px",
      }}
    >
      <div className="section-shell">
        {/* ── Top CTA Bar ───────────────────────────────────────── */}
        <div
          style={{
            padding: "48px",
            borderRadius: "16px",
            border: "1px solid var(--color-border)",
            background: "var(--color-dark-elevated)",
            marginBottom: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(239,89,36,0.16) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-brand-orange)",
                marginBottom: "8px",
              }}
            >
              Ready to Dominate?
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
                maxWidth: "480px",
              }}
            >
              Let&apos;s build something that
              <br />
              <span style={{ color: "var(--color-brand-orange)" }}>
                prints revenue.
              </span>
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              position: "relative",
            }}
          >
            <a
              href={`tel:+91${BUSINESS_DATA.phone}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                background: "var(--color-brand-orange)",
                color: "#000",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "14px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: "8px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <Phone size={16} strokeWidth={1.5} />
              Call Now: +91 {BUSINESS_DATA.phone}
            </a>
            <a
              href={`mailto:${BUSINESS_DATA.email}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                background: "transparent",
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.04em",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                justifyContent: "center",
              }}
            >
              <Mail size={15} strokeWidth={1.5} />
              {BUSINESS_DATA.email}
            </a>
          </div>
        </div>

        {/* ── Main Footer Grid ────────────────────────────────────── */}
        <div
          className="grid-balance-4"
          style={{
            gap: "48px",
            marginBottom: "64px",
          }}
        >
          {/* Brand Column */}
          <div style={{ gridColumn: "span 1" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--color-brand-orange)",
                  boxShadow:
                    "0 0 0 3px rgba(239,89,36,0.25), 0 0 12px rgba(239,89,36,0.6)",
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "16px",
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-primary)",
                }}
              >
                Mavericks
                <br />
                <span style={{ color: "var(--color-brand-orange)" }}>
                  Technovations
                </span>
              </span>
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                marginBottom: "20px",
                maxWidth: "240px",
              }}
            >
              South India&apos;s most aggressive digital growth engine and tech
              academy, based in Kadapa, Andhra Pradesh.
            </p>

            <address
              style={{ fontStyle: "normal" }}
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginBottom: "10px",
                }}
              >
                <MapPin
                  size={14}
                  strokeWidth={1.5}
                  style={{
                    color: "var(--color-brand-orange)",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                  }}
                  itemProp="streetAddress"
                >
                  {BUSINESS_DATA.address.street},{" "}
                  <span itemProp="addressLocality">
                    {BUSINESS_DATA.address.city}
                  </span>
                  ,{" "}
                  <span itemProp="addressRegion">
                    {BUSINESS_DATA.address.state}
                  </span>
                </span>
              </div>
            </address>

            {/* Social links */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              {(
                [
                  {
                    href: BUSINESS_DATA.socialLinks.instagram,
                    label: "Instagram",
                    color: "#ef5924",
                    icon: FaInstagram,
                  },
                  {
                    href: BUSINESS_DATA.socialLinks.facebook,
                    label: "Facebook",
                    color: "#ef5924",
                    icon: FaFacebookF,
                  },
                  {
                    href: `https://wa.me/91${BUSINESS_DATA.phone}`,
                    label: "WhatsApp",
                    color: "#ef5924",
                    icon: FaWhatsapp,
                  },
                  {
                    href: BUSINESS_DATA.socialLinks.linkedin,
                    label: "LinkedIn",
                    color: "#ef5924",
                    icon: FaLinkedinIn,
                  },
                ] as const
              ).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-text-muted)",
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      s.color;
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      s.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "var(--color-border)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--color-text-muted)";
                  }}
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column 1 */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: "20px",
              }}
            >
              Services
            </h3>
            <nav aria-label="Services navigation">
              <ul
                role="list"
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {SERVICE_COLS.map((s) => {
                  const service = SERVICES.find(
                    (sv) => sv.shortTitle === s || sv.title === s,
                  );
                  return (
                    <li key={s}>
                      <Link
                        href={
                          service ? `/services/${service.slug}` : "/services"
                        }
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          color: "var(--color-text-secondary)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          ((e.target as HTMLAnchorElement).style.color =
                            "var(--color-brand-orange)")
                        }
                        onMouseLeave={(e) =>
                          ((e.target as HTMLAnchorElement).style.color =
                            "var(--color-text-secondary)")
                        }
                      >
                        {s}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Services Column 2 */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: "20px",
              }}
            >
              More Services
            </h3>
            <nav aria-label="More services navigation">
              <ul
                role="list"
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {SECONDARY_COLS.map((s) => (
                  <li key={s}>
                    <Link
                      href="/services"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        color: "var(--color-text-secondary)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLAnchorElement).style.color =
                          "var(--color-brand-orange)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLAnchorElement).style.color =
                          "var(--color-text-secondary)")
                      }
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Academy Column */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: "20px",
              }}
            >
              Academy
            </h3>
            <nav aria-label="Academy navigation">
              <ul
                role="list"
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <li>
                  <Link
                    href="/academy"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLAnchorElement).style.color =
                        "var(--color-brand-orange)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLAnchorElement).style.color =
                        "var(--color-text-secondary)")
                    }
                  >
                    Overview
                  </Link>
                </li>
                {ACADEMY_COURSES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/academy/${c.slug}`}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        color: "var(--color-text-secondary)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLAnchorElement).style.color =
                          "var(--color-brand-orange)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLAnchorElement).style.color =
                          "var(--color-text-secondary)")
                      }
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/about"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLAnchorElement).style.color =
                        "var(--color-brand-orange)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLAnchorElement).style.color =
                        "var(--color-text-secondary)")
                    }
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "var(--color-text-muted)",
            }}
          >
            &copy; {year} Mavericks Technovations. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: "20px" }}>
            {(
              [
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ] as const
            ).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color =
                    "var(--color-text-secondary)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color =
                    "var(--color-text-muted)")
                }
              >
                {l.label}
              </Link>
            ))}
          </div>

          <a
            href={`https://maps.google.com/?q=${BUSINESS_DATA.address.street},${BUSINESS_DATA.address.city},${BUSINESS_DATA.address.state}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "var(--color-text-muted)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--color-brand-orange)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--color-text-muted)";
            }}
          >
            <MapPin size={12} strokeWidth={1.5} />
            Kadapa, Andhra Pradesh
            <ArrowUpRight size={12} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
