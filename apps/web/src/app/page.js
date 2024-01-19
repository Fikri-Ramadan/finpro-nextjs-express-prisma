import HeroSection from '@/components/HeroSection';
import ProductCategorySection from '@/components/ProductCategorySection';
import ProductPopularSection from '@/components/ProductPopularSection';
import TestimonialSection from '@/components/TestimonialSection';
import Image from 'next/image';

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
