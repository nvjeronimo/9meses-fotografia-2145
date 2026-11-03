# 9 Meses Fotografia — 9mesesfotografia.com

Site estático (React + Vite, pré-renderizado) alojado na DreamHost.
Cada push para `main` constrói e publica automaticamente
(`.github/workflows/deploy-dreamhost.yml`).

## Onde se muda o quê

| O quê | Ficheiro |
|---|---|
| Textos do site (PT/EN) | `packages/web/src/web/lib/translations.ts` |
| Pacotes e preços | `packages/web/src/web/content/packages.ts` |
| Títulos Google e perguntas frequentes de cada sessão (também alimentam o `llms.txt`) | `packages/web/src/web/content/session-seo.ts` — se um preço mudar em `packages.ts`, atualizar aqui o "desde" |
| Testemunhos | `packages/web/src/web/content/testimonials.ts` |
| Artigos do diário | `packages/web/src/web/content/posts.ts` |
| Fotos por sessão / galeria | `packages/web/src/web/lib/site.ts` (`DEFAULT_PHOTOS`) + ficheiros em `packages/web/public/images/` |
| Contactos, redes sociais | `packages/web/src/web/lib/site.ts` (`CONTACT`) |
| Formulário de contacto: destinatários e textos dos emails | `packages/web/public/api/contact.php` (protecção contra spam em `_store.php` e `guard.php`) |

Depois de acrescentar fotos: `python3 tools/optimize-images.py` (gera as versões WebP).

## Comandos

```bash
bun install
bun run dev        # http://localhost:4200
bun run typecheck
cd packages/web && bun run build   # dist/ com todas as páginas pré-renderizadas
```

## Brochura por sessão

A brochura completa (`packages/web/public/brochura/9meses-brochura.pdf`, 55 páginas) é dividida em cinco PDFs, um por sessão, listados em `packages/web/src/web/content/brochures.ts`. Mapa de páginas da brochura 2024: Bebé 1–12 · Família 13–25 · Maternidade 26–33 + 38–43 · Newborn 26–28 + 34–43 (as páginas 26–28 e 38–43 são comuns às duas) · Smash the Cake 44–55. Com uma brochura nova, refazer a divisão com o novo mapa e gerar as capas (página 1 de cada PDF, WebP com 640 px).

