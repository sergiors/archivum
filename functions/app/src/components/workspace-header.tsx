import { Mail, MessageCircle, Paperclip, type LucideIcon } from "lucide-react";

import { SourceTypeIcon } from "@/components/source-icon";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  countAttachmentsForSource,
  countThreadsForSource,
  type Source,
} from "@/lib/data";
import { cn } from "@/lib/cn";

interface Section {
  label: string;
  icon: LucideIcon;
  count: number;
  active?: boolean;
}

/**
 * Static workspace header. It states which archive is open and which sections
 * that archive holds, derived from `source.type`. There is no tab switching or
 * search here: this is a presentational shell, so the sections are shown as
 * labels rather than interactive controls.
 */
export function WorkspaceHeader({ source }: { source: Source }) {
  const isEmail = source.type === "email";

  const sections: Section[] = [
    {
      label: isEmail ? "Emails" : "Conversations",
      icon: isEmail ? Mail : MessageCircle,
      count: countThreadsForSource(source.id),
      active: true,
    },
    {
      label: "Attachments",
      icon: Paperclip,
      count: countAttachmentsForSource(source.id),
    },
  ];

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-3 lg:gap-5 lg:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex min-w-0 shrink-0 items-center gap-2">
        <SourceTypeIcon type={source.type} className="size-4 shrink-0" />
        <div className="max-w-32">
          <p className="hidden truncate text-xs text-muted-foreground sm:block">
            {source.account}
          </p>
        </div>
      </div>

      <div
        role="group"
        aria-label={`${source.label} sections`}
        className="flex min-w-0 items-center gap-1 overflow-x-auto"
      >
        {sections.map((section) => (
          <span
            key={section.label}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12.5px] font-medium",
              section.active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground",
            )}
          >
            <section.icon className="size-3.5 shrink-0" aria-hidden />
            {section.active && (
              <span className="sr-only">Current section: </span>
            )}
            {section.label}
            <span className="font-mono text-[10.5px] tabular-nums text-muted-foreground">
              {section.count}
            </span>
          </span>
        ))}
      </div>
    </header>
  );
}
