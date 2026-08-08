import Image from "next/image";
import Link from "next/link";
import { ValrSigil } from "@/components/brand/valr-sigil";

export function StoreHero() {
  return (
    <section className="store-hero">
      <Image className="store-hero-image" src="/images/campaign-hero.webp" alt="Atletas VÄLR en una costa volcánica del norte" fill priority sizes="100vw" />
      <div className="store-hero-shade" />
      <div className="shell store-hero-content">
        <ValrSigil className="store-hero-sigil" title="Emblema de VÄLR" />
        <p className="eyebrow"><span /> Colección 01 · El despertar</p>
        <h1>Forjados<br/><em>para avanzar.</em></h1>
        <p>Ropa técnica nacida de la fuerza del norte. Diseñada para superar lo que ayer parecía imposible.</p>
        <div className="hero-actions"><Link className="button button-primary" href="/coleccion">Explorar colección <span>↗</span></Link><Link className="button button-ghost" href="#origen">Conocer VÄLR</Link></div>
      </div>
      <div className="hero-drop"><span>01</span><p>El despertar</p><i /></div>
    </section>
  );
}
