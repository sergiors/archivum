import { Mail } from "lucide-react";

import { EmailReader } from "@/components/email-reader";
import { MessageList } from "@/components/message-list";
import { TwoPane } from "@/components/two-pane";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { WorkspaceHeader } from "@/components/workspace-header";
import { emailThreadsForSource, type Source } from "@/lib/data";

/**
 * The representative archive screen: one source workspace showing its threads
 * beside the captured email that is currently open.
 *
 * It is entirely presentational. The source and the open thread are fixed at
 * render time (the newest capture in the source), so there is no selection,
 * search or URL state — the screen exists to show how the archive reads.
 */
export function ArchiveWorkspace({ source }: { source: Source }) {
  const threads = emailThreadsForSource(source.id);
  const active = threads[0];

  return (
    <>
      <WorkspaceHeader source={source} />
      <div className="min-h-0 flex-1 overflow-hidden">
        {active ? (
          <TwoPane
            listLabel={`${source.label} email list`}
            list={<MessageList threads={threads} activeId={active.id} />}
            detail={<EmailReader thread={active} />}
          />
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Mail />
              </EmptyMedia>
              <EmptyTitle>No email captured here</EmptyTitle>
              <EmptyDescription>
                This source&rsquo;s backup completed without any messages.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </>
  );
}
