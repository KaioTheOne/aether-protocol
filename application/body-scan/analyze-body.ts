import type { BodyScanResult } from "@/domain/body-scan/types";
import { severityFromScore } from "@/domain/body-scan/types";

// Contrato único: trocar o mock pela API real não toca a UI.
export type BodyScanner = {
  analyze(photo: Blob, signal?: AbortSignal): Promise<BodyScanResult>;
};

const MOCK_DELAY_MS = 3000;

function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new DOMException("Cancelado", "AbortError"));
    const id = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(id);
        reject(new DOMException("Cancelado", "AbortError"));
      },
      { once: true },
    );
  });
}

const rawGaps = [
  { id: "delts", muscle: "Deltoide lateral", score: 72, note: "Largura de ombro abaixo da proporção com a cintura." },
  { id: "upper-chest", muscle: "Peitoral superior", score: 58, note: "Preenchimento baixo na linha da clavícula." },
  { id: "back", muscle: "Dorsais", score: 44, note: "Boa base, falta espessura na parte média." },
  { id: "calves", muscle: "Panturrilhas", score: 31, note: "Desenvolvimento próximo do ideal para o biotipo." },
];

export const mockBodyScanner: BodyScanner = {
  async analyze(_photo, signal) {
    await wait(MOCK_DELAY_MS, signal);
    return {
      bodyType: "Mesomorfo com tendência a ectomorfo",
      bodyFatRange: "14% a 17%",
      confidence: 0.87,
      horizonMonths: 6,
      gaps: rawGaps.map((g) => ({ ...g, severity: severityFromScore(g.score) })),
      plan: {
        generatedFrom: "Análise de biotipo (simulada)",
        training: [
          {
            day: "Segunda",
            title: "Push com ênfase em ombros",
            duration: "60 min",
            intensity: "Alta",
            sets: [
              { name: "Supino inclinado", prescription: "4 x 8-10", focus: "Peitoral superior" },
              { name: "Elevação lateral", prescription: "5 x 12-15", focus: "Deltoide lateral" },
            ],
          },
          {
            day: "Quarta",
            title: "Pull com espessura de costas",
            duration: "55 min",
            intensity: "Moderada",
            sets: [
              { name: "Remada curvada", prescription: "4 x 8-10", focus: "Dorsais" },
              { name: "Puxada neutra", prescription: "3 x 10-12", focus: "Dorsais" },
            ],
          },
        ],
        nutrition: [
          {
            name: "Pré-treino",
            time: "17:00",
            kcal: 520,
            macros: "P 32 / C 70 / G 12",
            items: ["Arroz", "Frango", "Banana"],
          },
        ],
        macros: { proteinG: 180, carbsG: 300, fatG: 70, kcal: 2550 },
        hydrationLiters: 3.2,
        notes: ["Superávit leve de 250 kcal.", "Reavaliar com nova foto em 4 semanas."],
      },
    };
  },
};
