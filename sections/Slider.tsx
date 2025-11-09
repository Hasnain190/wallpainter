"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import schoolWallUnpainted from "@/public/images/school-wall-unpainted.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import magicSVG from "@/public/magic.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Comparison() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // Percentage
  const isDraggingRef = useRef(false);
  const sliderLineRef = useRef<HTMLDivElement>(null);
  const beforeImageRef = useRef<HTMLDivElement>(null);
  const targetPositionRef = useRef(50);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);

  // Animate heading on scroll
  useEffect(() => {
    if (!headingRef.current || !subheadingRef.current) return;

    // Split heading into words
    const heading = headingRef.current;
    const text = heading.textContent || "";
    heading.innerHTML = "";

    text.split(" ").forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.marginRight = "0.25em";
      heading.appendChild(span);
    });

    const words = heading.querySelectorAll("span");

    // Animate words with stagger
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

    // Animate subheading
    gsap.fromTo(
      subheadingRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Smooth animation for slider position
    gsap.to(
      {},
      {
        duration: 0.3,
        ease: "power2.out",
        onUpdate: function () {
          const progress = this.progress();
          const current = sliderPosition;
          const target = targetPositionRef.current;
          const newPosition = current + (target - current) * progress;
          setSliderPosition(newPosition);
        },
      }
    );
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    // Clamp between 0 and 100
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    if (isDraggingRef.current) {
      // Immediate update while dragging
      setSliderPosition(clampedPercentage);
    } else {
      // Smooth animation when not dragging
      targetPositionRef.current = clampedPercentage;
      gsap.to(
        { value: sliderPosition },
        {
          value: clampedPercentage,
          duration: 0.5,
          ease: "power2.out",
          onUpdate: function () {
            setSliderPosition(this.targets()[0].value);
          },
        }
      );
    }
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
    // Scale up handle when grabbing
    if (sliderLineRef.current) {
      gsap.to(sliderLineRef.current.querySelector(".slider-handle"), {
        scale: 1.2,
        duration: 0.2,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    // Scale back handle when releasing
    if (sliderLineRef.current) {
      gsap.to(sliderLineRef.current.querySelector(".slider-handle"), {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className=" relative flex items-center justify-center bg-zinc-100 py-20 px-4">
      <Image
        src={magicSVG}
        alt="magic"
        width={200}
        height={200}
        className="absolute top-0 left-10 hidden sm:block "
      />
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl font-bold text-zinc-800 mb-4"
            style={{ perspective: "1000px" }}
          >
            See The Magic
          </h2>
          <p ref={subheadingRef} className="text-2xl md:text-xl text-zinc-600">
            How mural art bring life to your boring dusty wall
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl cursor-ew-resize select-none"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* After Image (Painted Wall) - Full width */}
          <div className="absolute inset-0">
            <Image
              src="/images/school-wall.jpg"
              alt="School wall with mural painting"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
              AFTER
            </div>
          </div>

          {/* Before Image (Unpainted Wall) - Clipped by slider */}
          <div
            ref={beforeImageRef}
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            <Image
              src={schoolWallUnpainted}
              alt="School wall before painting"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
              BEFORE
            </div>
          </div>

          {/* Slider Line and Handle */}
          <div
            ref={sliderLineRef}
            className="absolute top-0 bottom-0 w-5 shadow-lg z-10 backdrop-blur-sm border border-white/30"
            style={{
              left: `${sliderPosition}%`,
              background:
                "linear-gradient(90deg, transparent 0%, yellow 50%, transparent 100%)",
            }}
          >
            <div
              className="rope h-[200%]  overflow-hidden"
              style={{ position: "relative", bottom: `${sliderPosition}%` }}
            >
              {[...new Array(100)].map((_, i) => (
                <div
                  key={i}
                  className={`roller bg-amber-50 w-1 h-11 rounded-2xl top `}
                  style={{
                    position: "absolute",
                    top: i * 16,
                    rotate: "45deg",
                  }}
                ></div>
              ))}
            </div>

            {/* Handle */}
            <div
              className="slider-handle absolute top-1/2 -translate-y-1/2 -translate-x-1/3 w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing backdrop-blur-sm border-2 border-white bg-zinc-200/80"
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              {/* Left Arrow */}
              <svg
                className="w-4 h-4 md:w-6 md:h-6 text-zinc-700 absolute left-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>

              {/* Right Arrow */}
              <svg
                className="w-4 h-4 md:w-6 md:h-6 text-zinc-700 absolute right-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-6 px-4">
          <div className="text-center">
            <div className="text-sm md:text-base text-zinc-500 uppercase tracking-wide">
              Lifeless Walls
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm md:text-base text-zinc-500 uppercase tracking-wide">
              Vibrant & Alive
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
