import { RotateCcw } from "lucide-react";
import type { BodyScanResult } from "@/domain/body-scan/types";

type Props = { previewUrl: string; result: BodyScanResult; onReset: () => void };

const severityStyle = {
  alto: "bg-rose-400",
  moderado: "bg-amber-300",
  baixo: "bg-emerald-300",
} as const;

const glass = "rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl";

export function ScanResults({ previewUrl, result, onReset }: Props) {
  const { plan } = result;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-50">{result.bodyType}</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Gordura estimada {result.bodyFatRange}. Confiança {Math.round(result.confidence * 100)}%.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 outline-none hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          <RotateCcw aria-hidden className="size-4" /> Nova foto
        </button>
      </div>

      <section aria-label="Atual e projeção" className="grid grid-cols-2 gap-3">
        <figure className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Seu corpo hoje" className="size-full object-cover" />
          <figcaption className="absolute left-3 top-3 rounded-full bg-zinc-950/60 px-3 py-1 text-xs text-zinc-100 backdrop-blur-md">
            Hoje
          </figcaption>
        </figure>
        <figure className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-emerald-300/40 shadow-[0_0_50px_-18px_rgba(52,211,153,0.7)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Projeção simulada do seu corpo"
            className="size-full object-cover contrast-125 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/25 to-transparent" aria-hidden />
          <figcaption className="absolute left-3 top-3 rounded-full bg-emerald-300 px-3 py-1 text-xs font-medium text-zinc-950">
            Em {result.horizonMonths} meses
          </figcaption>
        </figure>
      </section>
      <p className="text-xs text-zinc-500">
        A projeção é uma estimativa ilustrativa (nesta versão, um mock), não uma promessa de resultado.
      </p>

      <section className={`${glass} p-5`} aria-labelledby="gaps-title">
        <h3 id="gaps-title" className="text-lg font-medium text-zinc-50">Gaps musculares</h3>
        <ul className="mt-4 space-y-4">
          {result.gaps.map((gap) => (
            <li key={gap.id}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-zinc-100">{gap.muscle}</span>
                <span className="text-xs text-zinc-400">Gap {gap.severity}</span>
              </div>
              <div
                className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-valuenow={gap.score}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Gap de ${gap.muscle}`}
              >
                <div className={`h-full rounded-full ${severityStyle[gap.severity]}`} style={{ width: `${gap.score}%` }} />
              </div>
              <p className="mt-1.5 text-sm text-zinc-400">{gap.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${glass} p-5`} aria-labelledby="plan-title">
        <h3 id="plan-title" className="text-lg font-medium text-zinc-50">Resumo do plano de ação</h3>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Calorias", `${plan.macros.kcal}`],
            ["Proteína", `${plan.macros.proteinG} g`],
            ["Carboidrato", `${plan.macros.carbsG} g`],
            ["Água", `${plan.hydrationLiters} L`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white/5 px-3 py-2.5">
              <dt className="text-xs text-zinc-400">{label}</dt>
              <dd className="font-mono text-lg tabular-nums text-emerald-200">{value}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-4 space-y-2">
          {plan.training.map((block) => (
            <li key={block.day} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-zinc-100">{block.day}: {block.title}</span>
              <span className="shrink-0 text-zinc-400">{block.duration}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-400">
          {plan.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-zinc-500">Este plano não substitui a orientação de um profissional de saúde.</p>
      </section>
    </div>
  );
}
