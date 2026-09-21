import { cn } from "@/lib/utils";
import { useLanguage } from "../language-provider";

/** Small PT/EN dictionary for the admin panel chrome. */
const ADMIN_COPY = {
  pt: {
    title: "Gestor de conteúdo",
    subtitle: "9 Meses Fotografia",
    signOut: "Sair",
    viewSite: "Ver site",
    login: "Entrar",
    loginTitle: "Área reservada",
    setupTitle: "Criar conta de administradora",
    setupHint: "Esta conta é criada apenas uma vez. Guarde a palavra-passe.",
    name: "Nome",
    email: "Email",
    password: "Palavra-passe",
    createAccount: "Criar conta",
    loading: "A carregar...",
    invalid: "Email ou palavra-passe incorretos.",
    tabPhotos: "Fotografias",
    tabContent: "Textos",
    tabPackages: "Preços",
    tabMessages: "Mensagens",
    tabTestimonials: "Testemunhos",
    tabJournal: "Diário",
    // photos
    upload: "Carregar fotografias",
    uploading: "A carregar...",
    category: "Categoria",
    captionPt: "Legenda (PT)",
    captionEn: "Legenda (EN)",
    published: "Publicada",
    featured: "Destaque",
    save: "Guardar",
    saving: "A guardar...",
    saved: "Guardado",
    remove: "Remover",
    confirmRemove: "Remover definitivamente?",
    up: "Subir",
    down: "Descer",
    noPhotos: "Ainda não há fotografias nesta categoria. Use o botão acima para carregar.",
    optimised: "Otimizado",
    compressNote:
      "As fotografias são redimensionadas e convertidas para WebP no seu computador antes do envio, para o site carregar depressa. Pode enviar os ficheiros originais da máquina.",
    defaultsNote:
      "Enquanto uma categoria estiver vazia, o site mostra as fotografias que vieram com o tema.",
    // content
    contentIntro:
      "Altere qualquer texto do site. Um campo vazio volta ao texto original.",
    original: "Original",
    reset: "Restaurar original",
    searchKeys: "Procurar texto ou chave...",
    // packages
    addPackage: "Novo pacote",
    session: "Sessão",
    packageName: "Nome",
    price: "Preço (€)",
    featuresPt: "Incluído (PT) — uma linha por item",
    featuresEn: "Incluído (EN) — uma linha por item",
    highlighted: "Destacado",
    order: "Ordem",
    seed: "Repor lista de preços",
    // messages
    unread: "não lidas",
    markRead: "Marcar como lida",
    markUnread: "Marcar como não lida",
    noMessages: "Ainda não recebeu mensagens.",
    phone: "Telefone",
    familyMembers: "Membros da família",
    received: "Recebida",
    preferredDate: "Data preferida",
    consentGiven: "Consentimento RGPD",
    // testimonials
    addTestimonial: "Novo testemunho",
    author: "Cliente",
    quotePt: "Testemunho (PT)",
    quoteEn: "Testemunho (EN)",
    noTestimonials: "Ainda não há testemunhos. Use o botão acima para adicionar.",
    testimonialsIntro:
      "Os testemunhos publicados aparecem no carrossel da página inicial, pela ordem indicada.",
    restoreTestimonials: "Repor testemunhos iniciais",
    none: "Sem sessão",
    // journal
    addPost: "Nova entrada",
    titlePt: "Título (PT)",
    titleEn: "Título (EN)",
    excerptPt: "Resumo (PT)",
    excerptEn: "Resumo (EN)",
    bodyPt: "Texto (PT)",
    bodyEn: "Texto (EN)",
    slug: "Endereço (slug)",
    coverUrl: "Imagem de capa (URL)",
    coverPick: "Escolher das fotografias",
    postDate: "Data",
    draft: "Rascunho",
    noPosts: "Ainda não há entradas no diário. Use o botão acima para escrever a primeira.",
    journalIntro:
      "Cada entrada tem versão PT e EN. Só as publicadas aparecem no site. Separe parágrafos com uma linha vazia.",
    viewPost: "Ver no site",
  },
  en: {
    title: "Content manager",
    subtitle: "9 Meses Fotografia",
    signOut: "Sign out",
    viewSite: "View site",
    login: "Sign in",
    loginTitle: "Private area",
    setupTitle: "Create the admin account",
    setupHint: "This account is created only once. Keep the password safe.",
    name: "Name",
    email: "Email",
    password: "Password",
    createAccount: "Create account",
    loading: "Loading...",
    invalid: "Wrong email or password.",
    tabPhotos: "Photos",
    tabContent: "Text",
    tabPackages: "Prices",
    tabMessages: "Messages",
    tabTestimonials: "Testimonials",
    tabJournal: "Journal",
    upload: "Upload photos",
    uploading: "Uploading...",
    category: "Category",
    captionPt: "Caption (PT)",
    captionEn: "Caption (EN)",
    published: "Published",
    featured: "Featured",
    save: "Save",
    saving: "Saving...",
    saved: "Saved",
    remove: "Remove",
    confirmRemove: "Remove permanently?",
    up: "Move up",
    down: "Move down",
    noPhotos: "No photos in this category yet. Use the button above to upload.",
    optimised: "Optimised",
    compressNote:
      "Photos are resized and converted to WebP on your computer before uploading, so the site stays fast. You can upload the originals straight from the camera.",
    defaultsNote:
      "While a category is empty, the site shows the photos that shipped with the theme.",
    contentIntro: "Change any text on the site. An empty field falls back to the original.",
    original: "Original",
    reset: "Restore original",
    searchKeys: "Search text or key...",
    addPackage: "New package",
    session: "Session",
    packageName: "Name",
    price: "Price (€)",
    featuresPt: "Included (PT) — one item per line",
    featuresEn: "Included (EN) — one item per line",
    highlighted: "Highlighted",
    order: "Order",
    seed: "Restore price list",
    unread: "unread",
    markRead: "Mark as read",
    markUnread: "Mark as unread",
    noMessages: "No messages received yet.",
    phone: "Phone",
    familyMembers: "Family members",
    received: "Received",
    preferredDate: "Preferred date",
    consentGiven: "GDPR consent",
    addTestimonial: "New testimonial",
    author: "Client",
    quotePt: "Testimonial (PT)",
    quoteEn: "Testimonial (EN)",
    noTestimonials: "No testimonials yet. Use the button above to add one.",
    testimonialsIntro:
      "Published testimonials appear in the home page carousel, in the order set here.",
    restoreTestimonials: "Restore the original testimonials",
    none: "No session",
    addPost: "New entry",
    titlePt: "Title (PT)",
    titleEn: "Title (EN)",
    excerptPt: "Excerpt (PT)",
    excerptEn: "Excerpt (EN)",
    bodyPt: "Body (PT)",
    bodyEn: "Body (EN)",
    slug: "Address (slug)",
    coverUrl: "Cover image (URL)",
    coverPick: "Pick from photos",
    postDate: "Date",
    draft: "Draft",
    noPosts: "No journal entries yet. Use the button above to write the first one.",
    journalIntro:
      "Each entry has a PT and an EN version. Only published entries appear on the site. Separate paragraphs with a blank line.",
    viewPost: "View on site",
  },
} as const;

export type AdminCopy = typeof ADMIN_COPY.pt;

export function useAdminCopy(): AdminCopy {
  const { language } = useLanguage();
  return ADMIN_COPY[language];
}

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-border/70 bg-card border p-5 md:p-6", className)}>{children}</div>
  );
}

export function AdminLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="uppercase-spaced text-muted-foreground mb-2 block">{children}</span>
  );
}

export function AdminButton({
  children,
  variant = "outline",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "outline" | "solid" | "ghost" }) {
  return (
    <button
      {...props}
      className={cn(
        variant === "solid" && "btn-solid",
        variant === "outline" && "btn-outline",
        variant === "ghost" &&
          "text-muted-foreground hover:text-destructive text-[11px] tracking-[0.15em] uppercase transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}
