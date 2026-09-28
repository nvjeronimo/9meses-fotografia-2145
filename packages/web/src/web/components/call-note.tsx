import { cn } from "@/lib/utils";
import { CONTACT } from "../lib/site";
import { useLanguage } from "./language-provider";

/**
 * Call-price notice required next to every phone number on the website
 * (Decreto-Lei 59/2021, as amended by Lei 14/2023): numbers starting with 9
 * are "Chamada para a rede móvel nacional", landlines "…rede fixa nacional".
 */
export function CallNote({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <span className={cn("text-muted-foreground block text-xs normal-case tracking-normal", className)}>
      {t(CONTACT.phoneNetwork === "mobile" ? "contact.callNote.mobile" : "contact.callNote.fixed")}
    </span>
  );
}
