import { Droplets, Dumbbell, Quote, Utensils, Check } from "lucide-react";
import { AppShell } from "@/components/shell/app-shell";
import { Bar, Card, Kicker } from "@/components/ui/card";
import { dashboardRepository } from "@/domain/dashboard/dashboard-repository";

const icons = { workout: Dumbbell, water: Droplets, meals: Utensils } as const;

export default function DashboardPage() {
  const d = dashboardRepository.getOverview();
  const done = d.checklist.filter((c) => c.completed).length;

  return (
    <AppShell>
      <div className="space-y-6">
        <header>
          <Kicker>Command center</Kicker>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Bom retorno, {d.athleteName}.
          </h1>
          <p className="mt-2 max-w-xl text-zinc-400">
            {d.protocolName}, streak de {d.streakDays} dias. Próxima sessão: {d.nextSession}.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          {d.metrics.map((m) => (
            <Card key={m.id}>
              <div className="flex items-start justify-between gap-2">
                <Kicker>{m.label}</Kicker>
                <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-emerald-200">
                  {m.delta}
                </span>
              </div>
              <p className="mt-4 text-4xl font-semibold tabular-nums text-zinc-50">{m.value}</p>
              <p className="mt-1 text-sm text-zinc-400">{m.hint}</p>
            </Card>
          ))}
        </div>

        <div className="grid gap-3 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <div className="flex items-baseline justify-between">
              <div>
                <Kicker>Ritual</Kicker>
                <h2 className="mt-1 text-xl font-medium text-zinc-50">Checklist diário</h2>
              </div>
              <span className="font-[family-name:var(--font-mono)] text-xs text-zinc-400">
                {done}/{d.checklist.length} locked
              </span>
            </div>
            <ul className="mt-4 space-y-3">
              {d.checklist.map((item) => {
                const Icon = item.completed ? Check : icons[item.id as keyof typeof icons] ?? Check;
                return (
                  <li
                    key={item.id}
                    className={`rounded-2xl border p-4 ${
                      item.completed ? "border-emerald-300/40 bg-emerald-300/10" : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-black/20 text-emerald-300">
                        <Icon aria-hidden className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-zinc-50">{item.title}</p>
                        <p className="truncate text-xs text-zinc-400">{item.detail}</p>
                      </div>
                      <span className="shrink-0 font-[family-name:var(--font-mono)] text-xs text-zinc-300">{item.metric}</span>
                    </div>
                    <div className="mt-3">
                      <Bar value={item.progress} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card className="flex flex-col justify-between bg-gradient-to-br from-emerald-300/[0.08] to-violet-400/[0.06] lg:col-span-2">
            <div>
              <div className="flex items-center justify-between">
                <Kicker>Frase motivacional</Kicker>
                <Quote aria-hidden className="size-4 text-emerald-300/60" />
              </div>
              <blockquote className="mt-5 font-[family-name:var(--font-serif)] text-3xl leading-snug text-zinc-50">
                {d.quote.text}
              </blockquote>
            </div>
            <footer className="mt-8 text-sm text-zinc-400">
              <p className="text-zinc-200">{d.quote.author}</p>
              <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                {d.quote.origin}
              </p>
            </footer>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
