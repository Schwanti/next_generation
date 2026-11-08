import { Hero } from "@/components/hero";
import { ServicesPage } from "@/components/services";
import { Auftritte } from "@/components/auftritte";
import { BandSection } from "@/components/band";
import { InstagramGallery } from "@/components/instagram";
import { BookingSection } from "@/components/booking";
import { ContactSection } from "@/components/contact";

export default function Home() {
  return (
    <div className="page-wrapper">
      <Hero />
      <ServicesPage />
      <Auftritte />
      <BandSection />
      <InstagramGallery />
      <BookingSection />
      <ContactSection />
    </div>
  );
}
