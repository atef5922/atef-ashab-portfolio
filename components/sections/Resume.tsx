"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  Award,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Maximize2,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { getResumeData } from "@/controllers/resume.controller";
import type { CertificationEntry } from "@/models/resume";

const experienceStack = [
  "JavaScript",
  "React",
  "Next.js",
  "WordPress",
  "PostgreSQL",
  "Supabase",
  "REST APIs",
];

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55 },
};

function SectionTitle({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <div className="resume-subheading section-heading-spacing mx-auto max-w-xl text-center">
      <p className="text-[0.65rem] font-semibold tracking-[0.24em] text-primary uppercase">
        {index}
      </p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h3>
      <div
        aria-hidden="true"
        className="mx-auto mt-3 h-0.5 w-14 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
      />
      <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  );
}

function TimelineMarker({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="timeline-marker absolute top-0 left-0 z-10 flex size-10 items-center justify-center rounded-full border border-primary/35 bg-background text-primary shadow-[0_0_0_5px_var(--background),0_10px_30px_rgba(99,102,241,0.2)] sm:size-11">
      <Icon className="size-[1.1rem]" strokeWidth={1.8} />
    </span>
  );
}

function TimelineRail({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto max-w-5xl">
      <span
        aria-hidden="true"
        className="timeline-rail absolute top-5 bottom-0 left-5 w-px bg-gradient-to-b from-primary/55 via-primary/20 to-transparent sm:left-[1.35rem]"
      />
      {children}
    </div>
  );
}

function PremiumCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`resume-card relative overflow-hidden rounded-2xl border border-border/90 border-l-2 border-l-primary bg-card/80 shadow-[0_20px_60px_rgba(2,6,23,0.16)] backdrop-blur-sm transition-[transform,border-color,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:border-l-primary hover:bg-card hover:shadow-[0_24px_70px_rgba(79,70,229,0.12)] motion-reduce:transform-none ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/45 via-violet-400/15 to-transparent"
      />
      {children}
    </div>
  );
}

function CertificateCarousel({ certificates }: { certificates: CertificationEntry[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewHeaderHeight, setPreviewHeaderHeight] = useState(48);
  const galleryRef = useRef<HTMLDivElement>(null);
  const previewTriggerRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swipedAt = useRef<number | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const isInView = useInView(galleryRef, { amount: 0.25 });
  const activeCertificate = certificates[activeIndex];
  const autoplayEnabled = isInView && !isPreviewOpen && certificates.length > 1;

  useEffect(() => {
    if (!autoplayEnabled) return;
    let timer: number | undefined;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const schedule = () => {
      window.clearTimeout(timer);
      if (!document.hidden && !motionPreference.matches) {
        timer = window.setTimeout(() => {
          setActiveIndex((current) => (current + 1) % certificates.length);
        }, 5200);
      }
    };
    schedule();
    document.addEventListener("visibilitychange", schedule);
    motionPreference.addEventListener("change", schedule);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
      motionPreference.removeEventListener("change", schedule);
    };
    // Manual navigation starts a fresh reading interval as well.
  }, [activeIndex, autoplayEnabled, certificates.length]);

  const measurePreviewHeader = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    // Leave room for the actual heading, including wrapped course names.
    const observer = new ResizeObserver(() => {
      setPreviewHeaderHeight(node.offsetHeight);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const showPrevious = () => setActiveIndex((current) => (current - 1 + certificates.length) % certificates.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % certificates.length);

  if (!activeCertificate) return null;
  const previewRatio = activeCertificate.imageWidth / activeCertificate.imageHeight;

  const openPreview = (event: React.MouseEvent<HTMLButtonElement>) => {
    previewTriggerRef.current = event.currentTarget;
    setIsPreviewOpen(true);
  };

  return (
    <div
      ref={galleryRef}
      id="certificate-gallery"
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Professional certificates"
      onKeyDown={(event) => {
        if (isPreviewOpen) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          if (event.key === "ArrowLeft") showPrevious();
          else showNext();
        }
      }}
    >
      <PremiumCard className="bg-card/95 hover:translate-y-0">
        <div className="flex items-center justify-between gap-3 border-b border-border/75 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)]" />
            <span className="text-[0.65rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Course certificates
            </span>
          </div>
          <span className="shrink-0 font-mono text-xs font-medium tabular-nums text-muted-foreground" aria-hidden="true">
            <span className="text-foreground">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="mx-1.5 text-muted-foreground/50">/</span>
            {String(certificates.length).padStart(2, "0")}
          </span>
        </div>

        <motion.article
          role="group"
          aria-roledescription="slide"
          aria-label={`${activeIndex + 1} of ${certificates.length}: ${activeCertificate.title}`}
          initial={{ opacity: reduceMotion ? 1 : 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="certificate-slide grid min-w-0 md:min-h-[28rem] md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
          onTouchStart={(event) => {
            swipedAt.current = null;
            const touch = event.touches[0];
            touchStart.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
          }}
          onTouchCancel={() => { touchStart.current = null; }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start || event.touches.length || !window.matchMedia("(max-width: 1023px)").matches) return;
            const touch = event.changedTouches[0];
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              swipedAt.current = performance.now();
              if (dx < 0) showNext(); else showPrevious();
            }
          }}
          onClickCapture={(event) => {
            // Ignore only the compatibility click generated by this swipe.
            // Later taps and keyboard activation must still open the preview.
            if (event.detail > 0 && swipedAt.current !== null && performance.now() - swipedAt.current < 350) {
              event.preventDefault();
              event.stopPropagation();
            }
            swipedAt.current = null;
          }}
        >
          <div className="flex min-w-0 items-center p-4 sm:p-5 lg:p-6">
            <button
              type="button"
              onClick={openPreview}
              className="group/image relative block aspect-[1.42/1] w-full cursor-zoom-in overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_-15px_rgba(0,0,0,0.35)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-card"
              aria-label={`Open full preview of ${activeCertificate.title}`}
            >
              <motion.span key={activeCertificate.image} initial={{ opacity: reduceMotion ? 1 : 0.4 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.3 }} className="absolute inset-0">
                <Image
                  src={activeCertificate.image}
                  alt={`${activeCertificate.title} certificate issued by ${activeCertificate.issuer}`}
                  fill
                  sizes="(min-width: 768px) 42vw, (min-width: 640px) 75vw, 90vw"
                  className="object-contain p-2 sm:p-3"
                />
              </motion.span>
              <span className="absolute right-2 bottom-2 inline-flex size-9 items-center justify-center rounded-full bg-slate-950/75 text-white shadow-sm transition-colors group-hover/image:bg-primary group-focus-visible/image:bg-primary sm:right-3 sm:bottom-3">
                <Maximize2 className="size-4" aria-hidden="true" />
              </span>
            </button>
          </div>

          <div className="certificate-details flex min-h-[18.5rem] min-w-0 flex-col items-start justify-center border-t border-border/65 px-5 py-5 sm:px-6 md:min-h-0 md:border-t-0 md:border-l lg:py-7">
            <div className="mb-3 flex items-center gap-2.5 text-indigo-300">
              <Award className="size-5 shrink-0" strokeWidth={1.6} aria-hidden="true" />
              <p className="text-[0.6rem] leading-4 font-semibold tracking-[0.12em] uppercase">Certificate of completion</p>
            </div>
            <h4 className="text-xl leading-snug font-bold tracking-tight sm:text-2xl lg:text-[1.55rem]">
              {activeCertificate.title}
            </h4>
            <dl className="mt-4 w-full border-t border-border/65 pt-3.5">
              <div>
                <dt className="text-[0.65rem] font-medium text-muted-foreground max-lg:sr-only">Issued by</dt>
                <dd className="mt-1 text-sm leading-5 font-semibold">{activeCertificate.issuer}</dd>
              </div>
              {activeCertificate.date && (
                <div className="mt-2">
                  <dt className="sr-only">Issue date</dt>
                  <dd className="flex items-center gap-1.5 text-xs leading-5 text-muted-foreground">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    {activeCertificate.date}
                  </dd>
                </div>
              )}
            </dl>
            <button
              type="button"
              onClick={openPreview}
              className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full border border-indigo-400/40 bg-gradient-to-br from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_-8px_rgba(99,102,241,0.6)] transition-[border-color,box-shadow] hover:border-indigo-300 hover:shadow-[0_8px_24px_-8px_rgba(99,102,241,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              View certificate
              <Maximize2 className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </motion.article>

        <div className="certificate-controls flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-border/75 bg-background/20 px-4 py-2.5 sm:px-6 sm:py-3">
          <span className="text-xs text-muted-foreground lg:hidden">Swipe to explore</span>
          <div className="hidden items-center lg:flex" aria-label="Choose certificate">
            {certificates.map((certificate, index) => (
              <button
                key={certificate.image}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${certificate.title}`}
                title={certificate.title}
                aria-current={index === activeIndex ? "true" : undefined}
                className="group flex h-11 w-6 cursor-pointer items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span aria-hidden="true" className={`h-1.5 rounded-full transition-[width,background-color] duration-200 ${index === activeIndex ? "w-5 bg-primary" : "w-2 bg-muted-foreground/30 group-hover:bg-primary/65"}`} />
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button type="button" onClick={showPrevious} disabled={certificates.length < 2} className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-default disabled:opacity-40" aria-label="Previous certificate">
              <ChevronLeft className="size-4" />
            </button>
            <button type="button" onClick={showNext} disabled={certificates.length < 2} className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-indigo-400/40 bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-[0_5px_18px_-8px_rgba(99,102,241,0.7)] transition-colors hover:border-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:cursor-default disabled:opacity-40" aria-label="Next certificate">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
        <p className="sr-only" aria-live={autoplayEnabled ? "off" : "polite"} aria-atomic="true">
          Certificate {activeIndex + 1} of {certificates.length}: {activeCertificate.title}
        </p>
      </PremiumCard>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent
          finalFocus={previewTriggerRef}
          style={{ width: `min(calc(100vw - 2rem), 72rem, calc((95svh - ${previewHeaderHeight}px - 2.75rem - 2px) * ${previewRatio} + 2rem + 2px))` }}
          className="max-h-[95svh] max-w-none gap-3 overflow-y-auto border border-border bg-card p-4 shadow-2xl sm:max-w-none"
        >
          <div ref={measurePreviewHeader} className="pr-9">
            <DialogTitle className="text-base leading-snug font-semibold">{activeCertificate.title}</DialogTitle>
            <DialogDescription className="mt-1 text-xs">{activeCertificate.issuer}</DialogDescription>
          </div>
          <div className="relative w-full overflow-hidden rounded-lg bg-white" style={{ aspectRatio: `${activeCertificate.imageWidth} / ${activeCertificate.imageHeight}` }}>
            <Image src={activeCertificate.image} alt={`${activeCertificate.title} certificate issued by ${activeCertificate.issuer}`} fill sizes={`(max-width: 640px) 95vw, ${95 * previewRatio}vh`} className="object-contain" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Resume() {
  const resume = getResumeData();

  return (
    <section id="resume" className="section-spacing relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12">
        <motion.header {...reveal} className="section-heading-spacing mx-auto max-w-2xl text-center">
          <span className="eyebrow">Resume</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Professional Journey
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            A focused overview of my professional experience, continued learning, and academic foundation.
          </p>
        </motion.header>

        <div className="space-y-10 sm:space-y-12">
          <motion.section
            id="resume-experience"
            {...reveal}
            aria-labelledby="experience-heading"
          >
            <div id="experience-heading">
              <SectionTitle
                index="01"
                title="Experience"
                description="Professional work, responsibilities, and the technologies I use to deliver reliable products."
              />
            </div>

            <TimelineRail>
              {resume.experience.map((entry) => (
                <article
                  key={`${entry.title}-${entry.company}`}
                  className="timeline-entry relative pl-13 sm:pl-17"
                >
                  <TimelineMarker icon={BriefcaseBusiness} />
                  <PremiumCard className="p-4 sm:p-6 lg:p-7">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div>
                        <h4 className="text-base font-bold tracking-tight sm:text-xl">
                          {entry.title}
                        </h4>
                        <p className="mt-1 text-xs font-semibold text-primary sm:text-base">
                          {entry.company}
                        </p>
                      </div>
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[0.7rem] font-semibold text-primary sm:px-3 sm:py-1.5 sm:text-xs">
                        <CalendarDays className="size-3.5" />
                        {entry.dateRange}
                      </span>
                    </div>

                    <ul className="mt-3 space-y-2 sm:mt-6 sm:space-y-3">
                      {entry.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-[0.8rem] leading-5 text-muted-foreground sm:gap-3 sm:text-[0.95rem] sm:leading-7"
                        >
                          <span className="mt-1 flex size-3.5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary sm:mt-1.5 sm:size-4">
                            <Check className="size-2.5" strokeWidth={2.5} />
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-nowrap gap-1.5 overflow-x-auto border-t border-border/75 pt-3 [scrollbar-width:none] sm:mt-6 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:pt-5 [&::-webkit-scrollbar]:hidden">
                      {experienceStack.map((technology) => (
                        <span
                          key={technology}
                          className="shrink-0 rounded-full border border-border bg-background/55 px-2 py-1 text-[0.65rem] font-semibold text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:bg-primary/8 hover:text-primary sm:px-3 sm:py-1.5 sm:text-[0.7rem]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </PremiumCard>
                </article>
              ))}
            </TimelineRail>
          </motion.section>

          <motion.section
            id="resume-certifications"
            {...reveal}
            aria-labelledby="certifications-heading"
          >
            <div id="certifications-heading">
              <SectionTitle
                index="02"
                title="Courses & Certifications"
                description="Verified credentials from recognized learning platforms, presented as an interactive certificate gallery."
              />
            </div>

            <div className="relative mx-auto max-w-5xl">
              <span aria-hidden="true" className="absolute top-5 bottom-0 left-[1.35rem] hidden w-px bg-gradient-to-b from-primary/55 via-primary/20 to-transparent sm:block" />
              <div className="relative sm:pl-17">
                <div className="hidden sm:block"><TimelineMarker icon={Award} /></div>
                <CertificateCarousel certificates={resume.certifications} />
              </div>
            </div>
          </motion.section>

          <motion.section
            id="resume-education"
            {...reveal}
            aria-labelledby="education-heading"
          >
            <div id="education-heading">
              <SectionTitle
                index="03"
                title="Education"
                description="The academic milestones that built my foundation in computing and problem solving."
              />
            </div>

            <TimelineRail>
              <div className="space-y-4 sm:space-y-5">
                {resume.education.map((entry, index) => (
                  <motion.article
                    key={`${entry.degree}-${entry.school}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.42, delay: index * 0.06 }}
                    className="timeline-entry relative pl-13 sm:pl-17"
                  >
                    <TimelineMarker icon={GraduationCap} />
                    <PremiumCard className="p-5 sm:p-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                        <div>
                          <h4 className="text-base font-bold tracking-tight sm:text-lg">
                            {entry.degree}
                          </h4>
                          <p className="mt-1 text-sm font-semibold text-primary">
                            {entry.school}
                          </p>
                        </div>
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-semibold text-primary">
                          <CalendarDays className="size-3.5" />
                          {entry.dateRange}
                        </span>
                      </div>
                      <p className="mt-4 border-t border-border/70 pt-4 text-sm leading-6 text-muted-foreground sm:text-[0.95rem] sm:leading-7">
                        {entry.description}
                      </p>
                    </PremiumCard>
                  </motion.article>
                ))}
              </div>
            </TimelineRail>
          </motion.section>
        </div>
      </div>
    </section>
  );
}
