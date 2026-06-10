import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Advantages } from "@/components/home/Advantages";
import { Brands } from "@/components/home/Brands";
import { featuredProducts, saleProducts } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — велосипеди, запчастини й аксесуари в Україні`,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Advantages />
      <CategoryGrid />
      <FeaturedProducts
        products={featuredProducts()}
        kicker="Хіти продажів"
        title="Найпопулярніші моделі"
        href="/catalog"
      />
      <FeaturedProducts
        products={saleProducts()}
        kicker="Акції"
        title="Знижки до -30%"
        href="/catalog?sale=1"
      />
      <Brands />
    </>
  );
}
