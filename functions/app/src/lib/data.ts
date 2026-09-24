/**
 * Local mock archive data.
 *
 * Everything in this file is static prototype content: there is no backend,
 * loader or persistence. It is kept separate from the UI so the components
 * only ever see the domain types in `lib/types.ts`.
 *
 * The archive is read-only — it holds copies of past correspondence, so there
 * are no unread/starred flags and no message actions.
 */

import type {
  Attachment,
  AttachmentKind,
  ChatEntry,
  Conversation,
  EmailThread,
  Person,
  Source,
  SourceId,
  Thread,
} from "./types";

export type {
  Attachment,
  AttachmentKind,
  ChatEntry,
  Conversation,
  EmailMessage,
  EmailThread,
  Person,
  Source,
  SourceId,
  SourceType,
  Thread,
} from "./types";

/* -------------------------------------------------------------------------- */
/* Sources                                                                     */
/* -------------------------------------------------------------------------- */

export const SOURCES: Record<SourceId, Source> = {
  personal: {
    id: "personal",
    type: "email",
    label: "Personal Email",
    account: "osergiosiqueira@ferreira.studio",
    provider: "Gmail",
    exportedAt: "2026-09-23T17:30:00",
  },
  work: {
    id: "work",
    type: "email",
    label: "Work Email",
    account: "s.ferreira@lumen.io",
    provider: "Gmail",
    exportedAt: "2026-09-22T09:00:00",
  },
  "old-gmail": {
    id: "old-gmail",
    type: "email",
    label: "Old Gmail",
    account: "sergio.rafael@gmail.com",
    provider: "Gmail",
    exportedAt: "2026-09-21T08:15:00",
  },
  "personal-whatsapp": {
    id: "personal-whatsapp",
    type: "whatsapp",
    label: "Personal WhatsApp",
    account: "+351 91 ••• 0421",
    provider: "WhatsApp",
    exportedAt: "2026-09-23T21:00:00",
  },
  "brazil-whatsapp": {
    id: "brazil-whatsapp",
    type: "whatsapp",
    label: "Brazil WhatsApp",
    account: "+55 11 •••• 8321",
    provider: "WhatsApp",
    exportedAt: "2026-09-22T20:40:00",
  },
};

/** Sources in the exact order they appear in the sidebar. */
export const SOURCE_ORDER: SourceId[] = [
  "personal",
  "work",
  "old-gmail",
  "personal-whatsapp",
  "brazil-whatsapp",
];

export const SOURCE_LIST: Source[] = SOURCE_ORDER.map((id) => SOURCES[id]);

/** The workspace the archive opens into when no source is in the URL. */
export const DEFAULT_SOURCE_ID: SourceId = "personal";

export function getSource(id: string | undefined | null): Source | undefined {
  return id && id in SOURCES ? SOURCES[id as SourceId] : undefined;
}

/* -------------------------------------------------------------------------- */
/* Attachments                                                                 */
/* -------------------------------------------------------------------------- */

