import { Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

/**
 * Persistent archive shell. The source sidebar is the only chrome above the
 * workspace; each workspace owns its header and two-pane content.
 *
 * `SidebarProvider` carries the standard shadcn sidebar context (desktop
 * collapse, mobile sheet), and `SidebarInset` is the content region beside it.
 */
export default function AppLayout() {
  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <AppSidebar />
      <SidebarInset className="min-h-0 overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
