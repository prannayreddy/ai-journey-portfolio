"use client";

import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen">
      <Hero />
      <Journey />
      <About />
      <Footer />
    </main>
  );
}
