import { Hero } from "@/components/hero";
import { BandSection } from "@/components/band";
import { ServicesPage } from "@/components/services";

export default function Home() {
  return (
    <div className="page-wrapper">
      <Hero />
      <ServicesPage />
      <BandSection />
    </div>
  );
}