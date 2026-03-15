"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { Menu, X } from "@/lib/icons";
import { BUSINESS_DATA } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Academy", href: "/academy" },
  { label: "Contact", href: "/contact" },
] as const;

// ── Magnetic CTA Button ────────────────────────────────────────────────────
function MagneticCTA({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="magnetic-cta"
      aria-label="Unlock Pricing"
      whileTap={{ scale: 0.96 }}
    >
      <span className="magnetic-cta__inner">Unlock Pricing</span>
      <span className="magnetic-cta__glow" aria-hidden="true" />
    </motion.button>
  );
}

// ── Main Navbar ────────────────────────────────────────────────────────────
export default function FloatingNavbar({
  onOpenDrawer,
}: {
  onOpenDrawer: () => void;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on route change / resize
  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onDocClick = (event: MouseEvent) => {
      if (!mobileMenuRef.current) return;
      const target = event.target as Node;
      if (!mobileMenuRef.current.contains(target)) {
        setMobileOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <motion.header
        role="banner"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: "16px",
          left: "50%",
          x: "-50%",
          width: "calc(100% - 48px)",
          maxWidth: "1280px",
          zIndex: 50,
          borderRadius: "12px",
          border: `1px solid ${scrolled ? "rgba(239,89,36,0.32)" : "rgba(38,38,38,0.8)"}`,
          background: scrolled ? "rgba(10,10,10,0.92)" : "rgba(10,10,10,0.6)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          padding: "0 24px",
          transition: "border-color 0.4s ease, background 0.4s ease",
          boxShadow: scrolled
            ? "0 0 0 1px rgba(239,89,36,0.16), 0 8px 32px rgba(0,0,0,0.5)"
            : "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <nav
          aria-label="Primary navigation"
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ── Logo ──────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="Mavericks Technovations — Home"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src="/media/images/maverick-logo.avif"
              alt="Mavericks Technovations"
              width={160}
              height={44}
              priority
              style={{
                display: "block",
                height: "44px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Link>

          {/* ── Desktop Links ──────────────────────────────────── */}
          <ul
            role="list"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="nav-links-desktop"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActiveLink(link.href) ? "text-brand-gradient" : undefined
                  }
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: "14px",
                    letterSpacing: "0.04em",
                    color: isActiveLink(link.href)
                      ? "transparent"
                      : "var(--color-text-secondary)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActiveLink(link.href)) {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--color-text-primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActiveLink(link.href)) {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--color-text-secondary)";
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── CTA + Hamburger ────────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div className="nav-cta-desktop">
              <MagneticCTA onClick={onOpenDrawer} />
            </div>

            {/* Mobile hamburger */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
              className="nav-hamburger"
              style={{
                background: "none",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                padding: "8px",
                cursor: "none",
                color: "var(--color-text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Nav Overlay ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-nav"
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: "96px",
              left: "24px",
              right: "24px",
              zIndex: 49,
              borderRadius: "16px",
              border: "1px solid var(--color-border)",
              background: "rgba(10,10,10,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              padding: "24px",
            }}
          >
            <ul
              role="list"
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  style={{
                    borderBottom: "1px solid var(--color-border)",
                    paddingBottom: "4px",
                    marginBottom: "4px",
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={
                      isActiveLink(link.href)
                        ? "text-brand-gradient"
                        : undefined
                    }
                    style={{
                      display: "block",
                      padding: "14px 8px",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "22px",
                      letterSpacing: "-0.02em",
                      color: isActiveLink(link.href)
                        ? "transparent"
                        : "var(--color-text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div style={{ marginTop: "24px" }}>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenDrawer();
                }}
                style={{
                  width: "100%",
                  padding: "16px",
                  background:
                    "linear-gradient(135deg, #F9A01B 0%, #EF5924 50%, #D32027 100%)",
                  color: "#fff",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "15px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "none",
                }}
              >
                Unlock Pricing
              </button>
            </div>

            <div
              className="mobile-nav-contact"
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "16px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href={`tel:+91${BUSINESS_DATA.phone}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                  wordBreak: "break-word",
                }}
              >
                +91 {BUSINESS_DATA.phone}
              </a>
              <span
                className="mobile-nav-divider"
                style={{ color: "var(--color-border-bright)" }}
              >
                ·
              </span>
              <a
                href={`mailto:${BUSINESS_DATA.email}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                  wordBreak: "break-word",
                }}
              >
                {BUSINESS_DATA.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .magnetic-cta {
          position: relative;
          background: var(--gradient-brand-premium);
          border: none;
          border-radius: 8px;
          padding: 10px 22px;
          cursor: none;
          overflow: hidden;
          box-shadow: 0 3px 14px rgba(239,89,36,0.32);
        }
        .magnetic-cta__inner {
          position: relative;
          z-index: 1;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
          pointer-events: none;
          transition: color 0.25s ease;
        }
        .magnetic-cta__glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .magnetic-cta:hover .magnetic-cta__glow { opacity: 1; }
        .magnetic-cta:hover .magnetic-cta__inner { color: #fff; }

        /* Hide desktop links on mobile */
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop   { display: none !important; }
          .nav-hamburger     { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}
