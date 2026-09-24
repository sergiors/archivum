import {
  File,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  Presentation,
} from "lucide-react";

import { cn } from "@/lib/cn";
import type { AttachmentKind } from "@/lib/data";

export function AttachmentIcon({
  kind,
  className,
}: {
  kind: AttachmentKind;
  className?: string;
}) {
  const Icon =
    kind === "pdf" || kind === "document"
      ? FileText
      : kind === "image"
        ? FileImage
        : kind === "spreadsheet"
          ? FileSpreadsheet
          : kind === "deck"
            ? Presentation
            : kind === "archive"
              ? FileArchive
              : File;

  return <Icon className={cn("text-muted-foreground", className)} aria-hidden />;
}
