# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** expecting parents and young families in the Algarve looking for a photographer — typically a pregnant mother browsing on her phone, comparing studios, often in the evening. Portuguese locals and foreign residents (EN) carry similar weight.
- **Also:** families on holiday in the Algarve who book an outdoor family / beach session.
- Their job: decide whether to trust this studio with a once-only moment (the bump, the first two weeks), understand what it costs and what they get, and book — usually through WhatsApp or the contact form.

## Product Purpose

The marketing and booking site for **9 Meses Fotografia**, Tânia's maternity, newborn, baby, family and smash-the-cake photography studio in Ferreiras, Albufeira. Success is a qualified enquiry (form or WhatsApp) with the session, package and due date known up front — ideally a maternity booking that continues into newborn and the first year.

## Positioning

What a neighbouring studio cannot truthfully copy, all four confirmed by the owner as the message:

1. **A former nurse** photographs your newborn — safety and care with the baby.
2. **The "9 meses" journey:** one photographer from the bump to the first birthday (maternidade → newborn → bebé → smash the cake); maternity + newborn booked together already earns 50€ off.
3. **Studio + Algarve:** a warm studio in Ferreiras (easy parking, coffee, toys, wardrobe and props) and outdoor sessions at golden hour on Algarve beaches, fields and towns.
4. **Since 2012, and a mother too:** photography started with the birth of her eldest daughter; full-time since 2017.

## Operating Context

- Enquiries arrive by WhatsApp (+351 967 716 894), the contact form (EmailJS → email) and phone; no online payment.
- Booking: 50% deposit, 50% on the day; cash, bank transfer or MB WAY. Newborn sessions are booked during pregnancy for the due date and confirmed after birth; a questionnaire follows booking.
- After the session: online Zoom slideshow reveal, image selection, online gallery within 2 months (3 working days with a 100€ rush fee), prints delivered later.
- Session windows: maternity 29–35 weeks; newborn first 2 weeks (3–4 h, baby-led); baby and smash ~1 h; outdoor sessions start 1 h before sunset.

## Capabilities and Constraints

- Static bilingual site (PT default at `/`, EN under `/en`), pre-rendered, hosted on DreamHost, deployed from GitHub. No CMS: content is edited in the repo by Nelson (+ Claude).
- Source of truth for prices and terms: *Pacotes e Informações 2024* brochure (`packages/web/public/brochura/9meses-brochura.pdf`); three packages per session.
- Contact form must keep working without a server (EmailJS).
- Undecided: whether a dedicated "Barriga + Bebé" bundle becomes its own product (today it is the 50€ discount note).

## Brand Commitments

- Name **9 Meses Fotografia**; the handwritten "9meses" logo with the dandelion; line-art session marks from the brand pack; watercolour washes; the brochure's voice (warm, first person, "vocês").
- Tagline in use: "Escrevemos com luz a vossa história" / footer "Da barriga ao primeiro aninho".
- Studio location copy: "Estúdio Fotografia, Algarve".
- **The current visual design is approved by the owner (Sept 2026: "é a minha cara", loves the watercolour template).** Do not change the visual identity or page structure without an explicit request; improvements go to content, performance, accessibility and correctness.

## Evidence on Hand

- Real photography across all five sessions and the studio (`packages/web/public/images/portfolio/`).
- 3 short published testimonials (`src/web/content/testimonials.ts`).
- **Available to collect:** Google Business reviews (rating and count still to be supplied) and testimonials with family photos (owner to ask clients for consent).
- **Not available — never invent:** newborn-safety certifications, awards, press, review numbers, client counts.

## Product Principles

1. Lead with trust at the anxious moments (newborn safety, price, what happens next) — reassurance sits next to the decision, not on another page.
2. The journey is the product: every session page should make the next stage of the "9 meses" story visible.
3. Photography first; interface quietly supports it.
4. Only real proof: quote what exists, leave gaps visible rather than filled.
5. Booking should never lose context — session, package and due date travel with the enquiry.
