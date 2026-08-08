import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Tu bolsa",
  description: "Revisa las piezas seleccionadas antes de finalizar tu pedido VÄLR.",
};

export default function CartPage() {
  return (
    <main>
      <SiteHeader />
      <CartView />
      <SiteFooter />
    </main>
  );
}
