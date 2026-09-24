/**
 * Source-scoped archive search over the local mock data.
 *
 * The UI only ever sees normalized {@link SearchResult} rows grouped by kind,
 * so a real search endpoint can replace {@link searchSource} without touching
 * the dialog. Every query is limited to one source — the sidebar already chose
 * it — and never crosses accounts.
 */

import {
  ATTACHMENT_KIND_LABEL,
  attachmentsForSource,
  conversationsForSource,
  emailThreadsForSource,
  filterAttachments,
  threadSender,
  type Attachment,
  type Conversation,
  type EmailThread,
  type Source,
} from "./data";
import { formatFileSize, formatShortDate, formatTime } from "./format";

export type SearchResultType =
  | "email"
  | "message"
  | "conversation"
  | "attachment";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  snippet?: string;
  timestamp?: string;
  sourceId: string;
  /** In-app path that opens this item inside the current source workspace. */
  targetPath: string;
}

export interface SearchResultGroup {
  id: string;
  label: string;
  results: SearchResult[];
}

function threadPath(sourceId: string, threadId: string): string {
  return `/${sourceId}?thread=${encodeURIComponent(threadId)}`;
}

function attachmentsPath(sourceId: string): string {
  return `/${sourceId}/attachments`;
}

function emailResult(source: Source, thread: EmailThread): SearchResult {
  const sender = threadSender(thread);
  return {
    id: `email-${thread.id}`,
    type: "email",
    title: thread.subject,
    subtitle: `${sender.name} · ${formatShortDate(thread.date)}`,
    snippet: thread.preview,
    timestamp: thread.date,
    sourceId: source.id,
    targetPath: threadPath(source.id, thread.id),
  };
}

function conversationResult(
  source: Source,
  conversation: Conversation,
): SearchResult {
  return {
    id: `conversation-${conversation.id}`,
    type: "conversation",
    title: conversation.contact.name,
    subtitle: formatShortDate(conversation.date),
    snippet: conversation.preview,
    timestamp: conversation.date,
    sourceId: source.id,
    targetPath: threadPath(source.id, conversation.id),
  };
}

function messageResult(
  source: Source,
  conversation: Conversation,
  entryId: string,
  author: string,
  text: string,
  date: string,
): SearchResult {
  return {
    id: `message-${conversation.id}-${entryId}`,
    type: "message",
    title: author,
    snippet: text,
    subtitle: `${formatShortDate(date)} · ${formatTime(date)}`,
    timestamp: date,
    sourceId: source.id,
    targetPath: threadPath(source.id, conversation.id),
  };
}

function attachmentResult(source: Source, attachment: Attachment): SearchResult {
  return {
    id: `attachment-${attachment.id}`,
    type: "attachment",
    title: attachment.name,
    subtitle: `${ATTACHMENT_KIND_LABEL[attachment.kind]} · ${formatFileSize(attachment.size)} · ${formatShortDate(attachment.date)}`,
    snippet: attachment.summary,
    timestamp: attachment.date,
    sourceId: source.id,
    targetPath: attachmentsPath(source.id),
  };
}

function matches(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle);
}

/**
 * Search one source and return non-empty groups ready for the dialog.
 * Empty / whitespace queries return no groups (the dialog shows a hint instead).
 */
export function searchSource(
  source: Source,
  query: string,
): SearchResultGroup[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  const groups: SearchResultGroup[] = [];

  if (source.type === "email") {
    const emails = emailThreadsForSource(source.id)
      .filter((thread) => {
        const people = thread.participants.flatMap((p) => [p.name, p.handle]);
        const body = thread.messages.flatMap((m) => m.body);
        return [
          thread.subject,
          thread.preview,
          ...thread.labels,
          ...people,
          ...body,
        ].some((field) => matches(field, needle));
      })
      .map((thread) => emailResult(source, thread));

    if (emails.length > 0) {
      groups.push({ id: "emails", label: "Emails", results: emails });
    }
  } else {
    const messages = conversationsForSource(source.id).flatMap((conversation) =>
      conversation.entries
        .filter(
          (entry) =>
            entry.kind === "message" &&
            [entry.author, ...entry.text].some((field) =>
              matches(field, needle),
            ),
        )
        .map((entry) =>
          messageResult(
            source,
            conversation,
            entry.id,
            entry.author,
            entry.text.join(" "),
            entry.date,
          ),
        ),
    );

    if (messages.length > 0) {
      groups.push({ id: "messages", label: "Messages", results: messages });
    }

    const conversations = conversationsForSource(source.id)
      .filter((conversation) => {
        const people = [
          conversation.contact.name,
          conversation.contact.handle,
          ...conversation.participants,
        ];
        return [conversation.preview, ...conversation.labels, ...people].some(
          (field) => matches(field, needle),
        );
      })
      .map((conversation) => conversationResult(source, conversation));

    if (conversations.length > 0) {
      groups.push({
        id: "conversations",
        label: "Conversations",
        results: conversations,
      });
    }
  }

  const attachments = filterAttachments(
    attachmentsForSource(source.id),
    needle,
  ).map((attachment) => attachmentResult(source, attachment));
  if (attachments.length > 0) {
    groups.push({ id: "attachments", label: "Attachments", results: attachments });
  }

  return groups;
}
