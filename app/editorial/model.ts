export type PublicationStatus =
  | "draft"
  | "review"
  | "scheduled"
  | "published"
  | "archived";

export type ContentVisibility = "private" | "team" | "public";

export type EvidenceStatus =
  | "Evidence Review"
  | "Clinically Reviewed Education"
  | "Research Update"
  | "Protocol in Development"
  | "Forward-Looking Concept";

export type Citation = {
  id: string;
  label: string;
  href: string;
  accessedAt?: string;
};

export type CorrectionRecord = {
  version: string;
  date: string;
  summary: string;
};

export type EditorialGovernance = {
  status: PublicationStatus;
  visibility: ContentVisibility;
  contentType: string;
  evidenceStatus: EvidenceStatus;
  evidenceDefinition: string;
  reviewer: string;
  reviewerRole: string;
  reviewedAt: string;
  takeaway: string;
  keyFindings: string[];
  limitations: string[];
  reviewMethod: string;
  citations: Citation[];
  disclosures: string[];
  correctionHistory: CorrectionRecord[];
  seoTitle: string;
  seoDescription: string;
};

export type ClaimReviewStatus =
  | "proposed"
  | "source-check"
  | "approved"
  | "expired";

export type PublicClaimRecord = {
  id: string;
  claim: string;
  source: string;
  sourceDate: string;
  owner: string;
  reviewStatus: ClaimReviewStatus;
  allowedSurfaces: string[];
  reReviewAt: string;
};

export const evidenceStatusDefinitions: Record<EvidenceStatus, string> = {
  "Evidence Review":
    "A structured synthesis of existing sources. It is not new clinical research.",
  "Clinically Reviewed Education":
    "Educational material checked by a qualified clinical reviewer for accuracy and proportionate language.",
  "Research Update":
    "A time-stamped explanation of emerging research whose conclusions may change.",
  "Protocol in Development":
    "A developing method that is not presented as validated or ready for personal use.",
  "Forward-Looking Concept":
    "An exploratory idea shared to clarify direction, not an available clinical function.",
};

export function isPubliclyPublished(record: EditorialGovernance) {
  return record.status === "published" && record.visibility === "public";
}

export function assertPublicRecord(record: EditorialGovernance) {
  if (!isPubliclyPublished(record)) {
    throw new Error("Only public, published editorial records may be rendered.");
  }
  if (!record.reviewer || !record.reviewedAt || !record.takeaway) {
    throw new Error("Public editorial records require review and takeaway data.");
  }
}

export const publicClaimRegister: PublicClaimRecord[] = [
  {
    id: "XYL-PUB-001",
    claim:
      "XYLENS publishes independent educational journalism about medicine, wellness, research, and the environments that shape health.",
    source: "XYLENS editorial charter",
    sourceDate: "2026-07-25",
    owner: "Editorial desk",
    reviewStatus: "approved",
    allowedSurfaces: ["Home", "About", "Editorial standards"],
    reReviewAt: "2027-07-25",
  },
];
