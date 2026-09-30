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
| Formulário (EmailJS) | `.env.production` |

Depois de acrescentar fotos: `python3 tools/optimize-images.py` (gera as versões WebP).

## Comandos

```bash
bun install
bun run dev        # http://localhost:4200
bun run typecheck
cd packages/web && bun run build   # dist/ com todas as páginas pré-renderizadas
```
