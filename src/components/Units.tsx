import { useRef, useState } from "react";
import { Clock3, MapPin, Navigation, Phone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { units } from "@/data/site";

function PlaceholderTag() {
  return (
    <span className="ml-1.5 rounded bg-ember/15 px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-ember">
      placeholder
    </span>
  );
}

export default function Units() {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<string>(units[0].id);
  const activeUnit = units.find((u) => u.id === activeId) ?? units[0];

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
        3 / 2 CIDADES
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
              3 unidades / <span className="text-ember">2 cidades</span>
            </h2>
            <p data-unit-head className="mt-3 text-sm uppercase tracking-[0.2em] text-ash">
              2 em Brodowski e 1 em Batatais
            </p>
          </div>
          <p data-unit-head className="max-w-xs text-sm leading-relaxed text-ash">
            Escolha a unidade nos botões numerados ou nos cartões para ver a localização exata no mapa.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Mapa estilizado interativo */}
          <div
            data-unit-map
            className="relative overflow-hidden rounded-2xl border border-line bg-night"
          >
            <iframe
              key={activeUnit.id}
              title={`Mapa — ${activeUnit.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(activeUnit.address)}&hl=pt-BR&z=17&output=embed`}
              className="h-[380px] w-full border-0 sm:h-[460px] lg:h-full lg:min-h-[540px]"
              style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(0.7)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="absolute left-4 top-4 flex gap-2">
              {units.map((unit, i) => (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => setActiveId(unit.id)}
                  aria-label={`Ver ${unit.name} no mapa`}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold transition-colors ${
                    activeId === unit.id
                      ? "border-ember bg-ember text-night"
                      : "border-ember/60 bg-night/85 text-bone hover:bg-ember/20"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
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
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-24">
                      <img
                        src={unit.image}
                        alt={`Fachada ilustrativa da ${unit.name}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(unit.address)}`}
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
