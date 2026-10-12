import { Clock, Facebook, Instagram, Mail, MapPin, Phone, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useSearch } from "wouter";
import { useLanguage } from "../components/language-provider";
import { Seo } from "../components/seo";
import { PageHero, PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { useAnalytics } from "../hooks/use-analytics";
import { CONTACT, SESSIONS } from "../lib/site";
import { CALL_NOTE_ID, CallMark } from "../components/call-note";

/**
 * The form posts to this site's own server (public/api/contact.php), which
 * sends the emails. With every request goes a proof that a real browser took
 * the time to fill the form (public/api/guard.php and _store.php): a signed
 * challenge and a number that, hashed with it, starts with a few zero bits.
 * It is asked for when the form is first touched and worked out in the
 * background; the visitor sees nothing of it.
 */
interface Proof {
  c: string;
  a: string;
  at: number;
}

async function makeProof(): Promise<Proof> {
  const response = await fetch("/api/guard.php", { headers: { Accept: "application/json" } });
  const challenge = (await response.json()) as { ok: boolean; c: string; bits: number };
  if (!challenge.ok) throw new Error("guard");
  const encoder = new TextEncoder();
  const at = Date.now();
  for (let n = 0; ; n++) {
    const hash = new Uint8Array(
      await crypto.subtle.digest("SHA-256", encoder.encode(`${challenge.c}.${n}`)),
    );
    let bits = challenge.bits;
    let ok = true;
    for (let i = 0; bits > 0 && ok; i++, bits -= 8) {
      ok = bits >= 8 ? hash[i] === 0 : hash[i] >> (8 - bits) === 0;
    }
    if (ok) return { c: challenge.c, a: String(n), at };
  }
}

/** The server wants a few seconds between handing out a challenge and its use. */
const PROOF_MIN_AGE = 3400;

interface FormState {
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  familyMembers: string;
  /** Due date (maternity) or birth date (newborn) — the session hinges on it. */
  dueDate: string;
  preferredDate: string;
  message: string;
  consent: boolean;
  /** Honeypot — hidden from people, irresistible to bots. */
  website: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  sessionType: "",
  familyMembers: "",
  dueDate: "",
  preferredDate: "",
  message: "",
  consent: false,
  website: "",
};

/** A session cannot be booked in the past. */
const TODAY = new Date().toISOString().slice(0, 10);

function Contact() {
  const { t, href, language } = useLanguage();
  const { trackEvent } = useAnalytics();
  const search = useSearch();
  const [form, setForm] = useState<FormState>(() => {
    // "Reservar" on a package card arrives as ?sessao=newborn&pacote=Gold · 250€,
    // so the visitor never has to re-state what they just chose.
    const params = new URLSearchParams(search);
    const sessao = params.get("sessao") ?? "";
    const known = SESSIONS.some((session) => session.sessionType === sessao);
    return { ...EMPTY, sessionType: known ? sessao : "" };
  });
  const [chosenPackage, setChosenPackage] = useState(
    () => new URLSearchParams(search).get("pacote")?.slice(0, 80) ?? "",
  );
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "ratelimited"
  >("idle");
  const [autoReplySent, setAutoReplySent] = useState(false);

  const showFamilyMembers = form.sessionType === "family";
  const dueDateKind =
    form.sessionType === "maternity" || form.sessionType === "newborn"
      ? form.sessionType
      : null;

  // One proof per send, started at the first keystroke so it is ready (and
  // old enough) by the time the form is submitted.
  const proof = useRef<Promise<Proof> | null>(null);
  function prove() {
    proof.current ??= makeProof().catch((error) => {
      proof.current = null;
      throw error;
    });
    return proof.current;
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    prove().catch(() => {});
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setAutoReplySent(false);

    // Bots fill the hidden "website" field; pretend success and send nothing.
    if (form.website) {
      setStatus("sent");
      setForm(EMPTY);
      return;
    }

    try {
      const data = new FormData();
      data.set("name", form.name);
      data.set("email", form.email);
      data.set("phone", form.phone);
      data.set("session", form.sessionType);
      data.set("family", showFamilyMembers ? form.familyMembers : "");
      data.set("due_date", dueDateKind ? form.dueDate : "");
      data.set("preferred_date", form.preferredDate);
      data.set("package", chosenPackage);
      data.set("message", form.message.trim());
      data.set("consent", form.consent ? "1" : "");
      data.set("lang", language === "pt" ? "pt" : "en");
      data.set("website", form.website);

      // A proof the server no longer takes (form left open for hours, sent
      // twice) is made again and the send repeated, once, without a word to
      // the visitor.
      let response!: Response;
      let result: { ok?: boolean; error?: string; copy?: boolean } = {};
      for (let attempt = 0; attempt < 2; attempt++) {
        const made = await prove();
        const wait = PROOF_MIN_AGE - (Date.now() - made.at);
        if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
        data.set("g", made.c);
        data.set("ga", made.a);
        response = await fetch("/api/contact.php", {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        result = (await response.json().catch(() => ({}))) as typeof result;
        proof.current = null; // a challenge is good for one request
        if (result.error !== "check") break;
      }
      if (!response.ok || !result.ok) throw Object.assign(new Error(result.error), { status: response.status });

      setAutoReplySent(result.copy === true);
      trackEvent("contact_submit", { session_type: form.sessionType || "unspecified" });
      setStatus("sent");
      setForm(EMPTY);
      setChosenPackage("");
    } catch (error) {
      // The server answers 429 when its rate limit trips.
      const code = (error as { status?: number })?.status;
      setStatus(code === 429 ? "ratelimited" : "error");
    }
  }

  const sessionName = form.sessionType ? t(`session.${form.sessionType}`) : "";
  const whatsappGreeting = sessionName
    ? t("contact.whatsapp.withPackage").replace(
        "{session}",
        chosenPackage ? `${sessionName} (${chosenPackage})` : sessionName,
      )
    : language === "pt"
      ? "Olá! Gostaria de saber mais sobre as sessões de fotografia."
      : "Hello! I would like to know more about your photography sessions.";
  const whatsappUrl = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(whatsappGreeting)}`;

  const socials = [
    {
      icon: Instagram,
      label: t("contact.instagram"),
      handle: t("contact.instagram.handle"),
      href: CONTACT.instagramUrl,
    },
    {
      icon: Facebook,
      label: t("contact.facebook"),
      handle: t("contact.facebook.handle"),
      href: CONTACT.facebookUrl,
    },
  ].filter((social) => social.href.startsWith("https://"));

  return (
    <PageShell>
      <Seo title={t("seo.contact.title")} description={t("seo.contact.desc")} />

      <PageHero
        labelKey="nav.contact"
        titleKey="contact.title"
        subtitleKey="contact.subtitle"
      />

      <section className="container section-y-b">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* Form */}
          <Reveal>
            <form onSubmit={onSubmit} className="relative space-y-6">
              {chosenPackage && (
                <div className="border-primary/40 bg-card flex items-center justify-between gap-4 border px-5 py-4">
                  <p className="text-sm">
                    <span className="uppercase-spaced text-muted-foreground mr-3">
                      {t("contact.package.chosen")}
                    </span>
                    <span className="display-serif text-lg">{chosenPackage}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setChosenPackage("")}
                    aria-label={t("contact.package.remove")}
                    className="text-muted-foreground hover:text-foreground -m-2 grid size-11 shrink-0 place-items-center transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="uppercase-spaced text-muted-foreground mb-2.5 block">
                    {t("contact.name")}
                  </span>
                  <input
                    aria-label={t("contact.name")}
                    required
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="uppercase-spaced text-muted-foreground mb-2.5 block">
                    {t("contact.email")}
                  </span>
                  <input
                    aria-label={t("contact.email")}
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    className="field"
                  />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="uppercase-spaced text-muted-foreground mb-2.5 block">
                    {t("contact.phone")}
                  </span>
                  <input
                    aria-label={t("contact.phone")}
                    type="tel"
                    name="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="uppercase-spaced text-muted-foreground mb-2.5 block">
                    {t("contact.session")}
                  </span>
                  <select
                    aria-label={t("contact.session")}
                    value={form.sessionType}
                    onChange={(event) => update("sessionType", event.target.value)}
                    className="field"
                  >
                    <option value="">{t("contact.select")}</option>
                    {SESSIONS.map((session) => (
                      <option key={session.slug} value={session.sessionType}>
                        {t(session.titleKey)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {dueDateKind && (
                <label className="block">
                  <span className="uppercase-spaced text-muted-foreground mb-2.5 block">
                    {t(`contact.dueDate.${dueDateKind}`)}
                  </span>
                  <input
                    aria-label={t(`contact.dueDate.${dueDateKind}`)}
                    type="date"
                    value={form.dueDate}
                    onChange={(event) => update("dueDate", event.target.value)}
                    className="field sm:max-w-[calc(50%-0.75rem)]"
                  />
                  <span className="text-muted-foreground mt-2 block text-xs">
                    {t(`contact.dueDate.${dueDateKind}.help`)}
                  </span>
                </label>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="uppercase-spaced text-muted-foreground mb-2.5 block">
                    {t("contact.form.date")}
                  </span>
                  <input
                    aria-label={t("contact.form.date")}
                    type="date"
                    min={TODAY}
                    value={form.preferredDate}
                    onChange={(event) => update("preferredDate", event.target.value)}
                    className="field"
                  />
                  <span className="text-muted-foreground mt-2 block text-xs">
                    {t("contact.form.date.help")}
                  </span>
                </label>

                {showFamilyMembers && (
                  <label className="block">
                    <span className="uppercase-spaced text-muted-foreground mb-2.5 block">
                      {t("contact.familyMembers")}
                    </span>
                    <input
                      aria-label={t("contact.familyMembers")}
                      value={form.familyMembers}
                      onChange={(event) => update("familyMembers", event.target.value)}
                      className="field"
                    />
                  </label>
                )}
              </div>

              <label className="block">
                <span className="uppercase-spaced text-muted-foreground mb-2.5 block">
                  {t("contact.message")}{" "}
                  <span className="tracking-normal normal-case">({t("contact.optional")})</span>
                </span>
                <textarea
                  aria-label={t("contact.message")}
                  rows={5}
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                  className="field resize-none"
                />
              </label>

              {/*
                Honeypot. Kept out of the tab order and off screen rather than
                display:none, which some bots detect and skip.
              */}
              <div aria-hidden className="pointer-events-none absolute -left-[9999px] opacity-0">
                <label>
                  Website
                  <input
                    type="text"
                    name="website"
                    aria-label="Website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(event) => update("website", event.target.value)}
                  />
                </label>
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  required
                  aria-label={t("contact.form.consent")}
                  checked={form.consent}
                  onChange={(event) => update("consent", event.target.checked)}
                  className="border-border accent-primary mt-0.5 size-5 shrink-0 rounded-none"
                />
                <span className="text-muted-foreground leading-relaxed">
                  {t("contact.form.consent")}{" "}
                  <Link
                    href={href("privacy")}
                    className="text-primary underline underline-offset-4"
                  >
                    {t("contact.form.consent.link")}
                  </Link>
                </span>
              </label>

              {/* Not disabled until consent: the browser's own required-field
                  message now explains what is missing instead of a mute button. */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  className="btn-solid disabled:cursor-wait disabled:opacity-60"
                >
                  {status === "sending" ? t("contact.sending") : t("contact.send")}
                </button>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {t("contact.form.promise")}
                </p>
              </div>

              {status === "sent" && (
                <div role="status" className="space-y-1.5">
                  <p className="text-primary text-sm">{t("contact.success")}</p>
                  {autoReplySent && (
                    <p className="text-muted-foreground text-sm">
                      {t("contact.form.autoreply")}
                    </p>
                  )}
                </div>
              )}
              <div aria-live="polite">
                {(status === "ratelimited" || status === "error") && (
                  <p className="text-destructive text-sm">
                    {t(status === "error" ? "contact.error" : "contact.form.ratelimit")}{" "}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent("whatsapp_click", { placement: "contact_error" })}
                      className="text-foreground underline underline-offset-4"
                    >
                      {t("contact.error.whatsapp")}
                    </a>
                  </p>
                )}
              </div>
            </form>
          </Reveal>

          {/* Info */}
          <Reveal delay={150}>
            <div className="border-border/70 border p-8 md:p-10">
              <h2 className="display-serif mb-8 text-2xl font-light">{t("contact.info")}</h2>

              <ul className="space-y-7 text-sm">
                <li className="flex items-start gap-4">
                  <Phone className="text-primary mt-0.5 size-4 shrink-0" />
                  <div>
                    <p className="uppercase-spaced text-muted-foreground mb-1.5">
                      {t("contact.phone.label")}
                    </p>
                    <a
                      href={`tel:${CONTACT.phoneE164}`}
                      onClick={() => trackEvent("phone_click", { placement: "contact_page" })}
                      aria-describedby={CALL_NOTE_ID}
                      className="nav-link hover:text-primary"
                    >
                      {CONTACT.phone}
                      <CallMark />
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <Mail className="text-primary mt-0.5 size-4 shrink-0" />
                  <div>
                    <p className="uppercase-spaced text-muted-foreground mb-1.5">
                      {t("contact.email")}
                    </p>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="nav-link hover:text-primary"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <MapPin className="text-primary mt-0.5 size-4 shrink-0" />
                  <div>
                    <p className="uppercase-spaced text-muted-foreground mb-1.5">
                      {t("contact.address")}
                    </p>
                    <p>{t(CONTACT.addressKey)}</p>
                    <a
                      href={CONTACT.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="uppercase-spaced text-primary mt-3 inline-block"
                    >
                      {t("contact.maps.cta")}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <Clock className="text-primary mt-0.5 size-4 shrink-0" />
                  <div>
                    <p className="uppercase-spaced text-muted-foreground mb-1.5">
                      {t("contact.hours.label")}
                    </p>
                    <p>{t("contact.hours.value")}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-9 grid gap-3">
                <a
                  href={`tel:${CONTACT.phoneE164}`}
                  onClick={() => trackEvent("phone_click", { placement: "contact_cta" })}
                  className="btn-outline w-full text-center"
                >
                  {t("contact.call.cta")}
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { placement: "contact_cta" })}
                  className="btn-outline w-full text-center"
                >
                  {t("contact.whatsapp.cta")}
                </a>
              </div>

              <hr className="rule-line my-9" />

              <p className="uppercase-spaced text-muted-foreground mb-5">{t("contact.social")}</p>
              <ul className="space-y-4 text-sm">
                {socials.map((social) => (
                  <li key={social.label} className="flex items-center gap-4">
                    <social.icon className="text-primary size-4 shrink-0" />
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="nav-link hover:text-primary"
                    >
                      {social.handle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

export default Contact;
