"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { RotateCw, ZoomIn } from "lucide-react";
import { cx } from "@/lib/utils";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomOn, setZoomOn] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [mode, setMode] = useState<"gallery" | "360">("gallery");
  const dragStartX = useRef<number | null>(null);
  const frameRef = useRef(0);

  function handleZoomMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  function handle360Down(e: React.PointerEvent) {
    dragStartX.current = e.clientX;
    frameRef.current = active;
  }
  function handle360Move(e: React.PointerEvent) {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    const step = Math.round(delta / 40);
    const next = ((frameRef.current + step) % images.length + images.length) % images.length;
    setActive(next);
  }
  function handle360Up() {
    dragStartX.current = null;
  }

  return (
    <div>
      <div className="mb-3 flex justify-end gap-2">
        <button
          onClick={() => setMode(mode === "gallery" ? "360" : "gallery")}
          className="flex items-center gap-1.5 border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest2 text-ivory/70 hover:border-champagne"
        >
          <RotateCw size={12} />
          {mode === "gallery" ? "360° View" : "Exit 360°"}
        </button>
      </div>

      <div
        className={cx(
          "relative aspect-square overflow-hidden border border-white/10 bg-onyx-800",
          mode === "360" && "cursor-grab active:cursor-grabbing"
        )}
        onMouseEnter={() => mode === "gallery" && setZoomOn(true)}
        onMouseLeave={() => setZoomOn(false)}
        onMouseMove={mode === "gallery" ? handleZoomMove : undefined}
        onPointerDown={mode === "360" ? handle360Down : undefined}
        onPointerMove={mode === "360" ? handle360Move : undefined}
        onPointerUp={mode === "360" ? handle360Up : undefined}
      >
        <Image
          src={images[active]!}
          alt={`${name} — view ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={cx("object-cover transition-transform duration-200", zoomOn && "scale-[1.9]")}
          style={zoomOn ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
        />
        {mode === "gallery" && !zoomOn && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 bg-onyx/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest2 text-ivory/70">
            <ZoomIn size={12} /> Hover to zoom
          </span>
        )}
        {mode === "360" && (
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-onyx/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest2 text-ivory/70">
            Drag to rotate
          </span>
        )}
      </div>

      {mode === "gallery" && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={cx(
                "relative aspect-square overflow-hidden border",
                active === i ? "border-champagne" : "border-white/10 hover:border-white/30"
              )}
            >
              <Image src={img} alt={`${name} thumbnail ${i + 1}`} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
