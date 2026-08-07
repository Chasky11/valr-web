import { BrandStory } from "@/components/sections/brand-story";
import { CategoryGrid } from "@/components/sections/category-grid";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { StoreHero } from "@/components/sections/store-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <StoreHero />
      <FeaturedProducts />
      <CategoryGrid />
      <BrandStory />
      <SiteFooter />
    </main>
  );
}
