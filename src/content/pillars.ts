/**
 * All editorial copy for the five pillars lives here, separate from layout components.
 * Edit text freely; ids are used for navigation links (#approach, #approach-a, …).
 */

export interface ExploreItem {
  code: string;
  title: string;
  teaser: string;
  icon: 'cpu' | 'sliders' | 'rows' | 'question' | 'workflow' | 'chart' | 'sparkles' | 'shield' | 'layers' | 'route';
}

export interface PillarMeta {
  id: string; // hash token
  number: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  explore: [ExploreItem, ExploreItem];
  layout: 'split' | 'stacked';
  dark?: boolean;
}

export const pillars: PillarMeta[] = [
  {
    id: 'approach',
    layout: 'split',
    number: '01',
    navLabel: 'Approach',
    eyebrow: 'Who we are',
    title: 'Human understanding through data.',
    intro:
      'We combine research, technology, AI and human expertise to decode complexity, understand people and turn information into meaningful intelligence.',
    explore: [
      { code: '1A', title: 'Technology at scale. Humans at the center.', teaser: 'Where algorithms stop and analysts take over.', icon: 'cpu' },
      { code: '1B', title: 'Built around your challenge.', teaser: 'See how the blend changes with each challenge.', icon: 'sliders' },
    ],
  },
  {
    id: 'research',
    layout: 'stacked',
    number: '02',
    navLabel: 'Research',
    eyebrow: 'Research & insights',
    title: 'The right method for every question.',
    intro:
      'From traditional research to digital intelligence, we bring together the methods and expertise needed to understand what people think, feel, say and do.',
    explore: [
      { code: '2A', title: 'One partner. Multiple research methods.', teaser: 'Every method we run, grouped by family.', icon: 'rows' },
      { code: '2B', title: 'Designed around the question.', teaser: 'Pick a question and see the method it calls for.', icon: 'question' },
    ],
  },
  {
    id: 'data',
    layout: 'stacked',
    number: '03',
    navLabel: 'Data Intelligence',
    eyebrow: 'Data intelligence & performance',
    title: 'Connect the data. See the bigger picture.',
    intro:
      'We bring fragmented information together, turning disconnected datasets into clear, accessible intelligence that supports better decisions.',
    explore: [
      { code: '3A', title: 'From disconnected data to one clear view.', teaser: 'Connect sources and watch one view take shape.', icon: 'workflow' },
      { code: '3B', title: 'Intelligence that evolves with you.', teaser: 'The tracking and measurement areas we cover.', icon: 'chart' },
    ],
  },
  {
    id: 'knowledge',
    layout: 'stacked',
    number: '04',
    navLabel: 'Knowledge Access',
    eyebrow: 'AI-powered knowledge access',
    title: 'Your knowledge. One conversation away.',
    intro:
      'Imagine years of research, reports and organizational knowledge connected in one place, ready to explore through simple, natural questions.',
    explore: [
      { code: '4A', title: 'Ask your research anything.', teaser: 'Try the agent prototype with example questions.', icon: 'sparkles' },
      { code: '4B', title: 'The right knowledge for the right audience.', teaser: 'Internal and external access, with governance built in.', icon: 'shield' },
    ],
    dark: true,
  },
  {
    id: 'action',
    layout: 'stacked',
    number: '05',
    navLabel: 'Insights to Action',
    eyebrow: 'From insights to action',
    title: "We don't stop at insights. We turn them into action.",
    intro:
      'Research only creates value when it helps people move forward. We turn findings into practical strategies, tools and experiences that support real-world decisions.',
    explore: [
      { code: '5A', title: 'Research that moves people forward.', teaser: 'What each solution turns research into.', icon: 'layers' },
      { code: '5B', title: 'From findings to practical tools.', teaser: 'Follow the path from research to action.', icon: 'route' },
    ],
  },
];

/* ---------------- Pillar 01 ---------------- */

export const capabilities = [
  {
    key: 'research',
    name: 'Research',
    verb: 'How we understand',
    text: 'Understanding people, behaviors, motivations and perceptions.',
  },
  {
    key: 'technology',
    name: 'Technology',
    verb: 'How we scale',
    text: 'Scaling analysis, connecting information and simplifying complexity.',
  },
  {
    key: 'human',
    name: 'Human Expertise',
    verb: 'How we make sense of it',
    text: 'Interpreting context, culture, meaning and implications.',
  },
] as const;

export const approachStatement =
  'Research is how we understand. Technology is how we scale. Human expertise is how we make sense of it all.';

