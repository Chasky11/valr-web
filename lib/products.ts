export type Product = {
  slug: string;
  name: string;
  category: string;
  gender: "Hombre" | "Mujer" | "Unisex";
  price: number;
  image: string;
  imagePosition?: string;
  color: string;
  description: string;
  details: string[];
};

export const products: Product[] = [
  {
    slug: "hrafn-oversized-tee",
    name: "Hrafn Oversized Tee",
    category: "Camiseta gráfica oversized",
    gender: "Unisex",
    price: 39.9,
    image: "/images/hrafn-tee-v1.webp",
    imagePosition: "50% 50%",
    color: "Negro obsidiana",
    description: "Dos cuervos sobrevuelan el eclipse del norte. Una pieza de corte amplio creada para moverse dentro y fuera del entrenamiento.",
    details: ["Algodón premium de 240 g/m²", "Corte oversized unisex", "Serigrafía frontal y trasera"],
  },
  {
    slug: "thorr-oversized-tee",
    name: "Thorr Oversized Tee",
    category: "Camiseta gráfica oversized",
    gender: "Unisex",
    price: 39.9,
    image: "/images/thorr-tee-v1.webp",
    imagePosition: "50% 50%",
    color: "Hueso antiguo",
    description: "El martillo rompe la montaña bajo una tormenta eterna. Contraste oscuro sobre algodón color hueso.",
    details: ["Algodón premium de 240 g/m²", "Corte oversized unisex", "Tinta al agua de alta resistencia"],
  },
  {
    slug: "valkyrja-oversized-tee",
    name: "Valkyrja Oversized Tee",
    category: "Camiseta gráfica oversized",
    gender: "Unisex",
    price: 39.9,
    image: "/images/valkyrja-tee-v1.webp",
    imagePosition: "50% 50%",
    color: "Verde noche",
    description: "Una jinete atraviesa el paso de montaña bajo el resplandor del norte. Fuerza serena en verde profundo.",
    details: ["Algodón premium de 240 g/m²", "Corte oversized unisex", "Ilustración trasera de gran formato"],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(price);
}
