"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
  Pen,
  Search,
  Share2,
  ShoppingCart,
  TrendingUp,
  Users,
  Video,
  Zap,
} from "lucide-react";
import type { ServiceSlug } from "@/lib/constants";
import { MEDIA_ASSETS } from "@/lib/mediaManifest";

interface ServiceItem {
  slug: string;
  title: string;
  icon: string;
  description: string;
}

interface ExpandableServiceGridProps {
  services: readonly ServiceItem[];
  showIntel?: boolean;
  gap?: string;
  cardPadding?: string;
  gridClassName?: string;
}

const ICON_MAP: Record<
  string,
  ComponentType<{
    size?: number;
    strokeWidth?: number;
    style?: CSSProperties;
  }>
> = {
  TrendingUp,
  Search,
  Share2,
  Zap,
  Monitor,
  ShoppingCart,
  MapPin,
  Mail,
  Pen,
  MessageCircle,
  Users,
  Video,
};

const SERVICE_INTEL: Partial<
  Record<ServiceSlug, { risk: string; gain: string }>
> = {
  "digital-marketing": {
    risk: "Ad spend fragments, lead quality drops, and growth plateaus.",
    gain: "A coordinated multi-channel engine with measurable ROI loops.",
  },
  seo: {
    risk: "High-intent buyers keep choosing whoever ranks above you.",
    gain: "Compounding organic visibility that lowers acquisition cost.",
  },
  "social-media-marketing": {
    risk: "Attention shifts to competitors posting with consistency.",
    gain: "Trust-building content systems that convert audience into pipeline.",
  },
  "google-ads": {
    risk: "You miss customers already searching for your offer.",
    gain: "Fast, high-intent lead flow with weekly optimisation control.",
  },
};

const PLACEHOLDER_WEBM =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm";
const HOVER_OPEN_DELAY_MS = 1200;
const VIDEO_START_DELAY_MS = 2000;

