import Link from "next/link";
import { ValrMark } from "@/components/brand/valr-mark";
import { CartButton } from "@/components/cart/cart-button";
import { MobileMenu } from "@/components/mobile-menu";

const navigation = [
  { href: "/coleccion", label: "Novedades" },
  { href: "/coleccion?genero=hombre", label: "Hombre" },
  { href: "/coleccion?genero=mujer", label: "Mujer" },
  { href: "/#origen", label: "Nuestro origen" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <p className="announcement">Envío gratuito en pedidos superiores a 90 €</p>
      <div className="shell header-inner">
        <Link href="/" className="logo-link" aria-label="VÄLR, inicio">
          <ValrMark />
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <Link href="/coleccion" aria-label="Buscar productos" className="icon-link">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>
          </Link>
          <CartButton />
        </div>
      </div>
      <MobileMenu navigation={navigation} />
    </header>
  );
}
