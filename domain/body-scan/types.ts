import type { ActionPlan } from "@/domain/action-plan/types";

export type GapSeverity = "baixo" | "moderado" | "alto";

export type MuscleGap = {
  id: string;
  muscle: string;
  score: number; // 0..100, quanto maior o gap
  severity: GapSeverity;
  note: string;
};

export type BodyScanResult = {
  bodyType: string;
  bodyFatRange: string;
  confidence: number; // 0..1
  horizonMonths: 3 | 6;
  gaps: MuscleGap[];
  plan: ActionPlan;
};

// Regra pura de domínio: severidade derivada do score.
export function severityFromScore(score: number): GapSeverity {
  if (score >= 66) return "alto";
  if (score >= 36) return "moderado";
  return "baixo";
}
