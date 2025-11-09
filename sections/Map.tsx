"use client";
import { useFlipAnimation } from "@/customHooks/flipAnimation";
import { useRef } from "react";
import { useParallax } from "@/customHooks/useParallax";
import mapSVG from "@/public/location.svg";
import FloatingSVG from "@/components/FloatingSVG";

export default function Map() {
  const mainHeadingRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useFlipAnimation(mainHeadingRef);
  useParallax(sectionRef, { speed: 70, opacity: false });

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 py-16 relative"
    >
      <FloatingSVG
        src={mapSVG}
        alt="location"
        width={200}
        height={200}
        className="absolute top-0 left-10 hidden sm:block"
        floatSpeed={3.5}
        floatDistance={18}
        rotationAmount={7}
      />
      <div className="max-w-7xl mx-auto px-6">
        <h1
          ref={mainHeadingRef}
          className="font-bold text-center my-8 p-7 text-5xl sm:text-7xl text-white"
        >
          We are from Fateh Jhang Islamabad
        </h1>
        <div className="bg-gray-300 rounded-2xl overflow-hidden shadow-lg h-96 flex items-center justify-center">
          <div className="text-gray-600 w-full h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.6524935785105!2d72.6403433!3d33.56240410000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df7500640b41ed%3A0x5389e06cf2c28575!2sSadaqat%20arts%20painter!5e0!3m2!1sen!2s!4v1762666913314!5m2!1sen!2s"
              className="w-full h-full"
              style={{ border: "0" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
