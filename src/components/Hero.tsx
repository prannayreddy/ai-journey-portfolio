"use client";

import { motion } from "framer-motion";
import { Github, Twitter, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 211, 238, 0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        {/* Terminal-style label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-neutral-400 font-[family-name:var(--font-mono)]">
            building with ai
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6"
        >
          Building at the
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
            speed of thought.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Exploring the frontier of AI&#8209;assisted development &mdash;
          shipping real products with autonomous agents.
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="https://github.com/prannayreddy"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-sm text-neutral-300 transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.04] hover:text-white"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
          <a
            href="https://x.com/prannayreddy"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-sm text-neutral-300 transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.04] hover:text-white"
          >
            <Twitter size={16} />
            <span>X / Twitter</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-neutral-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
