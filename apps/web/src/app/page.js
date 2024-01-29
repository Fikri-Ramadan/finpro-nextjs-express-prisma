import HeroSection from '@/components/HeroSection';
import ProductCategorySection from '@/components/ProductCategorySection';
import TestimonialSection from '@/components/TestimonialSection';
import customAxios from '@/lib/axios';

export default async function Home() {
  const response = await customAxios.get('/api/events');
  const Events = await response?.data?.results;
  return (
    <div className="">
      <HeroSection />
      <ProductCategorySection apiEvents={Events} />
      <TestimonialSection />
    </div>
  );
}
