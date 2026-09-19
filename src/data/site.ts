/**
 * Dados centralizados da Caetano's Conveniência.
 * CRITÉRIO: o briefing informou apenas que a rede possui 3 unidades.
 * Todos os endereços, telefones, horários, preços e links abaixo são
 * PLACEHOLDERS claramente identificados (flag `placeholder: true`,
 * sufixo "(placeholder)" ou asterisco exibido na UI) e devem ser
 * substituídos pelos dados reais antes de publicar o site.
 */

export type Unit = {
  id: string;
  name: string;
  district: string;
  address: string;
  addressPlaceholder: boolean;
  phone: string;
  phonePlaceholder: boolean;
  whatsappNumber: string | null;
  hours: string;
  hoursPlaceholder: boolean;
  /** Posição normalizada (0–100) no mapa estilizado ilustrativo. */
  pos: { x: number; y: number };
  features: { label: string; placeholder: boolean }[];
  mapsUrl: string;
  mapsPlaceholder: boolean;
};

export type Category = {
  id: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  items: string[];
};

export type FeaturedProduct = {
  id: string;
  category: string;
  name: string;
  description: string;
  /** Preço ilustrativo — exibido com asterisco e nota na UI. */
  price: string;
  image: string;
  accent?: string;
};

export type Moment = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  image: string;
  chips: string[];
};

export const brand = {
  name: "Caetano's",
  fullName: "Caetano's Conveniência",
  descriptor: "Conveniência & Depósito de Bebidas",
  unitsCount: 3, // dado real fornecido no briefing
  city: "Brodowski/SP", // placeholder — cidade não informada
  instagram: "@caetanosconveniencias", // placeholder — handle ilustrativo
  instagramUrl: "https://instagram.com/", // placeholder — perfil ilustrativo
  instagramPlaceholder: true,
  /** Número placeholder. trocar pelo real (formato 55DDDNÚMERO). */
  whatsappNumber: null as string | null,
  whatsappPlaceholder: true,
  socialPlaceholders: true,
};

