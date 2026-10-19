export const roleGuides: Record<
  string,
  { responsibility: string; application: string; pages: number[] }
> = {
  "Chen Yue": {
    responsibility:
      "CEO at the head of the executive reporting structure; the four functional directors report to her.",
    application:
      "Coordinate the executive team, resolve trade-offs and bring a coherent strategic proposal to the Board. This is a governance application of the disclosed structure.",
    pages: [13, 15],
  },
  "Farrukh Jamil": {
    responsibility:
      "Staff recruitment, retention, training, and health and safety.",
    application:
      "Investigate turnover, training effectiveness, workloads and wellbeing. Work with Operations when service targets affect staff behaviour.",
    pages: [14, 15],
  },
  "Dr Maria Chandler": {
    responsibility:
      "Call centre operations, software development, and sustainability.",
    application:
      "Own operational improvement and technology delivery; assess service continuity, implementation risks and evidence of sustainability progress.",
    pages: [14, 15, 23],
  },
  "Tshepo Batane": {
    responsibility: "Financial reporting, management accounting, and treasury.",
    application:
      "Reconcile conflicting management information, challenge investment assumptions, assess funding capacity and report the financial implications to the Board.",
    pages: [14, 15],
  },
  "Noor Ebbini": {
    responsibility: "Marketing, client liaison, and public relations.",
    application:
      "Test whether service promises match delivery, gather client evidence and coordinate accurate communications when an incident threatens trust.",
    pages: [14, 15],
  },
  "Murat Mutlu": {
    responsibility:
      "Non-Executive Chair; serves on Audit, Risk and Sustainability, and Nomination.",
    application:
      "Suggested contribution: lead effective Board discussion, invite challenge and manage conflicts. His contract-law background may help scrutinise client and supplier terms. The source does not expressly label the Chair independent.",
    pages: [13, 16],
  },
  "Kyle Keimer": {
    responsibility:
      "Senior Independent Director; serves on Audit, Remuneration, and Nomination.",
    application:
      "Suggested contribution: provide independent challenge and an alternative route for concerns about Board leadership; apply his service-efficiency experience without overlooking quality.",
    pages: [14, 16],
  },
  "Mirjana Churlin": {
    responsibility:
      "Independent Non-Executive Director; serves on Audit, Risk and Sustainability, and Remuneration.",
    application:
      "Suggested contribution: scrutinise evidence, training outcomes, workforce incentives and risk reporting. Her education background informs questions; it does not make her the executive owner of training.",
    pages: [15, 16],
  },
  "Alaor Leite": {
    responsibility:
      "Independent Non-Executive Director; serves on Risk and Sustainability, Remuneration, and Nomination.",
    application:
      "Suggested contribution: challenge financing, risk and incentive assumptions using his senior finance experience. He is not listed as an Audit Committee member; do not assign him that role by inference.",
    pages: [15, 16],
  },
};

export const committeeGuides = [
  {
    name: "Audit",
    focus:
      "Suggested oversight: reporting integrity, internal controls and independent assurance. The Chief Internal Auditor reports to this committee’s convener.",
  },
  {
    name: "Risk & Sustainability",
    focus:
      "Suggested oversight: major risk exposure, resilience, sustainability reporting and the evidence behind environmental and workforce claims.",
  },
  {
    name: "Remuneration",
    focus:
      "Suggested oversight: pay and incentive design, including whether performance rewards encourage behaviour consistent with service quality.",
  },
  {
    name: "Nomination",
    focus:
      "Suggested oversight: Board composition, succession, skills and effective appointments. Day-to-day agent recruitment remains an HR responsibility.",
  },
];

