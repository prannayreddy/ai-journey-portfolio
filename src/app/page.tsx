"use client";

import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import HowBuilt from "@/components/HowBuilt";
import Writing from "@/components/Writing";
import About from "@/components/About";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen">
      <Hero />
      <Journey />
      <HowBuilt />
      <Writing />
      <About />
      <Connect />
      <Footer />
    </main>
  );
}
