/** Qualitative sample records. No financial amount or ratio is asserted here. */
import type {
  Company, ComparablePair, ComparisonDimension, ConceptRelationship, Evidence,
  ExternalEvent, IndustrySegment, ResearchDataset, Segment, TransmissionPath,
  TransmissionScenario,
} from "./types";
import { validateResearchDatasetInDevelopment } from "./validate";

export const industrySegments: IndustrySegment[] = [
  { id: "segment-ups", name: "UPS", description: "Uninterruptible power systems used to protect critical data-center loads.", inclusionCriteria: ["UPS hardware", "UPS controls", "UPS-related service explicitly tied to data centers"], exclusionCriteria: ["General energy storage without critical-power evidence"], lastUpdated: "2026-09-28" },
  { id: "segment-liquid-cooling", name: "Liquid Cooling", description: "Direct-to-chip, immersion, CDU, and supporting liquid heat-removal systems.", inclusionCriteria: ["Liquid cooling products", "CDUs", "Documented liquid-cooling deployments"], exclusionCriteria: ["Air cooling with no liquid loop"], lastUpdated: "2026-09-28" },
  { id: "segment-power-distribution", name: "Power Distribution", description: "Equipment that distributes and controls electrical power within data-center infrastructure.", inclusionCriteria: ["PDUs", "Busway", "Switchgear or switchboards used in data centers"], exclusionCriteria: ["Utility generation assets", "Products with no data-center application evidence"], lastUpdated: "2026-09-28" },
];

export const segments: Segment[] = industrySegments.map((segment) => segment.name);

export const companies: Company[] = [
  { id: "kehual-data", name: "科华数据", legalName: "科华数据股份有限公司", ticker: "002335", exchange: "SZSE", region: "China", headquartersCountry: "China", segmentIds: ["segment-ups"], segments: ["UPS"], chainRole: "Power protection and data-center infrastructure", summary: "待研究填充：业务归属、AI 数据中心敞口及关键证据。", lastUpdated: "2026-09-28" },
  { id: "kstar", name: "科士达", legalName: "深圳科士达科技股份有限公司", ticker: "002518", exchange: "SZSE", region: "China", headquartersCountry: "China", segmentIds: ["segment-ups"], segments: ["UPS"], chainRole: "UPS and critical power equipment", summary: "待研究填充：业务归属、AI 数据中心敞口及关键证据。", lastUpdated: "2026-09-28" },
  { id: "envicool", name: "英维克", legalName: "深圳市英维克科技股份有限公司", ticker: "002837", exchange: "SZSE", region: "China", headquartersCountry: "China", segmentIds: ["segment-liquid-cooling"], segments: ["Liquid Cooling"], chainRole: "Thermal management and liquid cooling", summary: "待研究填充：业务归属、AI 数据中心敞口及关键证据。", lastUpdated: "2026-09-28" },
  { id: "vertiv", name: "Vertiv", legalName: "Vertiv Holdings Co", ticker: "VRT", exchange: "NYSE", region: "Overseas", headquartersCountry: "United States", segmentIds: ["segment-ups", "segment-liquid-cooling", "segment-power-distribution"], segments: ["UPS", "Liquid Cooling", "Power Distribution"], chainRole: "Critical digital infrastructure platform", summary: "Example coverage record; conclusions must be read through ConceptRelationship.", lastUpdated: "2026-09-28" },
  { id: "eaton", name: "Eaton", legalName: "Eaton Corporation plc", ticker: "ETN", exchange: "NYSE", region: "Overseas", headquartersCountry: "Ireland", segmentIds: ["segment-ups", "segment-power-distribution"], segments: ["UPS", "Power Distribution"], chainRole: "Electrical power management", summary: "Example coverage record; conclusions must be read through ConceptRelationship.", lastUpdated: "2026-09-28" },
  { id: "schneider-electric", name: "Schneider Electric", legalName: "Schneider Electric SE", ticker: "SU", exchange: "EPA", region: "Overseas", headquartersCountry: "France", segmentIds: ["segment-ups", "segment-liquid-cooling", "segment-power-distribution"], segments: ["UPS", "Liquid Cooling", "Power Distribution"], chainRole: "Energy management and data-center infrastructure", summary: "待研究填充：业务归属、AI 数据中心敞口及关键证据。", lastUpdated: "2026-09-28" },
];