export default function ExpandableServiceGrid({
  services,
  showIntel = false,
  gap = "clamp(12px, 2.8vw, 20px)",
  cardPadding = "clamp(18px, 4.6vw, 28px)",
  gridClassName = "grid-card-4",
}: ExpandableServiceGridProps) {
  const router = useRouter();
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [touchMode, setTouchMode] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timersRef = useRef<
    Record<string, ReturnType<typeof setTimeout> | undefined>
  >({});

  useEffect(() => {
    const query = window.matchMedia(
      "(max-width: 768px), (hover: none), (pointer: coarse)",
    );
    const syncMode = () => setTouchMode(query.matches);
    syncMode();
    query.addEventListener("change", syncMode);
    return () => query.removeEventListener("change", syncMode);
  }, []);

  useEffect(() => {
    if (!expandedSlug || !touchMode) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [expandedSlug, touchMode]);

  useEffect(() => {
    if (!expandedSlug) {
      setVideoReady(false);
      setShouldLoadVideo(false);
      return;
    }
    setVideoReady(false);
    setShouldLoadVideo(false);
    if (videoDelayRef.current) clearTimeout(videoDelayRef.current);
    videoDelayRef.current = setTimeout(() => {
      setShouldLoadVideo(true);
    }, VIDEO_START_DELAY_MS);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedSlug(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (videoDelayRef.current) {
        clearTimeout(videoDelayRef.current);
        videoDelayRef.current = null;
      }
    };
  }, [expandedSlug]);

  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;
    void videoRef.current.play().catch(() => undefined);
  }, [shouldLoadVideo]);

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  const expandedService = useMemo(
    () => services.find((service) => service.slug === expandedSlug),
    [expandedSlug, services],
  );

  const beginHoverIntent = (slug: string) => {
    if (touchMode) return;
    if (timersRef.current[slug]) clearTimeout(timersRef.current[slug]);
    timersRef.current[slug] = setTimeout(() => {
      setExpandedSlug(slug);
    }, HOVER_OPEN_DELAY_MS);
  };

  const cancelHoverIntent = (slug: string) => {
    const timer = timersRef.current[slug];
    if (timer) {
      clearTimeout(timer);
      timersRef.current[slug] = undefined;
    }
  };

  const navigateToService = (slug: string) => {
    setExpandedSlug(null);
    router.push(`/services/${slug}`);
  };

  return (
    <LayoutGroup>
      <div className={gridClassName} style={{ gap }}>
        {services.map((service) => {
          const media =
            MEDIA_ASSETS.services.cards[
              service.slug as keyof typeof MEDIA_ASSETS.services.cards
            ];
          const intel = SERVICE_INTEL[service.slug as ServiceSlug] ?? {
            risk: "Demand leakage grows when your funnel lacks precision.",
            gain: "Clear acquisition systems with predictable lead momentum.",
          };
          const Icon = ICON_MAP[service.icon] ?? TrendingUp;
          const isExpanded = expandedSlug === service.slug;

          return (
            <motion.button
              key={service.slug}
              type="button"
              layoutId={`service-card-${service.slug}`}
              onHoverStart={() => beginHoverIntent(service.slug)}
              onHoverEnd={() => cancelHoverIntent(service.slug)}
              onClick={() => {
                if (touchMode) {
                  setExpandedSlug(service.slug);
                }
              }}
              whileHover={touchMode ? undefined : { y: -10 }}
              transition={{
                y: { type: "spring", stiffness: 320, damping: 28 },
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(12px, 2.8vw, 16px)",
                padding: cardPadding,
                borderRadius: "16px",
                border: "1px solid var(--color-border)",
                background: "var(--color-dark-elevated)",
                overflow: "hidden",
                textAlign: "left",
                cursor: "none",
                minHeight: "100%",
                position: "relative",
                visibility: isExpanded ? "hidden" : "visible",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.28,
                  pointerEvents: "none",
                }}
              >
                <img
                  src={media?.poster || MEDIA_ASSETS.services.heroImage}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  border: "1px solid rgba(239,89,36,0.28)",
                  background: "rgba(239,89,36,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  style={{ color: "var(--color-brand-orange)" }}
                />
              </div>

              <div style={{ zIndex: 1, flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(15px, 2.8vw, 17px)",
                    letterSpacing: "-0.02em",
                    color: "var(--color-text-primary)",
                    marginBottom: "8px",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(12px, 2.5vw, 13px)",
                    lineHeight: 1.65,
                    color: "var(--color-text-secondary)",
                    marginBottom: showIntel ? "14px" : "0",
                  }}
                >
                  {service.description}
                </p>

                {showIntel ? (
                  <div
                    style={{
                      display: "grid",
                      gap: "8px",
                      padding: "clamp(9px, 2.2vw, 11px)",
                      borderRadius: "10px",
                      border: "1px solid rgba(239,89,36,0.22)",
                      background: "rgba(239,89,36,0.07)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-brand-orange)",
                      }}
                    >
                      If Ignored
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(11px, 2.3vw, 12px)",
                        lineHeight: 1.55,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {intel.risk}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-brand-orange)",
                        marginTop: "2px",
                      }}
                    >
                      You Get
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(11px, 2.3vw, 12px)",
                        lineHeight: 1.55,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {intel.gain}
                    </p>
                  </div>
                ) : null}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-orange)",
                  zIndex: 1,
                }}
              >
                Learn more
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {expandedService ? (
          <motion.div
            key={`${expandedService.slug}-overlay`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setExpandedSlug(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: touchMode ? 100 : 50,
              background: touchMode ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.42)",
              backdropFilter: touchMode ? "blur(12px)" : "blur(2px)",
              WebkitBackdropFilter: touchMode ? "blur(12px)" : "blur(2px)",
              padding: touchMode ? "20px" : "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              layoutId={`service-card-${expandedService.slug}`}
              onMouseLeave={() => {
                if (!touchMode) setExpandedSlug(null);
              }}
              onClick={(event) => {
                event.stopPropagation();
                navigateToService(expandedService.slug);
              }}
              style={{
                width: "min(860px, 100%)",
                borderRadius: "20px",
                border: "1px solid rgba(239,89,36,0.4)",
                background: "var(--color-dark-elevated)",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 30px 80px rgba(0,0,0,0.58)",
              }}
            >
              <button
                type="button"
                aria-label="Close expanded card"
                onClick={(event) => {
                  event.stopPropagation();
                  setExpandedSlug(null);
                }}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "36px",
                  height: "36px",
                  borderRadius: "999px",
                  border: "1px solid rgba(239,89,36,0.42)",
                  background: "rgba(10,10,10,0.72)",
                  color: "var(--color-text-primary)",
                  cursor: "none",
                  zIndex: 3,
                }}
              >
                x
              </button>

              <div
                style={{
                  position: "relative",
                  height: touchMode ? "200px" : "290px",
                }}
              >
                <img
                  src={
                    MEDIA_ASSETS.services.cards[
                      expandedService.slug as keyof typeof MEDIA_ASSETS.services.cards
                    ]?.poster || MEDIA_ASSETS.services.heroImage
                  }
                  alt={expandedService.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: videoReady ? 0 : 1,
                    transition: "opacity 0.3s ease",
                  }}
                />
                {shouldLoadVideo ? (
                  <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onCanPlay={() => setVideoReady(true)}
                    poster={
                      MEDIA_ASSETS.services.cards[
                        expandedService.slug as keyof typeof MEDIA_ASSETS.services.cards
                      ]?.poster
                    }
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: videoReady ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <source
                      src={
                        MEDIA_ASSETS.services.cards[
                          expandedService.slug as keyof typeof MEDIA_ASSETS.services.cards
                        ]?.hoverVideo || PLACEHOLDER_WEBM
                      }
                      type="video/webm"
                    />
                  </video>
                ) : null}
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(239,89,36,0.26)",
                  background: "rgba(6,6,6,0.76)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  padding: "clamp(16px, 4vw, 22px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ maxWidth: "620px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(20px, 4vw, 30px)",
                        letterSpacing: "-0.03em",
                        color: "var(--color-text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      {expandedService.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(13px, 2.8vw, 15px)",
                        lineHeight: 1.65,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {expandedService.description}
                    </p>
                  </div>

                  <Link
                    href={`/services/${expandedService.slug}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      navigateToService(expandedService.slug);
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 16px",
                      borderRadius: "999px",
                      background:
                        "linear-gradient(135deg, #F9A01B 0%, #EF5924 50%, #D32027 100%)",
                      color: "#fff",
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "12px",
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    Explore Service
                    <ArrowRight size={14} strokeWidth={1.8} />
                  </Link>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(12px, 2.6vw, 14px)",
                    lineHeight: 1.8,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {expandedService.description} We map your current acquisition
                  leaks, rebuild conversion architecture, and deploy
                  sprint-based optimisation cycles so growth remains measurable,
                  compounding, and resilient through seasonal market shifts.
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LayoutGroup>
  );
}
