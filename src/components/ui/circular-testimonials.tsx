"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}

interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

// The fanned-out side cards need to sit further apart on a wide container than a
// narrow one, otherwise they overlap the centre card at 1024px and float away
// from it at 1456px. Linear between those two breakpoints, then keeps creeping
// outward past 1456 so ultra-wide layouts don't look gap-locked.
function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) {
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const count = testimonials.length;
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials],
  );

  useEffect(() => {
    const element = imageContainerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setContainerWidth(entry.contentRect.width),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // activeIndex is a dependency on purpose: any manual nav tears down the timer
  // and starts a fresh 5s, so a card the reader just chose never flips away
  // mid-sentence. Also respects reduced-motion — autoplay is unrequested motion.
  useEffect(() => {
    if (!autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActiveIndex((prev) => (prev + 1) % count), 5000);
    return () => clearInterval(id);
  }, [autoplay, count, activeIndex]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % count);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + count) % count);

  // Only three cards are ever visible — centre, one left, one right. Everything
  // else is parked at opacity 0 so a 12-testimonial list costs the same as 3.
  function getImageStyle(index: number): CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const transition = "all 0.8s cubic-bezier(.4,2,.3,1)";
    const isLeft = (activeIndex - 1 + count) % count === index;
    const isRight = (activeIndex + 1) % count === index;

    if (index === activeIndex) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition,
      };
    }
    if (isLeft || isRight) {
      const direction = isLeft ? -1 : 1;
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${direction * gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(${-direction * 15}deg)`,
        transition,
      };
    }
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition };
  }

  return (
    <div className="w-full max-w-4xl p-8">
      <div className="grid gap-20 md:grid-cols-2">
        <div
          ref={imageContainerRef}
          className="relative h-96 w-full [perspective:1000px]"
        >
          {testimonials.map((testimonial, index) => (
            // eslint-disable-next-line @next/next/no-img-element -- remote portraits, no next/image remotePatterns config needed
            <img
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.name}
              className="absolute h-full w-full rounded-3xl object-cover shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
              style={getImageStyle(index)}
            />
          ))}
        </div>

        <div className="flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3
                className="mb-1 font-bold"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h3>
              <p
                className="mb-8"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </p>
              {/* Word-by-word deblur: the quote reads as if it's being spoken
                  rather than pasted. 25ms stagger keeps a 40-word quote under 1s. */}
              <p
                className="leading-[1.75]"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={`${activeIndex}-${i}`}
                    className="inline-block"
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * i }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-6 pt-12 md:pt-0">
            <button
              type="button"
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg }}
            >
              <FaArrowLeft size={28} color={colorArrowFg} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg }}
            >
              <FaArrowRight size={28} color={colorArrowFg} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CircularTestimonials;
