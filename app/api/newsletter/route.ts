import { ShopifyNewsletterError, subscribeToNewsletter } from "@/lib/shopify";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const email = body && typeof body === "object" && "email" in body
      ? (body as { email: unknown }).email
      : undefined;

    await subscribeToNewsletter(email);

    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof ShopifyNewsletterError) {
      return Response.json(
        { error: error.message, code: error.code },
        { status: error.status, headers: { "Cache-Control": "no-store" } },
      );
    }

    console.error("Unable to subscribe to newsletter", error);
    return Response.json(
      { error: "No hemos podido completar la suscripción. Inténtalo de nuevo.", code: "newsletter_failed" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
