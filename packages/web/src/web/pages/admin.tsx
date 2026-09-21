import { cn } from "@/lib/utils";
import { ExternalLink, Image, LogOut, Mail, MessageSquareQuote, Newspaper, Tag, Type } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { AdminButton, AdminLabel, useAdminCopy } from "../components/admin/admin-ui";
import { ContentManager } from "../components/admin/content-manager";
import { JournalEditor } from "../components/admin/journal-editor";
import { MessagesInbox } from "../components/admin/messages-inbox";
import { PackagesManager } from "../components/admin/packages-manager";
import { PhotosManager } from "../components/admin/photos-manager";
import { TestimonialsManager } from "../components/admin/testimonials-manager";
import { useLanguage } from "../components/language-provider";
import { authClient, signOut } from "../lib/auth";
import { useSetupStatus, useUnreadCount } from "../queries/messages";

type Tab = "photos" | "content" | "packages" | "testimonials" | "journal" | "messages";

function Gate() {
  const copy = useAdminCopy();
  const setup = useSetupStatus();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pending = setup.data?.pending === true;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = pending
        ? await authClient.signUp.email({ name: name || "Tânia", email, password })
        : await authClient.signIn.email({ email, password });
      // Server messages are English and technical — show the localized one instead.
      if (result.error) setError(copy.invalid);
    } catch {
      setError(copy.invalid);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-10 block text-center">
          <img src="/images/logo.png" alt="9 Meses Fotografia" className="mx-auto h-14 w-auto" />
        </Link>

        <h1 className="display-serif mb-2 text-center text-2xl font-light">
          {pending ? copy.setupTitle : copy.loginTitle}
        </h1>
        {pending && (
          <p className="text-muted-foreground mb-8 text-center text-xs leading-relaxed">
            {copy.setupHint}
          </p>
        )}
        <hr className="rule-line mx-auto mt-6 mb-9 w-16" />

        <form onSubmit={onSubmit} className="space-y-5">
          {pending && (
            <label className="block">
              <AdminLabel>{copy.name}</AdminLabel>
              <input
                aria-label={copy.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field"
              />
            </label>
          )}
          <label className="block">
            <AdminLabel>{copy.email}</AdminLabel>
            <input
              aria-label={copy.email}
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field"
            />
          </label>
          <label className="block">
            <AdminLabel>{copy.password}</AdminLabel>
            <input
              aria-label={copy.password}
              required
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field"
            />
          </label>

          <AdminButton type="submit" variant="solid" disabled={busy} className="w-full">
            {busy ? copy.loading : pending ? copy.createAccount : copy.login}
          </AdminButton>

          {error && <p className="text-destructive text-center text-sm">{error}</p>}
        </form>

        <Link
          to="/"
          className="text-muted-foreground hover:text-foreground mt-10 block text-center text-xs transition-colors"
        >
          {copy.viewSite}
        </Link>
      </div>
    </div>
  );
}

function Admin() {
  const copy = useAdminCopy();
  const { language, toggleLanguage } = useLanguage();
  const session = authClient.useSession();
  const unread = useUnreadCount(!!session.data);
  const [tab, setTab] = useState<Tab>("photos");

  if (session.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">{copy.loading}</p>
      </div>
    );
  }

  if (!session.data) return <Gate />;

  const TABS: { value: Tab; label: string; icon: typeof Image; badge?: number }[] = [
    { value: "photos", label: copy.tabPhotos, icon: Image },
    { value: "content", label: copy.tabContent, icon: Type },
    { value: "packages", label: copy.tabPackages, icon: Tag },
    { value: "testimonials", label: copy.tabTestimonials, icon: MessageSquareQuote },
    { value: "journal", label: copy.tabJournal, icon: Newspaper },
    { value: "messages", label: copy.tabMessages, icon: Mail, badge: unread.data ?? 0 },
  ];

  return (
    <div className="min-h-screen">
      <header className="border-border/70 bg-card sticky top-0 z-40 border-b">
        <div className="container flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <img src="/images/logo.png" alt="" className="h-9 w-auto" />
            <div>
              <p className="uppercase-spaced">{copy.title}</p>
              <p className="text-muted-foreground text-xs">{session.data.user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="uppercase-spaced border-border hover:border-foreground border px-3 py-1.5 transition-colors"
            >
              {language === "pt" ? "EN" : "PT"}
            </button>
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 p-2 text-xs transition-colors"
            >
              <ExternalLink className="size-4" />
              <span className="hidden sm:inline">{copy.viewSite}</span>
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="text-muted-foreground hover:text-destructive inline-flex items-center gap-1.5 p-2 text-xs transition-colors"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">{copy.signOut}</span>
            </button>
          </div>
        </div>

        <div className="container flex gap-1 overflow-x-auto">
          {TABS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setTab(item.value)}
              className={cn(
                "uppercase-spaced relative flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 transition-colors",
                tab === item.value
                  ? "border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground border-transparent",
              )}
            >
              <item.icon className="size-3.5" />
              {item.label}
              {item.badge ? (
                <span className="bg-primary text-primary-foreground ml-1 rounded-full px-1.5 py-0.5 text-[9px] leading-none">
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </header>

      <main className="container py-10">
        {tab === "photos" && <PhotosManager language={language} />}
        {tab === "content" && <ContentManager language={language} />}
        {tab === "packages" && <PackagesManager language={language} />}
        {tab === "testimonials" && <TestimonialsManager language={language} />}
        {tab === "journal" && <JournalEditor language={language} />}
        {tab === "messages" && <MessagesInbox language={language} />}
      </main>
    </div>
  );
}

export default Admin;
