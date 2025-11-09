"use client";

import Card from "@/components/Card";
import { SERVICES } from "@/constants";
import { useRef } from "react";
import { useParallax } from "@/customHooks/useParallax";
import serviceSVG from "@/public/services.svg";
import FloatingSVG from "@/components/FloatingSVG";
export default function Services() {
  const services = SERVICES.slice(0, 6);
  const sectionRef = useRef<HTMLElement>(null);

  // Add parallax effect
  useParallax(sectionRef, { speed: 60, opacity: false });

  return (
    <section
      ref={sectionRef}
      className="qualities-section py-12 m-5 relative bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 text-white w-full mx-auto"
    >
      <FloatingSVG
        src={serviceSVG}
        alt="services"
        width={200}
        height={200}
        className="absolute top-0 left-10 hidden sm:block"
        floatSpeed={4}
        floatDistance={15}
        rotationAmount={6}
      />
      <h1 className="font-bold text-center my-8 p-7 text-5xl sm:text-7xl">
        Our Most Popular Services
      </h1>
      <div className="services-card-container  flex flex-col md:flex-row gap-6 px-4 container mx-auto">
        {services.map((service) => (
          <Card key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
