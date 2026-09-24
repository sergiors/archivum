import { cn } from "@/lib/cn";

/**
 * Sticky chronological divider used by any list that groups entries by day.
 * The label is a stable calendar bucket ("Today", "Yesterday", weekday…).
 * `className` lets each list match the surface it sits on.
 */
export function DayDivider({
  label,
  count,
  className,
}: {
  label: string;
  count: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 flex items-baseline justify-between border-b border-border bg-background/90 px-4 py-1.5 backdrop-blur supports-[backdrop-filter]:bg-background/75 lg:px-6",
        className,
      )}
    >
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </h2>
      <span className="font-mono text-[10.5px] tabular-nums text-muted-foreground/70">
        {count}
      </span>
    </div>
  );
}
