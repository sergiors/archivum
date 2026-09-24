import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import { initialsOf } from "@/lib/format";

/**
 * People in the archive have no portrait, so this is always the shadcn Avatar
 * rendering its fallback initials. Kept as one thin wrapper so every list and
 * reader shows the same calm, neutral mark.
 */
export function PersonAvatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <Avatar className={cn("size-8", className)}>
      <AvatarFallback className="text-xs font-semibold tracking-wide">
        {initialsOf(name)}
      </AvatarFallback>
    </Avatar>
  );
}
