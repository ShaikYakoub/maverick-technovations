"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
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
} from "@/lib/icons";
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
  Record<ServiceSlug, { risk: string; gain: string; benefits: string[] }>
> = {
  "digital-marketing": {
    risk: "Ad spend fragments, lead quality drops, and growth plateaus.",
    gain: "A coordinated multi-channel engine with measurable ROI loops.",
    benefits: [
      "Channel orchestration",
      "CAC visibility",
      "Weekly growth sprints",
    ],
  },
  seo: {
    risk: "High-intent buyers keep choosing whoever ranks above you.",
    gain: "Compounding organic visibility that lowers acquisition cost.",
    benefits: [
      "Technical cleanup",
      "Authority growth",
      "Search demand capture",
    ],
  },
  "social-media-marketing": {
    risk: "Attention shifts to competitors posting with consistency.",
    gain: "Trust-building content systems that convert audience into pipeline.",
    benefits: [
      "Content velocity",
      "Creative testing",
      "Audience nurture loops",
    ],
  },
  "google-ads": {
    risk: "You miss customers already searching for your offer.",
    gain: "Fast, high-intent lead flow with weekly optimisation control.",
    benefits: [
      "Intent-led campaigns",
      "Lead quality filters",
      "Budget precision",
    ],
  },
};

const PLACEHOLDER_WEBM =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm";
const HOVER_OPEN_DELAY_MS = 1200;
const VIDEO_START_DELAY_MS = 1000;
const DESKTOP_COLLAPSED_HEIGHT = "clamp(248px, 29vw, 296px)";
const DESKTOP_EXPANDED_HEIGHT = "clamp(372px, 36vw, 430px)";

