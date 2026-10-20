/**
 * Research Intelligence Agent: interface + illustrative prototype.
 *
 * The prototype returns the STRUCTURE of an answer with clearly labeled placeholders.
 * It contains no research findings and is not connected to any client data.
 *
 * To connect a real retrieval system later, implement `KnowledgeAgent` (for example,
 * calling your own search/RAG endpoint) and pass it to <AgentDemo agent={...} />.
 */

export type EvidenceType = 'Quantitative survey' | 'Qualitative study' | 'Social listening' | 'Report / document' | 'Dataset';

export interface AgentFinding {
  text: string;
  evidence: EvidenceType;
  sourceId: string;
}

export interface AgentSource {
  id: string;
  title: string;
  meta: string; // e.g. country · year · sample
  evidence: EvidenceType;
  href?: string; // link to original research once connected
}

export interface AgentAnswer {
  illustrative: boolean;
  summary: string;
  findings: AgentFinding[];
  scope: string[]; // relevant countries or studies
  sources: AgentSource[];
  chart?: { label: string; bars: { label: string; value: number }[] };
  comparabilityNote?: string;
}

export interface KnowledgeAgent {
  ask(question: string, opts?: { audience: 'internal' | 'external' }): Promise<AgentAnswer>;
}

export const exampleQuestions = [
  'How has public trust in institutions changed across our Latin American studies?',
  'Compare youth priorities across our latest surveys.',
  'What have our qualitative studies revealed about local government responsiveness?',
  'Which topics appear most frequently across our research?',
];

const placeholderSources = (types: EvidenceType[]): AgentSource[] =>
  types.map((evidence, i) => ({
    id: `S${i + 1}`,
    title: `[Study ${String.fromCharCode(65 + i)} title]`,
    meta: evidence === 'Quantitative survey' ? '[Country] · [Year] · [Sample, n=]' : '[Country] · [Year] · [Method]',
    evidence,
  }));

const illustrativeAnswers: Record<string, AgentAnswer> = {
  [exampleQuestions[0]]: {
    illustrative: true,
    summary:
      'A short, plain-language answer would appear here, written only from the connected studies that measured trust in institutions, with the time span each one covers.',
    findings: [
      { text: '[Survey finding on trust, with the wave and question wording]', evidence: 'Quantitative survey', sourceId: 'S1' },
      { text: '[Change between waves of the same tracker, same question]', evidence: 'Quantitative survey', sourceId: 'S2' },
      { text: '[Theme from focus groups explaining the shift]', evidence: 'Qualitative study', sourceId: 'S3' },
    ],
    scope: ['[Country 1]', '[Country 2]', '[Country 3]'],
    sources: placeholderSources(['Quantitative survey', 'Quantitative survey', 'Qualitative study']),
    chart: { label: 'Trend by wave (placeholder shape, no data)', bars: [{ label: 'W1', value: 0.55 }, { label: 'W2', value: 0.7 }, { label: 'W3', value: 0.45 }, { label: 'W4', value: 0.6 }] },
    comparabilityNote: 'Trends are shown only within studies that used the same question and sample design. Other studies are listed separately.',
  },
  [exampleQuestions[1]]: {
    illustrative: true,
    summary:
      'The answer would list the priorities young respondents ranked highest in each recent survey, side by side, with each survey’s age band and sample stated.',
    findings: [
      { text: '[Top priorities among 18–29 respondents, Survey A]', evidence: 'Quantitative survey', sourceId: 'S1' },
      { text: '[Top priorities among the youth band used in Survey B]', evidence: 'Quantitative survey', sourceId: 'S2' },
      { text: '[How young people describe these issues in their own words]', evidence: 'Social listening', sourceId: 'S3' },
    ],
    scope: ['[Survey A]', '[Survey B]'],
    sources: placeholderSources(['Quantitative survey', 'Quantitative survey', 'Social listening']),
    chart: { label: 'Priority ranking (placeholder shape, no data)', bars: [{ label: 'P1', value: 0.8 }, { label: 'P2', value: 0.62 }, { label: 'P3', value: 0.5 }, { label: 'P4', value: 0.35 }] },
    comparabilityNote: 'If the surveys define “youth” differently or use different samples, they are shown side by side and not combined.',
  },
  [exampleQuestions[2]]: {
    illustrative: true,
    summary:
      'The answer would summarize recurring themes about local government responsiveness from qualitative studies, with representative quotes and the groups they came from.',
    findings: [
      { text: '[Recurring theme, with the groups where it appeared]', evidence: 'Qualitative study', sourceId: 'S1' },
      { text: '[Representative quote, attributed to participant profile]', evidence: 'Qualitative study', sourceId: 'S2' },
      { text: '[Related internal report or program document]', evidence: 'Report / document', sourceId: 'S3' },
    ],
    scope: ['[Study A]', '[Study B]', '[Program report]'],
    sources: placeholderSources(['Qualitative study', 'Qualitative study', 'Report / document']),
    comparabilityNote: 'Qualitative themes describe what participants said. They are not presented as measures of how widespread a view is.',
  },
  [exampleQuestions[3]]: {
    illustrative: true,
    summary:
      'The answer would rank topics by how often they appear across the connected library, with filters by year, country and type of research.',
    findings: [
      { text: '[Most frequent topic and the number of studies covering it]', evidence: 'Dataset', sourceId: 'S1' },
      { text: '[Topics that grew in recent years]', evidence: 'Dataset', sourceId: 'S1' },
      { text: '[Topics covered by surveys but not by qualitative work]', evidence: 'Report / document', sourceId: 'S2' },
    ],
    scope: ['[Entire connected library]'],
    sources: placeholderSources(['Dataset', 'Report / document']),
    chart: { label: 'Topic frequency (placeholder shape, no data)', bars: [{ label: 'T1', value: 0.9 }, { label: 'T2', value: 0.7 }, { label: 'T3', value: 0.52 }, { label: 'T4', value: 0.4 }, { label: 'T5', value: 0.3 }] },
    comparabilityNote: 'Frequency counts how often a topic is studied, not how important it is to the public.',
  },
};

/** Prototype agent: returns predefined illustrative structures. No network calls. */
export const illustrativeAgent: KnowledgeAgent = {
  async ask(question) {
    const answer = illustrativeAnswers[question];
    if (answer) return answer;
    return {
      illustrative: true,
      summary: 'In the prototype only the example questions have a prepared answer structure. Once sources are connected, any question can be asked.',
      findings: [],
      scope: [],
      sources: [],
    };
  },
};
