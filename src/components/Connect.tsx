"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Connect() {
  return (
    <section id="connect" className="relative py-24 sm:py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-[family-name:var(--font-mono)] text-cyan-400/70 mb-3 tracking-wide uppercase">
            Connect
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            Let&apos;s build something
          </h2>
          <p className="text-neutral-400 leading-relaxed mb-10 max-w-md mx-auto">
            Interested in AI-assisted development, autonomous agents, or just
            want to say hi? Reach out.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="https://x.com/prannayreddy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-neutral-300 transition-all duration-200 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-cyan-300"
            >
              <Twitter size={16} />
              <span>@prannayreddy</span>
            </a>
            <a
              href="https://github.com/prannayreddy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-neutral-300 transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/prannayreddy/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-neutral-300 transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:prannaysreddy@gmail.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-neutral-300 transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white"
            >
              <Mail size={16} />
              <span>Email</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
