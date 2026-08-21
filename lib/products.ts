export type Product = {
  slug: string;
  name: string;
  category: string;
  gender: "Hombre" | "Mujer" | "Unisex";
  price: number;
  image: string;
  imagePosition?: string;
  color: string;
  swatch: string;
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
    swatch: "#0b0b0b",
    description: "Dos cuervos sobrevuelan el eclipse del norte. Una pieza de corte amplio creada para moverse dentro y fuera del entrenamiento.",
    details: ["AS Colour 5082 · Algodón de 240 g/m²", "Corte boxy oversized", "Impresión DTG frontal y trasera"],
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
    swatch: "#c8bba9",
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
    swatch: "#0c1b14",
    description: "Una jinete atraviesa el paso de montaña bajo el resplandor del norte. Fuerza serena en verde profundo.",
    details: ["Algodón premium de 240 g/m²", "Corte oversized unisex", "Ilustración trasera de gran formato"],
  },
  {
    slug: "jormungandr-oversized-tee",
    name: "Jörmungandr Oversized Tee",
    category: "Camiseta gráfica oversized",
    gender: "Unisex",
    price: 39.9,
    image: "/images/jormungandr-tee-v1.webp",
    imagePosition: "50% 50%",
    color: "Borgoña profundo · #451717",
    swatch: "#451717",
    description: "La serpiente del mundo emerge del mar bajo un sol eclipsado. Una pieza de presencia intensa en borgoña profundo.",
    details: ["Algodón premium de 240 g/m²", "Corte oversized unisex", "Color #451717 · Serigrafía frontal y trasera"],
  },
  {
    slug: "skadi-oversized-tee",
    name: "Skaði Oversized Tee",
    category: "Camiseta gráfica oversized",
    gender: "Unisex",
    price: 39.9,
    image: "/images/skadi-tee-v1.webp",
    imagePosition: "50% 50%",
    color: "Azul noche · #202863",
    swatch: "#202863",
    description: "La cazadora del invierno avanza entre cumbres y luna creciente. Precisión y carácter sobre azul noche.",
    details: ["Algodón premium de 240 g/m²", "Corte oversized unisex", "Color #202863 · Tinta al agua de alta resistencia"],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(price);
}
