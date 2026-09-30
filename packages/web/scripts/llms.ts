/**
 * Writes dist/llms.txt: a plain summary of the studio for AI assistants and
 * answer engines (the llms.txt convention). Built from the same content files
 * as the site, so prices and answers never drift from what the pages say.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { PACKAGES } from "../src/web/content/packages";
import { POSTS } from "../src/web/content/posts";
import { SESSION_SEO } from "../src/web/content/session-seo";
import { CONTACT, GOOGLE_REVIEWS, SESSIONS, SITE_URL } from "../src/web/lib/site";

export async function writeLlmsTxt(dist: string) {
  const from = (type: string) =>
    Math.min(...PACKAGES.filter((row) => row.sessionType === type).map((row) => row.price));

  const sessions = SESSIONS.map((s) => {
    const pt = SESSION_SEO[s.sessionType].pt;
    const en = SESSION_SEO[s.sessionType].en;
    const packages = PACKAGES.filter((row) => row.sessionType === s.sessionType)
      .map((row) => `${row.name} ${row.price} €`)
      .join(", ");
    const faq = pt.faq.map((qa) => `  - ${qa.q} ${qa.a}`).join("\n");
    return `### ${pt.title}
- PT: ${SITE_URL}/sessoes/${s.slug} · EN: ${SITE_URL}/en/sessions/${s.slugEn} (${en.title})
- Desde ${from(s.sessionType)} € · Pacotes: ${packages}
- ${pt.description}
${faq}`;
  }).join("\n\n");

  const posts = POSTS.filter((p) => !p.draft)
    .map((p) => `- [${p.titlePt}](${SITE_URL}/diario/${p.slug}): ${p.excerptPt}`)
    .join("\n");

  const text = `# 9 Meses Fotografia

> Estúdio de fotografia de grávida (maternidade), newborn (recém-nascido), bebé, smash the cake e família em Ferreiras, Albufeira, no Algarve (Portugal). Fotógrafa: Tânia Pires, que foi enfermeira durante vários anos, fotografa desde 2012 e a tempo inteiro desde 2017. Maternity, newborn, baby, cake smash and family photographer in Albufeira, Algarve, Portugal; site in Portuguese and English.

## Factos
- Morada: ${CONTACT.street}, ${CONTACT.postalCode} Ferreiras, Albufeira, Algarve, Portugal. Estacionamento fácil.
- Contacto: ${CONTACT.phone} (telefone e WhatsApp), ${CONTACT.email}. Marcações: ${SITE_URL}/contacto
- Avaliações Google: ${GOOGLE_REVIEWS.ratingEn} de 5 em ${GOOGLE_REVIEWS.count} avaliações (${GOOGLE_REVIEWS.url}).
- Diferença: acompanha a mesma família da barriga ao primeiro aniversário (maternidade → newborn → bebé → smash the cake); reservar maternidade + newborn em conjunto dá 50 € de desconto ("Barriga + Bebé").
- Newborn: nos primeiros 14 dias, 3 a 4 horas, sessões baby-led num estúdio aquecido; reserva-se durante a gravidez para a data prevista do parto.
- Exterior (família, e grávida ou smash the cake se preferirem): começa 1 hora antes do pôr do sol, em praia, campo ou cidade no Algarve. Famílias de férias no Algarve também marcam.
- Pagamento: 50% na reserva, 50% no dia; numerário, transferência ou MB WAY. Galeria online em até 2 meses (3 dias úteis com taxa de urgência de 100 €).
- Vales de oferta: ${SITE_URL}/vales-oferta (válidos 6 meses).

## Sessões
${sessions}

## Páginas
- [Início](${SITE_URL}/) · [English](${SITE_URL}/en)
- [Sobre a Tânia](${SITE_URL}/sobre)
- [O estúdio](${SITE_URL}/estudio)
- [Pacotes e preços](${SITE_URL}/pacotes)
- [Como preparar a sessão](${SITE_URL}/preparar-a-sessao)
- [Perguntas frequentes](${SITE_URL}/faq)
- [Galeria](${SITE_URL}/galeria)

## Diário
${posts}
`;
  await writeFile(path.join(dist, "llms.txt"), text);
}
