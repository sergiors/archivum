import { redirect } from "react-router";

import { DEFAULT_SOURCE_ID } from "@/lib/data";

/**
 * Archive root. There is no mixed feed: every URL names the source that scopes
 * the workspace, so `/` hands off to the default source rather than rendering
 * a second copy of it.
 */
export function loader() {
  return redirect(`/${DEFAULT_SOURCE_ID}`);
}
