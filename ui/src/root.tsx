import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { TooltipProvider } from "@/components/ui/tooltip";
import type { Route } from "./+types/root";
import "./styles/globals.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Archivum" },
    {
      name: "description",
      content: "A quiet, private archive for email, WhatsApp and attachments.",
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground/70">
        {message}
      </p>
      <h1 className="mt-2 text-[15px] font-semibold tracking-tight text-foreground">
        {isRouteErrorResponse(error)
          ? "That page could not be reached"
          : "Something went wrong"}
      </h1>
      <p className="mt-1 text-[12.5px] leading-5 text-muted-foreground">
        {details}
      </p>
      {stack && (
        <pre className="mt-4 max-h-64 overflow-auto rounded-md border border-border bg-muted p-3 text-[11px] leading-4 text-muted-foreground">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
