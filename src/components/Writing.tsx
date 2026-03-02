"use client";

import { motion } from "framer-motion";
import { PenLine, ArrowUpRight } from "lucide-react";

const posts = [
  {
    title: "How I Built a Crisis Hub in Under an Hour with AI",
    description:
      "The full story of orchestrating autonomous agents to ship a production resource hub during the 2026 Gulf Crisis.",
    tag: "Case Study",
    status: "coming-soon" as const,
    link: "#",
  },
  {
    title: "The Agentic Developer Workflow",
    description:
      "Lessons learned from building real products entirely through AI conversation — no IDE, no terminal.",
    tag: "Essay",
    status: "coming-soon" as const,
    link: "#",
  },
];

export default function Writing() {
  return (
    <section id="writing" className="relative py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-[family-name:var(--font-mono)] text-cyan-400/70 mb-3 tracking-wide uppercase">
            Writing
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Thinking out loud
          </h2>
        </motion.div>

        {/* Post cards */}
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-xs font-[family-name:var(--font-mono)] text-cyan-400/60 px-2 py-0.5 rounded-md bg-cyan-400/[0.06] border border-cyan-400/10">
                        {post.tag}
                      </span>
                      {post.status === "coming-soon" && (
                        <span className="text-xs text-neutral-500 font-[family-name:var(--font-mono)]">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1.5 group-hover:text-cyan-300 transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  {post.status !== "coming-soon" && (
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-neutral-500 hover:text-cyan-400 transition-colors duration-200"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                  {post.status === "coming-soon" && (
                    <PenLine
                      size={18}
                      className="mt-1 text-neutral-600 shrink-0"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
