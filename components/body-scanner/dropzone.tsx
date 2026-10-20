"use client";

import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { validateImage } from "@/lib/image/compress";

type Props = { onFile: (file: File) => void; onInvalid: (message: string) => void };

export function Dropzone({ onFile, onInvalid }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handle(file?: File) {
    if (!file) return;
    const error = validateImage(file);
    if (error) onInvalid(error);
    else onFile(file);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handle(e.dataTransfer.files[0]);
      }}
      className={`aether-grid relative flex min-h-[22rem] flex-col items-center justify-center gap-5 rounded-3xl border border-dashed p-8 text-center backdrop-blur-xl transition-colors ${
        dragging ? "border-emerald-300 bg-emerald-400/10" : "border-white/15 bg-white/[0.04]"
      }`}
    >
      <span className="grid size-16 place-items-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 text-emerald-300 shadow-[0_0_32px_-8px_rgba(52,211,153,0.7)]">
        <ImagePlus aria-hidden className="size-7" />
      </span>
      <div className="space-y-1.5">
        <p className="text-lg font-medium text-zinc-50">Solte sua foto aqui</p>
        <p className="max-w-xs text-sm text-zinc-400">
          Corpo inteiro, boa luz, roupa justa. JPG, PNG ou WebP até 15 MB.
        </p>
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-full bg-emerald-300 px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_-4px_rgba(52,211,153,0.8)] outline-none transition hover:bg-emerald-200 focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        Escolher foto
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          handle(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
