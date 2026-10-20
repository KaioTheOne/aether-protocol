import { Apple, Dumbbell } from "lucide-react";
import { AppShell } from "@/components/shell/app-shell";
import { Card, Kicker } from "@/components/ui/card";
import { actionPlanRepository } from "@/domain/action-plan/action-plan-repository";

export const metadata = { title: "Plano de ação | Aether Protocol" };

export default function PlanPage() {
  const plan = actionPlanRepository.getPlan();
  const macros = [
    ["Kcal", `${plan.macros.kcal}`],
    ["Proteína", `${plan.macros.proteinG}g`],
    ["Carbo", `${plan.macros.carbsG}g`],
    ["Gordura", `${plan.macros.fatG}g`],
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <header>
          <Kicker>Plano de ação</Kicker>
          <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Protocolo gerado a partir do scan.
          </h1>
          <p className="mt-2 max-w-xl text-zinc-400">
            Base: {plan.generatedFrom}. Treino e nutrição alinhados à projeção de V-taper e densidade posterior.
          </p>
        </header>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-emerald-300/30 bg-emerald-300/10 text-emerald-300">
                <Dumbbell aria-hidden className="size-4" />
              </span>
              <div>
                <Kicker>Protocolo de treino</Kicker>
                <h2 className="text-lg font-medium text-zinc-50">Split de estética</h2>
              </div>
            </div>
            {plan.training.map((block) => (
              <Card key={block.day}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Kicker>{block.day}</Kicker>
                    <h3 className="mt-1 text-lg font-medium text-zinc-50">{block.title}</h3>
                  </div>
                  <p className="text-right font-[family-name:var(--font-mono)] text-xs text-zinc-400">
                    {block.duration}
                    <br />
                    {block.intensity}
                  </p>
                </div>
                <ul className="mt-4 divide-y divide-white/5">
                  {block.sets.map((s) => (
                    <li key={s.name} className="flex items-baseline justify-between gap-3 py-2.5">
                      <div>
                        <p className="text-sm text-zinc-100">{s.name}</p>
                        <p className="text-xs text-zinc-500">{s.focus}</p>
                      </div>
                      <span className="shrink-0 font-[family-name:var(--font-mono)] text-sm text-emerald-200">{s.prescription}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-emerald-300/30 bg-emerald-300/10 text-emerald-300">
                <Apple aria-hidden className="size-4" />
              </span>
              <div>
                <Kicker>Nutrição</Kicker>
                <h2 className="text-lg font-medium text-zinc-50">Protocolo alimentar</h2>
              </div>
            </div>
            <dl className="grid grid-cols-4 gap-2">
              {macros.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2.5">
                  <dt className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-zinc-500">{label}</dt>
                  <dd className="mt-0.5 font-[family-name:var(--font-mono)] text-base tabular-nums text-emerald-200">{value}</dd>
                </div>
              ))}
            </dl>
            {plan.nutrition.map((meal) => (
              <Card key={meal.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <h3 className="text-base font-medium text-zinc-50">{meal.name}</h3>
                    <p className="font-[family-name:var(--font-mono)] text-xs text-zinc-500">{meal.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-[family-name:var(--font-mono)] text-sm text-emerald-200">{meal.kcal} kcal</p>
                    <p className="font-[family-name:var(--font-mono)] text-[11px] text-zinc-500">{meal.macros}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-zinc-400">{meal.items.join(", ")}</p>
              </Card>
            ))}
            <p className="text-xs text-zinc-500">
              Este plano não substitui a orientação de um profissional de saúde. Meta de água: {plan.hydrationLiters} L por dia.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
