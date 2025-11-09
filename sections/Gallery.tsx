"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Placeholder images - replace with your actual mural images
const galleryImages = [
  "/images/mural-1.jpg",
  "/images/mural-2.jpg",
  "/images/mural-3.jpg",
  "/images/mural-4.jpg",
  "/images/mural-5.jpg",
  "/images/mural-6.jpg",
];

export default function Gallery() {
  const mainHeadingRef = useRef<HTMLHeadingElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // Animate main heading
    if (mainHeadingRef.current) {
      const heading = mainHeadingRef.current;
      const text = heading.textContent || "";
      heading.innerHTML = "";

      text.split(" ").forEach((word) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.marginRight = "0.25em";
        heading.appendChild(span);
      });

      const words = heading.querySelectorAll("span");

      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 50,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getGridItemClass = (index: number) => {
    if (hoveredIndex === null) {
      return "col-span-1 row-span-1";
    }

    if (hoveredIndex === index) {
      return "col-span-2 row-span-2";
    }

    return "col-span-1 row-span-1";
  };

  return (
    <section className="flex items-center justify-center bg-zinc-100 py-20 px-4">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-12 mx-auto">
          <h2
            ref={mainHeadingRef}
            className="text-5xl md:text-6xl font-bold text-zinc-800 mb-4"
            style={{ perspective: "1000px" }}
          >
            SEE OUR ART GALLERY
          </h2>
        </div>

        {/* 2x3 Grid with expandable effect */}
        <div className="grid grid-cols-3 grid-rows-2 gap-1 bg-zinc-300 p-1 rounded-lg">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden transition-all duration-500 ease-out ${getGridItemClass(
                index
              )}`}
              style={{
                aspectRatio: hoveredIndex === index ? "1/1" : "1/1",
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-full h-full bg-zinc-200">
                <Image
                  src={image}
                  alt={`Mural art ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 33vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
