"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowLeftRight, ChevronLeft, ChevronRight } from "lucide-react";

export type PortfolioProject = {
  slug: string;
  title: string;
  tag: string;
  before: string;
  after?: string;
  description: string;
};

export default function PortfolioGallery({ projects }: { projects: PortfolioProject[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pos, setPos] = useState(50);
  const [transitioning, setTransitioning] = useState(false);
  const dragging = useRef(false);
  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealRaf = useRef<number | null>(null);
  const posRef = useRef(pos);
  posRef.current = pos;
  const active = activeIndex !== null ? projects[activeIndex] : null;

  const stopReveal = useCallback(() => {
    if (revealRaf.current !== null) {
      cancelAnimationFrame(revealRaf.current);
      revealRaf.current = null;
    }
  }, []);

  const animateTo = useCallback(
    (target: number) => {
      stopReveal();
      const startPos = posRef.current;
      const distance = Math.abs(target - startPos);
      if (distance < 0.5) {
        setPos(target);
        return;
      }
      const duration = (distance / 100) * 2200;
      const startTime = performance.now();
      const tick = (now: number) => {
        if (dragging.current) {
          revealRaf.current = null;
          return;
        }
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setPos(startPos + (target - startPos) * eased);
        if (t < 1) {
          revealRaf.current = requestAnimationFrame(tick);
        } else {
          revealRaf.current = null;
        }
      };
      revealRaf.current = requestAnimationFrame(tick);
    },
    [stopReveal],
  );

  const close = useCallback(() => setActiveIndex(null), []);
  const scheduleSwitch = useCallback(
    (compute: (i: number) => number) => {
      stopReveal();
      if (switchTimer.current) clearTimeout(switchTimer.current);
      setTransitioning(true);
      switchTimer.current = setTimeout(() => {
        setPos(0);
        setActiveIndex((i) => (i === null ? 0 : compute(i)));
        switchTimer.current = null;
      }, 320);
    },
    [stopReveal],
  );
  const next = useCallback(() => {
    scheduleSwitch((i) => (i + 1) % projects.length);
  }, [scheduleSwitch, projects.length]);
  const prev = useCallback(() => {
    scheduleSwitch((i) => (i - 1 + projects.length) % projects.length);
  }, [scheduleSwitch, projects.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    setPos(0);
    const fadeTimer = setTimeout(() => setTransitioning(false), 260);
    const startDelay = 800;
    const duration = 2200;
    const startTime = performance.now();
    const tick = (now: number) => {
      if (dragging.current) {
        revealRaf.current = null;
        return;
      }
      const elapsed = now - startTime - startDelay;
      if (elapsed < 0) {
        revealRaf.current = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setPos(eased * 100);
      if (t < 1) {
        revealRaf.current = requestAnimationFrame(tick);
      } else {
        revealRaf.current = null;
      }
    };
    revealRaf.current = requestAnimationFrame(tick);
    return () => {
      stopReveal();
      clearTimeout(fadeTimer);
    };
  }, [activeIndex, stopReveal]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  const updatePosFromClientX = useCallback((clientX: number) => {
    const box = imageBoxRef.current?.getBoundingClientRect();
    if (!box) return;
    const pct = ((clientX - box.left) / box.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePosFromClientX(x);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [active, updatePosFromClientX]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((p, i) => (
          <motion.button
            key={p.slug}
            type="button"
            onClick={() => {
              setPos(0);
              setActiveIndex(i);
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-brand/20 transition-all duration-300 aspect-[4/3] cursor-pointer text-left"
          >
            <Image
              src={p.before}
              alt={p.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-brand to-brand-hover text-white text-xs font-semibold rounded-full shadow-lg shadow-brand/40">
              <ArrowLeftRight size={12} />
              Before &amp; After
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full mb-2">
                {p.tag}
              </span>
              <h3 className="text-xl font-bold text-white">{p.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-ink-900 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl"
            >
              <motion.div
                layout
                transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
                className="flex justify-between items-start gap-4 p-4 sm:p-6 border-b border-white/10"
              >
                <div className="min-w-0 flex-1">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active.slug}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {active.title}
                      </h2>
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3">
                        {active.description}
                      </p>
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-brand to-brand-hover text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg shadow-brand/40">
                        {active.tag}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 hover:bg-red-700 hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg shadow-red-600/40 flex-shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              </motion.div>

              <div className="px-4 sm:px-6 py-6">
                <div
                  ref={imageBoxRef}
                  className="relative h-[400px] sm:h-[500px] w-full overflow-hidden rounded-xl bg-ink-700 select-none"
                  onMouseDown={(e) => {
                    dragging.current = true;
                    updatePosFromClientX(e.clientX);
                  }}
                  onTouchStart={(e) => {
                    dragging.current = true;
                    updatePosFromClientX(e.touches[0].clientX);
                  }}
                >
                  {active.after && (
                    <Image
                      key={`after-${active.slug}`}
                      src={active.after}
                      alt={`${active.title} - After`}
                      fill
                      sizes="(max-width: 640px) 100vw, 1024px"
                      className="object-cover pointer-events-none"
                      priority
                    />
                  )}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
                  >
                    <Image
                      key={`before-${active.slug}`}
                      src={active.before}
                      alt={`${active.title} - Before`}
                      fill
                      sizes="(max-width: 640px) 100vw, 1024px"
                      className="object-cover"
                      priority
                    />
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      animateTo(0);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className={`absolute top-3 left-3 sm:top-4 sm:left-4 z-30 px-5 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-bold rounded-full uppercase tracking-wider transition-all duration-300 ${
                      pos <= 50
                        ? "bg-gradient-to-r from-brand to-brand-hover text-white shadow-lg shadow-brand/50 scale-105"
                        : "bg-black/70 backdrop-blur-sm text-white hover:bg-black/90"
                    }`}
                  >
                    Before
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      animateTo(100);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-30 px-5 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-bold rounded-full uppercase tracking-wider transition-all duration-300 ${
                      pos > 50
                        ? "bg-gradient-to-r from-brand to-brand-hover text-white shadow-lg shadow-brand/50 scale-105"
                        : "bg-black/70 backdrop-blur-sm text-white hover:bg-black/90"
                    }`}
                  >
                    After
                  </button>

                  <div
                    className="absolute top-0 bottom-0 pointer-events-none cursor-ew-resize z-20"
                    style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
                  >
                    <div
                      className="h-full w-[6px] drop-shadow-[0_0_14px_rgba(233,117,36,1)]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, #E97524 60%, transparent 60%)",
                        backgroundSize: "6px 18px",
                      }}
                    />
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand ring-2 ring-white/50 shadow-lg shadow-brand/70" />
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand ring-2 ring-white/50 shadow-lg shadow-brand/70" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-hover ring-2 ring-white shadow-[0_0_18px_rgba(233,117,36,1)] animate-pulse" />
                  </div>

                  {projects.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          prev();
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        aria-label="Previous project"
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md hover:bg-white/20 transition-all duration-300 flex items-center justify-center hover:scale-110 border border-white/20 z-30"
                      >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          next();
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        aria-label="Next project"
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md hover:bg-white/20 transition-all duration-300 flex items-center justify-center hover:scale-110 border border-white/20 z-30"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </button>
                    </>
                  )}

                  <div
                    className={`absolute inset-0 bg-ink-900 pointer-events-none z-40 transition-opacity duration-300 ${
                      transitioning ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
