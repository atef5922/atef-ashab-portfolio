"use client";

import { motion } from "framer-motion";
import { Code2, Database, GitBranch, Globe, type LucideIcon } from "lucide-react";
import {
  SiCss,
  SiElementor,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiShopify,
  SiSupabase,
  SiTailwindcss,
  SiWoocommerce,
  SiWordpress,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import type { IconType } from "react-icons";
import { Card } from "@/components/ui/card";
import { skillCategories, type SkillItem } from "@/models/skills";

const categoryIcons: Record<string, LucideIcon> = {
  code: Code2,
  database: Database,
  "git-branch": GitBranch,
  globe: Globe,
};

const skillIcons: Record<string, IconType> = {
  html5: SiHtml5,
  css3: SiCss,
  javascript: SiJavascript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  php: SiPhp,
  mysql: SiMysql,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  supabase: SiSupabase,
  firebase: SiFirebase,
  git: SiGit,
  github: SiGithub,
  vscode: VscVscode,
  figma: SiFigma,
  wordpress: SiWordpress,
  elementor: SiElementor,
  woocommerce: SiWoocommerce,
  shopify: SiShopify,
};

function SkillRow({ skill, index }: { skill: SkillItem; index: number }) {
  const Icon = skillIcons[skill.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="flex items-center gap-2.5"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-strong">
        {Icon && <Icon className="size-4" style={skill.color ? { color: skill.color } : undefined} />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="font-medium">{skill.name}</span>
          <span className="text-muted-foreground">{skill.percent}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-strong">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.percent}%` }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: index * 0.04 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12"
        >
          <span className="eyebrow">Skills</span>
          <h2 className="mt-2 text-2xl font-bold sm:text-4xl">Technologies I Work With</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Tools and technologies I use to build modern, scalable web applications.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2">
          {skillCategories.map((category, ci) => {
            const CategoryIcon = categoryIcons[category.icon];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: ci * 0.08 }}
              >
                <Card className="h-full border-border bg-surface p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 border-b border-border pb-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                      {CategoryIcon && <CategoryIcon className="size-4.5 text-white" />}
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.title}</h3>
                      <p className="text-xs text-muted-foreground">{category.skills.length} skills</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, i) => (
                      <SkillRow key={skill.name} skill={skill} index={i} />
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
