"use client";

import { useRef } from "react";
import gsap from "gsap";

interface LeverProps {
  onPull: () => void;
}

export default function Lever({ onPull }: LeverProps) {
  const leverRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!leverRef.current) return;

    // Animate lever pull down
    gsap.to(leverRef.current, {
      y: 40,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        // Execute the callback
        onPull();

        // Animate lever back up
        gsap.to(leverRef.current, {
          y: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
        });
      },
    });
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex flex-col items-center cursor-pointer group"
    >
      {/* Lever base/housing */}
      <div className="w-12 h-16 md:w-16 md:h-24 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg md:rounded-xl border-2 md:border-4 border-zinc-700 shadow-2xl relative overflow-hidden">
        {/* Inner housing shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

        {/* Lever handle */}
        <div
          ref={leverRef}
          className="absolute left-1/2 -translate-x-1/2 top-1 md:top-2 w-6 h-12 md:w-8 md:h-16 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow-lg border border-red-800 md:border-2 group-hover:from-red-400 group-hover:to-red-600 transition-colors"
        >
          {/* Handle shine */}
          <div className="absolute top-1 md:top-2 left-1/2 -translate-x-1/2 w-2 h-4 md:w-3 md:h-6 bg-white/30 rounded-full blur-sm"></div>
          {/* Handle grip lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 md:w-6 space-y-0.5 md:space-y-1">
            <div className="h-0.5 bg-black/20 rounded"></div>
            <div className="h-0.5 bg-black/20 rounded"></div>
            <div className="h-0.5 bg-black/20 rounded"></div>
          </div>
        </div>
      </div>

      {/* Label */}
      <span className="mt-1 md:mt-2 text-[10px] md:text-xs font-bold text-white/80 group-hover:text-white transition-colors">
        RESET
      </span>
    </button>
  );
}
