"use client";

import { FaWhatsapp } from "react-icons/fa";
import { BUSINESS_DATA } from "@/lib/constants";

export default function WhatsAppBubble() {
  const href = `https://wa.me/91${BUSINESS_DATA.phone}?text=${encodeURIComponent("Hi Mavericks, I want to know more.")}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="btn-animated"
      style={{
        position: "fixed",
        right: "18px",
        bottom: "18px",
        zIndex: 58,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--gradient-brand-premium)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: "0 10px 30px rgba(239,89,36,0.35)",
        textDecoration: "none",
      }}
    >
      <FaWhatsapp size={24} />
    </a>
  );
}
