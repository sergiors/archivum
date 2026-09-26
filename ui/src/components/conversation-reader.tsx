import { PersonAvatar } from "@/components/person-avatar";
import { ReaderAttachment } from "@/components/reader-attachment";
import { DayDivider } from "@/components/day-list";
import type { ChatEntry, Conversation } from "@/lib/data";
import { getAttachment, getSource } from "@/lib/data";
import { formatLongDate, formatTime, groupByDay } from "@/lib/format";
import { cn } from "@/lib/cn";

function EntryAttachments({ entry }: { entry: ChatEntry }) {
  const attachments = entry.attachmentIds
    .map((id) => getAttachment(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (attachments.length === 0) return null;

  return (
    <ul className="mt-2 space-y-1.5">
      {attachments.map((attachment) => (
        <ReaderAttachment key={attachment.id} attachment={attachment} />
      ))}
    </ul>
  );
}

function ChatEntryLine({ entry }: { entry: ChatEntry }) {
  if (entry.kind === "system") {
    return (
      <li className="flex justify-center py-1">
        <p className="max-w-md rounded-lg bg-muted px-3 py-1.5 text-center text-[11px] leading-4 text-muted-foreground">
          {entry.text.join(" ")}
        </p>
      </li>
    );
  }

  const outgoing = entry.direction === "outgoing";

  return (
    <li
      className={cn(
        "flex gap-2.5",
        outgoing ? "flex-row-reverse pl-10" : "pr-10",
      )}
    >
      <PersonAvatar name={entry.author} className="mt-0.5 size-7 shrink-0" />
      <div className={cn("min-w-0", outgoing && "text-right")}>
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
          <span className="font-medium text-foreground">{entry.author}</span>
          <time
            dateTime={entry.date}
            className="font-mono tabular-nums"
          >
            {formatTime(entry.date)}
          </time>
        </p>
        <div
          className={cn(
            "mt-1 rounded-lg border border-border bg-card px-3 py-2 text-left",
            outgoing && "bg-accent",
          )}
        >
          <div className="space-y-1.5 text-[13px] leading-6 text-foreground">
            {entry.text.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <EntryAttachments entry={entry} />
        </div>
      </div>
    </li>
  );
}

/**
 * Read-only archived WhatsApp conversation. Entries are preserved oldest
 * first under sticky day dividers, so the record reads as the chat actually
 * unfolded. There are no reply or reaction controls — only the export.
 */
export function ConversationReader({ thread }: { thread: Conversation }) {
  const source = getSource(thread.source)!;
  const groups = groupByDay(thread.entries);

  return (
    <div className="flex h-full flex-col">
      <header className="shrink-0 border-b border-border px-6 pb-4 pt-5 lg:px-8">
        <h2 className="text-[16px] font-semibold leading-6 tracking-tight text-foreground">
          {thread.contact.name}
        </h2>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
          <span>{source.label}</span>
          <span aria-hidden className="text-border">
            ·
          </span>
          <span>
            {thread.isGroup
              ? `${thread.participants.length} participants`
              : thread.participants.join(", ")}
          </span>
          <span aria-hidden className="text-border">
            ·
          </span>
          <span>Exported from {source.provider}</span>
        </p>
        {thread.labels.length > 0 && (
          <ul aria-label="Labels" className="mt-2.5 flex flex-wrap gap-1.5">
            {thread.labels.map((label) => (
              <li
                key={label}
                className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground"
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-6 px-6 py-6 lg:px-8">
          <p className="text-center text-[11px] text-muted-foreground">
            {formatLongDate(thread.date)}
            <span aria-hidden className="mx-1.5 text-border">
              ·
            </span>
            {thread.entries.length}{" "}
            {thread.entries.length === 1 ? "entry" : "entries"}
          </p>

          {groups.map((group) => (
            <section key={group.key}>
              <DayDivider
                label={group.label}
                count={group.items.length}
                className="sticky top-0 z-10 rounded-md border border-border bg-background/95 px-3 py-1 backdrop-blur"
              />
              <ul className="mt-3 space-y-3">
                {group.items.map((entry) => (
                  <ChatEntryLine key={entry.id} entry={entry} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}


