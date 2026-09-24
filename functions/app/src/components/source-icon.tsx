import { Mail, MessageCircle } from "lucide-react";

import { cn } from "@/lib/cn";
import type { SourceType } from "@/lib/data";

interface TypeIconProps {
  type: SourceType;
  className?: string;
}

/**
 * Mark for a source type. WhatsApp carries the archive's single identity tint;
 * email stays neutral, since colour is reserved for selection and chat
 * identity rather than decorating every mailbox.
 */
export function SourceTypeIcon({ type, className }: TypeIconProps) {
  if (type === "whatsapp") {
    return (
      <MessageCircle
        className={cn("text-primary", className)}
        aria-hidden
      />
    );
  }
  return <Mail className={cn("text-muted-foreground", className)} aria-hidden />;
}
