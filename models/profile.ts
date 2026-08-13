export interface BioDetail {
  label: string;
  value: string;
}

export interface SocialLink {
  platform: string;
  href: string;
}

export interface Profile {
  name: string;
  siteName: string;
  greeting: string;
  profileImage: string;
  sidebarProfileImage: string;
  typedRoles: string[];
  bioDetails: BioDetail[];
  socialLinks: SocialLink[];
  cvUrl: string;
}

export const profile: Profile = {
  name: "Atef Ashab",
  siteName: "Atef Ashab",
  greeting: "Hello, I am",
  profileImage: "/assets/atef-sifat.webp",
  sidebarProfileImage: "/assets/sidebar_profile_photo.webp",
  typedRoles: ["Full Stack Web Developer", "Problem Solver", "Learner"],
  bioDetails: [
    { label: "Degree", value: "B.Sc. in CSE" },
    { label: "City", value: "Dhaka, Bangladesh" },
    { label: "Role", value: "Full Stack Web Developer" },
    { label: "Company", value: "Mugnee IT Solutions" },
    { label: "Freelance", value: "Available" },
  ],
  socialLinks: [
    { platform: "github", href: "https://github.com/atef5922" },
    { platform: "linkedin", href: "https://www.linkedin.com/in/atefsifat5922/" },
    { platform: "instagram", href: "https://www.instagram.com/atef_ashab?igsh=MWRmZWEwcmNmMjFhdA==" },
    { platform: "twitter", href: "#" },
    { platform: "facebook", href: "https://www.facebook.com/share/1HwxVwdjW4/" },
  ],
  cvUrl: "/assets/documents/Atef_Ashab_CV.pdf",
};
