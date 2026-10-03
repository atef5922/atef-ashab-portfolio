"use client";

import { motion } from "framer-motion";
import { Palette, Code, Camera, Smartphone, Rocket, Lightbulb, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getAllServices } from "@/controllers/services.controller";

const icons: Record<string, LucideIcon> = {
  palette: Palette,
  code: Code,
  camera: Camera,
  smartphone: Smartphone,
  rocket: Rocket,
  lightbulb: Lightbulb,
};

export default function Services() {
  const services = getAllServices();

  return (
    <section id="services" className="section-spacing relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-heading-spacing text-center"
        >
          <span className="eyebrow">Services</span>
          <h2 className="mt-2 text-2xl font-bold sm:text-4xl">What I Can Help You Build</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card className="group h-full gap-3 border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 transition-transform group-hover:scale-110">
                    {Icon && <Icon className="size-6 text-white" />}
                  </div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-justify text-sm text-muted-foreground">{service.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
