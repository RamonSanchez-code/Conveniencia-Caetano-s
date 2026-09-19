"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ShoppingBag } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { featuredProducts } from "@/data/site";

/**
 * Trilho horizontal de destaques.
 * Desktop: seção pinada com avanço via scroll vertical (GSAP ScrollTrigger).
 * Mobile: trilho nativo com snap (zero custo de performance).
 */
export default function Featured() {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !section.current) return;

      gsap.fromTo(
        "[data-prod-head]",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.1,
          scrollTrigger: { trigger: section.current, start: "top 75%", once: true },
        },
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = section.current!.querySelector<HTMLElement>("[data-track]")!;
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${dist()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: section, dependencies: [reduced] },
  );

  return (
    <section
      id="produtos"
      ref={section}
      className="relative overflow-hidden bg-coal py-20 sm:py-24 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-0"
      aria-label="Produtos em destaque"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-14 lg:pr-8">
          <div>
            <p
              data-prod-head
              className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-ember"
            >
              <ShoppingBag className="h-4 w-4" /> direto da câmara fria
            </p>
            <h2
              data-prod-head
              className="font-display text-[clamp(2.4rem,5.6vw,4.8rem)] uppercase leading-[0.95] tracking-tight text-bone"
            >
              Destaques <span className="text-ember">sempre gelados</span>
            </h2>
          </div>
          <div data-prod-head className="max-w-xs">
            <p className="text-sm leading-relaxed text-ash">
              Ofertas do momento nas três unidades. Arraste para o lado — no
              celular é só deslizar.
            </p>
            <p className="mt-2 text-[11px] text-ash/60">
              *preços ilustrativos — confira os valores reais na loja.
            </p>
          </div>
        </div>
      </div>

      <div className="no-scrollbar overflow-x-auto pb-6 lg:overflow-visible lg:pb-24">
        <div data-track className="flex w-max items-stretch gap-5 px-5 sm:px-8 lg:gap-7 lg:pr-[12vw]">
          {featuredProducts.map((product, i) => (
            <article
              key={product.id}
              className="group relative h-[460px] w-[82vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-line bg-graphite sm:w-[420px] lg:h-[520px] lg:w-[460px]"
            >
              <Image
                src={product.image}
                alt={`${product.name} — ${product.description}`}
                fill
                sizes="(min-width: 1024px) 460px, 82vw"
                loading="lazy"
                className={`object-cover transition-transform duration-700 ease-out group-hover:scale-108 ${
                  i === 0 ? "mix-blend-screen" : ""
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/35 to-transparent" />

              <span className="font-display absolute left-6 top-5 text-6xl leading-none text-bone/10 transition-colors duration-500 group-hover:text-ember/25">
                0{i + 1}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="rounded-full bg-ember px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-night">
                  {product.category}
                </span>
                <h3 className="font-display mt-3 text-3xl uppercase leading-none text-bone sm:text-4xl">
                  {product.name}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-bone/65">{product.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <p className="font-display text-2xl text-ember sm:text-3xl">
                    {product.price}
                    <span className="ml-1 align-super text-xs text-ash">*</span>
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-bone/70 transition-colors group-hover:text-ember">
                    ver na loja <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}

          {/* Card final CTA */}
          <a
            href="#unidades"
            className="group relative flex h-[460px] w-[82vw] shrink-0 snap-center flex-col items-start justify-between overflow-hidden rounded-2xl bg-ember p-8 text-night transition-colors duration-500 hover:bg-bone sm:w-[420px] lg:h-[520px]"
          >
            <ArrowUpRight className="h-10 w-10 transition-transform duration-500 group-hover:rotate-45" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em]">+ isso tudo e muito mais</p>
              <p className="font-display mt-3 text-5xl uppercase leading-[0.95] sm:text-6xl">
                Parou?
                <br /> Vem na caetano&apos;s.
              </p>
              <p className="mt-4 max-w-[240px] text-sm font-medium leading-relaxed text-night/75">
                3 unidades te esperando com a geladeira cheia. Escolha a mais
                perto e chega mais.
              </p>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] underline underline-offset-4">
              ver unidades
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
