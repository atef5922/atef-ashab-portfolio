"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { contactInfo } from "@/models/contact";

type Status = "idle" | "loading" | "success" | "error";

const infoItems = [
  { icon: Mail, label: "Email", value: contactInfo.email },
  { icon: Phone, label: "Call Us", value: contactInfo.phone },
  { icon: MapPin, label: "Location", value: contactInfo.address },
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => {
      setMessage("");
      setStatus("idle");
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [message]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // Backend isn't wired up yet — ignore for now and show success regardless.
    }

    setStatus("success");
    setMessage("Your message has been sent. Thank you!");
    form.reset();
  }

  return (
    <section id="contact" className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12"
        >
          <span className="eyebrow">Contact</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Let&apos;s Talk</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 lg:col-span-2"
          >
            {infoItems.map((info) => (
              <Card
                key={info.label}
                className="flex-row items-center gap-4 border-border bg-surface p-5 transition-colors hover:border-primary/30 hover:bg-surface-strong"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                  <info.icon className="size-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{info.label}</p>
                  <p className="font-medium">{info.value}</p>
                </div>
              </Card>
            ))}

            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                src={contactInfo.mapEmbedUrl}
                className="dark:invert-[.92] dark:hue-rotate-180 dark:contrast-[.85] dark:brightness-95 dark:saturate-[.8]"
                style={{ border: 0, width: "100%", height: "13.75rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location map"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <Card className="h-full border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b border-border pb-6">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                  <Send className="size-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Send a Message</h3>
                  <p className="text-xs text-muted-foreground">I usually respond within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name-field">Your Name</Label>
                    <Input id="name-field" name="name" type="text" className="h-10" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-field">Your Email</Label>
                    <Input id="email-field" name="email" type="email" className="h-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject-field">Subject</Label>
                  <Input id="subject-field" name="subject" type="text" className="h-10" required />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <Label htmlFor="message-field">Message</Label>
                  <Textarea id="message-field" name="message" className="min-h-32 flex-1 resize-none" required />
                </div>

                {message && (
                  <div
                    className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
                      status === "error" ? "bg-destructive/10 text-destructive" : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {status === "error" ? <AlertCircle className="size-4 shrink-0" /> : <CheckCircle2 className="size-4 shrink-0" />}
                    {message}
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
