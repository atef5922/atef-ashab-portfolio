# Atef Ashab — Portfolio

Personal portfolio website for Md Atef Ashab Sifat, a Full Stack Web Developer. Built as a single-page site with a persistent sidebar navigation, animated sections, a filterable project gallery, and a working contact form.

**Live sections:** Home · About · Skills · Resume (Experience / Certifications / Education) · Portfolio · Services · Contact

## Features

- Persistent sidebar navigation with active-section scroll spy
- Animated hero, stats counters, and skill progress bars (Framer Motion)
- Filterable, paginated portfolio grid with a project preview dialog
- Interactive certificate carousel with autoplay, pause/resume, and full-size preview
- Contact form backed by a Next.js API route (email delivery via Nodemailer/SMTP)
- Floating WhatsApp and scroll-to-top buttons
- Fully responsive, dark-themed UI

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Framer Motion](https://motion.dev) for animation
- [@base-ui/react](https://base-ui.com) for accessible primitives (dialog, sheet, button)
- [Lucide](https://lucide.dev) + [react-icons](https://react-icons.github.io/react-icons) for iconography
- [Nodemailer](https://nodemailer.com) for the contact form's email delivery

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment variables

The contact form sends email through SMTP. Copy `.env.local.example` to `.env.local` and fill in your own credentials to enable it:

```bash
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
CONTACT_TO_EMAIL=you@example.com
```

Without these, the form still submits and shows a success message to the visitor, but no email is actually sent.

## Project Structure

```
app/                  Routes, layout, and the /api/contact route handler
components/
  sections/           One component per page section (Hero, About, Skills, ...)
  layout/             Header/sidebar, footer, scroll-to-top, WhatsApp button
  ui/                 Shared shadcn-based primitives (button, card, dialog, ...)
  icons/              Social/brand icon re-exports
controllers/          Data-access functions consumed by section components
models/                Typed content/data (profile, portfolio items, resume, ...)
hooks/                Reusable client hooks (scroll spy, typewriter, count-up)
public/assets/        Images, certificates, CV, and project thumbnails
```

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Deployment

Deploys cleanly to [Vercel](https://vercel.com/new) or any Node.js host that supports Next.js — just set the SMTP environment variables above on the hosting platform to enable contact form emails.
