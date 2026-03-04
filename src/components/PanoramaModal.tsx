"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import type { Scene } from "@/data/schools";

interface PanoramaModalProps {
  scene: Scene | null;
  onClose: () => void;
}

export default function PanoramaModal({ scene, onClose }: PanoramaModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PannellumViewer | null>(null);
  const [loading, setLoading] = useState(true);

  // Close on ESC
  useEffect(() => {
    if (!scene) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scene, onClose]);

  // Init / destroy pannellum viewer
  useEffect(() => {
    if (!scene || !containerRef.current) return;

    let cancelled = false;
    setLoading(true);

    // Dynamically import pannellum (client-only)
    const init = async () => {
      // Load pannellum CSS
      if (!document.getElementById("pannellum-css")) {
        const link = document.createElement("link");
        link.id = "pannellum-css";
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
        document.head.appendChild(link);
      }

      // Load pannellum JS if not already loaded
      if (!(window as WindowWithPannellum).pannellum) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
          script.onload = () => resolve();
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      if (cancelled || !containerRef.current) return;

      const pannellum = (window as WindowWithPannellum).pannellum;
      if (!pannellum) return;

      viewerRef.current = pannellum.viewer(containerRef.current, {
        type: "equirectangular",
        panorama: scene.panorama,
        autoLoad: true,
        compass: false,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        yaw: scene.yaw ?? 0,
        pitch: scene.pitch ?? 0,
        hfov: scene.hfov ?? 110,
        minHfov: 50,
        maxHfov: 120,
        mouseZoom: true,
      });

      viewerRef.current.on("load", () => {
        if (!cancelled) setLoading(false);
      });
    };

    init();

    return () => {
      cancelled = true;
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [scene]);

  // Close on backdrop click
  const handleBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  if (!scene) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-overlay-in"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`360° panorama: ${scene.title}`}
    >
      <div className="relative w-full max-w-4xl animate-fade-in-scale">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white text-sm font-medium tracking-wide">
            {scene.title}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white
                       hover:bg-white/20 transition"
            aria-label="Close panorama"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        {/* Viewer container */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black/50">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span className="text-white/70 text-xs">Loading panorama…</span>
              </div>
            </div>
          )}
          <div ref={containerRef} className="w-full h-full" />
        </div>

        {/* Instruction */}
        <p className="mt-3 text-center text-xs text-white/50">
          Drag to look around · Scroll to zoom · Press ESC to close
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pannellum type shims (no @types package available)                */
/* ------------------------------------------------------------------ */

interface PannellumViewer {
  on: (event: string, callback: () => void) => void;
  destroy: () => void;
}

interface WindowWithPannellum extends Window {
  pannellum?: {
    viewer: (
      container: HTMLElement,
      config: Record<string, unknown>,
    ) => PannellumViewer;
  };
}
