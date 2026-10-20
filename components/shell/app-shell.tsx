import type { ReactNode } from "react";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { AppNav } from "./app-nav";

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${serif.variable} ${mono.variable} min-h-screen bg-[radial-gradient(ellipse_at_top,#0f2a24_0%,#060907_58%)] text-zinc-100`}
    >
      <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-6 sm:py-10">
        <AppNav />
        <main>{children}</main>
      </div>
    </div>
  );
}
