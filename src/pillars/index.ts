import type { ComponentType } from 'react';
import { pillars } from '../content/pillars';
import { ApproachMain, ApproachViewA, ApproachViewB } from './Approach';
import { ResearchMain, ResearchViewA, ResearchViewB } from './Research';
import { DataMain, DataViewA, DataViewB } from './Data';
import { KnowledgeMain, KnowledgeViewA, KnowledgeViewB } from './Knowledge';
import { ActionMain, ActionViewA, ActionViewB } from './Action';

/** Maps each pillar (by content id) to its main view and its two Explore More views. */
const views: Record<string, { Main: ComponentType; Views: [ComponentType, ComponentType] }> = {
  approach: { Main: ApproachMain, Views: [ApproachViewA, ApproachViewB] },
  research: { Main: ResearchMain, Views: [ResearchViewA, ResearchViewB] },
  data: { Main: DataMain, Views: [DataViewA, DataViewB] },
  knowledge: { Main: KnowledgeMain, Views: [KnowledgeViewA, KnowledgeViewB] },
  action: { Main: ActionMain, Views: [ActionViewA, ActionViewB] },
};

export const registry = pillars.map((meta) => ({ meta, ...views[meta.id] }));
