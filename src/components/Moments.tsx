import { useRef } from "react";
import { Clock3 } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { moments } from "@/data/site";

/**
 * Painéis sticky empilhados: cada momento cobre o anterior
 * enquanto a imagem interna faz parallax.
 */
export default function Moments() {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !section.current) return;

      gsap.fromTo(
        "[data-moment-head]",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.1,
          scrollTrigger: { trigger: section.current, start: "top 75%", once: true },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
        const img = panel.querySelector("[data-panel-img]");
        const content = panel.querySelector("[data-panel-content]");

        gsap.fromTo(
          img,
          { yPercent: -14, scale: 1.18 },
          {
            yPercent: 14,
            scale: 1.18,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );

        gsap.fromTo(
          content,
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 55%", once: true },
          },
        );
      });
    },
    { scope: section, dependencies: [reduced] },
  );

  return (
    <section
      id="momentos"
      ref={section}
      className="relative bg-night pt-24 sm:pt-32"
      aria-label="Momentos de consumo"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <p
          data-moment-head
          className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-ember"
        >
          <Clock3 className="h-4 w-4" /> pra cada horário, um estoque
        </p>
        <h2
          data-moment-head
          className="font-display max-w-4xl text-[clamp(2.4rem,5.6vw,4.8rem)] uppercase leading-[0.95] tracking-tight text-bone"
        >
          Feito pro momento <span className="text-stroke-ember">em que a sede bate</span>
        </h2>
      </div>

      <div className="mt-16 lg:mt-24">
        {moments.map((moment, i) => (
          <article
            key={moment.id}
            data-panel
            className="sticky top-0 flex h-svh items-end overflow-hidden border-t border-line"
            style={{ zIndex: i + 1 }}
            aria-label={moment.title}
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                data-panel-img
                src={moment.image}
                alt={`${moment.title} — ${moment.description}`}
                loading="lazy"
                className="h-full w-full object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/35 to-night/25" />
            </div>

            <div className="font-display pointer-events-none absolute right-0 top-16 select-none text-[26vw] leading-none text-bone/6 lg:text-[18vw]">
              0{i + 1}
            </div>

            <div
              data-panel-content
              className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-20 sm:px-8 lg:pb-24"
            >
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-ember">
                {moment.kicker}
              </p>
              <h3 className="font-display max-w-3xl text-[clamp(2.6rem,7vw,6rem)] uppercase leading-[0.92] text-bone">
                {moment.title}
              </h3>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-bone/70 sm:text-base">
                {moment.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {moment.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-bone/15 bg-night/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-bone/85 backdrop-blur-md"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
