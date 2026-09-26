import type { Route } from "./+types/route";

import { attachmentsForSource, filterAttachments, getSource } from "@/lib/data";

/**
 * Attachments section for a source: every captured file, newest first,
 * grouped by day. The archive cannot open files, so each row links back to
 * the thread the file arrived in — retrieval stays inside the source.
 * `?q=` from the header search narrows the list inside this source only.
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
  const attachments = filterAttachments(attachmentsForSource(source.id), q);

  return { source, attachments, q };
}
