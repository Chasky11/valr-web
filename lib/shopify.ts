import "server-only";

import { getProduct } from "@/lib/products";

const DEFAULT_API_VERSION = "2026-07";
const VALID_SIZES = new Set(["S", "M", "L", "XL", "2XL", "3XL"]);

type VariantMap = Record<string, Record<string, string>>;

export type CheckoutItem = {
  slug: string;
  size: string;
  quantity: number;
};

type ShopifyCartCreateResponse = {
  data?: {
    cartCreate?: {
      cart?: { id: string; checkoutUrl: string } | null;
      userErrors: Array<{ field?: string[] | null; message: string }>;
      warnings?: Array<{ message: string }>;
    };
  };
  errors?: Array<{ message: string }>;
};

export class ShopifyCheckoutError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ShopifyCheckoutError";
  }
}

export class ShopifyNewsletterError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ShopifyNewsletterError";
  }
}

function parseVariantMap(): VariantMap | null {
  const rawMap = process.env.SHOPIFY_VARIANT_MAP;
  if (!rawMap) return null;

  try {
    const parsed: unknown = JSON.parse(rawMap);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed as VariantMap;
  } catch {
    return null;
  }
}

function normalizeStoreDomain(value: string) {
  const domain = value.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(domain)) {
    throw new ShopifyCheckoutError(
      "El dominio de Shopify no tiene un formato válido.",
      "invalid_store_domain",
      503,
    );
  }
  return domain;
}

function getConfig() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const variantMap = parseVariantMap();

  if (!storeDomain || !variantMap) {
    throw new ShopifyCheckoutError(
      "El checkout de Shopify todavía no está configurado.",
      "checkout_not_configured",
      503,
    );
  }

  return {
    storeDomain: normalizeStoreDomain(storeDomain),
    apiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION || DEFAULT_API_VERSION,
    privateToken: process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN,
    publicToken: process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
    buyerCountry: (process.env.SHOPIFY_BUYER_COUNTRY || "ES").toUpperCase(),
    variantMap,
  };
}

export function isShopifyCheckoutConfigured() {
  try {
    getConfig();
    return true;
  } catch {
    return false;
  }
}

// La newsletter solo necesita el dominio de la tienda + un token de Admin API
// (distinto del token de Storefront que usa el checkout): no depende del
// variantMap, así que se valida por separado.
function getAdminConfig() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const adminToken = process.env.SHOPIFY_ADMIN_API_TOKEN;

  if (!storeDomain || !adminToken) {
    throw new ShopifyNewsletterError(
      "La newsletter todavía no está configurada.",
      "newsletter_not_configured",
      503,
    );
  }

  return {
    storeDomain: normalizeStoreDomain(storeDomain),
    apiVersion: process.env.SHOPIFY_ADMIN_API_VERSION || DEFAULT_API_VERSION,
    adminToken,
  };
}

