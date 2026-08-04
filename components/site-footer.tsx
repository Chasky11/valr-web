import { ValrMark } from "@/components/brand/valr-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <ValrMark />
        <p>Diseñado en el norte. Construido para avanzar.</p>
        <p>© {new Date().getFullYear()} VÄLR</p>
      </div>
    </footer>
  );
}
