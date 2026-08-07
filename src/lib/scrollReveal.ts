import { gsap } from "@/lib/gsap";

const DESKTOP_QUERY = "(min-width: 768px)";
const MOBILE_QUERY = "(max-width: 767px)";

type StaggerRevealOptions = {
  wrapperEl: HTMLElement;
  pinEl: HTMLElement;
  targets: Element[];
  /** fraction of the pin range left as a settled hold before release */
  holdAtEnd?: number;
};

/**
 * Pins a section for its wrapper's scroll range while `targets` fade/slide in
 * one after another (scrubbed). On narrow viewports, falls back to a simple
 * per-target fade-in with no pin.
 */
export function setupPinnedStaggerReveal({
  wrapperEl,
  pinEl,
  targets,
  holdAtEnd = 0.25,
}: StaggerRevealOptions) {
  return gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add({ isDesktop: DESKTOP_QUERY, isMobile: MOBILE_QUERY }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };

      gsap.set(targets, { opacity: 0, y: 24 });

      if (!isDesktop) {
        const tweens = targets.map((el) =>
          gsap.to(el, {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
            },
          })
        );

        return () => {
          tweens.forEach((tw) => tw.scrollTrigger?.kill());
        };
      }

      const revealSpan = 1 - holdAtEnd;
      const staggerGap = targets.length > 1 ? revealSpan / targets.length : revealSpan;
      const tweenDuration = staggerGap * 0.8;

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

      targets.forEach((el, i) => {
        tl.to(el, { opacity: 1, y: 0, duration: tweenDuration }, i * staggerGap);
      });

      tl.set(pinEl, {}, 1);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
  }, wrapperEl);
}
