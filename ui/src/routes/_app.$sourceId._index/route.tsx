import { ArchiveWorkspace } from "@/components/archive-workspace";

import type { Route } from "./+types/route";
export { loader } from "./loader.server";

export default function SourceThreads({ loaderData }: Route.ComponentProps) {
  return (
    <ArchiveWorkspace
      source={loaderData.source}
      threads={loaderData.threads}
      activeId={loaderData.activeId}
      query={loaderData.q}
    />
  );
}
