import { Link } from "react-router";

import { AttachmentIcon } from "@/components/file-icon";
import { cn } from "@/lib/cn";
import { ATTACHMENT_KIND_LABEL, type Attachment } from "@/lib/data";
import { formatFileSize } from "@/lib/format";

/**
 * Attachment entry shown inside a reader. The archive can describe a file but
 * cannot open or download it, so this is a record; the link is presentational
 * and leads back to the representative workspace.
 */
export function ReaderAttachment({
  attachment,
  className,
}: {
  attachment: Attachment;
  className?: string;
}) {
  return (
    <li>
      <Link
        to="/"
        aria-label={`${attachment.name}, ${ATTACHMENT_KIND_LABEL[attachment.kind]}, ${formatFileSize(attachment.size)}`}
        className={cn(
          "flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 transition-colors hover:bg-accent focus-visible:bg-accent",
          className,
        )}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
          <AttachmentIcon kind={attachment.kind} className="size-3.5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12px] font-medium text-foreground">
            {attachment.name}
          </span>
          <span className="mt-0.5 block text-[10.5px] text-muted-foreground">
            {ATTACHMENT_KIND_LABEL[attachment.kind]} ·{" "}
            {formatFileSize(attachment.size)}
          </span>
        </span>
      </Link>
    </li>
  );
}
