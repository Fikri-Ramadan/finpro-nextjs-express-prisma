import HeroSection from '@/components/HeroSection';
import ListEventSection from '@/components/ListEventSection';
import ProductPopularSection from '@/components/ProductPopularSection';
import SearchBarEvent from '@/components/SearchBarEvent';
import customAxios from '@/lib/axios';

export default async function Event() {
  const response = await customAxios.get('/api/events');
  const Events = await response?.data?.results;
  return (
    <section>
      <HeroSection />
      <SearchBarEvent />
      <ListEventSection apiEvents={Events} />
    </section>
  );
}