export const evidence: Evidence[] = [
  { id: "ev-kehua-ups-products", sourceType: "Company Website", sourceName: "科华数据—产品中心", sourceUrl: "https://www.kehua.com.cn/products", publishedAt: null, quoteOrFact: "科华数据官方产品中心将 UPS、高压直流和锂电一体化 UPS 电力模组列入高端电源产品，并同时展示数据中心解决方案。", verified: true, retrievedAt: "2026-09-28" },
  { id: "ev-kehua-2025-annual-report-ups", sourceType: "Annual Report", sourceName: "科华数据股份有限公司2025年年度报告", sourceUrl: "https://static.cninfo.com.cn/finalpage/2026-04-27/1225194937.PDF", publishedAt: "2026-04-27", quoteOrFact: "年报披露公司持续开发面向智算中心和数据中心的智能模块化 UPS 产品。", verified: true, retrievedAt: "2026-09-28" },

  { id: "ev-kstar-ups-products", sourceType: "Company Website", sourceName: "科士达—数据中心产品中心", sourceUrl: "https://www.kstar.com/cn/index.php/product/index/160.html?c=1&n=2", publishedAt: null, quoteOrFact: "科士达官方数据中心产品目录明确列出高频 UPS、工频 UPS、EPS 和后备机。", verified: true, retrievedAt: "2026-09-28" },
  { id: "ev-kstar-2024-annual-report", sourceType: "Annual Report", sourceName: "深圳科士达科技股份有限公司2024年年度报告", sourceUrl: "https://static.cninfo.com.cn/finalpage/2025-04-25/1223277057.PDF", publishedAt: "2025-04-25", quoteOrFact: "年报将 UPS 电源列为公司数据中心产品体系的组成部分。", verified: true, retrievedAt: "2026-09-28" },

  { id: "ev-envicool-liquid-cooling-solution", sourceType: "Company Website", sourceName: "英维克—Coolinside全链条液冷解决方案", sourceUrl: "https://www.envicool.com/solution/121.html", publishedAt: null, quoteOrFact: "英维克官方方案页展示用于数据中心的冷板式与浸没式液冷方案。", verified: true, retrievedAt: "2026-09-28" },
  { id: "ev-envicool-2025-annual-report", sourceType: "Annual Report", sourceName: "深圳市英维克科技股份有限公司2025年年度报告", sourceUrl: "https://static.cninfo.com.cn/finalpage/2026-04-21/1225142775.PDF", publishedAt: "2026-04-21", quoteOrFact: "年报称公司提供从冷板、接头、Manifold 到 CDU 的液冷全链条产品和解决方案。", verified: true, retrievedAt: "2026-09-28" },

  { id: "ev-vertiv-ups-portfolio", sourceType: "Company Website", sourceName: "Vertiv — Uninterruptible Power Supplies", sourceUrl: "https://www.vertiv.com/en-us/products-catalog/critical-power/uninterruptible-power-supplies-ups/", publishedAt: null, quoteOrFact: "Vertiv's official UPS portfolio includes three-phase systems for enterprise and hyperscale data centers.", verified: true, retrievedAt: "2026-09-28" },
  { id: "ev-vertiv-products", sourceType: "Company Website", sourceName: "Vertiv — Products and Services", sourceUrl: "https://www.vertiv.com/en-us/products/", publishedAt: null, quoteOrFact: "Vertiv lists UPS systems within its critical-power product portfolio for mission-critical infrastructure.", verified: true, retrievedAt: "2026-09-28" },
  { id: "ev-vertiv-liquid-cooling-portfolio", sourceType: "Company Website", sourceName: "Vertiv — Thermal Management", sourceUrl: "https://www.vertiv.com/en-us/products/thermal-management/cooling/", publishedAt: null, quoteOrFact: "Vertiv's official portfolio page lists air, liquid, and hybrid cooling systems for data centers.", verified: true, retrievedAt: "2026-09-28" },
  { id: "ev-vertiv-liquid-cooling-overview", sourceType: "Company Website", sourceName: "Vertiv — Liquid Cooling", sourceUrl: "https://www.vertiv.com/en-us/learn-about/liquid-cooling/", publishedAt: null, quoteOrFact: "Vertiv presents liquid-cooling options for processing-intensive data-center applications.", verified: true, retrievedAt: "2026-09-28" },

  { id: "ev-eaton-data-center-distribution", sourceType: "Company Website", sourceName: "Eaton — Data center power distribution infrastructure", sourceUrl: "https://www.eaton.com/us/en-us/markets/data-centers/infrastructure-grey-space/data-center-power-infrastructure-and-performance-optimization/grey-data-center-infrastructure-solutions.html", publishedAt: null, quoteOrFact: "Eaton's official data-center page lists busway, transformers, panelboards, switchboards, and transfer switches as power-distribution solutions.", verified: true, retrievedAt: "2026-09-28" },
  { id: "ev-eaton-pdu-portfolio", sourceType: "Company Website", sourceName: "Eaton — Power distribution units for IT equipment", sourceUrl: "https://www.eaton.com/us/en-us/products/backup-power-ups-surge-it-power-distribution/power-distribution-for-it-equipment.html", publishedAt: null, quoteOrFact: "Eaton's official portfolio includes rack PDUs for enterprise and colocation data centers.", verified: true, retrievedAt: "2026-09-28" },

  { id: "ev-schneider-ups-portfolio", sourceType: "Company Website", sourceName: "Schneider Electric — Uninterruptible Power Supply", sourceUrl: "https://www.se.com/us/en/product-category/8000-uninterruptible-power-supply-ups/", publishedAt: null, quoteOrFact: "Schneider Electric lists three-phase UPS systems for data centers and other mission-critical facilities.", verified: true, retrievedAt: "2026-09-28" },
  { id: "ev-schneider-data-center-solutions", sourceType: "Company Website", sourceName: "Schneider Electric — Data Center Solutions and Networks", sourceUrl: "https://www.se.com/ww/en/work/solutions/for-business/data-centers-and-networks/enterprise/corporate-data-center.jsp", publishedAt: null, quoteOrFact: "Schneider Electric's data-center solutions page identifies Galaxy and APC Smart-UPS offerings as data-center power-protection products.", verified: true, retrievedAt: "2026-09-28" },
  { id: "ev-schneider-modular-distribution", sourceType: "Company Website", sourceName: "Schneider Electric — Modular Power Distribution", sourceUrl: "https://www.se.com/us/en/product-range/61807-modular-power-distribution/", publishedAt: null, quoteOrFact: "Schneider Electric markets scalable three-phase power-distribution systems for data centers and high-density zones.", verified: true, retrievedAt: "2026-09-28" },
  { id: "ev-schneider-ai-power-distribution", sourceType: "Product Documentation", sourceName: "Schneider Electric — From Grid to Chip: Scalable Power Distribution for AI Data Centers", sourceUrl: "https://www.se.com/uk/en/download/document/SE-DB-AI_DataCenter/", publishedAt: "2026-04-27", quoteOrFact: "The official brochure describes Schneider Electric power-distribution technologies for AI data centers from grid to chip.", verified: true, retrievedAt: "2026-09-28" },
];

