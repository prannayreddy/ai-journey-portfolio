"use client";

import { motion } from "framer-motion";
import { Bot, GitBranch, Rocket, Eye } from "lucide-react";

const steps = [
  {
    icon: <Bot size={18} />,
    label: "Prompt",
    description: "Described the portfolio vision to an AI agent",
    time: "0 min",
  },
  {
    icon: <GitBranch size={18} />,
    label: "Code",
    description: "Agent wrote Next.js, Tailwind, and Framer Motion components",
    time: "~8 min",
  },
  {
    icon: <Rocket size={18} />,
    label: "Ship",
    description: "Pushed to GitHub and deployed to Vercel autonomously",
    time: "~12 min",
  },
  {
    icon: <Eye size={18} />,
    label: "Iterate",
    description: "Live edits, fixes, and new features — all through conversation",
    time: "Ongoing",
  },
];

export default function HowBuilt() {
  return (
    <section id="how-built" className="relative py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-[family-name:var(--font-mono)] text-cyan-400/70 mb-3 tracking-wide uppercase">
            Meta
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            How this portfolio was built
          </h2>
          <p className="text-neutral-400 mt-4 max-w-xl">
            This entire site was generated, pushed, and deployed by an AI agent.
            No IDE was opened. No terminal was touched.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/[0.06]" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex items-start gap-5 pl-0"
              >
                {/* Icon node */}
                <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-900 border border-white/[0.08] text-cyan-400 shrink-0">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="pt-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-semibold text-white">
                      {step.label}
                    </h3>
                    <span className="text-xs font-[family-name:var(--font-mono)] text-neutral-500 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
