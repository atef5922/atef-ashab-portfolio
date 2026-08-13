import nodemailer from "nodemailer";
import { contactInfo } from "@/models/contact";

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactInput(input: Partial<ContactInput>): ValidationResult {
  const { name, email, subject, message } = input;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return { valid: false, error: "Please fill in all fields." };
  }

  if (!EMAIL_RE.test(email.trim())) {
    return { valid: false, error: "Please enter a valid email address." };
  }

  return { valid: true };
}

export async function sendContactEmail(input: ContactInput): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Email service is not configured. Set SMTP_* env vars to enable sending.");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: SMTP_USER,
    to: CONTACT_TO_EMAIL || contactInfo.recipientEmail,
    replyTo: input.email,
    subject: `[Portfolio Contact] ${input.subject}`,
    text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
  });
}
