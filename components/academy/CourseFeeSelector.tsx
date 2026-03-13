"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

interface FeeTier {
  name: string;
  price: string;
  feeNote: string;
  benefits: string[];
  featured?: boolean;
}

interface CourseFeeSelectorProps {
  tiers: FeeTier[];
}

export default function CourseFeeSelector({ tiers }: CourseFeeSelectorProps) {
  const defaultTier =
    tiers.find((tier) => tier.featured)?.name ?? tiers[0]?.name;
  const [selectedTierName, setSelectedTierName] = useState(defaultTier);

  const selectedTier = useMemo(
    () => tiers.find((tier) => tier.name === selectedTierName) ?? tiers[0],
    [selectedTierName, tiers],
  );

  const eliteTier = tiers[tiers.length - 1] ?? tiers[0];
  const selectedBenefits = new Set(selectedTier?.benefits ?? []);
  const selectedHasBundle = (selectedTier?.benefits ?? []).some((benefit) =>
    benefit.toLowerCase().includes("everything in"),
  );

  const missedBenefits = (eliteTier?.benefits ?? []).filter(
    (benefit) => !selectedBenefits.has(benefit) && !selectedHasBundle,
  );

  return (
    <div
      style={{
        display: "grid",
        gap: "14px",
        marginBottom: "32px",
        maxWidth: "980px",
      }}
    >
      <div className="grid-card-4" style={{ gap: "12px" }}>
        {tiers.map((tier) => {
          const active = tier.name === selectedTierName;
          return (
            <button
              key={tier.name}
              type="button"
              onClick={() => setSelectedTierName(tier.name)}
              style={{
                textAlign: "left",
                borderRadius: "14px",
                border: active
                  ? "1px solid rgba(239,89,36,0.52)"
                  : "1px solid var(--color-border)",
                background:
                  active || tier.featured
                    ? "linear-gradient(165deg, rgba(239,89,36,0.14), rgba(211,32,39,0.08))"
                    : "var(--color-dark-elevated)",
                padding: "18px",
                display: "grid",
                gap: "8px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-orange)",
                }}
              >
                {tier.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(20px, 3vw, 28px)",
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.03em",
                }}
              >
                {tier.price}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                }}
              >
                {tier.feeNote}
              </p>
            </button>
          );
        })}
      </div>

      <div
        style={{
          borderRadius: "14px",
          border: "1px solid rgba(239,89,36,0.4)",
          background: "rgba(239,89,36,0.07)",
          padding: "16px",
          display: "grid",
          gap: "12px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "18px",
            color: "var(--color-text-primary)",
          }}
        >
          Selected tier: {selectedTier?.name}
        </p>
        <div className="grid-card-2" style={{ gap: "12px" }}>
          <div>
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
              You Get
            </p>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gap: "6px",
              }}
            >
              {(selectedTier?.benefits ?? []).map((benefit) => (
                <li
                  key={benefit}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  • {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div>
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
              If you stay on {selectedTier?.name}, you miss
            </p>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gap: "6px",
              }}
            >
              {(selectedTier?.name === eliteTier?.name
                ? ["None. You unlock the full placement acceleration stack."]
                : missedBenefits
              ).map((item) => (
                <li
                  key={item}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="button"
          style={{
            marginTop: "4px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "12px 18px",
            borderRadius: "999px",
            border: "none",
            background: "var(--gradient-brand-premium)",
            color: "#fff",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "12px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            width: "fit-content",
          }}
        >
          Lock {selectedTier?.name}
          <ArrowRight size={14} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
