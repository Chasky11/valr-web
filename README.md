# VÄLR

Experiencia digital premium inspirada en la mitología nórdica, construida con Next.js 15, React, TypeScript y Tailwind CSS.

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

La página usa Server Components por defecto, no depende de recursos externos en tiempo de ejecución y respeta las preferencias de movimiento reducido.
