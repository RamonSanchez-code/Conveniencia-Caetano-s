"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Clock3, MapPin, Navigation, Phone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { units, type Unit } from "@/data/site";

function PlaceholderTag() {
  return (
    <span className="ml-1.5 rounded bg-ember/15 px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-ember">
      placeholder
    </span>
  );
}

function MapPinMarker({
  unit,
  active,
  onActivate,
  index,
}: {
  unit: Unit;
  active: boolean;
  onActivate: () => void;
  index: number;
}) {
  return (
    <g
      transform={`translate(${unit.pos.x} ${unit.pos.y})`}
      onPointerEnter={onActivate}
      onClick={onActivate}
      className="cursor-pointer"
      role="button"
      aria-label={`Selecionar ${unit.name}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onActivate()}
    >
      <circle
        r="3.2"
        fill="none"
        stroke={active ? "#ff5c0a" : "rgba(255,92,10,0.5)"}
        strokeWidth="0.35"
        className="animate-pin-pulse origin-center"
        style={{ transformBox: "fill-box" }}
      />
      <circle r="1.9" fill={active ? "#ff5c0a" : "#1b1b21"} stroke="#ff5c0a" strokeWidth="0.4" />
      <text
        y="1.15"
        textAnchor="middle"
        className="pointer-events-none select-none font-sans"
        fontSize="1.7"
        fontWeight="700"
        fill={active ? "#060607" : "#f4f1ea"}
      >
        {index + 1}
      </text>
      {active && (
        <text
          y="-3.4"
          textAnchor="middle"
          fontSize="2.4"
          fontWeight="700"
          fill="#f4f1ea"
          className="pointer-events-none select-none font-sans uppercase"
          style={{ letterSpacing: "0.3px" }}
        >
          {unit.district}
        </text>
      )}
    </g>
  );
}

export default function Units() {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<string>(units[0].id);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        "[data-unit-head]",
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
        "[data-unit-map]",
        { clipPath: "inset(0 0 100% 0)", autoAlpha: 1 },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: "[data-unit-map]", start: "top 78%", once: true },
        },
      );
      gsap.fromTo(
        "[data-unit-card]",
        { x: 48, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-unit-list]", start: "top 80%", once: true },
        },
      );
    },
    { scope: section, dependencies: [reduced] },
  );

  return (
    <section
      id="unidades"
      ref={section}
      className="relative overflow-hidden bg-coal py-24 sm:py-32 lg:py-40"
      aria-label="Nossas unidades"
    >
      <div
        aria-hidden
        className="font-display text-stroke pointer-events-none absolute -top-6 left-0 select-none whitespace-nowrap text-[16vw] leading-none opacity-60"
      >
        3 UNIDADES
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 lg:mb-20">
          <div>
            <p
              data-unit-head
              className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-ember"
            >
              <MapPin className="h-4 w-4" /> onde a gente te atende
            </p>
            <h2
              data-unit-head
              className="font-display text-[clamp(2.4rem,5.6vw,4.8rem)] uppercase leading-[0.95] tracking-tight text-bone"
            >
              Sempre tem uma <span className="text-ember">perto de você</span>
            </h2>
          </div>
          <p data-unit-head className="max-w-xs text-sm leading-relaxed text-ash">
            Passe o mouse pelos pontos do mapa para conhecer cada unidade.
            Localizações ilustrativas nesta prévia.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Mapa estilizado interativo */}
          <div
            data-unit-map
            className="relative overflow-hidden rounded-2xl border border-line bg-night"
          >
            <svg
              viewBox="0 0 100 80"
              className="h-[380px] w-full sm:h-[460px] lg:h-full lg:min-h-[540px]"
              preserveAspectRatio="xMidYMid slice"
              role="img"
              aria-label="Mapa ilustrativo com as 3 unidades da Caetano's"
            >
              <defs>
                <pattern id="map-grid" width="5" height="5" patternUnits="userSpaceOnUse">
                  <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(244,241,234,0.045)" strokeWidth="0.15" />
                </pattern>
                <radialGradient id="map-glow" cx="50%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="rgba(255,92,10,0.10)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              <rect width="100" height="80" fill="#0b0b0d" />
              <rect width="100" height="80" fill="url(#map-grid)" />
              <rect width="100" height="80" fill="url(#map-glow)" />

              {/* vias principais (ilustrativas) */}
              <g stroke="#1f1f26" strokeWidth="1.7" fill="none" strokeLinecap="round">
                <path d="M-4 34 C 18 30, 34 38, 52 34 S 84 26, 104 30" />
                <path d="M12 -4 C 18 20, 26 44, 20 84" />
                <path d="M64 -4 C 60 22, 74 46, 66 84" />
                <path d="M-4 62 C 24 58, 48 66, 104 58" />
                <path d="M-4 12 C 30 16, 62 8, 104 14" strokeWidth="1.1" />
                <path d="M40 -4 C 44 18, 36 52, 44 84" strokeWidth="1.1" />
              </g>
              <g stroke="#2a2a33" strokeWidth="0.35" strokeDasharray="2 1.6" fill="none">
                <path d="M-4 34 C 18 30, 34 38, 52 34 S 84 26, 104 30" />
                <path d="M12 -4 C 18 20, 26 44, 20 84" />
                <path d="M64 -4 C 60 22, 74 46, 66 84" />
              </g>

              {/* blocos */}
              <g fill="rgba(244,241,234,0.035)">
                <rect x="16" y="18" width="18" height="10" rx="1" />
                <rect x="46" y="18" width="12" height="12" rx="1" />
                <rect x="70" y="20" width="16" height="8" rx="1" />
                <rect x="24" y="40" width="14" height="14" rx="1" />
                <rect x="48" y="42" width="12" height="10" rx="1" />
                <rect x="72" y="40" width="18" height="12" rx="1" />
                <rect x="16" y="66" width="16" height="8" rx="1" />
                <rect x="70" y="64" width="16" height="10" rx="1" />
              </g>

              {/* rótulos de bairro */}
              <g fontSize="2.1" className="font-sans uppercase" fill="#5b5861" fontWeight="600" style={{ letterSpacing: "0.4px" }}>
                <text x="46" y="46">Centro</text>
                <text x="68" y="28">Bairro Norte</text>
                <text x="30" y="76">Bairro Sul</text>
              </g>

              {units.map((unit, i) => (
                <MapPinMarker
                  key={unit.id}
                  unit={unit}
                  index={i}
                  active={activeId === unit.id}
                  onActivate={() => setActiveId(unit.id)}
                />
              ))}
            </svg>

            <div className="absolute bottom-4 left-4 rounded-lg border border-line bg-night/80 px-4 py-2.5 backdrop-blur-md">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-ember">
                mapa ilustrativo*
              </p>
              <p className="text-[11px] text-ash">
                *localizações de referência — confira o endereço real de cada unidade.
              </p>
            </div>
          </div>

          {/* Cards das unidades */}
          <div data-unit-list className="flex flex-col gap-4">
            {units.map((unit, i) => {
              const isActive = activeId === unit.id;
              return (
                <article
                  key={unit.id}
                  data-unit-card
                  onPointerEnter={() => setActiveId(unit.id)}
                  className={`group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ${
                    isActive
                      ? "border-ember/60 bg-graphite shadow-[0_24px_70px_rgba(255,92,10,0.12)]"
                      : "border-line bg-night/50 hover:border-bone/25"
                  }`}
                >
                  <div className="flex gap-5 p-5 sm:p-6">
                    <div className="relative hidden h-28 w-24 shrink-0 overflow-hidden rounded-xl sm:block">
                      <Image
                        src="/img/unidade-fachada.svg"
                        alt={`Fachada ilustrativa da ${unit.name}`}
                        fill
                        sizes="96px"
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ember">
                            0{i + 1} · {unit.district}
                          </p>
                          <h3 className="font-display mt-1 text-2xl uppercase leading-tight text-bone">
                            {unit.name.replace(`Unidade 0${i + 1} — `, "")}
                          </h3>
                        </div>
                        <span
                          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                            isActive ? "border-ember bg-ember text-night" : "border-line text-ash"
                          }`}
                        >
                          <Navigation className="h-4 w-4" />
                        </span>
                      </div>

                      <div className="mt-3 space-y-1.5 text-[13px] text-bone/70">
                        <p className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember/80" />
                          <span>
                            {unit.address}
                            {unit.addressPlaceholder && <PlaceholderTag />}
                          </span>
                        </p>
                        <p className="flex items-start gap-2">
                          <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember/80" />
                          <span>
                            {unit.phone}
                            {unit.phonePlaceholder && <PlaceholderTag />}
                          </span>
                        </p>
                        <p className="flex items-start gap-2">
                          <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember/80" />
                          <span>
                            {unit.hours}
                            {unit.hoursPlaceholder && <PlaceholderTag />}
                          </span>
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {unit.features.map((f) => (
                          <span
                            key={f.label}
                            className="rounded-full bg-bone/8 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-bone/70"
                          >
                            {f.label}
                            {f.placeholder ? "*" : ""}
                          </span>
                        ))}
                        <a
                          href={unit.mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto text-[11px] font-bold uppercase tracking-[0.18em] text-ember underline-offset-4 hover:underline"
                        >
                          como chegar{unit.mapsPlaceholder ? "*" : ""}
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
            <p className="px-1 text-[11px] leading-relaxed text-ash/60">
              *campos e recursos marcados são ilustrativos nesta prévia — serão
              substituídos pelos dados oficiais das unidades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
