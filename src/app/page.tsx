import Hero from "@/components/hero";
import FeaturedCollections from "@/components/sections/featured-collections";
import BestSellersSection from "@/components/sections/best-sellers";
import WhyCrownix from "@/components/sections/why-crownix";
import Testimonials from "@/components/sections/testimonials";
import FAQ from "@/components/sections/faq";
import InstagramGallery from "@/components/sections/instagram-gallery";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <BestSellersSection />
      <WhyCrownix />
      <Testimonials />
      <InstagramGallery />
      <FAQ />
    </>
  );
}
