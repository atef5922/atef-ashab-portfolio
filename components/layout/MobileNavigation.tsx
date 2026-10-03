"use client";

import { useEffect, useState } from "react";
import { Home, UserRound, FolderGit2, Mail, Menu, Sparkles, FileText, Briefcase } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { WhatsappIcon } from "@/components/icons/social-icons";
import { navItems } from "@/models/nav";
import { profile } from "@/models/profile";

const icons = [Home, UserRound, Sparkles, FileText, FolderGit2, Briefcase, Mail];
const tabs = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: UserRound },
  { id: "portfolio", label: "Work", icon: FolderGit2 },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function MobileNavigation({ activeId }: { activeId: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <nav aria-label="Mobile navigation" className="mobile-navigation lg:hidden">
        {tabs.map(({ id, label, icon: Icon }) => (
          <a key={id} href={`#${id}`} aria-current={activeId === id ? "location" : undefined} className="mobile-tab">
            <Icon aria-hidden="true" className="size-5" />
            <span>{label}</span>
          </a>
        ))}
        <SheetTrigger className="mobile-tab" data-active={!["hero", "about", "portfolio", "contact"].includes(activeId) || undefined}>
          <Menu aria-hidden="true" className="size-5" />
          <span>More</span>
        </SheetTrigger>
      </nav>
      <SheetContent side="bottom" className="mobile-menu">
        <div aria-hidden="true" className="mx-auto h-1 w-10 rounded-full bg-white/20" />
        <div className="pr-12">
          <SheetTitle className="text-lg font-semibold">Explore portfolio</SheetTitle>
          <p className="mt-1 text-sm text-muted-foreground">{profile.siteName} · Full Stack Developer</p>
        </div>
        <nav aria-label="All sections" className="grid grid-cols-2 gap-2">
          {navItems.map((item, index) => {
            const Icon = icons[index];
            return (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={activeId === item.href.slice(1) ? "location" : undefined} className="mobile-menu-link">
                <Icon aria-hidden="true" className="size-5 text-indigo-300" />{item.label}
              </a>
            );
          })}
          <a href="https://wa.me/8801774333604" target="_blank" rel="noopener noreferrer" className="mobile-menu-link">
            <WhatsappIcon className="size-5 text-emerald-400" />WhatsApp
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
