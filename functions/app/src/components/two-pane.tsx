import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Two-pane archive layout: a list column on the left and a reader pane on the
 * right, separated by a hairline. On narrow viewports the list stacks above the
 * reader and keeps a modest fixed height so the reader stays reachable.
 */
export function TwoPane({
  list,
  detail,
  listLabel,
  className,
}: {
  list: ReactNode;
  detail: ReactNode;
  listLabel: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid h-full min-h-0 grid-cols-1 grid-rows-[minmax(12rem,40vh)_minmax(0,1fr)] lg:grid-cols-[23rem_minmax(0,1fr)] lg:grid-rows-1",
        className,
      )}
    >
      <section
        aria-label={listLabel}
        className="flex min-h-0 flex-col overflow-y-auto border-b border-border bg-card lg:border-b-0 lg:border-r"
      >
        {list}
      </section>
      <section
        aria-label="Reader"
        className="min-h-0 overflow-hidden bg-background"
      >
        {detail}
      </section>
    </div>
  );
}