export type ExamTrigger = {
  id: string;
  title: string;
  category: "People" | "Governance" | "Technology" | "Finance & ESG";
  kind: "Case tension" | "Hypothetical development";
  evidence: string;
  pages: number[];
  distinction: string;
  development: string;
  owners: string;
  response: string[];
  question: string;
};
export const examTriggers: ExamTrigger[] = [
  {
    id: "career-development",
    title: "Development promises vs limited promotion",
    category: "People",
    kind: "Case tension",
    evidence:
      "The company describes development as a way to retain agents (p. 17). The blogger describes few manager vacancies, limited promotion and a small pay premium for supervisors (p. 25).",
    pages: [12, 17, 25],
    distinction:
      "This is a tension between corporate disclosure and an individual account, not proof that training is absent or the disclosure is false. Skills development and promotion are different things.",
    development:
      "A fictional exam exhibit could report rising resignations among experienced agents or complaints about career opportunities.",
    owners:
      "Farrukh Jamil leads; Chen Yue coordinates. Remuneration can scrutinise incentives; Nomination considers Board succession, not ordinary agent promotions.",
    response: [
      "Compare turnover, exit interviews, pay progression and training completion by centre and tenure.",
      "Consider specialist skill pathways, transparent promotion criteria and coaching; cost the options and monitor retention.",
      "Give the Board a balanced account of the evidence and avoid dismissing staff concerns merely because formal training exists.",
    ],
    question:
      "Advise the Board how to investigate the apparent discrepancy and improve retention without promising promotions that do not exist.",
  },
  {
    id: "wellbeing",
    title: "Regular breaks vs reported discomfort",
    category: "People",
    kind: "Case tension",
    evidence:
      "The risk disclosure says Vennlisk monitors regular breaks. The blogger reports back pain, eyestrain, noise and fatigue despite an adjustable chair.",
    pages: [17, 25],
    distinction:
      "Discomfort does not prove breaks were missed. Break monitoring may be operating while ergonomic and workload risks remain.",
    development:
      "A fictional staff survey could reveal wider health concerns or increasing absence.",
    owners:
      "Farrukh Jamil owns health and safety; Dr Maria Chandler implements operational changes. Risk and Sustainability can challenge residual exposure.",
    response: [
      "Check break records, workstation assessments, absence patterns and confidential employee feedback.",
      "Assess noise, lighting, posture and workload; involve staff in practical improvements.",
      "Report residual risk, costs and service effects; test whether changes improve wellbeing rather than only completion of a checklist.",
    ],
    question:
      "Evaluate whether the disclosed control is sufficient and recommend proportionate action on employee wellbeing.",
  },
  {
    id: "quality-pressure",
    title: "Outstanding service vs pressure to rush calls",
    category: "People",
    kind: "Case tension",
    evidence:
      "The mission prioritises an outstanding call experience. The source warns against pursuing low handle times at the expense of resolution and satisfaction; the blogger reports pressure to move holiday callers through quickly.",
    pages: [8, 12, 13, 25],
    distinction:
      "These passages identify a potential incentive conflict. They do not establish company-wide misconduct or prove that all agents are rushing.",
    development:
      "A fictional dashboard could show falling AHT alongside lower FCR, more complaints or repeat calls.",
    owners:
      "Dr Maria Chandler leads performance review with Farrukh Jamil. Noor Ebbini assesses client impact; Remuneration can challenge incentive design.",
    response: [
      "Segment results by client, complexity and time period; review call samples and repeat demand.",
      "Use balanced targets covering FCR, satisfaction, quality and employee wellbeing, not speed alone.",
      "Coach and resource teams appropriately; agree corrective measures with affected clients and monitor outcomes.",
    ],
    question:
      "Explain why apparently better efficiency measures could conceal worse service and advise on a balanced response.",
  },
  {
    id: "committee-challenge",
    title: "Board balance, expertise and independent challenge",
    category: "Governance",
    kind: "Case tension",
    evidence:
      "The disclosed Board has five executives and four non-executives. Alaor has explicit senior finance experience but is not listed on Audit; Audit comprises Murat, Kyle and Mirjana.",
    pages: [13, 14, 15, 16],
    distinction:
      "These are prompts for inquiry, not proof of non-compliance or an unqualified committee. The source supplies no detailed governance code, full skills matrix, committee conveners or assessment of the Chair’s independence.",
    development:
      "A fictional proposal could raise concerns about insufficient challenge, an appointment conflict or an assurance skills gap.",
    owners:
      "Murat Mutlu chairs the Board; Kyle Keimer provides independent challenge. Nomination reviews composition and succession; Audit assesses its assurance needs.",
    response: [
      "Obtain the applicable rules, committee terms of reference, skills matrix and conflict declarations.",
      "Consider training, independent advice and Board evaluation before proposing proportionate changes.",
      "Protect independent judgement and document the rationale; do not appoint or remove directors solely on assumptions from short biographies.",
    ],
    question:
      "Evaluate the governance issues the Board should investigate without assuming that its current composition breaches a rule.",
  },
  {
    id: "conflicting-reports",
    title: "Conflicting management reports",
    category: "Governance",
    kind: "Hypothetical development",
    evidence:
      "Finance owns reporting and management accounting. Internal audit reports to the Audit Committee convener. The source does not disclose an actual reporting discrepancy.",
    pages: [15, 16],
    distinction:
      "Any inconsistent figures in this scenario are fictional. Do not describe a reporting error, manipulation or fraud as a pre-seen fact.",
    development:
      "Two fictional centre dashboards could use different definitions of a resolved call, or an investment proposal could disagree with the finance forecast.",
    owners:
      "Tshepo Batane leads reconciliation with the relevant executive. Internal audit can investigate control design through its disclosed reporting line.",
    response: [
      "Reconcile timing, scope, definitions, source systems and authorised adjustments; preserve an audit trail.",
      "Establish whether the cause is error, weak controls or deliberate bias before drawing conclusions.",
      "Correct material reports, explain decision implications and escalate unresolved concerns objectively to Audit and the Board.",
    ],
    question:
      "Advise how to resolve inconsistent Board information and respond if a manager pressures you to suppress the discrepancy.",
  },
  {
    id: "ai-deployment",
    title: "AI proposal vs claimed implementation benefits",
    category: "Technology",
    kind: "Hypothetical development",
    evidence:
      "Vennlisk is evaluating AI support and analysis. A news article discusses general chatbot benefits and limitations, not a Vennlisk rollout.",
    pages: [12, 26],
    distinction:
      "No approved project cost, implementation timetable or realised AI saving is disclosed. A fictional future proposal must not be retroactively treated as current operations.",
    development:
      "A fictional business case could claim large savings without a pilot, ignore retraining costs or describe evaluated tools as already proven.",
    owners:
      "Dr Maria Chandler leads delivery; Tshepo Batane challenges the business case; Farrukh Jamil manages workforce implications. Risk and Sustainability challenges data and operational risks.",
    response: [
      "Verify the deployment stage and benefit evidence; include integration, licences, training, controls and monitoring costs.",
      "Avoid double-counting the same saved hours as both staff reductions and extra productive capacity.",
      "Recommend a bounded pilot with human escalation, privacy controls and balanced quality and financial criteria.",
    ],
    question:
      "Evaluate an AI business case whose claimed benefits exceed the evidence and recommend conditions for Board approval.",
  },
  {
    id: "privacy-incident",
    title: "Privacy training vs an alleged data incident",
    category: "Technology",
    kind: "Hypothetical development",
    evidence:
      "The disclosed mitigation for privacy risk is extensive training and refresher courses; the risk includes breaches, fraud and reputational damage.",
    pages: [15, 16, 17],
    distinction:
      "The pre-seen does not report an actual breach. Training alone does not establish that technical controls are sufficient, and no particular technical control is confirmed by the risk table.",
    development:
      "A fictional incident report could allege unauthorised access or a supplier’s inappropriate use of caller data.",
    owners:
      "Operations leads containment and system review; HR addresses training and conduct; Marketing coordinates client communication. Risk and Sustainability and Audit provide appropriate challenge and assurance.",
    response: [
      "Establish facts, contain exposure and preserve evidence with qualified security and legal support.",
      "Assess client contracts and applicable notification requirements; do not invent statutory deadlines.",
      "Review access controls, monitoring and vendor arrangements, and commission proportionate independent assurance.",
    ],
    question:
      "Advise the Board on an alleged breach where management argues that completion of training proves the controls were effective.",
  },
  {
    id: "funding",
    title: "Dividends, debt and investment capacity",
    category: "Finance & ESG",
    kind: "Case tension",
    evidence:
      "Vennlisk’s 2026 borrowings are W$5,460.0m, finance costs W$436.8m and dividends W$509.6m. Interest cover is about 3.32 times, using operating profit divided by finance costs.",
    pages: [18, 19],
    distinction:
      "This is a funding trade-off, not an arithmetic discrepancy. Debt terms, covenants, a full cash-flow statement and future project costs are not supplied.",
    development:
      "A fictional AI or resilience investment could compete with dividend expectations, or a downside forecast could reduce financing headroom.",
    owners:
      "Tshepo Batane leads treasury and financial analysis; Chen Yue integrates the strategy. The Board considers funding and distributions, with non-executive challenge.",
    response: [
      "Build cash-flow and downside scenarios; inspect debt terms and covenant headroom rather than assuming a breach.",
      "Compare retained funds, debt and equity on cost, flexibility, dilution and risk.",
      "Explain the effect on shareholder expectations and service investment; make any dividend recommendation conditional on evidence.",
    ],
    question:
      "Assess how a proposed investment and dividend policy affect Vennlisk’s financial resilience and financing choices.",
  },
  {
    id: "esg-claims",
    title: "Sustainability targets vs claims of achievement",
    category: "Finance & ESG",
    kind: "Hypothetical development",
    evidence:
      "The source aims for at least 80% renewable electricity by 2030 and recycling or donation of all electronic items disposed of after 2030. Current achieved percentages are not disclosed.",
    pages: [15, 16, 23],
    distinction:
      "Targets are not achieved outcomes. No false sustainability statement is reported in the pre-seen; a misleading future statement would be a fictional development.",
    development:
      "A fictional draft investor presentation could present a 2030 target as current performance or omit the boundary of an emissions metric.",
    owners:
      "Dr Maria Chandler owns sustainability; Tshepo Batane checks reporting consistency; Noor Ebbini reviews external communication. Risk and Sustainability challenges the supporting evidence.",
    response: [
      "Check measurement boundaries, dates, baselines, energy records and disposal evidence.",
      "Correct the wording to distinguish current results, targets and assumptions; assess whether published claims require correction.",
      "Recommend ownership, data controls and appropriate assurance before approval.",
    ],
    question:
      "Advise how to respond when a sustainability claim is stronger than the underlying evidence.",
  },
];
