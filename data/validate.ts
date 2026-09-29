import type {
  ConceptRelationship,
  EntityId,
  ResearchDataset,
  TransmissionStage,
} from "./types";

export interface ValidationIssue {
  entityType: string;
  entityId: EntityId;
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

const REQUIRED_TRANSMISSION_STAGES: readonly TransmissionStage[] = [
  "External Driver",
  "Industry Effect",
  "Segment",
  "Company Exposure",
  "Business Metric",
  "Financial Metric",
];

function missingEvidenceIssues(
  entityType: string,
  entityId: EntityId,
  evidenceIds: EntityId[],
  knownEvidenceIds: ReadonlySet<EntityId>,
): ValidationIssue[] {
  return evidenceIds
    .filter((evidenceId) => !knownEvidenceIds.has(evidenceId))
    .map((evidenceId) => ({
      entityType,
      entityId,
      field: "evidenceIds",
      message: `Evidence ID "${evidenceId}" does not exist.`,
    }));
}

function validateRelationshipEvidence(
  relationship: ConceptRelationship,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (relationship.confidenceLevel !== "E" && relationship.evidenceIds.length === 0) {
    issues.push({
      entityType: "ConceptRelationship",
      entityId: relationship.id,
      field: "evidenceIds",
      message: `Confidence level ${relationship.confidenceLevel} requires at least one Evidence ID.`,
    });
  }

  if (relationship.confidenceLevel === "E" && relationship.reasoning.trim().length < 20) {
    issues.push({
      entityType: "ConceptRelationship",
      entityId: relationship.id,
      field: "reasoning",
      message: "Level E must include a substantive explanation for why no reliable evidence was found.",
    });
  }

  return issues;
}

export function validateResearchDataset(dataset: ResearchDataset): ValidationResult {
  const issues: ValidationIssue[] = [];
  const companyIds = new Set(dataset.companies.map((company) => company.id));
  const segmentIds = new Set(dataset.industrySegments.map((segment) => segment.id));
  const evidenceIds = new Set(dataset.evidence.map((item) => item.id));
  const relationshipsById = new Map(dataset.conceptRelationships.map((relationship) => [relationship.id, relationship]));
  const transmissionConfidenceValues = new Set(["High", "Medium", "Low"]);

  for (const relationship of dataset.conceptRelationships) {
    if (!companyIds.has(relationship.companyId)) {
      issues.push({ entityType: "ConceptRelationship", entityId: relationship.id, field: "companyId", message: `Company ID "${relationship.companyId}" does not exist.` });
    }
    if (!segmentIds.has(relationship.segmentId)) {
      issues.push({ entityType: "ConceptRelationship", entityId: relationship.id, field: "segmentId", message: `Segment ID "${relationship.segmentId}" does not exist.` });
    }
    issues.push(...missingEvidenceIssues("ConceptRelationship", relationship.id, relationship.evidenceIds, evidenceIds));
    issues.push(...validateRelationshipEvidence(relationship));
    if (!relationship.whyNotHigher.trim()) {
      issues.push({ entityType: "ConceptRelationship", entityId: relationship.id, field: "whyNotHigher", message: "A concise explanation of why the relationship is not rated higher is required." });
    }
  }

  for (const pair of dataset.comparablePairs) {
    for (const [field, companyId] of [["companyAId", pair.companyAId], ["companyBId", pair.companyBId]] as const) {
      if (!companyIds.has(companyId)) {
        issues.push({ entityType: "ComparablePair", entityId: pair.id, field, message: `Company ID "${companyId}" does not exist.` });
      }
    }
    for (const segmentId of pair.sharedSegmentIds) {
      if (!segmentIds.has(segmentId)) {
        issues.push({ entityType: "ComparablePair", entityId: pair.id, field: "sharedSegmentIds", message: `Segment ID "${segmentId}" does not exist.` });
      }
    }
    issues.push(...missingEvidenceIssues("ComparablePair", pair.id, pair.evidenceIds, evidenceIds));
    for (const dimension of [...pair.comparableDimensions, ...pair.nonComparableDimensions]) {
      issues.push(...missingEvidenceIssues("ComparableDimension", `${pair.id}/${dimension.dimension}`, dimension.evidenceIds, evidenceIds));
    }
  }

  for (const event of dataset.externalEvents) {
    issues.push(...missingEvidenceIssues("ExternalEvent", event.id, event.evidenceIds, evidenceIds));
  }

  for (const path of dataset.transmissionPaths) {
    if (!companyIds.has(path.companyId)) {
      issues.push({ entityType: "TransmissionPath", entityId: path.id, field: "companyId", message: `Company ID "${path.companyId}" does not exist.` });
    }
    if (!segmentIds.has(path.segmentId)) {
      issues.push({ entityType: "TransmissionPath", entityId: path.id, field: "segmentId", message: `Segment ID "${path.segmentId}" does not exist.` });
    }

    if (path.nodes.length !== REQUIRED_TRANSMISSION_STAGES.length) {
      issues.push({ entityType: "TransmissionPath", entityId: path.id, field: "nodes", message: `Expected exactly 6 nodes, received ${path.nodes.length}.` });
    }

    REQUIRED_TRANSMISSION_STAGES.forEach((expectedStage, index) => {
      const node = path.nodes[index];
      if (!node || node.stage !== expectedStage) {
        issues.push({ entityType: "TransmissionPath", entityId: path.id, field: `nodes[${index}]`, message: `Expected stage "${expectedStage}", received "${node?.stage ?? "missing"}".` });
      }
    });

    for (const node of path.nodes) {
      issues.push(...missingEvidenceIssues("TransmissionNode", `${path.id}/${node.id}`, node.evidenceIds, evidenceIds));
      if (!transmissionConfidenceValues.has(node.confidence)) {
        issues.push({ entityType: "TransmissionNode", entityId: `${path.id}/${node.id}`, field: "confidence", message: `Transmission confidence "${node.confidence}" is invalid; expected High, Medium or Low.` });
      }
    }

    const pathEvidenceIds = new Set(path.nodes.flatMap((node) => node.evidenceIds));
    if (pathEvidenceIds.size === 0) {
      issues.push({ entityType: "TransmissionPath", entityId: path.id, field: "nodes.evidenceIds", message: "Each TransmissionPath requires at least one Evidence reference." });
    }

    const companyExposureNode = path.nodes[3];
    if (!companyIds.has(companyExposureNode.companyId)) {
      issues.push({ entityType: "TransmissionNode", entityId: `${path.id}/${companyExposureNode.id}`, field: "companyId", message: `Company ID "${companyExposureNode.companyId}" does not exist.` });
    }
    if (!segmentIds.has(companyExposureNode.segmentId)) {
      issues.push({ entityType: "TransmissionNode", entityId: `${path.id}/${companyExposureNode.id}`, field: "segmentId", message: `Segment ID "${companyExposureNode.segmentId}" does not exist.` });
    }
    if (companyExposureNode.companyId !== path.companyId || companyExposureNode.segmentId !== path.segmentId) {
      issues.push({ entityType: "TransmissionNode", entityId: `${path.id}/${companyExposureNode.id}`, field: "companyId/segmentId", message: "Company Exposure references must match the parent TransmissionPath." });
    }
    const relationship = relationshipsById.get(companyExposureNode.relationshipId);
    if (!relationship) {
      issues.push({ entityType: "TransmissionNode", entityId: `${path.id}/${companyExposureNode.id}`, field: "relationshipId", message: `ConceptRelationship ID "${companyExposureNode.relationshipId}" does not exist.` });
    } else if (relationship.companyId !== companyExposureNode.companyId || relationship.segmentId !== companyExposureNode.segmentId) {
      issues.push({ entityType: "TransmissionNode", entityId: `${path.id}/${companyExposureNode.id}`, field: "relationshipId", message: `ConceptRelationship "${relationship.id}" does not match the node company and segment.` });
    }

    const financialNode = path.nodes[5];
    const financialText = [financialNode.label, financialNode.explanation, financialNode.whyItMatters, financialNode.caveat].join(" ");
    const specificForecastPattern = /(?:[$€£¥]\s*\d|\b\d+(?:\.\d+)?\s*%|\b(?:EPS|target price|price target|revenue|gross margin|working capital|cash flow)\b[^.\n]{0,30}\b\d+(?:\.\d+)?)/i;
    if (specificForecastPattern.test(financialText)) {
      issues.push({ entityType: "TransmissionNode", entityId: `${path.id}/${financialNode.id}`, field: "Financial Metric", message: "Financial Metric must not contain a specific forecast number, percentage, EPS or target price." });
    }
  }

  const pathIds = new Set(dataset.transmissionPaths.map((path) => path.id));
  for (const scenario of dataset.transmissionScenarios) {
    for (const pathId of scenario.pathIds) {
      if (!pathIds.has(pathId)) {
        issues.push({ entityType: "TransmissionScenario", entityId: scenario.id, field: "pathIds", message: `TransmissionPath ID "${pathId}" does not exist.` });
      }
    }
  }

  return { valid: issues.length === 0, issues };
}

export function validateResearchDatasetInDevelopment(dataset: ResearchDataset): void {
  if (process.env.NODE_ENV !== "development") return;

  const result = validateResearchDataset(dataset);
  if (result.valid) {
    console.info("[data-validation] Research dataset passed integrity checks.");
    return;
  }

  for (const issue of result.issues) {
    console.error(
      `[data-validation] ${issue.entityType} "${issue.entityId}" field "${issue.field}": ${issue.message}`,
    );
  }
}
