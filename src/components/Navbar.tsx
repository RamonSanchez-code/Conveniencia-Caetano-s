"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, MapPin } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { brand, units } from "@/data/site";
import Magnetic from "@/components/Magnetic";

const LINKS = [
  { label: "A Marca", href: "#marca", index: "01" },
  { label: "Categorias", href: "#categorias", index: "02" },
  { label: "Produtos", href: "#produtos", index: "03" },
  { label: "Momentos", href: "#momentos", index: "04" },
  { label: "Unidades", href: "#unidades", index: "05" },
  { label: "Contato", href: "#contato", index: "06" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#topo" className={`group flex items-center gap-3 ${className}`} aria-label="Caetano's Conveniência">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line bg-night shadow-[0_0_30px_rgba(255,92,10,0.12)] transition-transform duration-300 group-hover:scale-[1.03]">
        <Image
          src="/img/logo-badge.jpg"
          alt="Logo Caetano's Conveniência"
          fill
          priority
          sizes="56px"
          className="object-cover"
        />
      </div>
      <span className="font-display text-[1.15rem] leading-none tracking-[0.06em] text-bone transition-colors duration-300 group-hover:text-ember sm:text-[1.35rem]">
        CAETANO<span className="text-ember transition-colors duration-300 group-hover:text-bone">’</span>S
      </span>
      <span className="hidden border-l border-line pl-3 text-[8px] font-semibold uppercase leading-[1.5] tracking-[0.24em] text-ash sm:block">
        Conveniência
        <br />
        &amp; Bebidas
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      if (!open) return;
      gsap.fromTo(menuRef.current, { yPercent: -100 }, { yPercent: 0, duration: 0.7, ease: "expo.out" });
      gsap.fromTo(
        "[data-menu-link]",
        { y: 56, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.6, delay: 0.15, ease: "power3.out" },
      );
    },
    { dependencies: [open] },
  );

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-night/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[13px] font-medium uppercase tracking-[0.16em] text-bone/75 transition-colors duration-300 hover:text-bone"
              >
                <span className="mr-1 text-[9px] text-ember/80">{link.index}</span>
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ember transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:inline-block">
              <a
                href="#contato"
                className="group inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-night transition-colors duration-300 hover:bg-bone"
              >
                Fale com a gente
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-bone transition-colors hover:border-ember hover:text-ember lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[65] flex flex-col justify-between bg-night/97 pt-24 backdrop-blur-2xl lg:hidden"
        >
          <nav className="flex flex-col gap-1 px-6" aria-label="Menu móvel">
            {LINKS.map((link) => (
              <a
                key={link.href}
                data-menu-link
                href={link.href}
                onClick={close}
                className="group flex items-baseline gap-4 border-b border-line py-4"
              >
                <span className="text-[11px] font-semibold text-ember">{link.index}</span>
                <span className="font-display text-4xl uppercase text-bone transition-colors group-hover:text-ember sm:text-5xl">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="space-y-3 px-6 pb-10" data-menu-link>
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-ash">
              <MapPin className="h-3.5 w-3.5 text-ember" />
              {units.length} unidades — {brand.city.toLowerCase().includes("cidade") ? "endereços ilustrativos" : brand.city}
            </p>
            <p className="text-[13px] text-ash">
              {brand.instagram}{" "}
              <span className="text-ember">(perfil ilustrativo)</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
