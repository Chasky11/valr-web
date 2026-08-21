"use client";

import Image from "next/image";
import { useState } from "react";

const views = [
  { id: "complete", label: "Vista completa", shortLabel: "Completa" },
  { id: "front", label: "Detalle frontal", shortLabel: "Frontal" },
  { id: "back", label: "Detalle trasero", shortLabel: "Trasera" },
] as const;

type GalleryView = (typeof views)[number]["id"];

type ProductGalleryProps = {
  image: string;
  name: string;
  color: string;
  imagePosition?: string;
};

export function ProductGallery({ image, name, color, imagePosition }: ProductGalleryProps) {
  const [activeView, setActiveView] = useState<GalleryView>("complete");
  const activeLabel = views.find(({ id }) => id === activeView)?.label ?? views[0].label;

  return (
    <section className="product-gallery" aria-label={`Galería de ${name}`} data-reveal="image">
      <div id="product-gallery-panel" role="tabpanel" aria-labelledby={`gallery-tab-${activeView}`} className={`product-gallery-stage view-${activeView}`}>
        <Image
          src={image}
          alt={`${name}, ${activeLabel.toLowerCase()}, ${color}`}
          fill
          priority
          sizes="(max-width: 980px) 100vw, 58vw"
          style={{ objectPosition: imagePosition }}
        />
        <div className="gallery-counter"><span>0{views.findIndex(({ id }) => id === activeView) + 1}</span> / 03</div>
        <p className="gallery-caption">{activeLabel}</p>
      </div>
      <div className="gallery-tabs" role="tablist" aria-label="Seleccionar vista de la prenda">
        {views.map((view, index) => (
          <button
            type="button"
            role="tab"
            id={`gallery-tab-${view.id}`}
            aria-controls="product-gallery-panel"
            aria-selected={activeView === view.id}
            className={activeView === view.id ? "active" : ""}
            onClick={() => setActiveView(view.id)}
            key={view.id}
          >
            <span>0{index + 1}</span>{view.shortLabel}
          </button>
        ))}
      </div>
    </section>
  );
}
