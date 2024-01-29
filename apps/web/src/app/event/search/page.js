'use client';

import HeroSection from '@/components/HeroSection';
import ListEventSection from '@/components/ListEventSection';
import SearchBarEvent from '@/components/SearchBarEvent';
import customAxios from '@/lib/axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function searchEvent({}) {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  // const response = await customAxios.get(`/api/events?name=${name}`);
  // const searchEvents = await response?.data?.results;
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      const response = await customAxios.get(`/api/events?name=${name}`);
      const searchEvents = await response?.data?.results;
      setData(searchEvents);
      setLoading(false);
    };
    fetching();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <section>
      <HeroSection />
      <SearchBarEvent />
      <ListEventSection apiEvents={data} />
    </section>
  );
}
