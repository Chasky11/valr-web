import { ValrMark } from "@/components/brand/valr-mark";
import { NewsletterForm } from "@/components/newsletter-form";
import { isShopifyNewsletterConfigured } from "@/lib/shopify";

export async function SiteFooter() {
  const newsletterConfigured = isShopifyNewsletterConfigured();

  return (
    <footer className="site-footer">
      <div className="shell footer-main" data-reveal="up">
        <div><ValrMark /><p>Rendimiento forjado en el norte.</p></div>
        <div><h3>Explorar</h3><a href="/coleccion">Colección</a><a href="/coleccion?genero=hombre">Hombre</a><a href="/coleccion?genero=mujer">Mujer</a></div>
        <div><h3>Ayuda</h3><a href="#">Envíos y devoluciones</a><a href="#">Guía de tallas</a><a href="#">Contacto</a></div>
        <NewsletterForm configured={newsletterConfigured} />
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} VÄLR</p><p>Diseñado para quienes avanzan.</p>
      </div>
    </footer>
  );
}
