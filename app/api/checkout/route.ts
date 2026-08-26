import { createShopifyCheckout, ShopifyCheckoutError } from "@/lib/shopify";

export const runtime = "nodejs";

function getBuyerIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || undefined;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const items = body && typeof body === "object" && "items" in body
      ? (body as { items: unknown }).items
      : undefined;
    const checkoutUrl = await createShopifyCheckout(items, getBuyerIp(request));

    return Response.json(
      { checkoutUrl },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof ShopifyCheckoutError) {
      return Response.json(
        { error: error.message, code: error.code },
        { status: error.status, headers: { "Cache-Control": "no-store" } },
      );
    }

    console.error("Unable to create Shopify checkout", error);
    return Response.json(
      { error: "No hemos podido preparar el pago. Inténtalo de nuevo.", code: "checkout_failed" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
