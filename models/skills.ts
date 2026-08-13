export interface SkillItem {
  name: string;
  percent: number;
  icon: string;
  color?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: "code",
    skills: [
      { name: "HTML5", percent: 90, icon: "html5", color: "#E34F26" },
      { name: "CSS3", percent: 85, icon: "css3", color: "#1572B6" },
      { name: "JavaScript", percent: 80, icon: "javascript", color: "#F7DF1E" },
      { name: "React.js", percent: 80, icon: "react", color: "#61DAFB" },
      { name: "Next.js", percent: 75, icon: "nextjs" },
      { name: "Tailwind CSS", percent: 85, icon: "tailwindcss", color: "#38BDF8" },
    ],
  },
  {
    title: "Backend & Database",
    icon: "database",
    skills: [
      { name: "PHP", percent: 75, icon: "php", color: "#777BB4" },
      { name: "MySQL", percent: 80, icon: "mysql", color: "#4479A1" },
      { name: "MongoDB", percent: 60, icon: "mongodb", color: "#47A248" },
      { name: "PostgreSQL", percent: 70, icon: "postgresql", color: "#336791" },
      { name: "Supabase", percent: 70, icon: "supabase", color: "#3ECF8E" },
      { name: "Firebase", percent: 65, icon: "firebase", color: "#FFCA28" },
    ],
  },
  {
    title: "Tools & Version Control",
    icon: "git-branch",
    skills: [
      { name: "Git", percent: 90, icon: "git", color: "#F05032" },
      { name: "GitHub", percent: 90, icon: "github" },
      { name: "VS Code", percent: 90, icon: "vscode", color: "#007ACC" },
      { name: "Figma", percent: 80, icon: "figma", color: "#A259FF" },
    ],
  },
  {
    title: "CMS & Website Builders",
    icon: "globe",
    skills: [
      { name: "WordPress", percent: 85, icon: "wordpress", color: "#21759B" },
      { name: "Elementor", percent: 90, icon: "elementor", color: "#92003B" },
      { name: "WooCommerce", percent: 80, icon: "woocommerce", color: "#96588A" },
      { name: "Shopify", percent: 70, icon: "shopify", color: "#95BF47" },
    ],
  },
];
