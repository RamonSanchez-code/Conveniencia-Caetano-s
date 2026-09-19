"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { categories } from "@/data/site";

export default function Categories() {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        "[data-cat-card]",
        { y: 70, autoAlpha: 0, scale: 0.97 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-cat-grid]", start: "top 82%", once: true },
        },
      );
      gsap.fromTo(
        "[data-cat-head]",
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.1,
          scrollTrigger: { trigger: section.current, start: "top 78%", once: true },
        },
      );
    },
    { scope: section, dependencies: [reduced] },
  );

  return (
    <section
      id="categorias"
      ref={section}
      className="relative bg-night py-24 sm:py-32 lg:py-40"
      aria-label="Categorias de produtos"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 lg:mb-20">
          <div>
            <p
              data-cat-head
              className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-ember"
            >
              <LayoutGrid className="h-4 w-4" /> o que não falta
            </p>
            <h2
              data-cat-head
              className="font-display text-[clamp(2.4rem,5.6vw,4.8rem)] uppercase leading-[0.95] tracking-tight text-bone"
            >
              A geladeira <br />
              <span className="text-stroke-ember">mais funda da cidade</span>
            </h2>
          </div>
          <p data-cat-head className="max-w-xs text-sm leading-relaxed text-ash">
            Seis corredores de solução para qualquer resenha. Se a gente não
            tem, provavelmente você não precisa.
          </p>
        </div>

        <div data-cat-grid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {categories.map((cat, i) => (
            <article
              key={cat.id}
              data-cat-card
              className={`group relative overflow-hidden rounded-2xl border border-line bg-graphite transition-colors duration-500 hover:border-ember/50 ${
                i === 0 ? "sm:col-span-2 lg:col-span-4 lg:row-span-2" : ""
              } ${i === 1 || i === 2 ? "lg:col-span-2" : ""} ${
                i >= 3 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="relative h-64 w-full overflow-hidden sm:h-72 lg:h-full lg:min-h-[300px]">
                <Image
                  src={cat.image}
                  alt={`${cat.name} — ${cat.description}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                  className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
                    i === 0 ? "mix-blend-screen" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-ember/0 transition-colors duration-500 group-hover:bg-ember/10" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-ember/40 bg-night/60 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-ember backdrop-blur-sm">
                    {cat.tag}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-bone/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-ember" />
                </div>
                <h3 className={`font-display uppercase leading-none text-bone ${i === 0 ? "text-4xl sm:text-5xl" : "text-3xl"}`}>
                  {cat.name}
                </h3>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-bone/65">
                  {cat.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 transition-all duration-500 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-bone/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-bone/80 backdrop-blur-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <span className="font-display absolute right-5 top-4 text-5xl leading-none text-bone/8 transition-colors duration-500 group-hover:text-ember/15">
                0{i + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
