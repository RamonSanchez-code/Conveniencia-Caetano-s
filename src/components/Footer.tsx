import { ArrowUp, MapPin } from "lucide-react";
import { brand, units } from "@/data/site";
import { Logo } from "@/components/Navbar";

const NAV = [
  { label: "A Marca", href: "#marca" },
  { label: "Categorias", href: "#categorias" },
  { label: "Produtos", href: "#produtos" },
  { label: "Momentos", href: "#momentos" },
  { label: "Unidades", href: "#unidades" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-coal" aria-label="Rodapé">
      {/* linha luminosa */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember to-transparent" />

      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ash">
              Conveniência &amp; depósito de bebidas com {units.length} unidades.
              A parada oficial do seu fim de semana, do churrasco e da virada de
              festa.
            </p>
            <p className="mt-6 text-[13px] font-semibold text-bone/80">
              {brand.instagram}{" "}
              <span className="text-ember/80">(perfil ilustrativo)</span>
            </p>
          </div>

          <nav aria-label="Mapa do site">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-ash">
              Navegue
            </p>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-bone/70 transition-colors duration-300 hover:text-ember"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-ash">
              Unidades
            </p>
            <ul className="space-y-4">
              {units.map((unit) => (
                <li key={unit.id} className="text-sm">
                  <a href="#unidades" className="group flex items-start gap-2 text-bone/70 transition-colors hover:text-ember">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember/70" />
                    <span>
                      <span className="block font-semibold text-bone/85 group-hover:text-ember">
                        {unit.name}
                      </span>
                      <span className="block text-[12px] text-ash">{unit.address} (placeholder)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-ash">
              Atendimento
            </p>
            <p className="text-sm text-bone/70">
              WhatsApp: (00) 00000-0000{" "}
              <span className="text-ember/80">(placeholder)</span>
            </p>
            <p className="mt-3 text-sm text-bone/70">
              Horários: consulte cada unidade{" "}
              <span className="text-ember/80">(placeholder)</span>
            </p>
            <a
              href="#topo"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-bone transition-colors duration-300 hover:border-ember hover:text-ember"
            >
              Voltar ao topo <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <p className="text-[11px] leading-relaxed text-ash/70">
            Aviso: esta é uma prévia de apresentação. Endereços, telefones,
            horários, preços, benefícios e links exibidos com marcação são
            ilustrativos e devem ser substituídos pelos dados oficiais da
            Caetano&apos;s Conveniência antes da publicação.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[12px] text-ash">
              © {year} {brand.fullName}. Todos os direitos reservados.
            </p>
            <p className="font-display text-lg uppercase tracking-wide text-bone/40">
              Beber é proibido pra menor de 18.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
