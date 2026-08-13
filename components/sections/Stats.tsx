"use client";

import { motion } from "framer-motion";
import { KanbanSquare, Award, Wrench, GraduationCap, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { stats } from "@/models/stats";
import { useCountUp } from "@/hooks/useCountUp";

const icons: Record<string, LucideIcon> = {
  kanban: KanbanSquare,
  award: Award,
  tools: Wrench,
  "graduation-cap": GraduationCap,
};

function StatCard({ icon, endValue, label, sublabel }: (typeof stats)[number]) {
  const Icon = icons[icon];
  const { ref, value } = useCountUp(endValue);

  return (
    <Card
      ref={ref}
      className="group min-h-[8rem] items-center justify-center gap-1 rounded-2xl border-border bg-surface p-3.5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-surface-strong hover:shadow-md hover:shadow-primary/10 sm:p-4"
    >
      <div className="flex size-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105 group-hover:bg-primary/15">
        {Icon && <Icon className="size-4.5" />}
      </div>
      <div className="text-gradient-brand text-3xl leading-none font-bold tabular-nums sm:text-4xl">{value}+</div>
      <div className="text-sm leading-tight font-semibold">{label}</div>
      <div className="text-[0.7rem] leading-4 text-muted-foreground">{sublabel}</div>
    </Card>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden py-8 sm:py-12">
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
