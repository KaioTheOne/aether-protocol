"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { mockBodyScanner } from "@/application/body-scan/analyze-body";
import { compressImage } from "@/lib/image/compress";
import type { BodyScanResult } from "@/domain/body-scan/types";
import { Dropzone } from "./dropzone";
import { ScanOverlay } from "./scan-overlay";
import { ScanResults } from "./scan-results";
import "./scanner.css";

type State =
  | { status: "idle"; error?: string }
  | { status: "analyzing"; previewUrl: string }
  | { status: "success"; previewUrl: string; result: BodyScanResult };

export function BodyScanner() {
  const [state, setState] = useState<State>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);
  const urlRef = useRef<string | null>(null);

  const releaseUrl = useCallback(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
  }, []);

  useEffect(
    () => () => {
      abortRef.current?.abort();
      releaseUrl();
    },
    [releaseUrl],
  );

  const start = useCallback(
    async (file: File) => {
      abortRef.current?.abort();
      releaseUrl();
      const controller = new AbortController();
      abortRef.current = controller;
      const previewUrl = URL.createObjectURL(file);
      urlRef.current = previewUrl;
      setState({ status: "analyzing", previewUrl });
      try {
        const compressed = await compressImage(file);
        const result = await mockBodyScanner.analyze(compressed, controller.signal);
        if (!controller.signal.aborted) setState({ status: "success", previewUrl, result });
      } catch (e) {
        if (controller.signal.aborted) return;
        releaseUrl();
        setState({
          status: "idle",
          error: e instanceof Error ? e.message : "Não foi possível analisar a foto. Tente novamente.",
        });
      }
    },
    [releaseUrl],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    releaseUrl();
    setState({ status: "idle" });
  }, [releaseUrl]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      {state.status === "idle" && (
        <div className="space-y-4">
          {state.error && (
            <p role="alert" className="flex items-start gap-2 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
              {state.error}
            </p>
          )}
          <Dropzone onFile={start} onInvalid={(error) => setState({ status: "idle", error })} />
        </div>
      )}
      {state.status === "analyzing" && <ScanOverlay previewUrl={state.previewUrl} onCancel={reset} />}
      {state.status === "success" && (
        <ScanResults previewUrl={state.previewUrl} result={state.result} onReset={reset} />
      )}
    </div>
  );
}
