import { ChevronDown, Paperclip } from "lucide-react";

import { PersonAvatar } from "@/components/person-avatar";
import { ReaderAttachment } from "@/components/reader-attachment";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { EmailMessage, EmailThread } from "@/lib/data";
import { getAttachment, SOURCES } from "@/lib/data";
import { formatLongDate, formatTime } from "@/lib/format";

function EmailBody({ message }: { message: EmailMessage }) {
  const attachments = message.attachmentIds
    .map((id) => getAttachment(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <div className="space-y-3.5 text-[13.5px] leading-7 text-foreground">
        {message.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {attachments.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            <Paperclip className="size-3" aria-hidden />
            {attachments.length}{" "}
            {attachments.length === 1 ? "attachment" : "attachments"}
          </p>
          <ul className="space-y-1.5">
            {attachments.map((attachment) => (
              <ReaderAttachment key={attachment.id} attachment={attachment} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function MessageHeader({ message }: { message: EmailMessage }) {
  return (
    <div className="flex items-start gap-3">
      <PersonAvatar name={message.from.name} className="mt-0.5" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-[12.5px] font-semibold text-foreground">
            {message.from.name}
          </span>
          <span className="text-[11px] text-muted-foreground">
            &lt;{message.from.handle}&gt;
          </span>
        </div>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
          To {message.to.join(", ")}
        </p>
      </div>
      <time
        dateTime={message.date}
        className="shrink-0 whitespace-nowrap pt-0.5 text-right text-[10.5px] leading-4 text-muted-foreground"
      >
        {formatLongDate(message.date)}
        <br />
        <span className="font-mono tabular-nums">{formatTime(message.date)}</span>
      </time>
    </div>
  );
}

/**
 * Read-only archived email thread. The newest message is open; earlier replies
 * are preserved below it as a collapsible section, in the order they were sent.
 * There are no reply, forward or action controls — only the record itself.
 */
export function EmailReader({ thread }: { thread: EmailThread }) {
  const source = SOURCES[thread.source];
  const latestIndex = thread.messages.length - 1;
  const latest = thread.messages[latestIndex];
  const earlier = thread.messages.slice(0, latestIndex);

  if (!latest) return null;

  return (
    <div className="flex h-full flex-col">
      <header className="shrink-0 border-b border-border px-6 pb-4 pt-5 lg:px-8">
        <h2 className="text-[16px] font-semibold leading-6 tracking-tight text-foreground">
          {thread.subject}
        </h2>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
          <span>{source.label}</span>
          <span aria-hidden className="text-border">
            ·
          </span>
          <span>
            {thread.messages.length}{" "}
            {thread.messages.length === 1 ? "message" : "messages"}
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
        <div className="mx-auto max-w-3xl px-6 py-6 lg:px-8">
          <article>
            <MessageHeader message={latest} />
            <div className="mt-4 border-t border-border pt-4">
              <EmailBody message={latest} />
            </div>
          </article>

          {earlier.length > 0 && (
            <Collapsible className="mt-6 border-t border-border pt-4">
              <CollapsibleTrigger className="group flex items-center gap-2 rounded-md text-[12px] font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40">
                <ChevronDown
                  className="size-4 shrink-0 transition-transform group-data-panel-open:rotate-180"
                  aria-hidden
                />
                <span className="group-data-panel-open:hidden">
                  Show {earlier.length} earlier{" "}
                  {earlier.length === 1 ? "message" : "messages"}
                </span>
                <span className="hidden group-data-panel-open:inline">
                  Hide earlier messages
                </span>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <ol className="mt-4 space-y-6">
                  {earlier
                    .slice()
                    .reverse()
                    .map((message) => (
                      <li key={message.id} className="border-t border-border pt-5">
                        <MessageHeader message={message} />
                        <div className="mt-4">
                          <EmailBody message={message} />
                        </div>
                      </li>
                    ))}
                </ol>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </div>
    </div>
  );
}
