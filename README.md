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
- `lib/products.ts`: catálogo tipado y fuente única de producto.
- `app/coleccion/`: catálogo de la colección.
- `app/producto/[slug]/`: fichas de producto estáticas.
- `app/carrito/`: bolsa persistente en el navegador.

La tienda usa Server Components por defecto, imágenes locales optimizadas, rutas estáticas de producto y una bolsa persistente en el navegador. El pago seguro queda preparado como siguiente integración de comercio.
