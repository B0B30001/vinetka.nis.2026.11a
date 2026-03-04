"use client";

import { useState, useCallback } from "react";
import type { Scene } from "@/data/schools";
import MapWithPins from "@/components/MapWithPins";
import PanoramaModal from "@/components/PanoramaModal";

interface TourClientProps {
  mapImage: string;
  scenes: Scene[];
}

export default function TourClient({ mapImage, scenes }: TourClientProps) {
  const [activeScene, setActiveScene] = useState<Scene | null>(null);

  const handlePinClick = useCallback((scene: Scene) => {
    setActiveScene(scene);
  }, []);

  const handleClose = useCallback(() => {
    setActiveScene(null);
  }, []);

  return (
    <>
      <MapWithPins
        mapImage={mapImage}
        scenes={scenes}
        onPinClick={handlePinClick}
      />
      <PanoramaModal scene={activeScene} onClose={handleClose} />
    </>
  );
}
