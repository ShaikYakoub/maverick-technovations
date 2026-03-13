"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Award, Clock, Wifi } from "lucide-react";
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
const VIDEO_START_DELAY_MS = 2000;

export default function ExpandableAcademyGrid({
  courses,
}: ExpandableAcademyGridProps) {
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

  const expandedCourse = useMemo(
    () => courses.find((course) => course.slug === expandedSlug),
    [courses, expandedSlug],
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

  const navigateToCourse = (slug: string) => {
    setExpandedSlug(null);
    router.push(`/academy/${slug}`);
  };

  return (
    <LayoutGroup>
      <div className="grid-card-2" style={{ gap: "20px" }}>
        {courses.map((course) => {
          const isExpanded = expandedSlug === course.slug;

          return (
            <motion.button
              key={course.slug}
              type="button"
              layoutId={`academy-card-${course.slug}`}
              onHoverStart={() => beginHoverIntent(course.slug)}
              onHoverEnd={() => cancelHoverIntent(course.slug)}
              onClick={() => {
                if (touchMode) {
                  setExpandedSlug(course.slug);
                }
              }}
              whileHover={touchMode ? undefined : { y: -10 }}
              transition={{
                y: { type: "spring", stiffness: 320, damping: 28 },
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "clamp(24px, 5vw, 36px)",
                borderRadius: "18px",
                border: "1px solid var(--color-border)",
                background: "var(--color-dark-elevated)",
                textDecoration: "none",
                transition: "border-color 0.2s",
                textAlign: "left",
                cursor: "none",
                minHeight: "100%",
                visibility: isExpanded ? "hidden" : "visible",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-brand-red)",
                    marginBottom: "10px",
                  }}
                >
                  Certified Program
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(20px, 4vw, 22px)",
                    letterSpacing: "-0.02em",
                    color: "var(--color-text-primary)",
                    marginBottom: "12px",
                  }}
                >
                  {course.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {course.description}
                </p>
              </div>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
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
                  color: "var(--color-brand-red)",
                  marginTop: "auto",
                }}
              >
                View Program
                <ArrowRight size={13} strokeWidth={1.5} />
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {expandedCourse ? (
          <motion.div
            key={`${expandedCourse.slug}-overlay`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setExpandedSlug(null)}
            className={touchMode ? "backdrop-blur-md bg-black/80" : undefined}
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
              layoutId={`academy-card-${expandedCourse.slug}`}
              onMouseLeave={() => {
                if (!touchMode) setExpandedSlug(null);
              }}
              onClick={(event) => {
                event.stopPropagation();
                navigateToCourse(expandedCourse.slug);
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
                  src={MEDIA_ASSETS.academy.heroImage}
                  alt={expandedCourse.title}
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
                      {expandedCourse.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(13px, 2.8vw, 15px)",
                        lineHeight: 1.65,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {expandedCourse.description}
                    </p>
                  </div>

                  <Link
                    href={`/academy/${expandedCourse.slug}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      navigateToCourse(expandedCourse.slug);
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
                    View Program
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
                  Structured modules, mentor checkpoints, practical assignments,
                  and portfolio-ready projects designed to move you from learner
                  to operator with placement-grade confidence.
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LayoutGroup>
  );
}
