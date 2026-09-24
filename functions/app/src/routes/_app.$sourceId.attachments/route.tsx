import { Paperclip } from "lucide-react";
import { Link, useSearchParams } from "react-router";

import { AttachmentIcon } from "@/components/file-icon";
import { PersonAvatar } from "@/components/person-avatar";
import { DayDivider } from "@/components/day-list";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  ATTACHMENT_KIND_LABEL,
  attachmentsForSource,
  filterAttachments,
  getSource,
} from "@/lib/data";
import { formatFileSize, formatShortDate, groupByDay } from "@/lib/format";
import type { Route } from "./+types/route";

/**
 * Attachments section for a source: every captured file, newest first,
 * grouped by day. The archive cannot open files, so each row links back to
 * the thread the file arrived in — retrieval stays inside the source.
 * `?q=` from the header search narrows the list inside this source only.
 */
export function loader({ request, params }: Route.LoaderArgs) {
  const source = getSource(params.sourceId);
  if (!source) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Source not found",
    });
  }

  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() ?? "";
  const attachments = filterAttachments(attachmentsForSource(source.id), q);

  return { source, attachments, q };
}

export default function SourceAttachments({ loaderData }: Route.ComponentProps) {
  const { source, attachments, q } = loaderData;
  const [searchParams] = useSearchParams();
  const groups = groupByDay(attachments);
  const threadHref = (threadId: string) => {
    const next = new URLSearchParams(searchParams);
    next.set("thread", threadId);
    return `/${source.id}?${next.toString()}`;
  };

  if (attachments.length === 0) {
    return (
      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Paperclip />
            </EmptyMedia>
            <EmptyTitle>
              {q ? "No matching attachments" : "No attachments captured"}
            </EmptyTitle>
            <EmptyDescription>
              {q ? (
                <>
                  Nothing in {source.label} matches &ldquo;{q}&rdquo;.
                </>
              ) : (
                <>This source&rsquo;s backup completed without any files.</>
              )}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <ul>
        {groups.map((group) => (
          <li key={group.key}>
            <DayDivider label={group.label} count={group.items.length} />
            <ul>
              {group.items.map((attachment) => (
                <li key={attachment.id}>
                  <Link
                    to={threadHref(attachment.threadId)}
                    className="flex gap-3 border-b border-border bg-card px-4 py-3 transition-colors hover:bg-accent focus-visible:bg-accent lg:px-6"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
                      <AttachmentIcon
                        kind={attachment.kind}
                        className="size-3.5"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="truncate text-[12.5px] font-semibold text-foreground">
                          {attachment.name}
                        </span>
                        <time
                          dateTime={attachment.date}
                          className="ml-auto shrink-0 font-mono text-[10.5px] tabular-nums text-muted-foreground"
                        >
                          {formatShortDate(attachment.date)}
                        </time>
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <PersonAvatar
                          name={attachment.from.name}
                          className="size-4 text-[8px]"
                        />
                        <span className="truncate">
                          {attachment.from.name} · {attachment.origin}
                        </span>
                      </span>
                      <span className="mt-1 line-clamp-2 block text-[11.5px] leading-4.5 text-muted-foreground">
                        {attachment.summary}
                      </span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-2 text-[10.5px] text-muted-foreground">
                        <span className="font-mono tabular-nums">
                          {ATTACHMENT_KIND_LABEL[attachment.kind]} ·{" "}
                          {formatFileSize(attachment.size)}
                        </span>
                        {attachment.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-muted px-1.5 py-0.5 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
