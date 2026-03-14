"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({
  items,
  defaultOpenIndex,
}: {
  items: ReadonlyArray<FaqItem>;
  defaultOpenIndex?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(() => {
    if (defaultOpenIndex === undefined) return null;
    return Math.min(
      Math.max(defaultOpenIndex, 0),
      Math.max(items.length - 1, 0),
    );
  });

  return (
    <div style={{ display: "grid", gap: "12px" }}>
      {items.map((item, idx) => {
        const isOpen = idx === openIndex;
        const panelId = `faq-panel-${idx}`;
        const triggerId = `faq-trigger-${idx}`;
        return (
          <div
            key={item.question}
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              background: isOpen
                ? "rgba(239,89,36,0.08)"
                : "var(--color-dark-surface)",
              transition: "background 0.25s, border-color 0.25s",
            }}
          >
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() =>
                setOpenIndex((current) => (current === idx ? null : idx))
              }
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
                  transform: isOpen
                    ? "rotate(180deg) scale(1.06)"
                    : "rotate(0deg)",
                  transition:
                    "transform 0.36s cubic-bezier(0.2, 0.9, 0.2, 1.1)",
                  flexShrink: 0,
                }}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: {
                      type: "spring",
                      stiffness: 260,
                      damping: 28,
                      mass: 0.55,
                    },
                    opacity: { duration: 0.2 },
                  }}
                  style={{ overflow: "hidden" }}
                >
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
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
