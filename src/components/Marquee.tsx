import { Sparkle } from "lucide-react";
import { marqueeItems } from "@/data/site";

function Track({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div
      data-marquee-track
      className={`flex w-max items-center gap-8 pr-8 ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span className="font-display text-2xl uppercase tracking-wide sm:text-3xl">{item}</span>
          <Sparkle className="h-5 w-5 shrink-0 opacity-80" aria-hidden />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-hidden className="relative z-30 -my-8 select-none overflow-hidden py-10">
      <div className="-mx-4 -rotate-[1.6deg] border-y border-night/40 bg-ember py-4 text-night shadow-[0_20px_60px_rgba(255,92,10,0.25)]">
        <div className="flex overflow-hidden">
          <Track />
        </div>
      </div>
      <div className="-mx-4 mt-[-8px] rotate-[1.1deg] border-y border-line bg-coal py-3 text-bone/60">
        <div className="flex overflow-hidden">
          <Track reverse />
        </div>
      </div>
    </section>
  );
}
