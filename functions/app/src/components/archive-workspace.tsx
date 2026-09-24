import { Mail, MessageCircle } from "lucide-react";

import { ConversationReader } from "@/components/conversation-reader";
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
import type { Source, Thread } from "@/lib/data";

/**
 * The threads section of a source workspace: the day-grouped list beside
 * whichever thread the URL selects. Selection and reading are owned by the
 * route — this component only renders the two panes it is given.
 */
export function ArchiveWorkspace({
  source,
  threads,
  activeId,
  query = "",
}: {
  source: Source;
  threads: Thread[];
  activeId?: string;
  query?: string;
}) {
  const active = threads.find((thread) => thread.id === activeId) ?? threads[0];
  const isEmail = source.type === "email";
  const isFiltered = Boolean(query.trim());

  return (
    <div className="min-h-0 flex-1 overflow-hidden">
      {active ? (
        <TwoPane
          listLabel={`${source.label} ${isEmail ? "email" : "conversation"} list`}
          list={<MessageList threads={threads} activeId={active.id} />}
          detail={
            active.type === "email" ? (
              <EmailReader thread={active} />
            ) : (
              <ConversationReader thread={active} />
            )
          }
        />
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              {isEmail ? <Mail /> : <MessageCircle />}
            </EmptyMedia>
            <EmptyTitle>
              {isFiltered
                ? "No matches"
                : isEmail
                  ? "No email captured here"
                  : "No conversations captured here"}
            </EmptyTitle>
            <EmptyDescription>
              {isFiltered ? (
                <>
                  Nothing in {source.label} matches &ldquo;{query.trim()}
                  &rdquo;.
                </>
              ) : (
                <>This source&rsquo;s backup completed without any messages.</>
              )}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
}