export const techAtScale = {
  intro:
    'We combine artificial intelligence, natural language processing, automation and expert interpretation to understand context, cultural nuance, irony and the meaning behind the data.',
  machine: {
    label: 'Technology handles',
    items: ['Volume across sources and languages', 'Classification and coding', 'Pattern and topic detection', 'Automation and repeatable reporting'],
  },
  human: {
    label: 'People handle',
    items: ['Context and local culture', 'Irony, slang and subtext', 'What a finding means', 'What to do about it'],
  },
  example: {
    text: '“Great. Another reform that will fix everything.”',
    machineRead: 'Literal reading: positive words, positive tone.',
    humanRead: 'Analyst reading: sarcasm. Signals fatigue and low trust.',
    note: 'Illustrative example written for this page.',
  },
};

export const challenges = [
  {
    label: 'Understand a public',
    question: 'What do people think, and why?',
    mix: { research: 50, technology: 20, human: 30 },
    parts: {
      research: 'Opinion survey with a representative sample, then focus groups to hear the reasons.',
      technology: 'Automated coding of open answers and a live results dashboard.',
      human: 'Analysts with local knowledge read the results in context.',
    },
  },
  {
    label: 'Follow perception over time',
    question: 'How is a perception changing?',
    mix: { research: 30, technology: 45, human: 25 },
    parts: {
      research: 'Tracking waves that repeat the same questions and sample design.',
      technology: 'Waves connected in OneSync, with trend views and alerts.',
      human: 'Analysts explain what moved and what may have caused it.',
    },
  },
  {
    label: 'Test a message',
    question: 'Will this resonate before we launch it?',
    mix: { research: 45, technology: 15, human: 40 },
    parts: {
      research: 'Message and creative testing with the audiences that matter.',
      technology: 'Fast fieldwork and side-by-side comparison of options.',
      human: 'Guidance on wording, messengers and channels.',
    },
  },
  {
    label: 'Read the organic conversation',
    question: 'What is happening outside our studies?',
    mix: { research: 20, technology: 45, human: 35 },
    parts: {
      research: 'A clear frame: topics, audiences and markets to listen to.',
      technology: 'Social listening at scale, across platforms and languages.',
      human: 'Human coding of narratives, tone, irony and slang.',
    },
  },
  {
    label: 'Use years of past research',
    question: 'What do we already know?',
    mix: { research: 25, technology: 50, human: 25 },
    parts: {
      research: 'An inventory of past studies, methods and samples.',
      technology: 'A harmonized archive and a research agent to query it.',
      human: 'Experts check what can and cannot be compared.',
    },
  },
] as const;

/* ---------------- Pillar 02 ---------------- */

export const researchCategories = [
  { name: 'Quantitative Research', short: 'Measure how many and how much.', items: ['Surveys', 'Opinion polling', 'Audience segmentation'] },
  { name: 'Qualitative Research', short: 'Understand the reasons behind the numbers.', items: ['Focus groups', 'In-depth interviews', 'Exploratory studies'] },
  { name: 'Testing & Evaluation', short: 'Know what works before it goes out.', items: ['Product testing', 'Concept testing', 'Trailer testing', 'Ad testing', 'Talent testing', 'Character evaluation', 'Message testing', 'Image evaluation'] },
  { name: 'Tracking Studies', short: 'See how perception moves over time.', items: ['Brand tracking', 'Candidate tracking', 'Campaign tracking', 'Perception tracking'] },
  { name: 'Digital Intelligence', short: 'Read the organic, public conversation.', items: ['Social listening', 'Narrative analysis', 'Sentiment and emotion analysis', 'Cultural trends'] },
  { name: 'Advanced Research', short: 'Combine methods and markets.', items: ['Mixed-method studies', 'Cross-market comparisons', 'Behavioral and audience insights'] },
];

export const researchFamilies = [
  { name: 'Quantitative Research', items: ['Online Surveys', 'CATI', 'CAPI', 'Polling', 'Segmentation', 'Product & Concept Testing'] },
  { name: 'Qualitative Research', items: ['Focus Groups', 'IDIs', 'Expert Interviews', 'Exploratory Studies'] },
  { name: 'Creative & Content Research', items: ['Trailer Testing', 'Ad Testing', 'Talent Testing', 'Character Evaluation', 'Message Testing'] },
  { name: 'Political & Public Opinion Research', items: ['Candidate Tracking', 'Candidate Image Evaluation', 'Leadership Perception', 'Public Trust', 'Issue Research'] },
  { name: 'Brand & Reputation Research', items: ['Brand Tracking', 'Brand Image Evaluation', 'Awareness', 'Reputation Studies'] },
  { name: 'Digital & Cultural Intelligence', items: ['Social Listening', 'Narrative Analysis', 'Cultural Trends', 'Sentiment & Emotion Analysis'] },
];

