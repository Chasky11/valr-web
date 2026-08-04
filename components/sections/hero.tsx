import Link from "next/link";
import { RuneSigil } from "@/components/ui/rune-sigil";

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="aurora" aria-hidden="true" />
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Estrategia · Diseño · Tecnología</p>
          <h1>
            Forjamos ideas
            <span>que dejan legado.</span>
          </h1>
          <p className="hero-lede">
            VÄLR transforma ambición en productos digitales extraordinarios. Claridad estratégica,
            diseño con carácter y tecnología preparada para escalar.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#contacto">
              Forjar una alianza <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="#vision">
              Descubrir VÄLR <span aria-hidden="true">↓</span>
            </Link>
          </div>
          <div className="hero-proof" aria-label="Principios de VÄLR">
            <span>01</span><p>Precisión nórdica</p><i />
            <span>02</span><p>Ambición sin ruido</p><i />
            <span>03</span><p>Impacto duradero</p>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <RuneSigil />
          <p className="orbit-label orbit-label-top">Hugr</p>
          <p className="orbit-label orbit-label-bottom">Megin</p>
        </div>
      </div>
      <div className="scroll-marker" aria-hidden="true"><span /></div>
    </section>
  );
}
