import { useRef } from "react";
import { Flame } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { stats } from "@/data/site";

const STATEMENT =
  "Não é só uma loja de bebidas. É o lugar que segura a resenha quando o gelo do vizinho derrete e a festa promete virar a noite. Estoque fundo, cerveja gelada na medida exata e atendimento rápido — em 3 pontos da cidade.";

export default function About() {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      // Reveal palavra a palavra, acompanhando o scroll
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-statement]",
            start: "top 78%",
            end: "bottom 42%",
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        "[data-about-reveal]",
        { y: 44, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.12,
          duration: 0.9,
          scrollTrigger: { trigger: section.current, start: "top 70%", once: true },
        },
      );

      // Parallax suave do retrato da fachada
              gsap.fromTo(
        "[data-about-img]",
        { yPercent: -12, scale: 1.25 },
        {
          yPercent: 12,
          scale: 1.25,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-about-frame]",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );

      // Contadores
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count ?? 0);
        const suffix = el.dataset.suffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v).toLocaleString("pt-BR")}${suffix}`;
          },
        });
      });
    },
    { scope: section, dependencies: [reduced] },
  );

  const words = STATEMENT.split(" ");

  return (
    <section
      id="marca"
      ref={section}
      className="relative overflow-hidden bg-coal py-28 sm:py-36 lg:py-44"
      aria-label="Sobre a Caetano's"
    >
      <div
        aria-hidden
        className="absolute right-[-10%] top-[-20%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,92,10,0.07),transparent_60%)]"
      />

      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
        <div>
          <p
            data-about-reveal
            className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-ember"
          >
            <Flame className="h-4 w-4" /> A marca
          </p>

          <h2
            data-statement
            className="font-display text-[clamp(1.7rem,3.6vw,3.4rem)] uppercase leading-[1.08] tracking-tight text-bone"
          >
            {words.map((word, i) => (
              <span key={i} data-word>
                {word}{" "}
              </span>
            ))}
          </h2>

          <p
            data-about-reveal
            className="mt-10 max-w-lg text-[15px] leading-relaxed text-bone/60"
          >
            A Caetano&apos;s nasceu para resolver o dilema de todo fim de semana:
            quem garante a bebida? Daí virou ponto de encontro — o lugar onde o
            churrasco começa, a festa abastece e a madrugada não deixa ninguém
            na mão. Conveniência de verdade, com a câmara fria sempre cheia.
          </p>

          <div data-about-reveal className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl text-ember sm:text-5xl lg:text-6xl">
                  <span data-count={stat.value} data-suffix={stat.suffix}>
                    0{stat.suffix}
                  </span>
                </p>
                <p className="mt-2 text-[11px] uppercase leading-relaxed tracking-[0.18em] text-ash">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p data-about-reveal className="mt-4 text-[11px] text-ash/70">
            *valor ilustrativo — confirme diretamente com as unidades.
          </p>
        </div>

        <div className="relative" data-about-reveal>
          <div
            data-about-frame
            className="relative h-[420px] overflow-hidden rounded-2xl border border-line lg:h-full lg:min-h-[560px]"
          >
            <img
              data-about-img
              src="/img/fotos/u-cerveja-papo.jpg"
              alt="Amigos saindo de uma loja de conveniência à noite carregando bebidas geladas"
              className="h-full w-full object-cover will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-night/20" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ember">
                  desde sempre
                </p>
                <p className="font-display mt-1 text-2xl uppercase text-bone">
                  a parada oficial
                </p>
              </div>
              <p className="font-display text-stroke text-6xl leading-none sm:text-7xl">3</p>
            </div>
          </div>

          <div
            data-float-soft
            className="absolute -right-4 -top-4 rotate-6 rounded-xl border border-ember/40 bg-coal px-5 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.5)] lg:-right-8"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-ember">temperatura</p>
            <p className="font-display text-2xl text-bone">SEMPRE NO GELO</p>
          </div>
        </div>
      </div>
    </section>
  );
}