export const conceptRelationships: ConceptRelationship[] = [
  { id: "rel-kehua-ups", companyId: "kehual-data", segmentId: "segment-ups", confidenceLevel: "B", claim: "科华数据经营面向数据中心及关键负载场景的 UPS 产品。", evidenceIds: ["ev-kehua-ups-products", "ev-kehua-2025-annual-report-ups"], reasoning: "公司官网产品目录和年度报告共同确认科华数据存在 UPS 产品及相关研发活动，足以支持 Business Confirmed (B)。", whyNotHigher: "已审阅材料未单独披露 UPS 收入、订单或收入占比，因此不足以升级为 Revenue Confirmed (A)。", lastUpdated: "2026-09-28" },
  { id: "rel-kstar-ups", companyId: "kstar", segmentId: "segment-ups", confidenceLevel: "B", claim: "科士达的数据中心产品体系包含多类 UPS 产品。", evidenceIds: ["ev-kstar-ups-products", "ev-kstar-2024-annual-report"], reasoning: "官网数据中心产品目录与年度报告均明确将 UPS 列入公司产品体系，足以确认业务存在并支持 Business Confirmed (B)。", whyNotHigher: "相关材料没有提供可独立归属于 UPS 的收入、订单或收入占比，故不评为 A。", lastUpdated: "2026-09-28" },
  { id: "rel-envicool-liquid-cooling", companyId: "envicool", segmentId: "segment-liquid-cooling", confidenceLevel: "B", claim: "英维克提供覆盖冷板、CDU 与浸没式方案的数据中心液冷产品。", evidenceIds: ["ev-envicool-liquid-cooling-solution", "ev-envicool-2025-annual-report"], reasoning: "官网解决方案和年度报告确认英维克拥有液冷产品与全链条解决方案，达到 Business Confirmed (B)。", whyNotHigher: "已核验来源未单独披露液冷业务收入、订单或收入占比，因此不升级为 A。", lastUpdated: "2026-09-28" },
  { id: "rel-vertiv-ups", companyId: "vertiv", segmentId: "segment-ups", confidenceLevel: "B", claim: "Vertiv offers UPS systems for enterprise and hyperscale data centers.", evidenceIds: ["ev-vertiv-ups-portfolio", "ev-vertiv-products"], reasoning: "Official product materials confirm an active UPS portfolio for data centers, supporting Business Confirmed (B).", whyNotHigher: "The reviewed materials do not separately disclose UPS revenue, orders, or revenue share, so the relationship is not upgraded to Revenue Confirmed (A).", lastUpdated: "2026-09-28" },
  { id: "rel-vertiv-liquid-cooling", companyId: "vertiv", segmentId: "segment-liquid-cooling", confidenceLevel: "B", claim: "Vertiv participates in data-center liquid cooling through an explicitly marketed product portfolio.", evidenceIds: ["ev-vertiv-liquid-cooling-portfolio", "ev-vertiv-liquid-cooling-overview"], reasoning: "Official product materials confirm Vertiv offers liquid-cooling solutions for data centers, supporting Business Confirmed (B).", whyNotHigher: "The reviewed materials do not separately disclose liquid-cooling revenue, orders, or revenue share, so the relationship is not upgraded to Revenue Confirmed (A).", lastUpdated: "2026-09-28" },
  { id: "rel-eaton-power-distribution", companyId: "eaton", segmentId: "segment-power-distribution", confidenceLevel: "B", claim: "Eaton provides multiple categories of power-distribution equipment for data centers.", evidenceIds: ["ev-eaton-data-center-distribution", "ev-eaton-pdu-portfolio"], reasoning: "Official Eaton pages confirm data-center power-distribution products including PDUs, busway, transformers and switchboards, supporting Business Confirmed (B).", whyNotHigher: "The reviewed sources do not separately disclose revenue, orders, or revenue share for this defined exposure, so A is not supported.", lastUpdated: "2026-09-28" },
  { id: "rel-schneider-ups", companyId: "schneider-electric", segmentId: "segment-ups", confidenceLevel: "B", claim: "Schneider Electric provides UPS systems for data centers under its Galaxy and APC portfolios.", evidenceIds: ["ev-schneider-ups-portfolio", "ev-schneider-data-center-solutions"], reasoning: "Official product and data-center solution pages confirm Schneider Electric has an active UPS offering, supporting Business Confirmed (B).", whyNotHigher: "The reviewed evidence does not isolate UPS revenue, orders, or revenue share, so the relationship is not classified as A.", lastUpdated: "2026-09-28" },
  { id: "rel-schneider-power-distribution", companyId: "schneider-electric", segmentId: "segment-power-distribution", confidenceLevel: "B", claim: "Schneider Electric provides power-distribution systems for conventional and AI data centers.", evidenceIds: ["ev-schneider-modular-distribution", "ev-schneider-ai-power-distribution"], reasoning: "Official product documentation confirms Schneider Electric markets power-distribution systems specifically for data centers, supporting Business Confirmed (B).", whyNotHigher: "No reviewed source separately quantifies revenue, orders, or revenue share for this defined relationship, so A is not supported.", lastUpdated: "2026-09-28" },
];

