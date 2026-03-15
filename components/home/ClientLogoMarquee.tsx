import type { CSSProperties } from "react";
import Image from "next/image";

const CLIENT_IMAGES = [
  "/media/images/clients/1.avif",
  "/media/images/clients/2.avif",
  "/media/images/clients/3.avif",
  "/media/images/clients/4.avif",
  "/media/images/clients/5.avif",
  "/media/images/clients/6.avif",
  "/media/images/clients/7.avif",
  "/media/images/clients/8.avif",
  "/media/images/clients/9.avif",
];

function LogoPill({ src, index }: { src: string; index: number }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "160px",
        height: "72px",
        padding: "0 16px",
        borderRadius: "12px",
        border: "1px solid var(--color-border)",
        background: "var(--color-dark-elevated)",
        flexShrink: 0,
      }}
    >
      <Image
        src={src}
        alt={`Client ${index + 1}`}
        width={120}
        height={48}
        style={{
          objectFit: "contain",
          maxHeight: "48px",
          width: "auto",
          filter: "brightness(0.85) grayscale(0.3)",
        }}
      />
    </div>
  );
}

export default function ClientLogoMarquee() {
  const row = [...CLIENT_IMAGES, ...CLIENT_IMAGES];

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
          {row.map((src, idx) => (
            <LogoPill
              key={`${src}-${idx}`}
              src={src}
              index={idx % CLIENT_IMAGES.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
