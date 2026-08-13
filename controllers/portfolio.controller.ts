import { portfolioItems, portfolioFilters, type PortfolioItem, type ProjectCategory } from "@/models/portfolio";

/**
 * "Web" is the general web-development filter, so it also covers these
 * specialised categories since they're still built as web apps. Wordpress,
 * C/C++, and App Dev keep their own dedicated filter since they're a
 * different stack entirely.
 */
const webFilterGroup: ProjectCategory[] = [
  "web",
  "ecommerce",
  "education",
  "healthcare",
  "realestate",
  "business",
];

export function matchesPortfolioFilter(item: PortfolioItem, filterKey: ProjectCategory): boolean {
  if (filterKey === "all") return true;
  if (filterKey === "web") return webFilterGroup.includes(item.filterKey);
  return item.filterKey === filterKey;
}

/**
 * Flagship work, in the order it should lead the grid. These fill the first
 * page; everything else keeps its authored order behind them and is reached
 * through pagination. Ordering lives here rather than in the model so the
 * model stays a plain catalogue of projects.
 */
const featuredSlugs = [
  "baby-mart",
  "nexora-home-appliances",
  "amarbazar-commerce",
  "islamic-institute-website",
  "school-college-website",
  "healthcare-pro",
  "real-estate-management",
  "business-agency-website",
  "mediq-reminder",
] as const;

export const FEATURED_PROJECT_COUNT = featuredSlugs.length;

export function getAllPortfolioItems(): PortfolioItem[] {
  const rank = new Map<string, number>(featuredSlugs.map((slug, index) => [slug, index]));
  // Array.prototype.sort is stable, so non-featured items keep their authored order.
  return [...portfolioItems].sort(
    (a, b) =>
      (rank.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
  );
}

export function getPortfolioFilters() {
  return portfolioFilters;
}