export const comparablePairs: ComparablePair[] = [
  {
    id: "pair-kehua-vertiv",
    companyAId: "kehual-data",
    companyBId: "vertiv",
    sharedSegmentIds: ["segment-ups"],
    comparableDimensions: [
      { dimension: "Core product exposure", companyA: "UPS and high-end critical-power products for data-center applications", companyB: "UPS systems for enterprise and hyperscale data centers", assessment: "Comparable", reason: "Both companies explicitly market UPS products used in data-center critical-power infrastructure.", evidenceIds: ["ev-kehua-ups-products", "ev-kehua-2025-annual-report-ups", "ev-vertiv-ups-portfolio"] },
      { dimension: "Infrastructure role", companyA: "Backup power and load protection", companyB: "Backup power and critical-load protection", assessment: "Comparable", reason: "The documented products serve the same broad role of protecting data-center electrical loads from power interruption.", evidenceIds: ["ev-kehua-ups-products", "ev-vertiv-ups-portfolio"] },
    ],
    nonComparableDimensions: [
      { dimension: "Portfolio breadth", companyA: "High-end power, data-center services and clean-energy activities", companyB: "Critical power, thermal management, racks, monitoring and services", assessment: "Not Directly Comparable", reason: "The official portfolios show different group-level business boundaries, so company-wide operating metrics should not be treated as like-for-like.", evidenceIds: ["ev-kehua-ups-products", "ev-vertiv-products"] },
      { dimension: "UPS disclosure granularity", companyA: "UPS products and development activity are disclosed without standalone UPS financial contribution", companyB: "UPS portfolio is disclosed without standalone UPS financial contribution in the reviewed product materials", assessment: "Partially Comparable", reason: "Product participation is traceable, but the reviewed sources do not provide a common standalone revenue or order denominator.", evidenceIds: ["ev-kehua-2025-annual-report-ups", "ev-vertiv-ups-portfolio"] },
    ],
    summary: "Useful for comparing UPS exposure and common data-center power drivers; not a direct whole-company financial or valuation comparable without normalization.",
    evidenceIds: ["ev-kehua-ups-products", "ev-kehua-2025-annual-report-ups", "ev-vertiv-ups-portfolio", "ev-vertiv-products"],
    lastUpdated: "2026-09-28",
  },
  {
    id: "pair-kstar-eaton",
    companyAId: "kstar",
    companyBId: "eaton",
    sharedSegmentIds: [],
    comparableDimensions: [
      { dimension: "Data-center end market", companyA: "UPS products within a data-center infrastructure portfolio", companyB: "Power-distribution products for enterprise and colocation data centers", assessment: "Partially Comparable", reason: "Both companies supply critical electrical infrastructure to data centers, but their evidenced product categories are adjacent rather than identical.", evidenceIds: ["ev-kstar-ups-products", "ev-kstar-2024-annual-report", "ev-eaton-data-center-distribution", "ev-eaton-pdu-portfolio"] },
      { dimension: "Industry demand driver", companyA: "Continuity and protection of data-center power", companyB: "Distribution and control of data-center power", assessment: "Partially Comparable", reason: "Both exposures can respond to data-center electrical buildout, while product content per project and purchasing decisions may differ.", evidenceIds: ["ev-kstar-ups-products", "ev-eaton-data-center-distribution"] },
    ],
    nonComparableDimensions: [
      { dimension: "Product category", companyA: "UPS", companyB: "Power distribution equipment including PDUs, busway, transformers and switchboards", assessment: "Not Directly Comparable", reason: "The current evidence supports different covered segments; the pair should not be presented as a direct product peer comparison.", evidenceIds: ["ev-kstar-ups-products", "ev-eaton-data-center-distribution"] },
      { dimension: "Disclosure boundary", companyA: "Data-center UPS participation is confirmed without standalone UPS financial disclosure", companyB: "Data-center power-distribution participation is confirmed without a standalone comparable financial measure", assessment: "Not Directly Comparable", reason: "No common segment revenue, order or margin denominator is available in the reviewed evidence.", evidenceIds: ["ev-kstar-2024-annual-report", "ev-eaton-pdu-portfolio"] },
    ],
    summary: "Useful for studying adjacent data-center electrical-infrastructure demand, but not a direct segment, operating or valuation comparable.",
    evidenceIds: ["ev-kstar-ups-products", "ev-kstar-2024-annual-report", "ev-eaton-data-center-distribution", "ev-eaton-pdu-portfolio"],
    lastUpdated: "2026-09-28",
  },
  {
    id: "pair-envicool-vertiv",
    companyAId: "envicool",
    companyBId: "vertiv",
    sharedSegmentIds: ["segment-liquid-cooling"],
    comparableDimensions: [
      { dimension: "Core product exposure", companyA: "Cold plates, connectors, manifolds, CDUs and immersion solutions", companyB: "Liquid-cooling systems and solutions for data centers", assessment: "Comparable", reason: "Official materials confirm both companies participate in data-center liquid cooling.", evidenceIds: ["ev-envicool-liquid-cooling-solution", "ev-envicool-2025-annual-report", "ev-vertiv-liquid-cooling-portfolio"] },
      { dimension: "Industry demand driver", companyA: "Cooling higher-density computing infrastructure", companyB: "Cooling processing-intensive and high-density data-center applications", assessment: "Comparable", reason: "Both documented offerings address the thermal requirements created by concentrated computing loads.", evidenceIds: ["ev-envicool-liquid-cooling-solution", "ev-vertiv-liquid-cooling-overview"] },
    ],
    nonComparableDimensions: [
      { dimension: "Portfolio breadth", companyA: "Thermal-management and liquid-cooling products", companyB: "Broader critical infrastructure spanning power, thermal management, racks and services", assessment: "Not Directly Comparable", reason: "Liquid cooling is a shared exposure, but the companies' wider portfolios are not equivalent.", evidenceIds: ["ev-envicool-2025-annual-report", "ev-vertiv-products"] },
      { dimension: "Liquid-cooling disclosure granularity", companyA: "Liquid-cooling products are identified without standalone revenue contribution", companyB: "Liquid-cooling products are identified without standalone revenue contribution", assessment: "Partially Comparable", reason: "Business presence is confirmed for both companies, but the reviewed sources do not support normalized revenue, order or margin comparison.", evidenceIds: ["ev-envicool-2025-annual-report", "ev-vertiv-liquid-cooling-portfolio"] },
    ],
    summary: "Useful for comparing liquid-cooling product exposure and common high-density-compute demand; not a one-to-one whole-company comparable.",
    evidenceIds: ["ev-envicool-liquid-cooling-solution", "ev-envicool-2025-annual-report", "ev-vertiv-liquid-cooling-portfolio", "ev-vertiv-liquid-cooling-overview", "ev-vertiv-products"],
    lastUpdated: "2026-09-28",
  },
];

