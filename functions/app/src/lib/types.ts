/**
 * Archivum domain types.
 *
 * The archive is read-only: it holds captured copies of past correspondence,
 * so there are no unread/starred flags and no message actions. Shapes mirror
 * what a future archive API would return, so the UI can migrate without a
 * rewrite.
 *
 * A source has exactly one `type`. Every source-driven decision in the UI keys
 * off `source.type`, never off a specific source id.
 */

export type SourceType = "email" | "whatsapp";

/** Opaque id for a source; routes open a workspace via `/:sourceId`. */
export type SourceId = string;

/** A captured mailbox or chat account that scopes the workspace. */
export interface Source {
  id: SourceId;
  type: SourceType;
  label: string;
  /** Account address shown beneath the label. */
  account: string;
  /** Transport the archive was captured from, e.g. "Gmail". */
  provider: string;
  /** When this source's backup was exported. */
  exportedAt: string;
}

export interface Person {
  name: string;
  handle: string;
}

export type AttachmentKind =
  | "pdf"
  | "document"
  | "image"
  | "spreadsheet"
  | "deck"
  | "archive"
  | "other";

export interface Attachment {
  id: string;
  name: string;
  kind: AttachmentKind;
  size: number;
  date: string;
  source: SourceId;
  /** Thread the file was captured from, for cross-linking back to its origin. */
  threadId: string;
  from: Person;
  origin: string;
  summary: string;
  tags: string[];
  meta: { label: string; value: string }[];
}

/* -------------------------------------------------------------------------- */
/* Email                                                                      */
/* -------------------------------------------------------------------------- */

/** A single captured email inside a thread. */
export interface EmailMessage {
  id: string;
  from: Person;
  to: string[];
  date: string;
  body: string[];
  attachmentIds: string[];
}

/** A complete archived email thread, oldest message first. */
export interface EmailThread {
  type: "email";
  id: string;
  source: SourceId;
  subject: string;
  participants: Person[];
  messages: EmailMessage[];
  /** Date of the most recent message in the thread. */
  date: string;
  labels: string[];
  preview: string;
}

/* -------------------------------------------------------------------------- */
/* WhatsApp                                                                   */
/* -------------------------------------------------------------------------- */

export type ChatDirection = "incoming" | "outgoing";
export type ChatEntryKind = "message" | "system";

/** One line in an archived WhatsApp conversation, oldest first. */
export interface ChatEntry {
  id: string;
  kind: ChatEntryKind;
  direction: ChatDirection;
  /** Display name of the author; "WhatsApp" for system lines. */
  author: string;
  date: string;
  text: string[];
  attachmentIds: string[];
}

/** A complete archived WhatsApp conversation. */
export interface Conversation {
  type: "whatsapp";
  id: string;
  source: SourceId;
  contact: Person;
  isGroup: boolean;
  participants: string[];
  entries: ChatEntry[];
  /** Date of the most recent entry in the conversation. */
  date: string;
  labels: string[];
  preview: string;
}

export type Thread = EmailThread | Conversation;

/** The kind of section a source opens into. */
export type ThreadSection = "emails" | "conversations";
export type SectionSlug = ThreadSection | "attachments";
