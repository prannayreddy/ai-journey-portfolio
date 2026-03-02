"use client";

import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Zap,
  Code2,
  Star,
} from "lucide-react";
import projects from "@/data/projects.json";

const iconMap: Record<string, React.ReactNode> = {
  "gulf-crisis-hub": <Zap size={20} />,
};

export default function Journey() {
  return (
    <section id="journey" className="relative py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-[family-name:var(--font-mono)] text-cyan-400/70 mb-3 tracking-wide uppercase">
            The Journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Things I&apos;ve built with AI
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`${
                project.featured && projects.length === 1
                  ? "md:col-span-2 lg:col-span-3"
                  : project.featured
                    ? "md:col-span-2 lg:col-span-2"
                    : ""
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.03]"
                style={{
                  boxShadow: "0 0 0 0 rgba(34, 211, 238, 0)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 40px -10px rgba(34, 211, 238, 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 0 0 rgba(34, 211, 238, 0)";
                }}
              >
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                    <Star size={12} className="text-cyan-400" />
                    <span className="text-xs text-cyan-400 font-medium">
                      Featured
                    </span>
                  </div>
                )}

                {/* Icon + Date */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-400">
                    {iconMap[project.id] || <Code2 size={20} />}
                  </div>
                  <span className="text-xs text-neutral-500 font-[family-name:var(--font-mono)]">
                    {project.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2">
                  {project.title}
                </h3>

                {/* Role */}
                <p className="text-sm text-cyan-400/60 font-medium mb-4">
                  {project.role}
                </p>

                {/* Story */}
                <p className="text-neutral-400 leading-relaxed mb-6 text-[15px]">
                  {project.story}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">
                  {project.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-neutral-400"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/50 shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-[family-name:var(--font-mono)] text-neutral-400 bg-white/[0.04] border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-neutral-500 transition-colors duration-200 hover:text-white"
                  >
                    <Github size={14} />
                    <span>Source</span>
                  </a>
                  {project.links.live !== "#" && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-neutral-500 transition-colors duration-200 hover:text-cyan-400"
                    >
                      <ExternalLink size={14} />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
