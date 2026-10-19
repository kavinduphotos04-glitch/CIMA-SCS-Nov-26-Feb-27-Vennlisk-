export type Lesson = {
  title: string;
  body: string;
  pages: number[];
  kind?: "Analysis" | "Source fact" | "Worked example";
  takeaway?: string;
};
export type Module = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  color: string;
  minutes: number;
  pages: number[];
  lessons: Lesson[];
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  exam: string;
};
export const modules: Module[] = [
  {
    slug: "understanding-vennlisk",
    title: "Understanding Vennlisk",
    short: "The business, in focus.",
    description:
      "Meet the company, its people and the business behind every call.",
    icon: "Building2",
    color: "purple",
    minutes: 12,
    pages: [4, 11],
    lessons: [
      {
        title: "Your seat at the table",
        body: "You are a senior manager in the finance function, reporting directly to the Board on special projects and strategy. Vennlisk is quoted in Westland, a developed economy with a regulated exchange. Its reporting currency is W$ and its accounts follow IFRS. Your task is to turn evidence into advice, rather than simply describe a model.",
        pages: [4],
      },
      {
        title: "From 1994 to five city centres",
        body: "Founded in 1994 and listed in 2002, Vennlisk expanded through acquisitions and organic growth. It employs 5,000 agents across five owned high-rise call centres, each in a major Westland city. Agents use wired workstations, headsets and client information to resolve inbound requests.",
        pages: [11],
      },
      {
        title: "Who pays, and what for?",
        body: "Client organisations pay Vennlisk to handle their customers’ incoming calls. Most contracts use dedicated teams; some use shared teams. The client is the paying business, while the caller is the person receiving help. Keeping both satisfied is essential. Vennlisk is not principally an outbound cold-calling business.",
        pages: [7, 11],
      },
      {
        title: "A diverse client base",
        body: "Clients span utilities, healthcare, banking and financial services, insurance, online retail, public sector, travel and hospitality. A bank caller asking for a credit limit increase needs different expertise and empathy from a customer booking a holiday. Client-specific training supports this variety.",
        pages: [11, 12],
      },
      {
        title: "How value becomes revenue",
        body: "For a dedicated team, reliable staffing and specialist knowledge support an hourly agent fee. For a shared team, flexible capacity is billed by minutes of actual client work. Training and technology are investments in service quality that can help justify a price premium over overseas rivals.",
        pages: [7, 27],
        kind: "Analysis",
      },
    ],
    question: "Who is Vennlisk’s paying customer?",
    options: [
      "The caller in every case",
      "The organisation outsourcing inbound calls",
      "Only insurance companies",
    ],
    correct: 1,
    explanation:
      "Client businesses contract with Vennlisk; callers receive the service on those businesses’ behalf (pp. 4, 7, 11).",
    exam: "Distinguish the client’s commercial objectives from the caller’s service needs. Apply recommendations to both.",
  },
  {
    slug: "call-centre-industry",
    title: "The call centre industry",
    short: "Follow the conversation.",
    description:
      "Explore the industry, outsourcing models and the customer journey.",
    icon: "Headphones",
    color: "blue",
    minutes: 16,
    pages: [4, 5, 6, 7, 9, 10],
    lessons: [
      {
        title: "Inbound, outbound and internal support",
        body: "Inbound teams respond to requests such as purchases, insurance claims and billing problems. Internal help desks serve employees. Outbound teams initiate calls for sales, reminders or collections and often follow tighter scripts. Inbound agents may need discretion to diagnose a problem. Calls are normally recorded for supervision.",
        pages: [4, 5, 6],
      },
      {
        title: "From dialling to resolution",
        body: "A call management system identifies the caller or asks for an account number. A menu classifies the request. The call enters a queue and is routed to a suitable available agent. The workstation displays customer data. After the conversation, the agent completes records before becoming available again.",
        pages: [5],
      },
      {
        title: "Shared or dedicated?",
        body: "Shared pools work across several clients and charge per minute of actual work: useful for low or unpredictable demand, but spikes increase the client’s bill. Dedicated pools work for one client, usually paid by agent-hour whether busy or idle: useful for regular volumes and complex requests that need deeper training.",
        pages: [7],
      },
      {
        title: "Why outsource?",
        body: "Specialist operators can spread IT investment across clients, flex capacity, improve service using their experience, and offer stronger data protection and backups. These are potential advantages, not a guarantee that outsourcing always lowers total cost. Outbound contracts may instead use hourly fees and sales or lead commissions.",
        pages: [7],
      },
      {
        title: "A growing, contested market",
        body: "Seven major domestic inbound providers generated W$38 billion in the year ended 31 December 2025. The industry chart shows growth forecasts through 2033; forecasts are not realised revenue. The sector diagram shows banking, financial services and insurance as the largest segment, followed by IT, telecommunications and utilities, with retail, healthcare and government also represented. Exact segment percentages are not labelled.",
        pages: [9, 10],
      },
      {
        title: "Competition crosses borders",
        body: "Westland operators compete with foreign call centres. Fast international connections let callers use local numbers even when the agent is abroad. Lower overseas labour costs create a structural price challenge. Domestic operators need to demonstrate why their service quality is worth paying for.",
        pages: [20, 27],
        kind: "Analysis",
      },
    ],
    question: "Which model normally charges for actual agent minutes?",
    options: ["Shared inbound", "Dedicated inbound", "Every outbound contract"],
    correct: 0,
    explanation:
      "Shared inbound pools bill actual time per minute; dedicated teams usually bill agent-hours, including idle time (p. 7).",
    exam: "Compare flexibility, specialisation and utilisation risk before recommending an outsourcing model.",
  },
  {
    slug: "operational-performance",
    title: "Operational performance",
    short: "Measure what matters.",
    description: "Five essential KPIs. One balanced view of service quality.",
    icon: "Activity",
    color: "cyan",
    minutes: 18,
    pages: [7, 8, 12],
    lessons: [
      {
        title: "First call resolution (FCR)",
        body: "The percentage resolved on the first call without a transfer or a repeat call. Formula: qualifying first-call resolutions ÷ queries × 100. Example: 820 of 1,000 queries gives 82%. Low FCR can indicate training gaps or insufficient authority. Clarify the counting rules; excluding transferred cases would flatter performance.",
        pages: [7, 8],
        takeaway:
          "Improve capability and authority before pushing agents to finish faster.",
      },
      {
        title: "Customer satisfaction (CSAT)",
        body: "The source describes post-call surveys and monitoring tone or keywords. For a hypothetical positive-response survey: satisfied respondents ÷ valid responses × 100. 180 positives out of 225 gives 80%. Survey scales vary; state your definition. Response bias and product problems can affect scores independently of agent effort.",
        pages: [8],
        takeaway:
          "Segment feedback by issue and client before blaming the agent.",
      },
      {
        title: "Average handle time (AHT)",
        body: "Includes conversation time and post-call record updating. A conventional operational formula is (talk + hold + after-call work) ÷ handled calls. For 4,000 + 500 + 1,000 minutes over 1,000 calls, AHT is 5.5 minutes. Hold time treatment must be consistent. Lower is not automatically better: rushing may create repeat demand and dissatisfied callers.",
        pages: [8],
        takeaway:
          "Read AHT beside FCR and satisfaction, adjusted for complexity.",
      },
      {
        title: "Service level",
        body: "The proportion answered within an agreed threshold. The source describes an industry aim of 80% within 20 seconds, which can include an automated response asking callers to hold. Example: 800 timely answers out of 1,000 offered calls gives 80%. A quick automated greeting does not prove a quick resolution. Confirm the contract’s denominator and exclusions.",
        pages: [8],
        takeaway:
          "Match staffing to arrival patterns and test the caller’s whole experience.",
      },
      {
        title: "Call abandonment rate",
        body: "The proportion of calls ended before the caller reaches an agent. Example: 60 abandoned out of 1,000 offered calls gives 6%. Short-abandon exclusions vary by organisation; this worked example uses all offered calls. Analyse peak periods and queue times; callback options and better scheduling are possible responses.",
        pages: [8],
        takeaway: "Do not treat callers who give up as resolved demand.",
      },
      {
        title: "The danger of a single target",
        body: "If agents rush holiday bookings to reduce handle time, customers may feel pressured, errors can rise and repeat calls can consume the time apparently saved. Balance efficiency with outcomes, call complexity and wellbeing. Targets should encourage the behaviour that supports Vennlisk’s quality positioning.",
        pages: [8, 12, 25],
        kind: "Analysis",
      },
    ],
    question:
      "AHT falls while FCR and CSAT also fall. What is the best interpretation?",
    options: [
      "Efficiency has definitely improved",
      "The measures are unrelated",
      "Calls may be rushed, creating repeat demand",
    ],
    correct: 2,
    explanation:
      "The source explicitly warns that short handling times can reflect inadequate support; use a balanced set of metrics (p. 8).",
    exam: "Connect KPI changes to behaviour, customer consequences and a practical management response.",
  },
  {
    slug: "people-and-operations",
    title: "People & operations",
    short: "Great service is human.",
    description: "Training, motivation and the realities behind the headset.",
    icon: "Users",
    color: "coral",
    minutes: 15,
    pages: [11, 12, 17, 24, 25],
    lessons: [
      {
        title: "Training is part of the operating model",
        body: "New agents complete customer-care training and then prepare for specific clients. Each centre has a training suite. Continuing online learning takes place during work time and includes assessments. Technical understanding and emotional skills are both required: a distressed accident claimant and an enthusiastic retail buyer need different support.",
        pages: [11, 12],
      },
      {
        title: "Empathy before the workstation",
        body: "The Chatty Talker reports a three-week paid induction, with roleplays about difficult conversations; workstation use came on the last day. This is one employee’s account, not a published training-duration policy for every employee. It illustrates how tone and empathy can contribute to satisfaction.",
        pages: [24],
      },
      {
        title: "Feedback, motivation and retention",
        body: "Supervisors review FCR, satisfaction and handle time with individual agents, addressing reduced performance and recognising strong performance. The risk disclosure cites remuneration and development as retention measures. Training is costly to replace when experienced agents leave; knowledge and client continuity may be lost too.",
        pages: [12, 17],
      },
      {
        title: "The employee voice",
        body: "The blogger describes 08:00–17:00 and 13:00–22:00 shifts, a meal break and two refreshment breaks, five variable working days with weekend work. They describe back pain, eyestrain, noise and pressure to process calls. They say each group of 20 has a supervisor, whose extra pay seems small, and managerial openings are scarce. These are reported perceptions, not independently verified company-wide findings.",
        pages: [25],
      },
      {
        title: "Responding without dismissing concerns",
        body: "Suggested actions include workstation assessments, review of breaks and scheduling, coaching rather than punitive targets, transparent promotion routes and listening channels. HR should compare survey, absence and turnover evidence across centres before acting. Development pathways can improve retention even where managerial vacancies are limited.",
        pages: [15, 17, 25],
        kind: "Analysis",
      },
    ],
    question: "How should the Board treat the blog?",
    options: [
      "As proof every agent feels the same",
      "As a signal requiring investigation",
      "As irrelevant because it is informal",
    ],
    correct: 1,
    explanation:
      "The blog supplies valuable qualitative evidence but not a representative workforce survey (pp. 24–25).",
    exam: "Reconcile positive corporate disclosures with employee concerns; propose evidence gathering and proportionate action.",
  },
  {
    slug: "ai-and-digital",
    title: "AI & digital transformation",
    short: "The next conversation.",
    description:
      "Explore the possibilities. Separate proposals from today’s reality.",
    icon: "Sparkles",
    color: "purple",
    minutes: 18,
    pages: [5, 11, 12, 17, 26],
    lessons: [
      {
        title: "What exists today",
        body: "Vennlisk uses connected workstations, customer records and call-management technology. Calls are monitored, and some systems use interactive voice response for simple tasks. The source says Vennlisk is evaluating AI. Do not describe the proposed AI assistance as already implemented, and do not equate menu-based IVR with a generative chatbot.",
        pages: [5, 11, 12, 17],
      },
      {
        title: "The agent’s potential copilot",
        body: "The proposals include summaries of caller records, suggestions such as relevant product accessories, stress monitoring that flags a supervisor, and analysis of patterns across metrics. These could improve consistency and identify problematic selling behaviour, but benefits are possibilities rather than measured savings.",
        pages: [12],
      },
      {
        title: "Chatbot-led service: a different model",
        body: "The news article explains that chatbots can provide text or voice support around the clock and potentially replace some human assistance. It also describes difficulty with complex interactions and emotions. Models need accurate, maintained training information; credible but incorrect advice can damage trust. The article is not evidence of a Vennlisk chatbot rollout.",
        pages: [26],
      },
      {
        title: "Financial and operational business case",
        body: "Compare implementation, integration, licence, cyber-control, retraining and monitoring costs with plausible capacity savings and quality benefits. Avoid counting both reduced staff cost and extra capacity for the same hours. Pilot one bounded use case, retain human escalation and assess FCR, satisfaction, errors and employee feedback before scaling.",
        pages: [12, 26],
        kind: "Analysis",
      },
      {
        title: "Data, people and accountability",
        body: "Suggested controls include minimising personal data sent to models, access limits, retention rules, vendor due diligence, audit logs and human review of sensitive advice. Emotion detection can be intrusive or inaccurate. Consult staff, explain monitoring and validate effectiveness before using scores for employment decisions.",
        pages: [12, 17, 26],
        kind: "Analysis",
      },
    ],
    question: "Which statement accurately describes Vennlisk’s AI position?",
    options: [
      "It has replaced its agents with chatbots",
      "It is evaluating AI support and performance tools",
      "It discloses quantified AI savings",
    ],
    correct: 1,
    explanation:
      "Page 12 describes evaluation and potential uses; it does not confirm deployment or savings.",
    exam: "Evaluate suitability, financial feasibility and stakeholder acceptance; recommend a controlled pilot with explicit success criteria.",
  },
  {
    slug: "strategy-and-position",
    title: "Strategy & competitive position",
    short: "Think beyond the framework.",
    description: "Turn case facts into a coherent strategic recommendation.",
    icon: "Compass",
    color: "blue",
    minutes: 20,
    pages: [13, 20, 27],
    lessons: [
      {
        title: "Mission, vision and values",
        body: "The mission centres on an outstanding inbound-call experience. The vision combines leadership in Westland with quality and innovation. Values emphasise integrity, customer-led excellence, continuous innovation and a supportive work environment. A cost-saving proposal that systematically degrades calls may conflict with this positioning.",
        pages: [13],
      },
      {
        title: "SWOT, applied",
        body: "Strengths: trained staff, established relationships and service reputation. Weaknesses: labour intensity and a comparatively heavy financing burden. Opportunities: market growth and well-controlled AI assistance. Threats: low-cost overseas rivals, data failures and staff turnover. These are analytical classifications; none is a formal company SWOT in the source.",
        pages: [9, 11, 17, 18, 20, 27],
        kind: "Analysis",
      },
      {
        title: "PESTEL, without importing current affairs",
        body: "Political: public-sector client expectations. Economic: wage-cost differences and financing capacity. Social: caller preference for human help and agent wellbeing. Technological: international connectivity and AI. Environmental: electricity, cooling and e-waste. Legal: privacy obligations, client terms and IFRS. These are case applications, not claims of new laws or current global events.",
        pages: [2, 4, 5, 17, 23, 27],
        kind: "Analysis",
      },
      {
        title: "Porter’s Five Forces",
        body: "Rivalry includes seven major domestic firms and overseas providers. Buyers can compare suppliers but complex integration and training may make switching costly. Substitutes include in-house teams, self-service and chatbots. Labour, network and software suppliers affect cost and continuity. New entrants face reputation, client trust and systems barriers, although cloud tools may reduce some entry costs.",
        pages: [7, 9, 11, 20, 26, 27],
        kind: "Analysis",
      },
      {
        title: "SAF: evaluate before recommending",
        body: "Suitability: does a proposal reinforce quality differentiation and address real threats? Acceptability: do the risk, return and workforce consequences meet stakeholder expectations? Feasibility: can Vennlisk fund, implement and govern it? Compare a limited AI-assistance pilot, broader automation and investment in human skills using the same criteria.",
        pages: [12, 13, 18, 19, 26],
        kind: "Analysis",
      },
    ],
    question: "In SAF, which question concerns feasibility?",
    options: [
      "Can the company fund and implement the option?",
      "Does it fit the mission?",
      "Will stakeholders accept the risk?",
    ],
    correct: 0,
    explanation:
      "Feasibility considers resources and delivery capacity. Suitability concerns fit; acceptability concerns returns, risks and stakeholder reactions.",
    exam: "Use frameworks to organise evidence, then make a balanced recommendation with conditions and implementation steps.",
  },
  {
    slug: "leadership-and-governance",
    title: "Leadership & governance",
    short: "Meet the decision-makers.",
    description: "Nine directors, four committees and clear accountability.",
    icon: "Network",
    color: "orange",
    minutes: 17,
    pages: [13, 14, 15, 16],
    lessons: [
      {
        title: "Leadership and independent challenge",
        body: "Chen Yue leads five executive directors including herself. Murat Mutlu is Non-Executive Chair; Kyle Keimer is Senior Independent Director. Mirjana Churlin and Alaor Leite are independent non-executives. Distinguishing executive delivery from non-executive scrutiny helps prevent decisions being approved without effective challenge.",
        pages: [13, 14, 15],
      },
      {
        title: "Who owns which responsibility?",
        body: "Farrukh Jamil oversees recruitment, retention, training and health and safety. Dr Maria Chandler oversees operations, software development and sustainability. Tshepo Batane oversees financial reporting, management accounting and treasury. Noor Ebbini oversees marketing, client liaison and public relations. These executives report to CEO Chen Yue.",
        pages: [15],
      },
      {
        title: "Four committees",
        body: "Audit: Murat, Kyle and Mirjana. Risk and Sustainability: Murat, Mirjana and Alaor. Remuneration: Kyle, Mirjana and Alaor. Nomination: Murat, Kyle and Alaor. Committee membership is disclosed; the table does not name committee conveners. Avoid assuming the financially experienced director is the Audit convener.",
        pages: [16],
      },
      {
        title: "Internal audit’s reporting line",
        body: "The Chief Internal Auditor reports to the convener of the Audit Committee. This provides a route for independent assurance to reach non-executive oversight rather than being filtered solely through operational management.",
        pages: [16],
      },
      {
        title: "Governing an AI investment",
        body: "Operations should own delivery, Finance the business case, and HR the workforce implications. Risk and Sustainability can challenge data, resilience and wellbeing risks; Audit can consider control assurance. The Board remains accountable for strategy and investment approval. These are suggested applications of the disclosed responsibilities.",
        pages: [15, 16],
        kind: "Analysis",
      },
      {
        title: "Discrepancies as an examination lens",
        body: "Development and retention claims sit alongside a blogger’s account of limited promotion; break monitoring sits alongside reported discomfort. These are tensions to investigate, not established misstatements. Identify the evidence, ask what could explain the difference, name the executive owner and recommend proportionate non-executive challenge. The dedicated Leadership section separates these case tensions from fictional exam developments.",
        pages: [12, 16, 17, 25],
        kind: "Analysis",
      },
    ],
    question: "Who receives the Chief Internal Auditor’s reports?",
    options: [
      "Only the CEO",
      "The convener of the Audit Committee",
      "The Marketing Director",
    ],
    correct: 1,
    explanation: "The reporting arrangement is explicitly stated on page 16.",
    exam: "Name a relevant decision owner, specify what assurance is needed and explain why independent challenge matters.",
  },
  {
    slug: "principal-risks",
    title: "Principal risks",
    short: "See the risk. Plan the response.",
    description:
      "Understand the five disclosed risks and evaluate the controls.",
    icon: "ShieldCheck",
    color: "coral",
    minutes: 18,
    pages: [17],
    lessons: [
      {
        title: "People: retention and demotivation",
        body: "Experienced agents underpin service quality. Disclosed retention controls are remuneration and development. For demotivation, the disclosure cites sampled call recordings, feedback, live supervisor intervention and IVR handling simple tasks. Turnover can increase recruitment costs and reduce service continuity; disengagement can harm clients’ reputations.",
        pages: [17],
      },
      {
        title: "Health and safety",
        body: "Long periods at workstations expose agents to health risks. The disclosed control is monitoring regular breaks. The employee blog raises concerns about discomfort and eyestrain. Additional ergonomic assessments, workload reviews and reporting channels are suggestions, rather than controls confirmed in the risk table.",
        pages: [17, 25],
      },
      {
        title: "Privacy and security",
        body: "Access to client files creates potential privacy breaches, reputational damage, fraud and security failures. Extensive privacy training and refresher courses are the disclosed mitigation. Suggested technical controls include least-privilege access, strong authentication, monitoring and incident response exercises. Potential financial effects include claims, lost contracts and remediation costs; no amounts are disclosed.",
        pages: [17],
        kind: "Analysis",
      },
      {
        title: "Telecommunications dependence",
        body: "Network interruptions can stop calls or degrade their quality. Vennlisk works with telecom providers and reports problems in real time. Suggested additions include independently routed failover, recovery testing and contractual service standards. Do not present redundant links as an existing disclosed control.",
        pages: [17],
      },
      {
        title: "From register to decision",
        body: "Assess likelihood and impact, identify the owner and evaluate residual exposure after controls. The heatmap in this academy uses editable illustrative scores, not company assessments. Prioritise controls by expected loss, business continuity and service consequences; a high score does not replace judgement.",
        pages: [17],
        kind: "Analysis",
      },
    ],
    question: "Which telecommunications control is actually disclosed?",
    options: [
      "Two independent network links",
      "Real-time feedback and cooperation with providers",
      "A guaranteed zero-outage network",
    ],
    correct: 1,
    explanation:
      "Page 17 discloses close work with telecom providers and real-time problem feedback. Redundancy is a possible additional control.",
    exam: "Separate current mitigation from recommended improvements; explain control limitations and financial consequences.",
  },
  {
    slug: "financial-analysis",
    title: "Financial analysis",
    short: "Make the numbers speak.",
    description:
      "Explore two years of results and compare Vennlisk with Ringcoll.",
    icon: "ChartNoAxesCombined",
    color: "blue",
    minutes: 25,
    pages: [18, 19, 20, 21],
    lessons: [
      {
        title: "Read performance and position together",
        body: "Both groups report a September year-end. In 2026 Vennlisk records revenue of W$12,370.0m, operating profit of W$1,451.0m and net profit of W$770.8m. Ringcoll reports revenue of W$10,514.5m, operating profit of W$1,449.5m and net profit of W$1,005.2m. Similar operating profits do not imply similar shareholder earnings.",
        pages: [18, 20],
      },
      {
        title: "Growth versus profitability",
        body: "Vennlisk revenue grows about 6.38%, with operating margin increasing from about 10.79% to 11.73%. Ringcoll revenue grows about 9.89% while operating margin declines from about 16.60% to 13.79%. Ringcoll grows faster, but Vennlisk improves its operating profitability. Neither observation by itself establishes the better investment.",
        pages: [18, 20],
        kind: "Analysis",
      },
      {
        title: "Financing changes the outcome",
        body: "Vennlisk has W$5,460.0m of borrowings versus Ringcoll’s W$1,800.0m. Finance costs are W$436.8m and W$144.0m respectively. Interest cover in 2026 is approximately 3.32 times versus 10.07 times. Vennlisk therefore has less earnings headroom before finance costs become difficult to cover.",
        pages: [18, 19, 20, 21],
        kind: "Analysis",
      },
      {
        title: "Assets, liquidity and goodwill",
        body: "Vennlisk’s 2026 goodwill is W$6,274.0m, compared with W$2,211.0m for Ringcoll. Goodwill is not a cash reserve and an impairment could reduce profit and equity without a current cash outflow. Vennlisk has W$986.1m cash and W$1,437.3m receivables. A healthy current ratio does not remove collection and long-term financing risks.",
        pages: [19, 21],
        kind: "Analysis",
      },
      {
        title: "Distribution versus reinvestment",
        body: "Vennlisk pays W$509.6m in 2026 dividends, approximately 66.11% of profit; Ringcoll pays W$374.9m, about 37.30%. Vennlisk retains W$261.2m of the year’s profit. Balance shareholder expectations against investment capacity and debt resilience. The extracts do not disclose 2025 dividends or cash-flow statements.",
        pages: [18, 20],
        kind: "Analysis",
      },
    ],
    question:
      "Why is Vennlisk’s net profit below Ringcoll’s despite similar operating profit?",
    options: [
      "Vennlisk has much larger finance costs",
      "Their revenues are identical",
      "Goodwill is annual cash income",
    ],
    correct: 0,
    explanation:
      "Vennlisk’s W$436.8m finance costs exceed Ringcoll’s W$144.0m; tax also differs (pp. 18, 20).",
    exam: "Show the formula and assumptions, compare results, then explain an implication for the Board.",
  },
  {
    slug: "investors-and-share-price",
    title: "Investors & share price",
    short: "Look beyond the price.",
    description: "Investor expectations, beta and the cost of equity.",
    icon: "TrendingUp",
    color: "purple",
    minutes: 12,
    pages: [22, 27],
    lessons: [
      {
        title: "A substantial re-rating",
        body: "The share-price chart shows a broad decline after 2022. The news article describes prices briefly above W$500 in 2022 and a current level around W$100. Those are approximate descriptions from the article, not an exact price series extracted from the chart. Low-cost international competition is cited as the reason for the decline.",
        pages: [22, 27],
      },
      {
        title: "What the analysts see",
        body: "The article reports a buy recommendation at the current valuation, arguing that quality differentiation supports a realistic return despite foreign competitors’ cost advantage. A recommendation is an opinion, not a guarantee of returns. The Board must maintain the quality and commercial relationships that underpin that thesis.",
        pages: [27],
      },
      {
        title: "Beta and CAPM",
        body: "The disclosed equity beta is 0.48. In CAPM, cost of equity = risk-free rate + beta × market risk premium. With hypothetical rates of 4% and 6%, the result is 6.88%. These rates are teaching inputs, not pre-seen facts. Beta measures sensitivity to market returns; it does not mean that operational risks are low.",
        pages: [22],
        kind: "Worked example",
      },
      {
        title: "Capital structure implications",
        body: "A weaker share price can make equity issuance more dilutive for a given funding amount. Debt avoids immediate ownership dilution but adds financing commitments. Compare funding choices against interest cover, gearing, project risk and shareholder preferences. The source does not supply a market risk premium, risk-free rate or enough data for a definitive WACC.",
        pages: [18, 19, 22, 27],
        kind: "Analysis",
      },
    ],
    question: "What does the disclosed beta of 0.48 measure?",
    options: [
      "A 48% guaranteed return",
      "Sensitivity to market-wide returns",
      "The probability of a data breach",
    ],
    correct: 1,
    explanation:
      "Equity beta concerns systematic risk. It is not a promised return or a measure of every company-specific risk.",
    exam: "Label hypothetical CAPM assumptions and avoid treating beta as a complete assessment of business risk.",
  },
  {
    slug: "sustainability-and-esg",
    title: "Sustainability & ESG",
    short: "A better business, by design.",
    description:
      "Connect environmental targets with people, privacy and governance.",
    icon: "Leaf",
    color: "lime",
    minutes: 13,
    pages: [23],
    lessons: [
      {
        title: "Who oversees sustainability?",
        body: "The Board receives regular reports from the Risk and Sustainability Committee. The Operations Director has specific oversight responsibility and raises concerns with the Board. Sustainability is therefore part of governance, not solely an external reporting exercise.",
        pages: [23],
      },
      {
        title: "Five strategic dimensions",
        body: "The disclosed strategy covers the planet, employees, trust, innovation and technology, and communities. It links environmental improvements with an inclusive workplace, integrity, beneficial innovation and community support. Staff welfare and privacy also appear in the sustainability risk discussion.",
        pages: [23],
      },
      {
        title: "Targets, not achieved outcomes",
        body: "Vennlisk aims for at least 80% renewable electricity by 2030 and seeks to reduce refrigerant losses. It aims to recycle or donate 100% of electronic items disposed of after 2030. It tracks commuting methods and aims to eliminate personal-car commuting, supported by interest-free loans for public-transport season tickets or bicycles. No deadline for the commuting aim or current achievement percentages are supplied.",
        pages: [23],
      },
      {
        title: "Measure the transition",
        body: "Suggested measures include renewable electricity share, verified e-waste destination, refrigerant leakage, commuting mode share and workstation health indicators. Define boundaries and evidence, compare progress with a baseline and avoid describing targets as results. Assess supplier claims and the accessibility of commuting alternatives for late-shift staff.",
        pages: [23, 25],
        kind: "Analysis",
      },
    ],
    question: "Which is an actual stated environmental target?",
    options: [
      "Already 100% renewable today",
      "At least 80% renewable electricity by 2030",
      "Zero staff commuting by 2027",
    ],
    correct: 1,
    explanation:
      "The target is at least 80% renewable electricity by 2030, not an achieved result (p. 23).",
    exam: "Connect sustainability proposals to measurable evidence, operational constraints and stakeholder consequences.",
  },
  {
    slug: "news-and-implications",
    title: "News & strategic implications",
    short: "Read between the headlines.",
    description:
      "Turn employee stories and analyst views into board-level insight.",
    icon: "Newspaper",
    color: "orange",
    minutes: 16,
    pages: [24, 25, 26, 27],
    lessons: [
      {
        title: "The new recruit and training",
        body: "The blogger initially expects inbound work to be enjoyable and less confrontational than cold-calling. A commenter warns that calls can be relentless. The subsequent three-week induction emphasises empathy and roleplay. Opportunity: training can reinforce differentiation. Threat: recruitment expectations may not match actual workload. A realistic job preview is a possible Board response.",
        pages: [24],
        kind: "Analysis",
      },
      {
        title: "Conditions and progression",
        body: "The first-month account contrasts relatively pleasant travel bookings with stressful credit-card requests. It raises shift, physical strain, monitoring and promotion concerns. Possible responses are pulse surveys, ergonomic reviews, revised balanced targets and specialist career pathways. Motivation and job-design theory can help explain why pay alone may not sustain engagement.",
        pages: [25],
        kind: "Analysis",
      },
      {
        title: "The chatbot business case",
        body: "The news article describes always-on availability and potential labour savings, alongside emotional, complexity and data-quality limitations. A sensible response is to segment queries by risk and complexity, pilot simple tasks and protect human escalation. Relevant theory includes SAF, change management and risk-adjusted investment appraisal. No project costs or quantified savings are provided.",
        pages: [26],
        kind: "Analysis",
      },
      {
        title: "The analysts’ recommendation",
        body: "Analysts argue that quality supports Vennlisk’s value at a much lower share price despite overseas price pressure. The opportunity is to make quality commercially visible through outcome evidence and client retention. The threat is a service failure that undermines the premium. Investor communication should be balanced and supported, rather than promise a recovery in the share price.",
        pages: [27],
        kind: "Analysis",
      },
      {
        title: "Reading source material critically",
        body: "Pages 1 and 3 identify the exam and contents. Page 2 sets the fictional context: ongoing real-world global issues need not be imported into the case. Page 28 is publication information. The study modules cover substantive pages 4–27, including the industry and share-price diagrams. Theory applications are original analysis and are labelled separately from case facts.",
        pages: [1, 2, 3, 28],
      },
    ],
    question: "What does the chatbot article establish?",
    options: [
      "Vennlisk has a live chatbot programme",
      "A general business case with benefits and limitations",
      "Guaranteed cost reductions of 20%",
    ],
    correct: 1,
    explanation:
      "The article discusses general chatbot opportunities and weaknesses, not an approved Vennlisk project or quantified savings (p. 26).",
    exam: "State what happened, why it matters to Vennlisk and what the Board should do next, with balanced supporting evidence.",
  },
];
export const directors = [
  {
    name: "Murat Mutlu",
    role: "Non-Executive Chair",
    type: "Non-executive",
    year: "2023",
    bio: "Contract lawyer and former managing partner of a major law firm; charity management committee experience.",
    committees: ["Audit", "Risk & Sustainability", "Nomination"],
  },
  {
    name: "Chen Yue",
    role: "Chief Executive Officer",
    type: "Executive",
    year: "2018 · CEO 2023",
    bio: "Electronic engineer specialising in telecommunications and R&D. Joined as Head of Network Administration in 2011.",
    committees: [],
  },
  {
    name: "Farrukh Jamil",
    role: "Human Resources Director",
    type: "Executive",
    year: "2023",
    bio: "HR graduate with an MBA; previously HR Director at a quoted car manufacturer. Owns recruitment, retention, training and health and safety.",
    committees: [],
  },
  {
    name: "Dr Maria Chandler",
    role: "Operations Director",
    type: "Executive",
    year: "2021",
    bio: "Management scientist with a doctorate in queuing theory; formerly Head of Strategic Planning at Westland Telecommunications. Owns operations, software and sustainability.",
    committees: [],
  },
  {
    name: "Tshepo Batane",
    role: "Chief Financial Officer",
    type: "Executive",
    year: "2023",
    bio: "Professionally qualified accountant with retail and service-sector finance experience. Joined in 2018 as Assistant Financial Officer. Owns reporting, management accounting and treasury.",
    committees: [],
  },
  {
    name: "Noor Ebbini",
    role: "Marketing Director",
    type: "Executive",
    year: "2024",
    bio: "Modern languages graduate who joined as a management trainee. Progressed through marketing roles; owns marketing, client liaison and public relations.",
    committees: [],
  },
  {
    name: "Kyle Keimer",
    role: "Senior Independent Director",
    type: "Non-executive",
    year: "2025",
    bio: "Former Westlandian Health Service administrator, implementing efficiency and patient-care improvements. Serves two major charities.",
    committees: ["Audit", "Remuneration", "Nomination"],
  },
  {
    name: "Mirjana Churlin",
    role: "Independent Non-Executive Director",
    type: "Non-executive",
    year: "2024",
    bio: "Former mathematics teacher, headteacher for eight years and schools inspector; advises the Education Department.",
    committees: ["Audit", "Risk & Sustainability", "Remuneration"],
  },
  {
    name: "Alaor Leite",
    role: "Independent Non-Executive Director",
    type: "Non-executive",
    year: "2025",
    bio: "Senior manufacturing finance experience; formerly Finance Director of a major quoted manufacturer.",
    committees: ["Risk & Sustainability", "Remuneration", "Nomination"],
  },
];
export const risks = [
  {
    title: "Employee retention",
    cause: "Loss of trained and experienced agents",
    effect: "Recruitment costs, knowledge loss and service disruption",
    existing: "Competitive remuneration and training / staff development",
    suggested:
      "Analyse turnover by centre; offer specialist career routes and stay interviews",
    owner: "HR Director",
    likelihood: 3,
    impact: 4,
  },
  {
    title: "Employee demotivation",
    cause: "Repetitive work, pressure and disengagement",
    effect: "Poor service damages client reputation and contract retention",
    existing:
      "Call recording, sampled reviews, constructive feedback, live intervention and IVR for simpler tasks",
    suggested: "Balanced targets, employee voice and workload review",
    owner: "HR / Operations",
    likelihood: 4,
    impact: 3,
  },
  {
    title: "Health & safety",
    cause: "Long periods at workstations",
    effect: "Absence, injury, reduced performance and potential claims",
    existing: "Monitoring that agents take regular breaks",
    suggested: "Ergonomic assessments, noise reviews and eye-health support",
    owner: "HR Director",
    likelihood: 3,
    impact: 3,
  },
  {
    title: "Privacy & security",
    cause: "Access to personal data in client files",
    effect: "Fraud, breaches, remediation expense and loss of trust",
    existing:
      "Extensive privacy training, regular updates and refresher courses",
    suggested: "Least-privilege access, MFA, monitoring and incident exercises",
    owner: "Operations / Board",
    likelihood: 3,
    impact: 5,
  },
  {
    title: "Telecommunications failures",
    cause: "Dependence on network availability",
    effect: "Interrupted service, poor call quality and possible contract loss",
    existing:
      "Close cooperation with telecom providers and real-time problem feedback",
    suggested: "Independent failover routes and tested recovery plans",
    owner: "Operations Director",
    likelihood: 2,
    impact: 5,
  },
];
export const scenarios = [
  {
    title: "The AI investment decision",
    prompt:
      "The Board is considering investing in AI-assisted customer service. Evaluate strategic, financial and operational implications, then recommend how to proceed.",
    points: [
      "Apply quality differentiation and the evaluation-stage AI proposals (pp. 12–13).",
      "Compare implementation costs with non-duplicated benefits; no source project valuation exists.",
      "Address data privacy, staff consultation, human escalation and a measured pilot.",
    ],
  },
  {
    title: "Speed at what cost?",
    prompt:
      "A call centre reports shorter handling times, but customer satisfaction is falling. Advise the Board on investigation and corrective action.",
    points: [
      "Consider rushed calls, complexity mix and repeat demand (p. 8).",
      "Triangulate recordings, FCR, complaints and the employee voice (pp. 17, 25).",
      "Recommend balanced targets, coaching and monitored follow-up.",
    ],
  },
  {
    title: "A serious service interruption",
    prompt:
      "A fictional network outage affects one centre. Evaluate the immediate response and longer-term resilience controls.",
    points: [
      "Protect callers and clients; assess continuity and communication needs.",
      "Distinguish the actual provider-feedback control from proposed redundancy (p. 17).",
      "Assign ownership, test recovery and assess financial and reputational consequences.",
    ],
  },
];
export const glossary = [
  [
    "AHT",
    "Average handle time: conversation and related post-call administration per handled call.",
  ],
  [
    "FCR",
    "First call resolution: queries resolved on the first call without transfers or repeats.",
  ],
  [
    "CSAT",
    "Customer satisfaction: caller feedback, measured using a defined survey or monitoring approach.",
  ],
  [
    "Gearing",
    "Debt relative to a defined capital base. Here: debt / (debt + equity).",
  ],
  ["ROCE", "Return on capital employed: operating profit / capital employed."],
  [
    "Goodwill",
    "An acquisition-related asset representing benefits not separately identified; not a cash reserve.",
  ],
  [
    "SAF",
    "Suitability, acceptability and feasibility: three tests of a strategic option.",
  ],
  [
    "CAPM",
    "Capital asset pricing model: risk-free rate + beta × market risk premium.",
  ],
  [
    "IVR",
    "Interactive voice response: a phone system that routes or handles simple caller requests.",
  ],
  [
    "IFRS",
    "International Financial Reporting Standards, required for Westland financial statements.",
  ],
];
