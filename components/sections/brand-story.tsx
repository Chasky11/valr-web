import Image from "next/image";
import Link from "next/link";

export function BrandStory() {
  return (
    <section className="brand-story" id="origen">
      <div className="story-image"><Image src="/images/campaign-hero.webp" alt="Paisaje de origen de VÄLR" fill sizes="50vw" style={{objectPosition:"78% center"}}/></div>
      <div className="story-copy"><p className="eyebrow"><span /> Nuestro origen</p><h2>No heredamos<br/>la fuerza.<br/><em>La forjamos.</em></h2><p>VÄLR nace del respeto por quienes entrenan cuando nadie mira. Cada prenda une rendimiento contemporáneo y símbolos del norte para recordar que el verdadero valor se construye.</p><div className="story-values"><span><b>ᛏ</b> Disciplina</span><span><b>ᛉ</b> Resistencia</span><span><b>ᚱ</b> Evolución</span></div><Link href="/coleccion" className="button button-primary">Vestir el propósito <span>↗</span></Link></div>
    </section>
  );
}
