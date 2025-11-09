"use client";

import Image from "next/image";
import pakistaniFlag from "@/public/images/pakistaniflag.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Lever from "@/components/Lever";
import WaterRain from "@/components/WaterRain";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [isRaining, setIsRaining] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isPaintingRef = useRef(false);

  useEffect(() => {
    // Detect touch device
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchDevice);

    // Initialize canvas with white background
    if (touchDevice && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas size to match window size with proper scaling
        const resizeCanvas = () => {
          const dpr = window.devicePixelRatio || 1;
          const rect = canvas.getBoundingClientRect();

          // Set the internal size (scaled for DPI)
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;

          // Scale the context to match DPI
          ctx.scale(dpr, dpr);

          // Set display size via CSS
          canvas.style.width = `${rect.width}px`;
          canvas.style.height = `${rect.height}px`;

          // Fill with white initially
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, rect.width, rect.height);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => window.removeEventListener('resize', resizeCanvas);
      }
    }
  }, []);

  const handleLeverPull = () => {
    // Start water rain animation
    setIsRaining(true);
  };

  const handleRainComplete = () => {
    // Reset colors after rain completes
    if (!titleRef.current) return;

    // Find all colorized spans
    const colorizedSpans = titleRef.current.querySelectorAll("span");

    colorizedSpans.forEach((span) => {
      // Replace span with its text content
      const textNode = document.createTextNode(span.textContent || "");
      span.parentNode?.replaceChild(textNode, span);
    });

    // Normalize to merge adjacent text nodes
    titleRef.current.normalize();

    // Reset canvas for touch devices
    if (isTouchDevice && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        // Clear and refill with white
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, rect.width, rect.height);
      }
    }

    // Stop raining
    setIsRaining(false);
  };

  // Parallax effect
  useEffect(() => {
    if (!heroSectionRef.current || !backgroundRef.current || !titleRef.current) return;

    // Background parallax - moves slower (creating depth)
    gsap.to(backgroundRef.current, {
      y: 300,
      ease: "none",
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Text parallax - moves faster (pops out)
    gsap.to(titleRef.current, {
      y: -150,
      opacity: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".title",
      {
        opacity: 0,
        duration: 1,
        y: 100,
        ease: "power2.inOut",
      },
      { opacity: 1, duration: 1, y: 0, ease: "power2.inOut" }
    );

    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const selectedText = range.toString().trim();

      if (
        !selectedText ||
        !titleRef.current?.contains(range.commonAncestorContainer)
      ) {
        return;
      }

      const colors = [
        "#FF6B35",
        "#FFC300",
        "#4ECDC4",
        "#FF006E",
        "#8338EC",
        "#3A86FF",
        "#00F5FF",
        "#FF1744",
      ];

      try {
        // Get all text nodes that might be affected
        const getTextNodesInRange = (range: Range): Text[] => {
          const textNodes: Text[] = [];
          const startNode = range.startContainer;
          const endNode = range.endContainer;

          // If selection is within a single text node
          if (startNode === endNode && startNode.nodeType === Node.TEXT_NODE) {
            textNodes.push(startNode as Text);
          } else {
            // Multi-node selection
            const walker = document.createTreeWalker(
              titleRef.current!,
              NodeFilter.SHOW_TEXT,
              {
                acceptNode: (node) => {
                  return range.intersectsNode(node)
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
                },
              }
            );

            let node;
            while ((node = walker.nextNode())) {
              textNodes.push(node as Text);
            }
          }
          return textNodes;
        };

        const textNodes = getTextNodesInRange(range);

        textNodes.forEach((textNode) => {
          const nodeRange = document.createRange();
          nodeRange.selectNodeContents(textNode);

          const intersectionRange = document.createRange();
          intersectionRange.setStart(
            range.startContainer === textNode ||
              nodeRange.compareBoundaryPoints(Range.START_TO_START, range) < 0
              ? range.startContainer
              : textNode,
            range.startContainer === textNode ? range.startOffset : 0
          );
          intersectionRange.setEnd(
            range.endContainer === textNode ||
              nodeRange.compareBoundaryPoints(Range.END_TO_END, range) > 0
              ? range.endContainer
              : textNode,
            range.endContainer === textNode ? range.endOffset : textNode.length
          );

          const start =
            textNode === range.startContainer ? range.startOffset : 0;
          const end =
            textNode === range.endContainer
              ? range.endOffset
              : textNode.textContent!.length;

          if (start >= end) return;

          const beforeText = textNode.textContent!.substring(0, start);
          const selectedText = textNode.textContent!.substring(start, end);
          const afterText = textNode.textContent!.substring(end);

          const fragment = document.createDocumentFragment();

          if (beforeText) {
            fragment.appendChild(document.createTextNode(beforeText));
          }

          selectedText.split("").forEach((char) => {
            const charSpan = document.createElement("span");
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];
            charSpan.style.color = randomColor;
            charSpan.textContent = char;
            fragment.appendChild(charSpan);
          });

          if (afterText) {
            fragment.appendChild(document.createTextNode(afterText));
          }

          textNode.parentNode?.replaceChild(fragment, textNode);
        });

        selection.removeAllRanges();
      } catch (error) {
        console.error("Selection error:", error);
      }
    };

    // Touch painting for mobile/tablet
    const handleTouchStart = (e: TouchEvent) => {
      if (!isTouchDevice || !canvasRef.current) return;
      isPaintingRef.current = true;
      handleTouchPaint(e);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPaintingRef.current || !canvasRef.current) return;
      e.preventDefault(); // Prevent scrolling while painting
      handleTouchPaint(e);
    };

    const handleTouchEnd = () => {
      isPaintingRef.current = false;
    };

    const handleTouchPaint = (e: TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();

      // Calculate position relative to canvas
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      // Draw brush stroke with single color
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#FF6B35'; // Solid orange color
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2); // 60px diameter (30px radius)
      ctx.fill();
    };

    // Only add listeners after we know if it's a touch device
    if (!isTouchDevice) {
      document.addEventListener("mouseup", handleSelection);
    } else {
      document.addEventListener("touchstart", handleTouchStart, { passive: false });
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isTouchDevice]);

  return (
    <section
      ref={heroSectionRef}
      className="relative flex min-h-screen items-center justify-center bg-zinc-50 text-white overflow-hidden"
    >
      <div ref={backgroundRef} className="absolute inset-0 w-full h-full">
        <Image
          src={pakistaniFlag}
          alt="Sadaqat arts mural painting"
          fill
          className="object-cover brightness-50 select-none pointer-events-none"
        />
      </div>

      <WaterRain isActive={isRaining} onComplete={handleRainComplete} />
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
        <Lever onPull={handleLeverPull} />
      </div>

      {/* Canvas for touch painting - behind text, uses mix-blend-mode */}
      {isTouchDevice && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-[5]"
          style={{
            pointerEvents: 'none',
            mixBlendMode: 'multiply',
            opacity: 0.9,
          }}
        />
      )}

      <div
        ref={titleRef}
        className={`title text-center font-bold px-4 relative z-10 font-story text-7xl lg:text-8xl xl:text-9xl leading-tight ${
          isTouchDevice ? 'select-none' : ''
        }`}
        style={
          isTouchDevice
            ? {
                color: 'white',
                mixBlendMode: 'difference',
              }
            : {
                color: 'white',
              }
        }
      >
        <h2 className="">Best Mural Painter in Islamabad </h2>{" "}
        <div className="font-sans ">Sadaqat Arts Painter</div>
      </div>
    </section>
  );
}
