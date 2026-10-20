import type { Metadata } from "next";
import { AppShell } from "@/components/shell/app-shell";
import { Kicker } from "@/components/ui/card";
import { BodyScanner } from "@/components/body-scanner/body-scanner";

export const metadata: Metadata = { title: "AI Body Vision | Aether Protocol" };

export default function ScannerPage() {
  return (
    <AppShell>
      <header className="mb-8">
        <Kicker>AI Body Vision</Kicker>
        <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Leitura corporal em alta resolução.
        </h1>
        <p className="mt-2 max-w-xl text-zinc-400">
          Envie uma foto do físico atual. O motor simulado estima biotipo, gaps musculares e a projeção estética em 3 a 6 meses.
        </p>
      </header>
      <BodyScanner />
    </AppShell>
  );
}
