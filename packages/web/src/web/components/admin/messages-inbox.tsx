import { cn } from "@/lib/utils";
import { Mail, MailOpen, Phone, Trash2 } from "lucide-react";
import {
  useDeleteMessage,
  useMarkMessageRead,
  useMessages,
  useUnreadCount,
} from "../../queries/messages";
import { AdminButton, AdminCard, useAdminCopy } from "./admin-ui";

const SESSION_LABELS: Record<string, { pt: string; en: string }> = {
  maternity: { pt: "Maternidade", en: "Maternity" },
  newborn: { pt: "Newborn", en: "Newborn" },
  baby: { pt: "Bebé", en: "Baby" },
  family: { pt: "Família", en: "Family" },
  smash: { pt: "Smash the Cake", en: "Smash the Cake" },
};

export function MessagesInbox({ language }: { language: "pt" | "en" }) {
  const copy = useAdminCopy();
  const query = useMessages();
  const unread = useUnreadCount();
  const markRead = useMarkMessageRead();
  const deleteMessage = useDeleteMessage();

  const rows = query.data ?? [];

  return (
    <div className="space-y-6">
      <p className="uppercase-spaced text-muted-foreground">
        {rows.length} · {unread.data ?? 0} {copy.unread}
      </p>

      {query.isLoading ? (
        <p className="text-muted-foreground text-sm">{copy.loading}</p>
      ) : rows.length === 0 ? (
        <AdminCard>
          <p className="text-muted-foreground text-sm">{copy.noMessages}</p>
        </AdminCard>
      ) : (
        <div className="space-y-4">
          {rows.map((row) => {
            const session = row.sessionType ? SESSION_LABELS[row.sessionType] : null;
            return (
              <AdminCard
                key={row.id}
                className={cn(!row.read && "border-primary/50 bg-primary/[0.03]")}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="display-serif text-lg font-light">{row.name}</p>
                    <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs">
                      <a
                        href={`mailto:${row.email}`}
                        className="hover:text-primary inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="size-3.5" />
                        {row.email}
                      </a>
                      {row.phone && (
                        <a
                          href={`tel:${row.phone}`}
                          className="hover:text-primary inline-flex items-center gap-1.5 transition-colors"
                        >
                          <Phone className="size-3.5" />
                          {row.phone}
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {new Date(row.createdAt).toLocaleString(language === "pt" ? "pt-PT" : "en-GB")}
                  </p>
                </div>

                {(session || row.familyMembers || row.preferredDate || row.consent) && (
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                    {session && (
                      <span className="uppercase-spaced text-primary">
                        {language === "pt" ? session.pt : session.en}
                      </span>
                    )}
                    {row.preferredDate && (
                      <span className="text-muted-foreground">
                        {copy.preferredDate}:{" "}
                        {new Date(row.preferredDate).toLocaleDateString(
                          language === "pt" ? "pt-PT" : "en-GB",
                        )}
                      </span>
                    )}
                    {row.familyMembers && (
                      <span className="text-muted-foreground">
                        {copy.familyMembers}: {row.familyMembers}
                      </span>
                    )}
                    {row.consent && (
                      <span className="text-muted-foreground">{copy.consentGiven}: ✓</span>
                    )}
                  </div>
                )}

                <p className="mt-5 text-sm leading-relaxed whitespace-pre-wrap">{row.message}</p>

                <div className="border-border/60 mt-5 flex flex-wrap items-center gap-4 border-t pt-4">
                  <AdminButton
                    variant="ghost"
                    onClick={() => markRead.mutate({ id: row.id, read: !row.read })}
                    className="inline-flex items-center gap-1.5 hover:!text-foreground"
                  >
                    {row.read ? <Mail className="size-3.5" /> : <MailOpen className="size-3.5" />}
                    {row.read ? copy.markUnread : copy.markRead}
                  </AdminButton>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(copy.confirmRemove)) deleteMessage.mutate({ id: row.id });
                    }}
                    className="text-muted-foreground hover:text-destructive ml-auto flex items-center gap-1.5 text-xs transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                    {copy.remove}
                  </button>
                </div>
              </AdminCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
