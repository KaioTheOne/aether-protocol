"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STEPS = [
  "Analisando biotipo...",
  "Mapeando grupos musculares...",
  "Identificando gaps...",
  "Projetando 6 meses...",
];

type Props = { previewUrl: string; onCancel: () => void };

export function ScanOverlay({ previewUrl, onCancel }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-emerald-300/30 shadow-[0_0_60px_-20px_rgba(52,211,153,0.6)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={previewUrl} alt="Foto enviada em análise" className="size-full object-cover opacity-70" />
        <div className="aether-grid absolute inset-0" aria-hidden />
        <div className="aether-scanline" aria-hidden />
        <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-zinc-950/50 px-4 py-3 backdrop-blur-xl">
          <p role="status" aria-live="polite" className="text-sm font-medium text-emerald-200">
            {STEPS[step]}
          </p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-300 transition-all duration-700"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onCancel}
        className="mx-auto mt-4 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-zinc-400 outline-none hover:text-zinc-100 focus-visible:ring-2 focus-visible:ring-emerald-300"
      >
        <X aria-hidden className="size-4" /> Cancelar análise
      </button>
    </div>
  );
}
