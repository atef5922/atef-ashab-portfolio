import { buttonVariants } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon, FacebookIcon } from "@/components/icons/social-icons";
import { cn } from "@/lib/utils";
import { profile } from "@/models/profile";

const socialIcons: Record<string, typeof GithubIcon> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  facebook: FacebookIcon,
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-12 text-center sm:px-8 lg:px-10 xl:px-12">
        <span className="text-lg font-bold text-gradient-brand">{profile.siteName}</span>

        <div className="flex items-center gap-2">
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
                  buttonVariants({ variant: "outline", size: "icon-sm" }),
                  "size-10 rounded-full border-border bg-surface hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
                )}
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {profile.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
