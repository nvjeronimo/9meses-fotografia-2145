// Testemunhos publicados no site. Para acrescentar um: copiar um bloco,
// dar-lhe o id seguinte e ajustar sortOrder (menor aparece primeiro).
// `photo` é opcional: só com autorização da família para mostrar a foto.

export interface Testimonial {
  id: number;
  author: string;
  quotePt: string;
  quoteEn: string;
  /** maternity | newborn | baby | family | smash, or null for any. */
  sessionType: string | null;
  sortOrder: number;
  /** Optional family photo (path under /images/), only with the family's consent. */
  photo?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    "id": 1,
    "author": "Ana & Miguel",
    "quotePt": "A Tânia tem um dom. Conseguiu captar a emoção deste momento de uma forma que nunca imaginámos. Voltaremos sempre.",
    "quoteEn": "Tânia has a gift. She captured the emotion of this moment in a way we never imagined. We will always come back.",
    "sessionType": "maternity",
    "sortOrder": 0
  },
  {
    "id": 2,
    "author": "Sofia R.",
    "quotePt": "Sessão newborn tranquila do início ao fim. O bebé sempre no centro de tudo, e as fotografias são simplesmente lindas.",
    "quoteEn": "A calm newborn session from start to finish. The baby was always the priority, and the photographs are simply beautiful.",
    "sessionType": "newborn",
    "sortOrder": 1
  },
  {
    "id": 3,
    "author": "Família Costa",
    "quotePt": "Sentimo-nos em casa no estúdio. As fotografias de família ficaram naturais, cheias de vida e de nós.",
    "quoteEn": "We felt at home in the studio. The family photographs came out natural, full of life and full of us.",
    "sessionType": "family",
    "sortOrder": 2
  }
];
