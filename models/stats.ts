export interface StatItem {
  icon: string;
  endValue: number;
  label: string;
  sublabel: string;
}

export const stats: StatItem[] = [
  { icon: "kanban", endValue: 19, label: "Projects Built", sublabel: "web, app & system projects" },
  { icon: "award", endValue: 8, label: "Certifications", sublabel: "courses completed" },
  { icon: "tools", endValue: 16, label: "Technologies", sublabel: "tools & frameworks used" },
  { icon: "graduation-cap", endValue: 4, label: "Years Learning CSE", sublabel: "since 2022" },
];
