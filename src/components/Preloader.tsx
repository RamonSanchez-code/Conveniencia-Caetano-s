import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const LETTERS = ["C", "A", "E", "T", "A", "N", "O", "’", "S"];

/** Intro cinematográfica da marca. Estática sob reduced-motion. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(root.current, { autoAlpha: 0, display: "none" });
        return;
      }
      const letters = gsap.utils.toArray<HTMLElement>("[data-pre-letter]");
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(letters, {
        yPercent: 0,
        duration: 0.7,
        stagger: 0.045,
        ease: "expo.out",
      })
        .to("[data-pre-bar]", { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, "-=0.25")
        .to(letters, {
          yPercent: -105,
          duration: 0.5,
          stagger: 0.03,
          ease: "power3.in",
        }, "+=0.2")
        .to(root.current, {
          yPercent: -100,
          duration: 0.75,
          ease: "power4.inOut",
        }, "-=0.15")
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-night"
    >
      <div className="relative">
        <div className="font-display flex overflow-hidden text-[clamp(3rem,11vw,7.5rem)] leading-none tracking-[0.01em] text-bone">
          {LETTERS.map((l, i) => (
            <span
              key={i}
              data-pre-letter
              className={`inline-block translate-y-[110%] ${l === "’" ? "text-ember" : ""}`}
            >
              {l}
            </span>
          ))}
        </div>
        <div
          data-pre-bar
          className="mt-3 h-[3px] w-full origin-left scale-x-0 bg-ember"
        />
        <p className="mt-2 text-right text-[11px] font-medium uppercase tracking-[0.35em] text-ash">
          Conveniência &amp; Bebidas
        </p>
      </div>
    </div>
  );
}
