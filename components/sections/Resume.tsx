"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Award,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Maximize2,
  Pause,
  Play,
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
    <div className="mx-auto mb-8 max-w-xl text-center sm:mb-10">
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
    <span className="absolute top-0 left-0 z-10 flex size-10 items-center justify-center rounded-full border border-primary/35 bg-background text-primary shadow-[0_0_0_5px_var(--background),0_10px_30px_rgba(99,102,241,0.2)] sm:size-11">
      <Icon className="size-[1.1rem]" strokeWidth={1.8} />
    </span>
  );
}

function TimelineRail({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto max-w-5xl">
      <span
        aria-hidden="true"
        className="absolute top-5 bottom-0 left-5 w-px bg-gradient-to-b from-primary/55 via-primary/20 to-transparent sm:left-[1.35rem]"
      />
      {children}
    </div>
  );
}

function PremiumCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border/90 border-l-2 border-l-primary bg-card/80 shadow-[0_20px_60px_rgba(2,6,23,0.16)] backdrop-blur-sm transition-[transform,border-color,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:border-l-primary hover:bg-card hover:shadow-[0_24px_70px_rgba(79,70,229,0.12)] motion-reduce:transform-none ${className}`}
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
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const activeCertificate = certificates[activeIndex];
  const autoplayEnabled = !reduceMotion && !isPaused && !isInteracting && !isPreviewOpen;

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + certificates.length) % certificates.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % certificates.length);
  };

  useEffect(() => {
    if (!autoplayEnabled || certificates.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % certificates.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [autoplayEnabled, certificates.length]);

  if (!activeCertificate) return null;

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Professional certificates"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPrevious();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNext();
        }
      }}
    >
      <PremiumCard>
        <div className="flex items-center justify-between border-b border-border/75 px-3 py-2.5 sm:px-5 sm:py-3">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/55 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              Verified learning
            </span>
          </div>
          <span className="font-mono text-[0.68rem] font-semibold text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}
          </span>
        </div>

        <div className="relative min-h-[13rem] sm:min-h-[40rem] lg:min-h-[31rem]">
          <AnimatePresence initial={false} mode="wait">
            <motion.article
              key={activeCertificate.image}
              role="group"
              aria-roledescription="slide"
              aria-label={`${activeIndex + 1} of ${certificates.length}: ${activeCertificate.title}`}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -28 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 grid content-start sm:content-normal lg:grid-cols-[minmax(0,1.55fr)_minmax(17rem,0.65fr)]"
            >
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="group/image relative m-3 h-44 cursor-pointer overflow-hidden rounded-xl border border-black/8 bg-white shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:m-4 sm:h-auto lg:mr-0"
                aria-label={`Open full preview of ${activeCertificate.title}`}
              >
                <Image
                  src={activeCertificate.image}
                  alt={`${activeCertificate.title} certificate issued by ${activeCertificate.issuer}`}
                  fill
                  sizes="(min-width: 1280px) 650px, (min-width: 1024px) 52vw, (min-width: 640px) 80vw, 92vw"
                  className="object-contain p-2 transition-transform duration-500 group-hover/image:scale-[1.015] motion-reduce:transform-none sm:p-3"
                />
                <span className="absolute right-3 bottom-3 inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-white opacity-100 shadow-lg backdrop-blur-md transition-all duration-300 group-hover/image:scale-105 group-hover/image:bg-primary sm:opacity-0 sm:group-hover/image:opacity-100 sm:group-focus-visible/image:opacity-100">
                  <Maximize2 className="size-4" />
                </span>
              </button>

              <div className="hidden flex-col justify-start border-t border-border/75 p-4 sm:flex sm:justify-center sm:p-5 lg:border-t-0 lg:border-l lg:p-7">
                <span className="flex size-9 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_12px_30px_rgba(99,102,241,0.12)] sm:size-11">
                  <Award className="size-4 sm:size-5" strokeWidth={1.8} />
                </span>
                <p className="mt-3 hidden text-[0.65rem] font-semibold tracking-[0.18em] text-primary uppercase sm:mt-5 sm:block">
                  Certificate of completion
                </p>
                <h4 className="mt-1.5 text-lg leading-tight font-bold tracking-tight sm:mt-2 sm:text-2xl">
                  {activeCertificate.title}
                </h4>
                <div className="mt-3 border-t border-border/75 pt-3 sm:mt-5 sm:pt-4">
                  <p className="hidden text-[0.62rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase sm:block">
                    Issued by
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-foreground sm:text-base">
                    {activeCertificate.issuer}
                  </p>
                  {activeCertificate.date && (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5 text-primary" />
                      {activeCertificate.date}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="mt-4 hidden h-10 w-fit cursor-pointer items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/45 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_12px_32px_rgba(99,102,241,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:mt-6 sm:flex sm:h-11"
                >
                  View certificate
                  <Maximize2 className="size-3.5" />
                </button>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-3 border-t border-border/75 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-4">
          <div className="flex items-center gap-1.5" aria-label="Choose certificate">
            {certificates.map((certificate, index) => (
              <button
                key={certificate.image}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${certificate.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
                  index === activeIndex
                    ? "w-8 bg-primary"
                    : "w-3 bg-muted-foreground/25 hover:bg-primary/55"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPaused((current) => !current)}
              className="mr-1 inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-border bg-background/55 px-3 text-xs font-semibold text-muted-foreground transition-colors duration-250 hover:border-primary/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-10 sm:px-3.5"
              aria-label={isPaused ? "Resume automatic certificate slider" : "Pause automatic certificate slider"}
            >
              {isPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
              {isPaused ? "Play" : "Pause"}
            </button>
            <button
              type="button"
              onClick={showPrevious}
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-background/55 text-muted-foreground transition-all duration-250 hover:-translate-x-0.5 hover:border-primary/30 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transform-none sm:size-10"
              aria-label="Previous certificate"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-primary/30 bg-primary text-primary-foreground shadow-[0_10px_25px_rgba(99,102,241,0.2)] transition-all duration-250 hover:translate-x-0.5 hover:bg-primary/90 hover:shadow-[0_12px_30px_rgba(99,102,241,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card motion-reduce:transform-none sm:size-10"
              aria-label="Next certificate"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </PremiumCard>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-h-[92svh] max-w-6xl overflow-hidden border-white/10 bg-slate-950/95 p-2 text-white shadow-2xl backdrop-blur-xl sm:max-w-6xl">
          <DialogTitle className="sr-only">{activeCertificate.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Full-size certificate issued by {activeCertificate.issuer}
          </DialogDescription>
          <div className="relative aspect-[1.42/1] min-h-0 w-full overflow-hidden rounded-lg bg-white">
            <Image
              src={activeCertificate.image}
              alt={`${activeCertificate.title} certificate issued by ${activeCertificate.issuer}`}
              fill
              sizes="calc(100vw - 2rem)"
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Resume() {
  const resume = getResumeData();

  return (
    <section id="resume" className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12">
        <motion.header {...reveal} className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="eyebrow">Resume</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Professional Journey
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            A focused overview of my professional experience, continued learning, and academic foundation.
          </p>
        </motion.header>

        <div className="space-y-14 sm:space-y-16">
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
                  className="relative pl-13 sm:pl-17"
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

            <TimelineRail>
              <div className="relative pl-13 sm:pl-17">
                <TimelineMarker icon={Award} />
                <CertificateCarousel certificates={resume.certifications} />
              </div>
            </TimelineRail>
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
                    className="relative pl-13 sm:pl-17"
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
