import { ValrMark } from "@/components/brand/valr-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div><ValrMark /><p>Rendimiento forjado en el norte.</p></div>
        <div><h3>Explorar</h3><a href="/coleccion">Colección</a><a href="/coleccion?genero=hombre">Hombre</a><a href="/coleccion?genero=mujer">Mujer</a></div>
        <div><h3>Ayuda</h3><a href="#">Envíos y devoluciones</a><a href="#">Guía de tallas</a><a href="#">Contacto</a></div>
        <div className="newsletter"><h3>Únete al clan</h3><p>Acceso anticipado a lanzamientos y relatos del norte.</p><div><input type="email" aria-label="Correo electrónico" placeholder="Tu correo electrónico"/><button type="button" aria-label="Suscribirse">→</button></div></div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} VÄLR</p><p>Diseñado para quienes avanzan.</p>
      </div>
    </footer>
  );
}