export default function ExpandableServiceGrid({
  services,
  showIntel = false,
  gap = "clamp(12px, 2.8vw, 20px)",
  cardPadding = "clamp(18px, 4.6vw, 28px)",
  gridClassName = "grid-card-4",
}: ExpandableServiceGridProps) {
  const router = useRouter();
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [touchMode, setTouchMode] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverIntentRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeMediaSlugRef = useRef<string | null>(null);

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
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedSlug(null);
        setShouldLoadVideo(false);
        setVideoReady(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;
    void videoRef.current.play().catch(() => undefined);
  }, [shouldLoadVideo, expandedSlug]);

  useEffect(() => {
    return () => {
      if (hoverIntentRef.current) clearTimeout(hoverIntentRef.current);
      if (videoDelayRef.current) clearTimeout(videoDelayRef.current);
    };
  }, []);

  const expandedService = useMemo(
    () => services.find((service) => service.slug === expandedSlug),
    [expandedSlug, services],
  );

  const resetMediaState = () => {
    setShouldLoadVideo(false);
    setVideoReady(false);
    if (videoDelayRef.current) {
      clearTimeout(videoDelayRef.current);
      videoDelayRef.current = null;
    }
  };

  const startMediaDelay = (slug: string) => {
    activeMediaSlugRef.current = slug;
    setShouldLoadVideo(false);
    setVideoReady(false);
    if (videoDelayRef.current) clearTimeout(videoDelayRef.current);
    videoDelayRef.current = setTimeout(() => {
      if (activeMediaSlugRef.current === slug) {
        setShouldLoadVideo(true);
      }
    }, VIDEO_START_DELAY_MS);
  };

  const beginHoverIntent = (slug: string) => {
    if (touchMode) return;
    setHoveredSlug(slug);
    if (hoverIntentRef.current) clearTimeout(hoverIntentRef.current);
    startMediaDelay(slug);
    hoverIntentRef.current = setTimeout(() => {
      setExpandedSlug(slug);
    }, HOVER_OPEN_DELAY_MS);
  };

  const cancelHoverIntent = (slug: string) => {
    if (touchMode) return;
    setHoveredSlug(null);
    if (hoverIntentRef.current) {
      clearTimeout(hoverIntentRef.current);
      hoverIntentRef.current = null;
    }
    if (activeMediaSlugRef.current === slug) {
      activeMediaSlugRef.current = null;
    }
    resetMediaState();
    if (expandedSlug === slug) {
      setExpandedSlug(null);
    }
  };

  const openTouchCard = (slug: string) => {
    setHoveredSlug(null);
    setExpandedSlug(slug);
    startMediaDelay(slug);
  };

  const navigateToService = (slug: string) => {
    setHoveredSlug(null);
    setExpandedSlug(null);
    activeMediaSlugRef.current = null;
    resetMediaState();
    router.push(`/services/${slug}`);
  };

  const renderCard = (
    service: ServiceItem,
    isExpanded: boolean,
    forceExpanded = false,
  ) => {
    const media =
      MEDIA_ASSETS.services.cards[
        service.slug as keyof typeof MEDIA_ASSETS.services.cards
      ];
    const intel = SERVICE_INTEL[service.slug as ServiceSlug] ?? {
      risk: "Demand leakage grows when your funnel lacks precision.",
      gain: "Clear acquisition systems with predictable lead momentum.",
      benefits: ["Funnel clarity", "Demand capture", "Conversion lift"],
    };
    const Icon = ICON_MAP[service.icon] ?? TrendingUp;
    const showExpandedState = forceExpanded || (!touchMode && isExpanded);
    const showVideo =
      shouldLoadVideo && activeMediaSlugRef.current === service.slug;
    const showHoverLift =
      !touchMode && !showExpandedState && hoveredSlug === service.slug;

    return (
      <motion.div
        animate={
          showExpandedState
            ? {
                y: -10,
                scale: 1.04,
                height: touchMode ? "auto" : DESKTOP_EXPANDED_HEIGHT,
                boxShadow: "0 34px 90px rgba(0,0,0,0.56)",
                borderColor: "rgba(239,89,36,0.46)",
              }
            : {
                y: showHoverLift ? -6 : 0,
                scale: showHoverLift ? 1.015 : 1,
                height: touchMode ? "auto" : DESKTOP_COLLAPSED_HEIGHT,
                boxShadow: "0 18px 44px rgba(0,0,0,0.18)",
                borderColor: "var(--color-border)",
              }
        }
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 26,
          mass: 0.9,
        }}
        onClick={() => {
          if (touchMode) {
            openTouchCard(service.slug);
            return;
          }
          if (showExpandedState) {
            navigateToService(service.slug);
          }
        }}
        style={{
          position: touchMode ? "relative" : "absolute",
          inset: touchMode ? undefined : 0,
          display: "grid",
          gridTemplateRows: showExpandedState
            ? "auto auto 1fr auto"
            : "1fr auto",
          gap: "0",
          width: "100%",
          padding: 0,
          borderRadius: showExpandedState ? "22px" : "18px",
          border: "1px solid var(--color-border)",
          background:
            "linear-gradient(180deg, rgba(24,24,24,0.98) 0%, rgba(14,14,14,0.98) 100%)",
          overflow: "hidden",
          cursor: touchMode ? "pointer" : "none",
          transformOrigin: "center center",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        {showExpandedState ? (
          <div
            style={{
              position: "relative",
              height: "clamp(168px, 18vw, 214px)",
              overflow: "hidden",
            }}
          >
            <img
              src={media?.poster || MEDIA_ASSETS.services.heroImage}
              alt={service.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: videoReady ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            />
            {showVideo ? (
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="metadata"
                onCanPlay={() => setVideoReady(true)}
                poster={media?.poster}
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
                  src={media?.hoverVideo || PLACEHOLDER_WEBM}
                  type="video/webm"
                />
              </video>
            ) : null}
          </div>
        ) : null}

        {showExpandedState ? (
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(239,89,36,0) 0%, rgba(239,89,36,0.46) 48%, rgba(239,89,36,0) 100%)",
            }}
          />
        ) : null}

        <div
          style={{
            display: "grid",
            gap: showExpandedState ? "12px" : "14px",
            padding: showExpandedState ? "18px" : cardPadding,
            alignContent: "start",
          }}
        >
          {!showExpandedState ? (
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                border: "1px solid rgba(239,89,36,0.28)",
                background: "rgba(239,89,36,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                size={20}
                strokeWidth={1.5}
                style={{ color: "var(--color-brand-orange)" }}
              />
            </div>
          ) : null}

          <div
            style={{
              display: "grid",
              gap: showExpandedState ? "10px" : "10px",
            }}
          >
            <div style={{ display: "grid", gap: "8px", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: showExpandedState
                      ? "clamp(20px, 2.4vw, 26px)"
                      : "clamp(15px, 2.8vw, 17px)",
                    letterSpacing: "-0.03em",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {service.title}
                </h3>
                {showExpandedState ? (
                  <span
                    aria-hidden="true"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "999px",
                      border: "1px solid rgba(239,89,36,0.28)",
                      background: "rgba(239,89,36,0.1)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.8}
                      style={{ color: "var(--color-brand-orange)" }}
                    />
                  </span>
                ) : null}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: showExpandedState ? "13px" : "12px",
                  lineHeight: 1.7,
                  color: "var(--color-text-secondary)",
                }}
              >
                {service.description}
              </p>
            </div>

            {showExpandedState ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {intel.benefits.slice(0, 2).map((benefit) => (
                  <span
                    key={benefit}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "8px 11px",
                      borderRadius: "999px",
                      border: "1px solid rgba(239,89,36,0.22)",
                      background: "rgba(255,255,255,0.03)",
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            ) : showIntel ? (
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
        </div>

        <div
          style={{
            display: "grid",
            gap: "12px",
            padding: showExpandedState
              ? "0 18px 18px"
              : `0 ${cardPadding} ${cardPadding}`,
          }}
        >
          {!showExpandedState ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-brand-orange)",
              }}
            >
              Learn more
              <ArrowUpRight size={14} strokeWidth={1.6} />
            </div>
          ) : null}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <div className={gridClassName} style={{ gap, overflow: "visible" }}>
        {services.map((service) => {
          const isExpanded = expandedSlug === service.slug;

          return (
            <div
              key={service.slug}
              onMouseEnter={() => beginHoverIntent(service.slug)}
              onMouseLeave={() => cancelHoverIntent(service.slug)}
              style={{
                position: "relative",
                minHeight: touchMode ? "auto" : DESKTOP_COLLAPSED_HEIGHT,
                zIndex: !touchMode && isExpanded ? 30 : 1,
              }}
            >
              {renderCard(service, isExpanded)}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {touchMode && expandedService ? (
          <motion.div
            key={`${expandedService.slug}-overlay`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setExpandedSlug(null);
              activeMediaSlugRef.current = null;
              resetMediaState();
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(0,0,0,0.82)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              onClick={(event) => event.stopPropagation()}
              style={{
                width: "min(540px, 100%)",
                position: "relative",
              }}
            >
              <button
                type="button"
                aria-label="Close expanded card"
                onClick={() => {
                  setExpandedSlug(null);
                  activeMediaSlugRef.current = null;
                  resetMediaState();
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
                  zIndex: 3,
                }}
              >
                x
              </button>
              {renderCard(expandedService, true, true)}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
