import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

/**
 * File-system routing.
 *
 * Route modules live in `app/routes`, using the Remix v2 flat-route naming
 * convention (`.`, `_layout`, `_index`, `$param`).
 */
export default flatRoutes() satisfies RouteConfig;
