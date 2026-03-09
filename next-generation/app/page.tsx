"use client";

import { Hero } from "@/components/hero";
import ServicesPage from "@/components/services";

export default function Home() {
  return (
    <div className="page-wrapper">
      <Hero />
      <ServicesPage />
    </div>
  );
}