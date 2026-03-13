import type { Metadata } from "next";
import { BUSINESS_DATA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Dominate the Algorithm",
  description:
    "South India's most aggressive digital growth engine. Digital Marketing Agency & Tech Academy based in Kadapa, Andhra Pradesh.",
  alternates: {
    canonical: BUSINESS_DATA.url,
  },
};

export default function HomePage() {
  return (
    <main>
      {/* ── Hero Section (placeholder — HeroThreeCanvas injected in Phase 2) ── */}
      <section
        aria-label="Hero"
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          background: "var(--color-dark-base)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow behind heading */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,85,0,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ textAlign: "center", maxWidth: "900px", zIndex: 1 }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(11px, 1.2vw, 13px)",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--color-brand-orange)",
              marginBottom: "24px",
            }}
          >
            Kadapa&nbsp;·&nbsp;Andhra Pradesh&nbsp;·&nbsp;South India
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px, 9vw, 128px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              margin: "0 0 32px",
            }}
          >
            Dominate
            <br />
            <span style={{ color: "var(--color-brand-orange)" }}>
              the Algorithm.
            </span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.8vw, 20px)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              maxWidth: "600px",
              margin: "0 auto 48px",
            }}
          >
            South India&apos;s most aggressive digital growth engine. We build
            brands that rank #1, generate qualified leads, and convert at scale.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 36px",
                background: "var(--color-brand-orange)",
                color: "#000",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                borderRadius: "4px",
                cursor: "none",
              }}
            >
              Explore Services
            </a>
            <a
              href="/academy"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 36px",
                background: "transparent",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                borderRadius: "4px",
                border: "1px solid var(--color-border-bright)",
                cursor: "none",
              }}
            >
              Join the Academy
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
