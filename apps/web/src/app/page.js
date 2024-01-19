import HeroSection from '@/components/HeroSection';
import ProductCategorySection from '@/components/ProductCategorySection';
import ProductPopularSection from '@/components/ProductPopularSection';
import TestimonialSection from '@/components/TestimonialSection';

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <ProductCategorySection />
      <ProductPopularSection />
      <TestimonialSection />
    </div>
  );
}
