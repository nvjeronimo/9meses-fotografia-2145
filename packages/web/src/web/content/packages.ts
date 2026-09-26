// Pacotes e preços (Brochura "Pacotes e Informações 2024").
// Para mudar um preço ou uma linha: editar aqui e fazer push — o site
// atualiza sozinho. `highlighted` = pacote em destaque (botão cheio).

export type SessionType = "maternity" | "newborn" | "baby" | "family" | "smash";

export interface Package {
  sessionType: SessionType;
  name: string;
  price: number;
  featuresPt: string;
  featuresEn: string;
  highlighted?: boolean;
  sortOrder: number;
}

const pkg = (count: string, countEn: string, extrasPt: string[] = [], extrasEn: string[] = []) => ({
  featuresPt: [
    count,
    "Imagens em JPEG de alta resolução",
    "Entrega em galeria online",
    ...extrasPt,
  ].join("\n"),
  featuresEn: [
    countEn,
    "High-resolution JPEG images",
    "Delivered in an online gallery",
    ...extrasEn,
  ].join("\n"),
});

const ALL = ["Todas as imagens editadas", "All edited images"] as const;
const SLIDESHOW = [
  "Slideshow com todas as imagens da sessão",
  "Slideshow with every image from the session",
] as const;
const PRINTS_10 = ["10 impressões 15x20", "10 prints 15x20"] as const;
const PRINTS_15 = ["15 impressões 15x20", "15 prints 15x20"] as const;
const CAKE = ["Bolo incluído", "Cake included"] as const;

// Brochura "Pacotes e Informações 2024" — three per session, cheapest first.
export const PACKAGES: Package[] = [
  // Maternidade
  { sessionType: "maternity", name: "Mini", price: 150,
    ...pkg("15 imagens editadas", "15 edited images"), sortOrder: 1 },
  { sessionType: "maternity", name: "Deluxe", price: 250,
    ...pkg("25 imagens editadas", "25 edited images", [PRINTS_10[0]], [PRINTS_10[1]]), sortOrder: 2 },
  { sessionType: "maternity", name: "VIP", price: 300, highlighted: true,
    ...pkg(ALL[0], ALL[1], [SLIDESHOW[0], PRINTS_15[0]], [SLIDESHOW[1], PRINTS_15[1]]), sortOrder: 3 },
  // Newborn
  { sessionType: "newborn", name: "Prata", price: 180,
    ...pkg("8 imagens editadas", "8 edited images"), sortOrder: 4 },
  { sessionType: "newborn", name: "Ouro", price: 250,
    ...pkg("15 imagens editadas", "15 edited images", [PRINTS_10[0]], [PRINTS_10[1]]), sortOrder: 5 },
  { sessionType: "newborn", name: "Diamante", price: 370, highlighted: true,
    ...pkg(ALL[0], ALL[1],
      [SLIDESHOW[0], PRINTS_15[0], "Vale de 20€ para a sessão de bebé (entre os 7 e os 10 meses)"],
      [SLIDESHOW[1], PRINTS_15[1], "€20 voucher for the baby session (between 7 and 10 months)"]),
    sortOrder: 6 },
  // Bebé
  { sessionType: "baby", name: "Pacote 1", price: 150,
    ...pkg("10 imagens editadas", "10 edited images"), sortOrder: 7 },
  { sessionType: "baby", name: "Pacote 2", price: 230,
    ...pkg("20 imagens editadas", "20 edited images", [PRINTS_10[0]], [PRINTS_10[1]]), sortOrder: 8 },
  { sessionType: "baby", name: "Pacote 3", price: 300, highlighted: true,
    ...pkg(ALL[0], ALL[1], [SLIDESHOW[0], PRINTS_15[0]], [SLIDESHOW[1], PRINTS_15[1]]), sortOrder: 9 },
  // Família
  { sessionType: "family", name: "Essencial", price: 150,
    ...pkg("15 imagens editadas", "15 edited images"), sortOrder: 10 },
  { sessionType: "family", name: "Medium", price: 250,
    ...pkg("25 imagens editadas", "25 edited images", [PRINTS_10[0]], [PRINTS_10[1]]), sortOrder: 11 },
  { sessionType: "family", name: "Completo", price: 300, highlighted: true,
    ...pkg(ALL[0], ALL[1], [SLIDESHOW[0], PRINTS_15[0]], [SLIDESHOW[1], PRINTS_15[1]]), sortOrder: 12 },
  // Smash the Cake
  { sessionType: "smash", name: "XS", price: 150,
    ...pkg("10 imagens editadas", "10 edited images", [CAKE[0]], [CAKE[1]]), sortOrder: 13 },
  { sessionType: "smash", name: "M", price: 250,
    ...pkg("20 imagens editadas", "20 edited images", [CAKE[0], PRINTS_10[0]], [CAKE[1], PRINTS_10[1]]),
    sortOrder: 14 },
  { sessionType: "smash", name: "L", price: 340, highlighted: true,
    ...pkg(ALL[0], ALL[1],
      [CAKE[0], SLIDESHOW[0], PRINTS_15[0], "Vale de 20€ para a sessão de família (válido 1 ano)"],
      [CAKE[1], SLIDESHOW[1], PRINTS_15[1], "€20 voucher for a family session (valid for 1 year)"]),
    sortOrder: 15 },
];
