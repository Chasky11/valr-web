import Link from "next/link";
import { ValrMark } from "@/components/brand/valr-mark";

const navigation = [
  { href: "#vision", label: "Visión" },
  { href: "#metodo", label: "Método" },
  { href: "#contacto", label: "Contacto" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="#inicio" className="logo-link" aria-label="VÄLR, inicio">
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
        <Link className="header-cta" href="#contacto">
          Iniciar un proyecto
        </Link>
      </div>
    </header>
  );
}
