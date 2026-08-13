export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export const services: ServiceItem[] = [
  {
    icon: "palette",
    title: "Web Design",
    description: "Clean, modern interfaces designed with attention to usability, accessibility, and visual polish.",
  },
  {
    icon: "code",
    title: "Web Development",
    description: "Full-stack web applications built with React, Next.js, and modern backend tooling.",
  },
  {
    icon: "camera",
    title: "Photography",
    description: "Composing and editing photos with an eye for detail, lighting, and storytelling.",
  },
  {
    icon: "smartphone",
    title: "Apps Interface",
    description: "Responsive, intuitive interfaces that feel great to use across devices.",
  },
  {
    icon: "rocket",
    title: "Graphic Design",
    description: "Visual identity and design assets that communicate a brand clearly and consistently.",
  },
  {
    icon: "lightbulb",
    title: "Problem Solver",
    description: "Breaking down complex requirements into practical, well-structured technical solutions.",
  },
];
