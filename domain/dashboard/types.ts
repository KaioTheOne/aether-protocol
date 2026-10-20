export type ChecklistItem = {
  id: string;
  title: string;
  detail: string;
  metric: string;
  progress: number; // 0..1
  completed: boolean;
};

export type DashboardQuote = {
  text: string;
  author: string;
  origin: string;
};

export type DashboardMetric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  hint: string;
};

export type DashboardOverview = {
  athleteName: string;
  protocolName: string;
  streakDays: number;
  nextSession: string;
  checklist: ChecklistItem[];
  quote: DashboardQuote;
  metrics: DashboardMetric[];
};
