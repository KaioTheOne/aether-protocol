import type { ActionPlan } from "@/domain/action-plan/types";

const plan: ActionPlan = {
  generatedFrom: "AI Body Vision, mesomorfo / ciclo hipertrofia",
  training: [
    {
      day: "Seg",
      title: "Push · densidade",
      duration: "58 min",
      intensity: "RPE 8",
      sets: [
        { name: "Supino inclinado halter", prescription: "4 x 8", focus: "Lower chest" },
        { name: "Desenvolvimento machine", prescription: "3 x 10", focus: "Deltoide anterior" },
        { name: "Crossover baixo", prescription: "3 x 12", focus: "Pico de contração" },
        { name: "Tríceps corda + pausa", prescription: "3 x 12", focus: "Cabeça lateral" },
      ],
    },
    {
      day: "Sáb",
      title: "Upper · estética",
      duration: "52 min",
      intensity: "RPE 8",
      sets: [
        { name: "Elevação lateral c/ rest-pause", prescription: "3 x 12+6", focus: "Cap width" },
        { name: "Crucifixo machine", prescription: "3 x 12", focus: "Peitoral interno" },
        { name: "Pulldown inverso", prescription: "3 x 10", focus: "Grande dorsal" },
        { name: "Core anti-rotação", prescription: "3 x 40s", focus: "Cintura estreita" },
      ],
    },
  ],
  nutrition: [
    { name: "Primeiro sinal", time: "07:40", kcal: 520, macros: "P 42 / C 50 / G 12", items: ["Omelete 4 claras + 1 gema", "Aveia 40g com mirtilo", "Creatina 5g"] },
    { name: "Pré-treino", time: "12:10", kcal: 610, macros: "P 48 / C 80 / G 14", items: ["Arroz 120g cozido", "Frango 150g", "Salada de folhas + azeite 5ml"] },
    { name: "Pós-treino", time: "19:30", kcal: 680, macros: "P 49 / C 85 / G 14", items: ["Whey 30g", "Batata-doce 200g", "Iogurte grego 120g"] },
    { name: "Lock noturno", time: "21:45", kcal: 590, macros: "P 41 / C 25 / G 30", items: ["Salmão 140g", "Pasta de amendoim 15g"] },
  ],
  macros: { proteinG: 180, carbsG: 240, fatG: 70, kcal: 2400 },
  hydrationLiters: 3.2,
  notes: ["Reavalie com nova foto em 4 semanas."],
};

export const actionPlanRepository = {
  getPlan(): ActionPlan {
    return plan;
  },
};
