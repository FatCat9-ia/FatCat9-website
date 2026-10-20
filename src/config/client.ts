/**
 * Client profile. The default is generic so the microsite can be shared with any audience.
 * To tailor it, set `preparedFor` (shown on the cover) and `footerLabel`.
 * Keep every statement factual: no invented outcomes, metrics or implementations.
 */
export interface ClientProfile {
  /** Shown on the cover as "Prepared for …". Leave empty for the generic version. */
  preparedFor: string;
  /** Short label for the footer band. */
  footerLabel: string;
  /** Optional process example used in Pillar 05 (5B). */
  processExample?: {
    title: string;
    description: string;
    note: string;
    chain: string[];
  };
}

export const client: ClientProfile = {
  preparedFor: '',
  footerLabel: 'FatCat9 · Research & Intelligence',
  processExample: {
    title: 'How this can look in practice',
    description:
      'Social listening research is interpreted with the team and translated into communication playbooks and workshop materials people can use in their day-to-day work.',
    note: 'A process example. Outcomes are not described here.',
    chain: ['Social listening', 'Interpretation', 'Communication playbooks', 'Workshop materials'],
  },
};
