import HeroSection from '@/components/HeroSection';
import ListEventSection from '@/components/ListEventSection';
import ProductPopularSection from '@/components/ProductPopularSection';
import SearchBarEvent from '@/components/SearchBarEvent';

export default function Event() {
  return (
    <section>
      <HeroSection />
      <SearchBarEvent />
      <ListEventSection />
      <ProductPopularSection />
    </section>
  );
}
