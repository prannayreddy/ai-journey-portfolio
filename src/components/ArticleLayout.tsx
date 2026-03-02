"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";

interface ArticleLayoutProps {
  title: string;
  description: string;
  tag: string;
  readTime: string;
  date: string;
  children: React.ReactNode;
}

export default function ArticleLayout({
  title,
  description,
  tag,
  readTime,
  date,
  children,
}: ArticleLayoutProps) {
  return (
    <main className="relative z-10 min-h-screen">
      <article className="relative py-16 sm:py-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/#writing"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-cyan-400 transition-colors duration-200 mb-10 font-[family-name:var(--font-mono)]"
            >
              <ArrowLeft size={14} />
              Back to portfolio
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-[family-name:var(--font-mono)] text-cyan-400/60 px-2 py-0.5 rounded-md bg-cyan-400/[0.06] border border-cyan-400/10">
                {tag}
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-500 font-[family-name:var(--font-mono)]">
                <Calendar size={11} />
                {date}
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-500 font-[family-name:var(--font-mono)]">
                <Clock size={11} />
                {readTime}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">
              {title}
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              {description}
            </p>
          </motion.header>

          {/* Divider */}
          <div className="w-12 h-px bg-white/10 mb-12" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose-custom"
          >
            {children}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-white/[0.06]"
          >
            <Link
              href="/#writing"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-cyan-400 transition-colors duration-200 font-[family-name:var(--font-mono)]"
            >
              <ArrowLeft size={14} />
              Back to all writing
            </Link>
          </motion.div>
        </div>
      </article>
    </main>
  );
}
