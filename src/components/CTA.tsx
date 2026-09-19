"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Loader2, MessageCircle, PhoneCall } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { brand } from "@/data/site";
import Magnetic from "@/components/Magnetic";

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function CTA() {
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        "[data-cta-reveal]",
        { y: 56, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section.current, start: "top 68%", once: true },
        },
      );
      gsap.fromTo(
        "[data-cta-img]",
        { y: 60, rotate: 6 },
        {
          y: -40,
          rotate: -4,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
        },
      );
    },
    { scope: section, dependencies: [reduced] },
  );

  const whatsappHref = brand.whatsappNumber
    ? `https://wa.me/${brand.whatsappNumber}`
    : "#unidades";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contato" ref={section} className="relative bg-night py-20 sm:py-28" aria-label="Contato comercial">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-ember sm:rounded-[3rem]">
          {/* textura gigante ao fundo */}
          <div
            aria-hidden
            className="font-display pointer-events-none absolute -right-6 top-0 select-none whitespace-nowrap text-[12rem] leading-none text-night/8 sm:text-[16rem]"
          >
            VEM
          </div>
          <div
            aria-hidden
            data-cta-img
            className="pointer-events-none absolute -right-10 bottom-[-40px] hidden w-[340px] opacity-90 mix-blend-luminosity lg:block xl:w-[420px]"
          >
            <Image
              src="/img/hero-beer.svg"
              alt=""
              width={420}
              height={420}
              loading="lazy"
              aria-hidden
              className="rotate-[-8deg]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ember via-ember/40 to-transparent mix-blend-darken" />
          </div>

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:p-20">
            <div>
              <p
                data-cta-reveal
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-night/25 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-night"
              >
                <PhoneCall className="h-3.5 w-3.5" /> agora é com você
              </p>
              <h2
                data-cta-reveal
                className="font-display max-w-2xl text-[clamp(2.6rem,7vw,5.6rem)] uppercase leading-[0.92] tracking-tight text-night"
              >
                Bateu a sede?
                <br /> A gente resolve.
              </h2>
              <p data-cta-reveal className="mt-6 max-w-md text-[15px] font-medium leading-relaxed text-night/80">
                Passe na unidade mais próxima, chame no WhatsApp* ou deixe seu
                contato aqui — estoque cheio, cerveja gelada e atendimento rápido
                esperando por você.
              </p>

              <div data-cta-reveal className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href={whatsappHref}
                    target={brand.whatsappNumber ? "_blank" : undefined}
                    rel={brand.whatsappNumber ? "noreferrer" : undefined}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-night px-7 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-bone transition-colors duration-300 hover:bg-graphite"
                  >
                    <MessageCircle className="h-4.5 w-4.5 text-ember" />
                    Chamar no WhatsApp*
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                </Magnetic>
                <a
                  href="#unidades"
                  className="text-[12px] font-bold uppercase tracking-[0.18em] text-night underline underline-offset-4 hover:opacity-70"
                >
                  Ver unidades
                </a>
              </div>

              <p data-cta-reveal className="mt-6 max-w-md text-[11px] font-medium leading-relaxed text-night/60">
                *número de WhatsApp é ilustrativo nesta prévia — será
                substituído pelo canal oficial da loja.
              </p>
            </div>

            {/* Formulário de contato */}
            <div data-cta-reveal className="relative rounded-2xl border border-night/15 bg-night p-7 text-bone sm:p-9">
              {status === "sent" ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-14 w-14 text-ember" />
                  <p className="font-display mt-5 text-3xl uppercase text-bone">Anotado!</p>
                  <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-bone/70">
                    Seu contato entrou na fila das ofertas. Em breve a Caetano&apos;s
                    aparece no seu WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setName("");
                      setPhone("");
                    }}
                    className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-ember underline underline-offset-4"
                  >
                    cadastrar outro contato
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl uppercase leading-tight text-bone sm:text-3xl">
                    Ofertas direto no seu WhatsApp
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-bone/60">
                    Gelo chegando, combo do fim de semana, destilado em promoção:
                    quem está na lista fica sabendo primeiro.
                  </p>

                  <form onSubmit={onSubmit} className="mt-7 space-y-4">
                    <div>
                      <label htmlFor="lead-name" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-ash">
                        Seu nome
                      </label>
                      <input
                        id="lead-name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Como te chamamos?"
                        className="w-full rounded-xl border border-line bg-smoke/70 px-4 py-3.5 text-sm text-bone outline-none transition-colors placeholder:text-ash/50 focus:border-ember"
                      />
                    </div>
                    <div>
                      <label htmlFor="lead-phone" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-ash">
                        WhatsApp / telefone
                      </label>
                      <input
                        id="lead-phone"
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(00) 00000-0000"
                        className="w-full rounded-xl border border-line bg-smoke/70 px-4 py-3.5 text-sm text-bone outline-none transition-colors placeholder:text-ash/50 focus:border-ember"
                      />
                    </div>

                    {status === "error" && (
                      <p className="rounded-lg border border-ember/40 bg-ember/10 px-4 py-3 text-[12px] font-medium text-ember">
                        Não foi possível enviar agora. Tente de novo ou chame o
                        WhatsApp* da unidade mais perto.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-ember px-6 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-night transition-all duration-300 hover:bg-bone disabled:cursor-wait disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
                        </>
                      ) : (
                        "Quero receber ofertas"
                      )}
                    </button>
                    <p className="text-[10.5px] leading-relaxed text-ash/60">
                      Cadastro ilustrativo nesta prévia. Sem spam: só oferta boa,
                      no seu ritmo.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
