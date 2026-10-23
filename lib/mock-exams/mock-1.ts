import type { Lesson, MockExam } from "./types";
import {
  brief,
  preseen,
  theory,
  paragraph as p,
  checks,
} from "./content-helpers";
const competitor: Lesson = {
  slug: "competitor-analysis",
  number: "1.1",
  title: "Competitor Analysis",
  minutes: 25,
  summary:
    "Understand who could compete, how they could respond, and what Vennlisk should do next.",
  scenario:
    "Mock scenario: Vennlisk is testing a shared AI backbone with separate client partitions. Another outsourcing provider tried a comparable system approximately three months earlier but could not achieve reliable accuracy. The brief does not identify that provider as Ringcoll.",
  question: {
    focus:
      "Assess the competitive threats to Vennlisk’s proposed AI-assisted calling service and recommend a response.",
    plain:
      "Who could take this business away from Vennlisk, how credible is the threat, and how should the Board respond?",
    analyse:
      "Compare different competitors, their capabilities and the likely durability of Vennlisk’s advantage. Evaluate both commercial opportunity and technical uncertainty.",
    knowledge:
      "Competitor analysis, barriers to entry, first-mover advantage, switching costs and financing capacity. These connect to strategy and ecosystem analysis; no Activity A or B workbook was available.",
    facts: [
      "The shared-backbone pilot and rival accuracy failure are mock-brief facts, not pre-seen disclosures.",
      "Westland has seven major inbound providers (p. 9).",
      "Vennlisk and Ringcoll have different financing headroom (pp. 18–21).",
    ],
    weak: "A weak response lists competitors or assumes that being first guarantees success, without considering reliability, switching costs or rival funding.",
    strong:
      "A strong response distinguishes threats, explains their business consequences, qualifies uncertain evidence and proposes a monitored pilot with a credible response to imitation.",
  },
  sources: [brief, preseen([9, 18, 19, 20, 21]), theory],
  theory: [
    {
      term: "Who is a competitor?",
      simple:
        "A competitor offers another way to satisfy the same customer need. Direct competitors offer a similar service; indirect competitors solve the need differently.",
      example:
        "A taxi company competes directly with other taxis, but a rail service can also replace a taxi journey.",
      application:
        "Another outsourced call-centre provider is a direct rival. A standalone AI vendor can help a client keep service in-house, indirectly replacing outsourced agent work.",
    },
    {
      term: "Specialist AI vendors",
      simple:
        "A technology specialist sells software expertise rather than necessarily operating a full outsourced service.",
      example:
        "A restaurant can buy a booking app without hiring another company to run the restaurant.",
      application:
        "Standalone AI assistants may lack Vennlisk’s operating relationships but can improve as their client base and appropriately usable training data grow. More data is not automatically better; quality, consent and relevance matter.",
    },
    {
      term: "Established outsourcing rivals",
      simple:
        "Existing providers already have staff, clients, service processes and market knowledge. They can add technology to an established offering.",
      example:
        "A delivery company with customers and depots may adopt better routing software faster than a new entrant can build an entire network.",
      application:
        "Seven major domestic inbound providers create multiple potential responses. The earlier failed attempt indicates interest in a similar approach, but its cause and current status need investigation.",
    },
    {
      term: "Competitive advantage and entry barriers",
      simple:
        "An advantage is a reason clients prefer you. A barrier makes it harder for a rival to copy or enter.",
      example:
        "A trusted repair shop with specialist knowledge is harder to replace than one competing only on a temporary discount.",
      application:
        "A reliable shared backbone, protected know-how and integrated client relationships could differentiate Vennlisk. A technical claim is not a durable barrier unless it produces repeatable quality and is difficult to reproduce.",
    },
    {
      term: "First-mover advantage",
      simple:
        "An early entrant may learn sooner, win relationships and shape expectations. Going first can also mean paying for mistakes that followers avoid.",
      example:
        "The first café in a new office park may win regulars, but a later café can learn from its menu and service problems.",
      application:
        "Vennlisk’s pilot can generate learning and client commitment. The rival’s failed attempt is a warning to investigate accuracy, not proof that Vennlisk will succeed.",
    },
    {
      term: "Switching costs",
      simple:
        "Changing supplier may cost money, time and disruption even if the alternative has a better headline price.",
      example:
        "Moving payroll software requires data migration, training and checking that people are paid correctly.",
      application:
        "Some clients may already use AI suppliers under the mock brief. Migration, integrations and contracts can slow adoption; Vennlisk should quantify the client’s transition costs and expected benefit.",
    },
    {
      term: "Financial capacity and competitive timing",
      simple:
        "A rival with stronger financing headroom may sustain development and absorb setbacks. Capacity does not prove that it will invest.",
      example:
        "Two shops may want to expand, but the shop with fewer debt commitments may find it easier to finance a refit.",
      application:
        "Using closing book capital, Vennlisk’s gearing is about 39.8% and interest cover 3.32×; Ringcoll’s are about 19.0% and 10.07×. Ringcoll may fund a response more readily. Pilot publicity can attract clients but also reveal the opportunity to rivals.",
    },
  ],
  application: {
    theory: "First-mover advantage",
    evidence:
      "Mock brief: Vennlisk is testing a shared-backbone AI system with separate client partitions; another provider’s similar attempt failed on accuracy.",
    implication:
      "An early, reliable service could win learning and client relationships, but competitors are already interested and the technology is not yet proven.",
    action:
      "Proceed with a controlled pilot, investigate why the rival failed and protect know-how while gathering credible customer-outcome evidence.",
    explanation:
      "This is analysis because it connects the fact to both an opportunity and a risk, then gives a conditional action. Simply saying “first movers have an advantage” would not explain Vennlisk’s decision.",
  },
  paragraphs: [
    p(
      "competitors",
      "Distinguish the threats",
      "Vennlisk’s proposed service faces both standalone AI vendors and established outsourcing providers.",
      "Specialist vendors can let clients automate without buying a complete outsourced service, whereas call-centre rivals can combine AI with existing agent teams and contracts.",
      "Vennlisk therefore needs to demonstrate a reliable service outcome and workable integration, rather than rely on the novelty of an AI label.",
      "The Board should map these competitors separately, comparing accuracy, client support, integration and total transition cost before selecting a target market.",
      "There are two routes by which a client could choose an alternative. Comparing only other call centres would overlook software that lets the client do more work itself.",
      "This protects the commercial assumptions in the pilot: the relevant comparison is the client’s alternative solution, not just a rival’s advertised fee.",
      [brief, preseen([9])],
      "Define the competitor groups, explain how they substitute for the proposal, then translate the distinction into a specific research task.",
    ),
    p(
      "advantage",
      "Evaluate an early advantage",
      "The mock brief describes a shared AI backbone with separate client partitions and a rival’s unsuccessful accuracy test around three months earlier.",
      "The design may spread development learning across clients, but the rival’s experience shows that commercial interest exists before reliable delivery has been established.",
      "Early learning could help Vennlisk win relationships, yet a premature launch could damage its quality reputation and give followers a cheaper lesson in what to avoid.",
      "Management should investigate the causes of the rival’s failure and proceed through a monitored pilot, protecting client information and withholding unproven performance claims.",
      "A head start can be useful, but only if the service actually works. The failed rival is evidence of both competition and technical difficulty.",
      "The Board must balance speed against the cost of a reputational setback; “be first” is not an investment appraisal.",
      [brief, preseen([13])],
      "Use the same fact to support both sides, then make the recommendation depend on reliability evidence.",
    ),
    p(
      "switching",
      "Consider clients and imitation",
      "The brief indicates that some prospective clients may already use competing AI suppliers.",
      "Moving service could require contract changes, data migration, testing and staff retraining, while standalone vendors may improve as they gain clients and suitable data.",
      "Even a technically attractive Vennlisk offering may therefore face slow conversion, and its initial advantage may narrow before development costs are recovered.",
      "Vennlisk should select pilot clients with a clear unmet need, quantify switching benefits and costs, and stage publicity so it builds credible demand without unnecessarily exposing technical know-how.",
      "A client does not change supplier for free. At the same time, competitors will not necessarily remain at today’s capability level.",
      "This connects adoption speed to payback and explains why client selection and the timing of publicity are strategic decisions.",
      [brief],
      "Combine a client-level obstacle with a changing competitive environment, then recommend practical actions rather than a general call for more marketing.",
    ),
    p(
      "funding",
      "Reach a balanced recommendation",
      "The pre-seen figures imply gearing of approximately 39.8% and interest cover of 3.32 times for Vennlisk, against approximately 19.0% and 10.07 times for Ringcoll.",
      "These measures suggest Ringcoll has stronger financing headroom, although its willingness to invest and access to new funding are not disclosed.",
      "A better-funded competitor could respond aggressively or continue developing after setbacks, making a permanently protected first-mover position unlikely.",
      "I would support the pilot subject to accuracy and customer-outcome gates, while monitoring rival investment and updating the rollout case as market evidence changes.",
      "Financial strength can make a competitor’s response more credible. It does not tell us what that competitor has decided.",
      "A qualified conclusion avoids two extremes: abandoning the opportunity merely because rivals exist, or assuming that a head start removes the need to compete.",
      [preseen([18, 19, 20, 21]), brief],
      "Use the calculated comparison, qualify what it cannot prove and finish with a decision and monitoring conditions.",
    ),
  ],
  comparison: {
    weak: "Vennlisk has competitors, so it should invest in AI to keep up.",
    whyWeak:
      "This gives no competitor categories, case evidence, commercial consequence or condition for investment. “Keep up” is a slogan rather than an evaluation.",
    strong:
      "Vennlisk faces both specialist AI vendors and outsourced-service rivals. Its proposed shared backbone may create an early advantage, but the rival’s accuracy failure warns against equating novelty with reliability. A controlled pilot should establish customer outcomes before wider expansion, while management monitors imitation and the switching costs faced by clients.",
    whyStrong:
      "The paragraph identifies specific alternatives, weighs opportunity against uncertainty and explains what evidence should govern the decision.",
  },
  writing: {
    issue:
      "Ringcoll has lower gearing and stronger interest cover than Vennlisk. Write a paragraph explaining how this could influence competition for AI investment.",
    suggested:
      "Vennlisk’s gearing of about 39.8% and interest cover of 3.32 times compare with Ringcoll’s approximately 19.0% and 10.07 times. Ringcoll may therefore have greater capacity to fund development or absorb an unsuccessful pilot, although the ratios do not establish its plans or borrowing terms. Vennlisk should avoid assuming its technical lead will be permanent and preserve financing flexibility through staged investment. Competitive monitoring and demonstrable service quality should support expansion rather than an attempt to match every rival’s spending.",
  },
  checkpoints: checks(
    {
      prompt: "What does the failed rival pilot most reasonably establish?",
      options: [
        "Vennlisk is certain to succeed because the rival failed.",
        "There is competitive interest and an accuracy risk that requires investigation.",
        "Ringcoll definitely developed the failed system.",
      ],
      correct: 1,
      explanation:
        "The brief identifies another provider, not Ringcoll, and does not guarantee Vennlisk’s success. A failed attempt reveals both interest in the opportunity and a technical hurdle.",
    },
    [
      "Identify the shared-backbone pilot and rival accuracy failure.",
      "Explain that early learning is valuable but reliability remains uncertain.",
      "Assess effects on client trust and the durability of the advantage.",
      "Recommend a monitored pilot and competitor review.",
    ],
    "An argument becomes useful when evidence leads to an explanation, a business consequence and a proportionate recommendation.",
    [
      [
        "Existing client AI supplier",
        "Migration and contract costs may slow adoption.",
      ],
      [
        "Ringcoll’s stronger interest cover",
        "A funded rival response may be more credible.",
      ],
      ["Rival accuracy failure", "Technical feasibility needs testing."],
    ],
    "Match the mechanism, not merely a keyword: switching costs affect adoption, financial headroom affects response capacity, and the failed test challenges reliability.",
  ),
  decision: {
    prompt: "How should Vennlisk respond to the rival’s earlier failure?",
    options: [
      {
        id: "race",
        title: "Rush to advertise a full launch",
        explanation:
          "Publicity could build awareness, but without reliable evidence it exposes Vennlisk’s reputation and reveals the opportunity. Speed alone is not a sufficient reason.",
      },
      {
        id: "pilot",
        title: "Pilot carefully while investigating the failure",
        explanation:
          "This preserves learning and commercial opportunity while testing the same accuracy risk that defeated the rival. Expansion remains conditional on customer and technical evidence.",
      },
    ],
  },
};
const capitals: Lesson = {
  slug: "non-financial-capitals",
  number: "1.2",
  title: "Non-Financial Capitals",
  minutes: 24,
  summary:
    "See how an AI proposal changes knowledge, people, relationships and the environment—not just cash.",
  scenario:
    "Mock scenario: the AI pilot develops a proprietary shared backbone. Routine work may be automated, but the existing five call centres are not being closed as part of the pilot. Environmental effects are prospective rather than achieved savings.",
  question: {
    focus:
      "Evaluate how the proposed AI investment could affect Vennlisk’s relevant non-financial capitals.",
    plain:
      "What valuable resources and relationships could this project build or damage, even if they are not all recorded as assets in the accounts?",
    analyse:
      "Evaluate trade-offs across capitals and over time. Explain who benefits, who could lose and how management can preserve long-term value.",
    knowledge:
      "The Integrated Reporting six-capitals framework, resource interdependence, stakeholder relationships and sustainable value creation. These are original explanations, not extracts from unavailable workbooks.",
    facts: [
      "The proprietary AI backbone is part of the mock proposal.",
      "The pre-seen describes 5,000 agents and investment in training (pp. 11–12).",
      "The renewable electricity target is at least 80% by 2030, not a disclosed current achievement (p. 23).",
    ],
    weak: "A weak answer lists four capitals and assumes that automation immediately saves offices, jobs and emissions.",
    strong:
      "A strong answer explains value creation and erosion, distinguishes future capacity effects from immediate reductions and recommends measures that reveal the trade-offs.",
  },
  sources: [brief, preseen([11, 12, 17, 23, 25]), theory],
  theory: [
    {
      term: "The six-capitals map",
      simple:
        "The framework considers financial, manufactured, intellectual, human, social and relationship, and natural capital. A decision can increase one while reducing another.",
      example:
        "A bakery can buy a faster oven using money, but the gain depends on skilled staff, reliable suppliers and energy.",
      application:
        "Finance funds the AI project; equipment and facilities support it. This lesson focuses on knowledge, people, relationships and natural resources. “Environmental capital” here refers to natural capital.",
    },
    {
      term: "Intellectual capital",
      simple:
        "Knowledge, systems, processes and organisational capabilities help a business create value. They are broader than accounting intangible assets.",
      example:
        "A hotel’s effective booking process has value even where every part is not separately recognised on its balance sheet.",
      application:
        "The backbone, testing methods and technical expertise could create proprietary capability. Not every development cost automatically qualifies for capitalisation; accounting recognition requires separate assessment.",
    },
    {
      term: "Human capital",
      simple:
        "People bring skills, experience, judgement, health and motivation. A workforce is not simply a headcount or a cost.",
      example:
        "A skilled nurse contributes more than time on a shift: experience helps recognise when a patient needs urgent help.",
      application:
        "Agents’ empathy and complex-case judgement remain valuable. Automation can free time for these tasks, but job insecurity, skill loss or unrealistic workloads could erode the benefit.",
    },
    {
      term: "Social and relationship capital",
      simple:
        "Trust and the quality of relationships with clients, employees and other stakeholders influence cooperation.",
      example:
        "A supplier who gives honest warning about a delay may preserve a relationship better than one who makes a promise it cannot keep.",
      application:
        "More reliable service could deepen client relationships and retention. AI errors or a poorly communicated workforce transition could damage client and employee trust.",
    },
    {
      term: "Natural capital and time",
      simple:
        "Natural resources and environmental systems support economic activity. Avoiding future growth is different from cutting today’s footprint.",
      example:
        "A business that serves more customers from the same office may use fewer new buildings than it otherwise would, without closing its current office.",
      application:
        "AI might slow growth in floor space and commuting. The pilot closes no existing centre, and additional computing and cooling may consume energy. Measure net effects before claiming reductions.",
    },
    {
      term: "Interdependence and measurement",
      simple:
        "Capitals work together. A gain that destroys a supporting resource may not last.",
      example:
        "A restaurant can cut training to save money today but lose service quality and regular customers later.",
      application:
        "Technical knowledge depends on trained, cooperative people and trustworthy data use. Assess retention, service quality, learning and energy use alongside financial returns.",
    },
  ],
  application: {
    theory: "Value creation can involve trade-offs between capitals.",
    evidence:
      "The mock backbone could automate routine calls; the pre-seen describes a trained workforce and a renewable-electricity target of at least 80% by 2030.",
    implication:
      "Vennlisk may gain technical capability and capacity while creating employee insecurity and additional computing demand.",
    action:
      "Reskill agents, communicate the transition, measure client outcomes and net environmental effects, and make benefits claims only when supported.",
    explanation:
      "Naming a capital is classification. Analysis explains the mechanism of change, a countervailing effect and how the Board should manage the trade-off.",
  },
  paragraphs: [
    p(
      "knowledge",
      "Build knowledge that can endure",
      "The mock proposal creates a proprietary AI backbone and experience in operating it across separate client partitions.",
      "Successful development could build intellectual capital through software, testing routines and technical expertise, although the value depends on accuracy, security and the ability to maintain the system.",
      "Vennlisk could become less dependent on buying an undifferentiated third-party service, but fragile or undocumented knowledge could disappear when key staff leave.",
      "The Board should protect relevant know-how, document processes and develop sufficient internal capability to challenge suppliers and sustain the service.",
      "The benefit is more than possessing code: Vennlisk needs to understand, maintain and govern it.",
      "This links investment to a capability that can support future value rather than treating every software expense as a guaranteed asset.",
      [brief],
      "Explain what creates the resource, the conditions for its value and how management preserves it.",
    ),
    p(
      "relationships",
      "Earn rather than assume trust",
      "Vennlisk’s pre-seen reputation rests on competent staff and good service, while the pilot proposes a different way of handling some calls.",
      "Consistent, accurate assistance could strengthen client relationships and retention, but errors or an impersonal response to sensitive cases could undermine the same trust.",
      "Client adoption and continued contracts may therefore depend as much on service experience and transparent communication as on headline efficiency.",
      "Vennlisk should agree realistic pilot expectations, provide human escalation and review feedback with clients before presenting relationship benefits as established outcomes.",
      "A faster system may help relationships only if the people using it still feel properly served.",
      "This connects social and relationship capital to contract durability while acknowledging that technology can either support or erode trust.",
      [brief, preseen([11, 12])],
      "Start with the current relationship, evaluate two possible outcomes and recommend how to establish which occurs.",
    ),
    p(
      "people",
      "Preserve the people who make service work",
      "The pre-seen describes 5,000 agents and substantial training, and the mock proposal could automate routine calls.",
      "Agents might develop higher-level skills for complex work, but concerns about job security and progression could reduce motivation or encourage experienced staff to leave.",
      "A loss of empathy, judgement and client knowledge would erode human capital and could weaken the technical project’s commercial benefits.",
      "Management should consult employees, explain what is and is not changing, and fund reskilling and credible progression routes rather than assume that automation automatically improves jobs.",
      "Human capital includes what people know and how willing and able they are to use it. Uncertainty can damage that resource even before redundancies occur.",
      "This shows why staff welfare is part of the business case and not just a communication exercise after approval.",
      [brief, preseen([11, 12, 25])],
      "Connect an operational change to employee behaviour, then show the effect on service and specify a practical safeguard.",
    ),
    p(
      "environment",
      "Keep environmental claims proportionate",
      "The pilot does not close the existing five call centres, and Vennlisk aims to obtain at least 80% of electricity from renewable sources by 2030.",
      "Automation may slow future demand for floorspace, commuting and physical infrastructure, but additional AI computing and cooling could offset some gains.",
      "The environmental case is therefore a prospective net effect, not evidence of an immediate reduction in buildings, travel or emissions.",
      "The Board should measure a baseline and the additional energy demand, compare outcomes with a credible growth scenario and report financial, workforce and environmental trade-offs together.",
      "Avoiding a future expansion is different from reducing the footprint that already exists. Both can matter, but they must be described accurately.",
      "The conclusion weighs intellectual and relationship gains against human and natural-capital risks, supporting credible sustainability reporting.",
      [brief, preseen([11, 23])],
      "Use the stated target accurately, identify the timing and offsetting effects, then recommend measurement before making a benefit claim.",
    ),
  ],
  comparison: {
    weak: "AI increases intellectual capital and reduces environmental damage.",
    whyWeak:
      "The statement assumes benefits, gives no mechanism and ignores employee relationships, computing demand and the timing of any reduction.",
    strong:
      "The proprietary backbone could build intellectual capital if Vennlisk develops reliable systems and retains the expertise to maintain them. However, automation may unsettle agents whose judgement supports service quality. As no existing centre closes in the pilot, environmental benefits relate mainly to avoided future growth and must be weighed against AI energy consumption.",
    whyStrong:
      "It explains what changes, sets conditions and balances gains against damage across different capitals.",
  },
  writing: {
    issue:
      "Explain why automating routine calls might both strengthen and weaken Vennlisk’s human capital.",
    suggested:
      "Automating routine calls could let Vennlisk’s agents focus on complex cases and develop stronger problem-solving skills. However, uncertainty about job security and progression may reduce motivation or cause experienced staff to leave, weakening the knowledge and empathy needed for high-quality service. The Board should consult staff and fund relevant reskilling rather than treat reduced routine work as an automatic improvement. Employee retention, workload and service quality should be monitored alongside capacity gains.",
  },
  checkpoints: checks(
    {
      prompt: "Which environmental statement is supported?",
      options: [
        "The pilot immediately closes all five centres.",
        "The renewable electricity target has already been achieved.",
        "AI may slow future physical expansion, but net environmental benefits need evidence.",
      ],
      correct: 2,
      explanation:
        "The brief says existing centres are not closed. The 80% renewable-electricity figure is a 2030 target, and AI may add computing demand.",
    },
    [
      "Identify automation of routine calls.",
      "Explain possible reskilling and job-security concerns.",
      "Evaluate consequences for staff knowledge, motivation and service.",
      "Recommend consultation and training with outcome monitoring.",
    ],
    "A balanced human-capital argument explains both skill development and the risk of losing experienced people.",
    [
      ["Proprietary backbone and expertise", "Intellectual capital."],
      ["Agent judgement and motivation", "Human capital."],
      [
        "Client confidence in reliable service",
        "Social and relationship capital.",
      ],
      ["Electricity and commuting effects", "Natural capital."],
    ],
    "The framework looks at the resource or relationship affected. A single AI investment can change several capitals at once.",
  ),
  decision: {
    prompt:
      "How should the Board describe environmental benefits at pilot stage?",
    options: [
      {
        id: "claim",
        title: "Announce an immediate reduction in office emissions",
        explanation:
          "The pilot closes no centre and no net energy result is supplied. This would turn a possible future benefit into an unsupported current claim.",
      },
      {
        id: "measure",
        title: "Measure net effects against a credible baseline",
        explanation:
          "Track computing energy and the physical growth that may be avoided. Report a conditional future benefit separately from achieved reductions and the 2030 target.",
      },
    ],
  },
};

