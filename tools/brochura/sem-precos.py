"""
Brochura sem preços: apaga os valores dos pacotes e dos produtos extra da brochura completa
(docs/brochura-2024-completa.pdf) e escreve, em cada página de pacotes, "A partir de X €" com o
pacote mais barato dessa página (como no site), e "Preços sob consulta" na página de produtos. O texto dos valores é removido do PDF (não fica
tapado nem pesquisável). Depois divide o resultado por sessão em packages/web/public/brochura/.

    uv run --with pymupdf python3 tools/brochura/sem-precos.py

Letra: Lato (a do site; a brochura não traz a sua letra completa). Cores medidas na brochura.
"""
import re, pathlib, pymupdf

ROOT = pathlib.Path(__file__).resolve().parents[2]
HERE = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "docs/brochura-2024-completa.pdf"
OUT = ROOT / "docs/brochura-2024-sem-precos.pdf"
PUB = ROOT / "packages/web/public/brochura"
GOLD = (188 / 255, 150 / 255, 114 / 255)   # títulos ("PACOTE 1")
LATO = str(HERE / "lato-400.ttf")

PRICE = re.compile(r"^\s*\d+(?:,\d+)?\s*€\s*$")                # "150€" sozinho: preço de um pacote
EXTRA = re.compile(r"(\s*\((?:cada|Cada)\))?\s+\d+(?:,\d+)?\s*€\s*$")  # " (cada) 15€" no fim de um produto

def spaced(text: str) -> str:
    """The brochure's own letter-spacing: a space between letters, three between words."""
    return "   ".join(" ".join(word) for word in text.split(" "))

def centred(page, y, text, size, font, colour, name):
    width = pymupdf.Font(fontfile=font).text_length(text, fontsize=size)
    page.insert_text((page.rect.width / 2 - width / 2, y), text, fontsize=size, fontfile=font, fontname=name, color=colour)

doc = pymupdf.open(SRC)
report = []
for number, page in enumerate(doc, start=1):
    spans = [s for b in page.get_text("rawdict")["blocks"] for l in b.get("lines", []) for s in l["spans"]]
    text_of = lambda s: "".join(c["c"] for c in s["chars"])
    prices, extras = [], []
    for s in spans:
        t = text_of(s)
        if PRICE.match(t):
            prices.append((int(re.sub(r"\D", "", t.split(",")[0])), pymupdf.Rect(s["bbox"])))
        else:
            m = EXTRA.search(t)
            if m and "€" in t:
                start = m.start()
                box = pymupdf.Rect()
                for c in s["chars"][start:]:
                    box |= pymupdf.Rect(c["bbox"])
                extras.append(box)
    if not prices and not extras:
        continue
    for _, box in prices:
        page.add_redact_annot(box + (-1, -1, 1, 1), fill=(1, 1, 1))
    for box in extras:
        page.add_redact_annot(box + (-0.5, -0.5, 1, 0.5), fill=(1, 1, 1))
    page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=pymupdf.PDF_REDACT_LINE_ART_NONE)

    # The same place on every page: between the title frame (part of the page background, it ends
    # at about y=178) and the package names (y=209), so nothing else on the page moves.
    LINE = 197
    if prices:
        lowest = min(p for p, _ in prices)
        centred(page, LINE, spaced(f"A partir de {lowest}€").upper(), 10.5, LATO, GOLD, "lato")
        report.append(f"página {number}: pacotes {sorted(p for p, _ in prices)} -> a partir de {lowest}€")
    if extras:
        centred(page, LINE, spaced("Preços sob consulta").upper(), 10.5, LATO, GOLD, "lato")
        report.append(f"página {number}: {len(extras)} valores de produtos removidos")

doc.save(OUT, garbage=4, deflate=True)
print("\n".join(report))

# Split by session (page map in the README).
R = lambda a, b: list(range(a, b + 1))
SPLIT = {"maternidade": R(26, 33) + R(38, 43), "newborn": R(26, 28) + R(34, 43), "bebe": R(1, 12), "familia": R(13, 25), "smash-the-cake": R(44, 55)}
full = pymupdf.open(OUT)
for name, pages in SPLIT.items():
    part = pymupdf.open()
    for p in pages:
        part.insert_pdf(full, from_page=p - 1, to_page=p - 1)
    part.set_metadata({"title": f"9 Meses Fotografia · {name}", "author": "9 Meses Fotografia"})
    target = PUB / f"9meses-brochura-{name}.pdf"
    part.save(target, garbage=4, deflate=True)
    print(name, len(pages), "páginas", round(target.stat().st_size / 1e6, 2), "MB")
