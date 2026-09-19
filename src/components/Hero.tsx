"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";
import Magnetic from "@/components/Magnetic";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const desktop = useMediaQuery(1024);
  const reduced = usePrefersReducedMotion();
  const [sceneActive, setSceneActive] = useState(true);
  const showWebGL = desktop && !reduced;

  // Pausa o WebGL quando o hero sai da viewport (performance)
  useEffect(() => {
    if (!showWebGL || !section.current) return;
    const io = new IntersectionObserver(([entry]) => setSceneActive(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(section.current);
    return () => io.disconnect();
  }, [showWebGL]);

  // Intro + parallax de scroll + tilt magnético da imagem
  useEffect(() => {
    if (reduced || !section.current) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ delay: 2.0, defaults: { ease: "power4.out" } });
      intro
        .fromTo(
          "[data-hero-eyebrow]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
        )
        .fromTo(
          "[data-hero-line]",
          { yPercent: 112, rotate: 2 },
          { yPercent: 0, rotate: 0, duration: 1.05, stagger: 0.1, ease: "expo.out" },
          "-=0.35",
        )
        .fromTo(
          "[data-hero-media]",
          { autoAlpha: 0, scale: 1.14, x: 60 },
          { autoAlpha: 1, scale: 1, x: 0, duration: 1.3, ease: "expo.out" },
          "-=0.9",
        )
        .fromTo(
          "[data-hero-fade]",
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09 },
          "-=0.8",
        )
        .fromTo(
          "[data-hero-badge]",
          { autoAlpha: 0, scale: 0.6, rotate: -14 },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.6)", stagger: 0.12 },
          "-=0.5",
        );

      gsap.to("[data-hero-giant]", {
        yPercent: 34,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: 0.8 },
      });
      gsap.to("[data-hero-media]", {
        yPercent: -9,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: 0.8 },
      });
      gsap.to("[data-hero-content]", {
        yPercent: -16,
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "30% top", end: "bottom top", scrub: 0.8 },
      });

      gsap.to("[data-float-soft]", {
        y: -14,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse" || !section.current) return;
    const rect = section.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to("[data-hero-tilt]", { rotateY: nx * 10, rotateX: -ny * 8, x: nx * 22, y: ny * 16, duration: 0.9 });
  };

  return (
    <section
      id="topo"
      ref={section}
      onPointerMove={onPointerMove}
      className="relative flex min-h-svh flex-col overflow-hidden bg-night"
      aria-label="Apresentação Caetano's Conveniência"
    >
      {/* Glows */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -left-[20%] top-[-30%] h-[80vmax] w-[80vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,92,10,0.16),transparent_62%)]" />
        <div className="absolute bottom-[-45%] right-[-15%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,178,60,0.10),transparent_60%)]" />
      </div>

      {/* WebGL (desktop) */}
      {showWebGL && (
        <div className="absolute inset-0 opacity-90" aria-hidden>
          <HeroScene active={sceneActive} />
        </div>
      )}

      {/* Tipografia gigante ao fundo */}
      <div
        data-hero-giant
        aria-hidden
        className="text-stroke font-display pointer-events-none absolute inset-x-0 top-[52%] select-none whitespace-nowrap text-center text-[22vw] leading-none tracking-tight lg:top-[55%]"
      >
        BEBIDA GELADA
      </div>

      {/* Imagem central das bebidas */}
      <div
        data-hero-media
        className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center lg:items-center lg:justify-end lg:pr-[6vw]"
      >
        <div data-hero-tilt className="relative will-change-transform [transform-style:preserve-3d]">
          <div
            data-float-soft
            className="hero-img-mask relative h-[44svh] w-[86vw] mix-blend-screen sm:h-[56svh] sm:w-[70vw] lg:h-[78vh] lg:w-[46vw]"
          >
            <Image
              src="/img/hero-beer.svg"
              alt="Cervejas e garrafas estupidamente geladas com splash dourado, sobre fundo preto"
              fill
              priority
              quality={90}
              sizes="(min-width: 1024px) 46vw, 86vw"
              className="object-contain drop-shadow-[0_40px_80px_rgba(255,92,10,0.25)]"
            />
          </div>
        </div>
      </div>

      {/* Badges flutuantes */}
      <div
        data-hero-badge
        className="absolute right-[6%] top-[18%] z-20 hidden md:block lg:right-[38%] lg:top-[24%]"
      >
        <div data-float-soft className="relative h-28 w-28 lg:h-36 lg:w-36">
          <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full">
            <defs>
              <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <circle cx="50" cy="50" r="49" fill="rgba(11,11,13,0.72)" stroke="rgba(255,92,10,0.5)" strokeWidth="0.6" />
            <text className="fill-bone text-[8.2px] font-semibold uppercase tracking-[0.22em]">
              <textPath href="#badge-circle">
                sempre gelado · caetano&apos;s conveniência ·
              </textPath>
            </text>
          </svg>
          <MapPin className="absolute inset-0 m-auto h-6 w-6 text-ember" />
        </div>
      </div>

      <div
        data-hero-badge
        className="absolute bottom-[30%] left-[4%] z-20 hidden -rotate-6 lg:bottom-auto lg:left-[46%] lg:top-[64%] lg:block"
      >
        <div className="rounded-xl border border-ember/50 bg-ember/10 px-5 py-3 backdrop-blur-md">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ember">3 unidades</p>
          <p className="font-display text-2xl uppercase leading-none text-bone">na cidade</p>
        </div>
      </div>

      {/* Conteúdo */}
      <div
        data-hero-content
        className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pb-24 pt-32 sm:px-8 lg:justify-center lg:pb-40"
      >
        <p
          data-hero-eyebrow
          className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-coal/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-ash backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
          Conveniência &amp; Depósito de Bebidas
        </p>

        <h1 className="font-display uppercase leading-[0.92] tracking-tight text-bone">
          <span className="block overflow-hidden">
            <span data-hero-line className="block text-[clamp(2.9rem,9.5vw,8.2rem)]">
              A resenha
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block text-[clamp(2.9rem,9.5vw,8.2rem)]">
              começa <span className="text-ember">com</span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="text-stroke-ember block text-[clamp(2.9rem,9.5vw,8.2rem)]">
              a gelada certa.
            </span>
          </span>
        </h1>

        <p
          data-hero-fade
          className="mt-6 max-w-md text-[15px] leading-relaxed text-bone/70 sm:text-base"
        >
          Cerveja estupidamente gelada, destilados, gelo, carvão e snacks em uma
          parada só. Parou na Caetano&apos;s, a noite está garantida.
        </p>

        <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="#unidades"
              className="group inline-flex items-center gap-2 rounded-full bg-ember px-7 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-night transition-all duration-300 hover:bg-bone"
            >
              Encontrar uma unidade
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#produtos"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-coal/50 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-bone backdrop-blur-md transition-colors duration-300 hover:border-ember hover:text-ember"
            >
              Ver o que tem
            </a>
          </Magnetic>
        </div>

        <div
          data-hero-fade
          className="mt-14 hidden items-center gap-8 text-[11px] uppercase tracking-[0.22em] text-ash md:flex"
        >
          <span className="flex items-center gap-2">
            <span className="h-px w-8 bg-ember/70" />
            churrasco · festa · madrugada
          </span>
          <span>traga a sede, a gente resolve</span>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        data-hero-fade
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ash"
      >
        <span>explore</span>
        <span className="grid h-10 w-6 place-items-center rounded-full border border-line">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-ember" />
        </span>
      </div>

      {/* Vinheta inferior */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
    </section>
  );
}
