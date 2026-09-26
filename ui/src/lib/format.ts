/**
 * Formatting helpers for the archive UI.
 *
 * The prototype ships with fixed local mock data, so "now" is pinned to a
 * stable reference date. This keeps day-group labels deterministic between the
 * server render and the client hydration.
 */
export const REFERENCE_NOW = new Date("2026-09-23T17:30:00");

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function parse(iso: string) {
  return new Date(iso);
}

/**
 * Label used for the chronological group headers ("Today", "Yesterday", …).
 */
export function formatDayLabel(iso: string): string {
  const date = parse(iso);
  const daysAgo = Math.round(
    (startOfDay(REFERENCE_NOW) - startOfDay(date)) / 86_400_000,
  );

  if (daysAgo <= 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo < 7) {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/** Stable key for grouping entries by calendar day. */
export function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

export function formatTime(iso: string): string {
  return parse(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatShortDate(iso: string): string {
  return parse(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatFullDate(iso: string): string {
  return parse(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Long, unambiguous date for reader headers and chat day separators. */
export function formatLongDate(iso: string): string {
  return parse(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const rounded = value >= 10 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} ${units[unitIndex]}`;
}

export interface DayGroup<T> {
  key: string;
  label: string;
  items: T[];
}

/**
 * Groups already-sorted entries into stable chronological buckets.
 */
export function groupByDay<T extends { date: string }>(items: T[]): DayGroup<T>[] {
  const groups: DayGroup<T>[] = [];

  for (const item of items) {
    const key = dayKey(item.date);
    const current = groups.at(-1);
    if (current && current.key === key) {
      current.items.push(item);
    } else {
      groups.push({ key, label: formatDayLabel(item.date), items: [item] });
    }
  }

  return groups;
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
