// A brochura "Pacotes e Informações 2024" dividida por sessão (a pedido da Tânia, 2026-11-03).
// Os PDFs e as capas estão em public/brochura/. São a versão SEM preços (só "A partir de X €" e
// "Preços sob consulta"), feita por tools/brochura/sem-precos.py a partir da brochura original
// docs/brochura-2024-completa.pdf, que fica fora do site. Para refazer a divisão a partir de uma brochura
// nova, ver o mapa de páginas no README.

import type { SessionType } from "./packages";

export const BROCHURES: Record<SessionType, { file: string; cover: string; pages: number }> = {
  maternity: { file: "/brochura/9meses-brochura-maternidade.pdf", cover: "/brochura/capa-maternidade.webp", pages: 14 },
  newborn: { file: "/brochura/9meses-brochura-newborn.pdf", cover: "/brochura/capa-newborn.webp", pages: 13 },
  baby: { file: "/brochura/9meses-brochura-bebe.pdf", cover: "/brochura/capa-bebe.webp", pages: 12 },
  family: { file: "/brochura/9meses-brochura-familia.pdf", cover: "/brochura/capa-familia.webp", pages: 13 },
  smash: { file: "/brochura/9meses-brochura-smash-the-cake.pdf", cover: "/brochura/capa-smash-the-cake.webp", pages: 12 },
};
