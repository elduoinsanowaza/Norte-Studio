"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import CtaButton from "@/components/booking/CtaButton";
import Highlight from "@/components/Highlight";
import {
  BOTTLE_QUESTION,
  BOTTLE_QUESTION_HIGHLIGHT_WORDS,
  SYSTEM_WORDS,
} from "@/lib/content";
import { gsap } from "@/lib/gsap";

const DESKTOP_QUERY = "(min-width: 768px)";
const MOBILE_QUERY = "(max-width: 767px)";

/** Fractional bounding box of the cap + neck within the bottle photo, used as the zoom's transform-origin (the photo has no queryable regions like the old SVG did). */
const NECK_BBOX_FRACTION = { x: 0.3, y: 0.01, width: 0.4, height: 0.22 };

/**
 * Each phase gets a fixed budget in vh, so the zoom/translate/question beats
 * keep the exact same scroll "feel" regardless of word count — only the
 * words phase (and therefore the wrapper's total height) grows to fit them
 * without compressing.
 */
const HOLD_VH = 40;
const ZOOM_VH = 140;
const TRANSLATE_VH = 40;
const QUESTION_VH = 20;
const WORD_DURATION_VH = 24;
const WORD_STAGGER_VH = 13;
const MARGIN_VH = 20;

// +1 for the CTA, which reveals right after the last word.
const REVEAL_TARGET_COUNT = SYSTEM_WORDS.length + 1;
const WORDS_PHASE_VH =
  (REVEAL_TARGET_COUNT - 1) * WORD_STAGGER_VH + WORD_DURATION_VH;
const TOTAL_VH =
  HOLD_VH + ZOOM_VH + TRANSLATE_VH + QUESTION_VH + WORDS_PHASE_VH + MARGIN_VH;

export default function BottleSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bottleGroupRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const questionRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<Array<HTMLLIElement | null>>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapperEl = wrapperRef.current;
    const pinEl = pinRef.current;
    const groupEl = bottleGroupRef.current;
    const imgEl = imgRef.current;
    const questionEl = questionRef.current;
    const ctaEl = ctaRef.current;
    const words = wordRefs.current.filter((el): el is HTMLLIElement => !!el);

    if (!wrapperEl || !pinEl || !groupEl || !imgEl || !questionEl || !ctaEl) {
      return;
    }

    const revealTargets = [...words, ctaEl];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({ isDesktop: DESKTOP_QUERY, isMobile: MOBILE_QUERY }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        gsap.set(questionEl, { opacity: 0, y: 16 });
        gsap.set(revealTargets, { opacity: 0, y: 10 });
        gsap.set(groupEl, { x: 0, scale: 1 });

        if (!isDesktop) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapperEl,
              start: "top 75%",
              end: "top 30%",
              scrub: true,
            },
            defaults: { ease: "none" },
          });

          tl.to(questionEl, { opacity: 1, y: 0, duration: 0.3 }).to(
            revealTargets,
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
            "<0.1"
          );

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        }

        const originXPercent =
          (NECK_BBOX_FRACTION.x + NECK_BBOX_FRACTION.width / 2) * 100;
        const originYPercent =
          (NECK_BBOX_FRACTION.y + NECK_BBOX_FRACTION.height / 2) * 100;

        gsap.set(groupEl, {
          transformOrigin: `${originXPercent}% ${originYPercent}%`,
        });

        const imgWidth = imgEl.getBoundingClientRect().width || 1;
        const neckWidthAtScale1 = NECK_BBOX_FRACTION.width * imgWidth;
        const targetNeckWidth = window.innerWidth * 0.32;
        const zoomScale = gsap.utils.clamp(
          2.4,
          6,
          targetNeckWidth / Math.max(neckWidthAtScale1, 1)
        );

        // Fractions of the total pin range, derived from the fixed vh
        // budgets above so zoom/translate/question keep their original
        // scroll "feel" regardless of how many words there are.
        const holdEnd = HOLD_VH / TOTAL_VH;
        const zoomEnd = (HOLD_VH + ZOOM_VH) / TOTAL_VH;
        const translateEnd = (HOLD_VH + ZOOM_VH + TRANSLATE_VH) / TOTAL_VH;
        const questionEnd =
          (HOLD_VH + ZOOM_VH + TRANSLATE_VH + QUESTION_VH) / TOTAL_VH;
        const wordDuration = WORD_DURATION_VH / TOTAL_VH;
        const staggerGap =
          revealTargets.length > 1 ? WORD_STAGGER_VH / TOTAL_VH : 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperEl,
            start: "top top",
            end: "bottom bottom",
            pin: pinEl,
            scrub: true,
            anticipatePin: 1,
          },
          defaults: { ease: "none" },
        });

        tl.to(groupEl, { scale: zoomScale, duration: zoomEnd - holdEnd }, holdEnd)
          .to(groupEl, { x: "-25vw", duration: translateEnd - zoomEnd }, zoomEnd)
          .to(
            questionEl,
            { opacity: 1, y: 0, duration: questionEnd - translateEnd },
            translateEnd
          )
          .to(
            revealTargets,
            { opacity: 1, y: 0, duration: wordDuration, stagger: staggerGap },
            questionEnd
          )
          .set(pinEl, {}, 1);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }, wrapperEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative bg-ns-white text-ns-black md:h-[var(--bottle-total-vh)]"
      style={{ "--bottle-total-vh": `${TOTAL_VH}vh` } as React.CSSProperties}
    >
      <div
        ref={pinRef}
        className="relative flex flex-col items-center gap-ns-6 px-ns-4 py-ns-9 text-center md:h-screen md:w-full md:flex-row md:items-center md:justify-center md:overflow-hidden md:px-0 md:py-0 md:text-left"
      >
        <div className="flex justify-center md:absolute md:inset-0 md:items-center md:justify-center">
          <div ref={bottleGroupRef} className="will-change-transform">
            <Image
              ref={imgRef}
              src="/images/botella.png"
              alt="Botella de Norte Studio"
              width={973}
              height={3738}
              priority
              className="block h-[50vh] max-h-[500px] w-auto md:h-[70vh] md:max-h-[720px]"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-ns-5 md:absolute md:inset-0 md:flex md:items-center md:justify-center md:pr-[8vw] md:pl-[max(8vw,calc(50%+64px))] md:text-left">
          <div className="flex max-w-md flex-col items-center gap-ns-5 md:items-start">
            <p
              ref={questionRef}
              className="text-3xl leading-[1.1] font-medium sm:text-4xl lg:text-question"
            >
              <Highlight
                text={BOTTLE_QUESTION}
                words={BOTTLE_QUESTION_HIGHLIGHT_WORDS}
              />
            </p>

            <ul className="flex flex-wrap justify-center gap-x-ns-3 gap-y-ns-2 text-micro tracking-[0.06em] uppercase opacity-70 md:justify-start">
              {SYSTEM_WORDS.map((word, i) => (
                <li
                  key={word}
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  className="border-b border-ns-black/30 pb-1"
                >
                  {word}
                </li>
              ))}
            </ul>

            <div ref={ctaRef} className="md:self-center">
              <CtaButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