const mission: Lesson = {
  slug: "vision-and-mission",
  number: "2.1",
  title: "Vision and Mission",
  minutes: 22,
  summary:
    "Evaluate innovation and service quality together, rather than treating them as competing slogans.",
  scenario:
    "Mock scenario: the proposed AI service uses the shared-backbone approach, but another provider recently struggled with accuracy. The pilot is an opportunity to learn, not evidence that Vennlisk’s AI already delivers excellent customer outcomes.",
  question: {
    focus:
      "Evaluate whether the proposed AI investment is consistent with Vennlisk’s vision and mission.",
    plain:
      "Does this proposal help Vennlisk become the business it says it wants to be, while delivering the service it promises today?",
    analyse:
      "Apply both statements to the proposal, develop the supporting and opposing arguments and recommend conditions that resolve the tension.",
    knowledge:
      "Vision, mission, strategic fit, stakeholder needs and controlled learning through pilots.",
    facts: [
      "The vision concerns leadership in inbound solutions through quality and innovation (p. 13).",
      "The mission concerns an outstanding experience in every inbound call (p. 13).",
      "Accuracy concerns and the specific shared-backbone pilot come from the mock brief.",
    ],
    weak: "A weak answer says “AI is innovative, so it fits” and never tests customer experience or technical reliability.",
    strong:
      "A strong answer explains why innovation supports the vision only where its implementation protects the quality commitment in both statements.",
  },
  sources: [preseen([5, 12, 13]), brief, theory],
  theory: [
    {
      term: "Vision: the destination",
      simple:
        "A vision describes what the organisation aspires to become. It helps direct long-term choices.",
      example:
        "A clinic might aspire to be the community’s most trusted provider, rather than simply own the newest equipment.",
      application:
        "Vennlisk seeks leadership in inbound call solutions through service quality and innovation. The two dimensions need to reinforce each other.",
    },
    {
      term: "Mission: the promise in action",
      simple:
        "A mission describes the organisation’s purpose and what it seeks to deliver. It is a practical test of how it serves people.",
      example:
        "A delivery business promising dependable service cannot justify repeated lost parcels merely because its routing technology is new.",
      application:
        "An outstanding experience in every inbound call requires more than efficient processing. Errors, confusion or lack of empathy can break the promise.",
    },
    {
      term: "Strategic fit is conditional",
      simple:
        "An investment can fit one part of a strategy and conflict with another. Evaluation tests the balance rather than finding a single matching word.",
      example:
        "Self-checkout supports convenience for simple purchases but may frustrate someone needing help with an unusual return.",
      application:
        "AI innovation can support differentiation; inadequate escalation or unreliable answers can undermine quality. The recommendation should state the conditions for alignment.",
    },
    {
      term: "Pilot learning and relevant measures",
      simple:
        "A pilot tests uncertain assumptions on a controlled scale. Measures should reflect the objective, not just activity.",
      example:
        "A restaurant trial should test customer experience and repeat visits, not just how quickly dishes leave the kitchen.",
      application:
        "Track accuracy, resolution, complaints and satisfaction separately for AI-handled calls. Choose suitable clients and preserve human routes for complex or sensitive requests.",
    },
  ],
  application: {
    theory:
      "Strategic fit requires consistency with both purpose and aspiration.",
    evidence:
      "The pre-seen vision emphasises quality and innovation; the mock AI proposal is innovative but faces accuracy uncertainty.",
    implication:
      "AI could support leadership, yet a poor call experience could contradict the mission even where processing is faster.",
    action:
      "Pilot suitable use cases with human escalation and separate quality measures; expand only when the service promise is protected.",
    explanation:
      "The argument evaluates the proposal against the content of each statement, rather than assuming that any new technology is strategically suitable.",
  },
  paragraphs: [
    p(
      "vision",
      "Identify the strategic fit",
      "Vennlisk’s vision combines leadership in inbound call solutions with quality and innovation.",
      "A differentiated shared-backbone service could support the innovation element and develop capabilities that distinguish Vennlisk from conventional providers.",
      "The proposal has a plausible strategic fit, but leadership depends on creating value for clients rather than simply adopting technology before competitors.",
      "The Board should assess the pilot against an explicit quality-led proposition, including how it would improve the service clients and callers receive.",
      "A vision is not a competition to buy the newest tool; it is a direction against which the investment must demonstrate value.",
      "This prevents strategic justification from becoming an excuse to bypass commercial and service evidence.",
      [preseen([13]), brief],
      "Translate the vision into decision criteria instead of repeating its wording as the whole argument.",
    ),
    p(
      "mission",
      "Test the customer promise",
      "Vennlisk’s mission concerns an outstanding experience in every inbound call, while the mock brief reports an earlier rival accuracy failure.",
      "An unreliable assistant could give misleading advice, frustrate callers or fail to recognise when empathy and judgement are needed.",
      "Even an efficient system would conflict with the service promise if its errors create repeat calls, distress or loss of client confidence.",
      "Vennlisk should preserve accessible human escalation and limit initial AI use to cases for which accuracy and appropriate support can be demonstrated.",
      "Fast is useful only when it helps the caller. A cheaper conversation that creates a new problem is not an outstanding experience.",
      "This directly connects a technical limitation to mission, service quality and relationship consequences.",
      [preseen([5, 13]), brief],
      "Use a risk from the scenario, explain the caller-level consequence and recommend a safeguard tied to the mission.",
    ),
    p(
      "pilot",
      "Make the pilot an evidence test",
      "The proposed pilot offers a chance to learn before Vennlisk commits to wider expansion.",
      "However, aggregate satisfaction could hide weak AI performance if most calls remain with experienced human agents.",
      "Without separate measures and appropriate case selection, the Board might mistake acceptable overall results for proof that the AI itself meets the service commitment.",
      "Management should choose suitable pilot clients, track AI-handled accuracy, resolution and satisfaction separately, and use complaints and escalation outcomes to identify limitations.",
      "If we mix the new system’s results with the established service, we may never see whether the new system actually works.",
      "This turns “run a pilot” into a testable governance recommendation rather than a vague reassurance.",
      [brief, preseen([8, 12, 13])],
      "Identify a measurement problem, explain the false conclusion it could produce and specify the evidence the Board needs.",
    ),
    p(
      "conclusion",
      "Combine innovation with quality",
      "The proposed investment supports innovation but its reliability and caller experience remain uncertain.",
      "The vision and mission can therefore support a controlled learning programme while opposing an indiscriminate rollout of unproven automation.",
      "Rejecting all AI could sacrifice learning, whereas expansion based on novelty alone could undermine Vennlisk’s quality differentiation.",
      "I recommend proceeding with a bounded pilot, clear stop-or-improve criteria and human support, authorising expansion only when separately measured customer and commercial outcomes justify it.",
      "Both statements can support the same balanced decision: learn, but do not let the learning process become a reason to ignore harm.",
      "A conclusion should choose a course of action while explaining the conditions that protect the company’s stated purpose.",
      [preseen([13]), brief],
      "Bring the supporting and opposing arguments together in a conditional recommendation rather than ending with “there are advantages and disadvantages”.",
    ),
  ],
  comparison: {
    weak: "AI matches Vennlisk’s vision because the company wants innovation.",
    whyWeak:
      "This selects one word from the vision and ignores its quality element, the mission and the scenario’s accuracy uncertainty.",
    strong:
      "The AI proposal supports the innovation element of Vennlisk’s vision, but unreliable answers could conflict with its mission of an outstanding call experience. A pilot should separately measure AI accuracy and satisfaction, use suitable clients and maintain human escalation. Expansion would be strategically consistent only where the evidence shows that innovation also protects quality.",
    whyStrong:
      "It evaluates both statements, explains a case-specific tension and makes the decision depend on evidence.",
  },
  writing: {
    issue:
      "Explain why reporting only overall customer satisfaction could give the Board a misleading view of the AI pilot.",
    suggested:
      "Overall customer satisfaction may remain strong because experienced agents still handle most calls, concealing poor outcomes in the AI-handled group. That would make it difficult for the Board to judge whether the innovation supports Vennlisk’s quality vision and customer-experience mission. Management should report AI-specific accuracy, resolution and satisfaction alongside complaints and escalation outcomes. Wider rollout should depend on those results and the suitability of the calls selected, rather than a favourable aggregate score.",
  },
  checkpoints: checks(
    {
      prompt: "Which evaluation best applies both statements?",
      options: [
        "Any innovative project must fit the mission.",
        "AI fits the vision only if its implementation also supports the promised call experience.",
        "The mission matters only after rollout.",
      ],
      correct: 1,
      explanation:
        "The vision includes quality as well as innovation. The mission makes caller experience relevant throughout testing and rollout.",
    },
    [
      "Identify the innovation and quality commitments.",
      "Explain the AI opportunity and accuracy uncertainty.",
      "Assess the effect on the caller’s experience.",
      "Recommend pilot gates and human escalation.",
    ],
    "Start with the decision criteria, apply both sides of the proposal and finish with safeguards that make the recommendation coherent.",
    [
      ["Vision", "The aspiration to lead through quality and innovation."],
      ["Mission", "The experience Vennlisk seeks to deliver in every call."],
      [
        "Separate AI satisfaction data",
        "Evidence of whether the new service meets the promise.",
      ],
    ],
    "Vision concerns the desired position; mission concerns purpose and delivery. Separate measurement tests whether the proposal can satisfy both.",
  ),
  decision: {
    prompt:
      "Pilot averages look acceptable, but complex AI-handled calls generate complaints. What should happen?",
    options: [
      {
        id: "expand",
        title: "Expand because the overall average is acceptable",
        explanation:
          "An aggregate score can conceal a subgroup failure. Expansion on that basis would ignore the mission’s customer-experience commitment.",
      },
      {
        id: "limit",
        title: "Limit problematic cases and investigate before expanding",
        explanation:
          "Retain human handling for those cases, review the cause and evaluate AI-specific outcomes. This supports innovation without treating quality failures as an acceptable price of novelty.",
      },
    ],
  },
};
const debt: Lesson = {
  slug: "debt-financing",
  number: "2.2",
  title: "Debt Financing",
  minutes: 26,
  summary:
    "Turn borrowing ratios into a judgement about cash, risk and staged commitment.",
  scenario:
    "Mock scenario: total proposed AI investment is W$280m, comprising a W$40m pilot followed by W$240m rollout if justified. These project costs are supplied in the teaching brief, not the pre-seen financial statements.",
  question: {
    focus:
      "Evaluate borrowing to finance the proposed AI investment, including lender concerns and the benefits of staged funding.",
    plain:
      "Can Vennlisk afford the commitment, what would worry a lender, and when should it draw the money?",
    analyse:
      "Assess size, cash-flow capacity, financial risk and funding timing. Distinguish an agreed facility from cash drawn and match later commitments to evidence.",
    knowledge:
      "Debt, gearing, interest cover, covenants, liquidity, forecasts and borrowing in tranches.",
    facts: [
      "Pre-seen 2026 debt is W$5,460.0m; cash is W$986.1m; the latest dividend is W$509.6m (pp. 18–19).",
      "Gearing is about 39.8% using debt / (debt + equity); operating-profit interest cover is about 3.32 times.",
      "The W$40m / W$240m split and proposed W$280m total are mock-brief facts.",
    ],
    weak: "A weak answer says there is enough bank cash, or calls W$280m “small” without considering commitments, downside forecasts or when funding is needed.",
    strong:
      "A strong answer weighs the project’s relative size against financing headroom, protects working liquidity and recommends a facility with justified release conditions.",
  },
  sources: [brief, preseen([18, 19]), theory],
  theory: [
    {
      term: "Debt financing",
      simple:
        "A lender provides money that must be repaid under agreed terms, usually with interest. Repayment is not optional just because a project disappoints.",
      example:
        "A shop may borrow to refit, but loan payments still fall due if sales are slower than expected.",
      application:
        "Borrowing could fund the AI proposal without immediate ownership dilution, but creates commitments while technology benefits remain uncertain.",
    },
    {
      term: "Gearing",
      simple:
        "Gearing indicates the contribution of debt to a defined funding base. Always state the definition.",
      example:
        "A house funded mainly by a mortgage has more debt exposure than a comparable house funded largely by its owner’s money.",
      application:
        "Using closing book debt / (debt + equity), Vennlisk is 5,460 / (5,460 + 8,253.1) × 100 ≈ 39.8%. A W$280m addition is about 5.13% of existing debt, not proof that it is risk-free.",
    },
    {
      term: "Interest cover",
      simple:
        "Interest cover compares operating profit with finance costs. It is an earnings indicator, not a direct cash balance or a promise about future results.",
      example:
        "If a café earns 30 before interest and owes 10 in interest, cover is 3 times; a drop in earnings reduces the cushion.",
      application:
        "Vennlisk’s 1,451.0 / 436.8 ≈ 3.32 times. Additional interest or weaker operating profit can reduce that headroom. No proposed borrowing rate is supplied.",
    },
    {
      term: "Covenants and lender concerns",
      simple:
        "Covenants are contractual conditions, such as maintaining a ratio or restricting further borrowing. The actual conditions depend on the agreement.",
      example:
        "A lender may require regular forecasts and a minimum interest-cover ratio before allowing more funds to be drawn.",
      application:
        "Inspect Vennlisk’s actual agreements and proposed terms. The source does not disclose a covenant threshold, security package or existing breach; none should be invented.",
    },
    {
      term: "Liquidity and cash-flow forecasts",
      simple:
        "Liquidity is the ability to meet payments when due. Accounting profit and a bank balance at one date do not tell the whole story.",
      example:
        "A business may have cash today but need most of it for wages and suppliers next week.",
      application:
        "W$986.1m of cash cannot all be assumed spare. Forecast payroll, working capital, debt service, distributions and project costs, including downside cases and timing of benefits.",
    },
    {
      term: "Tranches and committed facilities",
      simple:
        "A facility can agree access to funding while money is drawn in stages. Conditions and fees still matter.",
      example:
        "A home extension loan might release money after each construction milestone instead of paying for all work on day one.",
      application:
        "Draw for the W$40m pilot first and release the W$240m rollout amount only if justified. Negotiate availability, commitment fees and reliable conditions so later funding is not assumed guaranteed.",
    },
  ],
  application: {
    theory:
      "Match funding commitments and drawdowns to uncertainty and cash needs.",
    evidence:
      "The brief separates W$40m of pilot spending from W$240m of later rollout; existing debt is W$5,460m and interest cover about 3.32×.",
    implication:
      "Drawing everything immediately may create avoidable interest and idle cash, while relying on an uncommitted future loan creates refinancing risk.",
    action:
      "Negotiate a staged facility with clear commercial and technical gates, acceptable fees and covenant headroom; draw in line with actual spending.",
    explanation:
      "This moves beyond describing tranches: it explains both their benefit and the risk of assuming future funding will be available.",
  },
  paragraphs: [
    p(
      "scale",
      "Put the borrowing in proportion",
      "The mock proposal requires W$280m, compared with Vennlisk’s existing borrowings of W$5,460m.",
      "The addition is approximately 5.13% of existing debt, so its size is relatively modest, but Vennlisk’s current gearing of about 39.8% and interest cover of 3.32 times remain relevant.",
      "A project need not be large relative to debt to increase risk where earnings or implementation benefits are uncertain.",
      "The Board should assess the proposal through forecast interest cover, cash-flow and debt-service headroom rather than approve it solely because the percentage addition appears small.",
      "“Small relative to existing debt” is one observation, not the whole decision. What matters is whether future payments remain manageable.",
      "This prevents a size comparison from being mistaken for evidence that Vennlisk has unlimited funding capacity.",
      [brief, preseen([18, 19])],
      "Calculate the proportion, interpret it cautiously and identify the decision evidence the ratio cannot supply.",
    ),
    p(
      "cash",
      "Protect working liquidity",
      "Vennlisk reports W$986.1m of bank cash and a recent dividend of W$509.6m.",
      "Although the cash balance exceeds the proposed project cost, it is a point-in-time figure and may be needed for payroll, working capital, debt service and other commitments.",
      "Using cash indiscriminately could weaken resilience, while maintaining distributions and borrowing for investment could increase financing costs and constrain flexibility.",
      "Finance should prepare integrated cash-flow forecasts, review distribution choices and compare cash funding with borrowing under realistic downside scenarios.",
      "Having money in the bank does not mean all of it is available to spend on one project. The dividend is relevant to choices about retaining funds, not proof that cash is surplus.",
      "This connects financing to liquidity timing and shareholder expectations without pretending that a full cash-flow statement is supplied.",
      [preseen([18, 19]), brief],
      "Use the reported balances, explain their limits and evaluate alternatives rather than treating borrowing as the only possible source.",
    ),
    p(
      "lender",
      "Anticipate lender questions",
      "The proposed AI service has not yet demonstrated the benefits expected from full rollout.",
      "A lender may question forecast accuracy, the reliability of technology, repayment sources and the effect of failure on existing debt commitments.",
      "Unfavourable covenants, security or pricing could make an apparently affordable loan restrictive, and borrowing against untested benefits could leave less room for other investment.",
      "Vennlisk should provide credible pilot evidence and downside forecasts, inspect existing covenants and negotiate acceptable terms without assuming any particular threshold or rate that the source does not disclose.",
      "The lender needs confidence in repayment, not just enthusiasm for AI. Conditions can matter as much as the headline amount.",
      "This brings a stakeholder perspective into the financing evaluation and identifies what must be checked before approval.",
      [brief, preseen([18, 19])],
      "Explain a lender’s concern, its consequence for Vennlisk and the evidence and negotiation required; do not invent contractual facts.",
    ),
    p(
      "tranches",
      "Recommend staged financing",
      "The brief divides the investment into a W$40m pilot and W$240m of subsequent rollout.",
      "A staged facility could avoid paying full borrowing costs before the later spending is needed and allow the Board to stop or revise the project after evaluating the pilot.",
      "However, an uncommitted later loan could be unavailable or more expensive, and a committed facility may involve fees and release conditions.",
      "I recommend negotiating the facility in advance where terms are acceptable, drawing initially for the pilot and releasing rollout funding only after technical reliability, customer outcomes and revised financial forecasts meet agreed gates.",
      "Arrange dependable access where appropriate, but do not confuse agreeing a facility with drawing all the cash. A pilot is useful only if the later decision can genuinely change.",
      "The conclusion preserves opportunity while making both investment and financing responsive to evidence.",
      [brief],
      "Use the actual spending stages, evaluate interest and funding-availability trade-offs and state conditions for the next drawdown.",
    ),
  ],
  comparison: {
    weak: "Vennlisk can afford the AI project because it has W$986.1m in cash.",
    whyWeak:
      "This treats a balance at one date as spare cash and overlooks payroll, debt service, distributions, project risk and funding timing.",
    strong:
      "The W$280m proposal is about 5.13% of Vennlisk’s existing borrowings, but current interest cover of 3.32 times means debt-service headroom still matters. Finance should protect liquidity through integrated forecasts and negotiate a staged facility, drawing W$40m for the pilot before releasing W$240m only when technical, customer and financial evidence supports rollout.",
    whyStrong:
      "It uses source figures with their limitations, explains risk and turns the proposed investment stages into a financing recommendation.",
  },
  writing: {
    issue:
      "Explain why agreeing a W$280m facility does not necessarily mean drawing all W$280m immediately.",
    suggested:
      "A committed facility could give Vennlisk confidence that funding will be available, while staged drawdowns align interest-bearing debt with actual spending. The W$40m pilot can be funded first, with the W$240m rollout amount released only if the pilot demonstrates reliable service and a viable financial case. However, availability, commitment fees and release conditions must be negotiated rather than assuming that unused borrowing is free or guaranteed. Finance should compare those terms with downside cash needs and existing debt obligations.",
  },
  checkpoints: checks(
    {
      prompt: "Which conclusion is justified by Vennlisk’s cash balance?",
      options: [
        "All W$986.1m is surplus and available for AI.",
        "It is a point-in-time resource whose availability depends on future commitments.",
        "The bank balance proves the project has a positive return.",
      ],
      correct: 1,
      explanation:
        "A bank balance does not reveal payroll timing, debt service, working capital or future project benefits. Forecast cash availability before deciding how much to use.",
    },
    [
      "Forecast the W$40m pilot’s funding needs and downside cash flows.",
      "Negotiate a facility with acceptable availability, fees and conditions.",
      "Evaluate pilot reliability, customer outcomes and updated forecasts.",
      "Release W$240m for rollout only if the evidence justifies it.",
    ],
    "The exact negotiation and approval process can vary, but do not release rollout funds before assessing the pilot and financing conditions.",
    [
      ["Gearing", "Debt as a proportion of a defined capital base."],
      ["Interest cover", "Operating profit relative to finance costs."],
      ["Covenant", "A contractual condition that must be inspected."],
      ["Tranche", "A staged release or drawdown of funding."],
    ],
    "Each concept answers a different question: funding structure, earnings cushion, contractual limits and timing.",
  ),
  decision: {
    prompt: "How should Vennlisk arrange the W$280m funding?",
    options: [
      {
        id: "full",
        title: "Draw all W$280m immediately",
        explanation:
          "This can secure cash but may create interest on money not yet needed and weaken the discipline of stage gates. It could be justified only by the actual terms and liquidity analysis, not by a general preference for borrowing early.",
      },
      {
        id: "staged",
        title: "Negotiate access and draw in stages",
        explanation:
          "Fund the W$40m pilot and make the W$240m draw conditional on justified rollout. Compare fees, covenant terms and certainty of later availability; staged funding is not automatically costless.",
      },
    ],
  },
  financing: { pilot: 40, rollout: 240 },
};

