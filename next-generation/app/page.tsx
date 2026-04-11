import { Hero } from "@/components/hero";
import { BandSection } from "@/components/band";
import { ServicesPage } from "@/components/services";
import { InstagramGallery } from "@/components/instagram";

export default function Home() {
  return (
    <div className="page-wrapper">
      <Hero />
      <ServicesPage />
      <BandSection />
      <InstagramGallery />
    </div>
  );
}