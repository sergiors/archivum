import type { Route } from "./+types/route";

import { filterThreads, getSource, threadsForSource } from "@/lib/data";

/**
 * Threads section for a source: the day-grouped list beside whichever thread
 * the URL selects (`?thread=`), defaulting to the newest capture. The section
 * slug is implied by `source.type` (emails vs conversations) rather than
 * carried as its own path segment. `?q=` from the header search narrows the
 * list inside this source only.
 */
export function loader({ request, params }: Route.LoaderArgs) {
  const source = getSource(params.sourceId);
  if (!source) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Source not found",
    });
  }

  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() ?? "";
  const threads = filterThreads(threadsForSource(source.id), q);
  const threadId = url.searchParams.get("thread");
  const active = threads.find((thread) => thread.id === threadId) ?? threads[0];

  return { source, threads, activeId: active?.id, q };
}
