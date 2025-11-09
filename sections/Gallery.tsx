"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import mural5 from "@/public/images/mural-5.png";
import mural6 from "@/public/images/mural-6.png";

gsap.registerPlugin(ScrollTrigger);

// Placeholder images - replace with your actual mural images
const galleryImages = [
  "/images/mural-1.jpg",
  "/images/mural-2.jpg",
  "/images/mural-3.jpg",
  "/images/mural-4.jpg",
  mural5,
  mural6,
];

export default function Gallery() {
  const mainHeadingRef = useRef<HTMLHeadingElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    // Animate all items
    itemRefs.current.forEach((item, i) => {
      if (!item) return;

      if (i === index) {
        // Hovered item - scale up
        gsap.to(item, {
          scale: 1.2,
          zIndex: 50,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        // Other items - scale down
        gsap.to(item, {
          scale: 0.5,
          zIndex: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);

    // Reset all items to normal size
    itemRefs.current.forEach((item) => {
      if (!item) return;
      gsap.to(item, {
        scale: 1,
        zIndex: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  };

  return (
    <section className="relative flex items-center justify-center bg-zinc-100 py-20 px-4 overflow-hidden">
      
      <div className="max-w-7xl w-full relative z-10">
        <div className="text-center mb-12 mx-auto">
          <h2
            ref={mainHeadingRef}
            className="text-5xl md:text-6xl font-bold text-zinc-800 mb-4"
            style={{ perspective: "1000px" }}
          >
            SEE OUR ART GALLERY
          </h2>
        </div>

        {/* 3x2 Grid with expandable effect */}
        <div className="overflow-hidden grid grid-cols-3 grid-rows-2 gap-1 bg-zinc-300 p-1 rounded-lg">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className="relative overflow-visible"
              style={{
                aspectRatio: "1/1",
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-full h-full bg-zinc-200">
                <Image
                  src={image}
                  alt={`Saqadat Art Gallery Painting ${index + 1}`}
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
