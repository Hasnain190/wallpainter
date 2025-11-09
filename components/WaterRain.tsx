"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface WaterRainProps {
  isActive: boolean;
  onComplete?: () => void;
}

export default function WaterRain({ isActive, onComplete }: WaterRainProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const droplets: HTMLDivElement[] = [];

    // Create multiple water droplets
    const createDroplets = () => {
      const numDroplets = 50;

      for (let i = 0; i < numDroplets; i++) {
        const droplet = document.createElement("div");
        droplet.className = "water-droplet";

        // Random horizontal position
        const xPos = Math.random() * 100;
        droplet.style.left = `${xPos}%`;

        // Random delay for staggered effect
        const delay = Math.random() * 0.5;

        // Random size
        const size = Math.random() * 3 + 2; // 2-5px
        droplet.style.width = `${size}px`;
        droplet.style.height = `${size * 3}px`; // Elongated droplet

        // Styling
        droplet.style.position = "absolute";
        droplet.style.top = "-20px";
        droplet.style.background =
          "linear-gradient(to bottom, rgba(100, 200, 255, 0.8), rgba(150, 220, 255, 0.6))";
        droplet.style.borderRadius = "50%";
        droplet.style.pointerEvents = "none";
        droplet.style.boxShadow = "0 0 3px rgba(100, 200, 255, 0.5)";

        container.appendChild(droplet);
        droplets.push(droplet);

        // Animate droplet falling
        gsap.to(droplet, {
          y: window.innerHeight + 20,
          duration: 1 + Math.random() * 0.5,
          delay: delay,
          ease: "linear",
          onComplete: () => {
            // Create splash effect at bottom
            createSplash(xPos);
          },
        });
      }

      // Clean up after animation
      setTimeout(() => {
        droplets.forEach((droplet) => {
          container.removeChild(droplet);
        });
        if (onComplete) onComplete();
      }, 2000);
    };

    const createSplash = (xPos: number) => {
      const splash = document.createElement("div");
      splash.style.position = "absolute";
      splash.style.left = `${xPos}%`;
      splash.style.bottom = "0";
      splash.style.width = "20px";
      splash.style.height = "20px";
      splash.style.background =
        "radial-gradient(circle, rgba(100, 200, 255, 0.6), transparent)";
      splash.style.borderRadius = "50%";
      splash.style.pointerEvents = "none";

      container.appendChild(splash);

      gsap.to(splash, {
        scale: 2,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          container.removeChild(splash);
        },
      });
    };

    createDroplets();
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ overflow: "hidden" }}
    />
  );
}
