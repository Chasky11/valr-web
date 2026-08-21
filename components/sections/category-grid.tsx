import Image from "next/image";
import Link from "next/link";

export function CategoryGrid() {
  return (
    <section className="editorial-selection" aria-labelledby="selection-title">
      <div className="shell selection-heading" data-reveal="up">
        <p className="selection-index">II — PIEZAS DE LA SAGA</p>
        <h2 id="selection-title">Dos símbolos.<br/><em>Dos caminos.</em></h2>
        <p className="selection-copy">Cuervos que observan. Truenos que avanzan. Las piezas esenciales del primer despertar de VÄLR.</p>
      </div>
      <div className="category-grid">
        <Link href="/producto/hrafn-oversized-tee" className="category-card" data-reveal="image"><Image src="/images/hrafn-tee-v1.webp" alt="Camiseta Hrafn VÄLR, frontal y espalda" fill sizes="(max-width: 700px) 100vw, 50vw" style={{objectPosition:"50% 50%"}}/><span/><div><p>Saga 01 · El observador</p><h2>Hrafn</h2><b>Descubrir la pieza <i>↗</i></b></div></Link>
        <Link href="/producto/thorr-oversized-tee" className="category-card" data-reveal="image" data-reveal-delay="110"><Image src="/images/thorr-tee-v1.webp" alt="Camiseta Thorr VÄLR, frontal y espalda" fill sizes="(max-width: 700px) 100vw, 50vw" style={{objectPosition:"50% 50%"}}/><span/><div><p>Saga 01 · La tormenta</p><h2>Thorr</h2><b>Descubrir la pieza <i>↗</i></b></div></Link>
      </div>
    </section>
  );
}
