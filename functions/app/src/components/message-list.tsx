import { Paperclip } from "lucide-react";

import { PersonAvatar } from "@/components/person-avatar";
import { DayDivider } from "@/components/day-list";
import { cn } from "@/lib/cn";
import { attachmentCount, threadSender, threadTitle, type Thread } from "@/lib/data";
import { formatShortDate, groupByDay } from "@/lib/format";

/**
 * The master column of a message workspace: one row per thread, newest first,
 * grouped by day. Rows are records, not controls — there is no selection
 * behaviour, so the representative thread is marked with `data-active` and an
 * `sr-only` note rather than a link or button.
 */
export function MessageList({
  threads,
  activeId,
}: {
  threads: Thread[];
  activeId: string;
}) {
  const groups = groupByDay(threads);

  return (
    <div>
      {groups.map((group) => (
        <div key={group.key}>
          <DayDivider
            label={group.label}
            count={group.items.length}
            className="bg-card/90 supports-[backdrop-filter]:bg-card/75"
          />
          <ul>
            {group.items.map((thread) => (
              <li key={thread.id}>
                <MessageListRow thread={thread} active={thread.id === activeId} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function MessageListRow({ thread, active }: { thread: Thread; active: boolean }) {
  const isWhatsApp = thread.type === "whatsapp";
  const sender = threadSender(thread);
  const files = attachmentCount(thread);
  const replyCount = thread.type === "email" ? thread.messages.length : 0;

  return (
    <div
      data-active={active || undefined}
      className={cn(
        "flex gap-3 border-b border-border px-4 py-3",
        active ? "bg-accent" : "bg-card",
      )}
    >
      <PersonAvatar name={sender.name} className="mt-0.5" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="truncate text-[12.5px] font-semibold text-foreground">
            {active && <span className="sr-only">Currently reading: </span>}
            {threadTitle(thread)}
          </span>
          <time
            dateTime={thread.date}
            className="ml-auto shrink-0 font-mono text-[10.5px] tabular-nums text-muted-foreground"
          >
            {formatShortDate(thread.date)}
          </time>
        </div>

        <p className="mt-1 line-clamp-2 text-[11.5px] leading-4.5 text-muted-foreground">
          {thread.preview}
        </p>

        {(replyCount > 1 || files > 0 || (isWhatsApp && thread.isGroup)) && (
          <div className="mt-1.5 flex items-center gap-3 text-[10.5px] text-muted-foreground">
            {isWhatsApp && thread.isGroup && (
              <span>{thread.participants.length} participants</span>
            )}
            {replyCount > 1 && <span>{replyCount} messages</span>}
            {files > 0 && (
              <span className="inline-flex items-center gap-0.5">
                <Paperclip className="size-3" aria-hidden />
                {files}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
