import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  speed?: number; // How fast to move (higher = faster). Default: 100
  direction?: "up" | "down"; // Direction of movement. Default: "down"
  opacity?: boolean; // Whether to fade out on scroll. Default: false
  opacityRange?: [number, number]; // Opacity range [start, end]. Default: [1, 0.3]
}

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  const {
    speed = 100,
    direction = "down",
    opacity = false,
    opacityRange = [1, 0.3],
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const yValue = direction === "down" ? speed : -speed;

    const animation: gsap.TweenVars = {
      y: yValue,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    };

    if (opacity) {
      animation.opacity = opacityRange[1];
      animation.scrollTrigger = {
        ...(animation.scrollTrigger as object),
        onUpdate: (self: ScrollTrigger) => {
          gsap.to(element, {
            opacity: gsap.utils.interpolate(
              opacityRange[0],
              opacityRange[1],
              self.progress
            ),
            duration: 0,
          });
        },
      };
    }

    gsap.to(element, animation);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [ref, speed, direction, opacity, opacityRange]);
}