export const glossary: Record<string, string> = {
  CATI: 'Computer-assisted telephone interviewing',
  CAPI: 'Computer-assisted personal (face-to-face) interviewing',
  IDIs: 'In-depth interviews',
};

export const questionToMethod = [
  {
    q: 'What do people think?',
    method: 'Surveys & Opinion Research',
    gives: 'Representative measures of opinion, priorities and attitudes.',
    tools: ['Online surveys', 'CATI / CAPI', 'Opinion polling', 'Segmentation'],
    evidence: 'Quantitative',
  },
  {
    q: 'Why do they think that?',
    method: 'Focus Groups & Interviews',
    gives: 'The motivations, language and reasoning behind opinions.',
    tools: ['Focus groups', 'In-depth interviews', 'Expert interviews'],
    evidence: 'Qualitative',
  },
  {
    q: 'How is something perceived?',
    method: 'Image & Perception Evaluation',
    gives: 'How a leader, institution or brand is seen, and on which attributes.',
    tools: ['Image evaluation', 'Leadership perception', 'Brand image studies'],
    evidence: 'Quantitative + qualitative',
  },
  {
    q: 'Does the content resonate?',
    method: 'Creative & Message Testing',
    gives: 'Which messages, ads or materials land with which audiences.',
    tools: ['Message testing', 'Ad testing', 'Concept testing'],
    evidence: 'Quantitative + qualitative',
  },
  {
    q: 'How is perception evolving?',
    method: 'Tracking Studies',
    gives: 'Consistent measures repeated over time, so change is visible.',
    tools: ['Brand tracking', 'Candidate tracking', 'Perception tracking'],
    evidence: 'Quantitative, longitudinal',
  },
  {
    q: "What's happening organically?",
    method: 'Social & Cultural Intelligence',
    gives: 'Narratives, tone and trends in public conversation, without prompting.',
    tools: ['Social listening', 'Narrative analysis', 'Sentiment and emotion'],
    evidence: 'Digital signals',
  },
];

export const questionClosing = "We don't start with a tool. We start with the question.";

/* ---------------- Pillar 03 ---------------- */

export const oneSync = {
  name: 'OneSync',
  description: "FatCat9's data integration and intelligence solution.",
  inputs: ['Research Data', 'Digital Signals', 'Performance Data'],
  steps: ['Connect', 'Clean', 'Harmonize', 'Analyze'],
  outputs: ['Dashboards', 'Tracking', 'Intelligence'],
  statement: 'From brand and candidate tracking to campaign performance and program measurement, all connected in one clear view.',
};

export const oneSyncSources = [
  { name: 'Surveys and opinion polls', kind: 'Research' },
  { name: 'Qualitative research findings', kind: 'Research' },
  { name: 'Brand and image studies', kind: 'Research' },
  { name: 'Historical research datasets', kind: 'Research' },
  { name: 'Social and digital data', kind: 'Digital' },
  { name: 'Campaign performance', kind: 'Performance' },
  { name: 'Program KPIs', kind: 'Performance' },
];

export const oneSyncOutputs = ['Interactive dashboards', 'Harmonized data', 'Comparative analysis', 'Automated reporting', 'Decision-support tools'];

export const trackingAreas = [
  { name: 'Brand & Reputation Tracking', items: ['Brand health', 'Awareness', 'Perception', 'Image evolution', 'Reputation monitoring'] },
  { name: 'Political & Public Opinion Tracking', items: ['Candidate tracking', 'Leadership image', 'Public trust', 'Issue salience', 'Opinion trends'] },
  { name: 'Creative & Campaign Performance', items: ['Ad tracking', 'Campaign effectiveness', 'Message performance', 'Content engagement'] },
  { name: 'Audience & Content Intelligence', items: ['Trailer performance', 'Talent perception', 'Character appeal', 'Audience response'] },
  { name: 'Program & Impact Measurement', items: ['Program KPIs', 'Outcome tracking', 'Benchmarking', 'Performance evaluation'] },
  { name: 'Integrated Intelligence', items: ['Cross-market dashboards', 'Longitudinal analysis', 'Data harmonization', 'Alerts'] },
];

