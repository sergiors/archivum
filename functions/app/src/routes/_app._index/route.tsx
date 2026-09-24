import { DEFAULT_SOURCE_ID, SOURCES } from "@/lib/data";
import { ArchiveWorkspace } from "@/components/archive-workspace";

/**
 * Archive root. There is no mixed feed: the archive opens into one workspace.
 * This build always shows the default source and its newest thread, so the
 * screen is presentational and reads only from the local mock archive.
 */
export default function ArchiveIndex() {
  return <ArchiveWorkspace source={SOURCES[DEFAULT_SOURCE_ID]} />;
}
