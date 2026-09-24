import { useState } from "react";
import { Search } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router";

import { ArchiveSearchDialog } from "@/components/archive-search-dialog";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  countAttachmentsForSource,
  countThreadsForSource,
  type Source,
} from "@/lib/data";
import { cn } from "@/lib/cn";

interface Section {
  slug: "threads" | "attachments";
  label: string;
  count: number;
  to: string;
  active: boolean;
}

/**
 * Workspace header: section navigation for the open source plus a compact
 * Search action that opens the archive search modal. Source identity lives
 * only in the sidebar, so this bar stays visually stable when switching
 * between email and WhatsApp accounts.
 *
 * The nav sits in a fixed-width region so “Emails” vs “Conversations” never
 * moves the Search trigger. ⌘K / Ctrl+K is handled by the search dialog.
 * Search is scoped to this source.
 */
export function WorkspaceHeader({ source }: { source: Source }) {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const base = `/${source.id}`;
  const isEmail = source.type === "email";
  const isThreads =
    pathname === base || pathname === `${base}/` || pathname === `${base}`;
  const isAttachments = pathname.startsWith(`${base}/attachments`);
  const [searchOpen, setSearchOpen] = useState(false);

  const sectionTo = (to: string) => {
    if (!q) return to;
    return `${to}?${new URLSearchParams({ q }).toString()}`;
  };

  const sections: Section[] = [
    {
      slug: "threads",
      label: isEmail ? "Emails" : "Conversations",
      count: countThreadsForSource(source.id),
      to: sectionTo(base),
      active: isThreads,
    },
    {
      slug: "attachments",
      label: "Attachments",
      count: countAttachmentsForSource(source.id),
      to: sectionTo(`${base}/attachments`),
      active: isAttachments,
    },
  ];

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-3 lg:gap-5 lg:px-4">
      <SidebarTrigger className="md:hidden" />

      <nav
        aria-label={`${source.label} sections`}
        className="flex w-60 shrink-0 items-center gap-0.5 lg:w-64"
      >
        {sections.map((section) => (
          <Link
            key={section.slug}
            to={section.to}
            aria-current={section.active ? "page" : undefined}
            className={cn(
              "flex min-w-0 shrink items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12.5px] font-medium transition-colors hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
              section.active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground",
            )}
          >
            <span className="truncate">
              {section.active && (
                <span className="sr-only">Current section: </span>
              )}
              {section.label}
            </span>
            <span
              aria-hidden
              className="shrink-0 font-mono text-[10.5px] tabular-nums text-muted-foreground"
            >
              {section.count}
            </span>
          </Link>
        ))}
      </nav>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-haspopup="dialog"
        aria-expanded={searchOpen}
        onClick={() => setSearchOpen(true)}
        className="ml-auto gap-2 rounded-md border border-border/80 bg-muted/40 px-2.5 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <Search className="size-3.5" aria-hidden />
        <span className="hidden sm:inline">Search</span>
        <kbd
          aria-hidden
          className="ml-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10.5px] font-medium text-muted-foreground"
        >
          ⌘K
        </kbd>
      </Button>

      <ArchiveSearchDialog
        source={source}
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />
    </header>
  );
}