const controls: Lesson = {
  slug: "internal-controls",
  number: "3.1",
  title: "Internal Controls",
  minutes: 27,
  summary:
    "Separate fraudulent messages from data leakage, then choose controls that address the actual causes.",
  scenario:
    "Mock scenario: fraudulent communications mislead AI-service customers, and one client’s customer information appears in another client’s AI interactions. These are mock incidents, not breaches reported in the official pre-seen.",
  question: {
    focus:
      "Recommend and evaluate controls for fraudulent communications and unintended cross-client data exposure in the AI service.",
    plain:
      "How can Vennlisk protect people from being tricked, and separately stop information from one client leaking into another client’s service?",
    analyse:
      "Identify the distinct mechanisms, match controls to each, and explain how prevention, detection and correction work together.",
    knowledge:
      "Control objectives, segregation, access management, incident response and the difference between a proposed control and evidence that it works.",
    facts: [
      "Both incidents and the AI partitions come from the mock brief.",
      "The pre-seen identifies privacy risk and training/refresher courses as disclosed mitigation (p. 17).",
      "Familiar customer information is not proof that a message is genuine.",
    ],
    weak: "A weak answer recommends generic cybersecurity training for both incidents and assumes that known personal details authenticate a sender.",
    strong:
      "A strong answer separates impersonation from data segregation failure, explains control mechanisms and requires testing and investigation before relying on them.",
  },
  sources: [brief, preseen([15, 17]), theory],
  theory: [
    {
      term: "Control objectives first",
      simple:
        "A control should address a defined risk. Different risks may need different tools even when both involve technology.",
      example:
        "A shop needs one control to stop fake refund requests and a different one to stop staff seeing another branch’s confidential payroll.",
      application:
        "Fraudulent communications require safe verification and response routes. Cross-client exposure requires effective segregation and investigation of how the information crossed a boundary.",
    },
    {
      term: "Preventive controls",
      simple: "These aim to stop an error or abuse before it happens.",
      example:
        "A door lock prevents unauthorised entry; a visitor sign-in book does not perform the same function.",
      application:
        "Examples include default-deny client access, server-validated partition identity, suitable data boundaries and clear policies that unsolicited messages never request passwords or card security details. These are recommendations, not disclosed existing AI controls.",
    },
    {
      term: "Detective controls",
      simple:
        "These reveal events that have happened or patterns that need investigation.",
      example:
        "A bank alert can reveal an unusual transaction even if it did not prevent it.",
      application:
        "Client-labelled audit logs, monitoring and a review of historical pilot sessions can identify inappropriate access and affected conversations. Logs need usable records and protection against alteration.",
    },
    {
      term: "Corrective controls",
      simple:
        "These contain harm and restore a reliable process after a problem is discovered.",
      example:
        "A food shop withdraws affected stock, identifies the source and changes the process before selling it again.",
      application:
        "Suspend affected functionality where necessary, move callers to trained humans, investigate and fix the cause, and retest before restoration. A restart without remediation is not correction.",
    },
    {
      term: "Authenticating a message",
      simple:
        "Recognising a detail does not establish the sender’s identity. Attackers may know names, purchases or account information.",
      example:
        "Someone quoting your delivery address may still be impersonating a courier.",
      application:
        "Tell customers to verify contact through an independently obtained official channel, not a link or number supplied in the suspicious message. Provide reporting routes and clear credential-request policies.",
    },
    {
      term: "Partitioning and access controls",
      simple:
        "A partition is an intended separation. Its effectiveness depends on how requests, data and permissions are actually handled.",
      example:
        "Separate labels on office cupboards do not protect confidential files if everyone has the same key.",
      application:
        "Independent technical assessment should test client isolation across retrieval, prompts, logs, caches and other relevant paths. The brief does not establish which layer failed, so the root cause must not be assumed.",
    },
  ],
  application: {
    theory: "Control design must follow the specific failure mechanism.",
    evidence:
      "The mock brief describes both misleading communications and information appearing across client partitions.",
    implication:
      "A caller can be deceived even if partitioning is fixed; equally, awareness messages will not repair a data-isolation failure.",
    action:
      "Combine independently verifiable communication routes with technical isolation assessment, historical review, monitoring and tested remediation.",
    explanation:
      "The argument distinguishes the objectives and demonstrates why a single generic control cannot be assumed to resolve two different risks.",
  },
  paragraphs: [
    p(
      "separate",
      "Define two separate control problems",
      "The mock incidents involve fraudulent communications and customer information appearing in another client’s AI interaction.",
      "The first concerns deception and verification of communications, while the second indicates that intended data separation has not operated as expected.",
      "Treating both as a general awareness problem could leave a technical exposure unresolved, while repairing partitioning alone would not stop an impersonator contacting customers.",
      "Vennlisk should establish separate incident workstreams with coordinated evidence, ownership and escalation, matching each proposed control to the failure it addresses.",
      "Two problems can happen together without having the same cause or solution. We need to understand each before recommending controls.",
      "This avoids a list of fashionable security measures that do not address the actual scenario.",
      [brief],
      "Classify the risks, explain why the distinction changes the response and give a practical way to organise the work.",
    ),
    p(
      "messages",
      "Make verification independent",
      "The fraudulent communications described in the brief could appear credible if they contain familiar customer information.",
      "Names or transaction details do not prove authenticity because such details may already be known to an attacker or exposed elsewhere.",
      "Customers could disclose credentials or act on a fraudulent instruction even where the message looks personalised and professional.",
      "Vennlisk and its clients should publicise official contact routes, instruct customers to verify through independently obtained details, state that unsolicited messages never request passwords or card security credentials, and make suspicious interactions easy to report.",
      "The safe test is not “does the sender know me?” but “can I verify this request through a channel I already trust?”",
      "The recommendation links awareness to an actionable verification method rather than merely telling customers to be careful.",
      [brief],
      "Challenge a plausible but unreliable assumption, explain the harm and propose preventive and reporting mechanisms.",
    ),
    p(
      "segregation",
      "Investigate the boundary failure",
      "The brief reports one client’s customer information appearing in another client’s AI interactions despite intended partitions.",
      "Possible weaknesses may concern access decisions, retrieval, session context or other system paths; the incident alone does not identify the precise technical cause.",
      "A superficial change could leave other routes exposed, creating further harm to clients, callers and trust in the wider service.",
      "Management should commission an independent technical assessment, enforce validated client identity and least-privilege access, test cross-client isolation and preserve protected audit logs, while keeping affected functions suspended or human-handled where necessary.",
      "The fact tells us that a boundary failed, not exactly how it failed. Independent testing should cover the routes through which information can travel.",
      "This makes the response evidence-led and avoids promising that a password change or a single code fix solves an unidentified defect.",
      [brief, preseen([17])],
      "Acknowledge uncertainty about cause, connect it to continuing risk and specify the objective and breadth of assessment.",
    ),
    p(
      "review",
      "Combine prevention, detection and correction",
      "The incidents arose during the pilot and may not be confined to the first sessions reported.",
      "Reviewing historical pilot interactions and access logs can identify the affected period and clients, while continuing monitoring can test whether remediation is effective.",
      "Without that review, Vennlisk could underestimate the scope of exposure or restore service while a material weakness remains.",
      "The Board should require documented containment, an evidence-preserving investigation, corrective changes and independent retesting before further rollout, with client communication and any legal notifications based on verified facts and applicable requirements.",
      "Finding a first report is the beginning of determining the scope. Restoration should follow evidence that the problem is controlled.",
      "The conclusion integrates preventive, detective and corrective work and connects incident handling to the wider investment decision.",
      [brief],
      "Extend the investigation beyond the initial report, explain the decision risk and set conditions for restoration and expansion.",
    ),
  ],
  comparison: {
    weak: "Vennlisk should train customers and improve cybersecurity.",
    whyWeak:
      "There is no explanation of which control addresses which risk, how authenticity is checked or why the AI partitions failed.",
    strong:
      "Customer warnings should direct people to independently verified contact channels, because familiar personal details do not authenticate a message. Separately, the cross-client exposure requires independent testing of data segregation and access decisions, with preserved logs and historical pilot review. Affected functions should remain suspended or human-handled until the cause is corrected and isolation is retested.",
    whyStrong:
      "It distinguishes mechanisms, explains control objectives and combines immediate containment with evidence-based restoration.",
  },
  writing: {
    issue:
      "A manager says that a message quoting the customer’s recent transaction must be genuine. Explain why this is unsafe and recommend a better control.",
    suggested:
      "A familiar transaction detail does not establish that a message is authentic, because an impersonator may already possess that information. Encouraging customers to rely on it could increase the credibility of fraudulent requests and expose credentials or money. Vennlisk and its clients should direct customers to verify through official contact details obtained independently, rather than links or numbers in the unsolicited message. Clear policies on never requesting passwords or card security details through such messages, together with reporting and incident monitoring, would strengthen the response.",
  },
  checkpoints: checks(
    {
      prompt:
        "Which fact reliably proves that an unsolicited message is authentic?",
      options: [
        "It contains the customer’s name and recent purchase.",
        "It uses the client’s logo.",
        "Neither; the customer should verify through an independently obtained official channel.",
      ],
      correct: 2,
      explanation:
        "Personal details and branding can be copied or misused. Verification should not depend on information or contact routes supplied by the suspicious sender.",
    },
    [
      "Contain the affected service and preserve evidence.",
      "Investigate scope and root cause, including historical pilot sessions.",
      "Implement targeted corrective controls.",
      "Independently retest and authorise restoration against evidence.",
    ],
    "Containment protects people while facts are established; a restart should follow remediation and evidence, not replace them.",
    [
      ["Default-deny partition access", "Preventive control."],
      ["Historical log and session review", "Detective control."],
      ["Fix and retest the faulty isolation path", "Corrective control."],
    ],
    "Controls can support more than one objective in practice; these matches identify their primary role in the described example.",
  ),
  decision: {
    prompt: "Which response best addresses both incidents?",
    options: [
      {
        id: "awareness",
        title: "Send awareness messages and restart",
        explanation:
          "Awareness may help fraud prevention, but it does not establish that cross-client data access has been fixed. A restart without evidence leaves the second risk unresolved.",
      },
      {
        id: "separate",
        title: "Coordinate distinct fraud and isolation workstreams",
        explanation:
          "Use safe customer verification and reporting for deception, technical assessment and segregation for leakage, and shared monitoring, historical review and restoration gates.",
      },
    ],
  },
};
const audit: Lesson = {
  slug: "audit-committee",
  number: "3.2",
  title: "Audit Committee",
  minutes: 25,
  summary:
    "Understand independent oversight after an incident, without assigning operational management to the committee.",
  scenario:
    "Mock scenario: the answer brief describes fraud and cross-client data incidents affecting two pilot clients, followed by a two-week service suspension. These developments are not reported in the official pre-seen.",
  question: {
    focus:
      "Evaluate how the Audit Committee should exercise oversight following the AI fraud and data exposure incidents.",
    plain:
      "What should the committee ask, what evidence should it demand, and how can it make sure management fixes the cause before the service returns?",
    analyse:
      "Distinguish implementation from oversight, consider the scope and independence of assurance, and connect safe restoration to the wider rollout decision.",
    knowledge:
      "Audit Committee oversight, management accountability, internal audit, root-cause investigation, evidence and follow-up.",
    facts: [
      "Two affected pilot clients and a two-week suspension are mock-brief facts.",
      "The pre-seen Audit members are Murat Mutlu, Kyle Keimer and Mirjana Churlin (p. 16).",
      "The Chief Internal Auditor reports to the Audit Committee convener; no convener is named (p. 16).",
    ],
    weak: "A weak answer says the committee should fix the software itself or treats the end of a two-week pause as proof that the service is safe.",
    strong:
      "A strong answer demands independent evidence of cause, scope and control effectiveness, challenges management and makes restoration and rollout conditional on verified outcomes.",
  },
  sources: [brief, preseen([15, 16, 17]), theory],
  theory: [
    {
      term: "Why an Audit Committee exists",
      simple:
        "A smaller Board committee can give focused attention to reporting, controls and assurance. It supports accountability rather than replacing management.",
      example:
        "A school governing body asks whether safety checks are effective; it does not personally repair every door.",
      application:
        "The committee should scrutinise management’s response and the reliability of assurance after the AI incidents. Its detailed charter is not supplied, so the lesson applies general governance principles to the disclosed structure.",
    },
    {
      term: "Management versus oversight",
      simple:
        "Managers design and operate controls and deliver corrective action. The committee questions, reviews and follows up on their work.",
      example:
        "A transport manager repairs the booking process; an oversight body asks what failed, whether the fix works and who verified it.",
      application:
        "Operations owns technical delivery, with other executives supporting clients, people and finance. Audit should not become the system developer or declare a technical fix effective without competent evidence.",
    },
    {
      term: "Independent assurance",
      simple:
        "Assurance gives confidence based on an assessment. Independence reduces the risk of accepting the designer’s own optimistic view.",
      example:
        "A building owner uses an independent inspection rather than relying only on the contractor’s statement that a structural repair is sound.",
      application:
        "Commission technical expertise where necessary and use internal audit to assess the control framework. Internal audit should not design controls it then claims independently to assess.",
    },
    {
      term: "Root cause and scope",
      simple:
        "Root cause explains why a failure occurred; scope establishes how far the harm extends. Both matter before restoration.",
      example:
        "Cleaning water from a floor does not repair the leaking pipe, and one visible puddle does not identify every affected room.",
      application:
        "Challenge whether fraud and data exposure have different causes, whether other pilot sessions were affected and whether shared components could expose more clients than the two reported.",
    },
    {
      term: "Evidence-based restoration",
      simple:
        "A service should return because the necessary safety conditions are met, not merely because a pause has lasted long enough.",
      example:
        "A restaurant reopens after resolving contamination and passing checks, not automatically after two weeks.",
      application:
        "Review documented fixes, independent isolation tests, monitoring, staff readiness and fallback routes. A phased return can reduce exposure but still requires appropriate approvals and defined stop conditions.",
    },
    {
      term: "Ongoing monitoring and Board decisions",
      simple:
        "Oversight continues after an initial fix. Trends, overdue actions and repeat failures can reveal whether the response holds.",
      example:
        "A repaired machine is monitored in use to see whether the fault recurs under real workload.",
      application:
        "Require incident and control reporting, follow up internal audit actions, coordinate with Risk and Sustainability and advise the Board on the implications for wider rollout and funding gates.",
    },
  ],
  application: {
    theory:
      "Oversight depends on reliable evidence and clear separation of responsibilities.",
    evidence:
      "The mock incidents affected two pilot clients and the service was suspended for two weeks; internal audit’s reporting line to the Audit convener is disclosed in the pre-seen.",
    implication:
      "Pressure to restore service could encourage acceptance of management reassurance before the actual causes and cross-client risks are resolved.",
    action:
      "Use independent technical assessment and internal audit, challenge scope and root-cause conclusions, and recommend restoration and rollout conditions supported by tested evidence.",
    explanation:
      "This is governance analysis because it explains how the committee obtains and evaluates assurance while leaving implementation with accountable managers.",
  },
  paragraphs: [
    p(
      "accountability",
      "Establish responsibility and challenge",
      "The mock brief describes incidents affecting two pilot clients and a two-week suspension of the AI service.",
      "The Audit Committee should challenge the adequacy of management’s response while management remains responsible for containment, investigation and implementation of controls.",
      "If the committee takes over day-to-day remediation, accountability may become blurred and its ability to scrutinise management’s work could weaken.",
      "It should require a clear incident report, named executive owners, a corrective-action plan and regular progress reporting, escalating material concerns to the Board and coordinating with Risk and Sustainability.",
      "The committee’s job is to make sure the right work is done and tested, not to write the software fix itself.",
      "This creates a usable division of responsibilities and prevents “the committee should resolve it” from becoming an empty recommendation.",
      [brief, preseen([15, 16])],
      "State the incident, distinguish responsibilities, explain the governance risk and specify the evidence and accountability required.",
    ),
    p(
      "assurance",
      "Demand competent, independent assessment",
      "The two reported problems involve fraudulent communications and failure of intended client-data separation.",
      "Management’s explanation should be tested against technical evidence, and the committee should ask whether the investigation distinguishes the causes and reviews historical pilot activity beyond the first reports.",
      "Accepting a narrow or self-reviewed conclusion could leave a material weakness in shared components and expose other interactions or clients.",
      "The committee should obtain independent technical assurance where needed and involve internal audit in assessing control design, evidence and follow-up through its reporting line to the Audit Committee convener.",
      "An assurance function can check whether the response is sound, but specialist AI and security questions may need specialist competence too.",
      "This protects the quality of the investigation without assuming the source identifies a particular software defect or committee convener.",
      [brief, preseen([16, 17])],
      "Identify why reassurance is insufficient, specify the scope of testing and match assurance work to appropriate expertise.",
    ),
    p(
      "restore",
      "Make restoration conditional",
      "The service has been suspended for two weeks in the mock scenario, but elapsed time does not demonstrate that the root causes have been resolved.",
      "Commercial pressure to return quickly may conflict with the need to establish safe partitioning, reliable customer verification and workable incident detection.",
      "An early restart could repeat harm, deepen client mistrust and undermine the case for expanding a quality-led service.",
      "The committee should scrutinise evidence of remediation and independent retesting, challenge readiness and fallback arrangements, and recommend restoration only when defined conditions and the appropriate management and Board approvals are satisfied.",
      "A date is not a safety test. The right question is what has changed and what competent evidence demonstrates that it works.",
      "This balances commercial urgency against service and privacy consequences without making the committee the operational restart manager.",
      [brief, preseen([13, 16])],
      "Contrast the superficial measure with the real objective, explain the consequence of a wrong decision and set an evidence-based gate.",
    ),
    p(
      "rollout",
      "Keep oversight connected to strategy",
      "The pilot is intended to inform a wider AI rollout, so the incidents are relevant to the future investment decision as well as immediate service recovery.",
      "A larger client base could magnify harm if unresolved weaknesses are embedded in the shared backbone or its operating controls.",
      "Successful restoration of a limited service would not by itself prove that Vennlisk is ready for full-scale expansion or that the original financial assumptions remain valid.",
      "I recommend continued incident and control monitoring, time-bound follow-up of assurance actions and reassessment of rollout and funding gates, with the Board receiving a balanced view of residual risks, client outcomes and revised benefits before authorising expansion.",
      "A repair can make the pilot safe enough to resume without proving that every proposed future use is safe or commercially sound.",
      "The conclusion connects assurance to capital allocation and quality strategy rather than ending oversight at the first clean test.",
      [brief, preseen([15, 16])],
      "Explain the scale effect, qualify the meaning of restoration and recommend ongoing monitoring tied to the Board’s next decision.",
    ),
  ],
  comparison: {
    weak: "The Audit Committee should fix the partitions and reopen the service after two weeks.",
    whyWeak:
      "This assigns operational implementation to the committee and treats elapsed time as proof of control effectiveness. It ignores independent assurance and the wider rollout.",
    strong:
      "Management should investigate and remediate the failures, while the Audit Committee challenges the scope, causes and evidence of effective controls. The two-week suspension does not establish readiness. Independent technical testing and internal audit follow-up should support appropriate restoration approvals, and the Board should reconsider rollout and funding gates in light of residual risk and revised benefits.",
    whyStrong:
      "It separates responsibility, uses the scenario critically and connects assurance to both immediate recovery and later strategic commitment.",
  },
  writing: {
    issue:
      "Management says that the service can restart because the two-week suspension has ended. Write the Audit Committee’s challenge.",
    suggested:
      "The end of the two-week suspension is not evidence that the AI service is safe to restore. The Audit Committee should require management to explain the root causes, the extent of affected sessions and the corrective action, supported by competent independent retesting of client isolation and other relevant controls. Internal audit should follow up the control response without assuming responsibility for operating it. Restoration and later rollout should depend on evidence, effective monitoring and agreed fallback arrangements rather than the passage of time alone.",
  },
  checkpoints: checks(
    {
      prompt: "Who should implement the AI control fixes?",
      options: [
        "Management, subject to scrutiny and assurance.",
        "The Audit Committee acting as the software team.",
        "Internal audit, which should then independently audit its own design.",
      ],
      correct: 0,
      explanation:
        "Management operates and implements controls. Audit challenges and reviews assurance; internal audit’s objectivity can be weakened if it designs the controls it later assesses.",
    },
    [
      "Require a scoped incident report and accountable action owners.",
      "Obtain root-cause analysis and competent independent assurance.",
      "Challenge tested remediation and restoration readiness.",
      "Monitor residual risks and reconsider wider rollout gates.",
    ],
    "Oversight builds from understanding the incident to evaluating evidence and following up strategic consequences; it does not end when a timer expires.",
    [
      ["Management", "Implements and operates corrective controls."],
      ["Audit Committee", "Challenges the response and reviews assurance."],
      ["Chief Internal Auditor", "Reports to the Audit Committee convener."],
      ["Full Board", "Considers the wider strategic rollout decision."],
    ],
    "These are complementary responsibilities. The pre-seen gives the internal audit reporting line, but does not name a committee convener.",
  ),
  decision: {
    prompt:
      "What should the committee do if managers want to restart before independent testing is complete?",
    options: [
      {
        id: "speed",
        title: "Accept the deadline and reopen immediately",
        explanation:
          "A commercial deadline cannot substitute for evidence that the causes are corrected. The committee should challenge the residual risk and the basis for readiness.",
      },
      {
        id: "evidence",
        title: "Require evidence and scrutinise a controlled restoration plan",
        explanation:
          "Ask what testing remains, whether affected functions can remain suspended or human-handled, and how residual risk and approvals will be documented. Management implements; the committee provides challenge and assurance oversight.",
      },
    ],
  },
};

export const mock1: MockExam = {
  id: "mock-1",
  title: "Mock Exam 1",
  window: "November 2026 – February 2027",
  caseName: "Vennlisk Case Study",
  description:
    "Learn to turn case evidence into a balanced, professionally written strategic answer.",
  sections: [
    {
      id: "strategic-analysis",
      number: "01",
      title: "Strategic Analysis",
      description:
        "Understand the competitive landscape and the resources that create value.",
      lessons: [competitor, capitals],
    },
    {
      id: "strategic-financial",
      number: "02",
      title: "Strategic and Financial Decisions",
      description:
        "Connect purpose, investment and funding to evidence-based judgement.",
      lessons: [mission, debt],
    },
    {
      id: "risk-governance",
      number: "03",
      title: "Risk, Controls and Governance",
      description:
        "Separate failures, design relevant controls and clarify independent oversight.",
      lessons: [controls, audit],
    },
  ],
};
