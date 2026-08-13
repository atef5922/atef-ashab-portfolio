"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Globe, ZoomIn } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { GithubIcon } from "@/components/icons/social-icons";
import { cn } from "@/lib/utils";
import {
  FEATURED_PROJECT_COUNT,
  getAllPortfolioItems,
  getPortfolioFilters,
  matchesPortfolioFilter,
} from "@/controllers/portfolio.controller";
import type { PortfolioItem, ProjectCategory } from "@/models/portfolio";

const linkIcons: Record<PortfolioItem["link"]["icon"], ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  "google-drive": ExternalLink,
};

/** One page holds exactly the featured set, so the flagship work owns page one. */
const PAGE_SIZE = FEATURED_PROJECT_COUNT;

/** Widest run of page numbers rendered before collapsing the middle into an ellipsis. */
const MAX_PAGE_SLOTS = 7;

/**
 * Page numbers to render, with "gap" standing in for a collapsed range —
 * e.g. 1 … 4 5 6 … 12. Always keeps the first, last and current page reachable.
 */
function buildPageList(current: number, total: number): (number | "gap")[] {
  if (total <= MAX_PAGE_SLOTS) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const shown = new Set<number>([1, total, current, current - 1, current + 1]);
  // Near either end, extend that side so the control keeps a stable width.
  if (current <= 3) [2, 3, 4].forEach((page) => shown.add(page));
  if (current >= total - 2) [total - 1, total - 2, total - 3].forEach((page) => shown.add(page));

  const pages = [...shown].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);

  return pages.flatMap((page, index) =>
    index > 0 && page - pages[index - 1] > 1 ? ["gap" as const, page] : [page],
  );
}

// size-11 on phones keeps the arrows at a 44px touch target; size-10 from sm up
// matches the arrow buttons on the resume carousel.
const pagerButtonClass =
  "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 sm:size-10";

export default function Portfolio() {
  const items = getAllPortfolioItems();
  const filters = getPortfolioFilters();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [preview, setPreview] = useState<PortfolioItem | null>(null);
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasPaged = useRef(false);
  const reduceMotion = useReducedMotion();

  const filteredItems = useMemo(
    () => items.filter((item) => matchesPortfolioFilter(item, activeFilter)),
    [items, activeFilter],
  );

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  // Clamped rather than stored, so a filter that shrinks the list can never
  // strand the view on a page that no longer exists.
  const currentPage = Math.min(page, totalPages);
  const rangeStart = (currentPage - 1) * PAGE_SIZE;

  const pageItems = useMemo(
    () => filteredItems.slice(rangeStart, rangeStart + PAGE_SIZE),
    [filteredItems, rangeStart],
  );

  const pageList = useMemo(() => buildPageList(currentPage, totalPages), [currentPage, totalPages]);

  // Bring the grid back into view on a page change — but never on first paint.
  useEffect(() => {
    if (!hasPaged.current) return;
    gridRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [currentPage, reduceMotion]);

  function goToPage(next: number) {
    const target = Math.min(Math.max(next, 1), totalPages);
    if (target === currentPage) return;
    hasPaged.current = true;
    setPage(target);
  }

  function changeFilter(filterKey: ProjectCategory) {
    if (filterKey === activeFilter) return;
    setActiveFilter(filterKey);
    setPage(1);
  }

  return (
    <section id="portfolio" className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="eyebrow">Portfolio</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Selected Work</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            A selection of web, desktop, and mobile projects I&apos;ve built.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.filterKey;
            return (
              <button
                key={filter.filterKey}
                type="button"
                aria-pressed={isActive}
                onClick={() => changeFilter(filter.filterKey)}
                className="relative cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolio-filter-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? "text-white" : ""}`}>{filter.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div ref={gridRef} layout className="grid scroll-mt-24 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {pageItems.map((item) => {
              const LinkIcon = linkIcons[item.link.icon];
              return (
                <motion.div
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group h-full gap-0 overflow-hidden border-border bg-surface p-0 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) calc((100vw - 24rem) / 3), (min-width: 640px) calc((100vw - 4.5rem) / 2), calc(100vw - 2rem)"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button size="icon" variant="secondary" onClick={() => setPreview(item)}>
                          <ZoomIn className="size-4" />
                        </Button>
                        {item.demoUrl && (
                          <a
                            href={item.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open live demo of ${item.title}`}
                            className={buttonVariants({ size: "icon", variant: "secondary" })}
                          >
                            <Globe className="size-4" />
                          </a>
                        )}
                        <a
                          href={item.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${item.title}`}
                          className={buttonVariants({ size: "icon", variant: "secondary" })}
                        >
                          <LinkIcon className="size-4" />
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-xs font-medium text-primary">{item.category}</span>
                      <h3 className="mt-1 font-semibold">{item.title}</h3>
                      <p className="mt-2 line-clamp-2 text-justify text-sm text-muted-foreground">{item.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-surface-strong text-muted-foreground">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {totalPages > 1 && (
          <nav aria-label="Portfolio pagination" className="mt-12 flex flex-col items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={pagerButtonClass}
              >
                <ChevronLeft className="size-4" />
              </button>

              {/* Numbers need room; below sm the position is shown as text instead. */}
              <span className="px-3 text-sm text-muted-foreground tabular-nums sm:hidden">
                <span className="font-semibold text-foreground">{currentPage}</span> / {totalPages}
              </span>

              <div className="hidden items-center gap-1.5 sm:flex">
                {pageList.map((entry, index) =>
                  entry === "gap" ? (
                    <span
                      key={`gap-${index}`}
                      aria-hidden="true"
                      className="flex size-10 select-none items-center justify-center text-sm text-muted-foreground"
                    >
                      &hellip;
                    </span>
                  ) : (
                    <button
                      key={entry}
                      type="button"
                      onClick={() => goToPage(entry)}
                      aria-label={`Go to page ${entry}`}
                      aria-current={entry === currentPage ? "page" : undefined}
                      className="relative flex size-10 cursor-pointer items-center justify-center rounded-full text-sm font-medium tabular-nums text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {entry === currentPage && (
                        <motion.span
                          layoutId="portfolio-page-pill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-primary/25"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 ${entry === currentPage ? "text-white" : ""}`}>
                        {entry}
                      </span>
                    </button>
                  ),
                )}
              </div>

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={pagerButtonClass}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <p aria-live="polite" className="text-xs text-muted-foreground">
              Showing {rangeStart + 1}&ndash;{rangeStart + pageItems.length} of {filteredItems.length} projects
            </p>
          </nav>
        )}
      </div>

      <Dialog open={!!preview} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="sm:max-w-2xl">
          {preview &&
            (() => {
              const PreviewIcon = linkIcons[preview.link.icon];
              return (
                <>
                  <DialogTitle>{preview.title}</DialogTitle>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={preview.image}
                      alt={preview.title}
                      fill
                      sizes="(max-width: 640px) calc(100vw - 2rem), 672px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-justify text-sm text-muted-foreground">{preview.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {preview.demoUrl && (
                      <a
                        href={preview.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonVariants(), "gap-2")}
                      >
                        <Globe className="size-4" />
                        Live Demo
                      </a>
                    )}
                    <a
                      href={preview.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: preview.demoUrl ? "outline" : "default" }), "gap-2")}
                    >
                      <PreviewIcon className="size-4" />
                      {preview.link.label}
                    </a>
                  </div>
                </>
              );
            })()}
        </DialogContent>
      </Dialog>
    </section>
  );
}