export const externalEvents: ExternalEvent[] = [
  { id: "event-ai-capex-scenario", eventType: "AI Capex", title: "What if AI / hyperscaler data-center capex increases?", description: "A scenario-analysis input, not a claim that a quantified capex increase has occurred.", occurredAt: "2026-09-29", affectedSegmentIds: ["segment-ups", "segment-power-distribution", "segment-liquid-cooling"], evidenceIds: [], lastUpdated: "2026-09-29" },
  { id: "event-rack-density-scenario", eventType: "Power Density", title: "What if rack power density increases?", description: "A scenario-analysis input used to examine cooling and power-infrastructure mechanisms, not a financial forecast.", occurredAt: "2026-09-29", affectedSegmentIds: ["segment-liquid-cooling", "segment-power-distribution"], evidenceIds: [], lastUpdated: "2026-09-29" },
];

export const transmissionScenarios: TransmissionScenario[] = [
  {
    id: "scenario-ai-capex",
    shortLabel: "AI Data Center Capex",
    title: "AI / Hyperscaler Data Center Capex Increase",
    framing: "What if AI / hyperscaler data-center capex increases?",
    known: "Existing Evidence confirms selected companies offer UPS or power-distribution products for data-center applications.",
    mechanism: "Additional construction or expansion can create more infrastructure requirements, which may create project opportunities for verified suppliers.",
    uncertainty: "Financial impact depends on project wins, timing, pricing, product mix, delivery capacity, working capital and customer behavior.",
    breakers: ["Capex delay", "Project timing", "Price competition", "Supply constraints", "Product mix", "Customer concentration / geographic mix"],
    pathIds: ["path-capex-kehua-ups", "path-capex-vertiv-ups", "path-capex-eaton-distribution"],
    lastUpdated: "2026-09-29",
  },
  {
    id: "scenario-rack-density",
    shortLabel: "Rack Power Density",
    title: "Rack Power Density Increase",
    framing: "What if rack power density increases?",
    known: "Existing Evidence confirms Envicool and Vertiv offer liquid-cooling products or solutions for data-center applications.",
    mechanism: "Higher concentrated heat loads can strain conventional thermal architecture and increase the relevance of liquid-cooling infrastructure.",
    uncertainty: "Adoption, project design, competitive pricing, qualification cycles and product mix determine whether technical demand becomes company revenue or cash flow.",
    breakers: ["Deployment timing", "Alternative cooling architecture", "Price competition", "Qualification cycles", "Supply constraints", "Product mix"],
    pathIds: ["path-density-envicool-liquid-cooling", "path-density-vertiv-liquid-cooling"],
    lastUpdated: "2026-09-29",
  },
];

