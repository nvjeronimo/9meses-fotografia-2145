/**
 * Pre-renders every public page to static HTML after `vite build`, and writes
 * sitemap.xml from the same route list.
 *
 *   dist/index.html            home, fully rendered
 *   dist/sobre/index.html      …one folder per page (PT and EN)
 *   dist/app.html              the bare app shell, used by .htaccess for
 *                              anything that was not pre-rendered (404s)
 *
 * Run with: bun scripts/prerender.ts   (after vite build)
 */
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { POSTS } from "../src/web/content/posts";
import { PAGES, STATIC_PAGE_IDS, pathFor } from "../src/web/lib/routes";
import { SESSIONS, SITE_URL } from "../src/web/lib/site";
import { writeLlmsTxt } from "./llms";

const DIST = path.resolve(import.meta.dir, "../dist");
const PORT = 4310;

const routes: string[] = [];
for (const language of ["pt", "en"] as const) {
  for (const page of STATIC_PAGE_IDS) routes.push(PAGES[page][language]);
  for (const session of SESSIONS) {
    routes.push(pathFor("sessionDetail", language, language === "pt" ? session.slug : session.slugEn));
  }
  for (const post of POSTS.filter((p) => !p.draft)) routes.push(pathFor("journalPost", language, post.slug));
}

await copyFile(path.join(DIST, "index.html"), path.join(DIST, "app.html"));

const server = Bun.spawn(["bunx", "vite", "preview", "--port", String(PORT), "--strictPort"], {
  cwd: path.resolve(import.meta.dir, ".."),
  stdout: "pipe",
  stderr: "inherit",
});
const base = `http://localhost:${PORT}`;
for (let i = 0; ; i++) {
  try {
    if ((await fetch(base)).ok) break;
  } catch {}
  if (i > 60) throw new Error("vite preview did not start");
  await Bun.sleep(500);
}

const browser = await chromium.launch();
// Reduced motion renders every scroll-reveal in its final, visible state, so
// the snapshot never ships sections stuck at opacity 0.
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  reducedMotion: "reduce",
});

let failed = 0;
for (const route of routes) {
  const page = await context.newPage();
  const response = await page.goto(base + route, { waitUntil: "networkidle" });
  if (!response?.ok()) {
    console.error(`✗ ${route} (${response?.status()})`);
    failed++;
    await page.close();
    continue;
  }
  await page.waitForFunction(() => document.title.length > 0 && !!document.querySelector("main"));
  const html = await page.evaluate(() => {
    // Head tags React hoisted for this page: mark them so main.tsx can hand
    // them back to React on load instead of duplicating them.
    document.head
      .querySelectorAll(
        'title, meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], link[rel="alternate"], script[type="application/ld+json"]',
      )
      .forEach((node) => node.setAttribute("data-pr", ""));
    return "<!doctype html>\n" + document.documentElement.outerHTML;
  });
  const file = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route, "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log(`✓ ${route}`);
  await page.close();
}

await browser.close();
server.kill();

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  path.join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${SITE_URL}${route}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`,
);

await writeLlmsTxt(DIST);

// The pages load WebP variants; the original JPEGs are only needed where a
// page still names them (social cards, structured data). Ship only those.
const html: string[] = [];
const walk = async (dir: string): Promise<void> => {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith(".html")) html.push(await readFile(full, "utf8"));
  }
};
await walk(DIST);
const referenced = html.join("\n");
const portfolio = path.join(DIST, "images/portfolio");
let removed = 0;
for (const name of await readdir(portfolio)) {
  if (/\.jpe?g$/i.test(name) && !referenced.includes(`/images/portfolio/${name}`)) {
    await rm(path.join(portfolio, name));
    removed++;
  }
}
console.log(`${removed} unused original JPEGs left out of the upload.`);

console.log(`\n${routes.length - failed}/${routes.length} pages pre-rendered, sitemap.xml written.`);
if (failed) process.exit(1);
