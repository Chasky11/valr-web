import Image from "next/image";
import Link from "next/link";
import { ValrSigil } from "@/components/brand/valr-sigil";

export function StoreHero() {
  return (
    <section className="store-hero" id="inicio">
      <Image className="store-hero-image" src="/images/odin-editorial-hero-v1.webp" alt="Odín entre niebla, cuervos y roca en la costa del norte" fill priority sizes="100vw" />
      <div className="store-hero-shade" />
      <div className="shell store-hero-content">
        <ValrSigil className="store-hero-sigil" title="Emblema de VÄLR" />
        <p className="eyebrow"><span /> Drop 01 · The Awakening</p>
        <h1>El<br/><em>despertar.</em></h1>
        <p>Una colección nacida entre piedra, niebla y voluntad. Mitología del norte traducida al lenguaje de hoy.</p>
        <div className="hero-actions"><Link className="button button-primary" href="/coleccion">Explorar colección <span>↗</span></Link><Link className="button button-ghost" href="#origen">Descubrir el origen</Link></div>
      </div>
      <div className="hero-drop"><span>VÄLR / 01</span><p>Northbound editorial</p><i /></div>
    </section>
  );
}
