"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Home,
  UserRound,
  Sparkles,
  FileText,
  FolderGit2,
  Briefcase,
  Mail,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import MobileNavigation from "@/components/layout/MobileNavigation";
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon, FacebookIcon } from "@/components/icons/social-icons";
import { cn } from "@/lib/utils";
import { profile } from "@/models/profile";
import { navItems } from "@/models/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const socialIcons: Record<string, typeof GithubIcon> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  facebook: FacebookIcon,
};

const navIcons: Record<string, LucideIcon> = {
  "#hero": Home,
  "#about": UserRound,
  "#skills": Sparkles,
  "#resume": FileText,
  "#portfolio": FolderGit2,
  "#services": Briefcase,
  "#contact": Mail,
};

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

function SidebarContent({ activeId, onNavigate }: { activeId: string; onNavigate?: () => void }) {
  const role = profile.bioDetails.find((d) => d.label === "Role")?.value;
  const city = profile.bioDetails.find((d) => d.label === "City")?.value;
  const isAvailable = profile.bioDetails.find((d) => d.label === "Freelance")?.value === "Available";

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto px-6 py-7">
      <div className="relative shrink-0">
        <div className="absolute -inset-2 animate-spin-slow rounded-full border border-dashed border-primary/25" />
        <div className="rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1">
          <Image
            src={profile.sidebarProfileImage}
            alt={profile.name}
            width={224}
            height={280}
            sizes="112px"
            quality={100}
            preload
            className="size-28 rounded-full border-4 border-background object-cover object-top shadow-lg"
          />
        </div>
        {isAvailable && (
          <span
            role="status"
            aria-label="Available for work"
            title="Available for work"
            className="absolute right-0 bottom-0.5 z-10 flex size-6 items-center justify-center rounded-full border-2 border-background bg-emerald-500 shadow-[0_4px_14px_rgba(16,185,129,0.4)]"
          >
            <span
              aria-hidden="true"
              className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-45 motion-reduce:animate-none"
            />
            <span aria-hidden="true" className="relative size-2 rounded-full bg-white" />
          </span>
        )}
      </div>

      <p className="mt-4 text-lg font-bold tracking-tight text-gradient-brand">{profile.siteName}</p>

      {role && <p className="mt-1 text-sm font-medium text-foreground/80">{role}</p>}
      {city && (
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3" />
          {city}
        </p>
      )}

      <div className="mt-3 flex items-center gap-1.5">
        {profile.socialLinks.filter((link) => link.href !== "#").map((link) => {
          const Icon = socialIcons[link.platform];
          if (!Icon) return null;
          return (
            <a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${profile.name} on ${link.platform}`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-sm" }),
                "size-9 rounded-full text-muted-foreground duration-200 hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary",
              )}
            >
              <Icon className="size-4" />
            </a>
          );
        })}
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

      <nav aria-label="Primary" className="mt-4 flex w-full flex-1 flex-col gap-0.5">
        {navItems.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = activeId === id;
          const Icon = navIcons[item.href];
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "location" : undefined}
              className="group relative flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-white/[0.035] hover:text-foreground"
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 ring-1 ring-primary/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
              {Icon && (
                <Icon
                  className={`relative z-10 size-4 shrink-0 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                  }`}
                />
              )}
              <span className={`relative z-10 ${isActive ? "text-foreground" : ""}`}>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

export default function Header() {
  const activeId = useScrollSpy(sectionIds);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl lg:block">
        <SidebarContent activeId={activeId} />
      </aside>

      <MobileNavigation activeId={activeId} />
    </>
  );
}
