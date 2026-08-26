import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isShopifyCheckoutConfigured } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Tu bolsa",
  description: "Revisa las piezas seleccionadas antes de finalizar tu pedido VÄLR.",
};

export default function CartPage() {
  const checkoutEnabled = isShopifyCheckoutConfigured();

  return (
    <main>
      <SiteHeader />
      <CartView checkoutEnabled={checkoutEnabled} />
      <SiteFooter />
    </main>
  );
}