function createCapexPath(input: {
  id: string;
  companyId: string;
  companyName: string;
  segmentId: string;
  segmentName: string;
  relationshipId: string;
  evidenceIds: string[];
  exposure: string;
}): TransmissionPath {
  return {
    id: input.id,
    name: `${input.companyName} — ${input.segmentName}`,
    scenarioId: "scenario-ai-capex",
    externalEventId: "event-ai-capex-scenario",
    companyId: input.companyId,
    segmentId: input.segmentId,
    summary: "Directional research hypothesis linking a capex scenario to operating and financial metrics through explicit intermediate mechanisms.",
    lastUpdated: "2026-09-29",
    nodes: [
      { id: `${input.id}-driver`, stage: "External Driver", label: "What if AI / hyperscaler data-center capex increases?", explanation: "Treat higher capex as a scenario input rather than an asserted current fact.", whyItMatters: "Capital allocation can affect the volume and timing of new data-center construction or expansion.", caveat: "No capex amount or growth rate is assumed in this scenario.", confidence: "Low", evidenceIds: [], entityId: "event-ai-capex-scenario" },
      { id: `${input.id}-industry`, stage: "Industry Effect", label: "Construction and expansion requirements may rise", explanation: "More projects can increase demand for critical electrical and cooling infrastructure before any supplier-level outcome is known.", whyItMatters: "This is the bridge between external spending and addressable equipment demand.", caveat: "Capex can shift toward land, buildings, compute or networking rather than the covered infrastructure categories.", confidence: "Medium", evidenceIds: input.evidenceIds.slice(0, 1) },
      { id: `${input.id}-segment`, stage: "Segment", label: `${input.segmentName} project demand`, explanation: `${input.segmentName} requirements may increase when additional data-center capacity needs relevant infrastructure.`, whyItMatters: "Segment demand must exist before company exposure can translate into operating activity.", caveat: "Project architecture, redundancy design and procurement choices determine actual content per project.", confidence: "Medium", evidenceIds: input.evidenceIds, entityId: input.segmentId },
      { id: `${input.id}-exposure`, stage: "Company Exposure", label: `${input.companyName} — ${input.segmentName}`, explanation: input.exposure, whyItMatters: "Verified product exposure makes the company eligible to compete for relevant projects.", caveat: "Verified exposure does not establish project wins, market share or the size of revenue contribution.", confidence: "High", evidenceIds: input.evidenceIds, entityId: input.relationshipId, companyId: input.companyId, segmentId: input.segmentId, relationshipId: input.relationshipId },
      { id: `${input.id}-business`, stage: "Business Metric", label: "Orders, backlog and shipment volume", explanation: "If projects are won and delivered, operating indicators may change before reported financial results.", whyItMatters: "Orders, backlog and shipments are observable bridges between opportunity and recognized revenue.", caveat: "Award timing, cancellations, delivery schedules and backlog definitions can weaken the signal.", confidence: "Low", evidenceIds: [] },
      { id: `${input.id}-financial`, stage: "Financial Metric", label: "Potential impact on revenue, gross margin, working capital and cash flow", explanation: "The scenario may affect financial metrics only after project conversion, delivery and accounting recognition.", whyItMatters: "This is the final measurement layer, not an automatic consequence of capex direction.", caveat: "Direction and magnitude remain unverified and can differ across metrics because of pricing, mix, costs and payment timing.", confidence: "Low", evidenceIds: [] },
    ],
  };
}

