"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";

const sizes = ["S", "M", "L", "XL"];

type ProductPurchaseProps = {
  slug: string;
  color: string;
  swatch: string;
};

export function ProductPurchase({ slug, color, swatch }: ProductPurchaseProps) {
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);
  const sizeGuideRef = useRef<HTMLDialogElement>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { addItem } = useCart();

  useEffect(() => () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
  }, []);

  function handleAddToCart() {
    addItem(slug, size);
    setAdded(true);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setAdded(false), 1800);
  }
  return (
    <div className="purchase">
      <div className="color-picker">
        <p>Color <span>Una tonalidad disponible</span></p>
        <button type="button" aria-pressed="true" className="color-option">
          <i style={{ backgroundColor: swatch }} />
          <span>{color}</span>
          <b>Seleccionado</b>
        </button>
      </div>
      <div className="size-row">
        <p>Talla <button type="button" aria-haspopup="dialog" onClick={() => sizeGuideRef.current?.showModal()}>Guía de tallas</button></p>
        <div>{sizes.map((value) => <button type="button" aria-pressed={size === value} className={size === value ? "active" : ""} onClick={() => setSize(value)} key={value}>{value}</button>)}</div>
      </div>
      <button type="button" className="add-button" onClick={handleAddToCart}>{added ? "Añadido a la bolsa" : "Añadir a la bolsa"}<span>{added ? "✓" : "→"}</span></button>
      <div className="purchase-assurances"><span>Envío gratuito desde 90 €</span><span>Devoluciones en 30 días</span></div>
      <dialog className="size-guide" ref={sizeGuideRef} aria-labelledby="size-guide-title" onClick={(event) => { if (event.currentTarget === event.target) event.currentTarget.close(); }}>
        <div>
          <form method="dialog"><button type="submit" aria-label="Cerrar guía de tallas">×</button></form>
          <p className="eyebrow"><span /> Ajuste oversized</p>
          <h2 id="size-guide-title">Encuentra tu talla.</h2>
          <p>La silueta VÄLR tiene hombro caído y volumen amplio. Elige tu talla habitual para el fit editorial previsto.</p>
          <div className="size-table" role="table" aria-label="Medidas de la camiseta en centímetros">
            <div role="row"><b role="columnheader">Talla</b><b role="columnheader">Pecho</b><b role="columnheader">Largo</b></div>
            <div role="row"><span>S</span><span>58 cm</span><span>72 cm</span></div>
            <div role="row"><span>M</span><span>61 cm</span><span>74 cm</span></div>
            <div role="row"><span>L</span><span>64 cm</span><span>76 cm</span></div>
            <div role="row"><span>XL</span><span>67 cm</span><span>78 cm</span></div>
          </div>
          <small>Medidas tomadas sobre la prenda en plano. Puede existir una variación de ±1 cm.</small>
        </div>
      </dialog>
    </div>
  );
}
