import { CONTACT } from "../lib/site";
import { useLanguage } from "./language-provider";

/**
 * Call-price notice required for phone numbers on the website
 * (Decreto-Lei 59/2021, as amended by Lei 14/2023). Each number carries an
 * asterisk (CallMark) tied to one note in the footer (CallNote), which is on
 * every page: "Chamada para a rede móvel nacional" for numbers starting
 * with 9, "…rede fixa nacional" for landlines.
 */
export const CALL_NOTE_ID = "nota-chamada";

export function CallMark() {
  return <span aria-hidden>*</span>;
}

export function CallNote({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <p id={CALL_NOTE_ID} className={className}>
      *{t(CONTACT.phoneNetwork === "mobile" ? "contact.callNote.mobile" : "contact.callNote.fixed")}
    </p>
  );
}
