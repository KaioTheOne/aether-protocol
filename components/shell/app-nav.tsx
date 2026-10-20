"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, LayoutGrid, ScanLine } from "lucide-react";

const tabs = [
  { href: "/", label: "Dashboard", sub: "overview", icon: LayoutGrid },
  { href: "/scanner", label: "AI Body Vision", sub: "scan", icon: ScanLine },
  { href: "/plano", label: "Plano de ação", sub: "protocolo", icon: ClipboardList },
];

export function AppNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Principal" className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
      <ul className="flex gap-2.5">
        {tabs.map(({ href, label, sub, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-2.5 outline-none transition focus-visible:ring-2 focus-visible:ring-emerald-300 ${
                  active
                    ? "border-emerald-300/40 bg-emerald-300/10 shadow-[0_0_28px_-10px_rgba(52,211,153,0.8)]"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              >
                <Icon aria-hidden className={`size-4 ${active ? "text-emerald-300" : "text-zinc-400"}`} />
                <span className="text-left leading-tight">
                  <span className="block text-sm font-medium text-zinc-100">{label}</span>
                  <span className="block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    {sub}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
