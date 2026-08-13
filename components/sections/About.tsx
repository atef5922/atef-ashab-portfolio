"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Building2, Download, Eye, GraduationCap, Mail, MapPin, Sparkles, type LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { profile } from "@/models/profile";

const featuredDetails: Record<string, LucideIcon> = {
  Role: Briefcase,
  Company: Building2,
  Degree: GraduationCap,
  City: MapPin,
};

const featuredLabels = ["Role", "Company", "Degree", "City"];

export default function About() {
  const details = featuredLabels.flatMap((label) => {
    const detail = profile.bioDetails.find((item) => item.label === label);
    return detail ? [detail] : [];
  });

  return (
    <section id="about" className="relative isolate overflow-hidden py-12 sm:py-14 lg:py-16">
      <div aria-hidden="true" className="absolute top-1/2 -left-48 -z-10 size-96 -translate-y-1/2 rounded-full bg-indigo-500/8 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12">
        {/*
          The photo only moves beside the text from `xl`. Below that the content
          column would be ~368px — too narrow for the headline to sit on one line
          at a readable size — so the photo stacks above and the text gets the
          full width.
        */}
        <div className="grid items-start gap-8 xl:grid-cols-[minmax(17rem,19rem)_minmax(0,1fr)] xl:gap-x-12 xl:gap-y-5 2xl:gap-x-14">
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="order-1 w-full max-w-[52rem] xl:col-start-2 xl:row-start-1"
          >
            <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.22em] text-primary uppercase">
              <Sparkles className="size-3.5" />
              Get to know me
            </span>
            <h2 className="mt-1.5 text-3xl font-bold tracking-tight sm:text-4xl">About me</h2>
            <span aria-hidden="true" className="mt-4 block h-px w-16 bg-gradient-to-r from-primary to-violet-400/20" />
          </motion.header>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="relative order-2 mx-auto w-full max-w-[19rem] xl:col-start-1 xl:row-start-2 xl:mx-0"
          >
            <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-indigo-500/18 via-transparent to-fuchsia-500/16 blur-xl" />
            <div className="relative rounded-[1.7rem] border border-white/10 bg-gradient-to-br from-indigo-500/70 via-violet-500/25 to-fuchsia-500/60 p-px shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
              <div className="rounded-[calc(1.7rem-1px)] bg-background p-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-surface-strong">
                  <Image
                    src={profile.profileImage}
                    alt="Md Atef Ashab Sifat, Full Stack Web Developer"
                    fill
                    sizes="(min-width: 1024px) 304px, min(304px, calc(100vw - 48px))"
                    quality={100}
                    className="object-cover object-[50%_17%] transition-transform duration-700 hover:scale-[1.025]"
                  />
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
                    <div className="min-w-0">
                      <p className="truncate font-semibold">Md Atef Ashab Sifat</p>
                      <p className="mt-0.5 text-xs text-white/60">Full Stack Developer</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-black/30 px-2.5 py-1.5 text-[0.68rem] font-medium backdrop-blur-md">
                      <span className="relative flex size-2" aria-hidden="true">
                        <span className="absolute size-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />
                        <span className="relative size-2 rounded-full bg-emerald-400" />
                      </span>
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute -right-3 -bottom-3 -z-10 h-24 w-24 rounded-br-[2rem] border-r border-b border-violet-400/45" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="@container/bio order-3 min-w-0 w-full max-w-[52rem] xl:col-start-2 xl:row-start-2"
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Full Stack Web Developer</p>
            {/*
              Sized from this column's own width, not the viewport: the headline
              measures 27.9em, so anything at or under 3.58% of the column fits on
              one line. 3.44cqi keeps a ~4% margin for font fallback. Below `sm`
              the column is too narrow for one line at a readable size, so it wraps.
            */}
            <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-[clamp(1.2rem,3.44cqi,2rem)]">
              Building thoughtful web products, from interface to backend.
            </h3>
            <p className="mt-4 text-justify text-sm leading-6 text-muted-foreground sm:text-[0.95rem] sm:leading-7">
              I&apos;m Md Atef Ashab Sifat, a Full Stack Web Developer at Mugnee IT Solutions and a Computer Science graduate from Daffodil International University.
              I turn practical requirements into responsive interfaces and dependable backend solutions that are clear, maintainable, and built for real-world use.
            </p>
            <p className="mt-3 text-justify text-sm leading-6 text-muted-foreground sm:text-[0.95rem] sm:leading-7">
              My experience spans JavaScript, React, WordPress, SQL, and core web technologies. I care about clean architecture, thoughtful user experiences, and continuous improvement while deepening my expertise in the MERN stack and Java.
            </p>

            <dl className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {details.map((detail) => {
                const Icon = featuredDetails[detail.label];
                return (
                  <div
                    key={detail.label}
                    className="group flex min-w-0 items-center gap-2.5 rounded-2xl border border-border bg-surface px-3 py-2.5 transition-all duration-300 hover:border-primary/25 hover:bg-surface-strong"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/8 text-primary transition-colors duration-300 group-hover:bg-primary/12">
                      <Icon className="size-3.5" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[0.58rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">{detail.label}</dt>
                      <dd className="mt-0.5 line-clamp-2 text-[0.8rem] leading-4 font-semibold text-foreground" title={detail.value}>{detail.value}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group h-10 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-white shadow-[0_10px_26px_rgba(79,70,229,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(79,70,229,0.32)]",
                )}
              >
                <Mail className="size-3.5" />
                Let&apos;s talk
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={profile.cvUrl}
                download
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "group h-10 rounded-full border-border bg-surface px-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-surface-strong",
                )}
              >
                <Download className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                Download CV
              </a>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "group h-10 rounded-full border-border bg-surface px-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-surface-strong",
                )}
              >
                <Eye className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
                View CV
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
