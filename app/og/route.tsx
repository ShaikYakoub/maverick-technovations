import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") ?? "Dominate the Algorithm";
  const city = searchParams.get("city");
  const type = searchParams.get("type") ?? "home";

  const subtitle =
    type === "academy"
      ? "Tech Academy · Kadapa, Andhra Pradesh"
      : city
        ? `Digital Marketing Agency in ${city.charAt(0).toUpperCase() + city.slice(1)}, South India`
        : "Digital Marketing Agency · Kadapa, Andhra Pradesh";

  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: "60px 80px",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Top neon gradient bar ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          background: "linear-gradient(90deg, #FF5500 0%, #E8002D 100%)",
        }}
      />

      {/* ── Background radial glow ── */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,85,0,0.18) 0%, transparent 65%)",
        }}
      />

      {/* ── Grid dot pattern ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, #333 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.3,
        }}
      />

      {/* ── Company badge ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "36px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#FF5500",
            boxShadow:
              "0 0 0 4px rgba(255,85,0,0.3), 0 0 20px rgba(255,85,0,0.6)",
          }}
        />
        <span
          style={{
            color: "#FF5500",
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Mavericks Technovations
        </span>
      </div>

      {/* ── Main title ── */}
      <h1
        style={{
          fontSize:
            title.length > 35 ? "52px" : title.length > 25 ? "62px" : "76px",
          fontWeight: 800,
          color: "#f5f5f5",
          lineHeight: 1.0,
          margin: "0 0 24px 0",
          letterSpacing: "-0.025em",
          maxWidth: "1000px",
          position: "relative",
        }}
      >
        {title}
      </h1>

      {/* ── Subtitle ── */}
      <p
        style={{
          fontSize: "22px",
          color: "#a3a3a3",
          margin: "0 0 0 0",
          fontWeight: 400,
          letterSpacing: "0.01em",
          position: "relative",
        }}
      >
        {subtitle}
      </p>

      {/* ── Bottom right URL ── */}
      <div
        style={{
          position: "absolute",
          bottom: "52px",
          right: "80px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            color: "#404040",
            fontSize: "15px",
            letterSpacing: "0.02em",
          }}
        >
          maverickstechnovations.com
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
