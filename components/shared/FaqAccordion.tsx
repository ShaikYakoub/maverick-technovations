"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({
  items,
  defaultOpenIndex = 0,
}: {
  items: ReadonlyArray<FaqItem>;
  defaultOpenIndex?: number;
}) {
  const [openIndex, setOpenIndex] = useState(
    Math.min(Math.max(defaultOpenIndex, 0), Math.max(items.length - 1, 0)),
  );

  return (
    <div style={{ display: "grid", gap: "12px" }}>
      {items.map((item, idx) => {
        const isOpen = idx === openIndex;
        return (
          <div
            key={item.question}
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              background: isOpen
                ? "rgba(255,85,0,0.06)"
                : "var(--color-dark-surface)",
              transition: "background 0.25s, border-color 0.25s",
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(idx)}
              style={{
                width: "100%",
                padding: "16px 18px",
                border: "none",
                background: "transparent",
                cursor: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "var(--color-text-primary)",
                }}
              >
                {item.question}
              </span>
              <ChevronDown
                size={18}
                strokeWidth={1.5}
                style={{
                  color: "var(--color-text-muted)",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s",
                  flexShrink: 0,
                }}
              />
            </button>

            {isOpen ? (
              <div style={{ padding: "0 18px 16px" }}>
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
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