function createDensityPath(input: {
  id: string;
  companyId: string;
  companyName: string;
  relationshipId: string;
  evidenceIds: string[];
  exposure: string;
}): TransmissionPath {
  return {
    id: input.id,
    name: `${input.companyName} — Liquid Cooling`,
    scenarioId: "scenario-rack-density",
    externalEventId: "event-rack-density-scenario",
    companyId: input.companyId,
    segmentId: "segment-liquid-cooling",
    summary: "Directional research hypothesis linking higher rack density to liquid-cooling operating and financial metrics through explicit intermediate mechanisms.",
    lastUpdated: "2026-09-29",
    nodes: [
      { id: `${input.id}-driver`, stage: "External Driver", label: "What if rack power density increases?", explanation: "Treat higher compute density as a scenario input, not a quantified forecast.", whyItMatters: "More power concentrated in a rack generally raises the heat load that infrastructure must manage.", caveat: "The scenario does not assume a specific rack-density threshold or adoption rate.", confidence: "Low", evidenceIds: [], entityId: "event-rack-density-scenario" },
      { id: `${input.id}-industry`, stage: "Industry Effect", label: "Heat-load and power constraints intensify", explanation: "Concentrated compute can make thermal removal and facility power design more demanding.", whyItMatters: "Technical constraints are the mechanism connecting rack density to infrastructure redesign.", caveat: "Air, hybrid and liquid architectures can coexist; higher density does not mandate one solution in every project.", confidence: "Medium", evidenceIds: input.evidenceIds.slice(0, 1) },
      { id: `${input.id}-segment`, stage: "Segment", label: "Liquid-cooling requirements may increase", explanation: "Liquid-cooling products may become relevant to more high-density data-center deployments.", whyItMatters: "The segment is the investable supply-chain layer between technical need and supplier exposure.", caveat: "Adoption depends on facility design, server compatibility, service capability and total cost.", confidence: "Medium", evidenceIds: input.evidenceIds, entityId: "segment-liquid-cooling" },
      { id: `${input.id}-exposure`, stage: "Company Exposure", label: `${input.companyName} — Liquid Cooling`, explanation: input.exposure, whyItMatters: "Verified liquid-cooling products make the company eligible to participate in relevant deployments.", caveat: "Product availability does not establish market share, project awards or standalone revenue contribution.", confidence: "High", evidenceIds: input.evidenceIds, entityId: input.relationshipId, companyId: input.companyId, segmentId: "segment-liquid-cooling", relationshipId: input.relationshipId },
      { id: `${input.id}-business`, stage: "Business Metric", label: "Project opportunities, product mix, orders and shipments", explanation: "Commercial adoption may first appear in project activity and product-mix changes.", whyItMatters: "Operating indicators test whether a technical trend is becoming realized business demand.", caveat: "Qualification cycles, project delays, competition and disclosure practices can obscure the signal.", confidence: "Low", evidenceIds: [] },
      { id: `${input.id}-financial`, stage: "Financial Metric", label: "Potential impact on revenue, gross margin, working capital and cash flow", explanation: "Financial effects require successful conversion, delivery and recognition of liquid-cooling business.", whyItMatters: "This final layer evaluates whether operating activity becomes reported financial performance.", caveat: "Revenue timing, mix, pricing, ramp costs and payment terms can cause different or offsetting effects.", confidence: "Low", evidenceIds: [] },
    ],
  };
}

