import Link from "next/link";

export function FinalCta() {
  return (
    <section className="final-cta" id="contacto">
      <div className="cta-rune" aria-hidden="true">ᛉ</div>
      <div className="shell cta-inner">
        <p className="eyebrow"><span /> El próximo capítulo</p>
        <h2>¿Qué legado<br /><em>quieres construir?</em></h2>
        <p>Cuéntanos la ambición. Nosotros ayudaremos a darle forma.</p>
        <Link className="button button-primary" href="mailto:hola@valr.studio">
          Hablemos del proyecto <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
