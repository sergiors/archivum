import { useEffect, useMemo, useRef, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Command as CommandPrimitive } from "cmdk";

import { PersonAvatar } from "@/components/person-avatar";
import { AttachmentIcon } from "@/components/file-icon";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { Source } from "@/lib/data";
import { searchSource, type SearchResult } from "@/lib/search";

/**
 * Spotlight-style archive search for a single source. cmdk owns keyboard
 * navigation (arrows, Enter, Escape); results come from the mock search
 * service and navigate through the existing workspace routes on select.
 *
 * ⌘K / Ctrl+K opens the dialog, or refocuses the field when it is already open.
 */
export function ArchiveSearchDialog({
  source,
  open,
  onOpenChange,
}: {
  source: Source;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const groups = useMemo(() => searchSource(source, query), [source, query]);
  const trimmed = query.trim();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        if (!open) {
          onOpenChange(true);
        } else {
          inputRef.current?.focus();
          inputRef.current?.select();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }
    setQuery("");
  }, [open]);

  const openResult = (result: SearchResult) => {
    onOpenChange(false);
    navigate(result.targetPath);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search archive"
      description="Search messages, people and files in the selected source."
      className="sm:max-w-[680px]"
    >
      <Command shouldFilter={false} className="rounded-2xl bg-popover">
        <div className="flex h-14 items-center gap-3 border-b border-border/70 px-4">
          <SearchIcon
            className="size-4.5 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <CommandPrimitive.Input
            ref={inputRef}
            data-slot="command-input"
            value={query}
            onValueChange={setQuery}
            placeholder="Search messages, people, files…"
            aria-label="Search messages, people, files"
            autoComplete="off"
            className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd
            aria-hidden
            className="hidden shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10.5px] font-medium text-muted-foreground sm:block"
          >
            esc
          </kbd>
        </div>

        <CommandList className="max-h-[60vh] min-h-16 px-1 pb-2">
          {trimmed.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Start typing to search this source.
            </p>
          ) : groups.length === 0 ? (
            <CommandEmpty className="px-3 py-6 text-sm text-muted-foreground">
              No results for &ldquo;{trimmed}&rdquo;
            </CommandEmpty>
          ) : (
            groups.map((group) => (
              <CommandGroup
                key={group.id}
                heading={group.label}
                className="**:[[cmdk-group-heading]]:text-[10.5px] **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:tracking-[0.08em] **:[[cmdk-group-heading]]:uppercase"
              >
                {group.results.map((result) => (
                  <SearchResultRow
                    key={result.id}
                    result={result}
                    query={trimmed}
                    onSelect={() => openResult(result)}
                  />
                ))}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

function SearchResultRow({
  result,
  query,
  onSelect,
}: {
  result: SearchResult;
  query: string;
  onSelect: () => void;
}) {
  const isFile = result.type === "attachment";

  return (
    <CommandItem
      value={result.id}
      onSelect={onSelect}
      hideCheck
      className="items-start gap-2.5 py-2.5 data-selected:bg-accent"
    >
      {isFile ? (
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
          <AttachmentIcon kind="other" className="size-3.5" />
        </span>
      ) : (
        <PersonAvatar
          name={result.title}
          className="mt-0.5 size-7 text-[10px]"
        />
      )}

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-2">
          <span className="truncate text-[13px] font-semibold text-foreground">
            <Highlight text={result.title} query={query} />
          </span>
          {result.subtitle && !isFile && (
            <span className="ml-auto shrink-0 max-w-[45%] truncate text-[11px] text-muted-foreground">
              {result.subtitle}
            </span>
          )}
        </span>
        {result.subtitle && isFile && (
          <span className="mt-0.5 block truncate font-mono text-[11px] text-muted-foreground">
            {result.subtitle}
          </span>
        )}
        {result.snippet && (
          <span className="mt-0.5 line-clamp-2 block text-[12px] leading-4.5 text-muted-foreground">
            <Highlight text={result.snippet} query={query} />
          </span>
        )}
      </span>
    </CommandItem>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  const needle = query.trim().toLowerCase();
  if (!needle) return <>{text}</>;

  const index = text.toLowerCase().indexOf(needle);
  if (index < 0) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-[2px] bg-accent px-px text-accent-foreground">
        {text.slice(index, index + needle.length)}
      </mark>
      {text.slice(index + needle.length)}
    </>
  );
}