export const transmissionPaths: TransmissionPath[] = [
  createCapexPath({ id: "path-capex-kehua-ups", companyId: "kehual-data", companyName: "科华数据", segmentId: "segment-ups", segmentName: "UPS", relationshipId: "rel-kehua-ups", evidenceIds: ["ev-kehua-ups-products", "ev-kehua-2025-annual-report-ups"], exposure: "Official product and annual-report materials confirm UPS products for data-center and intelligent-computing applications." }),
  createCapexPath({ id: "path-capex-vertiv-ups", companyId: "vertiv", companyName: "Vertiv", segmentId: "segment-ups", segmentName: "UPS", relationshipId: "rel-vertiv-ups", evidenceIds: ["ev-vertiv-ups-portfolio", "ev-vertiv-products"], exposure: "Official materials confirm Vertiv offers UPS systems for enterprise and hyperscale data centers." }),
  createCapexPath({ id: "path-capex-eaton-distribution", companyId: "eaton", companyName: "Eaton", segmentId: "segment-power-distribution", segmentName: "Power Distribution", relationshipId: "rel-eaton-power-distribution", evidenceIds: ["ev-eaton-data-center-distribution", "ev-eaton-pdu-portfolio"], exposure: "Official materials confirm Eaton provides multiple power-distribution equipment categories for data centers." }),
  createDensityPath({ id: "path-density-envicool-liquid-cooling", companyId: "envicool", companyName: "英维克", relationshipId: "rel-envicool-liquid-cooling", evidenceIds: ["ev-envicool-liquid-cooling-solution", "ev-envicool-2025-annual-report"], exposure: "Official solution and annual-report materials confirm a liquid-cooling portfolio spanning cold plates, manifolds, CDUs and immersion solutions." }),
  createDensityPath({ id: "path-density-vertiv-liquid-cooling", companyId: "vertiv", companyName: "Vertiv", relationshipId: "rel-vertiv-liquid-cooling", evidenceIds: ["ev-vertiv-liquid-cooling-portfolio", "ev-vertiv-liquid-cooling-overview"], exposure: "Official materials confirm Vertiv provides liquid-cooling solutions for data-center applications." }),
];

export const comparisonDimensions: ComparisonDimension[] = [
  { id: "product-overlap", label: "Product overlap", description: "Compare only overlapping critical-power or thermal-management product scope.", comparable: true },
  { id: "segment-boundary", label: "Segment boundary", description: "Reported segment definitions and revenue scope differ across issuers.", comparable: false, caveat: "Requires normalized exposure estimates." },
  { id: "market-mix", label: "Customer & geography mix", description: "Hyperscaler, colocation and enterprise exposure may not match.", comparable: false, caveat: "Use as contextual evidence, not a direct multiple bridge." },
];

export const researchDataset: ResearchDataset = { industrySegments, companies, evidence, conceptRelationships, comparablePairs, externalEvents, transmissionScenarios, transmissionPaths, asOf: "2026-09-29" };

validateResearchDatasetInDevelopment(researchDataset);

export const evidenceById = new Map(evidence.map((item) => [item.id, item]));
export const companyById = new Map(companies.map((item) => [item.id, item]));
export const segmentById = new Map(industrySegments.map((item) => [item.id, item]));
