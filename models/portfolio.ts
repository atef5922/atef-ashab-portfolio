export type ProjectCategory =
  | "all"
  | "web"
  | "wordpress"
  | "c"
  | "flutter"
  | "ecommerce"
  | "education"
  | "healthcare"
  | "realestate"
  | "business";

export interface PortfolioFilter {
  label: string;
  filterKey: ProjectCategory;
}

export const portfolioFilters: PortfolioFilter[] = [
  { label: "All", filterKey: "all" },
  { label: "Web", filterKey: "web" },
  { label: "E-Commerce", filterKey: "ecommerce" },
  { label: "Education", filterKey: "education" },
  { label: "Healthcare", filterKey: "healthcare" },
  { label: "Real Estate", filterKey: "realestate" },
  { label: "Business", filterKey: "business" },
  { label: "Wordpress", filterKey: "wordpress" },
  { label: "C / C++", filterKey: "c" },
  { label: "App Dev", filterKey: "flutter" },
];

export interface PortfolioItem {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  filterKey: ProjectCategory;
  tags: string[];
  link: { url: string; label: string; icon: "github" | "google-drive" };
  demoUrl?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    category: "Web Development",
    description: "A responsive portfolio website built with HTML, CSS, and JavaScript to showcase my work and skills.",
    image: "/assets/images/portfolio.webp",
    filterKey: "web",
    tags: ["HTML", "CSS", "JS"],
    link: { url: "https://github.com/atef5922/Atef-Portfolio", label: "Source Code", icon: "github" },
  },
  {
    slug: "e-shop-react",
    title: "E-Shop – React.js",
    category: "React / E-commerce",
    description:
      "Responsive component-based e-commerce platform with smooth product browsing, cart management, and an optimized purchasing flow.",
    image: "/assets/images/eshop.webp",
    filterKey: "web",
    tags: ["React.js", "HTML", "CSS"],
    link: { url: "https://github.com/atef5922/E-commerce-reactjs", label: "Source Code", icon: "github" },
  },
  {
    slug: "formationforge-js",
    title: "FormationForge – JS",
    category: "JavaScript App",
    description:
      "Lightweight client-side application built with HTML, CSS, and vanilla JavaScript to showcase UI design, DOM manipulation, and front-end logic.",
    image: "/assets/images/formation.webp",
    filterKey: "web",
    tags: ["HTML", "CSS", "JavaScript"],
    link: { url: "https://github.com/atef5922/FormationForge-Js", label: "Source Code", icon: "github" },
  },
  {
    slug: "travello",
    title: "Travello",
    category: "Web Design",
    description: "At Travello, we believe that every journey should be an adventure and every destination a discovery.",
    image: "/assets/images/p2.webp",
    filterKey: "web",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: { url: "#", label: "Source Code", icon: "github" },
  },
  {
    slug: "diu-student-portal",
    title: "DIU Student Portal",
    category: "Backend",
    description: "A web portal for students built with HTML, CSS, and PHP to manage academic activities.",
    image: "/assets/images/home.webp",
    filterKey: "web",
    tags: ["PHP", "MySQL", "HTML", "CSS"],
    link: {
      url: "https://github.com/atef5922/diu-student-portal-Php-MySQl",
      label: "Source Code",
      icon: "github",
    },
  },
  {
    slug: "phonebook-system",
    title: "Phonebook System",
    category: "Console App",
    description: "A C-based console application to manage contacts. Add, search, update, and delete contact information.",
    image: "/assets/images/p4.webp",
    filterKey: "c",
    tags: ["C", "Data Structures"],
    link: { url: "https://github.com/atef5922", label: "Source Code", icon: "github" },
  },
  {
    slug: "bank-management",
    title: "Bank Management",
    category: "System",
    description: "A comprehensive banking application built with C programming to manage customer accounts securely.",
    image: "/assets/images/p5.webp",
    filterKey: "c",
    tags: ["C", "File I/O"],
    link: { url: "https://github.com/atef5922", label: "Source Code", icon: "github" },
  },
  {
    slug: "mediq-reminder",
    title: "MedIQ – Reminder",
    category: "Mobile App",
    description: "A Flutter application designed to help users manage their medication schedules efficiently.",
    image: "/assets/images/mediq.webp",
    filterKey: "flutter",
    tags: ["Flutter", "Dart", "Firebase"],
    link: { url: "https://github.com/atef5922", label: "Source Code", icon: "github" },
  },
  {
    slug: "ghorer-bazar-clone",
    title: "Ghorer Bazar – Clone",
    category: "WordPress / E-commerce",
    description:
      "A WordPress-based e-commerce website inspired by the Ghorer Bazar platform. Clean product layout and cart functionality.",
    image: "/assets/images/ghorer_bazar.webp",
    filterKey: "wordpress",
    tags: ["WordPress", "WooCommerce", "Elementor"],
    link: {
      url: "https://drive.google.com/drive/folders/1Wpw2rfxCmZWpjo3H0fEZWuilNZUN_Qk-?usp=drive_link",
      label: "Demo Link",
      icon: "google-drive",
    },
  },
  {
    slug: "star-tech-clone",
    title: "Star Tech – Clone",
    category: "WordPress / E-commerce",
    description: "A clone of the popular Star Tech website. Focuses on detailed specs, pricing, and organized categories.",
    image: "/assets/images/star_tech.webp",
    filterKey: "wordpress",
    tags: ["WordPress", "WooCommerce", "Elementor"],
    link: {
      url: "https://drive.google.com/drive/folders/1Wpw2rfxCmZWpjo3H0fEZWuilNZUN_Qk-?usp=drive_link",
      label: "Demo Link",
      icon: "google-drive",
    },
  },
  {
    slug: "eshop-ecommerce",
    title: "EShop – E-Commerce",
    category: "WordPress / E-commerce",
    description:
      "An e-commerce website built with WordPress, inspired by a premium ThemeForest theme. Modern UI, structured product layouts, and smooth navigation.",
    image: "/assets/images/themeforest_ecommerce.webp",
    filterKey: "wordpress",
    tags: ["WordPress", "WooCommerce", "Elementor"],
    link: {
      url: "https://drive.google.com/drive/folders/1Wpw2rfxCmZWpjo3H0fEZWuilNZUN_Qk-?usp=drive_link",
      label: "Demo Link",
      icon: "google-drive",
    },
  },
  {
    slug: "baby-mart",
    title: "Baby & Kids E-Commerce Website",
    category: "E-Commerce",
    description:
      "A playful and conversion-focused online store for baby products, kids fashion, toys, and family essentials.",
    image: "/assets/projects_thumbnail/baby-mart.webp",
    filterKey: "ecommerce",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "GSAP"],
    link: { url: "https://github.com/atef5922/baby-mart", label: "Source Code", icon: "github" },
    demoUrl: "https://baby-mart-nu.vercel.app/",
  },
  {
    slug: "nexora-home-appliances",
    title: "Home Appliances E-Commerce Website",
    category: "E-Commerce",
    description:
      "A modern appliance shopping platform designed for electronics, kitchen appliances, and smart living products.",
    image: "/assets/projects_thumbnail/home-appliances.webp",
    filterKey: "ecommerce",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "GSAP"],
    link: { url: "https://github.com/atef5922/nexora-home-appliances", label: "Source Code", icon: "github" },
    demoUrl: "https://nexora-home-appliances.vercel.app/",
  },
  {
    slug: "amarbazar-commerce",
    title: "Electronics E-Commerce Website",
    category: "E-Commerce",
    description: "A professional online tech store for gadgets, devices, accessories, and consumer electronics.",
    image: "/assets/projects_thumbnail/electro-mart.webp",
    filterKey: "ecommerce",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "GSAP"],
    link: { url: "https://github.com/atef5922/amarbazar-commerce", label: "Source Code", icon: "github" },
    demoUrl: "https://amarbazar-ecommerce.vercel.app/",
  },
  {
    slug: "islamic-institute-website",
    title: "Madrasa Website",
    category: "Education",
    description:
      "A structured educational website for madrasas with admissions, courses, teachers, notices, galleries, and events.",
    image: "/assets/projects_thumbnail/madrasa.webp",
    filterKey: "education",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "GSAP"],
    link: { url: "https://github.com/atef5922/Islamic-Institute-Website", label: "Source Code", icon: "github" },
    demoUrl: "https://islamic-institute-website.vercel.app/",
  },
  {
    slug: "school-college-website",
    title: "School & College Website",
    category: "Education",
    description:
      "Complete website solution for educational institutions featuring admissions, academic programs, notices, results, routines, teacher profiles, campus gallery, and responsive design.",
    image: "/assets/projects_thumbnail/school-college.webp",
    filterKey: "education",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "GSAP"],
    link: { url: "https://github.com/atef5922/school-college-website", label: "Source Code", icon: "github" },
    demoUrl: "https://school-college-website-one.vercel.app/",
  },
  {
    slug: "healthcare-pro",
    title: "Healthcare Website",
    category: "Healthcare",
    description:
      "A professional healthcare platform for hospitals and clinics with doctors, appointments, departments, and patient support.",
    image: "/assets/projects_thumbnail/healthcare.webp",
    filterKey: "healthcare",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "GSAP"],
    link: { url: "https://github.com/atef5922/HealthCarePro", label: "Source Code", icon: "github" },
    demoUrl: "https://health-care-pro-tau.vercel.app/",
  },
  {
    slug: "real-estate-management",
    title: "Real Estate Website",
    category: "Real Estate",
    description:
      "A premium real estate website for property listings, project showcases, agent profiles, search filters, and inquiries.",
    image: "/assets/projects_thumbnail/real-estate.webp",
    filterKey: "realestate",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "GSAP"],
    link: { url: "https://github.com/atef5922/real-estate-management", label: "Source Code", icon: "github" },
    demoUrl: "https://real-estate-management-liart.vercel.app/",
  },
  {
    slug: "business-agency-website",
    title: "Corporate Business Website",
    category: "Business",
    description:
      "A clean and professional business website built to showcase services, expertise, projects, and client trust.",
    image: "/assets/projects_thumbnail/innovexa-business.webp",
    filterKey: "business",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "GSAP"],
    link: { url: "https://github.com/atef5922/Business-Agency-Website", label: "Source Code", icon: "github" },
    demoUrl: "https://business-portfolio-website-eight.vercel.app/",
  },
];
