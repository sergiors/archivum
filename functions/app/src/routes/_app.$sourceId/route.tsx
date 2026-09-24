import { Outlet } from "react-router";

import { WorkspaceHeader } from "@/components/workspace-header";
import { getSource } from "@/lib/data";
import type { Route } from "./+types/route";

/**
 * Source workspace shell. Every archive URL is scoped by `:sourceId`, so this
 * route validates the param once, states which source is open in the header,
 * and lets each section (`_index`, `attachments`) own the pane below.
 *
 * An unknown id 404s through the root error boundary — there is no fallback
 * workspace outside a named source.
 */
export function loader({ params }: Route.LoaderArgs) {
  const source = getSource(params.sourceId);
  if (!source) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Source not found",
    });
  }
  return { source };
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: `${loaderData.source.label} · Archivum` }];
}

export default function SourceLayout({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <WorkspaceHeader source={loaderData.source} />
      <div className="min-h-0 flex-1 overflow-hidden">
        <Outlet />
      </div>
    </>
  );
}
