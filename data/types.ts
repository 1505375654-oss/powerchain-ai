/** Canonical domain model. This module has no dependency on React or UI code. */

export type EntityId = string;
export type ISODate = string;
export type Region = "China" | "Overseas";
export type Segment = "UPS" | "Liquid Cooling" | "Power Distribution";

export type RelationshipConfidenceLevel = "A" | "B" | "C" | "D" | "E";

export const RELATIONSHIP_CONFIDENCE = {
  A: { label: "Revenue Confirmed", definition: "The company explicitly discloses relevant revenue, orders, or revenue share." },
  B: { label: "Business Confirmed", definition: "The company explicitly offers the relevant product or business, without separate revenue disclosure." },
  C: { label: "Deployment / Customer Evidence", definition: "Customer cases, project delivery, or product deployment provide indirect business evidence." },
  D: { label: "Strategic Statement", definition: "Management states an intention or direction, but no business outcome is evidenced." },
  E: { label: "No Reliable Evidence", definition: "No reliable evidence has been found." },
} as const satisfies Record<RelationshipConfidenceLevel, { label: string; definition: string }>;

export type AnalyticalConfidence = "High" | "Medium" | "Low" | "Unverified";
export type TransmissionConfidence = "High" | "Medium" | "Low";
export type EvidenceSourceType =
  | "Annual Report" | "Interim Report" | "Regulatory Filing" | "Earnings Call"
  | "Investor Presentation" | "Company Website" | "Product Documentation"
  | "Customer Case Study" | "Industry Research" | "Government / Regulatory" | "News Release";

export interface IndustrySegment {
  id: EntityId;
  name: Segment;
  description: string;
  inclusionCriteria: string[];
  exclusionCriteria: string[];
  lastUpdated: ISODate;
}

export interface Company {
  id: EntityId;
  name: string;
  legalName: string;
  ticker: string;
  exchange: string;
  region: Region;
  headquartersCountry: string;
  segmentIds: EntityId[];
  /** Display-only convenience; canonical linkage is segmentIds. */
  segments: Segment[];
  chainRole: string;
  summary: string;
  lastUpdated: ISODate;
}

export interface Evidence {
  id: EntityId;
  sourceType: EvidenceSourceType;
  sourceName: string;
  sourceUrl: string;
  publishedAt: ISODate | null;
  quoteOrFact: string;
  verified: boolean;
  retrievedAt: ISODate;
}

/** Auditable company-to-segment edge; never infer confidence from Company alone. */
export interface ConceptRelationship {
  id: EntityId;
  companyId: EntityId;
  segmentId: EntityId;
  confidenceLevel: RelationshipConfidenceLevel;
  claim: string;
  evidenceIds: EntityId[];
  reasoning: string;
  whyNotHigher: string;
  lastUpdated: ISODate;
}

export type ComparisonAssessment =
  | "Comparable"
  | "Partially Comparable"
  | "Not Directly Comparable";

export interface ComparableDimension {
  dimension: string;
  companyA: string;
  companyB: string;
  assessment: ComparisonAssessment;
  reason: string;
  evidenceIds: EntityId[];
}

export interface ComparablePair {
  id: EntityId;
  companyAId: EntityId;
  companyBId: EntityId;
  sharedSegmentIds: EntityId[];
  comparableDimensions: ComparableDimension[];
  nonComparableDimensions: ComparableDimension[];
  summary: string;
  evidenceIds: EntityId[];
  lastUpdated: ISODate;
}

export type ExternalEventType =
  | "AI Capex" | "Power Density" | "Technology Shift" | "Policy / Regulation"
  | "Supply Chain" | "Company Disclosure";

export interface ExternalEvent {
  id: EntityId;
  eventType: ExternalEventType;
  title: string;
  description: string;
  occurredAt: ISODate;
  affectedSegmentIds: EntityId[];
  evidenceIds: EntityId[];
  lastUpdated: ISODate;
}

export type TransmissionStage =
  | "External Driver" | "Industry Effect" | "Segment" | "Company Exposure"
  | "Business Metric" | "Financial Metric";

interface BaseTransmissionNode<TStage extends TransmissionStage> {
  id: EntityId;
  stage: TStage;
  label: string;
  explanation: string;
  whyItMatters: string;
  caveat: string;
  confidence: TransmissionConfidence;
  evidenceIds: EntityId[];
  entityId?: EntityId;
}

export type TransmissionNode<TStage extends TransmissionStage = TransmissionStage> =
  BaseTransmissionNode<TStage> &
  (TStage extends "Company Exposure"
    ? { companyId: EntityId; segmentId: EntityId; relationshipId: EntityId }
    : { companyId?: EntityId; segmentId?: EntityId; relationshipId?: EntityId });

/** Tuple order makes all six required stages mandatory at compile time. */
export type TransmissionPathNodes = readonly [
  TransmissionNode<"External Driver">,
  TransmissionNode<"Industry Effect">,
  TransmissionNode<"Segment">,
  TransmissionNode<"Company Exposure">,
  TransmissionNode<"Business Metric">,
  TransmissionNode<"Financial Metric">,
];

export interface TransmissionPath {
  id: EntityId;
  name: string;
  scenarioId: EntityId;
  externalEventId?: EntityId;
  companyId: EntityId;
  segmentId: EntityId;
  nodes: TransmissionPathNodes;
  summary: string;
  lastUpdated: ISODate;
}

export interface TransmissionScenario {
  id: EntityId;
  shortLabel: string;
  title: string;
  framing: string;
  known: string;
  mechanism: string;
  uncertainty: string;
  breakers: string[];
  pathIds: EntityId[];
  lastUpdated: ISODate;
}

export interface ComparisonDimension {
  id: string;
  label: string;
  description: string;
  comparable: boolean;
  caveat?: string;
}

export interface ResearchDataset {
  industrySegments: IndustrySegment[];
  companies: Company[];
  evidence: Evidence[];
  conceptRelationships: ConceptRelationship[];
  comparablePairs: ComparablePair[];
  externalEvents: ExternalEvent[];
  transmissionScenarios: TransmissionScenario[];
  transmissionPaths: TransmissionPath[];
  asOf: ISODate;
}
