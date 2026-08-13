"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { SiNextdotjs, SiPostgresql, SiReact, SiWordpress } from "react-icons/si";
import type { IconType } from "react-icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTypewriter } from "@/hooks/useTypewriter";
import { profile } from "@/models/profile";
import portfolioBanner from "@/public/assets/portfolio_banner.webp";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.09,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: "easeOut" },
  },
};

const selectedStack: { name: string; icon: IconType; color?: string }[] = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "WordPress", icon: SiWordpress, color: "#21759B" },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const typedRole = useTypewriter(profile.typedRoles, {
    typingSpeed: 80,
    erasingSpeed: 42,
    pauseDuration: 1800,
    enabled: !prefersReducedMotion,
  });
  const city = profile.bioDetails.find((detail) => detail.label === "City")?.value;
  const isAvailable = profile.bioDetails.find((detail) => detail.label === "Freelance")?.value === "Available";

  return (
    <section
      id="hero"
      className="relative isolate min-h-svh overflow-hidden bg-[#070b18] text-white md:min-h-[45rem] lg:h-[clamp(42.5rem,88svh,56.25rem)] lg:min-h-0"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[clamp(19rem,44svh,24rem)] sm:h-[clamp(26rem,58svh,32rem)] md:inset-0 md:h-auto"
      >
        <Image
          src={portfolioBanner}
          alt=""
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 1024px) calc(100vw - 18rem), 100vw"
          className="object-cover object-[68%_center] contrast-[1.04] saturate-[0.9] md:object-[65%_center] lg:object-[62%_center] xl:object-[56%_center]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,16,0.02)_0%,rgba(4,7,16,0.14)_38%,rgba(7,11,24,0.78)_72%,#070b18_100%)] md:hidden"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(6,10,24,0.96)_0%,rgba(6,10,24,0.82)_42%,rgba(6,10,24,0.28)_70%,rgba(6,10,24,0.1)_100%)] md:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(4,7,16,0.12)_0%,transparent_55%,rgba(4,7,16,0.76)_100%)] md:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background/80"
      />

      <motion.div
        variants={container}
        initial={prefersReducedMotion ? false : "hidden"}
        animate="show"
        className="relative z-10 mx-auto flex min-h-svh max-w-7xl items-end px-5 pt-24 pb-28 sm:px-8 sm:pt-72 sm:pb-28 md:min-h-[45rem] md:items-center md:px-10 md:py-24 lg:h-full lg:min-h-0 lg:px-10 xl:px-12"
      >
        <div className="w-full max-w-[38rem] sm:max-w-[32rem] md:max-w-[30rem] lg:max-w-[31rem] xl:max-w-[38rem]">
          <motion.div variants={item} className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {isAvailable && (
              <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3.5 text-xs font-medium text-white/90 backdrop-blur-md">
                <span className="relative flex size-2.5" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                  <span className="relative size-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.14)]" />
                </span>
                Available for work
              </span>
            )}
            {city && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60">
                <MapPin className="size-3.5 text-indigo-300" />
                {city}
              </span>
            )}
          </motion.div>

          <motion.p
            variants={item}
            className="mt-4 flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.28em] text-indigo-200 uppercase sm:mt-6 sm:text-xs"
          >
            <span className="h-px w-9 bg-indigo-300/80" />
            {profile.greeting}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-4 whitespace-nowrap text-[clamp(3.2rem,12vw,4.25rem)] leading-none font-bold tracking-[-0.055em] text-white sm:text-[4.25rem] md:text-[3.9rem] lg:text-[4.1rem] xl:text-[4.5rem]"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-3 flex min-h-11 items-center text-xl leading-tight font-medium text-white sm:mt-5 sm:min-h-9 sm:text-2xl sm:leading-none"
          >
            <span className="sr-only">I am a Full Stack Web Developer, Problem Solver, and Learner.</span>
            <span aria-hidden="true" className="text-white/72">
              I&apos;m a&nbsp;
            </span>
            <span
              aria-hidden="true"
              className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text font-semibold text-transparent"
            >
              {typedRole}
            </span>
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[1em] w-0.5 animate-pulse bg-indigo-300 align-[-0.08em] motion-reduce:animate-none"
            />
          </motion.div>

          <motion.p variants={item} className="mt-3 max-w-xl text-sm leading-6 text-white/62 sm:text-[0.95rem]">
            Turning ideas into fast, scalable web experiences.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-5 grid w-full max-w-[34rem] grid-cols-2 gap-2 sm:mt-7 sm:gap-2.5 xl:flex xl:max-w-none xl:flex-wrap xl:items-center"
          >
            <a
              href="#portfolio"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group relative isolate col-span-2 h-10 w-full gap-2 overflow-hidden rounded-full border border-indigo-300/25 bg-[linear-gradient(110deg,#6366f1_0%,#7c3aed_48%,#c026d3_100%)] bg-[length:180%_100%] px-3 text-white shadow-[0_12px_32px_rgba(79,70,229,0.3)] duration-300 hover:-translate-y-0.5 hover:bg-right hover:shadow-[0_16px_42px_rgba(124,58,237,0.42)] active:translate-y-0 active:scale-[0.98] sm:h-11 sm:px-3.5 xl:w-auto",
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/25 blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[520%]"
              />
              <span className="relative z-10 sm:hidden">View work</span>
              <span className="relative z-10 hidden sm:inline">View selected work</span>
              <span className="relative z-10 flex size-5 items-center justify-center rounded-full bg-white/15 ring-1 ring-inset ring-white/20 transition-colors duration-300 group-hover:bg-white/20 sm:size-6">
                <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-6 sm:size-3.5" />
              </span>
            </a>
            <a
              href="#contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "group h-10 w-full gap-2 rounded-full border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.045))] px-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_28px_rgba(7,11,24,0.18)] backdrop-blur-xl duration-300 hover:-translate-y-0.5 hover:border-violet-300/45 hover:bg-[linear-gradient(180deg,rgba(139,92,246,0.22),rgba(99,102,241,0.1))] hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_14px_34px_rgba(76,29,149,0.25)] active:translate-y-0 active:scale-[0.98] sm:h-11 sm:px-3.5 xl:w-auto",
              )}
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-indigo-400/15 ring-1 ring-inset ring-indigo-200/15 transition-all duration-300 group-hover:bg-indigo-400/25 group-hover:ring-indigo-200/30 sm:size-6">
                <Mail className="size-3 text-indigo-100 transition-transform duration-300 group-hover:scale-110 sm:size-3.5" />
              </span>
              Let&apos;s talk
            </a>
            <a
              href={profile.cvUrl}
              download
              className={cn(
                buttonVariants({ size: "lg", variant: "ghost" }),
                "group h-10 w-full gap-2 rounded-full border border-white/10 bg-black/15 px-3 text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/25 hover:bg-white/[0.09] hover:text-white hover:shadow-[0_12px_28px_rgba(7,11,24,0.22)] active:translate-y-0 active:scale-[0.98] sm:h-11 sm:px-3.5 xl:w-auto",
              )}
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:bg-fuchsia-400/15 group-hover:ring-fuchsia-200/20 sm:size-6">
                <Download className="size-3 transition-transform duration-300 group-hover:translate-y-0.5 sm:size-3.5" />
              </span>
              <span className="sm:hidden">CV</span>
              <span className="hidden sm:inline">Download CV</span>
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-7 hidden flex-col gap-3 border-t border-white/12 pt-5 sm:flex sm:flex-row sm:items-center sm:gap-5"
          >
            <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-white/42 uppercase">
              Selected stack
            </span>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-white/65" aria-label="Selected technologies">
              {selectedStack.map(({ name, icon: Icon, color }) => (
                <li
                  key={name}
                  className="relative flex items-center gap-1.5 before:absolute before:top-1/2 before:-left-2.5 before:size-0.5 before:rounded-full before:bg-indigo-300/70 first:before:hidden"
                >
                  <Icon className="size-3.5 shrink-0" style={color ? { color } : undefined} />
                  {name}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
