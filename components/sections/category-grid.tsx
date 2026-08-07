import Image from "next/image";
import Link from "next/link";

export function CategoryGrid() {
  return (
    <section className="category-grid">
      <Link href="/producto/hrafn-oversized-tee" className="category-card"><Image src="/images/hrafn-tee-v1.webp" alt="Camiseta Hrafn VÄLR, frontal y espalda" fill sizes="50vw" style={{objectPosition:"50% 46%"}}/><span/><div><p>Saga 01</p><h2>Hrafn</h2><b>Descubrir →</b></div></Link>
      <Link href="/producto/thorr-oversized-tee" className="category-card"><Image src="/images/thorr-tee-v1.webp" alt="Camiseta Thorr VÄLR, frontal y espalda" fill sizes="50vw" style={{objectPosition:"50% 46%"}}/><span/><div><p>Saga 01</p><h2>Thorr</h2><b>Descubrir →</b></div></Link>
    </section>
  );
}
