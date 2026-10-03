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
      className="min-h-26 min-w-0 items-center justify-start gap-2 rounded-[6px] border border-border bg-surface px-3 py-3 text-center ring-0 backdrop-blur-sm transition-colors duration-200 hover:border-primary/30 hover:bg-surface-strong sm:px-4"
    >
      <div className="flex items-center justify-center gap-2.5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-[4px] border border-primary/20 bg-primary/10 text-primary">
          {Icon && <Icon className="size-4" aria-hidden="true" />}
        </div>
        <div className="text-gradient-brand text-3xl leading-none font-bold tabular-nums">{value}+</div>
      </div>
      <div className="space-y-1">
        <div className="text-sm leading-tight font-semibold">{label}</div>
        <div className="text-[0.7rem] leading-4 text-muted-foreground">{sublabel}</div>
      </div>
    </Card>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="section-spacing relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="grid auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