export const ATTACHMENTS: Attachment[] = [
  {
    id: "att-lease-2027",
    name: "studio-lease-renewal-2027.pdf",
    kind: "pdf",
    size: 486_233,
    date: "2026-09-23T11:42:00",
    source: "personal",
    threadId: "msg-lease-renewal",
    from: { name: "Helena Marques", handle: "helena@marquesadvogados.pt" },
    origin: "Re: Studio lease — renewal terms",
    summary:
      "Signed renewal terms for the Rua do Almada studio, effective January 2027. Clause 7 was amended to a 90-day notice period.",
    tags: ["contract", "legal", "studio"],
    meta: [
      { label: "Pages", value: "14" },
      { label: "Signed", value: "Both parties" },
      { label: "Valid until", value: "Dec 2029" },
    ],
  },
  {
    id: "att-tax-2026",
    name: "irs-2026-supporting-documents.zip",
    kind: "archive",
    size: 18_940_416,
    date: "2026-09-22T19:05:00",
    source: "personal",
    threadId: "msg-tax-accountant",
    from: { name: "Sérgio Ferreira", handle: "sergio@ferreira.studio" },
    origin: "Forwarded to accountant",
    summary:
      "Bundle of receipts, invoices and bank statements for the 2026 fiscal year, prepared for the accountant review.",
    tags: ["finance", "taxes", "2026"],
    meta: [
      { label: "Files", value: "42" },
      { label: "Compression", value: "Deflate" },
      { label: "Checksum", value: "a91f…7c2e" },
    ],
  },
  {
    id: "att-brand-guide",
    name: "archivum-brand-guidelines-v3.pdf",
    kind: "pdf",
    size: 7_312_004,
    date: "2026-09-22T10:18:00",
    source: "work",
    threadId: "msg-brand-handoff",
    from: { name: "Marta Oliveira", handle: "marta@northstudio.co" },
    origin: "Archivum — visual identity handoff",
    summary:
      "Third revision of the brand guidelines. Adds the editorial type scale and the restrained accent palette used across print.",
    tags: ["design", "brand", "handoff"],
    meta: [
      { label: "Pages", value: "38" },
      { label: "Version", value: "3.0" },
      { label: "Color space", value: "CMYK" },
    ],
  },
  {
    id: "att-q3-deck",
    name: "q3-archive-migration-review.pdf",
    kind: "deck",
    size: 3_204_887,
    date: "2026-09-21T15:37:00",
    source: "work",
    threadId: "msg-archive-review",
    from: { name: "Rui Bettencourt", handle: "rui.bettencourt@lumen.io" },
    origin: "Q3 review deck",
    summary:
      "Slide deck reviewing the archive migration: coverage, gaps and the plan to reindex the older mailboxes.",
    tags: ["work", "migration", "review"],
    meta: [
      { label: "Slides", value: "24" },
      { label: "Owner", value: "Platform" },
      { label: "Status", value: "Final" },
    ],
  },
  {
    id: "att-photo-workshop",
    name: "workshop-contact-sheet-09.jpg",
    kind: "image",
    size: 2_688_120,
    date: "2026-09-19T13:22:00",
    source: "personal-whatsapp",
    threadId: "msg-wa-contactsheet",
    from: { name: "Inês Costa", handle: "+351 96 ••• 1188" },
    origin: "Rua do Almada workshop",
    summary:
      "Contact sheet from the September workshop shoot. Selects marked in red grease pencil on print 4 and print 9.",
    tags: ["photography", "workshop"],
    meta: [
      { label: "Dimensions", value: "4200 × 2800" },
      { label: "Camera", value: "X-T5" },
      { label: "ISO", value: "400" },
    ],
  },
  {
    id: "att-invoice-0142",
    name: "invoice-0142-northstudio.pdf",
    kind: "pdf",
    size: 214_772,
    date: "2026-09-18T09:48:00",
    source: "work",
    threadId: "msg-invoice",
    from: { name: "Marta Oliveira", handle: "marta@northstudio.co" },
    origin: "Invoice 0142",
    summary:
      "Invoice for the identity handoff phase. Payment terms net 30, reference ARCH-0142 on the transfer.",
    tags: ["finance", "invoice", "design"],
    meta: [
      { label: "Amount", value: "€4,800.00" },
      { label: "Terms", value: "Net 30" },
      { label: "Status", value: "Paid" },
    ],
  },
  {
    id: "att-sensor-log",
    name: "archive-room-humidity-log.csv",
    kind: "spreadsheet",
    size: 96_512,
    date: "2026-09-18T08:02:00",
    source: "personal",
    threadId: "msg-sensor-alert",
    from: { name: "Building Systems", handle: "alerts@portacoop.pt" },
    origin: "Monthly environment report",
    summary:
      "Hourly temperature and relative humidity readings from the storage room sensors for September.",
    tags: ["facilities", "storage"],
    meta: [
      { label: "Rows", value: "720" },
      { label: "Interval", value: "Hourly" },
      { label: "Range", value: "Sep 1 – Sep 30" },
    ],
  },
  {
    id: "att-press-clipping",
    name: "press-clipping-lusitano.pdf",
    kind: "pdf",
    size: 1_144_320,
    date: "2026-09-15T17:11:00",
    source: "work",
    threadId: "msg-press",
    from: { name: "Diário Lusitano", handle: "redacao@lusitano.pt" },
    origin: "Press clipping — 'The quiet archive'",
    summary:
      "Scanned clipping of the feature on small personal archives, including the interview reference to Archivum.",
    tags: ["press", "clipping"],
    meta: [
      { label: "Pages", value: "2" },
      { label: "Published", value: "Sep 14" },
      { label: "Section", value: "Culture" },
    ],
  },
  {
    id: "att-floorplan",
    name: "studio-floorplan-rev-c.dwg",
    kind: "document",
    size: 5_640_192,
    date: "2026-09-12T12:30:00",
    source: "personal-whatsapp",
    threadId: "msg-wa-floorplan",
    from: { name: "Tomás Reis", handle: "+351 91 ••• 5520" },
    origin: "Floorplan revision C",
    summary:
      "Revised floorplan for the studio refit, moving the archive shelving to the north wall to avoid direct light.",
    tags: ["studio", "architecture"],
    meta: [
      { label: "Revision", value: "C" },
      { label: "Scale", value: "1:50" },
      { label: "Format", value: "DWG" },
    ],
  },
  {
    id: "att-voice-note",
    name: "voice-note-20260908.ogg",
    kind: "other",
    size: 842_137,
    date: "2026-09-08T21:54:00",
    source: "personal-whatsapp",
    threadId: "msg-wa-late-thought",
    from: { name: "Inês Costa", handle: "+351 96 ••• 1188" },
    origin: "Late thought on the archive",
    summary:
      "Voice note about separating the personal and work correspondence before the migration.",
    tags: ["voice", "planning"],
    meta: [
      { label: "Duration", value: "2:41" },
      { label: "Transcribed", value: "No" },
      { label: "Format", value: "Opus" },
    ],
  },
  {
    id: "att-readme-export",
    name: "migration-export-readme.txt",
    kind: "document",
    size: 12_288,
    date: "2026-09-08T07:20:00",
    source: "work",
    threadId: "msg-migration-export",
    from: { name: "Rui Bettencourt", handle: "rui.bettencourt@lumen.io" },
    origin: "Migration export — instructions",
    summary:
      "Plain-text instructions for the mailbox export, including the folder mapping and the manifest format.",
    tags: ["work", "migration", "docs"],
    meta: [
      { label: "Lines", value: "148" },
      { label: "Encoding", value: "UTF-8" },
      { label: "Format", value: "Mbox notes" },
    ],
  },
  {
    id: "att-receipt-bookcase",
    name: "receipt-bookcase-oak.pdf",
    kind: "pdf",
    size: 88_064,
    date: "2026-09-08T16:44:00",
    source: "personal-whatsapp",
    threadId: "msg-wa-weekend",
    from: { name: "Sérgio Ferreira", handle: "+351 91 ••• 0421" },
    origin: "Receipt — oak bookcase",
    summary:
      "Receipt for the custom oak bookcase delivered to the studio. Covers delivery and assembly.",
    tags: ["finance", "furniture", "studio"],
    meta: [
      { label: "Amount", value: "€1,260.00" },
      { label: "Delivery", value: "Sep 8" },
      { label: "Warranty", value: "5 years" },
    ],
  },
  {
    id: "att-reading-list",
    name: "reading-list-2026.md",
    kind: "document",
    size: 9_216,
    date: "2026-08-30T22:07:00",
    source: "personal",
    threadId: "msg-reading-list",
    from: { name: "Sérgio Ferreira", handle: "sergio@ferreira.studio" },
    origin: "Notes to self",
    summary:
      "Running reading list for the year, grouped by theme: archives, memory and the economics of attention.",
    tags: ["notes", "reading"],
    meta: [
      { label: "Entries", value: "31" },
      { label: "Format", value: "Markdown" },
      { label: "Updated", value: "Aug 30" },
    ],
  },
  {
    id: "att-scan-postcard",
    name: "scan-postcard-1974.jpg",
    kind: "image",
    size: 4_112_400,
    date: "2026-08-30T18:15:00",
    source: "personal-whatsapp",
    threadId: "msg-wa-scans",
    from: { name: "Inês Costa", handle: "+351 96 ••• 1188" },
    origin: "Family scans — batch 2",
    summary:
      "High-resolution scan of a family postcard from 1974, part of the ongoing digitisation of the paper archive.",
    tags: ["family", "scan", "archive"],
    meta: [
      { label: "Dimensions", value: "6000 × 3900" },
      { label: "DPI", value: "600" },
      { label: "Batch", value: "2 of 6" },
    ],
  },
  {
    id: "att-gallery-layout",
    name: "spring-room-layout-v2.pdf",
    kind: "pdf",
    size: 1_820_160,
    date: "2026-09-20T14:12:00",
    source: "old-gmail",
    threadId: "msg-studio-show",
    from: { name: "Lúcia Antunes", handle: "programa@galeriatejo.pt" },
    origin: "Spring programme — room layout",
    summary:
      "Second layout for the spring room: four walls, the long sequence on the north side, and a reading table by the entrance.",
    tags: ["studio", "exhibition", "layout"],
    meta: [
      { label: "Pages", value: "6" },
      { label: "Rooms", value: "3" },
      { label: "Version", value: "2" },
    ],
  },
  {
    id: "att-bookbinder-quote",
    name: "rebinding-quote-1998-2004.pdf",
    kind: "pdf",
    size: 164_864,
    date: "2026-09-11T16:20:00",
    source: "old-gmail",
    threadId: "msg-studio-rebind",
    from: { name: "Otília Braga", handle: "oficina@encadernacao.pt" },
    origin: "Rebinding the 1998–2004 volumes",
    summary:
      "Quote to rebind seven cloth volumes in half-linen, resewing the 1999 volume and replacing the spine labels.",
    tags: ["studio", "archive", "quote"],
    meta: [
      { label: "Volumes", value: "7" },
      { label: "Materials", value: "Half-linen" },
      { label: "Lead time", value: "5 weeks" },
    ],
  },
  {
    id: "att-print-proofs",
    name: "colour-proofs-press-check.pdf",
    kind: "pdf",
    size: 9_437_184,
    date: "2026-09-17T11:05:00",
    source: "brazil-whatsapp",
    threadId: "msg-wa-print",
    from: { name: "Gráfica Norte", handle: "+351 22 ••• 7740" },
    origin: "Press check — colour proofs",
    summary:
      "Colour proofs for the spring invitation. The grey is slightly warm on sheet 2; everything else is within tolerance.",
    tags: ["studio", "print", "proofs"],
    meta: [
      { label: "Sheets", value: "8" },
      { label: "Stock", value: "Munken 120g" },
      { label: "Approved", value: "Sheet 2 pending" },
    ],
  },
  {
    id: "att-delivery-note",
    name: "delivery-note-shelving.pdf",
    kind: "pdf",
    size: 121_344,
    date: "2026-09-14T14:20:00",
    source: "brazil-whatsapp",
    threadId: "msg-wa-delivery",
    from: { name: "Miguel Santos", handle: "+351 93 ••• 6612" },
    origin: "Delivery — archive shelving",
    summary:
      "Signed delivery note for the north-wall shelving. Two uprights and four bays, assembled on site before signing.",
    tags: ["studio", "delivery", "furniture"],
    meta: [
      { label: "Bays", value: "4" },
      { label: "Signed", value: "14:20" },
      { label: "Condition", value: "Good" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* People                                                                      */
/* -------------------------------------------------------------------------- */

const HELENA: Person = {
  name: "Helena Marques",
  handle: "helena@marquesadvogados.pt",
};
const SERGIO_PERSONAL: Person = {
  name: "Sérgio Ferreira",
  handle: "sergio@ferreira.studio",
};
const SERGIO_WORK: Person = {
  name: "Sérgio Ferreira",
  handle: "s.ferreira@lumen.io",
};
const SERGIO_OLD_GMAIL: Person = {
  name: "Sérgio Ferreira",
  handle: "sergio.rafael@gmail.com",
};
const RUI: Person = {
  name: "Rui Bettencourt",
  handle: "rui.bettencourt@lumen.io",
};
const MARTA: Person = {
  name: "Marta Oliveira",
  handle: "marta@northstudio.co",
};
const INES: Person = { name: "Inês Costa", handle: "+351 96 ••• 1188" };
const TOMAS: Person = { name: "Tomás Reis", handle: "+351 91 ••• 5520" };
const LUCIA: Person = {
  name: "Lúcia Antunes",
  handle: "programa@galeriatejo.pt",
};
const OTILIA: Person = {
  name: "Otília Braga",
  handle: "oficina@encadernacao.pt",
};

/* -------------------------------------------------------------------------- */
/* Email threads (oldest message first within each thread)                     */
/* -------------------------------------------------------------------------- */

export const EMAIL_THREADS: EmailThread[] = [
  {
    type: "email",
    id: "msg-lease-renewal",
    source: "personal",
    subject: "Studio lease — renewal terms",
    participants: [HELENA, SERGIO_PERSONAL],
    date: "2026-09-23T11:42:00",
    labels: ["Studio", "Legal"],
    preview:
      "Attached are the signed renewal terms. Clause 7 now reflects the 90-day notice period we agreed.",
    messages: [
      {
        id: "m-lease-1",
        from: HELENA,
        to: ["sergio@ferreira.studio"],
        date: "2026-09-19T09:15:00",
        body: [
          "Sérgio,",
          "Following our call, I've prepared the renewal on the terms we discussed: a three-year term, with the rent review moved into the annex so the main body stays readable.",
          "Before I send it for signature, can you confirm the notice period you wanted — 60 or 90 days?",
          "Helena",
        ],
        attachmentIds: [],
      },
      {
        id: "m-lease-2",
        from: SERGIO_PERSONAL,
        to: ["helena@marquesadvogados.pt"],
        date: "2026-09-21T17:40:00",
        body: [
          "Helena,",
          "Ninety days, please. The studio would be difficult to replace at short notice and I'd rather have the room.",
          "Everything else looks right. Happy to sign as soon as it's ready.",
          "Sérgio",
        ],
        attachmentIds: [],
      },
      {
        id: "m-lease-3",
        from: HELENA,
        to: ["sergio@ferreira.studio"],
        date: "2026-09-23T11:42:00",
        body: [
          "Sérgio,",
          "Attached are the signed renewal terms. Clause 7 now reflects the 90-day notice period we agreed, and the rent review has been moved to the annex.",
          "Both parties have counter-signed. I've kept the original in the office safe; a certified copy follows by post this week.",
          "Helena",
        ],
        attachmentIds: ["att-lease-2027"],
      },
    ],
  },
  {
    type: "email",
    id: "msg-brand-handoff",
    source: "work",
    subject: "Archivum — visual identity handoff",
    participants: [MARTA, SERGIO_WORK],
    date: "2026-09-22T10:18:00",
    labels: ["Design", "Brand"],
    preview:
      "Final files attached. The accent is intentionally quiet — it should read as a mark, not decoration.",
    messages: [
      {
        id: "m-brand-1",
        from: MARTA,
        to: ["s.ferreira@lumen.io"],
        date: "2026-09-14T09:20:00",
        body: [
          "Hello Sérgio,",
          "The second revision is with you: the wordmark tightened, and the editorial scale extended down to the caption sizes.",
          "I've left the accent deliberately unresolved — I'd like your read before we commit to it.",
          "Marta",
        ],
        attachmentIds: [],
      },
      {
        id: "m-brand-2",
        from: SERGIO_WORK,
        to: ["marta@northstudio.co"],
        date: "2026-09-15T11:05:00",
        body: [
          "Marta,",
          "Quieter is right. It should read as a mark rather than decoration — something that survives being printed small.",
          "If the third revision holds up in print, I'm happy to sign it off.",
          "Sérgio",
        ],
        attachmentIds: [],
      },
      {
        id: "m-brand-3",
        from: MARTA,
        to: ["s.ferreira@lumen.io"],
        date: "2026-09-19T16:45:00",
        body: [
          "Good — that's the direction I took. The third revision now includes the print proofs and the restrained palette.",
          "One thing to check: how the accent behaves on uncoated stock.",
          "Marta",
        ],
        attachmentIds: [],
      },
      {
        id: "m-brand-4",
        from: MARTA,
        to: ["s.ferreira@lumen.io"],
        date: "2026-09-22T10:18:00",
        body: [
          "Hello,",
          "Final files are attached, including the third revision of the guidelines. The accent colour is intentionally quiet — it should read as a mark rather than decoration, which felt right for an archive.",
          "The editorial type scale is in section 4. If anything needs another pass before print, let me know by Friday.",
          "Marta",
        ],
        attachmentIds: ["att-brand-guide"],
      },
    ],
  },
  {
    type: "email",
    id: "msg-archive-review",
    source: "work",
    subject: "Q3 archive migration review",
    participants: [RUI, SERGIO_WORK],
    date: "2026-09-21T15:37:00",
    labels: ["Work", "Migration"],
    preview:
      "Deck attached. Coverage is at 94% and the gaps are all in the 2011–2013 range.",
    messages: [
      {
        id: "m-review-1",
        from: RUI,
        to: ["s.ferreira@lumen.io"],
        date: "2026-09-18T10:05:00",
        body: [
          "Hi Sérgio,",
          "Pulling the Q3 numbers together for Thursday. Headline coverage is 94%, with the gaps concentrated in the 2011–2013 range.",
          "Do you want me to bring the legacy reindex as its own section?",
          "Rui",
        ],
        attachmentIds: [],
      },
      {
        id: "m-review-2",
        from: SERGIO_WORK,
        to: ["rui.bettencourt@lumen.io"],
        date: "2026-09-19T08:30:00",
        body: [
          "Rui,",
          "Yes — keep the reindex separate, otherwise the review reads as one undifferentiated backlog.",
          "I'd also like a short note on why those attachments were stripped.",
          "Sérgio",
        ],
        attachmentIds: [],
      },
      {
        id: "m-review-3",
        from: RUI,
        to: ["s.ferreira@lumen.io"],
        date: "2026-09-21T15:37:00",
        body: [
          "Deck attached for Thursday. Coverage is at 94% and the gaps are concentrated in the 2011–2013 range — mostly attachments that were stripped by the old provider.",
          "The reindex is now its own section, as you asked. Happy to walk through the numbers beforehand if useful.",
          "Rui",
        ],
        attachmentIds: ["att-q3-deck"],
      },
    ],
  },
  {
    type: "email",
    id: "msg-tax-accountant",
    source: "personal",
    subject: "2026 supporting documents",
    participants: [SERGIO_PERSONAL],
    date: "2026-09-22T19:05:00",
    labels: ["Finance", "Taxes"],
    preview:
      "Bundled everything for the year — receipts, invoices and statements. Shout if the manifest is unclear.",
    messages: [
      {
        id: "m-tax-1",
        from: SERGIO_PERSONAL,
        to: ["ana@contabilidade.pt"],
        date: "2026-09-22T19:05:00",
        body: [
          "Ana,",
          "Here is everything for the year bundled into a single archive: receipts, invoices and bank statements. There is a manifest at the top level listing each folder.",
          "Shout if anything is unclear or missing and I will dig it out.",
          "Obrigado,",
          "Sérgio",
        ],
        attachmentIds: ["att-tax-2026"],
      },
    ],
  },
  {
    type: "email",
    id: "msg-studio-show",
    source: "old-gmail",
    subject: "Spring programme — submission received",
    participants: [LUCIA, SERGIO_OLD_GMAIL],
    date: "2026-09-20T14:12:00",
    labels: ["Studio", "Exhibition"],
    preview:
      "We've logged the submission and attached the room layout for the spring programme.",
    messages: [
      {
        id: "m-studio-1",
        from: LUCIA,
        to: ["sergio.rafael@gmail.com"],
        date: "2026-09-16T10:00:00",
        body: [
          "Dear Sérgio,",
          "Thank you for the submission to the spring programme. The selection panel meets at the end of the month and we will write either way.",
          "Could you confirm how many works you intend to show, in case we need to reserve a larger room?",
          "Lúcia",
        ],
        attachmentIds: [],
      },
      {
        id: "m-studio-2",
        from: SERGIO_OLD_GMAIL,
        to: ["programa@galeriatejo.pt"],
        date: "2026-09-17T09:30:00",
        body: [
          "Lúcia,",
          "Nine works, all from the same series — small, mostly paper. They read best in a long sequence rather than a grid.",
          "I'd prefer the north wall if the light can be controlled.",
          "Sérgio",
        ],
        attachmentIds: [],
      },
      {
        id: "m-studio-3",
        from: LUCIA,
        to: ["sergio.rafael@gmail.com"],
        date: "2026-09-20T14:12:00",
        body: [
          "Sérgio,",
          "We've logged the submission and attached the room layout for the spring programme. The north wall works, and there is space for the sequence you described.",
          "No decision yet — I'll confirm once the panel has met.",
          "Lúcia",
        ],
        attachmentIds: ["att-gallery-layout"],
      },
    ],
  },
  {
    type: "email",
    id: "msg-studio-rebind",
    source: "old-gmail",
    subject: "Rebinding the 1998–2004 volumes",
    participants: [OTILIA, SERGIO_OLD_GMAIL],
    date: "2026-09-11T16:20:00",
    labels: ["Studio", "Archive"],
    preview:
      "Quote attached for the seven cloth volumes. The 1999 volume needs resewing, not just a new spine.",
    messages: [
      {
        id: "m-rebind-1",
        from: SERGIO_OLD_GMAIL,
        to: ["oficina@encadernacao.pt"],
        date: "2026-09-09T08:40:00",
        body: [
          "Otília,",
          "The cloth volumes from the late nineties are coming apart at the spine. Seven of them, roughly the same size.",
          "Could you quote to rebind them in half-linen? I'd like the labels kept as close to the originals as possible.",
          "Sérgio",
        ],
        attachmentIds: [],
      },
      {
        id: "m-rebind-2",
        from: OTILIA,
        to: ["sergio.rafael@gmail.com"],
        date: "2026-09-11T16:20:00",
        body: [
          "Sérgio,",
          "Quote attached for the seven volumes. One note: the 1999 volume needs resewing, not just a new spine, so it is priced separately.",
          "Half-linen with foil-blocked labels is the right choice for this age of cloth. Lead time is about five weeks.",
          "Otília",
        ],
        attachmentIds: ["att-bookbinder-quote"],
      },
    ],
  },
  {
    type: "email",
    id: "msg-invoice",
    source: "work",
    subject: "Invoice 0142",
    participants: [MARTA, SERGIO_WORK],
    date: "2026-09-18T09:48:00",
    labels: ["Finance", "Design"],
    preview:
      "Invoice for the handoff phase is attached. Reference ARCH-0142 on the transfer.",
    messages: [
      {
        id: "m-invoice-1",
        from: MARTA,
        to: ["s.ferreira@lumen.io"],
        date: "2026-09-18T09:48:00",
        body: [
          "Hi Sérgio,",
          "Invoice for the identity handoff phase is attached. Please use reference ARCH-0142 on the transfer so it reconciles cleanly.",
          "Thanks again for a calm project.",
          "Marta",
        ],
        attachmentIds: ["att-invoice-0142"],
      },
    ],
  },
  {
    type: "email",
    id: "msg-sensor-alert",
    source: "personal",
    subject: "Monthly environment report — storage room",
    participants: [
      { name: "Building Systems", handle: "alerts@portacoop.pt" },
      SERGIO_PERSONAL,
    ],
    date: "2026-09-18T08:02:00",
    labels: ["Facilities"],
    preview:
      "Humidity stayed within range all month. The log is attached for your records.",
    messages: [
      {
        id: "m-sensor-1",
        from: { name: "Building Systems", handle: "alerts@portacoop.pt" },
        to: ["sergio@ferreira.studio"],
        date: "2026-09-18T08:02:00",
        body: [
          "Automated report for the storage room.",
          "Relative humidity stayed within the recommended band for the full month, with a brief peak on the 12th during the afternoon. No corrective action is required.",
          "The hourly log is attached.",
        ],
        attachmentIds: ["att-sensor-log"],
      },
    ],
  },
  {
    type: "email",
    id: "msg-press",
    source: "work",
    subject: "Press clipping — “The quiet archive”",
    participants: [
      { name: "Diário Lusitano", handle: "redacao@lusitano.pt" },
      SERGIO_WORK,
    ],
    date: "2026-09-15T17:11:00",
    labels: ["Press"],
    preview:
      "Scan of Sunday's feature. They quoted you on the value of small personal archives.",
    messages: [
      {
        id: "m-press-1",
        from: SERGIO_WORK,
        to: ["redacao@lusitano.pt"],
        date: "2026-09-14T09:00:00",
        body: [
          "Good morning,",
          "Could you send a copy of Sunday's feature for my records? I'd like to keep the printed version in the archive.",
          "Thank you.",
        ],
        attachmentIds: [],
      },
      {
        id: "m-press-2",
        from: { name: "Diário Lusitano", handle: "redacao@lusitano.pt" },
        to: ["s.ferreira@lumen.io"],
        date: "2026-09-15T17:11:00",
        body: [
          "Good morning,",
          "Attached is a scan of Sunday's feature on small personal archives. They quoted you at some length on why small collections matter more than large ones.",
          "We'll post a physical copy for your records.",
        ],
        attachmentIds: ["att-press-clipping"],
      },
    ],
  },
  {
    type: "email",
    id: "msg-migration-export",
    source: "work",
    subject: "Migration export — instructions",
    participants: [RUI, SERGIO_WORK],
    date: "2026-09-08T07:20:00",
    labels: ["Work", "Migration"],
    preview:
      "Instructions attached. Folder mapping matters more than speed, so don't run it in a hurry.",
    messages: [
      {
        id: "m-export-1",
        from: SERGIO_WORK,
        to: ["rui.bettencourt@lumen.io"],
        date: "2026-09-07T18:20:00",
        body: [
          "Rui,",
          "Before I run the export — is there a preferred folder mapping, or should I mirror the old tree exactly?",
          "I'd rather get it right the first time.",
        ],
        attachmentIds: [],
      },
      {
        id: "m-export-2",
        from: RUI,
        to: ["s.ferreira@lumen.io"],
        date: "2026-09-08T07:20:00",
        body: [
          "Hi Sérgio,",
          "Instructions for the export are attached. The folder mapping matters more than the speed, so don't run it in a hurry — a bad mapping is expensive to undo.",
          "Ping me when the manifest is generated and I'll validate it.",
          "Rui",
        ],
        attachmentIds: ["att-readme-export"],
      },
    ],
  },
  {
    type: "email",
    id: "msg-reading-list",
    source: "personal",
    subject: "Reading list — end of August",
    participants: [SERGIO_PERSONAL],
    date: "2026-08-30T22:07:00",
    labels: ["Notes"],
    preview:
      "Notes to self: what stuck this month, and what I want to carry into the autumn.",
    messages: [
      {
        id: "m-reading-1",
        from: SERGIO_PERSONAL,
        to: ["sergio@ferreira.studio"],
        date: "2026-08-30T22:07:00",
        body: [
          "Notes to self for the end of the month.",
          "Three themes kept coming back: how archives shape memory, the economics of attention, and why small collections are more honest than large ones.",
          "Full list attached. Trim it before it becomes another thing to maintain.",
        ],
        attachmentIds: ["att-reading-list"],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* WhatsApp conversations                                                     */
/* -------------------------------------------------------------------------- */

function incoming(
  id: string,
  author: string,
  date: string,
  text: string[],
  attachmentIds: string[] = [],
): ChatEntry {
  return {
    id,
    kind: "message",
    direction: "incoming",
    author,
    date,
    text,
    attachmentIds,
  };
}

function outgoing(
  id: string,
  date: string,
  text: string[],
  attachmentIds: string[] = [],
): ChatEntry {
  return {
    id,
    kind: "message",
    direction: "outgoing",
    author: "Sérgio Ferreira",
    date,
    text,
    attachmentIds,
  };
}

function systemMessage(id: string, date: string, text: string): ChatEntry {
  return {
    id,
    kind: "system",
    direction: "incoming",
    author: "WhatsApp",
    date,
    text: [text],
    attachmentIds: [],
  };
}

export const CONVERSATIONS: Conversation[] = [
  {
    type: "whatsapp",
    id: "msg-wa-migration",
    source: "personal-whatsapp",
    contact: INES,
    isGroup: false,
    participants: ["Inês Costa", "Sérgio Ferreira"],
    date: "2026-09-23T20:43:00",
    labels: ["Migration"],
    preview:
      "Are we still exporting the old mailbox tonight? I can be around after nine.",
    entries: [
      systemMessage(
        "e-mig-0",
        "2026-09-20T08:58:00",
        "Messages and calls are end-to-end encrypted in this exported copy.",
      ),
      incoming("e-mig-1", "Inês Costa", "2026-09-20T09:02:00", [
        "Did you get the export tool working on the old mailbox?",
      ]),
      outgoing("e-mig-2", "2026-09-20T09:10:00", [
        "Almost — it chokes on the 2009 folders, but the recent ones come out clean.",
      ]),
      incoming("e-mig-3", "Inês Costa", "2026-09-23T20:41:00", [
        "Are we still exporting the old mailbox tonight? I can be around after nine.",
      ]),
      incoming("e-mig-4", "Inês Costa", "2026-09-23T20:42:00", [
        "Also — I think the personal and work threads should land in separate folders, otherwise search gets noisy.",
      ]),
      incoming("e-mig-5", "Inês Costa", "2026-09-23T20:43:00", [
        "No rush on the answer, just don't want to start without you.",
      ]),
    ],
  },
  {
    type: "whatsapp",
    id: "msg-wa-thanks",
    source: "personal-whatsapp",
    contact: HELENA,
    isGroup: false,
    participants: ["Helena Marques", "Sérgio Ferreira"],
    date: "2026-09-23T09:15:00",
    labels: ["Legal"],
    preview:
      "Sent the certified copy this morning — should reach you Thursday.",
    entries: [
      incoming("e-thanks-1", "Helena Marques", "2026-09-23T09:10:00", [
        "Sent the certified copy this morning — should reach you Thursday.",
      ]),
      incoming("e-thanks-2", "Helena Marques", "2026-09-23T09:12:00", [
        "Keep the original somewhere dry. Basements are where leases go to die.",
      ]),
      outgoing("e-thanks-3", "2026-09-23T09:15:00", [
        "Noted — it's going in the studio safe. Thank you, Helena.",
      ]),
    ],
  },
  {
    type: "whatsapp",
    id: "msg-wa-rain",
    source: "personal-whatsapp",
    contact: INES,
    isGroup: false,
    participants: ["Inês Costa", "Sérgio Ferreira"],
    date: "2026-09-21T18:02:00",
    labels: [],
    preview:
      "It's pouring here. Bring the umbrellas in if you're at the studio.",
    entries: [
      incoming("e-rain-1", "Inês Costa", "2026-09-21T18:02:00", [
        "It's pouring here. Bring the umbrellas in if you're at the studio.",
      ]),
      outgoing("e-rain-2", "2026-09-21T18:05:00", [
        "On it — the skylight is already leaking a little.",
      ]),
    ],
  },
  {
    type: "whatsapp",
    id: "msg-wa-contactsheet",
    source: "personal-whatsapp",
    contact: INES,
    isGroup: false,
    participants: ["Inês Costa", "Sérgio Ferreira"],
    date: "2026-09-19T13:22:00",
    labels: ["Photography"],
    preview: "Contact sheet from Saturday. Prints 4 and 9 are the ones.",
    entries: [
      outgoing("e-sheet-1", "2026-09-19T12:50:00", [
        "Send the contact sheet when you have it, no rush.",
      ]),
      incoming("e-sheet-2", "Inês Costa", "2026-09-19T13:20:00", [
        "Contact sheet from Saturday, straight off the card.",
      ]),
      incoming("e-sheet-3", "Inês Costa", "2026-09-19T13:21:00", [
        "Prints 4 and 9 are the ones — the rest felt a bit too posed.",
      ]),
      incoming(
        "e-sheet-4",
        "Inês Costa",
        "2026-09-19T13:22:00",
        ["I'll bring the negatives next time you're at the studio."],
        ["att-photo-workshop"],
      ),
    ],
  },
  {
    type: "whatsapp",
    id: "msg-wa-floorplan",
    source: "personal-whatsapp",
    contact: TOMAS,
    isGroup: false,
    participants: ["Tomás Reis", "Sérgio Ferreira"],
    date: "2026-09-12T12:30:00",
    labels: ["Studio"],
    preview:
      "Revision C attached. Moved the shelving to the north wall so the light doesn't hit the spines.",
    entries: [
      incoming("e-plan-1", "Tomás Reis", "2026-09-12T12:28:00", [
        "Revision C attached.",
      ]),
      incoming("e-plan-2", "Tomás Reis", "2026-09-12T12:29:00", [
        "I moved the shelving to the north wall so direct light doesn't hit the spines. It also gives you a cleaner line from the door.",
      ]),
      incoming(
        "e-plan-3",
        "Tomás Reis",
        "2026-09-12T12:30:00",
        [
          "Tell me if the run feels too long and I'll break it with a low cabinet.",
        ],
        ["att-floorplan"],
      ),
    ],
  },
  {
    type: "whatsapp",
    id: "msg-wa-late-thought",
    source: "personal-whatsapp",
    contact: INES,
    isGroup: false,
    participants: ["Inês Costa", "Sérgio Ferreira"],
    date: "2026-09-08T21:54:00",
    labels: ["Planning"],
    preview: "Leaving a voice note instead of typing all of this out.",
    entries: [
      incoming("e-voice-1", "Inês Costa", "2026-09-08T21:52:00", [
        "Leaving a voice note instead of typing all of this out — too many caveats for a message.",
      ]),
      incoming(
        "e-voice-2",
        "Inês Costa",
        "2026-09-08T21:54:00",
        [
          "Short version: personal and work should be separated before the migration, not after.",
        ],
        ["att-voice-note"],
      ),
    ],
  },
  {
    type: "whatsapp",
    id: "msg-wa-weekend",
    source: "personal-whatsapp",
    contact: TOMAS,
    isGroup: false,
    participants: ["Tomás Reis", "Sérgio Ferreira"],
    date: "2026-09-08T16:55:00",
    labels: ["Studio"],
    preview:
      "Do you still have the oak bookcase receipt? I need the reference.",
    entries: [
      incoming("e-book-1", "Tomás Reis", "2026-09-08T16:42:00", [
        "Do you still have the oak bookcase receipt? I need the reference for the insurance list.",
      ]),
      incoming("e-book-2", "Tomás Reis", "2026-09-08T16:44:00", [
        "No panic if it's buried, I just couldn't find mine.",
      ]),
      outgoing(
        "e-book-3",
        "2026-09-08T16:52:00",
        ["Here it is — €1,260, delivered on the 8th."],
        ["att-receipt-bookcase"],
      ),
      incoming("e-book-4", "Tomás Reis", "2026-09-08T16:55:00", [
        "Perfect, that's exactly what I needed.",
      ]),
    ],
  },
  {
    type: "whatsapp",
    id: "msg-wa-scans",
    source: "personal-whatsapp",
    contact: INES,
    isGroup: false,
    participants: ["Inês Costa", "Sérgio Ferreira"],
    date: "2026-08-30T18:15:00",
    labels: ["Family", "Archive"],
    preview:
      "Batch 2 of the family scans is done — the 1974 postcard came out well.",
    entries: [
      outgoing("e-scan-1", "2026-08-29T11:20:00", [
        "How did batch 2 come out when you get a chance?",
      ]),
      incoming("e-scan-2", "Inês Costa", "2026-08-30T18:13:00", [
        "Batch 2 of the family scans is done.",
      ]),
      incoming("e-scan-3", "Inês Costa", "2026-08-30T18:14:00", [
        "The 1974 postcard came out well at 600 dpi — you can read the stamp clearly now.",
      ]),
      incoming(
        "e-scan-4",
        "Inês Costa",
        "2026-08-30T18:15:00",
        ["I'll keep going with batch 3 when the light is better."],
        ["att-scan-postcard"],
      ),
    ],
  },

  /* Brazil WhatsApp ------------------------------------------------------- */

  {
    type: "whatsapp",
    id: "msg-wa-print",
    source: "brazil-whatsapp",
    contact: { name: "Gráfica Norte", handle: "+351 22 ••• 7740" },
    isGroup: false,
    participants: ["Gráfica Norte", "Sérgio Ferreira"],
    date: "2026-09-17T11:05:00",
    labels: ["Studio", "Print"],
    preview:
      "Proofs are on the press — attaching the colour check for the invitation.",
    entries: [
      outgoing("e-print-1", "2026-09-16T15:10:00", [
        "Are we still on for the invitation run this week?",
      ]),
      incoming("e-print-2", "Gráfica Norte", "2026-09-17T11:02:00", [
        "On press now. The stock held well, no surprises.",
      ]),
      incoming(
        "e-print-3",
        "Gráfica Norte",
        "2026-09-17T11:05:00",
        [
          "Attaching the colour check — sheet 2 is a touch warm, everything else is fine.",
        ],
        ["att-print-proofs"],
      ),
    ],
  },
  {
    type: "whatsapp",
    id: "msg-wa-delivery",
    source: "brazil-whatsapp",
    contact: { name: "Miguel Santos", handle: "+351 93 ••• 6612" },
    isGroup: false,
    participants: ["Miguel Santos", "Sérgio Ferreira"],
    date: "2026-09-14T14:20:00",
    labels: ["Studio"],
    preview: "Delivery note attached, shelving signed for at 14:20.",
    entries: [
      incoming("e-del-1", "Miguel Santos", "2026-09-14T13:55:00", [
        "Arriving in about twenty minutes with the shelving. Is the side entrance open?",
      ]),
      outgoing("e-del-2", "2026-09-14T13:58:00", [
        "Yes, side entrance is open — I'll be here.",
      ]),
      incoming(
        "e-del-3",
        "Miguel Santos",
        "2026-09-14T14:20:00",
        ["All assembled and signed for at 14:20. Delivery note attached."],
        ["att-delivery-note"],
      ),
    ],
  },
  {
    type: "whatsapp",
    id: "msg-wa-studio-move",
    source: "brazil-whatsapp",
    contact: { name: "Estúdio Almada", handle: "Group · 3 participants" },
    isGroup: true,
    participants: ["Inês Costa", "Tomás Reis", "Sérgio Ferreira"],
    date: "2026-09-16T10:40:00",
    labels: ["Studio", "Migration"],
    preview:
      "I'll clear the north wall this weekend so the shelving can go in.",
    entries: [
      systemMessage(
        "e-move-0",
        "2026-09-16T10:20:00",
        "You created group “Estúdio Almada”.",
      ),
      incoming("e-move-1", "Tomás Reis", "2026-09-16T10:25:00", [
        "Group for the archive move. I'll post the measurements here as I take them.",
      ]),
      incoming("e-move-2", "Inês Costa", "2026-09-16T10:32:00", [
        "Good. I'll bring the boxes and the labels on Saturday.",
      ]),
      outgoing("e-move-3", "2026-09-16T10:40:00", [
        "I'll clear the north wall this weekend so the shelving can go in.",
      ]),
    ],
  },
  {
    type: "whatsapp",
    id: "msg-wa-shelving",
    source: "brazil-whatsapp",
    contact: TOMAS,
    isGroup: false,
    participants: ["Tomás Reis", "Sérgio Ferreira"],
    date: "2026-09-15T09:30:00",
    labels: ["Studio"],
    preview: "The oak arrived. It's heavier than the drawing suggested.",
    entries: [
      incoming("e-shelf-1", "Tomás Reis", "2026-09-15T09:28:00", [
        "The oak arrived. It's heavier than the drawing suggested, so I'm glad we reinforced the wall.",
      ]),
      incoming("e-shelf-2", "Tomás Reis", "2026-09-15T09:30:00", [
        "Assembled and empty for now. Feels like it's waiting for something.",
      ]),
    ],
  },
];

export const THREADS: Thread[] = [...EMAIL_THREADS, ...CONVERSATIONS];

/** Newest first — the archive is always presented in reverse chronological order. */
export const THREADS_BY_DATE: Thread[] = [...THREADS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const ATTACHMENTS_BY_DATE: Attachment[] = [...ATTACHMENTS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

/* -------------------------------------------------------------------------- */
/* Selectors                                                                   */
/* -------------------------------------------------------------------------- */

export function threadsForSource(sourceId: SourceId): Thread[] {
  return THREADS_BY_DATE.filter((thread) => thread.source === sourceId);
}

/** Email threads captured in a source, newest first. */
export function emailThreadsForSource(sourceId: SourceId): EmailThread[] {
  return threadsForSource(sourceId).filter(
    (thread): thread is EmailThread => thread.type === "email",
  );
}

/** WhatsApp conversations captured in a source, newest first. */
export function conversationsForSource(sourceId: SourceId): Conversation[] {
  return threadsForSource(sourceId).filter(
    (thread): thread is Conversation => thread.type === "whatsapp",
  );
}

export function attachmentsForSource(sourceId: SourceId): Attachment[] {
  return ATTACHMENTS_BY_DATE.filter(
    (attachment) => attachment.source === sourceId,
  );
}

export function countThreadsForSource(sourceId: SourceId): number {
  return threadsForSource(sourceId).length;
}

export function countAttachmentsForSource(sourceId: SourceId): number {
  return attachmentsForSource(sourceId).length;
}

export function getAttachment(id: string): Attachment | undefined {
  return ATTACHMENTS.find((attachment) => attachment.id === id);
}

/** Resolve the files referenced by a thread, preserving order. */
export function attachmentsOfThread(thread: Thread): Attachment[] {
  const ids =
    thread.type === "whatsapp"
      ? thread.entries.flatMap((entry) => entry.attachmentIds)
      : thread.messages.flatMap((message) => message.attachmentIds);

  return ids
    .map((id) => getAttachment(id))
    .filter((item): item is Attachment => Boolean(item));
}

/** How many files a thread references. */
export function attachmentCount(thread: Thread): number {
  return attachmentsOfThread(thread).length;
}

/** The person a list row should name: the contact, or the latest email author. */
export function threadSender(thread: Thread): Person {
  if (thread.type === "whatsapp") return thread.contact;
  const latest = thread.messages.at(-1);
  return latest ? latest.from : thread.participants[0];
}

/** The row's primary title: email subject, or the WhatsApp contact. */
export function threadTitle(thread: Thread): string {
  return thread.type === "whatsapp" ? thread.contact.name : thread.subject;
}

export const ATTACHMENT_KIND_LABEL: Record<AttachmentKind, string> = {
  pdf: "PDF",
  document: "Document",
  image: "Image",
  spreadsheet: "Spreadsheet",
  deck: "Deck",
  archive: "Archive",
  other: "File",
};
