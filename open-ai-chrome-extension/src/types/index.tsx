export type DOMMessage = {
  type: 'TOGGLE_SUMMARY_ENABLED';
  summaryEnabled: boolean;
};

export type Summary = {
  id: string;
  summary: string;
  created_at: string;
  updated_at: string;
};
