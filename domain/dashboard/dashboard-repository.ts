import type { DashboardOverview } from "@/domain/dashboard/types";

const overview: DashboardOverview = {
  athleteName: "Kaio",
  protocolName: "Hypertrophy Drift · Ciclo 02",
  streakDays: 18,
  nextSession: "Push · 18:30",
  checklist: [
    {
      id: "workout",
      title: "Treino do dia",
      detail: "Push · peito, ombro e tríceps",
      metric: "58 min",
      progress: 1,
      completed: true,
    },
    {
      id: "water",
      title: "Água",
      detail: "Hidratação com eletrólitos",
      metric: "1.8 / 3.2 L",
      progress: 0.56,
      completed: false,
    },
    {
      id: "meals",
      title: "Refeições",
      detail: "Protocolo 4x · 2.400 kcal",
      metric: "3 / 4",
      progress: 0.75,
      completed: false,
    },
  ],
  quote: {
    text: "Disciplina é o corpo obedecendo a uma versão de você que ainda não chegou.",
    author: "Aether Protocol",
    origin: "Signal 04 · Morning lock",
  },
  metrics: [
    {
      id: "readiness",
      label: "Readiness",
      value: "92",
      delta: "+4",
      hint: "Sistema nervoso recuperado",
    },
    {
      id: "volume",
      label: "Volume semanal",
      value: "18.4k",
      delta: "+12%",
      hint: "kg acumulados",
    },
    {
      id: "sleep",
      label: "Sono",
      value: "7.6h",
      delta: "ótimo",
      hint: "Janela 23:10 — 06:45",
    },
  ],
};

export const dashboardRepository = {
  getOverview(): DashboardOverview {
    return overview;
  },
};
