import { useRef } from "react";
import { ArrowUpRight, AtSign } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { brand } from "@/data/site";
import Magnetic from "@/components/Magnetic";

const TILES = [
  { src: "/img/fotos/churrasqueira.jpg", alt: "Churrasqueira com carvão pronto para acender" },
  { src: "/img/fotos/gelo.jpg", alt: "Copo com água gelada e cubos de gelo" },
  { src: "/img/fotos/u-festa-noite.jpg", alt: "Show ao vivo com luzes coloridas à noite" },
  { src: "/img/fotos/u-coquetel-azul.jpg", alt: "Drink azul com gelo e limão" },
  { src: "/img/fotos/loja-1.jpg", alt: "Fachada de loja de conveniência à noite" },
  { src: "/img/fotos/vodka.jpg", alt: "Garrafa de vodka premium" },
];

export default function Social() {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        "[data-social-head]",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.1,
          scrollTrigger: { trigger: section.current, start: "top 72%", once: true },
        },
      );
      gsap.fromTo(
        "[data-social-tile]",
        { y: 60, autoAlpha: 0, scale: 0.94 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-social-grid]", start: "top 82%", once: true },
        },
      );
    },
    { scope: section, dependencies: [reduced] },
  );

  return (
    <section ref={section} className="relative bg-night pb-24 sm:pb-32 lg:pb-40" aria-label="Redes sociais">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
          <div>
            <p
              data-social-head
              className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-ember"
            >
              <AtSign className="h-4 w-4" /> siga a resenha
            </p>
            <h2
              data-social-head
              className="font-display text-[clamp(2.2rem,5vw,4.4rem)] uppercase leading-[0.95] tracking-tight text-bone"
            >
              {brand.instagram}{" "}
              <span className="text-stroke block sm:inline">no seu feed</span>
            </h2>
            <p data-social-head className="mt-3 max-w-md text-sm leading-relaxed text-ash">
              Bastidores das unidades, gelo caindo no isopor, rótulos chegando e
              a resenha do fim de semana começando.{" "}
              <span className="text-ember/80">(handle ilustrativo nesta prévia)</span>
            </p>
          </div>
          <Magnetic>
            <a
              data-social-head
              href={brand.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-coal/60 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:border-ember hover:text-ember"
            >
              Seguir no Instagram*
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </Magnetic>
        </div>

        <div data-social-grid className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {TILES.map((tile, i) => (
            <a
              key={i}
              href={brand.instagramUrl}
              target="_blank"
              rel="noreferrer"
              data-social-tile
              className={`group relative aspect-[4/5] overflow-hidden rounded-xl border border-line ${
                i % 2 === 1 ? "lg:translate-y-6" : ""
              }`}
              aria-label={`Post ilustrativo do Instagram: ${tile.alt}`}
            >
              <img
                src={tile.src}
                alt={tile.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-night/25 transition-colors duration-500 group-hover:bg-ember/25" />
              <AtSign className="absolute inset-0 m-auto h-7 w-7 text-bone opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-ember transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </div>
        <p className="mt-5 text-[11px] text-ash/60">
          *feed e perfil ilustrativos nesta prévia — <span className="text-bone/50">os conteúdos reais virão das redes oficiais da loja.</span>
        </p>
      </div>
    </section>
  );
}
