import { Archive } from "lucide-react";
import { Link } from "react-router";

import { SourceTypeIcon } from "@/components/source-icon";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  DEFAULT_SOURCE_ID,
  SOURCE_LIST,
  countThreadsForSource,
  type Source,
  type SourceType,
} from "@/lib/data";

const GROUPS: { type: SourceType; label: string }[] = [
  { type: "email", label: "Email" },
  { type: "whatsapp", label: "WhatsApp" },
];

/**
 * Static archive sidebar. Sources are grouped by transport so the archive reads
 * as a small set of distinct workspaces rather than one feed. The default
 * source is shown as the current workspace; links exist for semantics only and
 * every one opens the same representative screen.
 */
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2.5 px-2 py-1">
          <span
            aria-hidden
            className="flex size-7 shrink-0 items-center justify-center rounded-md border border-sidebar-border bg-sidebar-accent text-sidebar-primary"
          >
            <Archive className="size-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">
              Archivum
            </p>
          </div>
        </div>
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        {GROUPS.map((group) => {
          const sources = SOURCE_LIST.filter(
            (source) => source.type === group.type,
          );
          if (sources.length === 0) return null;

          return (
            <SidebarGroup key={group.type}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarMenu>
                {sources.map((source) => (
                  <SourceItem
                    key={source.id}
                    source={source}
                    active={source.id === DEFAULT_SOURCE_ID}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}

function SourceItem({ source, active }: { source: Source; active: boolean }) {
  const threads = countThreadsForSource(source.id);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={active}
        tooltip={source.label}
        render={<Link to="/" />}
        className="h-auto py-2 pr-9"
      >
        <SourceTypeIcon
          type={source.type}
          className="mt-0.5 size-4 shrink-0 self-start"
        />
        <span className="min-w-0 flex-1 leading-tight">
          <span className="mt-0.5 block truncate text-xs text-sidebar-foreground/70">
            {source.account}
          </span>
        </span>
      </SidebarMenuButton>
      <SidebarMenuBadge aria-hidden title={`${threads} threads captured`}>
        {threads}
      </SidebarMenuBadge>
    </SidebarMenuItem>
  );
}
