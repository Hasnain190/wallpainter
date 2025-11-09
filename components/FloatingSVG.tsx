"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";

interface FloatingSVGProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  floatSpeed?: number; // Duration in seconds (lower = faster)
  floatDistance?: number; // Distance to move in pixels
  rotationAmount?: number; // Rotation in degrees
}

export default function FloatingSVG({
  src,
  alt,
  width = 200,
  height = 200,
  className = "",
  floatSpeed = 3,
  floatDistance = 15,
  rotationAmount = 5,
}: FloatingSVGProps) {
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const element = svgRef.current;

    // Floating up and down animation
    gsap.to(element, {
      y: floatDistance,
      duration: floatSpeed,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Floating left and right animation
    gsap.to(element, {
      x: floatDistance / 2,
      duration: floatSpeed * 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5,
    });

    // Subtle rotation animation
    gsap.to(element, {
      rotation: rotationAmount,
      duration: floatSpeed * 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Subtle scale pulsing
    gsap.to(element, {
      scale: 1.05,
      duration: floatSpeed * 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.3,
    });

    return () => {
      gsap.killTweensOf(element);
    };
  }, [floatSpeed, floatDistance, rotationAmount]);

  return (
    <div ref={svgRef} className={className}>
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
}
