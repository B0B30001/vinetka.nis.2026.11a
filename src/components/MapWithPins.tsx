"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import type { Scene } from "@/data/schools";

interface MapWithPinsProps {
  mapImage: string;
  scenes: Scene[];
  onPinClick: (scene: Scene) => void;
}

export default function MapWithPins({
  mapImage,
  scenes,
  onPinClick,
}: MapWithPinsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleKey = useCallback(
    (e: React.KeyboardEvent, scene: Scene) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPinClick(scene);
      }
    },
    [onPinClick],
  );

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-md)] bg-white">
      {/* Map image */}
      <Image
        src={mapImage}
        alt="School floor plan"
        width={1200}
        height={800}
        className="w-full h-auto block select-none"
        priority
        draggable={false}
      />

      {/* Pins */}
      {scenes.map((scene) => {
        const isHovered = hoveredId === scene.id;
        return (
          <div
            key={scene.id}
            role="button"
            tabIndex={0}
            aria-label={`Open panorama: ${scene.title}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: `${scene.mapX}%`, top: `${scene.mapY}%` }}
            onClick={() => onPinClick(scene)}
            onKeyDown={(e) => handleKey(e, scene)}
            onMouseEnter={() => setHoveredId(scene.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(scene.id)}
            onBlur={() => setHoveredId(null)}
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 m-auto h-8 w-8 rounded-full bg-[var(--color-accent)]/20 animate-ping pointer-events-none" />

            {/* Pin dot */}
            <span
              className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full
                         bg-[var(--color-accent)] text-white shadow-lg
                         transition-transform duration-200 group-hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.145c.182-.1.422-.244.703-.432a19.856 19.856 0 002.748-2.217C15.862 14.407 18 11.625 18 8a8 8 0 00-16 0c0 3.625 2.138 6.407 3.934 8.128a19.856 19.856 0 003.028 2.504c.282.188.521.332.703.432a5.741 5.741 0 00.3.153l.018.008.006.003zM10 11a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            {/* Tooltip */}
            <span
              className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 whitespace-nowrap
                          rounded-lg bg-[var(--color-fg)] px-3 py-1.5 text-xs font-medium text-white
                          shadow-lg transition-all duration-200 pointer-events-none
                          ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
            >
              {scene.title}
              {/* triangle */}
              <span className="absolute left-1/2 -translate-x-1/2 top-full h-0 w-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-[var(--color-fg)]" />
            </span>
          </div>
        );
      })}
    </div>
  );
}
