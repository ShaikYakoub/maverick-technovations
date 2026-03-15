"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ArrowRight, Award, Clock, Sparkles, Wifi } from "@/lib/icons";
import { MEDIA_ASSETS } from "@/lib/mediaManifest";

interface AcademyCourseItem {
  slug: string;
  title: string;
  description: string;
  duration: string;
  format: string;
  credential: string;
}

interface ExpandableAcademyGridProps {
  courses: readonly AcademyCourseItem[];
}

const PLACEHOLDER_WEBM =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm";
const HOVER_OPEN_DELAY_MS = 1200;
const VIDEO_START_DELAY_MS = 1000;
const DESKTOP_COLLAPSED_HEIGHT = "clamp(264px, 31vw, 312px)";
const DESKTOP_EXPANDED_HEIGHT = "clamp(388px, 38vw, 450px)";

export default function ExpandableAcademyGrid({
  courses,
}: ExpandableAcademyGridProps) {
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

  const expandedCourse = useMemo(
    () => courses.find((course) => course.slug === expandedSlug),
    [courses, expandedSlug],
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

  const navigateToCourse = (slug: string) => {
    setHoveredSlug(null);
    setExpandedSlug(null);
    activeMediaSlugRef.current = null;
    resetMediaState();
    router.push(`/academy/${slug}`);
  };

  const renderCard = (
    course: AcademyCourseItem,
    isExpanded: boolean,
    forceExpanded = false,
  ) => {
    const showExpandedState = forceExpanded || (!touchMode && isExpanded);
    const showVideo =
      shouldLoadVideo && activeMediaSlugRef.current === course.slug;
    const showHoverLift =
      !touchMode && !showExpandedState && hoveredSlug === course.slug;

    return (
      <motion.div
        className="academy-card-hover"
        animate={
          showExpandedState
            ? {
                y: -10,
                scale: 1.035,
                height: touchMode ? "auto" : DESKTOP_EXPANDED_HEIGHT,
                boxShadow: "0 34px 90px rgba(0,0,0,0.56)",
                borderColor: "rgba(255,75,75,0.42)",
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
          mass: 0.92,
        }}
        onClick={() => {
          if (touchMode) {
            openTouchCard(course.slug);
            return;
          }
          if (showExpandedState) {
            navigateToCourse(course.slug);
          }
        }}
        style={{
          position: touchMode ? "relative" : "absolute",
          inset: touchMode ? undefined : 0,
          display: "grid",
          gridTemplateRows: showExpandedState
            ? "auto auto 1fr auto"
            : "1fr auto",
          width: "100%",
          borderRadius: showExpandedState ? "22px" : "18px",
          border: "1px solid var(--color-border)",
          background:
            "linear-gradient(180deg, rgba(24,24,24,0.98) 0%, rgba(14,14,14,0.98) 100%)",
          overflow: "hidden",
          cursor: touchMode ? "pointer" : "none",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        {showExpandedState ? (
          <div
            style={{
              position: "relative",
              height: "clamp(172px, 18vw, 218px)",
              overflow: "hidden",
            }}
          >
            <img
              src={MEDIA_ASSETS.academy.heroImage}
              alt={course.title}
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
                poster={MEDIA_ASSETS.academy.heroImage}
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
                <source src={PLACEHOLDER_WEBM} type="video/webm" />
              </video>
            ) : null}
          </div>
        ) : null}

        {showExpandedState ? (
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(255,75,75,0) 0%, rgba(211,32,39,0.52) 48%, rgba(122,0,0,0) 100%)",
            }}
          />
        ) : null}

        <div
          style={{
            display: "grid",
            gap: showExpandedState ? "12px" : "18px",
            padding: showExpandedState ? "18px" : "clamp(24px, 5vw, 36px)",
            alignContent: "start",
          }}
        >
          <div style={{ display: "grid", gap: "10px" }}>
            {!showExpandedState ? (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-red)",
                }}
              >
                Certified Program
              </p>
            ) : null}
            <div style={{ display: "grid", gap: "10px", flex: 1 }}>
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
                      ? "clamp(20px, 2.5vw, 26px)"
                      : "clamp(20px, 4vw, 22px)",
                    letterSpacing: "-0.03em",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {course.title}
                </h3>
                {showExpandedState ? (
                  <span
                    aria-hidden="true"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,75,75,0.28)",
                      background: "var(--gradient-brand-red)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 2px 8px 0 rgba(211,32,39,0.16)",
                    }}
                  >
                    <ArrowRight
                      size={13}
                      strokeWidth={1.8}
                      style={{ color: "#fff" }}
                    />
                  </span>
                ) : null}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: showExpandedState ? "13px" : "14px",
                  lineHeight: 1.7,
                  color: "var(--color-text-secondary)",
                }}
              >
                {course.description}
              </p>
            </div>
          </div>

          {!showExpandedState ? (
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                }}
              >
                <Clock
                  size={13}
                  strokeWidth={1.5}
                  style={{ color: "var(--color-brand-red)" }}
                />
                {course.duration}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                }}
              >
                <Wifi
                  size={13}
                  strokeWidth={1.5}
                  style={{ color: "var(--color-brand-red)" }}
                />
                {course.format}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                }}
              >
                <Award
                  size={13}
                  strokeWidth={1.5}
                  style={{ color: "var(--color-brand-red)" }}
                />
                {course.credential}
              </span>
            </div>
          ) : null}

          {showExpandedState ? (
            <div
              style={{
                borderRadius: "14px",
                border: "1px solid rgba(255,75,75,0.24)",
                background: "rgba(211,32,39,0.10)",
                padding: "12px",
                display: "grid",
                gap: "6px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-red-light)",
                }}
              >
                Outcome Focus
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  lineHeight: 1.6,
                  color: "var(--color-text-secondary)",
                }}
              >
                Portfolio proof, interview confidence, and role-ready execution
                habits.
              </p>
            </div>
          ) : null}
        </div>

        <div
          style={{
            padding: showExpandedState
              ? "0 18px 18px"
              : "0 clamp(24px, 5vw, 36px) clamp(24px, 5vw, 36px)",
          }}
        >
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
              color: showExpandedState
                ? "var(--color-text-primary)"
                : "var(--color-brand-red)",
            }}
          >
            {showExpandedState ? "Open Program" : "View Program"}
            <ArrowRight size={13} strokeWidth={1.5} />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <div className="grid-card-2" style={{ gap: "20px", overflow: "visible" }}>
        {courses.map((course) => {
          const isExpanded = expandedSlug === course.slug;

          return (
            <div
              key={course.slug}
              onMouseEnter={() => beginHoverIntent(course.slug)}
              onMouseLeave={() => cancelHoverIntent(course.slug)}
              style={{
                position: "relative",
                minHeight: touchMode ? "auto" : DESKTOP_COLLAPSED_HEIGHT,
                zIndex: !touchMode && isExpanded ? 30 : 1,
              }}
            >
              {renderCard(course, isExpanded)}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {touchMode && expandedCourse ? (
          <motion.div
            key={`${expandedCourse.slug}-overlay`}
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
                  border: "1px solid rgba(255,75,75,0.42)",
                  background: "rgba(10,10,10,0.72)",
                  color: "var(--color-text-primary)",
                  zIndex: 3,
                }}
              >
                x
              </button>
              {renderCard(expandedCourse, true, true)}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
