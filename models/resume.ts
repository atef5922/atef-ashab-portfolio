export interface EducationEntry {
  degree: string;
  dateRange: string;
  school: string;
  description: string;
}

export interface ExperienceEntry {
  title: string;
  dateRange: string;
  company: string;
  bullets: string[];
}

export interface CertificationEntry {
  title: string;
  issuer: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  date?: string;
}

export interface Resume {
  education: EducationEntry[];
  experience: ExperienceEntry[];
  certifications: CertificationEntry[];
}

export const resume: Resume = {
  education: [
    {
      degree: "B.Sc. in CSE",
      dateRange: "2022 - 2026",
      school: "Daffodil International University",
      description:
        "Graduated in Computer Science and Engineering with focus on software engineering, database systems, and Web engineering. CGPA: 3.5/4.00",
    },
    {
      degree: "Higher Secondary Certificate",
      dateRange: "2018 - 2020",
      school: "Rangpur Collectorate School and College",
      description: "Science Group. Developed analytical and problem-solving skills. GPA: 5.00/5.00",
    },
    {
      degree: "Secondary School Certificate",
      dateRange: "2016 - 2018",
      school: "Panchagarh B.P Govt High School",
      description: "Science Group. High performance in Mathematics and General Science. GPA: 4.94/5.00",
    },
  ],
  experience: [
    {
      title: "Full Stack Web Developer",
      dateRange: "Present",
      company: "Mugnee IT Solutions",
      bullets: [
        "Build and maintain full-stack web applications with responsive frontend, backend, database, and deployment workflows.",
        "Develop user-friendly interfaces and integrate APIs, databases, authentication, and admin workflows.",
        "Work with React, Next.js, WordPress, PostgreSQL, Supabase, and modern web tooling.",
      ],
    },
    {
      title: "Front End Developer",
      dateRange: "Jan 2025 - Nov 2025",
      company: "Multipurc Tech",
      bullets: [
        "Developed and launched responsive, user-friendly websites using HTML, CSS, JavaScript, modern front-end frameworks, and WordPress.",
        "Collaborated with design and backend teams to implement intuitive UI features and customize WordPress themes across devices.",
        "Optimized website performance and resolved front-end and WordPress-related issues while maintaining clean, scalable code.",
      ],
    },
  ],
  certifications: [
    {
      title: "Data Analytics Essentials",
      issuer: "Cisco Networking Academy",
      image: "/assets/certificates/Data Analytics Essentials.webp",
      imageWidth: 1050,
      imageHeight: 809,
      date: "May 9, 2026",
    },
    {
      title: "Web Development with JavaScript Career Launchpad",
      issuer: "Ostad",
      image: "/assets/certificates/Web Development with JavaScript.webp",
      imageWidth: 1041,
      imageHeight: 734,
    },
    {
      title: "AI Engineering Career Launchpad 2026",
      issuer: "Ostad",
      image: "/assets/certificates/Ai Engineering.webp",
      imageWidth: 1114,
      imageHeight: 787,
    },
    {
      title: "Cyber Security Career Launchpad for Absolute Beginners",
      issuer: "Ostad",
      image: "/assets/certificates/Cyber Security.webp",
      imageWidth: 1111,
      imageHeight: 783,
    },
    {
      title: "Data Analysis with ChatGPT",
      issuer: "365 Data Science",
      image: "/assets/certificates/Data Analysis.webp",
      imageWidth: 1061,
      imageHeight: 712,
      date: "November 14, 2025",
    },
    {
      title: "Excel Essentials for Workplace Productivity",
      issuer: "Passport to Earning Bangladesh",
      image: "/assets/certificates/Excel.webp",
      imageWidth: 1259,
      imageHeight: 850,
      date: "April 30, 2026",
    },
    {
      title: "Presentation & Public Speaking",
      issuer: "10 Minute School",
      image: "/assets/certificates/Presentation.webp",
      imageWidth: 1108,
      imageHeight: 779,
      date: "May 1, 2026",
    },
    {
      title: "English Grammar Fundamentals",
      issuer: "10 Minute School",
      image: "/assets/certificates/English Grammer.webp",
      imageWidth: 922,
      imageHeight: 651,
      date: "November 29, 2025",
    },
  ],
};