export const units: Unit[] = [
  {
    id: "u1",
    name: "Unidade 01 — Centro",
    district: "Centro",
    address: "Av. Pres. João Batista de Figueiredo, 1001 — Centro — Batatais/SP",
    addressPlaceholder: true,
    phone: "+55 (00) 0000-0000",
    phonePlaceholder: true,
    whatsappNumber: null,
    hours: "Horário de funcionamento: consulte a unidade",
    hoursPlaceholder: true,
    pos: { x: -20.99055033979744, y: -47.65433383515597},
    features: [
      { label: "Drive-thru", placeholder: true },
      { label: "Estacionamento", placeholder: true },
      { label: "Delivery no bairro", placeholder: true },
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Caetano%27s+Conveniencia",
    mapsPlaceholder: true,
  },
  {
    id: "u2",
    name: "Unidade 02 — Ver. João Luis de Vicente",
    district: "Ver. João Luis de Vicente",
    address: "R. Marcos Fabbri, 160 - Ver. Joao Luis de Vicente, Brodowski/SP",
    addressPlaceholder: true,
    phone: "+55 (00) 0000-0000",
    phonePlaceholder: true,
    whatsappNumber: null,
    hours: "Horário de funcionamento: consulte a unidade",
    hoursPlaceholder: true,
    pos: { x: -20.981895517560247, y: -47.64514995193381 },
    features: [
      { label: "Câmara fria lotada", placeholder: false },
      { label: "Atacarejo de bebidas", placeholder: true },
      { label: "Retirada rápida", placeholder: true },
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Caetano%27s+Conveniencia",
    mapsPlaceholder: true,
  },
  {
    id: "u3",
    name: "Unidade 03 — Avenida",
    district: "Avenida",
    address: "Av. Dom Luís do Amaral Mouzinho, 1129, Brodowski/SP",
    addressPlaceholder: true,
    phone: "+55 (00) 0000-0000",
    phonePlaceholder: true,
    whatsappNumber: null,
    hours: "Horário de funcionamento: consulte a unidade",
    hoursPlaceholder: true,
    pos: { x: 30, y: 70 },
    features: [
      { label: "Gelo e carvão na porta", placeholder: false },
      { label: "Bar ao lado", placeholder: true },
      { label: "Fila rápida", placeholder: true },
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Caetano%27s+Conveniencia",
    mapsPlaceholder: true,
  },
];

export const categories: Category[] = [
  {
    id: "cervejas",
    name: "Cervejas geladas",
    tag: "sempre no freezer",
    description:
      "Cerveja estupidamente gelada — garrafa, long neck, lata e litrão direto da câmara fria.",
    image: "/img/hero-beer.svg",
    items: ["Pilsen", "Puro malte", "Sem álcool", "Artesanais*"],
  },
  {
    id: "destilados",
    name: "Destilados & drinks",
    tag: "prateleira premium",
    description:
      "Whisky, vodka, gim, cachaça rum e os coringas do bar — do clássico ao presenteável.",
    image: "/img/cat-destilados.svg",
    items: ["Whisky", "Vodka", "Gim", "Vermute & mixers"],
  },
  {
    id: "gelados",
    name: "Refrescos & energia",
    tag: "geladeira mega",
    description:
      "Energéticos, refrigerantes e águas de coco no talo — energia pra virar a noite.",
    image: "/img/cat-gelados.svg",
    items: ["Energéticos", "Refri lata & pet", "Água de coco", "Isotônicos"],
  },
  {
    id: "snacks",
    name: "Snacks & petiscos",
    tag: "amassados acho que não",
    description:
      "Salgadinho, amendoim, torresmo e charcutaria pra segurar a fome até o fim da resenha.",
    image: "/img/cat-snacks.svg",
    items: ["Chips", "Amendoim & castanha", "Torresmo", "Bandeijas"],
  },
  {
    id: "churrasco",
    name: "Gelo, carvão & fogo",
    tag: "kit bananeira",
    description:
      "Saca o isopor: gelo, carvão, acendedor e sal grosso. O fogo é por sua conta.",
    image: "/img/cat-churrasco.svg",
    items: ["Gelo em cubo", "Carvão", "Acendedor", "Sal grosso"],
  },
  {
    id: "hidratacao",
    name: "Hidratação & sucos",
    tag: "pra equilibrar",
    description:
      "Águas de todos os tipos, sucos e energia limpa pra equilibrar a balança no dia seguinte.",
    image: "/img/cat-hidratacao.svg",
    items: ["Água com/sem gás", "Sucos naturais", "Vitaminas", "Café expresso*"],
  },
];

export const featuredProducts: FeaturedProduct[] = [
  {
    id: "p1",
    category: "Cervejas",
    name: "Caixa cerveja puro malte",
    description: "12 long necks saindo direto da câmara fria pra sua caixa térmica.",
    price: "R$ 59,90",
    image: "/img/hero-beer.svg",
  },
  {
    id: "p2",
    category: "Destilados",
    name: "Whisky 12 anos 750ml",
    description: "O rótulo que transforma a mesa. Garanta o seu antes da gôndola virar.",
    price: "R$ 79,90",
    image: "/img/cat-destilados.svg",
  },
  {
    id: "p3",
    category: "Churrasco",
    name: "Kit bananeira completo",
    description: "Gelo + carvão + acendedor + sal grosso. O churrasco começa aqui.",
    price: "R$ 34,90",
    image: "/img/cat-churrasco.svg",
  },
  {
    id: "p4",
    category: "Energéticos",
    name: "Combo energético 4un.",
    description: "Noite comprida? Combina 4 sabores e garante a virada.",
    price: "R$ 39,90",
    image: "/img/cat-gelados.svg",
  },
  {
    id: "p5",
    category: "Hidratação",
    name: "Pack água com gás c/6",
    description: "Pra acompanhar, pra intercalar, pra voltar pro jogo.",
    price: "R$ 14,90",
    image: "/img/cat-hidratacao.svg",
  },
];

export const moments: Moment[] = [
  {
    id: "churrasco",
    kicker: "domingo · meio-dia",
    title: "O churrasco",
    description:
      "Carvão na brasa, caixa térmica cheia e a cerveja sempre gelada. A gente abastece, você recebe os elogios.",
    image: "/img/moment-churrasco.svg",
    chips: ["Carvão", "Gelo", "Cerveja", "Carne tá em casa"],
  },
  {
    id: "festa",
    kicker: "sábado · noite alta",
    title: "A virada de festa",
    description:
      "Drinks montados, energia em alta e gelo que não acaba. A playlist é sua, a bebida é nossa.",
    image: "/img/moment-festa.svg",
    chips: ["Vodka", "Gin", "Energético", "Gelo em rosquinha*"],
  },
  {
    id: "noite",
    kicker: "madrugada · pit stop",
    title: "O pit stop da madrugada",
    description:
      "A noite pediu mais? Parada rápida, porta aberta e o estoque que salva qualquer resenha.",
    image: "/img/moment-noite.svg",
    chips: ["Parada rápida", "Snacks", "Isotônico", "Próxima!"],
  },
];

export const marqueeItems = [
  "CERVEJA ESTUPIDAMENTE GELADA",
  "GELO & CARVÃO NA PORTA",
  "3 UNIDADES PRA TE ATENDER",
  "DESTILADOS & DRINKS",
  "SNACKS & PETISCOS",
  "ENERGIA PRA VIRADA",
  "CONVENIÊNCIA DE VERDADE",
];

export const stats = [
  { value: 3, suffix: "", label: "unidades na cidade", note: false },
  { value: 6, suffix: "", label: "categorias abastecidas", note: false },
  { value: 1500, suffix: "+", label: "itens em estoque*", note: true },
];
