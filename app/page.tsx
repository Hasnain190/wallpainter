import Comparison from "@/sections/Slider";
import Hero from "@/sections/Hero";
import Gallery from "@/sections/Gallery";
import CTA from "@/sections/CTA";
import Services from "@/sections/services";
import Map from "@/sections/Map";
import { WhatsAppWidget } from "@/components/WhatsappWidget";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Comparison />
      <Gallery />
      <Services />
      <CTA />
      <Map />
      <WhatsAppWidget />
    </div>
  );
}
