"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { ValrSigil } from "@/components/brand/valr-sigil";

type NavigationItem = { href: string; label: string };

export function MobileMenu({ navigation }: { navigation: NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 981px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className="mobile-menu-toggle"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span /><span />
      </button>
      <div className={`mobile-menu-panel${isOpen ? " is-open" : ""}`} id={menuId} role="dialog" aria-modal={isOpen ? "true" : undefined} aria-hidden={!isOpen}>
        <div className="mobile-menu-heading">
          <ValrSigil title="VÄLR" />
          <p>Forja tu legado.</p>
        </div>
        <nav aria-label="Navegación móvil">
          {navigation.map((item, index) => (
            <Link href={item.href} onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1} key={item.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>{item.label}<b>↗</b>
            </Link>
          ))}
        </nav>
        <p className="mobile-menu-note">Premium apparel inspired by Norse mythology.</p>
      </div>
    </div>
  );
}