export const evidenceVsIntelligence = {
  research: { label: 'Research', line: 'generates evidence.' },
  data: { label: 'Data intelligence', line: 'helps you connect, compare, monitor and use that evidence over time.' },
};

/* ---------------- Pillar 04 ---------------- */

export const agentSources = [
  'Survey results',
  'Research reports',
  'Qualitative studies',
  'Interview transcripts',
  'Social listening findings',
  'Historical datasets',
  'Dashboards',
  'Organizational documents',
];

export const agentAbilities = ['Ask questions', 'Compare findings', 'Discover patterns', 'Retrieve evidence'];

export const accessModes = [
  {
    key: 'internal',
    name: 'Internal access',
    audience: 'For authorized research, program and leadership teams.',
    features: ['Access to permitted internal studies', 'Cross-market research comparisons', 'Historical analysis', 'Source-backed answers', 'Research discovery'],
  },
  {
    key: 'external',
    name: 'External access',
    audience: 'For approved external audiences.',
    features: ['Access to published studies', 'Natural-language research exploration', 'Citations and source links', 'Public dashboards and approved reports'],
  },
] as const;

export const governance = [
  { name: 'Secure access', text: 'Sign-in and roles decide who can ask what.' },
  { name: 'Permissions', text: 'Answers only draw on documents the person is allowed to see.' },
  { name: 'Data governance', text: 'The organization decides what is connected and for which audience.' },
  { name: 'Source traceability', text: 'Every statement links back to the study it came from.' },
  { name: 'Responsible AI', text: 'Evidence types stay labeled. Incompatible studies are not merged.' },
];

export const knowledgeStatement = 'Less time searching. More time understanding.';

/* ---------------- Pillar 05 ---------------- */

export const solutions = [
  { name: 'Communication Playbooks', text: 'Narrative frameworks, messaging guidance, audience insights, channel strategies and spokesperson recommendations.', becomes: 'A guide teams can use' },
  { name: 'Strategic Action Plans', text: 'Priorities, roadmaps, recommendations and measurable objectives.', becomes: 'A plan with owners' },
  { name: 'Workshops & Training', text: 'Build capabilities, share knowledge and help teams apply research in practical settings.', becomes: 'Skills in the room' },
  { name: 'Conferences & Executive Briefings', text: 'Bring findings to leadership teams, stakeholders and specialized audiences.', becomes: 'Shared understanding' },
  { name: 'Measurement & Learning', text: 'Frameworks to evaluate results, monitor progress and improve decisions.', becomes: 'A feedback loop' },
  { name: 'Insight Repurposing', text: 'Executive summaries, visualizations, presentations, training materials and other useful formats.', becomes: 'The right format per audience' },
];

export const moreCapabilities = [
  { name: 'Research-to-Action Sessions', text: 'Working sessions that move from findings to decisions.' },
  { name: 'Scenario & Opportunity Mapping', text: 'Map what the evidence opens up and what could change it.' },
  { name: 'Stakeholder Briefings', text: 'Tailored readouts for each audience that needs the findings.' },
  { name: 'Strategic Advisory', text: 'Ongoing counsel as decisions are made and revisited.' },
  { name: 'Knowledge Transfer', text: 'Hand over methods and tools so teams keep using them.' },
  { name: 'Training Programs', text: 'Structured learning on applying research in daily work.' },
];

export const journey = [
  { step: 'Research', text: 'Collect the evidence with the right method.' },
  { step: 'Interpretation', text: 'Read it in context: what it means and for whom.' },
  { step: 'Strategic Framework', text: 'Turn meaning into priorities, narratives and choices.' },
  { step: 'Workshop', text: 'Work it through with the teams who will use it.' },
  { step: 'Action', text: 'Practical tools in use: playbooks, plans, materials.' },
];

export const finale = { statement: 'Understand. Connect. Activate.', line: 'From research to real-world decisions.' };

/* ---------------- Pauses between chapters ---------------- */

/** Key statements shown as full-width pauses after each pillar (keyed by the pillar they follow). */
export const interludes: Record<string, { text: string; highlight: string }> = {
  approach: { text: 'Research is how we understand. Technology is how we scale. Human expertise is how we make sense of it all.', highlight: 'make sense of it all.' },
  research: { text: "We don't start with a tool. We start with the question.", highlight: 'We start with the question.' },
  data: { text: 'From brand and candidate tracking to campaign performance and program measurement, all connected in one clear view.', highlight: 'one clear view.' },
  knowledge: { text: 'Less time searching. More time understanding.', highlight: 'More time understanding.' },
};
