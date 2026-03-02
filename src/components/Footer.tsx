"use client";

import { Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Prannay Reddy. Built with AI.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/prannayreddy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 transition-colors duration-200 hover:text-white"
          >
            <Github size={18} />
          </a>
          <a
            href="https://x.com/prannayreddy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 transition-colors duration-200 hover:text-white"
          >
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
