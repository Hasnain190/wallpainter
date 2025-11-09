import { RefObject, useEffect,  } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export const useFlipAnimation = (
  mainHeadingRef: RefObject<HTMLHeadingElement | null>
) => {
  useEffect(() => {
    // Animate main heading
    if (!mainHeadingRef || !mainHeadingRef.current) return;

    const heading = mainHeadingRef.current;
    const text = heading.textContent || "";
    heading.innerHTML = "";

    text.split(" ").forEach((word: string | null) => {
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mainHeadingRef]);
};
