export interface CaseStudy {
  id: string;
  client: string;
  headline: string;
  description: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  accentClass: string;
  shadowColor: string;
}

export interface ServicePillar {
  id: string;
  name: string;
  outcome: string;
  description: string;
  accent: string;
  accentClass: string;
  badge: string;
}

export interface ProcessMilestone {
  step: string;
  title: string;
  description: string;
}
