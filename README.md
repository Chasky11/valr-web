# VÄLR

Storefront de ropa deportiva premium inspirada en la mitología nórdica, construido con Next.js 15, React, TypeScript y Tailwind CSS.

## Desarrollo local

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Verificación

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Arquitectura

- `app/`: rutas, metadatos y estilos globales.
- `components/brand/`: identidad visual reutilizable.
- `components/sections/`: secciones de página independientes.
- `components/ui/`: elementos visuales y primitives compartidas.
- `components/cart/`: estado persistente de la bolsa de compra.
- `lib/products.ts`: catálogo editorial tipado y fuente de respaldo.
- `lib/shopify.ts`: creación segura de carritos Shopify desde el servidor.
- `app/api/checkout/`: puente entre la bolsa VÄLR y el checkout de Shopify.
- `app/coleccion/`: catálogo de la colección.
- `app/producto/[slug]/`: fichas de producto estáticas.
- `app/carrito/`: bolsa persistente en el navegador.

La tienda usa Server Components por defecto, imágenes locales optimizadas, rutas estáticas de producto y una bolsa persistente en el navegador.

## Activar Shopify Checkout

1. Publica en Shopify los productos sincronizados desde Printful.
2. Instala el canal **Headless** de Shopify y crea un token privado de Storefront.
3. Copia `.env.example` como `.env.local` durante el desarrollo.
4. Completa `SHOPIFY_STORE_DOMAIN` y `SHOPIFY_STOREFRONT_PRIVATE_TOKEN`.
5. En `SHOPIFY_VARIANT_MAP`, relaciona cada slug y talla con su `gid://shopify/ProductVariant/...`.
6. Añade las mismas variables a Vercel para Preview y Production.

Hasta completar esas variables, la bolsa funciona normalmente y muestra el checkout como “en configuración”. El token es utilizado exclusivamente en el servidor y nunca se expone al navegador.

## Activar la newsletter del footer

El formulario "Únete al clan" crea/actualiza clientes con consentimiento de marketing usando la Admin API de Shopify (no la Storefront API del checkout).

1. En Shopify, crea una app personalizada con el scope `write_customers` y genera su token de Admin API.
2. Completa `SHOPIFY_ADMIN_API_TOKEN` (y opcionalmente `SHOPIFY_ADMIN_API_VERSION`) en `.env.local` y en Vercel.
3. Reutiliza el mismo `SHOPIFY_STORE_DOMAIN` que ya configuraste para el checkout.

Hasta completar `SHOPIFY_ADMIN_API_TOKEN`, el formulario se muestra deshabilitado con el aviso “Muy pronto”. Un email que ya existe en Shopify se trata como éxito (no revela al visitante que ya estaba suscrito).
