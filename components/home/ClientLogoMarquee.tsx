import type { CSSProperties } from "react";

const PLACEHOLDER_LOGOS = [
  "Client One",
  "Client Two",
  "Client Three",
  "Client Four",
  "Client Five",
  "Client Six",
  "Client Seven",
  "Client Eight",
];

function LogoPill({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "160px",
        height: "56px",
        padding: "0 20px",
        borderRadius: "12px",
        border: "1px solid var(--color-border)",
        background: "var(--color-dark-elevated)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function ClientLogoMarquee() {
  const row = [...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS];

  return (
    <section
      aria-label="Client logos"
      style={{
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-dark-surface)",
        padding: "22px 0",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          textAlign: "center",
          marginBottom: "14px",
        }}
      >
        Trusted by Growth-Focused Brands
      </p>

      <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
        <div
          style={
            {
              display: "inline-flex",
              alignItems: "center",
              gap: "14px",
              paddingLeft: "14px",
              animation: "marquee 24s linear infinite",
              willChange: "transform",
            } as CSSProperties
          }
        >
          {row.map((logo, idx) => (
            <LogoPill key={`${logo}-${idx}`} label={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