export function isShopifyNewsletterConfigured() {
  try {
    getAdminConfig();
    return true;
  } catch {
    return false;
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ShopifyCustomerCreateResponse = {
  data?: {
    customerCreate?: {
      customer?: { id: string } | null;
      userErrors: Array<{ field?: string[] | null; message: string }>;
    };
  };
  errors?: Array<{ message: string }>;
};

export async function subscribeToNewsletter(rawEmail: unknown) {
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    throw new ShopifyNewsletterError("Introduce un correo electrónico válido.", "invalid_email", 400);
  }

  const config = getAdminConfig();

  const response = await fetch(`https://${config.storeDomain}/admin/api/${config.apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": config.adminToken,
    },
    cache: "no-store",
    body: JSON.stringify({
      query: `
        mutation SubscribeValrNewsletter($input: CustomerInput!) {
          customerCreate(input: $input) {
            customer { id }
            userErrors { field message }
          }
        }
      `,
      variables: {
        input: {
          email,
          emailMarketingConsent: { marketingState: "SUBSCRIBED", marketingOptInLevel: "SINGLE_OPT_IN" },
        },
      },
    }),
  });

  const payload = await response.json().catch(() => null) as ShopifyCustomerCreateResponse | null;
  if (!response.ok || !payload) {
    throw new ShopifyNewsletterError("Shopify no ha podido procesar la suscripción.", "shopify_unavailable", 502);
  }

  const apiError = payload.errors?.[0]?.message;
  if (apiError) {
    throw new ShopifyNewsletterError(apiError, "shopify_error", 502);
  }

  const userErrors = payload.data?.customerCreate?.userErrors ?? [];
  const alreadySubscribed = userErrors.some((error) => /taken|exists/i.test(error.message));
  if (userErrors.length > 0 && !alreadySubscribed) {
    throw new ShopifyNewsletterError(userErrors[0].message, "shopify_user_error", 422);
  }

  // Un email ya existente cuenta como éxito de cara a quien se suscribe:
  // no tiene por qué saber que ya estaba en la lista.
  return { alreadySubscribed };
}

function validateItems(value: unknown): CheckoutItem[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new ShopifyCheckoutError("La bolsa está vacía.", "empty_cart", 400);
  }

  const merged = new Map<string, CheckoutItem>();

  for (const candidate of value) {
    if (!candidate || typeof candidate !== "object") {
      throw new ShopifyCheckoutError("La bolsa contiene una pieza no válida.", "invalid_cart", 400);
    }

    const item = candidate as Partial<CheckoutItem>;
    const slug = typeof item.slug === "string" ? item.slug.trim() : "";
    const size = typeof item.size === "string" ? item.size.trim().toUpperCase() : "";
    const quantity = Number(item.quantity);

    if (!getProduct(slug) || !VALID_SIZES.has(size) || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      throw new ShopifyCheckoutError("La bolsa contiene una pieza no válida.", "invalid_cart", 400);
    }

    const key = `${slug}:${size}`;
    const current = merged.get(key);
    const nextQuantity = (current?.quantity || 0) + quantity;
    if (nextQuantity > 10) {
      throw new ShopifyCheckoutError("La cantidad máxima por talla es 10.", "quantity_limit", 400);
    }
    merged.set(key, { slug, size, quantity: nextQuantity });
  }

  const items = Array.from(merged.values());
  if (items.reduce((total, item) => total + item.quantity, 0) > 20) {
    throw new ShopifyCheckoutError("La bolsa supera el máximo de 20 piezas.", "cart_limit", 400);
  }
  return items;
}

export async function createShopifyCheckout(value: unknown, buyerIp?: string) {
  const items = validateItems(value);
  const config = getConfig();

  const lines = items.map((item) => {
    const merchandiseId = config.variantMap[item.slug]?.[item.size];
    if (typeof merchandiseId !== "string" || !merchandiseId.startsWith("gid://shopify/ProductVariant/")) {
      throw new ShopifyCheckoutError(
        `La talla ${item.size} de ${getProduct(item.slug)?.name || item.slug} aún no está vinculada a Shopify.`,
        "variant_not_mapped",
        422,
      );
    }
    return { merchandiseId, quantity: item.quantity };
  });

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (config.privateToken) {
    headers["Shopify-Storefront-Private-Token"] = config.privateToken;
    if (buyerIp) headers["Shopify-Storefront-Buyer-IP"] = buyerIp;
  } else if (config.publicToken) {
    headers["X-Shopify-Storefront-Access-Token"] = config.publicToken;
  }

  const countryCode = /^[A-Z]{2}$/.test(config.buyerCountry) ? config.buyerCountry : "ES";
  const response = await fetch(`https://${config.storeDomain}/api/${config.apiVersion}/graphql.json`, {
    method: "POST",
    headers,
    cache: "no-store",
    body: JSON.stringify({
      query: `
        mutation CreateValrCart($input: CartInput!) {
          cartCreate(input: $input) {
            cart { id checkoutUrl }
            userErrors { field message }
            warnings { message }
          }
        }
      `,
      variables: { input: { lines, buyerIdentity: { countryCode } } },
    }),
  });

  const payload = await response.json().catch(() => null) as ShopifyCartCreateResponse | null;
  if (!response.ok || !payload) {
    throw new ShopifyCheckoutError("Shopify no ha podido preparar el pago.", "shopify_unavailable", 502);
  }

  const apiError = payload.errors?.[0]?.message;
  const userError = payload.data?.cartCreate?.userErrors?.[0]?.message;
  if (apiError || userError) {
    throw new ShopifyCheckoutError(apiError || userError || "No se pudo crear el carrito.", "shopify_cart_error", 422);
  }

  const checkoutUrl = payload.data?.cartCreate?.cart?.checkoutUrl;
  if (!checkoutUrl || !checkoutUrl.startsWith("https://")) {
    throw new ShopifyCheckoutError("Shopify no devolvió un checkout válido.", "invalid_checkout_url", 502);
  }

  return checkoutUrl;
}
